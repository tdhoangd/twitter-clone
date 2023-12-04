import {cn} from '@/utils/helpers';
import '@/styles/globals.css';
import {Providers} from '@/app/providers';

export const metadata = {
  title: 'Index / X',
  description: 'Not a real Twitter',
};

export default function RootLayout({children}) {
  return (
      <>
        <html lang="en">
        <Providers>
          <body className={'bg-cc-bg-primary text-cc-text-primary'}>
          {children}
          </body>
        </Providers>
        </html>
      </>
  );
}
