// components/Layout.tsx
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        {/* Header içeriği */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Footer içeriği */}
      </footer>
    </div>
  );
};

export default Layout;