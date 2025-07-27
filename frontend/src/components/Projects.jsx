import React, { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { projects } from '../mock';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', 'Web Development', 'Research', 'Marketing', 'Design'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-24 bg-[#302f2c]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-[#d9fb06] uppercase mb-6 tracking-tight">
              Projects
            </h2>
            <div className="w-24 h-1 bg-[#d9fb06] mx-auto mb-8"></div>
            <p className="text-xl text-[#888680] max-w-2xl mx-auto">
              A showcase of my work spanning web development, research, and digital marketing
            </p>
          </div>

          {/* Featured Projects Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-[#d9fb06] mb-8 flex items-center">
              <span className="bg-[#d9fb06] text-[#1a1c1b] px-3 py-1 text-sm font-bold uppercase rounded-full mr-4">
                Featured
              </span>
              Highlighted Work
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-[#1a1c1b] rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 border border-[#3f4816] hover:border-[#d9fb06]"
                >
                  {/* Project Header */}
                  <div className="p-6 border-b border-[#3f4816]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-[#3f4816] text-[#d9fb06] px-3 py-1 text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                      <div className="flex space-x-2">
                        {project.github && (
                          <a 
                            href={project.github}
                            className="text-[#888680] hover:text-[#d9fb06] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        <a 
                          href={project.link}
                          className="text-[#888680] hover:text-[#d9fb06] transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-[#d9fb06] mb-3">
                      {project.title}
                    </h4>
                    
                    <p className="text-[#888680] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-[#302f2c] text-[#d9fb06] px-3 py-1 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center text-[#888680] mb-4 md:mb-0">
              <Filter size={20} className="mr-2" />
              <span className="font-medium">Filter by category:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-[#d9fb06] text-[#1a1c1b] scale-105'
                    : 'bg-[#1a1c1b] text-[#d9fb06] border border-[#3f4816] hover:border-[#d9fb06] hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* All Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-[#1a1c1b] rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 border border-[#3f4816] hover:border-[#d9fb06]"
              >
                {/* Project Header */}
                <div className="p-6 border-b border-[#3f4816]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#3f4816] text-[#d9fb06] px-3 py-1 text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                    <div className="flex space-x-2">
                      {project.github && (
                        <a 
                          href={project.github}
                          className="text-[#888680] hover:text-[#d9fb06] transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      <a 
                        href={project.link}
                        className="text-[#888680] hover:text-[#d9fb06] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-[#d9fb06] mb-3">
                    {project.title}
                  </h4>
                  
                  <p className="text-[#888680] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-[#302f2c] text-[#d9fb06] px-3 py-1 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#888680] text-xl">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;