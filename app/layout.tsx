import type { Metadata } from "next";
import { ShortlistProvider } from "@/context/ShortlistContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InquiryModal } from "@/components/InquiryModal";
import { ShortlistDrawer } from "@/components/ShortlistDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tajmahal Products — Six Generations of Handmade Rug Excellence | Bhadohi, India",
  description:
    "Six generations of handmade carpet and rug craftsmanship from Bhadohi, India. Bespoke hand-knotted and hand-tufted heirlooms for international buyers, architectural projects, and private estates.",
  keywords: [
    "Tajmahal Products",
    "Bhadohi carpets",
    "Handmade rugs India",
    "Hand-knotted rugs",
    "Kazzak rugs",
    "Mughal carpets",
    "Gabbeh rugs",
    "Moroccan Berber rugs",
    "Hand-tufted rugs",
    "Star Export House",
    "CEPC certified carpet exporter",
  ],
  icons: {
    icon: "/images/cepc-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-white text-[#1C1C1C] selection:bg-[#0F2C59] selection:text-white">
        <LanguageProvider>
          <ShortlistProvider>
            <div className="min-h-screen flex flex-col justify-between">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>

            {/* Global Interactive Elements */}
            <InquiryModal />
            <ShortlistDrawer />

            {/* Hidden Google Translate Hook for full-page translation */}
            <div id="google_translate_element" className="hidden" aria-hidden="true" />
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
                  function googleTranslateElementInit() {
                    try {
                      if (window.google && window.google.translate) {
                        new window.google.translate.TranslateElement({
                          pageLanguage: 'en',
                          includedLanguages: 'en,fr,de,es,ar,it,ja,ru',
                          autoDisplay: false
                        }, 'google_translate_element');
                      }
                    } catch(e) {}
                  }
                `,
              }}
            />
            <script
              type="text/javascript"
              src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
              async
            />
          </ShortlistProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
