'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function TechnologyPage() {
  const steps = [
    { label: "Webhook", color: "bg-pink-500" },
    { label: "Edit Fields", color: "bg-blue-500" },
    { label: "AI Agent", color: "bg-green-500" },
    { label: "OpenAI", color: "bg-gray-800" },
    { label: "Respond", color: "bg-purple-500" },
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

        {/* --- Diagram Section --- */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
          {/* Image version (for investors, demo, etc.) */}
          <div className="hidden md:block">
            <Image
              src="/workflow1.jpg"
              alt="Workflow Diagram"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          {/* SVG/JSX diagram for web */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-8">
              {steps.map((step, idx) => (
                <div key={step.label} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg ${step.color}`}>
                    {step.label[0]}
                  </div>
                  <span className="mt-2 text-sm font-semibold text-gray-700">{step.label}</span>
                  {idx < steps.length - 1 && (
                    <div className="w-12 h-1 bg-gray-300 mx-2 my-2 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- n8n Explanation Section --- */}
        <div className="bg-blue-50 rounded-lg p-8 shadow mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Why n8n?</h2>
          <p className="text-lg text-gray-700 mb-2">
            <b>n8n</b> is the backbone of our automation. It orchestrates the entire workflow, connecting user input, data enrichment, and AI-powered decision making. Here's what n8n does in our system:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <b>Receives user data</b> via secure webhooks, ensuring privacy and real-time processing.
            </li>
            <li>
              <b>Enriches and validates</b> the data, preparing it for intelligent analysis.
            </li>
            <li>
              <b>Coordinates AI agents</b> (like OpenAI) to generate personalized travel plans, answer questions, and automate complex tasks.
            </li>
            <li>
              <b>Integrates with external services</b> (e.g., booking, compliance, notifications) for a seamless user experience.
            </li>
            <li>
              <b>Returns results instantly</b> to the user, closing the loop with actionable insights and next steps.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            This modular, no-code approach means we can rapidly adapt, scale, and integrate new features—making our platform robust, future-proof, and highly attractive to both users and investors.
          </p>
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