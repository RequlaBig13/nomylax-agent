import type { ReactNode } from 'react';

export const metadata = {
  title: 'Nomylax Reference Agent',
  description: 'Open reference implementation of the Nomylax economic-intent contract',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        background: '#0b0b0b',
        color: '#f0eadf',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
      }}>
        {children}
      </body>
    </html>
  );
}
