import { ScreenShot } from "./components/ScreenShot";
import { StoreLinks } from "./components/StoreLinks";
import { BrandLockup } from "./components/BrandLockup";
import { Wordmark } from "./components/Wordmark";
import { PLAY_URL } from "./links";

const NAV = [
  { href: "#painel", label: "Painel" },
  { href: "#garagem", label: "Garagem" },
  { href: "#comunidade", label: "Comunidade" },
];

export function App() {
  return (
    <>
      <header className="header">
        <a className="header-logo" href="#topo" aria-label="RevCore">
          <BrandLockup />
        </a>
        <nav className="header-nav" aria-label="Seções">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-primary btn-small" href={PLAY_URL} target="_blank" rel="noreferrer">
          Baixar
        </a>
      </header>

      <main id="topo">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <i /> Android · OBD2 · Android Auto
            </p>
            <h1>
              Seu carro é
              <br />
              um <em>projeto.</em>
              <br />
              E uma <em>turma.</em>
            </h1>
            <p className="lede">
              O RevCore lê o motor pelo scanner OBD2, guarda a história do seu carro e te junta com
              quem está por perto.
            </p>
            <StoreLinks />
            <dl className="stats">
              <div>
                <dt>7</dt>
                <dd>Leituras ao vivo</dd>
              </div>
              <div>
                <dt>2</dt>
                <dd>Carros grátis</dd>
              </div>
              <div>
                <dt>1</dt>
                <dd>Comunidade</dd>
              </div>
            </dl>
          </div>
          <div className="hero-visual">
            <ScreenShot
              src="/screens/central.png"
              alt="Central do RevCore: o carro, o desempenho e a comunidade no mesmo lugar"
              eager
            />
          </div>
        </section>

        <section className="feature" id="painel">
          <FeatureCopy
            index="01"
            kicker="Painel ao vivo"
            title="Veja o que o motor faz"
            text="Um scanner ELM327 no Bluetooth manda os dados para o telefone em manômetros. O painel tem conexão com o Android Auto: a mesma leitura aparece na central, pra olhar de relance enquanto dirige."
            notice="O scanner se compra à parte. Não vem com o app e não faz parte do Premium. Só é necessário para ler o carro. O resto do RevCore continua funcionando."
            chips={[
              "Rotação",
              "Velocidade",
              "Temperatura",
              "Pressão do coletor",
              "Tensão",
              "Carga e combustível",
              "Android Auto",
            ]}
          />
          <div className="feature-visual">
            <ScreenShot
              src="/screens/painel.png"
              alt="Painel ao vivo do RevCore, com conta-giros, velocidade, pressão e temperatura"
              note="Sem o scanner, o painel roda simulado. A leitura de verdade é do Premium. O aparelho, não."
            />
          </div>
        </section>

        <section className="feature feature-flip" id="garagem">
          <div className="feature-visual">
            <ScreenShot
              src="/screens/garagem.png"
              alt="Garagem do RevCore, com a ficha do Nissan R32"
              tilt="left"
            />
          </div>
          <FeatureCopy
            index="02"
            kicker="Garagem"
            title={
              <>
                A ficha completa do
                <br />
                carro
              </>
            }
            text="O carro vira um cadastro: o atual, o projeto, o que já foi vendido e o que ainda é sonho. Placa, VIN, IPVA, CRLV e consumo em reais por km."
            chips={[
              "Modificações",
              "Manutenção",
              "Documentos",
              "Abastecimentos",
              "Códigos de falha",
              "Viagens e recordes",
            ]}
          />
        </section>

        <section className="feature" id="comunidade">
          <FeatureCopy
            index="03"
            kicker="Comunidade"
            title={
              <>
                Quem sai de carro, perto
                <br />
                de você
              </>
            }
            text="Mapa de quem está por perto, chat da região, conversa direta, feed de fotos, eventos e crews. O mapa também tem conexão com o Android Auto. Dentro de uma garagem segura, sua posição some do mapa dos outros."
            chips={["Mapa ao vivo", "Mapa no Android Auto", "Chat da região", "Eventos", "Crews", "Alertas de via", "Modo direção"]}
          />
          <div className="feature-visual">
            <ScreenShot
              src="/screens/feed.png"
              alt="Feed do RevCore, com fotos de quem está por perto"
            />
          </div>
        </section>

        <section className="plans" id="planos">
          <div className="section-heading">
            <p className="eyebrow">Planos</p>
            <h2>Comece grátis</h2>
          </div>
          <div className="plan-grid">
            <article className="plan">
              <p>Gratuito</p>
              <h3>R$ 0</h3>
              <ul>
                <li>Painel simulado</li>
                <li>Até 2 carros na garagem</li>
                <li>2 fotos por carro</li>
                <li>Comunidade completa</li>
              </ul>
            </article>
            <article className="plan plan-premium">
              <p>Premium</p>
              <h3>Conexão real</h3>
              <ul>
                <li>Leitura OBD2 de verdade pelo scanner</li>
                <li>Painel e mapa no Android Auto</li>
                <li>Mais espaço na garagem</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="close">
          <Wordmark />
          <p>Baixe o app, conecte o scanner e cola com a turma no Discord.</p>
          <StoreLinks />
        </section>
      </main>

      <footer className="footer">
        <Wordmark />
        <p>
          O RevCore não incentiva nada fora da lei e não se responsabiliza pelo que cada pessoa faz
          na estrada. Dirija com responsabilidade.
        </p>
      </footer>
    </>
  );
}

function FeatureCopy({ index, kicker, title, text, notice, chips }) {
  return (
    <div className="feature-copy">
      <span className="feature-index" aria-hidden="true">
        {index}
      </span>
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      <p>{text}</p>
      {notice ? <p className="notice">{notice}</p> : null}
      <ul className="chips">
        {chips.map((chip) => (
          <li key={chip}>{chip}</li>
        ))}
      </ul>
    </div>
  );
}
