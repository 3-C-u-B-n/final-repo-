import React, { useState } from 'react';
import { OutfitConfig, CulturalAssessment } from '../types';
import { GARMENTS, COLORS, OCCASIONS } from '../data/fashionData';
import { useAuth } from '../context/AuthContext';
import { saveOutfit } from '../lib/firebase';
import { X, BookmarkCheck, Sparkles, Globe, Lock, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: OutfitConfig;
  assessment: CulturalAssessment;
  onSavedSuccess?: () => void;
}

export const SaveOutfitModal: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  assessment,
  onSavedSuccess,
}) => {
  const { user, openAuthModal } = useAuth();
  const garment = GARMENTS.find((g) => g.id === config.garmentId) || GARMENTS[0];
  const col = COLORS.find((c) => c.id === config.colorId) || COLORS[0];
  const occ = OCCASIONS.find((o) => o.id === config.occasionId) || OCCASIONS[0];

  const defaultTitle = `${garment.name} • ${col.name} (${occ.name})`;
  const [title, setTitle] = useState(defaultTitle);
  const [note, setNote] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!user) {
      openAuthModal('Đăng nhập bằng Google để lưu bản phối trang phục vào Tủ Đồ Số đám mây!');
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);
    try {
      await saveOutfit({
        userId: user.uid,
        authorName: user.displayName || 'Nhà Tạo Mẫu Việt Phục',
        authorPhoto: user.photoURL || '',
        title: title.trim() || defaultTitle,
        gender: config.gender,
        occasionId: config.occasionId,
        garmentId: config.garmentId,
        fabricId: config.fabricId,
        colorId: config.colorId,
        customColorHex: config.customColorHex || col.hex,
        customPantHex: config.customPantHex || col.pantHex,
        headpieceId: config.headpieceId,
        jewelryId: config.jewelryId,
        handheldId: config.handheldId,
        footwearId: config.footwearId,
        backgroundId: config.backgroundId,
        visualEffect: config.visualEffect || 'none',
        windSpeed: config.windSpeed || 'gentle',
        lighting: config.lighting || 'daylight',
        harmonyScore: assessment.harmonyScore,
        traditionStatus: assessment.traditionStatus,
        note: note.trim(),
        isPublic,
        likesCount: 0,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onSavedSuccess) onSavedSuccess();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Có lỗi khi lưu bản phối. Vui lòng thử lại!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border border-[#E8E4DC] shadow-2xl p-6 sm:p-7 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#71717A] hover:text-[#1E1E1E] rounded-full hover:bg-[#EAE4D7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#D32F2F] text-white flex items-center justify-center shadow-sm">
            <BookmarkCheck className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1E1E1E]">
              Lưu Vào Tủ Đồ Số
            </h3>
            <p className="text-xs text-[#71717A]">
              Lưu trữ vĩnh viễn trên Firebase Firestore & Đồng bộ đa thiết bị
            </p>
          </div>
        </div>

        {/* Outfit Summary Card */}
        <div className="p-3.5 rounded-2xl bg-[#F0EBE1] border border-[#E2DBD0] flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl shadow-xs border-2 border-white flex items-center justify-center shrink-0"
              style={{ backgroundColor: config.customColorHex || col.hex }}
            >
              <span className="text-white text-xs font-bold drop-shadow">V</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#1E1E1E]">
                {garment.name}
              </h4>
              <p className="text-[11px] text-[#71717A]">
                {col.name} • {occ.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded-md bg-[#1E1E1E] text-white text-[11px] font-bold">
              {assessment.harmonyScore.toFixed(1)} / 10
            </span>
            <span className="block text-[10px] text-[#2E7D32] font-semibold mt-0.5">
              {assessment.traditionLabel}
            </span>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">
              Tên Bản Phối Trang Phục:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tên gọi cho bản phối của bạn..."
              maxLength={100}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] bg-white text-xs text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E1E1E] mb-1">
              Ghi Chú Phong Cách & Cảm Hứng (tùy chọn):
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Chia sẻ lý do phối màu, cảm hứng văn hóa hoặc dịp dự định diện..."
              rows={2}
              maxLength={500}
              className="w-full px-3.5 py-2 rounded-xl border border-[#D5CEC2] bg-white text-xs text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 resize-none"
            />
          </div>

          {/* Privacy Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8E4DC]">
            <div className="flex items-center gap-2">
              {isPublic ? (
                <Globe className="w-4 h-4 text-[#0F4C81]" />
              ) : (
                <Lock className="w-4 h-4 text-[#71717A]" />
              )}
              <div>
                <span className="text-xs font-semibold text-[#1E1E1E] block">
                  {isPublic ? 'Chia sẻ lên Bộ Sưu Tập Công Khai' : 'Chỉ mình tôi (Riêng tư)'}
                </span>
                <span className="text-[10px] text-[#71717A]">
                  {isPublic ? 'Mọi người có thể chiêm ngưỡng và tham khảo bản phối này' : 'Chỉ hiển thị trong Tủ đồ cá nhân của bạn'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                isPublic ? 'bg-[#D32F2F]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  isPublic ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-3 p-2.5 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
            {errorMsg}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-5 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#D5CEC2] text-xs font-semibold text-[#554A42] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || success}
            className="px-5 py-2.5 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : success ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Đã lưu thành công!</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="w-4 h-4" />
                <span>Lưu Vào Tủ Đồ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
