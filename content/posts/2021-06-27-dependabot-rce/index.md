---
title: "Diving into Dependabot with a bug in npm"
date: 2021-06-27T00:00:00+09:00
---

If you are developing some applications on GitHub, you might have seen pull requests from Depedabot.
It automatically finds outdated vulnerable packages and sends pull requests to fix that.

![](screenshot1.png)

It is enabled by default, therefore, it can make a commit on `dependabot/*` branch of many repositories on GitHub.
I thought If I could gain a controll of Dependabot, I can steal write permissions of those repositories.
Then, I started to look into Dependabot.

# SSRF in Dependabot

The core module of the Dependabot is open-sourced (<https://github.com/dependabot/dependabot-core>), so we can use Dependabot outside of GitHub.
To start the investigation, I prepared an local Dependabot environment following [the official sample code](https://github.com/dependabot/dependabot-script).

This sample code requires GitHub access token to fetch the source code of the repository.

<script src="https://gist-it.appspot.com/https://github.com/dependabot/dependabot-script/blob/4330ff7043b6fe2bb009005e2f5b0ca9985f32f2/update-script.rb?slice=16:23"></script>

So, my first idea is to deceiving a Dependabot so that the bot will sends the token to my server instead of GitHub.
This idea seems possible because there are flaws in URL validations.

One of the validations is checking whether the URL contains `github.com` or not.
Obviously, this validation accepts a URL such as `github.com.mocos.kitchen`.

<script src="https://gist-it.appspot.com/https://github.com/dependabot/dependabot-core/blob/f5151ed385a267a13c6778dec5197af574f39d92/common/lib/dependabot/git_metadata_fetcher.rb?slice=7:8"></script>

<script src="https://gist-it.appspot.com/https://github.com/dependabot/dependabot-core/blob/f5151ed385a267a13c6778dec5197af574f39d92/common/lib/dependabot/git_metadata_fetcher.rb?slice=54:55"></script>

Another one uses following regexp which accepts a URL such as `git+https://github.com.mocos.kitchen/username/repo`.

<script src="https://gist-it.appspot.com/https://github.com/dependabot/dependabot-core/blob/2f0db3e851ba2cc43d0b6dcd70da5e69d5b63eb6/npm_and_yarn/lib/dependabot/npm_and_yarn/file_parser.rb?slice=27:37"></script>

Based on these tricks, Dependabot treats `git+https://github.com.mocos.kitchen/username/repo` as a valid GitHub's URL.

## Token stealing demo

To proof this concept, I created [a sample repository](https://github.com/tyage/dependabot-test-app) that includes following `package.json` file.

<script src="https://gist-it.appspot.com/https://github.com/tyage/dependabot-test-app/blob/7f348994737bc39ab5ff443b6132f34c0c593328/package.json"></script>

Next, I updated the `credentials`, `repo_name` and `dependency_name` in [update-scripts.rb](https://github.com/dependabot/dependabot-script/blob/4330ff7043b6fe2bb009005e2f5b0ca9985f32f2/update-script.rb) so that we can run dependency checker against the sample repository.
When I run the script, my server (`github.com.mocos.kitchen`) received a request which contains GitHub Access Token.

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
This is possible in a simple way by adding a `.github/dependabot.yml` file.

<script src="https://gist-it.appspot.com/https://github.com/tyage/dependabot-test-app/blob/7f348994737bc39ab5ff443b6132f34c0c593328/.github/dependabot.yml"></script>

After that, I successfully received a HTTP request from a Dependabot in GitHub.
But contrary to my expectation, there is no GitHub Access Token in the request.
Afterwards, it turns out that those servers are using special HTTP proxy which enalbes the bot to access target repository without GitHub Access Token.

```
GET /username/repo.git/info/refs?service=git-upload-pack HTTP/1.0
Host: localhost:3000
Connection: close
User-Agent: dependabot-core/0.156.4 excon/0.83.0 ruby/2.7.1 (x86_64-linux-gnu) (+https://github.com/dependabot/dependabot-core)
Accept-Encoding: gzip
```

I couldn't steal the token from GitHub's Dependabot server, but after some investigation, I found another bug.

# RCE in npm


