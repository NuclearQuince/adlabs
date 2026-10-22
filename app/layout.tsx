import type { Metadata } from "next"
import "@fontsource-variable/inter"
import "../src/index.css"

// oxlint-disable-next-line react/only-export-components
export const metadata: Metadata = {
  metadataBase: new URL("https://adlabs.in"),
  title: "AD Labs — Edge AI or Cloud for the storefront",
  description:
    "Storefront intelligence from the cameras you own. Deploy on Edge AI or Cloud. Both paths adhere to DPDP and GDPR.",
  openGraph: {
    title: "AD Labs — Edge AI or Cloud for the storefront",
    description:
      "Pass, stop, enter — measured on Edge or in the Cloud. DPDP + GDPR by design. No facial identity product.",
    url: "https://adlabs.in",
    images: ["/images/hero-storefront.jpg"],
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-[#05050a] text-[#f5f5f7] antialiased selection:bg-[#8B7CF6] selection:text-[#05050a]">
        {children}
      </body>
    </html>
  )
}
