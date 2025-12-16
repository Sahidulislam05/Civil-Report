import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react";
import { Link } from "react-router";

export default function Contact() {
  return (
    <section id="contact" className="pb-24 pt-10 bg-base-100 text-base-content">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-base-content/60">Let's discuss our project</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-base-200 rounded-lg text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-base-content/60 mb-1">Email</p>
                <a
                  href="mailto:sahidulislamcst@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  sahidulislamcst@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-base-200 rounded-lg text-secondary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-base-content/60 mb-1">Phone</p>
                <a
                  href="tel:+8801960854767"
                  className="hover:text-secondary transition-colors"
                >
                  +880 1960 854 767
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-base-200 rounded-lg text-accent">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-base-content/60 mb-1">Location</p>
                <p>Tangail, Bangladesh</p>
              </div>
            </div>

            {/* Social */}
            <div className="pt-8 flex gap-4">
              <a
                href="https://www.linkedin.com/in/sahidulislam05"
                target="_blank"
                className="
                  p-3 bg-base-200 rounded-full
                  hover:bg-primary hover:text-primary-content
                  transition-all hover:-translate-y-1
                "
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="https://github.com/Sahidulislam05"
                target="_blank"
                className="
                  p-3 bg-base-200 rounded-full
                  hover:bg-neutral hover:text-neutral-content
                  transition-all hover:-translate-y-1
                "
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              bg-base-200
              border border-base-300
              p-8 rounded-2xl
            "
          >
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="
                    w-full bg-base-100
                    border border-base-300
                    rounded-lg px-4 py-3
                    focus:outline-none
                    focus:border-primary
                    focus:ring-1 focus:ring-primary
                    transition
                  "
                  placeholder="Your Name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="
                    w-full bg-base-100
                    border border-base-300
                    rounded-lg px-4 py-3
                    focus:outline-none
                    focus:border-primary
                    focus:ring-1 focus:ring-primary
                    transition
                  "
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="
                    w-full bg-base-100
                    border border-base-300
                    rounded-lg px-4 py-3
                    resize-none
                    focus:outline-none
                    focus:border-primary
                    focus:ring-1 focus:ring-primary
                    transition
                  "
                  placeholder="How can I help you?"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="
                  w-full py-3 rounded-lg
                  bg-primary text-primary-content
                  font-medium
                  hover:shadow-lg
                  transition-all flex items-center
                  justify-center gap-2
                "
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
