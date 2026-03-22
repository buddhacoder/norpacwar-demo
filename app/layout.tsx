import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "North Pacific Skies – People and Machines",
  description: "Honoring the history of the Aleutian and Kurile campaigns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <nav className="fixed w-full z-50 glass-panel border-b-0 border-white/5 top-0 transition-all duration-300 backdrop-blur-md bg-black/30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-gold font-serif text-xl font-semibold tracking-wider">
              North Pacific Skies
            </div>
            <div className="flex gap-6 text-sm text-gray-300 font-medium tracking-wide">
              <a href="#" className="hover:text-gold transition-colors">CAMPAIGNS</a>
              <a href="#" className="hover:text-gold transition-colors">UNITS</a>
              <a href="#" className="hover:text-gold transition-colors">AIRCRAFT</a>
              <a href="#" className="hover:text-gold transition-colors">ARCHIVES</a>
              <div className="ml-4 border-l border-white/20 pl-4 flex gap-2">
                <button className="text-gold hover:text-white transition-colors">EN</button>
                <span className="text-gray-600">|</span>
                <button className="hover:text-gold transition-colors">RU</button>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-grow pt-20">
          {children}
        </main>
        <footer className="glass-panel py-8 mt-20 text-center text-gray-500 text-sm border-t border-white/10">
          <p>© {new Date().getFullYear()} North Pacific Skies Memorial. All Rights Reserved.</p>
          <p className="mt-2 text-xs italic opacity-70">Dedicated to the veterans of the North Pacific theatre.</p>
        </footer>
      </body>
    </html>
  );
}
