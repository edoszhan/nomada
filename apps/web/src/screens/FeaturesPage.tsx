'use client';
import { Button } from '@/components/ui/button';

export default function FeaturesPage() {
  const features = [
    {
      title: "Automated Visa Processing",
      description: "Streamlined visa applications with real-time status updates."
    },
    {
      title: "Compliance Management",
      description: "Stay compliant with local regulations automatically."
    },
    {
      title: "Global Network",
      description: "Connect with other digital nomads in your destination."
    },
    {
      title: "Workplace Solutions",
      description: "Find and book coworking spaces and accommodations."
    },
    {
      title: "Tax Assistance",
      description: "Automated tax calculations and filing support."
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your needs."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Features</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to work and travel with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="mt-4">
            Explore All Features
          </Button>
        </div>
      </section>
    </div>
  );
} 