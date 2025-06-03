import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Zsolt Apponyi - AI Specialist & Full-Stack Developer',
  description: 'Building intelligent AI agents, RAG systems, and modern React applications. From chatbots to complex multi-agent workflows - crafting the future of AI-powered web experiences.',
  keywords: ['AI Specialist', 'Full-Stack Developer', 'RAG Systems', 'React', 'Next.js', 'AI Agents', 'Machine Learning'],
  authors: [{ name: 'Zsolt Apponyi' }],
  creator: 'Zsolt Apponyi',
  openGraph: {
    title: 'Zsolt Apponyi - AI Specialist & Full-Stack Developer',
    description: 'Building intelligent AI agents, RAG systems, and modern React applications.',
    url: 'https://zsolt.app',
    siteName: 'Zsolt Apponyi Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zsolt Apponyi - AI Specialist & Full-Stack Developer',
    description: 'Building intelligent AI agents, RAG systems, and modern React applications.',
    creator: '@zsoltapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
