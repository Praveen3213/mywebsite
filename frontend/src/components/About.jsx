import React from 'react';
import { Code, Users, Lightbulb, Target } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code size={32} />,
      title: "Full Stack Development",
      description: "Expertise in modern web technologies including HTML, CSS, JavaScript, and various frameworks."
    },
    {
      icon: <Users size={32} />,
      title: "Public Relations",
      description: "Experience in digital marketing, social media management, and community engagement."
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Research & Innovation",
      description: "Currently working on cutting-edge research projects at TiHAN-IIT Hyderabad."
    },
    {
      icon: <Target size={32} />,
      title: "Problem Solving",
      description: "Strong analytical skills with a focus on creating efficient and scalable solutions."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#1a1c1b]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-[#d9fb06] uppercase mb-6 tracking-tight">
              About Me
            </h2>
            <div className="w-24 h-1 bg-[#d9fb06] mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-3xl font-bold text-[#d9fb06] mb-6">
                Building Digital Solutions & Driving Research Innovation
              </h3>
              
              <div className="space-y-6 text-[#888680] text-lg leading-relaxed">
                <p>
                  I'm a passionate full-stack developer and research enthusiast currently serving as a 
                  Junior Research Assistant Fellow at TiHAN-IIT Hyderabad. With a strong foundation in 
                  computer science and over a year of professional experience, I bring a unique blend 
                  of technical expertise and research acumen to every project.
                </p>
                
                <p>
                  My journey began with a Bachelor's degree in Computer Science from Sri Indhu Institute 
                  of Engineering and Technology, where I developed a solid foundation in programming and 
                  software development principles. Since then, I've been continuously expanding my skill 
                  set and contributing to innovative projects in both industry and academia.
                </p>
                
                <p>
                  I specialize in web development, digital marketing, and design, always striving to 
                  create user-centric solutions that make a meaningful impact. My experience spans 
                  from front-end development to public relations, giving me a comprehensive understanding 
                  of how technology and communication intersect in today's digital landscape.
                </p>
              </div>

              <div className="mt-8">
                <a 
                  href="#contact"
                  className="bg-[#d9fb06] text-[#1a1c1b] px-8 py-4 font-bold text-lg uppercase tracking-wide rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 inline-block"
                >
                  Let's Work Together
                </a>
              </div>
            </div>

            {/* Right Content - Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="bg-[#302f2c] p-6 rounded-lg hover:bg-[#3f4816] transition-all duration-300 hover:scale-105"
                >
                  <div className="text-[#d9fb06] mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-[#d9fb06] font-bold text-xl mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[#888680] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;