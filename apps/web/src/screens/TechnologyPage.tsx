'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function TechnologyPage() {

  const wizards = [
    {
      img: '/original-bot.png',   // 400×260 transparent PNGs in /public/bots
      title: 'Travel Planning Assistant',
      text:  'Find destinations, build itineraries and book essentials in minutes.',
    },
    {
      img: '/green-bot.jpg',
      title: 'Document Processing',
      text:  'Automate visas, passport renewals and other paperwork—no stress.',
    },
    {
      img: '/yellow-bot.jpg',
      title: 'Social Interactions',
      text:  'Stay on top of your habits, forums and trip prep with one dashboard.',
    },
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

        {/* ---------- Wizards overview ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {wizards.map((w) => (
            <div
              key={w.title}
              className="flex flex-col items-center text-center bg-blue-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <Image
                src={w.img}
                alt={w.title}
                width={160}
                height={100}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-blue-900">
                {w.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{w.text}</p>
            </div>
          ))}
        </div>

        {/* ---------- Workflow 1 & 2 diagrams ---------- */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
          {/* Workflow 1 */}
          <Image
            src="/workflow1.jpg"
            alt="Workflow 1 Diagram"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />

          {/* Workflow 2 */}
          <Image
            src="/workflow2.jpg"
            alt="Workflow 2 Diagram"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>

        <p className="mt-4 text-lg text-gray-500 text-center italic mb-12 ">
          Figure&nbsp;1.&nbsp;End‑to‑end automation flow connecting user input to actionable results via n8n and AI agents.
        </p>

        <br></br>

        {/* ---------- n8n explanation ---------- */}
        <div className="bg-blue-50 rounded-lg p-8 shadow mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Why n8n?</h2>
          <p className="text-lg text-gray-700 mb-2">
            <b>n8n</b> is the backbone of our automation. It orchestrates the entire
            workflow—connecting user input, data enrichment and AI‑powered decision making.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><b>Receives user data</b> via secure webhooks.</li>
            <li><b>Enriches &amp; validates</b> the data for analysis.</li>
            <li><b>Coordinates AI agents</b> like OpenAI for personalised output.</li>
            <li><b>Integrates external services</b> for booking, compliance and alerts.</li>
            <li><b>Returns results instantly</b>, closing the loop for the user.</li>
          </ul>
          <p className="mt-4 text-gray-700">
            This modular, low‑code approach lets us adapt and scale rapidly—making our
            platform robust, future‑proof and highly attractive to users and investors.
          </p>
        </div>

        <div className="text-center">
          <Button size="lg" className="mt-4">Get Started</Button>
        </div>
      </section>
    </div>
  );
}
