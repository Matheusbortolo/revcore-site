import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
  const { render, renderPrivacy } = await vite.ssrLoadModule("/src/entry-server.jsx");
  const { SITE_URL, PLAY_URL, DISCORD_URL } = await vite.ssrLoadModule("/src/links.js");
  const siteUrl = String(SITE_URL).replace(/\/$/, "");

  const distIndex = resolve(root, "dist/index.html");
  const template = readFileSync(distIndex, "utf8");
  const title = match(template, /<title>(.*?)<\/title>/);
  const description = match(template, /name="description"\s+content="([^"]*)"/);
  const privacyTitle = "Política de Privacidade e Termos de Uso — RevCore";
  const privacyDescription =
    "Política de Privacidade e Termos de Uso do aplicativo RevCore para Android.";

  writeFileSync(
    distIndex,
    applyPage(template, {
      body: render(),
      title,
      description,
      path: "/",
      siteUrl,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "RevCore",
        operatingSystem: "Android",
        applicationCategory: "LifestyleApplication",
        description,
        installUrl: PLAY_URL,
        sameAs: [DISCORD_URL],
        ...(siteUrl ? { url: `${siteUrl}/` } : {}),
      },
    }),
  );

  const privacyDir = resolve(root, "dist/privacidade");
  mkdirSync(privacyDir, { recursive: true });
  writeFileSync(
    resolve(privacyDir, "index.html"),
    applyPage(template, {
      body: renderPrivacy(),
      title: privacyTitle,
      description: privacyDescription,
      path: "/privacidade",
      siteUrl,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: privacyTitle,
        description: privacyDescription,
        ...(siteUrl ? { url: `${siteUrl}/privacidade` } : {}),
      },
    }),
  );

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
  <url>
    <loc>${escapeXml(`${siteUrl}/privacidade`)}</loc>
  </url>
</urlset>
`,
    );
  }
} finally {
  await vite.close();
}

function applyPage(template, { body, title, description, path, siteUrl, jsonLd }) {
  const pageUrl = siteUrl ? `${siteUrl}${path === "/" ? "/" : path}` : "";
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

  if (pageUrl) {
    const imageUrl = `${siteUrl}/screens/painel.png`;
    head.push(
      `<link rel="canonical" href="${escapeAttr(pageUrl)}" />`,
      `<meta property="og:url" content="${escapeAttr(pageUrl)}" />`,
      `<meta property="og:image" content="${escapeAttr(imageUrl)}" />`,
      `<meta name="twitter:image" content="${escapeAttr(imageUrl)}" />`,
    );
  }

  head.push(
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  );

  return template
    .replace(/<title>.*?<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(/name="description"\s+content="[^"]*"/, `name="description" content="${escapeAttr(description)}"`)
    .replace("</head>", `    ${head.join("\n    ")}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
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
