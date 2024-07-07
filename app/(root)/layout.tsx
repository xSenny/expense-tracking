import Sidebar from '@/components/sidebar'
import Header from '@/components/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-[280px_1fr] ">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}
