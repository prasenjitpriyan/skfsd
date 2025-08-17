import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata = {
  title: 'SOUTH KOLKATA FIRST SUB DIVISION',
  description:
    'Daily performance monitoring and supervision platform for all 40 post offices under South Kolkata First Sub Division.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
