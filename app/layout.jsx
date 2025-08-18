import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SKFSD - Financial Management System',
  description: 'South Kolkata Financial Services Division Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
