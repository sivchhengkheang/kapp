"use client";

import dynamic from "next/dynamic";
import { Footer } from "../../utils/Footer";
import { AnimatedSection } from "../../utils/AnimatedSection";
import Link from "next/link";

const Navbar = dynamic(() => import("../../utils/Navbar"), { ssr: false });

export default function AboutPage() {
  const steps = [
    {
      id: "01",
      title: "Discover Games",
      description: "Browse our curated library of educational mini-games designed to make learning fun and engaging.",
      icon: "🎮"
    },
    {
      id: "02",
      title: "Learn & Play",
      description: "Dive into interactive challenges that test your knowledge while you play. Master new skills seamlessly.",
      icon: "🧠"
    },
    {
      id: "03",
      title: "Track Progress",
      description: "Climb the leaderboard, earn badges, and watch your knowledge grow over time with detailed analytics.",
      icon: "📈"
    }
  ];

  return (
    <main className="min-h-screen w-full bg-[#f8f9fb] dark:bg-gray-950 text-gray-900 dark:text-gray-50 pt-16 flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Header Section */}
        <AnimatedSection mode="page-load" className="mx-auto max-w-[1200px] px-5 sm:px-6 pt-20 pb-16 text-center">
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
            How It Works
          </p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
            Learning, Reimagined.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400 font-medium">
            Kapp combines the thrill of gaming with the power of education. Our platform is built to make learning interactive, accessible, and fun for everyone.
          </p>
        </AnimatedSection>

        {/* Steps Grid */}
        <section className="mx-auto max-w-[1200px] px-5 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <AnimatedSection key={step.id} delay={(index + 1) as 1 | 2 | 3} className="relative group p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute top-8 right-8 text-6xl font-black text-gray-100 dark:text-white/5 opacity-50 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 pointer-events-none">
                  {step.id}
                </div>
                <div className="h-14 w-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-3xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <AnimatedSection delay={3} className="mx-auto max-w-[1200px] px-5 sm:px-6 py-24 text-center">
          <div className="bg-indigo-600 dark:bg-indigo-500 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                Ready to start your journey?
              </h2>
              <p className="text-indigo-100 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
                Join thousands of learners who are mastering new skills through the power of play.
              </p>
              <Link
                href="/#games-section"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-indigo-600 font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
              >
                Start Learning Now
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </main>
  );
}