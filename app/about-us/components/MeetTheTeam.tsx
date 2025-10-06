// components/MeetTheTeam.jsx
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Umar Tazkeer",
    role: "Founder & Chief Strategist",
    imageUrl: "/person.jpg", // Replace with actual image
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Jane Doe",
    role: "Head of SEO",
    imageUrl: "/person.jpg", // Replace with actual image
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "John Smith",
    role: "Lead PPC Analyst",
    imageUrl: "/person.jpg", // Replace with actual image
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "John Smith",
    role: "Lead PPC Analyst",
    imageUrl: "/person.jpg", // Replace with actual image
    socials: { linkedin: "#", twitter: "#" },
  },
];

const MeetTheTeam = () => {
  return (
    <section className="bg-slate-50">
      <div className="container ">
        <h1 className="text-center">Meet Our Experts</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto text-center">
          We are a team of passionate strategists, creatives, and analysts dedicated to your success.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            // Replaced <Card> with a styled <div>
            <div key={member.name} className="bg-white border border-gray-200 rounded-lg shadow-md text-center group overflow-hidden flex flex-col">
                
                {/* Image container remains the same */}
                <div className="relative h-48 w-full">
                    <Image src={member.imageUrl} alt={`Profile of ${member.name}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300"/>
                </div>

                {/* Replaced <CardContent> with a styled <div> */}
                <div className="p-6 flex-grow">
                    {/* Replaced <CardTitle> with <h3> */}
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    {/* Replaced <CardDescription> with <p> */}
                    <p className="text-red-600 font-semibold mt-1">{member.role}</p>
                </div>
                
                {/* Replaced <CardFooter> with a styled <div> */}
                <div className="flex justify-center gap-4 pb-6 px-6">
                    <Link href={member.socials.linkedin} className="text-gray-400 hover:text-gray-900 transition-colors">
                        <Linkedin className="h-5 w-5" />
                    </Link>
                     <Link href={member.socials.twitter} className="text-gray-400 hover:text-gray-900 transition-colors">
                        <Twitter className="h-5 w-5" />
                    </Link>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;