import { DISCORD_URL, PLAY_URL } from "../links";
import { DiscordIcon, PlayIcon } from "./Icons";

export function StoreLinks() {
  return (
    <div className="store-links">
      <a className="btn btn-primary" href={PLAY_URL} target="_blank" rel="noreferrer">
        <PlayIcon />
        Baixar no Google Play
      </a>
      <a className="btn btn-secondary" href={DISCORD_URL} target="_blank" rel="noreferrer">
        <DiscordIcon />
        Entrar no Discord
      </a>
    </div>
  );
}
