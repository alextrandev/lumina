import { Github, Globe, Linkedin } from "lucide-react";

export function Signature() {
  return (
    <div className="author-signature">
      <div className="signature-text">
        made by <span className="signature-name">Alex Tran</span>
      </div>
      <div className="signature-links">
        <a
          href="https://alextran.dev/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website"
          className="signature-link"
        >
          <Globe size={18} />
        </a>
        <a
          href="https://github.com/alextrandev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="signature-link"
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/tduclong"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="signature-link"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </div>
  );
}
