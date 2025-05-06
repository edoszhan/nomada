'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Yersultan Doszhan",
      role: "CEO",
      description: (
        <ul className="list-disc list-inside text-left text-sm">
          <li>3+ years of experience in Backend and DevOps</li>
          <li>Multiple internships in travel and data-driven startups</li>
        </ul>
      ),
      image: "/yersultan.jpg",
      linkedin: "https://www.linkedin.com/in/edoszhan/"
    },
    {
      name: "Passavee Losripat",
      role: "Tech Lead",
      description: (
        <ul className="list-disc list-inside text-left text-sm">
          <li>3+ years of experience in professional Website Development</li>
          <li>Professional internship as an Agentic AI Researcher</li>
        </ul>
      ),
      image: "/nett.jpg",
      linkedin: "https://www.linkedin.com/in/passavee/"
    },
    {
      name: "DaeHyun Kim",
      role: "Business Lead",
      description: (
        <ul className="list-disc list-inside text-left text-sm">
          <li>Internship for Parameter Optimization for Paste Extrusion 3D Printing</li>
          <li>Tsinghua University X-lab startup summer camp</li>
        </ul>
      ),
      image: "/daehyun-linkedin.jpeg",
      linkedin: "https://www.linkedin.com/in/daehyun-kim-b83433357/"
    },
    {
      name: "Gookhee Shin",
      role: "Product Lead",
      description: (
        <ul className="list-disc list-inside text-left text-sm">
          <li>1+ year CEO from startup Listeney</li>
          <li>KFAC Research Team Leader (KAIST Financial Analysis Club)</li>
          <li>Internship for comparing organoids and tissues using bioinformatics</li>
        </ul>
      ),
      image: "/gookhee-linkedin.jpeg",
      linkedin: "https://www.linkedin.com/in/gookhee-shin-0b9658318/"
    },
    {
      name: "Erdenesaikhan Tuvshinbayar",
      role: "Design Lead",
      description: (
        <ul className="list-disc list-inside text-left text-sm">
          <li>1+ year experience with UI/UX focus</li>
          <li>Improved internal tools during internship</li>
          <li>Developed time-tracker for healthcare</li>
        </ul>
      ),
      image: "/bay.jpg",
      linkedin: "https://www.linkedin.com/in/tuvshinbayar-erdenesaikhan-1018a6266/"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the passionate individuals behind Nomada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 relative rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/linkedin.jpg"
                    alt="LinkedIn"
                    width={20}
                    height={20}
                    className="hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
              <p className="text-blue-600 mb-2">{member.role}</p>
              <div className="text-gray-600">
                {member.description}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="mt-4">
            Join Our Team
          </Button>
        </div>
      </section>
    </div>
  );
} 