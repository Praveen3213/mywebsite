import React from 'react';
import { ArrowDown, Mail, Linkedin, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-[#1a1c1b] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3f4816] to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#d9fb06] uppercase leading-none mb-6 tracking-tight">
            Praveen
            <br />
            <span className="text-[#888680]">Reddy</span>
          </h1>

          {/* Subtitle */}
          <div className="text-xl md:text-2xl text-[#d9fb06] font-semibold mb-4 uppercase tracking-wider">
            Full Stack Developer & Research Assistant
          </div>

          {/* Location */}
          <div className="flex items-center justify-center text-[#888680] mb-8">
            <MapPin size={20} className="mr-2" />
            <span className="text-lg">Hyderabad, Telangana, India</span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-[#888680] max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Passionate web developer and researcher with expertise in modern technologies, 
            currently working as a Junior Research Assistant at TiHAN-IIT Hyderabad. 
            Specializing in full-stack development and digital marketing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="#contact"
              className="bg-[#d9fb06] text-[#1a1c1b] px-8 py-4 font-bold text-lg uppercase tracking-wide rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Mail size={20} className="mr-2" />
              Get In Touch
            </a>
            <a 
              href="https://www.linkedin.com/in/praveenreddy-5b3215315"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#d9fb06] text-[#d9fb06] px-8 py-4 font-bold text-lg uppercase tracking-wide rounded-full hover:bg-[#d9fb06] hover:text-[#1a1c1b] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Linkedin size={20} className="mr-2" />
              LinkedIn
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <a href="#about" className="inline-block text-[#d9fb06] hover:opacity-80 transition-opacity">
              <ArrowDown size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;