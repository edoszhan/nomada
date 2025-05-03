// apps/web/src/components/TopBar.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TopBar() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-sm">
      {/* Logo */}
      <Link href="/about" className="text-xl font-bold tracking-tight">
        Nomada
      </Link>

      {/* Center nav */}
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <Link href="/about">About</Link>
        <Link href="/features">Features</Link>
        <Link href="/how-it-works">How&nbsp;It&nbsp;Works</Link>
        <Link href="/team">Team</Link>
      </nav>

      {/* Right actions */}
      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild>
          <Link href="/book-demo">Book&nbsp;Demo</Link>
        </Button>
      </div>
    </header>
  );
}
