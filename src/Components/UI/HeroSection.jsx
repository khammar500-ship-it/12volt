import React from "react";

function HeroSection({ name }) {
  return (
    <div className="w-full flex items-center justify-between my-8 pr-2">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          {name}
        </h1>

        <div className="mt-2 h-1 w-16 bg-yellow-400 rounded-full" />
      </div>
    </div>
  );
}

export default HeroSection;