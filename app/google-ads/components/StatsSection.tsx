import React from 'react';

// You can easily add, remove, or change stats here
const statsData = [
  {
    value: '-28%',
    label: 'Decrease in Cost-Per-Conversion',
  },
  {
    value: '+30%',
    label: 'Increase in Conversion Rate',
  },
  {
    value: '+40%',
    label: 'Increase in Click Through Rate',
  },
  {
    value: '-35%',
    label: 'Reduction in Cost Per Click',
  },
];

export function StatsSection() {
  return (
    <section className="w-full bg-slate-50 ">
      <div className="container ">
        {/* Grid layout for the stats */}
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-primary lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-gray-600 md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}