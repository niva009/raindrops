import { Bai_Jamjuree as FontBai } from 'next/font/google';
import { Metadata } from 'next';
import ReduxProvider from './provider/redux-provider';

import './[lang]/globals.css';
import '@assets/css/google-font.css';

const fontBai = FontBai({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bai',
});



export const metadata: Metadata = {
  title: 'raindrops',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        className={fontBai.variable}
        suppressHydrationWarning={true}
      >
        <ReduxProvider>
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
