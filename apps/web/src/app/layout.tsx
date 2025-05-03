import TopBar from '@/components/topbar';
import Footer from '@/components/footer';
import './globals.css'; // tailwind

export const metadata = {
  title: 'Nomada | Work. Travel. Social.',
  description: 'Automated onboarding for digital nomads.',
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
