import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import PillarCards from "../components/home/PillarCards";
import ValueProps from "../components/home/ValueProps";
import ProcessSteps from "../components/home/ProcessSteps";
import StatsSection from "../components/home/StatsSection";
import DynamicHeroVideo from "../components/home/DynamicHeroVideo";

import MagneticButton from "../components/ui/MagneticButton";
import RevealOnScroll from "../components/ui/RevealOnScroll";
import ParallaxSection from "../components/ui/ParallaxSection";
import { useLanguage } from "../components/LanguageContext";
import { t } from "../components/translations";

export default function Home() {
  const { lang } = useLanguage();
  const tr = t[lang].home;

  const { data: contents } = useQuery({
    queryKey: ['home-content'],
    queryFn: async () => {
      const allContents = await base44.entities.Content.list();
      return allContents.filter(c => c.page === 'Home' && c.is_active);
    },
    initialData: []
  });

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <ParallaxSection speed={0.3}>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          </ParallaxSection>
          <ParallaxSection speed={0.5}>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </ParallaxSection>
        </div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ParallaxSection speed={0.2}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {tr.hero_title}
              </h1>
            </ParallaxSection>
            
            <ParallaxSection speed={0.3}>
              <h2 className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-purple-400 mb-6">
                {tr.hero_subtitle}
              </h2>
            </ParallaxSection>

            <ParallaxSection speed={0.4}>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                {tr.hero_desc}
              </p>
            </ParallaxSection>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <DynamicHeroVideo />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center"
            >
              <Link to={createPageUrl("Contact")}>
                <MagneticButton 
                  size="lg" 
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-lg px-8 py-6"
                >
                  {tr.cta}
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {tr.pillars_title}
              </h2>
              <p className="text-xl text-gray-400">
                {tr.pillars_sub}
              </p>
            </div>
          </RevealOnScroll>

          <PillarCards />
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Value Propositions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {tr.why_title}
              </h2>
              <p className="text-xl text-gray-400">
                {tr.why_sub}
              </p>
            </div>
          </RevealOnScroll>

          <ValueProps />
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {tr.how_title}
              </h2>
              <p className="text-xl text-gray-400">
                {tr.how_sub}
              </p>
            </div>
          </RevealOnScroll>

          <ProcessSteps />
        </div>
      </section>

      {/* Partners Logo Cloud */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-white mb-4">
              {tr.partners_title}
            </h2>
            <p className="text-gray-400 mb-12">
              {tr.partners_sub}
            </p>
          </RevealOnScroll>
            
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {[
              { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e574c17d6cef9aeff80637/6d9c58ace_.png", alt: "ועד עובדי כלל ביטוח" },
              { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e574c17d6cef9aeff80637/97cb921a8_2.jpeg", alt: "צה״ל" },
              { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e574c17d6cef9aeff80637/40f5d2b0c_2.png", alt: "Tokomni" },
              { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e574c17d6cef9aeff80637/eb9cdb162_3.png", alt: "Omnitelecom" },
              { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e574c17d6cef9aeff80637/4a76ee3ff_566.jpg", alt: "אוניברסיטת אריאל" },
            ].map((logo, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg p-6 flex items-center justify-center h-32 shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img src={logo.src} alt={logo.alt} className="max-w-full max-h-full object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="bg-gradient-to-l from-cyan-500/20 to-purple-500/20 rounded-3xl p-12 border border-white/10 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                {tr.final_title}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {tr.final_sub}
              </p>
              <Link to={createPageUrl("Contact")}>
                <MagneticButton 
                  size="lg" 
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-lg px-10 py-6"
                >
                  {tr.final_cta}
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </MagneticButton>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}