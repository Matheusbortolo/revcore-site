import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
  const { SITE_URL, PLAY_URL, DISCORD_URL } = await vite.ssrLoadModule("/src/links.js");
  const appHtml = render();
  const siteUrl = String(SITE_URL).replace(/\/$/, "");

  const distIndex = resolve(root, "dist/index.html");
  let html = readFileSync(distIndex, "utf8");
  const title = match(html, /<title>(.*?)<\/title>/);
  const description = match(html, /name="description"\s+content="([^"]*)"/);

  const head = [
    `<meta name="robots" content="index, follow" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta name="twitter:card" content="${siteUrl ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
  ];

  if (siteUrl) {
    const pageUrl = `${siteUrl}/`;
    const imageUrl = `${siteUrl}/screens/painel.png`;
    head.push(
      `<link rel="canonical" href="${escapeAttr(pageUrl)}" />`,
      `<meta property="og:url" content="${escapeAttr(pageUrl)}" />`,
      `<meta property="og:image" content="${escapeAttr(imageUrl)}" />`,
      `<meta name="twitter:image" content="${escapeAttr(imageUrl)}" />`,
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RevCore",
    operatingSystem: "Android",
    applicationCategory: "LifestyleApplication",
    description,
    installUrl: PLAY_URL,
    sameAs: [DISCORD_URL],
  };
  if (siteUrl) jsonLd.url = `${siteUrl}/`;
  head.push(
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  );

  html = html.replace("</head>", `    ${head.join("\n    ")}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  writeFileSync(distIndex, html);

  const robots = ["User-agent: *", "Allow: /"];
  if (siteUrl) robots.push("", `Sitemap: ${siteUrl}/sitemap.xml`);
  writeFileSync(resolve(root, "dist/robots.txt"), `${robots.join("\n")}\n`);

  if (siteUrl) {
    writeFileSync(
      resolve(root, "dist/sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(`${siteUrl}/`)}</loc>
  </url>
</urlset>
`,
    );
  }
} finally {
  await vite.close();
}

function match(html, pattern) {
  const found = html.match(pattern);
  if (!found) throw new Error(`Não achei ${pattern} em dist/index.html`);
  return found[1];
}

function escapeAttr(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
}
