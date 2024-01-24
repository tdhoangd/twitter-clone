import "@/styles/globals.css";
import { Providers } from "@/app/providers";

export const metadata = {
  title: "Index / X",
  description: "Not a real Twitter",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <Providers>
          <body className="text-color-text-main bg-color-bg ">{children}</body>
        </Providers>
      </html>
    </>
  );
}
