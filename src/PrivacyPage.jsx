import { useEffect } from "react";
import source from "../politica_privacidade.md?raw";
import { BrandLockup } from "./components/BrandLockup";

const TITLE = "Política de Privacidade e Termos de Uso — RevCore";

export function PrivacyPage() {
  useEffect(() => {
    document.title = TITLE;
  }, []);

  return (
    <>
      <header className="header">
        <a className="header-logo" href="/" aria-label="RevCore">
          <BrandLockup />
        </a>
        <a className="header-back" href="/">
          Início
        </a>
      </header>
      <main className="legal">
        <PolicyBody source={source} />
      </main>
      <footer className="footer">
        <a href="/">
          <BrandLockup />
        </a>
        <p>Política de Privacidade e Termos de Uso do RevCore.</p>
      </footer>
    </>
  );
}

function PolicyBody({ source }) {
  const blocks = parsePolicy(source);
  let started = false;

  return blocks.map((block, index) => {
    if (block.type === "table") {
      const [header, ...rows] = block.rows;
      return (
        <div className="legal-table-wrap" key={index}>
          <table>
            <thead>
              <tr>
                {header.map((cell) => (
                  <th key={cell}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return block.lines.map((line) => {
      const kind = classify(line, !started);
      started = true;
      if (kind === "h1") return <h1 key={line}>{line}</h1>;
      if (kind === "h2") return <h2 key={line}>{line}</h2>;
      if (kind === "h3") return <h3 key={line}>{line}</h3>;
      return <p key={line}>{line}</p>;
    });
  });
}

function parsePolicy(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    if (!lines[index].trim()) {
      index += 1;
      continue;
    }

    if (lines[index].includes("\t")) {
      const rows = [];
      while (index < lines.length && lines[index].includes("\t")) {
        rows.push(lines[index].split("\t").map((cell) => cell.trim()).filter(Boolean));
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }

    const chunk = [];
    while (index < lines.length && lines[index].trim() && !lines[index].includes("\t")) {
      chunk.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "text", lines: chunk });
  }

  return blocks;
}

function classify(line, isFirst) {
  if (isFirst) return "h1";
  if (line === "Termos de Uso") return "h2";
  if (/^\d+\.\d+\s/.test(line)) return "h3";
  if (/^\d+\.\s/.test(line)) return "h2";
  return "p";
}
