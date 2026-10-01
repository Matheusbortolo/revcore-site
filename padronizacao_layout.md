# Padronização de layout — RevCore

Guia visual do app para o site. A referência no código é `lib/app/theme/`.

O visual é um painel de instrumentos à noite: fundo quase preto, cantos quase retos e laranja como única cor de destaque. Títulos e números usam Oxanium. Texto corrido usa Rajdhani.

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `background` | `#05070A` | Página, scaffold |
| `backgroundElevated` / `surface` | `#101418` | Cards, inputs |
| `surfaceRaised` | `#171C21` | Dialogs, sheets, snackbar |
| `panel` | `#0C1014` | Painéis mais fundos |
| `graphite` / `track` | `#1C2126` | Barras, botão desabilitado |
| `line` | `#262C32` | Bordas |
| `textPrimary` | `#F5F1EC` | Títulos e corpo (creme, não branco puro) |
| `textSecondary` | `#7A8187` | Labels |
| `textMuted` | `#5C6368` | Hints, ícones inativos |
| `orange` | `#FF6B00` | Marca, botões, links, foco |
| `onOrange` | `#1A0C04` | Texto sobre o laranja |
| `amber` | `#FF8A3D` | Gradiente junto do laranja |
| `red` | `#FF3E3B` | Erro, redline |
| `connected` | `#35D571` | Conectado / ok |
| `warning` | `#FFB020` | Atenção |
| `cyan` | `#02C3DC` | Acento secundário |
| `accent` | `#2A160C` | Fundo quente bem baixo |

O ícone do app e o fundo do mapa noturno usam `#070708`. No mapa, água é `#14141A`, ruas principais `#FF8A3D` e vias maiores `#FF5A1F`. Texto do mapa: `#F4F4F6`.

```css
:root {
  color-scheme: dark;
  --bg: #05070A;
  --surface: #101418;
  --surface-raised: #171C21;
  --panel: #0C1014;
  --graphite: #1C2126;
  --line: #262C32;
  --text: #F5F1EC;
  --text-secondary: #7A8187;
  --text-muted: #5C6368;
  --orange: #FF6B00;
  --on-orange: #1A0C04;
  --amber: #FF8A3D;
  --red: #FF3E3B;
  --green: #35D571;
  --warning: #FFB020;
  --cyan: #02C3DC;
  --accent: #2A160C;
  --font-display: "Oxanium", sans-serif;
  --font-sans: "Rajdhani", sans-serif;
  --radius: 3px;
}

::selection {
  background: var(--orange);
  color: var(--on-orange);
}
```

## Tipografia

As duas fontes estão no Google Fonts. Pesos usados no app: Rajdhani 400, 500, 600 e 700. Oxanium entra em 600, 700 e 800.

| Papel | Fonte | Tamanho | Peso | Extra |
|---|---|---|---|---|
| Wordmark | Oxanium | 21px | 800 | line-height 1 |
| Título de página | Oxanium | 32px | 700 | line-height 1, caixa alta |
| Hero | Oxanium | 30px | 700 | line-height 1.05 |
| Valor de métrica | Oxanium | 22px | 700 | tabular figures |
| Corpo | Rajdhani | 15px | 500 | line-height 1.35 |
| Link | Rajdhani | 14px | 600 | cor laranja |
| Botão | Oxanium | 12px | 800 | letter-spacing 1.1px, caixa alta |
| Label | Oxanium | 11px | 700 | letter-spacing 1.2px, caixa alta, cor secundária |
| Eyebrow | Oxanium | 10px | 700 | letter-spacing 2px, cor laranja, caixa alta |
| Status | Oxanium | 10px | 600 | letter-spacing 1.5px, caixa alta |
| Nav | Oxanium | 9px | 700 | letter-spacing 0.8px, caixa alta |

O wordmark é `REV` em `#F5F1EC` e `CORE` em `#FF6B00`, sem espaço entre as palavras.

```html
<span style="font-family: Oxanium, sans-serif; font-weight: 800; color: #F5F1EC;">REV</span><span style="font-family: Oxanium, sans-serif; font-weight: 800; color: #FF6B00;">CORE</span>
```

## Forma

- Tema só escuro. O relevo vem da diferença entre `#05070A`, `#101418` e a borda `#262C32`.
- Raio da interface: 2px em campos, 3px em botões, cards e painéis.
- Fotos, capas e cards maiores usam 12px a 22px.
- Glow só no laranja: traço de seção, ponto de status e arco do conta-giros. O resto fica chapado.

## Componentes

**Botão principal.** Fundo `#FF6B00`, texto `#1A0C04`, altura 47px, raio 3px, borda da mesma cor do fundo. Sombra `0 0 19px` com laranja a cerca de 28% de opacidade. Desabilitado: fundo `#1C2126`, texto `#5C6368`.

**Botão secundário.** Fundo transparente, borda `#262C32`, texto `#F5F1EC`, altura 44px, raio 3px. No hover, borda e texto viram laranja.

**Campo.** Fundo `#101418`, borda `#262C32`, raio 2px, padding 16px. Label flutuante e borda no foco: laranja, 1.5px. Erro: `#FF3E3B`. Hint: `#5C6368`.

**Painel.** Fundo `#101418`, borda 1px `#262C32`, raio 3px, padding 12px. Faixa de acento opcional: 2px na esquerda, na cor do destaque.

**Seção.** Traço vertical laranja de 3×14px, `box-shadow: 0 0 9px #FF6B00`, 10px de espaço, título Oxanium em caixa alta.

**Card ativo.** Borda laranja a cerca de 60% misturada com `#262C32`, mais um halo suave (`0 0 28px` com laranja a ~10%).

**Nav inferior.** Fundo quase opaco sobre `#05070A`, blur, borda superior `#262C32`. Item ativo: borda superior de 2px laranja e texto laranja.

**Snackbar.** Fundo `#171C21`, borda `#262C32`, raio 3px, texto Rajdhani.

**Checkbox.** Marcado: fundo laranja, check `#1A0C04`. Desmarcado: borda `#5C6368`.

**Barra de progresso.** Trilho `#1C2126`, preenchimento `#FF6B00`.

## Conta-giros

Arco de 240° começando em 150°. Trilho `#1C2126`. Progresso em `#FF6B00`, com um halo da mesma cor a 18% de opacidade e traço mais grosso por baixo. O trecho final (a partir de 82% do arco) é `#FF3E3B` a 30% de opacidade. Ponteiro em `#F5F1EC`.
