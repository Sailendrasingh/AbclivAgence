import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./theme.css"

const inter = Inter({
  subsets: ["latin"],
  preload: false, // Désactiver le préchargement pour éviter les warnings
  display: 'swap', // Améliorer les performances de chargement
})

export const metadata: Metadata = {
  title: "Gestion des Agences",
  description: "Application de gestion des agences",
}

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Script inline sécurisé pour prévenir FOUC (Flash of Unstyled Content)
            Le contenu est statique et contrôlé par le code source, donc pas de risque XSS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = stored || systemTheme;
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {
                  // localStorage non disponible (mode privé, etc.)
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  if (systemTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
