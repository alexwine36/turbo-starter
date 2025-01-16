import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import '@repo/design-system/styles/globals.css';

import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <head>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
        rel="stylesheet"
      />

      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" />
    </head>
    <body>
      <DesignSystemProvider>{children}</DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
