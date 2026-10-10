import React, { useState } from 'react';
import {
  OutfitConfig,
  CulturalAssessment,
  GarmentId,
  OriginalDetailId,
  JewelryId,
  HeadpieceId,
  HandheldId,
  FootwearId,
  BackgroundId,
  VisualEffectId,
  WindSpeed,
  LightingAmbiance,
} from '../types';
import {
  GARMENTS,
  COLORS,
  FABRICS,
  JEWELRIES,
  HEADPIECES,
  HANDHELDS,
  FOOTWEARS,
  ORIGINAL_DETAILS,
  VISUAL_EFFECTS,
  LIGHTING_PRESETS,
  BACKGROUNDS,
} from '../data/fashionData';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Palette,
  Check,
  ShieldCheck,
  Scissors,
  Layers,
  Compass,
  Sliders,
  Lock,
  RotateCcw,
  BookmarkCheck,
  Info,
  Wind,
  Sun,
  Feather,
  Flower2,
} from 'lucide-react';

interface Props {
  config: OutfitConfig;
  assessment: CulturalAssessment;
  onChange: (updates: Partial<OutfitConfig>) => void;
  onOpenCulturalModal: () => void;
  onOpenSaveOutfit?: () => void;
}

export const StyleDrawer: React.FC<Props> = ({
  config,
  assessment,
  onChange,
  onOpenCulturalModal,
  onOpenSaveOutfit,
}) => {
  const { user, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'garment' | 'palette' | 'jewelry' | 'accessories' | 'effects'>('garment');
  const [accessorySection, setAccessorySection] = useState<'headpiece' | 'handheld' | 'footwear'>('headpiece');

  // Selected garment & color references
  const currentGarment = GARMENTS.find((g) => g.id === config.garmentId) || GARMENTS[0];
  const currentColor = COLORS.find((c) => c.id === config.colorId) || COLORS[0];

  const handleSelectColor = (colorId: string) => {
    if (!user) {
      openAuthModal('Vui lòng đăng nhập với Google để chọn và phối màu trang phục Việt phục!');
      return;
    }
    const target = COLORS.find((c) => c.id === colorId);
    onChange({
      colorId,
      customColorHex: target?.hex,
      customPantHex: target?.pantHex,
    });
  };

  const handleCustomMainColor = (hex: string) => {
    if (!user) {
      openAuthModal('Vui lòng đăng nhập với Google để phối màu theo ý thích!');
      return;
    }
    onChange({ customColorHex: hex });
  };

  const handleCustomPantColor = (hex: string) => {
    if (!user) {
      openAuthModal('Vui lòng đăng nhập với Google để đổi màu quần lụa!');
      return;
    }
    onChange({ customPantHex: hex });
  };

  const handleResetColors = () => {
    if (!user) return;
    onChange({
      customColorHex: currentColor.hex,
      customPantHex: currentColor.pantHex,
    });
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E8E4DC] shadow-xs flex flex-col h-full justify-between gap-4">
      <div>
        {/* Segmented 5 Tabs with Refined Styling */}
        <div className="grid grid-cols-5 gap-1 bg-[#F5F1E9] p-1.5 rounded-2xl mb-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('garment')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 text-[10px] sm:text-[11px] cursor-pointer ${
              activeTab === 'garment'
                ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                : 'text-[#71717A] hover:text-[#1E1E1E]'
            }`}
            title="1. Phom Dáng & Chất Liệu"
          >
            <Scissors className="w-3.5 h-3.5 text-[#D32F2F]" />
            <span className="truncate">Phom Dáng</span>
          </button>

          <button
            onClick={() => setActiveTab('palette')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 text-[10px] sm:text-[11px] cursor-pointer relative ${
              activeTab === 'palette'
                ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                : 'text-[#71717A] hover:text-[#1E1E1E]'
            }`}
            title="2. Sắc Màu Cung Đình & Tùy Chỉnh"
          >
            <Palette className="w-3.5 h-3.5 text-[#0F4C81]" />
            <span className="truncate">Sắc Màu</span>
            {!user && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] absolute top-1.5 right-1.5 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('jewelry')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 text-[10px] sm:text-[11px] cursor-pointer ${
              activeTab === 'jewelry'
                ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                : 'text-[#71717A] hover:text-[#1E1E1E]'
            }`}
            title="3. Điển Chế & Trang Sức"
          >
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="truncate">Trang Sức</span>
          </button>

          <button
            onClick={() => setActiveTab('accessories')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 text-[10px] sm:text-[11px] cursor-pointer ${
              activeTab === 'accessories'
                ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                : 'text-[#71717A] hover:text-[#1E1E1E]'
            }`}
            title="4. Phụ Kiện Di Sản (Mũ nón, Đồ cầm tay, Hài guốc)"
          >
            <Feather className="w-3.5 h-3.5 text-[#15803D]" />
            <span className="truncate">Phụ Kiện</span>
          </button>

          <button
            onClick={() => setActiveTab('effects')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 text-[10px] sm:text-[11px] cursor-pointer ${
              activeTab === 'effects'
                ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                : 'text-[#71717A] hover:text-[#1E1E1E]'
            }`}
            title="5. Hiệu Ứng Hạt Rơi & Ánh Sáng"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
            <span className="truncate">Hiệu Ứng</span>
          </button>
        </div>

        {/* TAB 1: 1. PHOM DÁNG & VẢI */}
        {activeTab === 'garment' && (
          <div className="space-y-3.5">
            {/* Chế độ phác thảo 2D vs Studio Sân Khấu */}
            <div className="flex items-center justify-between p-2 bg-[#F5F1E9] rounded-2xl">
              <span className="text-[11px] font-semibold text-[#1E1E1E] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Chế độ phác thảo:</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onChange({ sketchMode: 'croquis_sketch' })}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold transition-all cursor-pointer ${
                    config.sketchMode === 'croquis_sketch'
                      ? 'bg-[#1E1E1E] text-white shadow-xs'
                      : 'bg-white text-[#71717A] hover:text-[#1E1E1E]'
                  }`}
                >
                  Phác thảo 2D
                </button>
                <button
                  onClick={() => onChange({ sketchMode: 'studio' })}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold transition-all cursor-pointer ${
                    config.sketchMode !== 'croquis_sketch'
                      ? 'bg-[#1E1E1E] text-white shadow-xs'
                      : 'bg-white text-[#71717A] hover:text-[#1E1E1E]'
                  }`}
                >
                  Studio Atelier
                </button>
              </div>
            </div>

            {/* Danh sách áo truyền thống */}
            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 no-scrollbar">
              {GARMENTS.map((g) => {
                const isSelected = config.garmentId === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => onChange({ garmentId: g.id as GarmentId })}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                        : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1E1E1E] text-xs">
                          {g.name}
                        </span>
                        {g.hanTuName && (
                          <span className="text-[10px] text-[#71717A] font-serif">
                            ({g.hanTuName.split(' ')[0]})
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#D4AF37] font-medium block mt-0.5">
                        {g.dynasty} • {g.century}
                      </span>
                      <p className="text-[11px] text-[#71717A] mt-1 line-clamp-1">
                        {g.description}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="shrink-0 w-4 h-4 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center text-[10px] font-bold mt-1">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Chất liệu vải */}
            <div className="pt-2 border-t border-[#F0EBE1]">
              <span className="uppercase tracking-wider font-semibold text-[10px] text-[#71717A] block mb-2">
                Chất Liệu Dệt Cổ Truyền:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {FABRICS.map((f) => {
                  const isSelected = config.fabricId === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => onChange({ fabricId: f.id })}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBF9F4] border-[#1E1E1E] shadow-xs ring-1 ring-[#1E1E1E]'
                          : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                      }`}
                    >
                      <span className="font-semibold text-[#1E1E1E] block text-[11px] truncate">
                        {f.name}
                      </span>
                      <span className="text-[10px] text-[#71717A] line-clamp-1 mt-0.5">
                        {f.texture}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 2. SẮC MÀU (Google Auth Lock & Color Studio) */}
        {activeTab === 'palette' && (
          <div className="space-y-4">
            {!user ? (
              <div className="p-5 bg-gradient-to-br from-[#FFFDF9] via-[#FDFBF7] to-[#F5EFE6] rounded-3xl border border-[#E6DAC8] shadow-sm text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-3 text-[#B45309]">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#1E1E1E] mb-1">
                  Mở Khóa Xưởng Phối Màu Di Sản
                </h4>
                <p className="text-xs text-[#71717A] leading-relaxed mb-4 max-w-xs mx-auto">
                  Đăng nhập tài khoản Google để tự do chọn màu sắc Ngũ Hành, phối mã Hex trực tiếp và lưu tủ đồ Việt phục cá nhân trên đám mây.
                </p>
                <button
                  onClick={() => openAuthModal('Đăng nhập Google để mở khóa trọn bộ tính năng phối màu Việt phục!')}
                  className="w-full py-2.5 px-4 bg-[#1E1E1E] text-white rounded-2xl font-semibold text-xs hover:bg-[#333333] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Palette className="w-4 h-4 text-[#D4AF37]" />
                  <span>Đăng Nhập Với Google Để Mở</span>
                </button>
              </div>
            ) : (
              <>
                {/* Bộ Phối Màu Tùy Chỉnh (Custom Hex Pickers) */}
                <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#1E1E1E] flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#0F4C81]" />
                      <span>Bộ Phối Màu Tùy Chỉnh (Live Hex):</span>
                    </span>
                    <button
                      onClick={handleResetColors}
                      className="text-[10px] text-[#71717A] hover:text-[#1E1E1E] flex items-center gap-1 cursor-pointer"
                      title="Khôi phục màu mặc định của bộ này"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Khôi phục</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2 rounded-xl border border-[#E8E4DC] flex items-center gap-2">
                      <input
                        type="color"
                        value={config.customColorHex || currentColor.hex}
                        onChange={(e) => handleCustomMainColor(e.target.value)}
                        className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#71717A] block truncate">Màu áo:</span>
                        <span className="font-mono text-[11px] font-bold text-[#1E1E1E]">
                          {config.customColorHex || currentColor.hex}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded-xl border border-[#E8E4DC] flex items-center gap-2">
                      <input
                        type="color"
                        value={config.customPantHex || currentColor.pantHex}
                        onChange={(e) => handleCustomPantColor(e.target.value)}
                        className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#71717A] block truncate">Màu quần lụa:</span>
                        <span className="font-mono text-[11px] font-bold text-[#1E1E1E]">
                          {config.customPantHex || currentColor.pantHex}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danh mục bảng màu truyền thống */}
                <div className="max-h-[290px] overflow-y-auto space-y-3 pr-1 no-scrollbar">
                  <div>
                    <span className="uppercase tracking-wider font-semibold text-[10px] text-[#71717A] block mb-2">
                      1. Bảng Màu Ngũ Hành Triều Nguyễn:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {COLORS.filter((c) => c.category === 'ngu_hanh').map((col) => {
                        const isSelected = config.colorId === col.id;
                        return (
                          <button
                            key={col.id}
                            onClick={() => handleSelectColor(col.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                                : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                              style={{ backgroundColor: col.hex }}
                            />
                            <div className="min-w-0 flex-1">
                              <span className="font-semibold text-[#1E1E1E] block text-[11px] truncate">
                                {col.name.split(' (')[0]}
                              </span>
                              <span className="text-[9px] text-[#71717A] block">
                                {col.element} • {col.royalRule.split(',')[0]}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="uppercase tracking-wider font-semibold text-[10px] text-[#71717A] block mb-2">
                      2. Gam Màu Hoàng Tộc & Quý Tộc:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {COLORS.filter((c) => c.category === 'cung_dinh').map((col) => {
                        const isSelected = config.colorId === col.id;
                        return (
                          <button
                            key={col.id}
                            onClick={() => handleSelectColor(col.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                                : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                              style={{ backgroundColor: col.hex }}
                            />
                            <div className="min-w-0 flex-1">
                              <span className="font-semibold text-[#1E1E1E] block text-[11px] truncate">
                                {col.name}
                              </span>
                              <span className="text-[9px] text-[#71717A] block truncate">
                                {col.meaning}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="uppercase tracking-wider font-semibold text-[10px] text-[#71717A] block mb-2">
                      3. Gam Màu Pastel & Thanh Lịch:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {COLORS.filter((c) => c.category === 'pastel').map((col) => {
                        const isSelected = config.colorId === col.id;
                        return (
                          <button
                            key={col.id}
                            onClick={() => handleSelectColor(col.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                                : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                              style={{ backgroundColor: col.hex }}
                            />
                            <div className="min-w-0 flex-1">
                              <span className="font-semibold text-[#1E1E1E] block text-[11px] truncate">
                                {col.name}
                              </span>
                              <span className="text-[9px] text-[#71717A] block truncate">
                                {col.pantName}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 3: 3. TRANG SỨC & ĐIỂN CHẾ GỐC */}
        {activeTab === 'jewelry' && (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 no-scrollbar text-xs">
            {/* Điển chế gốc */}
            <div>
              <span className="uppercase tracking-wider font-semibold text-[10px] text-[#71717A] block mb-2">
                Chi Tiết Cổ Truyền & Điển Chế:
              </span>
              <div className="space-y-2">
                {ORIGINAL_DETAILS.map((d) => {
                  const isSelected = config.originalDetailId === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() =>
                        onChange({
                          originalDetailId: isSelected ? undefined : d.id,
                        })
                      }
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                          : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                      }`}
                    >
                      <span className="text-lg">{d.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#1E1E1E] text-xs">
                            {d.name}
                          </span>
                          <span className="text-[10px] text-[#D4AF37] font-bold">
                            {d.dynasty}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#71717A] mt-0.5 leading-relaxed">
                          {d.meaning}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trang sức hoàng gia & quý tộc */}
            <div className="pt-2 border-t border-[#F0EBE1]">
              <span className="uppercase tracking-wider font-semibold text-[10px] text-[#71717A] block mb-2">
                Trang Sức Cung Đình & Quý Tộc:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {JEWELRIES.map((j) => {
                  const isSelected = config.jewelryId === j.id;
                  return (
                    <button
                      key={j.id}
                      onClick={() => onChange({ jewelryId: j.id })}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBF9F4] border-[#1E1E1E] shadow-xs ring-1 ring-[#1E1E1E]'
                          : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                      }`}
                    >
                      <span className="font-semibold text-[#1E1E1E] block text-[11px] truncate">
                        {j.name}
                      </span>
                      <span className="text-[10px] text-[#71717A] line-clamp-1 mt-0.5">
                        {j.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 4. PHỤ KIỆN DI SẢN (Mũ nón, Đồ cầm tay, Hài guốc) */}
        {activeTab === 'accessories' && (
          <div className="space-y-3.5">
            {/* Sub-selector for Accessory Categories */}
            <div className="grid grid-cols-3 gap-1 bg-[#F5F1E9] p-1 rounded-xl text-[11px] font-semibold">
              <button
                onClick={() => setAccessorySection('headpiece')}
                className={`py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  accessorySection === 'headpiece'
                    ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                    : 'text-[#71717A] hover:text-[#1E1E1E]'
                }`}
              >
                Mũ Nón / Khăn
              </button>
              <button
                onClick={() => setAccessorySection('handheld')}
                className={`py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  accessorySection === 'handheld'
                    ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                    : 'text-[#71717A] hover:text-[#1E1E1E]'
                }`}
              >
                Đồ Cầm Tay
              </button>
              <button
                onClick={() => setAccessorySection('footwear')}
                className={`py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  accessorySection === 'footwear'
                    ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                    : 'text-[#71717A] hover:text-[#1E1E1E]'
                }`}
              >
                Hài & Guốc
              </button>
            </div>

            {/* SECTION 1: MŨ NÓN & KHĂN */}
            {accessorySection === 'headpiece' && (
              <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1 no-scrollbar text-xs">
                {HEADPIECES.map((hp) => {
                  const isSelected = config.headpieceId === hp.id;
                  return (
                    <button
                      key={hp.id}
                      onClick={() => onChange({ headpieceId: hp.id })}
                      className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                          : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#1E1E1E] text-xs">{hp.name}</span>
                          {hp.genderFit && hp.genderFit !== 'unisex' && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-[#FAF8F5] text-[#D32F2F] rounded border border-[#E8E4DC]">
                              {hp.genderFit === 'female' ? 'Nữ' : 'Nam'}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#71717A] mt-0.5 line-clamp-2">{hp.desc}</p>
                        {hp.etiquetteNote && (
                          <span className="text-[10px] text-[#B45309] block mt-1">
                            ✦ {hp.etiquetteNote}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <span className="shrink-0 w-4 h-4 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center text-[10px] font-bold mt-1">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* SECTION 2: ĐỒ CẦM TAY */}
            {accessorySection === 'handheld' && (
              <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1 no-scrollbar text-xs">
                {HANDHELDS.map((hh) => {
                  const isSelected = config.handheldId === hh.id;
                  return (
                    <button
                      key={hh.id}
                      onClick={() => onChange({ handheldId: hh.id })}
                      className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                          : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{hh.icon || '✨'}</span>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-[#1E1E1E] text-xs block">{hh.name}</span>
                        <p className="text-[11px] text-[#71717A] mt-0.5 line-clamp-2">{hh.desc}</p>
                      </div>
                      {isSelected && (
                        <span className="shrink-0 w-4 h-4 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center text-[10px] font-bold mt-1">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* SECTION 3: HÀI & GUỐC */}
            {accessorySection === 'footwear' && (
              <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1 no-scrollbar text-xs">
                {FOOTWEARS.map((fw) => {
                  const isSelected = config.footwearId === fw.id;
                  return (
                    <button
                      key={fw.id}
                      onClick={() => onChange({ footwearId: fw.id })}
                      className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                          : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-[#1E1E1E] text-xs block">{fw.name}</span>
                        <p className="text-[11px] text-[#71717A] mt-0.5 line-clamp-2">{fw.desc}</p>
                      </div>
                      {isSelected && (
                        <span className="shrink-0 w-4 h-4 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center text-[10px] font-bold mt-1">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: 5. HIỆU ỨNG HẠT RƠI & KHÔNG GIAN */}
        {activeTab === 'effects' && (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 no-scrollbar text-xs">
            {/* 1. Hiệu ứng hạt rơi */}
            <div>
              <span className="uppercase tracking-wider font-semibold text-[10px] text-[#71717A] block mb-2">
                1. Hiệu Ứng Hạt Rơi Sống Động:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {VISUAL_EFFECTS.map((eff) => {
                  const isSelected = (config.visualEffect || 'petals_peach') === eff.id;
                  return (
                    <button
                      key={eff.id}
                      onClick={() => onChange({ visualEffect: eff.id as VisualEffectId })}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                          : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                      }`}
                    >
                      <span className="text-base shrink-0">{eff.icon}</span>
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-[#1E1E1E] block text-[11px] truncate">
                          {eff.name}
                        </span>
                        <span className="text-[10px] text-[#71717A] line-clamp-1 mt-0.5">
                          {eff.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Ánh sáng & Không khí */}
            <div className="pt-2 border-t border-[#F0EBE1]">
              <span className="uppercase tracking-wider font-semibold text-[10px] text-[#71717A] block mb-2">
                2. Ánh Sáng & Sắc Thái Không Gian:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {LIGHTING_PRESETS.map((lit) => {
                  const isSelected = (config.lighting || 'daylight') === lit.id;
                  return (
                    <button
                      key={lit.id}
                      onClick={() => onChange({ lighting: lit.id as LightingAmbiance })}
                      className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                          : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                      }`}
                    >
                      <span className="text-base">{lit.icon}</span>
                      <span className="font-semibold text-[#1E1E1E] text-[11px] truncate">
                        {lit.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Tốc độ gió bay tà áo */}
            <div className="pt-2 border-t border-[#F0EBE1]">
              <span className="uppercase tracking-wider font-semibold text-[10px] text-[#71717A] block mb-2 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-[#0F4C81]" />
                <span>3. Độ Gió Tà Áo Bay:</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'still' as WindSpeed, label: 'Tĩnh Lặng', sub: 'Không gió' },
                  { id: 'gentle' as WindSpeed, label: 'Gió Thoảng', sub: 'Thướt tha' },
                  { id: 'strong' as WindSpeed, label: 'Gió Lộng', sub: 'Bay bổng' },
                ].map((w) => {
                  const isSelected = (config.windSpeed || 'gentle') === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => onChange({ windSpeed: w.id })}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1E1E1E] text-white border-[#1E1E1E] shadow-xs font-semibold'
                          : 'bg-white text-[#71717A] hover:bg-[#FAF8F5] border-[#E8E4DC]'
                      }`}
                    >
                      <span className="block text-[11px] font-bold">{w.label}</span>
                      <span className="text-[9px] opacity-75">{w.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Bối cảnh không gian */}
            <div className="pt-2 border-t border-[#F0EBE1]">
              <span className="uppercase tracking-wider font-semibold text-[10px] text-[#71717A] block mb-2">
                4. Bối Cảnh Studio Sân Khấu:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUNDS.map((b) => {
                  const isSelected = config.backgroundId === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => onChange({ backgroundId: b.id })}
                      className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBF9F4] border-[#1E1E1E] ring-1 ring-[#1E1E1E] shadow-xs'
                          : 'bg-white hover:bg-[#FBF9F4] border-[#E8E4DC]'
                      }`}
                    >
                      <span className="text-base">{b.icon}</span>
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-[#1E1E1E] block text-[11px] truncate">
                          {b.name.split(' & ')[0]}
                        </span>
                        <span className="text-[9px] text-[#71717A]">{b.tag}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cultural Harmony Status Pill & Quick Action at Drawer Bottom */}
      <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
        <button
          onClick={onOpenCulturalModal}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer text-left"
          title="Xem phân tích điển chế văn hóa chi tiết"
        >
          <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
          <div>
            <div className="font-semibold text-[#1E1E1E] leading-none">
              Hài hòa: {assessment.harmonyScore.toFixed(1)}/10
            </div>
            <span className="text-[10px] text-[#71717A] truncate max-w-[170px] block mt-0.5">
              {assessment.traditionLabel}
            </span>
          </div>
        </button>

        {onOpenSaveOutfit && (
          <button
            onClick={onOpenSaveOutfit}
            className="px-3 py-1.5 bg-[#F5F1E9] hover:bg-[#EAE4D8] text-[#1E1E1E] rounded-xl font-semibold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer"
            title="Lưu bản phối này vào tủ đồ cá nhân"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Lưu Phối Đồ</span>
          </button>
        )}
      </div>
    </div>
  );
};
