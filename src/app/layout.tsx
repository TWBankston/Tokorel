import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TOKOREL SERIES | Enter the Universe",
  description:
    "Two civilizations divided for 200 years. One prophecy that could change everything. Enter the Tokorel Universe — an epic sci-fi romance saga.",
  keywords: [
    "Tokorel",
    "sci-fi",
    "science fiction",
    "romance",
    "book series",
    "The Sentence",
    "Drew Bankston",
  ],
  openGraph: {
    title: "TOKOREL SERIES | Enter the Universe",
    description:
      "Two civilizations divided for 200 years. One prophecy that could change everything.",
    type: "website",
    url: "https://www.tokorel.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <head>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=373827387337237&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${spaceGrotesk.variable} font-[family-name:var(--font-display)] antialiased overflow-x-hidden`}>
        <AuthProvider>
        {children}
        </AuthProvider>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '373827387337237');
fbq('track', 'PageView');`}
        </Script>
      </body>
    </html>
  );
}
