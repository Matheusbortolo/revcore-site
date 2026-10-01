function polar(cx, cy, r, angle) {
  const rad = (angle * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arc(cx, cy, r, start, end) {
  const [x0, y0] = polar(cx, cy, r, start);
  const [x1, y1] = polar(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
}

const START = 150;
const SWEEP = 240;

export function Gauge({ value, max = 8000, display, unit, size = 210 }) {
  const cx = 100;
  const cy = 104;
  const r = 74;
  const ratio = Math.min(1, Math.max(0, value / max));
  const angle = START + SWEEP * ratio;
  const redFrom = START + SWEEP * 0.82;
  const orangeEnd = Math.min(angle, redFrom);
  const [nx, ny] = polar(cx, cy, r - 16, angle);

  return (
    <svg
      className="gauge"
      viewBox="0 0 200 188"
      width={size}
      height={size * 0.94}
      role="img"
      aria-label={`${display} ${unit}`}
    >
      <path d={arc(cx, cy, r, START, START + SWEEP)} className="gauge-track" />
      <path d={arc(cx, cy, r, redFrom, START + SWEEP)} className="gauge-redzone" />
      <path d={arc(cx, cy, r, START, orangeEnd)} className="gauge-glow" />
      <path d={arc(cx, cy, r, START, orangeEnd)} className="gauge-value" />
      {angle > redFrom && (
        <path d={arc(cx, cy, r, redFrom, angle)} className="gauge-hot" />
      )}
      <line x1={cx} y1={cy} x2={nx} y2={ny} className="gauge-needle" />
      <circle cx={cx} cy={cy} r="6" className="gauge-hub" />
      <circle cx={cx} cy={cy} r="2.5" className="gauge-hub-core" />
      <text x={cx} y="148" className="gauge-readout">
        {display}
      </text>
      <text x={cx} y="166" className="gauge-unit">
        {unit}
      </text>
    </svg>
  );
}
