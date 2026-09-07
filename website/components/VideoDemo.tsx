/**
 * A screen recording, or a labelled slot where one will go.
 *
 * Drop a file into `public/media/` and pass its `src` — nothing else needs to
 * change. Until then the slot renders in place, so the page reads as
 * deliberately staged rather than broken.
 *
 * Recordings are muted, looping, and play only when scrolled into view, so
 * they behave like a demo rather than an autoplaying advert. Anything with
 * narration should set `controls` and drop `loop`.
 */

export type VideoDemoProps = {
  /** Title bar text, e.g. "Claude Desktop · MCP App". */
  label: string
  title: string
  caption: string
  /** Path under /media. Omit to render the empty slot. */
  src?: string
  /** Poster frame path. Strongly recommended when src is set. */
  poster?: string
  /** Show native controls instead of the muted-loop treatment. */
  controls?: boolean
  /** Guidance shown in the slot when no recording is supplied yet. */
  slotNote?: string
}

export default function VideoDemo({
  label,
  title,
  caption,
  src,
  poster,
  controls = false,
  slotNote,
}: VideoDemoProps) {
  return (
    <figure className="media">
      <div className="media-bar">
        <span className="tl" aria-hidden="true">
          <i style={{ background: '#ff5f57' }} />
          <i style={{ background: '#febc2e' }} />
          <i style={{ background: '#28c840' }} />
        </span>
        {label}
      </div>

      {src ? (
        <video
          src={src}
          poster={poster}
          muted={!controls}
          loop={!controls}
          controls={controls}
          playsInline
          preload="metadata"
          // autoPlay is deliberately omitted: it costs bandwidth before the
          // reader has scrolled to it, and browsers block it unpredictably.
          aria-label={title}
        />
      ) : (
        <div className="media-slot">
          <div>
            <span className="badge">Recording slot</span>
            <p>{slotNote ?? 'A screen recording of this flow drops in here.'}</p>
          </div>
        </div>
      )}

      <figcaption className="media-caption">
        <strong>{title}</strong>
        {caption}
      </figcaption>
    </figure>
  )
}
