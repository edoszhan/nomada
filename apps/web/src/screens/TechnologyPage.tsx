'use client';
import { Button } from '@/components/ui/button';

export default function TechnologyPage() {
  const steps = [
    {
      title: "1. Sign Up",
      description: "Create your account and complete your profile in minutes."
    },
    {
      title: "2. Choose Your Destination",
      description: "Select from our list of supported countries and cities."
    },
    {
      title: "3. Automated Processing",
      description: "Our system handles all the paperwork and compliance requirements."
    },
    {
      title: "4. Start Working",
      description: "Begin your digital nomad journey with everything in place."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A simple, automated process to get you working abroad in no time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500">Process Flow Video Placeholder</p>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="mt-4">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
} 