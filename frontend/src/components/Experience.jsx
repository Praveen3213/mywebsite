import React from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Junior Research Assistant Fellow",
      company: "TiHAN-IIT Hyderabad",
      location: "IIT Hyderabad",
      duration: "April 2024 - Present",
      period: "1 year 4 months",
      description: [
        "Conducting cutting-edge research in technology and innovation",
        "Collaborating with multidisciplinary teams on complex projects",
        "Contributing to academic publications and research initiatives",
        "Developing innovative solutions for real-world problems"
      ],
      technologies: ["Research Methodologies", "Data Analysis", "Technical Writing", "Project Management"],
      current: true
    },
    {
      title: "Web Developer & Public Relations",
      company: "IIT Hyderabad",
      location: "IIT Hyderabad", 
      duration: "November 2023 - April 2024",
      period: "6 months",
      description: [
        "Developed and maintained web applications using modern technologies",
        "Managed social media presence and digital marketing campaigns",
        "Created engaging content for various digital platforms",
        "Coordinated public relations activities and community engagement"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Social Media Marketing", "Content Creation"],
      current: false
    }
  ];

  return (
    <section id="experience" className="py-24 bg-[#302f2c]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-[#d9fb06] uppercase mb-6 tracking-tight">
              Experience
            </h2>
            <div className="w-24 h-1 bg-[#d9fb06] mx-auto mb-8"></div>
            <p className="text-xl text-[#888680] max-w-2xl mx-auto">
              My professional journey showcasing growth, learning, and contributions to innovative projects
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-[#3f4816]"></div>

            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-16 last:mb-0">
                {/* Timeline Dot */}
                <div className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 ${exp.current ? 'bg-[#d9fb06] border-[#d9fb06]' : 'bg-[#1a1c1b] border-[#3f4816]'}`}></div>
                
                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="bg-[#1a1c1b] p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#3f4816]">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-[#d9fb06] mb-2">
                        <Building size={20} />
                        <span className="font-semibold text-lg">{exp.company}</span>
                        {exp.current && (
                          <span className="bg-[#d9fb06] text-[#1a1c1b] text-xs px-2 py-1 rounded-full font-bold uppercase">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-[#d9fb06] mb-3">
                        {exp.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-[#888680] text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{exp.location}</span>
                        </div>
                        <span className="font-medium">({exp.period})</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="text-[#888680] flex items-start">
                            <span className="text-[#d9fb06] mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-[#d9fb06] font-semibold mb-3">Key Technologies & Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="bg-[#3f4816] text-[#d9fb06] px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;