import React, { useState, useEffect } from 'react';
import { OutfitConfig, GarmentId, OccasionId, FabricId, HeadpieceId, JewelryId, HandheldId, FootwearId, BackgroundId } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  SavedOutfitRecord,
  subscribeToUserOutfits,
  deleteSavedOutfit,
} from '../lib/firebase';
import { GARMENTS, COLORS, OCCASIONS } from '../data/fashionData';
import {
  X,
  Bookmark,
  Trash2,
  Sparkles,
  ArrowRight,
  Plus,
  Palette,
  Calendar,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApplyOutfit: (configUpdates: Partial<OutfitConfig>) => void;
  onOpenCreateNew: () => void;
}

export const WardrobeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onApplyOutfit,
  onOpenCreateNew,
}) => {
  const { user, openAuthModal } = useAuth();
  const [outfits, setOutfits] = useState<SavedOutfitRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !user) {
      setOutfits([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToUserOutfits(
      user.uid,
      (data) => {
        setOutfits(data);
        setLoading(false);
      },
      (error) => {
        console.error('Lỗi tải tủ đồ:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }
    setDeletingId(id);
    setConfirmDeleteId(null);
    try {
      await deleteSavedOutfit(id);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleApply = (item: SavedOutfitRecord) => {
    onApplyOutfit({
      gender: item.gender,
      occasionId: item.occasionId as OccasionId,
      garmentId: item.garmentId as GarmentId,
      fabricId: item.fabricId as FabricId,
      colorId: item.colorId,
      customColorHex: item.customColorHex,
      customPantHex: item.customPantHex,
      headpieceId: item.headpieceId as HeadpieceId,
      jewelryId: item.jewelryId as JewelryId,
      handheldId: item.handheldId as HandheldId,
      footwearId: item.footwearId as FootwearId,
      backgroundId: item.backgroundId as BackgroundId,
      visualEffect: (item.visualEffect as any) || 'petals_peach',
      windSpeed: (item.windSpeed as any) || 'gentle',
      lighting: (item.lighting as any) || 'daylight',
      designTitle: item.title,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border border-[#E8E4DC] shadow-2xl p-6 sm:p-7 overflow-hidden text-left flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E1E1E] text-white flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1E1E1E]">
                Tủ Đồ Số Của Bạn
              </h3>
              <p className="text-xs text-[#71717A]">
                {outfits.length} thiết kế đã lưu trong tài khoản {user?.displayName || 'của bạn'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#71717A] hover:text-[#1E1E1E] rounded-full hover:bg-[#EAE4D7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 no-scrollbar">
          {!user ? (
            <div className="text-center py-12 px-4">
              <p className="text-sm text-[#554A42] mb-3">
                Bạn cần đăng nhập để xem và quản lý Tủ Đồ Số của mình.
              </p>
              <button
                onClick={() => {
                  onClose();
                  openAuthModal();
                }}
                className="px-5 py-2.5 bg-[#D32F2F] text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Đăng nhập với Google
              </button>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-xs text-[#71717A]">
              <div className="w-5 h-5 border-2 border-[#D32F2F] border-t-transparent rounded-full animate-spin" />
              <span>Đang tải Tủ Đồ Số của bạn...</span>
            </div>
          ) : outfits.length === 0 ? (
            <div className="text-center py-14 px-4 bg-white/60 rounded-2xl border border-dashed border-[#D5CEC2]">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#F0EBE1] flex items-center justify-center text-[#71717A]">
                <Palette className="w-6 h-6 text-[#D32F2F]" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1E1E1E]">
                Tủ đồ hiện đang trống
              </h4>
              <p className="text-xs text-[#71717A] max-w-sm mx-auto mt-1 mb-4 leading-relaxed">
                Hãy bắt đầu trải nghiệm phối màu, chọn phom áo truyền thống và nhấn nút <strong>"Lưu Vào Tủ Đồ"</strong> để lưu giữ tác phẩm của bạn!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenCreateNew();
                }}
                className="px-4 py-2 bg-[#1E1E1E] hover:bg-[#333] text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Bắt đầu tạo mẫu ngay</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {outfits.map((item) => {
                const garment = GARMENTS.find((g) => g.id === item.garmentId) || GARMENTS[0];
                const col = COLORS.find((c) => c.id === item.colorId) || COLORS[0];
                const occ = OCCASIONS.find((o) => o.id === item.occasionId) || OCCASIONS[0];
                const mainColor = item.customColorHex || col.hex;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleApply(item)}
                    className="p-3.5 bg-white rounded-2xl border border-[#E8E4DC] hover:border-[#1E1E1E] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                            style={{ backgroundColor: mainColor }}
                          />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                            {garment.dynasty}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold bg-[#F0EBE1] text-[#1E1E1E] px-2 py-0.5 rounded-full">
                          {item.harmonyScore.toFixed(1)}/10
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-sm text-[#1E1E1E] group-hover:text-[#D32F2F] transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#71717A] mt-0.5 line-clamp-1">
                        {garment.name} • {occ.name}
                      </p>

                      {item.note && (
                        <p className="text-[10px] text-[#8C827A] italic mt-1 line-clamp-2 bg-[#FAF8F5] p-1.5 rounded-lg border border-[#F0EBE1]">
                          "{item.note}"
                        </p>
                      )}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                      <span className="text-[10px] text-[#8C827A] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                      </span>

                      <div className="flex items-center gap-2">
                        {confirmDeleteId === item.id ? (
                          <div className="flex items-center gap-1.5 bg-red-50 p-1 px-2 rounded-lg border border-red-200 animate-in fade-in">
                            <span className="text-[10px] text-red-700 font-semibold">Xóa?</span>
                            <button
                              onClick={(e) => handleDelete(item.id, e)}
                              disabled={deletingId === item.id}
                              className="text-[10px] font-bold text-white bg-red-600 px-1.5 py-0.5 rounded hover:bg-red-700 cursor-pointer"
                            >
                              Có
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmDeleteId(null);
                              }}
                              className="text-[10px] text-gray-600 hover:text-black cursor-pointer px-1"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => handleDelete(item.id, e)}
                            disabled={deletingId === item.id}
                            className="p-1 text-[#A1A1AA] hover:text-red-600 rounded transition-colors cursor-pointer"
                            title="Xóa thiết kế này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <span className="text-[11px] font-semibold text-[#D32F2F] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Mặc thử</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#71717A]">
          <span>Chọn một bản phối để mặc thử lên Studio</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#EAE4D7] text-[#1E1E1E] font-semibold hover:bg-[#DFD8CA] cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
