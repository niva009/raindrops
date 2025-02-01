'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

function Providers({ children }: React.PropsWithChildren) {
  const queryClientRef = React.useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
    </QueryClientProvider>
  );
}

export default Providers;
