/** Consistent number / percent / delta formatting for the live dashboard. */

export function fmtInt(n: number, locale = "en-IN"): string {
  return Math.round(n).toLocaleString(locale)
}

export function fmtPct(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`
}

export function fmtPp(n: number, digits = 1): string {
  const sign = n > 0 ? "+" : ""
  return `${sign}${n.toFixed(digits)}pp`
}

export function fmtCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000) return `${(n / 1_000).toFixed(1)}k`
  return fmtInt(n)
}
