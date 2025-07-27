import React from 'react';
import { Code, Palette, TrendingUp, Wrench } from 'lucide-react';
import { skills } from '../mock';

const Skills = () => {
  const categoryIcons = {
    "Frontend Development": <Code size={32} />,
    "Backend Development": <Wrench size={32} />,
    "Digital Marketing": <TrendingUp size={32} />,
    "Design & Tools": <Palette size={32} />
  };

  return (
    <section id="skills" className="py-24 bg-[#1a1c1b]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-[#d9fb06] uppercase mb-6 tracking-tight">
              Skills
            </h2>
            <div className="w-24 h-1 bg-[#d9fb06] mx-auto mb-8"></div>
            <p className="text-xl text-[#888680] max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and professional capabilities
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                className="bg-[#302f2c] p-8 rounded-lg hover:bg-[#3f4816] transition-all duration-300 hover:scale-105 border border-[#3f4816]"
              >
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className="text-[#d9fb06] mr-4">
                    {categoryIcons[category.category]}
                  </div>
                  <h3 className="text-2xl font-bold text-[#d9fb06]">
                    {category.category}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#d9fb06] font-medium text-lg">
                          {skill.name}
                        </span>
                        <span className="text-[#888680] text-sm font-medium">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-[#1a1c1b] rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#d9fb06] to-[#3f4816] h-full transition-all duration-1000 ease-out rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-[#302f2c] p-8 rounded-lg border border-[#3f4816]">
              <h3 className="text-2xl font-bold text-[#d9fb06] mb-4">
                Always Learning & Growing
              </h3>
              <p className="text-[#888680] text-lg max-w-3xl mx-auto leading-relaxed">
                Technology evolves rapidly, and I'm committed to continuous learning. 
                I regularly update my skills through online courses, workshops, and hands-on projects. 
                Currently exploring advanced React patterns, cloud technologies, and AI/ML applications.
              </p>
              
              <div className="mt-6">
                <a 
                  href="#projects"
                  className="bg-[#d9fb06] text-[#1a1c1b] px-8 py-4 font-bold text-lg uppercase tracking-wide rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 inline-block"
                >
                  View My Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;