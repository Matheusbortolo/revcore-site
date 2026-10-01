const TABS = ["Painel", "Garagem", "Mapa", "Feed", "Perfil"];

export function Phone({ tab, children }) {
  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-status">
          <span>19:57</span>
          <span className="phone-obd">
            <i />
            OBD
          </span>
        </div>
        <div className="phone-body">{children}</div>
        <nav className="phone-nav" aria-label="Navegação do app">
          {TABS.map((item) => (
            <span key={item} className={item === tab ? "is-active" : undefined}>
              {item}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function DashScreen() {
  return (
    <Phone tab="Painel">
      <div className="dash-head">
        <strong className="dash-mark">
          REV<span>CORE</span>
        </strong>
        <span className="live">
          <i />
          Ao vivo
        </span>
      </div>
      <div className="dash-gauge">
        <MiniGauge value={4250} display="4.250" />
      </div>
      <div className="metric-grid">
        <Metric label="Velocidade" value="92" unit="KM/H" />
        <Metric label="Temp. motor" value="89" unit="°C" />
        <Metric label="Coletor" value="0.8" unit="BAR" tone="orange" />
        <Metric label="Tensão" value="14.1" unit="V" tone="cyan" />
      </div>
      <div className="fuel">
        <div className="fuel-label">
          <span>Combustível</span>
          <span>62%</span>
        </div>
        <div className="fuel-track">
          <span style={{ width: "62%" }} />
        </div>
      </div>
    </Phone>
  );
}

export function GarageScreen() {
  return (
    <Phone tab="Garagem">
      <p className="screen-kicker">Garagem</p>
      <article className="car-card">
        <p className="car-status">Projeto</p>
        <h3>Civic Si</h3>
        <p className="car-meta">2008 · ABC1D23</p>
        <dl className="car-stats">
          <div>
            <dt>186k</dt>
            <dd>KM</dd>
          </div>
          <div>
            <dt>14</dt>
            <dd>MODS</dd>
          </div>
          <div>
            <dt>11.2</dt>
            <dd>KM/L</dd>
          </div>
        </dl>
        <ul className="car-rows">
          <li>
            <span>Licenciamento</span>
            <em className="ok">OK</em>
          </li>
          <li>
            <span>IPVA 2026</span>
            <em>Vence 12/11</em>
          </li>
          <li>
            <span>Troca de óleo</span>
            <em>Em 1.200 km</em>
          </li>
          <li>
            <span>P0171</span>
            <em>Mistura pobre</em>
          </li>
        </ul>
        <div className="share-btn">Compartilhar cartão</div>
      </article>
    </Phone>
  );
}

export function MapScreen() {
  return (
    <Phone tab="Mapa">
      <p className="screen-kicker">Por perto</p>
      <NearbyMap />
      <article className="event-card">
        <p>Evento · Sáb 21h</p>
        <h3>Encontro Turbo Night</h3>
        <span>38 confirmados · 4,2 km</span>
      </article>
      <article className="chat-card">
        <p>Chat da região</p>
        <div>
          <q>Alguém no posto da marginal?</q>
          <b>3</b>
        </div>
      </article>
    </Phone>
  );
}

function Metric({ label, value, unit, tone }) {
  return (
    <div className={`metric${tone ? ` metric-${tone}` : ""}`}>
      <span>{label}</span>
      <strong>
        {value} <small>{unit}</small>
      </strong>
    </div>
  );
}

function MiniGauge({ value, display }) {
  const start = 150;
  const sweep = 240;
  const ratio = value / 8000;
  const angle = ((start + sweep * ratio) * Math.PI) / 180;
  const cx = 80;
  const cy = 84;
  const r = 58;
  const nx = cx + Math.cos(angle) * (r - 12);
  const ny = cy + Math.sin(angle) * (r - 12);
  const arcPath = (from, to) => {
    const a0 = (from * Math.PI) / 180;
    const a1 = (to * Math.PI) / 180;
    const x0 = cx + Math.cos(a0) * r;
    const y0 = cy + Math.sin(a0) * r;
    const x1 = cx + Math.cos(a1) * r;
    const y1 = cy + Math.sin(a1) * r;
    const large = to - from > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };

  return (
    <svg className="gauge gauge-mini" viewBox="0 0 160 150" role="img" aria-label={`${display} RPM`}>
      <path d={arcPath(start, start + sweep)} className="gauge-track" />
      <path d={arcPath(start + sweep * 0.82, start + sweep)} className="gauge-redzone" />
      <path d={arcPath(start, start + sweep * ratio)} className="gauge-glow" />
      <path d={arcPath(start, start + sweep * ratio)} className="gauge-value" />
      <line x1={cx} y1={cy} x2={nx} y2={ny} className="gauge-needle" />
      <circle cx={cx} cy={cy} r="4.5" className="gauge-hub" />
      <text x={cx} y="118" className="gauge-readout">
        {display}
      </text>
      <text x={cx} y="134" className="gauge-unit">
        RPM
      </text>
    </svg>
  );
}

function NearbyMap() {
  return (
    <svg className="minimap" viewBox="0 0 240 132" role="img" aria-label="Mapa de quem está por perto">
      <rect width="240" height="132" rx="8" fill="#070708" />
      <path d="M-8 96 C 36 88, 70 46, 248 18" className="road road-main" />
      <path d="M28 -8 C 54 36, 78 70, 62 140" className="road road-side" />
      <path d="M120 -8 C 132 40, 150 78, 188 140" className="road road-side" />
      <circle cx="58" cy="42" r="3.2" className="pin" />
      <circle cx="96" cy="28" r="3.2" className="pin" />
      <circle cx="168" cy="36" r="3.2" className="pin" />
      <circle cx="150" cy="92" r="3.2" className="pin" />
      <circle cx="78" cy="78" r="3.2" className="pin" />
      <circle cx="112" cy="70" r="7" className="you-ring" />
      <circle cx="112" cy="70" r="3.4" className="you" />
    </svg>
  );
}
