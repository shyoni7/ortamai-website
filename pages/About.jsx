import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Target, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "../components/ui/MagneticButton";
import ScrollProgress from "../components/ui/ScrollProgress";
import { useLanguage } from "../components/LanguageContext";
import { t } from "../components/translations";

export default function About() {
  const { lang } = useLanguage();
  const tr = t[lang].about;

  return (
    <div>
      <ScrollProgress color="gradient" />

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8">
              {tr.hero_title}
            </h1>
            
            <div className="text-xl text-gray-300 leading-[1.8] space-y-6 text-right">
              <p className="leading-[1.8]">
                <strong className="text-white">{tr.who}</strong> {tr.who_text}
              </p>
              <p className="leading-[1.8]">{tr.p1}</p>
              <p className="leading-[1.8]">{tr.p2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 bg-slate-900/50 border-white/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-4xl font-bold text-white">{tr.vision_title}</h2>
              </div>
              <p className="text-xl text-gray-300 leading-[1.8] text-right">
                {tr.vision_text}
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 bg-slate-900/50 border-white/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Target className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-4xl font-bold text-white">{tr.mission_title}</h2>
              </div>
              <div className="text-xl text-gray-300 leading-[1.8] space-y-6 text-right">
                <p className="leading-[1.8]">{tr.mission_p1}</p>
                <p className="leading-[1.8]">{tr.mission_p2}</p>
                <p className="leading-[1.8] text-cyan-400 font-semibold">{tr.mission_p3}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">{tr.values_title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: tr.excellence, desc: tr.excellence_desc },
              { icon: Heart, title: tr.commitment, desc: tr.commitment_desc },
              { icon: Eye, title: tr.innovation, desc: tr.innovation_desc },
            ].map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 bg-slate-900/50 border-white/10 text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <val.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{val.title}</h3>
                  <p className="text-gray-400 leading-[1.8]">{val.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">{tr.team_title}</h2>
            <p className="text-xl text-gray-400">{tr.team_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tr.members.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-slate-900/50 border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all">
                  <div className="aspect-square overflow-hidden bg-white">
                    <img
                      src={tr.memberImages[i]}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-cyan-400 font-medium">{member.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-l from-cyan-500/20 to-purple-500/20 rounded-3xl p-12 border border-white/10 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">{tr.cta_title}</h2>
            <p className="text-xl text-gray-300 mb-8 leading-[1.8]">{tr.cta_sub}</p>
            <Link to={createPageUrl("Contact")}>
              <MagneticButton size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-lg px-10 py-6">
                {tr.cta_btn}
                <ArrowLeft className="mr-2 h-5 w-5" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}