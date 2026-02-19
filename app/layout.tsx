import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Konekt. — Eventy, které lidi milují",
  description:
    "Všechny nástroje pro správu eventů v jedné aplikaci. Pro organizátory i komunity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="bg-background text-darkblue font-sans antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              color: "#315771",
              borderRadius: "20px",
              border: "none",
              boxShadow:
                "0 4px 6px -1px rgba(49, 87, 113, 0.08), 0 10px 15px -3px rgba(49, 87, 113, 0.12)",
            },
          }}
        />
      </body>
    </html>
  );
}
