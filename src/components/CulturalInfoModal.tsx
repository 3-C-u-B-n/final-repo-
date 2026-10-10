import React from 'react';
import { Garment } from '../types';
import { OCCASIONS } from '../data/fashionData';
import { X, Sparkles, Feather, Compass, Landmark, BookOpen, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  garment: Garment;
}

export const CulturalInfoModal: React.FC<Props> = ({
  isOpen,
  onClose,
  garment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border border-[#E8E4DC] shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
              Điển Chế Cổ Phục & Hồ Sơ Di Sản
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D7] text-[#71717A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="my-4 space-y-3.5 text-xs text-[#554A42] overflow-y-auto pr-1 no-scrollbar">
          <div>
            <div className="flex items-center justify-between text-[10px] text-[#71717A] uppercase font-semibold">
              <span>{garment.dynasty} • {garment.dynastyPeriod || garment.century}</span>
              {garment.socialClass && (
                <span className="text-[#D4AF37] font-bold">{garment.socialClass}</span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h3 className="font-serif font-bold text-2xl text-[#1E1E1E]">
                {garment.name}
              </h3>
              {garment.hanTuName && (
                <span className="text-sm font-serif text-[#D32F2F] font-semibold">
                  {garment.hanTuName}
                </span>
              )}
            </div>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#D32F2F]/10 text-[#D32F2F] font-semibold rounded-full text-[11px]">
              {garment.formality}
            </span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-[#2C2420]">
            {garment.description}
          </p>

          {/* Cấu trúc giải phẫu y phục (Anatomy) */}
          {garment.anatomy && (
            <div className="p-3.5 bg-white rounded-2xl border border-[#E8E4DC] space-y-2">
              <div className="flex items-center gap-1.5 text-[#1E1E1E] font-bold text-xs">
                <Feather className="w-4 h-4 text-[#0F4C81]" />
                <span>Cấu Trúc Giải Phẫu Y Phục (Anatomy):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#F0EBE1]">
                  <span className="font-bold text-[#1E1E1E] block">Cổ Áo:</span>
                  <span className="text-[#71717A]">{garment.anatomy.collarType}</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#F0EBE1]">
                  <span className="font-bold text-[#1E1E1E] block">Kiểu Tay:</span>
                  <span className="text-[#71717A]">{garment.anatomy.sleeveType}</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#F0EBE1]">
                  <span className="font-bold text-[#1E1E1E] block">Thân & Vạt Áo:</span>
                  <span className="text-[#71717A]">{garment.anatomy.flapStructure}</span>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#F0EBE1]">
                  <span className="font-bold text-[#1E1E1E] block">Khuy Cài:</span>
                  <span className="text-[#71717A]">{garment.anatomy.fastenerType}</span>
                </div>
              </div>
            </div>
          )}

          {/* Triết lý Nho gia & Ngũ Thường */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#D4AF37]/50 space-y-2">
            <div className="flex items-center gap-1.5 text-[#1E1E1E] font-bold text-xs">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>Triết Lý Ngũ Thường & Tứ Thân Phụ Mẫu:</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 text-center pt-1">
              {[
                { name: 'Nhân', desc: 'Lòng nhân ái' },
                { name: 'Lễ', desc: 'Mực thước lễ độ' },
                { name: 'Nghĩa', desc: 'Đạo lý thủy chung' },
                { name: 'Trí', desc: 'Sáng suốt, chính trực' },
                { name: 'Tín', desc: 'Giữ vẹn chữ tín' },
              ].map((btn) => (
                <div key={btn.name} className="p-1.5 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
                  <span className="font-serif font-bold text-sm text-[#D32F2F] block">{btn.name}</span>
                  <span className="text-[9px] text-[#71717A] block leading-tight mt-0.5">{btn.desc}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#71717A] pt-1 leading-relaxed">
              {garment.confucianMeaning}
            </p>
          </div>

          {/* Điển tích lịch sử (Historical Trivia) */}
          {garment.historicalTrivia && (
            <div className="p-3 bg-[#F4ECE1] rounded-2xl border border-[#E8DECE]">
              <div className="flex items-center gap-1.5 text-[#1E1E1E] font-semibold mb-1">
                <BookOpen className="w-3.5 h-3.5 text-[#D32F2F]" />
                <span>Giai Thoại & Điển Tích Lịch Sử:</span>
              </div>
              <p className="text-[11px] text-[#554A42] leading-relaxed">
                {garment.historicalTrivia}
              </p>
            </div>
          )}

          {/* Quy tắc lễ nghi khi vận mặc (Etiquette) */}
          {garment.etiquetteRules && (
            <div className="p-3 bg-white rounded-2xl border border-[#E8E4DC]">
              <div className="flex items-center gap-1.5 text-[#1E1E1E] font-semibold mb-1">
                <AlertCircle className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Quy Tắc Lễ Nghi Khi Vận Mặc:</span>
              </div>
              <p className="text-[11px] text-[#71717A] leading-relaxed">
                {garment.etiquetteRules}
              </p>
            </div>
          )}

          {/* Hiện vật bảo tàng (Heritage Artifact Location) */}
          {garment.heritageArtifactLocation && (
            <div className="p-3 bg-white rounded-2xl border border-[#E8E4DC] flex items-start gap-2.5">
              <Landmark className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1E1E1E] block">Bảo Tàng Lưu Giữ Hiện Vật Gốc:</span>
                <span className="text-[11px] text-[#71717A]">{garment.heritageArtifactLocation}</span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#1E1E1E] hover:bg-[#2C2C2C] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          Đã hiểu • Tiếp tục trải nghiệm
        </button>
      </div>
    </div>
  );
};
