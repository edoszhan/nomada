'use client';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Nomada</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering digital nomads to work, travel, and connect seamlessly across borders.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-20">
          <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              autoPlay
              muted
              loop
              poster="/video-poster.jpg"
            >
              <source src="/nomada_demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <div className="space-y-6">
            <p className="text-gray-600 text-lg">
              We're on a mission to simplify the digital nomad lifestyle by providing automated onboarding solutions that make international work and travel accessible to everyone.
            </p>
            <p className="text-gray-600 text-lg">
              Our platform streamlines the process of working abroad, handling everything from visa applications to local compliance, so you can focus on what matters most - your work and experiences.
            </p>
          </div>
          <Button size="lg" className="mt-8">
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
} 