import type { Metadata } from "next";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import { Poppins } from "next/font/google";
import { Nunito } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '700'] });
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] });
import { Lato } from "next/font/google";
import { IBM_Plex_Sans } from "next/font/google";
const ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '700'] });

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });


const poppins = Poppins({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: "TaskFlux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <GoogleOAuthProvider clientId={clientId}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider> 
              {children}
              <Toaster position="top-right" />
            </AuthProvider>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
