import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { CategoryMenu } from '@/components/category-menu';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Carrefour',
  description: 'Your one-stop shop for home appliances.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <FirebaseClientProvider>
          <Providers>
            <SidebarProvider>
              <Sidebar>
                  <SidebarContent>
                      <CategoryMenu />
                  </SidebarContent>
              </Sidebar>
              <SidebarInset>
                  <div className="relative flex min-h-dvh flex-col bg-background">
                      <SiteHeader />
                      <main className="flex-1">{children}</main>
                      <SiteFooter />
                  </div>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </Providers>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
