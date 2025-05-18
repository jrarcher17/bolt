import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";


export const metadata = {
  title: "The AI Code Editor",
  description: "Designed to maximize your productivity, the AI Code Editor is the ultimate AI-powered coding tool.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        
      >
        <ConvexClientProvider>
        <Provider>
         {children}
         <Toaster />
        </Provider>
        </ConvexClientProvider>
       
      </body>
    </html>
  );
}
