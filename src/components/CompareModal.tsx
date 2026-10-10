import React, { useState } from 'react';
import { OutfitConfig, CulturalAssessment, GarmentId } from '../types';
import { GARMENTS, COLORS, FABRICS, evaluateCulturalOutfit } from '../data/fashionData';
import { X, Scale, Check, ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: OutfitConfig;
  onApplyConfig: (cfg: OutfitConfig) => void;
}

const PRESET_LOOK_B: OutfitConfig = {
  gender: 'female',
  occasionId: 'tet',
  garmentId: 'nhat_binh',
  fabricId: 'brocade_gam',
  colorId: 'blue_thien_thanh',
  headpieceId: 'man_lua',
  jewelryId: 'pearl_necklace',
  handheldId: 'silk_fan',
  footwearId: 'satin_heels',
  backgroundId: 'san_dinh',
};

export const CompareModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentConfig,
  onApplyConfig,
}) => {
  const [lookB, setLookB] = useState<OutfitConfig>(PRESET_LOOK_B);

  if (!isOpen) return null;

  const evalA = evaluateCulturalOutfit(currentConfig);
  const evalB = evaluateCulturalOutfit(lookB);

  const garmentA = GARMENTS.find(g => g.id === currentConfig.garmentId) || GARMENTS[0];
  const garmentB = GARMENTS.find(g => g.id === lookB.garmentId) || GARMENTS[0];

  const colA = COLORS.find(c => c.id === currentConfig.colorId) || COLORS[0];
  const colB = COLORS.find(c => c.id === lookB.colorId) || COLORS[0];

  const fabA = FABRICS.find(f => f.id === currentConfig.fabricId) || FABRICS[0];
  const fabB = FABRICS.find(f => f.id === lookB.fabricId) || FABRICS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FBF9F4] rounded-3xl border border-[#E8E4DC] shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC]">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-lg text-[#1E1E1E]">
              So Sánh Hai Bản Phối Trang Phục
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D7] text-[#71717A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison Split Grid */}
        <div className="my-4 grid grid-cols-2 gap-3 sm:gap-4 overflow-y-auto pr-1 text-xs">
          {/* LOOK A */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#1E1E1E] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D32F2F] bg-[#D32F2F]/10 px-2 py-0.5 rounded-full">
                  Bản phối A (Hiện tại)
                </span>
                <span className="font-bold text-[#1E1E1E]">{evalA.harmonyScore.toFixed(1)}/10</span>
              </div>

              <div
                className="h-20 rounded-xl mb-3 flex items-center justify-center text-white font-serif font-bold text-base shadow-inner text-center px-2"
                style={{ backgroundColor: colA.hex }}
              >
                {garmentA.name}
              </div>

              <div className="space-y-1.5 text-[11px] text-[#554A42]">
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Chất liệu:</span>
                  <span className="font-medium text-right">{fabA.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Màu sắc:</span>
                  <span className="font-medium text-right">{colA.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Chuẩn mực:</span>
                  <span className="font-medium text-right text-emerald-700">{evalA.traditionLabel}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 w-full py-2 bg-[#1E1E1E] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Giữ Bản Phối A
            </button>
          </div>

          {/* LOOK B */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8E4DC] hover:border-[#D4AF37] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F4C81] bg-[#0F4C81]/10 px-2 py-0.5 rounded-full">
                  Bản phối B (Đối chiếu)
                </span>
                <span className="font-bold text-[#1E1E1E]">{evalB.harmonyScore.toFixed(1)}/10</span>
              </div>

              <div
                className="h-20 rounded-xl mb-3 flex items-center justify-center text-white font-serif font-bold text-base shadow-inner text-center px-2"
                style={{ backgroundColor: colB.hex }}
              >
                {garmentB.name}
              </div>

              <div className="space-y-1.5 text-[11px] text-[#554A42]">
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Chất liệu:</span>
                  <span className="font-medium text-right">{fabB.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Màu sắc:</span>
                  <span className="font-medium text-right">{colB.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Chuẩn mực:</span>
                  <span className="font-medium text-right text-emerald-700">{evalB.traditionLabel}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onApplyConfig(lookB);
                onClose();
              }}
              className="mt-4 w-full py-2 bg-[#FBF9F4] hover:bg-[#D4AF37] text-[#1E1E1E] hover:text-white rounded-xl text-xs font-semibold border border-[#E8E4DC] transition-colors cursor-pointer"
            >
              Áp Dụng Bản Phối B
            </button>
          </div>
        </div>

        {/* Quick presets for Look B */}
        <div className="pt-2 border-t border-[#E8E4DC] flex items-center justify-between text-xs">
          <span className="text-[#71717A]">Đổi mẫu đối chiếu:</span>
          <div className="flex gap-1.5">
            {GARMENTS.map(g => (
              <button
                key={g.id}
                onClick={() => setLookB(prev => ({ ...prev, garmentId: g.id }))}
                className={`px-2 py-1 rounded-lg text-[10px] font-medium border cursor-pointer ${lookB.garmentId === g.id ? 'bg-[#1E1E1E] text-white' : 'bg-white text-[#554A42] border-[#E8E4DC]'}`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
