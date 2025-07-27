import React from 'react';
import { Mail, Linkedin, Heart, ArrowUp } from 'lucide-react';
import { personalInfo, contactInfo } from '../mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#302f2c] border-t border-[#3f4816]">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-black text-[#d9fb06] uppercase tracking-tight mb-2">
                Praveen Reddy
              </h3>
              <p className="text-[#888680] text-lg font-medium">
                {personalInfo.title}
              </p>
            </div>
            
            <p className="text-[#888680] leading-relaxed">
              Building innovative solutions through code, research, and digital strategy. 
              Always excited to take on new challenges and collaborate on meaningful projects.
            </p>

            <div className="flex space-x-4">
              <a 
                href={`mailto:${contactInfo.email}`}
                className="bg-[#1a1c1b] p-3 rounded-lg text-[#d9fb06] hover:bg-[#3f4816] hover:scale-110 transition-all duration-300"
                title="Send Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1c1b] p-3 rounded-lg text-[#d9fb06] hover:bg-[#3f4816] hover:scale-110 transition-all duration-300"
                title="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#d9fb06] uppercase tracking-wide">
              Quick Links
            </h4>
            
            <nav className="space-y-3">
              {[
                { href: '#home', label: 'Home' },
                { href: '#about', label: 'About' },
                { href: '#experience', label: 'Experience' },
                { href: '#skills', label: 'Skills' },
                { href: '#projects', label: 'Projects' },
                { href: '#contact', label: 'Contact' }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[#888680] hover:text-[#d9fb06] transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#d9fb06] uppercase tracking-wide">
              Get In Touch
            </h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-[#d9fb06] font-medium mb-1">Location</p>
                <p className="text-[#888680]">{contactInfo.location}</p>
              </div>
              
              <div>
                <p className="text-[#d9fb06] font-medium mb-1">Email</p>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-[#888680] hover:text-[#d9fb06] transition-colors duration-300"
                >
                  {contactInfo.email}
                </a>
              </div>
              
              <div>
                <p className="text-[#d9fb06] font-medium mb-1">Status</p>
                <p className="text-[#888680]">{contactInfo.availability}</p>
              </div>
            </div>

            <div className="pt-6">
              <a 
                href="#contact"
                className="bg-[#d9fb06] text-[#1a1c1b] px-6 py-3 font-bold text-sm uppercase tracking-wide rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 inline-block"
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-[#3f4816] flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center text-[#888680] mb-4 md:mb-0">
            <span>© {currentYear} Praveen Reddy. Made with</span>
            <Heart size={16} className="mx-2 text-[#d9fb06]" fill="currentColor" />
            <span>and lots of coffee ☕</span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center text-[#888680] hover:text-[#d9fb06] transition-colors duration-300 group"
          >
            <span className="mr-2 font-medium">Back to top</span>
            <ArrowUp size={16} className="group-hover:translate-y-[-2px] transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;