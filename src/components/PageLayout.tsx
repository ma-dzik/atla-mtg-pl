import type { ReactNode } from 'react';
import { BackButton } from './BackButton';
import './PageLayout.css';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  showBack?: boolean;
}

export function PageLayout({ title, children, showBack = true }: PageLayoutProps) {
  return (
    <div className="page-layout">
      <header className="page-header">
        {showBack && <BackButton />}
        <h1 className="page-title">{title}</h1>
      </header>
      <main className="page-content">{children}</main>
    </div>
  );
}
