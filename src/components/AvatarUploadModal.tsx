import React, { useState } from 'react';
import { X, Upload, Camera, Check, UserCheck, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarUrl?: string | null;
  onSelectAvatar: (url: string | null) => void;
}

const PRESET_AVATARS = [
  { id: 'none', name: 'Mô Hình 3D Mặc Định', url: null },
  { id: 'f1', name: 'Nữ - Thanh Lịch', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80' },
  { id: 'f2', name: 'Nữ - Nét Á Đông', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80' },
  { id: 'm1', name: 'Nam - Thư Sinh', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80' },
  { id: 'm2', name: 'Nam - Lãng Tử', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80' },
];

export const AvatarUploadModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentAvatarUrl,
  onSelectAvatar,
}) => {
  const [dragOver, setDragOver] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSelectAvatar(event.target.result as string);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FBF9F4] rounded-3xl border border-[#ECE6D9] shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE6D9]">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-base text-[#1E1E1E]">
              Thử Phục Trang Trên Khuôn Mặt Bạn
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D7] text-[#665A51] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Upload Zone */}
        <div className="my-4 space-y-4">
          <label
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  if (event.target?.result) {
                    onSelectAvatar(event.target.result as string);
                    onClose();
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
            className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
              dragOver
                ? 'border-[#D32F2F] bg-[#D32F2F]/5'
                : 'border-[#D4AF37]/50 bg-white hover:bg-[#FBF9F4]'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#D4AF37] flex items-center justify-center mb-2 shadow-xs">
              <Upload className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#1E1E1E]">
              Bấm để chọn hoặc kéo thả ảnh chân dung
            </span>
            <span className="text-[10px] text-[#8C7A6B] mt-0.5">
              Hỗ trợ PNG, JPG (Khuyến nghị góc nhìn thẳng, rõ nét)
            </span>
          </label>

          {/* Preset Avatars */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7A6B] block mb-2">
              Hoặc thử với gương mặt mẫu đại diện:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_AVATARS.map((av) => {
                const isSelected = currentAvatarUrl === av.url;
                return (
                  <button
                    key={av.id}
                    onClick={() => {
                      onSelectAvatar(av.url);
                      onClose();
                    }}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E1E1E] text-white border-[#1E1E1E]'
                        : 'bg-white hover:bg-[#FBF9F4] border-[#ECE6D9] text-[#1E1E1E]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#EAE4D7] border border-white shadow-xs flex items-center justify-center">
                      {av.url ? (
                        <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      )}
                    </div>
                    <span className="text-[10px] font-semibold truncate max-w-full">
                      {av.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {currentAvatarUrl && (
          <button
            onClick={() => {
              onSelectAvatar(null);
              onClose();
            }}
            className="w-full py-2 border border-[#D32F2F] text-[#D32F2F] hover:bg-[#D32F2F]/5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Hủy dùng ảnh cá nhân • Trở về mô hình 3D mặc định
          </button>
        )}
      </div>
    </div>
  );
};
