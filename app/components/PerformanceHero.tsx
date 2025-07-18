// components/PerformanceHero.jsx

import Image from "next/image";

import { CheckCircle2 } from "lucide-react";
import Button from "./Button";

// You can manage the list of achievements here for easy updating
const achievements = [
  "234 to 7,64,000 Clicks using SEO (in 6 Months)",
  "45000+ Leads for an Education Institute using Google Ads",
  "Ecommerce SEO",
  "0 to 30Lakh/Month in Revenue for a D2C Brand",
];

const PerformanceHero = () => {
  return (
    <section >
      <div className="container ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- Left Column: Text Content --- */}
          <div className="space-y-6">
            <h1 >
              We are Performance Driven{" "}
              <span className="text-red-600">Agency</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              We believe in Data driven Decisions not Guess-work. Look at the
              results we can achieve –
            </p>
            <ul className="space-y-3 pt-2">
              {achievements.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
             <Button text="GET A FREE QUOTE NOW"/>
            </div>
          </div>

          {/* --- Right Column: Image Collage --- */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            {/* Secondary Dashboard Image (Behind) */}
            <Image
              src="/images/dashboard-secondary.png" // Your image path
              alt="Dashboard analytics showing performance metrics"
              width={500}
              height={300}
              className="absolute top-0 right-0 w-[80%] rounded-lg shadow-lg"
            />
            {/* Main Dashboard Image (Front) */}
            <Image
              src="/images/dashboard-main.png" // Your image path
              alt="Campaign results dashboard"
              width={600}
              height={400}
              className="absolute bottom-0 left-0 w-[90%] rounded-lg shadow-2xl border-4 border-white"
            />
            
            {/* --- Floating Annotations --- */}
            {/* You can adjust the positioning (top, left, etc.) to match your images perfectly */}
            
            <div className="absolute top-[15%] left-[10%] text-center">
              <div className="bg-blue-500 text-white rounded-full px-4 py-2 shadow-md">
                <p className="font-bold text-lg">764K</p>
                <p className="text-xs">CLICKS</p>
              </div>
              <p className="text-xs text-gray-600 mt-2 max-w-[150px]">For an Education Brand: Clicks in 6 Months</p>
            </div>

            <div className="absolute bottom-[25%] right-0 text-center">
               <div className="bg-teal-500 text-white rounded-full px-4 py-2 shadow-md">
                <p className="font-bold text-lg">16000+</p>
                <p className="text-xs">Call Leads</p>
              </div>
              <p className="text-xs text-gray-600 mt-2 max-w-[180px]">Generated 16000 Call Leads and Revenue</p>
            </div>

             <div className="absolute bottom-0 left-[35%] text-center">
               <div className="bg-purple-500 text-white rounded-full px-4 py-2 shadow-md">
                <p className="font-bold text-lg">45000+</p>
                <p className="text-xs">Leads</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceHero;