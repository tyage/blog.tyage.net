// Keep this list aligned with legacy `url: /archive/p<ID>.html` front matter.
const legacyPostIds = new Set([
  "6", "7", "17", "43", "61", "64", "71", "76", "78", "95", "110", "117",
  "122", "134", "138", "140", "143", "145", "155", "164", "182", "185", "188", "195",
  "200", "234", "237", "243", "250", "252", "260", "267", "276", "278", "290", "296",
  "301", "305", "308", "313", "315", "319", "321", "328", "335", "357", "368", "380",
  "386", "397", "405", "411", "417", "422", "434", "438", "445", "455", "460", "466",
  "471", "479", "483", "487", "497", "525", "530", "552", "555", "557", "560", "562",
  "565", "571", "578", "581", "598", "605", "609", "642", "649", "658", "681", "683",
  "689", "697", "719", "730", "739", "762", "781", "790", "802", "814", "829", "848",
  "888", "918", "944", "990", "1020", "1043", "1076", "1113", "1138", "1187",
]);

export default function legacyPostRedirect(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    const postId = url.searchParams.get("p")?.match(/^(\d+)\/?$/)?.[1];

    if (postId !== undefined && legacyPostIds.has(postId)) {
      const destination = new URL(url);
      destination.pathname = `/archive/p${postId}.html`;
      destination.searchParams.delete("p");

      return Response.redirect(destination, 301);
    }
  }

  const extensionlessPost = url.pathname.match(/^\/archive\/p(\d+)$/);

  if (extensionlessPost !== null && legacyPostIds.has(extensionlessPost[1])) {
    url.pathname = `${url.pathname}.html`;

    return Response.redirect(url, 301);
  }
}

export const config = {
  path: ["/", "/archive/*"],
};
