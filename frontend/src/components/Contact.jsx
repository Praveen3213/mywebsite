import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Send, Phone, Calendar } from 'lucide-react';
import { contactInfo } from '../mock';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission - in real implementation, this would send data to backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-[#1a1c1b]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-[#d9fb06] uppercase mb-6 tracking-tight">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-[#d9fb06] mx-auto mb-8"></div>
            <p className="text-xl text-[#888680] max-w-2xl mx-auto">
              Ready to collaborate on your next project? Let's discuss how we can work together
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h3 className="text-3xl font-bold text-[#d9fb06] mb-8">
                Let's Start a Conversation
              </h3>
              
              <div className="space-y-6 mb-8">
                <p className="text-[#888680] text-lg leading-relaxed">
                  I'm always excited to discuss new opportunities, interesting projects, 
                  and potential collaborations. Whether you're looking for a developer, 
                  researcher, or digital marketing specialist, I'd love to hear from you.
                </p>
                
                <p className="text-[#888680] text-lg leading-relaxed">
                  Currently based in Hyderabad and open to both local and remote opportunities. 
                  Feel free to reach out through any of the channels below.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="bg-[#302f2c] p-4 rounded-lg mr-4 group-hover:bg-[#3f4816] transition-colors">
                    <Mail size={24} className="text-[#d9fb06]" />
                  </div>
                  <div>
                    <h4 className="text-[#d9fb06] font-semibold mb-1">Email</h4>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-[#888680] hover:text-[#d9fb06] transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="bg-[#302f2c] p-4 rounded-lg mr-4 group-hover:bg-[#3f4816] transition-colors">
                    <Linkedin size={24} className="text-[#d9fb06]" />
                  </div>
                  <div>
                    <h4 className="text-[#d9fb06] font-semibold mb-1">LinkedIn</h4>
                    <a 
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#888680] hover:text-[#d9fb06] transition-colors"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="bg-[#302f2c] p-4 rounded-lg mr-4 group-hover:bg-[#3f4816] transition-colors">
                    <MapPin size={24} className="text-[#d9fb06]" />
                  </div>
                  <div>
                    <h4 className="text-[#d9fb06] font-semibold mb-1">Location</h4>
                    <p className="text-[#888680]">{contactInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="bg-[#302f2c] p-4 rounded-lg mr-4 group-hover:bg-[#3f4816] transition-colors">
                    <Calendar size={24} className="text-[#d9fb06]" />
                  </div>
                  <div>
                    <h4 className="text-[#d9fb06] font-semibold mb-1">Availability</h4>
                    <p className="text-[#888680]">{contactInfo.availability}</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-[#3f4816]">
                <h4 className="text-[#d9fb06] font-semibold mb-4">Quick Actions</h4>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="bg-[#d9fb06] text-[#1a1c1b] px-6 py-3 font-bold text-sm uppercase tracking-wide rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 inline-flex items-center"
                  >
                    <Mail size={16} className="mr-2" />
                    Send Email
                  </a>
                  <a 
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[#d9fb06] text-[#d9fb06] px-6 py-3 font-bold text-sm uppercase tracking-wide rounded-full hover:bg-[#d9fb06] hover:text-[#1a1c1b] hover:scale-105 transition-all duration-300 inline-flex items-center"
                  >
                    <Linkedin size={16} className="mr-2" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-[#302f2c] p-8 rounded-lg border border-[#3f4816]">
                <h3 className="text-2xl font-bold text-[#d9fb06] mb-6">
                  Send me a message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-[#d9fb06] font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1c1b] text-[#d9fb06] border border-[#3f4816] rounded-lg focus:border-[#d9fb06] focus:outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-[#d9fb06] font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1c1b] text-[#d9fb06] border border-[#3f4816] rounded-lg focus:border-[#d9fb06] focus:outline-none transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[#d9fb06] font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1c1b] text-[#d9fb06] border border-[#3f4816] rounded-lg focus:border-[#d9fb06] focus:outline-none transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[#d9fb06] font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-[#1a1c1b] text-[#d9fb06] border border-[#3f4816] rounded-lg focus:border-[#d9fb06] focus:outline-none transition-colors resize-vertical"
                      placeholder="Tell me about your project or how I can help..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#d9fb06] text-[#1a1c1b] px-8 py-4 font-bold text-lg uppercase tracking-wide rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 flex items-center justify-center"
                  >
                    <Send size={20} className="mr-2" />
                    Send Message
                  </button>
                </form>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[#888680] text-sm">
                  I typically respond within 24 hours. Looking forward to hearing from you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;