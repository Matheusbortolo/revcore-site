export function BrandLockup() {
  return (
    <span className="brand-lockup">
      <svg
        className="brand-mark"
        viewBox="0 0 26 28"
        width="26"
        height="28"
        aria-hidden="true"
      >
        <defs>
          <filter id="brand-glow-wide" x="-250%" y="-250%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="brand-glow-tight" x="-180%" y="-180%" width="460%" height="460%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
        </defs>
        <g transform="translate(13 14) skewX(-19.48) translate(-13 -14)">
          <path
            d="M19 7H7V21H19"
            fill="none"
            stroke="#FF6B00"
            strokeOpacity="0.55"
            strokeWidth="5"
            strokeLinejoin="miter"
            filter="url(#brand-glow-wide)"
          />
          <path
            d="M19 7H7V21H19"
            fill="none"
            stroke="#FF6B00"
            strokeWidth="3.6"
            strokeLinejoin="miter"
            filter="url(#brand-glow-tight)"
          />
          <path
            d="M19 7H7V21H19"
            fill="none"
            stroke="#FF6B00"
            strokeWidth="3.2"
            strokeLinejoin="miter"
          />
        </g>
      </svg>
      <span className="brand-plate">
        <span className="brand-rev">REV</span>
        <span className="brand-core">CORE</span>
      </span>
    </span>
  );
}
