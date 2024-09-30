export const metadata = {
  title: "Rating App blog admin",
  description: "Rating App blog admin",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
