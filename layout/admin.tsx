import { LayoutProps } from '@/models';
import * as React from 'react';

export function AdminLayout ({children}: LayoutProps) {
  return (
    <div>
      <header>Header Admin </header>
      <main>
        <h1>Title Admin </h1>
        <div>
            {children}
        </div>
        <footer>
            Footer Admin
        </footer>
      </main>
    </div>
  );
}
