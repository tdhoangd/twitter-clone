import Header from "@/components/header/header";
import { ThemeProvider } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Index / X",
  description: "Not a real Twitter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body
          className={cn(
            "bg-th-background text-th-primary-dark",
            inter.className
          )}
        >
          <div className={`w-full h-full flex justify-center gap-0`}>
            {/* Modal/Toaster */}
            <Header />
            {children}
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
