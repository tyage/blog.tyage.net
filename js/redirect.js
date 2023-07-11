const match = location.search.match(/^\?p=(\d+)\/?$/)
if (location.pathname === '/' && match !== null) {
  // redirect to new url if the user accesses with previous url. /?p=123 -> /archive/p123.html
  const postId = match[1]
  location.href = `/archive/p${postId}.html`
}