import React from 'react';
import { Sparkles, Users, Scale, BookmarkCheck } from 'lucide-react';

interface Props {
  onExportLookbook: () => void;
  onToggleGender: () => void;
  onOpenCompare: () => void;
  onSaveOutfit?: () => void;
  isMale: boolean;
}

export const BottomActionBar: React.FC<Props> = ({
  onExportLookbook,
  onToggleGender,
  onOpenCompare,
  onSaveOutfit,
  isMale,
}) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 max-w-2xl mx-auto">
      <div className="bg-[#1E1E1E]/90 backdrop-blur-xl border border-white/15 shadow-2xl rounded-2xl p-2 sm:p-2.5 flex items-center justify-between gap-1.5 sm:gap-2 text-white">
        {/* [🔄 Đổi Nhân Vật] (Ghost button) */}
        <button
          onClick={onToggleGender}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-transparent hover:bg-white/10 text-xs font-medium text-white/90 hover:text-white transition-colors border border-transparent hover:border-white/10 cursor-pointer"
          title="Chuyển đổi nhân vật Nam / Nữ"
        >
          <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="whitespace-nowrap">{isMale ? 'Nam phục' : 'Nữ phục'}</span>
        </button>

        {/* [⚖️ So sánh 2 phối đồ] (Ghost button) */}
        <button
          onClick={onOpenCompare}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-transparent hover:bg-white/10 text-xs font-medium text-white/90 hover:text-white transition-colors border border-transparent hover:border-white/10 cursor-pointer"
          title="So sánh 2 bản phối trang phục"
        >
          <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="hidden sm:inline whitespace-nowrap">So sánh</span>
        </button>

        {/* [💾 Lưu Tủ Đồ Số] */}
        {onSaveOutfit && (
          <button
            onClick={onSaveOutfit}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors border border-white/10 cursor-pointer"
            title="Lưu bản phối này vào Tủ Đồ Số"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="whitespace-nowrap">Lưu Tủ Đồ</span>
          </button>
        )}

        {/* [✨ Xuất Lookbook] (Primary filled red-orange vermilion button) */}
        <button
          onClick={onExportLookbook}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-[#D32F2F] via-[#D32F2F] to-[#E64A19] hover:from-[#E53935] hover:to-[#F4511E] text-white text-xs sm:text-sm font-serif font-bold shadow-lg shadow-red-950/30 transition-all hover:scale-102 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="whitespace-nowrap">Xuất Lookbook</span>
        </button>
      </div>
    </div>
  );
};
