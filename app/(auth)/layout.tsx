import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <Image src="/icons/auth.png" alt="Auth img" width={700} height={700}/>
        </div>
      </div>
    </main>
  );
}
