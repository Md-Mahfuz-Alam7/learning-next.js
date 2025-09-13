import "./globals.css";
import { Roboto, Happy_Monkey } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  variable: '--font-roboto',
});

const happyMonkey = Happy_Monkey({
  subsets: ["latin"],
  weight: '400',
  variable: '--font-happy-monkey',
});

export const metadata = {
  title: {
    default: "Mihsan | Learn Next.JS",
    template: "%s | Mihsan"
  },
  description:
    "Learning Next.js A-Z and uploading progress on github",
  keywords: ['Next.js', 'React', 'JavaScript', 'Programming', 'Web Development', 'Frontend', 'Backend', 'Fullstack'],
  icons: {
    icon: '/image/mclaren.png'
  },
  metadataBase: new URL('https://mihsan.vercel.app/'),
  openGraph: {
    title: "Mihsan | Learn Next.JS",
    description: "Learning Next.js A-Z and uploading progress on github",
    url: 'https://mihsan.vercel.app/',
    siteName: "Mihsan | Learn Next.JS",
    images: [
      {
        url: '/og-mclaren.png',
        width: 800,
        height: 600,
        alt: 'Mihsan | Learn Next.JS',
      },
    ],
  },
  type: 'website',
  twitter: {
    card: 'summary_large_image',
    title: "Mihsan | Learn Next.JS",
    description: "Learning Next.js A-Z and uploading progress on github",
    image: '/og-mclaren.png',
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${happyMonkey.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
