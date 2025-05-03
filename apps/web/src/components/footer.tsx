// apps/web/src/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 text-xs text-center space-x-3">
      <span>© 2025 Nomada. All rights reserved.</span>
      <Link href="/terms">Terms</Link>〡
      <Link href="/privacy">Privacy Policy</Link>〡
      <Link href="https://status.nomada.ai" target="_blank">Status</Link>〡
      <Link href="https://instagram.com/we.nomada" target="_blank">IG</Link>
    </footer>
  );
}
