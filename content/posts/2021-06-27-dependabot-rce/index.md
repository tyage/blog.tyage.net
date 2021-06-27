---
title: "Diving into Dependabot, exploiting a bug in npm"
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

<script src="http://gist-it.appspot.com/https://github.com/dependabot/dependabot-script/blob/4330ff7043b6fe2bb009005e2f5b0ca9985f32f2/update-script.rb?slice=16:23"></script>

So, my first idea is, deceiving Dependabot so that it will sends credentials to my server instead of GitHub.
This idea seems to work because the regular expression they used to validate a URL has a flaw.
This regex accepts the URL such as `git+https://github.com.mocos.kitchen/`, so Dependabot thinks it is valid GitHub's URL.

<script src="https://github.com/dependabot/dependabot-core/blob/2f0db3e851ba2cc43d0b6dcd70da5e69d5b63eb6/npm_and_yarn/lib/dependabot/npm_and_yarn/file_parser.rb?slice=28:37"></script>

