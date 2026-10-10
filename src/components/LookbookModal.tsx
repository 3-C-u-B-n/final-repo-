import React, { useRef, useState } from 'react';
import { OutfitConfig, CulturalAssessment } from '../types';
import {
  GARMENTS,
  COLORS,
  FABRICS,
  OCCASIONS,
  HEADPIECES,
  JEWELRIES,
  HANDHELDS,
  FOOTWEARS,
} from '../data/fashionData';
import { X, Download, Share2, Check, Sparkles, QrCode } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: OutfitConfig;
  assessment: CulturalAssessment;
}

export const LookbookModal: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  assessment,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const posterRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const garment = GARMENTS.find(g => g.id === config.garmentId) || GARMENTS[0];
  const col = COLORS.find(c => c.id === config.colorId) || COLORS[0];
  const fab = FABRICS.find(f => f.id === config.fabricId) || FABRICS[0];
  const occ = OCCASIONS.find(o => o.id === config.occasionId) || OCCASIONS[0];
  const head = HEADPIECES.find(h => h.id === config.headpieceId) || HEADPIECES[0];
  const jew = JEWELRIES.find(j => j.id === config.jewelryId) || JEWELRIES[0];
  const item = HANDHELDS.find(h => h.id === config.handheldId) || HANDHELDS[0];
  const shoe = FOOTWEARS.find(s => s.id === config.footwearId) || FOOTWEARS[0];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPoster = () => {
    setDownloading(true);
    // Draw 9:16 poster canvas and export
    const posterCanvas = document.createElement('canvas');
    posterCanvas.width = 1080;
    posterCanvas.height = 1920;
    const ctx = posterCanvas.getContext('2d');

    if (ctx) {
      // 9:16 Poster Background: Off-white luxury parchment with charcoal border
      ctx.fillStyle = '#FBF9F4';
      ctx.fillRect(0, 0, 1080, 1920);

      // Border & Seal
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, 1000, 1840);

      // Header Serif
      ctx.font = 'bold 54px "Lora", serif';
      ctx.fillStyle = '#1E1E1E';
      ctx.textAlign = 'center';
      ctx.fillText('SẮC VIỆT REMIX', 540, 130);

      ctx.font = '500 24px "Be Vietnam Pro", sans-serif';
      ctx.fillStyle = '#8C7A6B';
      ctx.fillText(`LOOKBOOK DI SẢN • VIỆT PHỤC ĐƯƠNG ĐẠI • ${occ.name.toUpperCase()}`, 540, 180);

      // Divider Line
      ctx.strokeStyle = '#E0D8CB';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(120, 220); ctx.lineTo(960, 220);
      ctx.stroke();

      // Main Garment Highlight
      ctx.font = 'bold 68px "Lora", serif';
      ctx.fillStyle = '#D32F2F';
      ctx.fillText(garment.name.toUpperCase(), 540, 310);

      ctx.font = '500 26px "Be Vietnam Pro", sans-serif';
      ctx.fillStyle = '#554A42';
      ctx.fillText(`${garment.dynasty} • ${garment.century}`, 540, 360);

      // Central Decorative Art Frame
      ctx.fillStyle = '#FAF7F0';
      ctx.fillRect(140, 420, 800, 960);
      ctx.strokeStyle = '#ECE5D8';
      ctx.strokeRect(140, 420, 800, 960);

      // Draw artistic swatches & breakdown
      ctx.font = 'bold 30px "Lora", serif';
      ctx.fillStyle = '#1E1E1E';
      ctx.textAlign = 'left';
      ctx.fillText('BẢN PHỐI CHI TIẾT', 180, 500);

      const specs = [
        { label: 'Trang phục:', val: `${garment.name} (${garment.formality})` },
        { label: 'Chất liệu:', val: `${fab.name} • Hành ${fab.element}` },
        { label: 'Sắc màu:', val: `${col.name} • Hành ${col.element}` },
        { label: 'Khăn / Mấn:', val: head.name },
        { label: 'Trang sức:', val: jew.name },
        { label: 'Cầm tay:', val: item.name },
        { label: 'Hài / Guốc:', val: shoe.name },
      ];

      specs.forEach((sp, i) => {
        const y = 570 + i * 70;
        ctx.font = '500 24px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#8C7A6B';
        ctx.fillText(sp.label, 180, y);
        ctx.font = '600 24px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#1E1E1E';
        ctx.fillText(sp.val, 400, y);
      });

      // Score Seal Box at bottom of frame
      ctx.fillStyle = '#F0EAE1';
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(180, 1100, 720, 180, 24);
      } else {
        ctx.rect(180, 1100, 720, 180);
      }
      ctx.fill();

      ctx.font = 'bold 34px "Lora", serif';
      ctx.fillStyle = '#1E1E1E';
      ctx.textAlign = 'center';
      ctx.fillText(`ĐỘ HÒA HỢP: ${assessment.harmonyScore.toFixed(1)} / 10`, 540, 1170);

      ctx.font = '500 24px "Be Vietnam Pro", sans-serif';
      ctx.fillStyle = '#D32F2F';
      ctx.fillText(`Đánh giá: ${assessment.traditionLabel}`, 540, 1220);

      // Footer QR & Credits
      ctx.font = 'bold 26px "Lora", serif';
      ctx.fillStyle = '#1E1E1E';
      ctx.textAlign = 'center';
      ctx.fillText('TRẢI NGHIỆM THỬ VIỆT PHỤC SỐ CÙNG SẮC VIỆT REMIX', 540, 1500);

      ctx.font = '400 20px "Be Vietnam Pro", sans-serif';
      ctx.fillStyle = '#8C7A6B';
      ctx.fillText('Không gian sáng tạo di sản và thời trang đương đại', 540, 1540);

      // Red Imperial Vermilion Stamp
      ctx.strokeStyle = '#D32F2F';
      ctx.lineWidth = 3;
      ctx.strokeRect(480, 1620, 120, 120);
      ctx.fillStyle = 'rgba(211, 47, 47, 0.08)';
      ctx.fillRect(480, 1620, 120, 120);
      ctx.font = 'bold 26px "Lora", serif';
      ctx.fillStyle = '#D32F2F';
      ctx.fillText('SẮC', 540, 1665);
      ctx.fillText('VIỆT', 540, 1705);

      const url = posterCanvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `lookbook-sac-viet-${config.garmentId}.png`;
      a.click();
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FBF9F4] rounded-3xl border border-[#ECE6D9] shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE6D9]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F]" />
            <h3 className="font-serif font-bold text-base text-[#1E1E1E]">
              Thiệp Phối Đồ Lookbook
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D7] text-[#665A51] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 9:16 Poster Card Preview */}
        <div
          ref={posterRef}
          className="my-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-inner flex flex-col justify-between aspect-[9/14] overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between text-[10px] text-[#8C7A6B] uppercase tracking-widest font-semibold">
              <span>SẮC VIỆT REMIX</span>
              <span>{occ.name}</span>
            </div>

            <div className="mt-3 text-center">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider">
                {garment.dynasty}
              </span>
              <h2 className="font-serif font-bold text-2xl text-[#D32F2F] mt-0.5">
                {garment.name}
              </h2>
              <p className="text-xs text-[#7D6E63] mt-0.5">
                {col.name} • {fab.name}
              </p>
            </div>

            {/* Quick breakdown pills */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
              <div className="p-2 bg-[#FBF9F4] rounded-xl border border-[#ECE6D9]">
                <span className="text-[9px] text-[#8C7A6B] block uppercase">Khăn / Mấn:</span>
                <span className="font-semibold text-[#1E1E1E] line-clamp-1">{head.name}</span>
              </div>
              <div className="p-2 bg-[#FBF9F4] rounded-xl border border-[#ECE6D9]">
                <span className="text-[9px] text-[#8C7A6B] block uppercase">Trang sức:</span>
                <span className="font-semibold text-[#1E1E1E] line-clamp-1">{jew.name}</span>
              </div>
              <div className="p-2 bg-[#FBF9F4] rounded-xl border border-[#ECE6D9]">
                <span className="text-[9px] text-[#8C7A6B] block uppercase">Cầm tay:</span>
                <span className="font-semibold text-[#1E1E1E] line-clamp-1">{item.name}</span>
              </div>
              <div className="p-2 bg-[#FBF9F4] rounded-xl border border-[#ECE6D9]">
                <span className="text-[9px] text-[#8C7A6B] block uppercase">Hài / Guốc:</span>
                <span className="font-semibold text-[#1E1E1E] line-clamp-1">{shoe.name}</span>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer with Score & Mock QR */}
          <div className="mt-3 pt-3 border-t border-[#ECE6D9] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#1E1E1E]">
                  {assessment.harmonyScore.toFixed(1)}/10
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  {assessment.traditionLabel}
                </span>
              </div>
              <span className="text-[9px] text-[#8C7A6B] block mt-0.5">
                Thiết kế: Sắc Việt Remix Atelier
              </span>
            </div>

            <div className="w-9 h-9 rounded-lg bg-[#1E1E1E] text-white flex items-center justify-center">
              <QrCode className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#ECE6D9] bg-white hover:bg-[#F2ECE1] text-xs font-semibold text-[#1E1E1E] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Đã sao chép link</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ liên kết</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadPoster}
            disabled={downloading}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Đang kết xuất...' : 'Tải Thiệp Lookbook'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
