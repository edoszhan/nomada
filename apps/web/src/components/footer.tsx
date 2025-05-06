import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 text-xs text-gray-600">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
        <span>© 2025 Nomada. All rights reserved.</span>

        {/* divider dots (hidden on mobile to save space) */}
        <div className="hidden sm:block h-3 w-px bg-gray-300" />

        <Link href="/terms" className="hover:underline">
          Terms
        </Link>

        <div className="hidden sm:block h-3 w-px bg-gray-300" />

        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>

        <div className="hidden sm:block h-3 w-px bg-gray-300" />

        <Link href="https://status.nomada.ai" target="_blank" className="hover:underline">
          Status
        </Link>

        <div className="hidden sm:block h-3 w-px bg-gray-300" />

        <Link href="https://instagram.com/we.nomada" target="_blank" className="hover:underline">
          IG
        </Link>
      </div>
    </footer>
  );
}