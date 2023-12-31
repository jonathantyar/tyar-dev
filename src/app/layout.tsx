import type { Metadata } from 'next'
import { Anonymous_Pro } from 'next/font/google'
import './globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

const inter = Anonymous_Pro({
  subsets: ['latin'],
  weight: '400'
})
config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Jonathan Tyar',
  description: 'Experienced Fullstack Engineer - I build exceptional and accessible digital experiences for the web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth focus:scroll-auto bg-zinc-950 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
