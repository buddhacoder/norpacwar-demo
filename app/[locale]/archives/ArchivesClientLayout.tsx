'use client';

import { motion } from 'framer-motion';
import { ArchiveSearch, Article } from '@/components/ArchiveSearch';
import ArtifactViewer, { Artifact } from '@/components/ArtifactViewer';

const defaultArtifacts: Artifact[] = [
  { _id: "1", artifact_id: "A-01", title_en: "Vintage Recon Camera", title_ru: "Разведывательная Камера", description_en: "Standard issue military surveillance camera.", description_ru: "Стандартная военная камера наблюдения.", model_url: "/models/artifacts/Vintage_Recon_Camera.glb" },
  { _id: "2", artifact_id: "A-02", title_en: "Soldier Canteen", title_ru: "Солдатская Фляга", description_en: "Water canteen issued to infantry.", description_ru: "Полевая фляга пехотинца.", model_url: "/models/artifacts/Soldier_Canteen.glb" },
  { _id: "3", artifact_id: "A-03", title_en: "Trench Lantern", title_ru: "Окопный Фонарь", description_en: "Kerosene lantern for illumination in bunkers.", description_ru: "Керосиновая лампа для бункеров.", model_url: "/models/artifacts/Trench_Lantern.glb" },
  { _id: "4", artifact_id: "A-04", title_en: "Field Radio Transmitter", title_ru: "Полевая Радиостанция", description_en: "Vital communication equipment.", description_ru: "Жизненно важное оборудование связи.", model_url: "/models/artifacts/Field_Radio_Transmitter.glb" },
  { _id: "5", artifact_id: "A-05", title_en: "Damaged Pilot Helmet", title_ru: "Поврежденный Шлем", description_en: "A severely damaged flight helmet recovered from the Aleutian theatre.", description_ru: "Сильно поврежденный шлем пилота.", model_url: "/models/artifacts/Battle_Damaged_Helmet.glb" },
  { _id: "6", artifact_id: "A-06", title_en: "Shrapnel Remnant", title_ru: "Осколок", description_en: "A jagged piece of metallic shrapnel.", description_ru: "Металлический осколок от снаряда.", model_url: "/models/artifacts/Shrapnel_Piece.glb" },
  { _id: "7", artifact_id: "A-07", title_en: "Ammunition Crate", title_ru: "Ящик с Боеприпасами", description_en: "Wooden supply crate for frontline troops.", description_ru: "Деревянный ящик для передовой.", model_url: "/models/artifacts/Supply_Crate.glb" },
  { _id: "8", artifact_id: "A-08", title_en: "Transport Vehicle Base", title_ru: "Транспортная База", description_en: "Framework of a military transport vehicle.", description_ru: "Каркас военного транспорта.", model_url: "/models/artifacts/Transport_Vehicle.glb" },
  { _id: "9", artifact_id: "A-09", title_en: "Aircraft Engine Part", title_ru: "Деталь Двигателя", description_en: "An extracted engine part from a downed aircraft.", description_ru: "Деталь двигателя сбитого самолета.", model_url: "/models/artifacts/Aircraft_Engine_Part.glb" },
  { _id: "10", artifact_id: "A-10", title_en: "Sub-Zero Uniform", title_ru: "Зимняя Униформа", description_en: "Period clothing critical for surviving the freezing conditions.", description_ru: "Одежда для выживания в морозы.", model_url: "/models/artifacts/Period_Clothing_Artifact.glb" },
];

export default function ArchivesClientLayout({ articles, artifacts }: { articles: Article[], artifacts: Artifact[] }) {
  const displayArtifacts = artifacts.length > 0 ? artifacts : defaultArtifacts;
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Archival Diaries & Artifacts</h1>
        <div className="h-1 w-24 bg-[var(--gold)] mb-8"></div>
        
        {/* The 3D Digital Exhibit */}
        <ArtifactViewer initialArtifacts={displayArtifacts} />
        
        <div className="max-w-3xl mb-16 mt-12">
          <ArchiveSearch articles={articles} />
          <p className="text-lg text-gray-300 leading-relaxed font-light mt-8">
            Primary sources, from combat diaries to casualty records, provide an unstinting look into the human cost and the daily reality of the North Pacific theatre. Explore the preserved documents of the Allied and Japanese forces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl text-[var(--gold)] font-serif border-b border-white/10 pb-4">Personal Accounts</h3>
            
            <div className="glass-panel p-6 rounded-sm border-l-4 border-[var(--gold)] bg-gradient-to-r from-white/5 to-transparent">
              <h4 className="text-lg text-white font-medium mb-2">Thomas "Bob" McKelvey</h4>
              <p className="text-gray-400 font-light text-sm italic mb-4">
                "The fog didn't just hide the land; it became the land. You flew on instruments and trust."
              </p>
              <div className="text-xs text-[var(--gold)] uppercase tracking-wider font-semibold hover:underline cursor-pointer">Read Full Diary →</div>
            </div>

            <div className="glass-panel p-6 rounded-sm border-l-4 border-[var(--gold)] bg-gradient-to-r from-white/5 to-transparent">
              <h4 className="text-lg text-white font-medium mb-2">Lewis "Pat" Patteson</h4>
              <p className="text-gray-400 font-light text-sm italic mb-4">
                "We knew the Japanese were there, but the weather was our worst enemy..."
              </p>
              <div className="text-xs text-[var(--gold)] uppercase tracking-wider font-semibold hover:underline cursor-pointer">Read Full Diary →</div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-2xl text-[var(--museumRed)] font-serif border-b border-white/10 pb-4">Loss Records</h3>
            
            <div className="glass-panel p-6 rounded-sm hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-[var(--museumRed)]/30">
              <h4 className="text-lg text-white font-medium mb-2">PV-1 Ventura Losses</h4>
              <p className="text-gray-400 font-light text-sm mb-4">
                Detailed records of PV-1 aircraft lost in the North Pacific Theater due to combat and weather.
              </p>
              <div className="text-xs text-[var(--museumRed)] uppercase tracking-wider font-semibold">View Records →</div>
            </div>

            <div className="glass-panel p-6 rounded-sm hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-[var(--museumRed)]/30">
              <h4 className="text-lg text-white font-medium mb-2">Allied & Japanese Aircraft Losses</h4>
              <p className="text-gray-400 font-light text-sm mb-4">
                Comprehensive database of downed aircraft from both sides of the conflict.
              </p>
              <div className="text-xs text-[var(--museumRed)] uppercase tracking-wider font-semibold">View Database →</div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
