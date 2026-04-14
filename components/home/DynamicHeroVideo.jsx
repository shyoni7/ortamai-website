import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Play } from "lucide-react";

export default function DynamicHeroVideo() {
  const { data: contents } = useQuery({
    queryKey: ['hero-video'],
    queryFn: async () => {
      const allContents = await base44.entities.Content.list();
      return allContents.filter(c => c.page === 'Home' && c.section === 'hero_video' && c.is_active);
    },
    initialData: []
  });

  const { data: mediaFiles } = useQuery({
    queryKey: ['media'],
    queryFn: () => base44.entities.Media.list(),
    initialData: []
  });

  const videoContent = contents[0];
  const linkedMedia = videoContent?.media_id 
    ? mediaFiles.find(m => m.id === videoContent.media_id) 
    : null;

  return (
    <div className="relative max-w-4xl mx-auto mb-10">
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="aspect-video flex items-center justify-center bg-slate-900/50">
          {linkedMedia ? (
            linkedMedia.file_type === 'video' ? (
              <video 
                src={linkedMedia.file_url} 
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                הדפדפן שלך לא תומך בתגית וידאו.
              </video>
            ) : linkedMedia.file_type === 'image' ? (
              <img 
                src={linkedMedia.file_url} 
                alt={linkedMedia.title}
                className="w-full h-full object-cover"
              />
            ) : null
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-400 mb-4 hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-10 h-10 text-cyan-400 mr-2" fill="currentColor" />
              </div>
              <p className="text-gray-400 text-lg">צפו בסרטון ההדרכה</p>
              <p className="text-gray-600 text-sm mt-2">העלו סרטון דרך מערכת הניהול</p>
            </div>
          )}
        </div>
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-purple-400/30 rounded-br-2xl" />
      </div>
    </div>
  );
}