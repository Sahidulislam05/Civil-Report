import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react";
import { Link } from "react-router";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-neutral-900/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Get In <span className="text-purple-400">Touch</span>
          </h2>
          <p className="text-neutral-400">Let's discuss your next project</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Contact Information
            </h3>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-800 rounded-lg text-cyan-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Email</p>
                <a
                  href="mailto:sahidulislamcst@gmail.com"
                  className="text-white hover:text-cyan-400 transition-colors"
                >
                  sahidulislamcst@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-800 rounded-lg text-purple-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Phone</p>
                <a
                  href="tel:+8801960854767"
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  +880 1960 854 767
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-800 rounded-lg text-pink-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Location</p>
                <p className="text-white">Tangail, Bangladesh</p>
              </div>
            </div>

            <div className="pt-8 flex gap-4">
              <Link
                href="https://www.linkedin.com/in/sahidulislam05"
                target="_blank"
                className="p-3 bg-neutral-800 rounded-full text-white hover:bg-blue-600 transition-all hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/Sahidulislam05"
                target="_blank"
                className="p-3 bg-neutral-800 rounded-full text-white hover:bg-gray-700 transition-all hover:-translate-y-1"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-900 border border-white/5 p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-400 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-400 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-400 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-2"
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
