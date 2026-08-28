export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  const box = dark ? "#f5f5f7" : "#1d1d1f"
  const ad = dark ? "#1d1d1f" : "#ffffff"
  const wordA = dark ? "#f5f5f7" : "#1d1d1f"
  const wordB = dark ? "#98989d" : "#6e6e73"
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="grid h-9 w-9 place-items-center rounded-[11px] font-inter font-extrabold"
        style={{ background: box, color: ad, fontSize: 15, letterSpacing: "-0.04em" }}
      >
        Ad
      </span>
      <span className="font-inter leading-none">
        <span className="block font-extrabold" style={{ color: wordA, fontSize: 16, letterSpacing: "-0.04em" }}>
          {`AD`}
        </span>
        <span className="block font-semibold" style={{ color: wordB, fontSize: 11, letterSpacing: "-0.02em" }}>
          Labs
        </span>
      </span>
    </span>
  )
}
