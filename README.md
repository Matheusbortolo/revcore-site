# RevCore — site

Landing page do [RevCore](https://play.google.com/store/apps/details?id=com.revcore.app), app Android que lê o motor pelo scanner OBD2, guarda a ficha do carro e reúne quem está por perto.

A página é uma só, em português. O topo leva às seções **Painel**, **Garagem** e **Comunidade**, e os botões abrem a Play Store ou o Discord.

## O que tem na página

- **Hero.** Apresenta o app e mostra a tela da central.
- **Painel.** Leituras ao vivo (rotação, velocidade, temperatura e o resto) via scanner ELM327, com o mesmo painel no Android Auto. O scanner é comprado à parte.
- **Garagem.** Ficha do carro: modificações, manutenção, documentos, abastecimentos e códigos de falha.
- **Comunidade.** Mapa, chat da região, feed, eventos e crews.
- **Planos.** Gratuito (painel simulado, até 2 carros) e Premium (leitura OBD2 real, Android Auto e mais espaço na garagem).

As capturas ficam em `public/screens/`.

## Stack

React 19 e Vite 6. O `npm run dev` sobe a página no navegador. O `npm run build` gera os arquivos estáticos e o script `scripts/prerender.mjs` coloca o HTML já renderizado em `dist/index.html`, junto com meta tags de Open Graph, JSON-LD, `robots.txt` e, se houver domínio configurado, `sitemap.xml`.

## Como rodar

Precisa do [Node.js](https://nodejs.org/) 20 ou mais recente.

```bash
npm install
npm run dev
```

O Vite mostra a URL no terminal, em geral `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

O `preview` serve a pasta `dist/` para conferir o resultado do build. Qualquer hospedagem de arquivos estáticos serve essa pasta.

## Domínio

Em `src/links.js`:

- `PLAY_URL` e `DISCORD_URL` são os destinos dos botões.
- `SITE_URL` fica vazio enquanto o domínio público não existir. Com uma URL sem barra no final (por exemplo `https://revcore.com.br`), o build inclui canonical, `og:url`, imagem de compartilhamento e sitemap. Sem ela, essas tags não são inventadas.
