export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
            
            SIDEBAR
            {children}

        </body>
      </html>
    );
  }