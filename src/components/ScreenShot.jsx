export function ScreenShot({ src, alt, tilt = "right", note, eager = false }) {
  return (
    <figure className={`shot shot-${tilt}`}>
      <div className="shot-frame">
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} />
      </div>
      {note ? <figcaption>{note}</figcaption> : null}
    </figure>
  );
}
