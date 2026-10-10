import React, { useState } from 'react';
import {
  OutfitConfig,
  VisualEffectId,
  WindSpeed,
  LightingAmbiance,
  BackgroundId,
} from '../types';
import {
  VISUAL_EFFECTS,
  LIGHTING_PRESETS,
  BACKGROUNDS,
} from '../data/fashionData';
import {
  X,
  Settings,
  Sparkles,
  Sun,
  Wind,
  Layers,
  Rotate3d,
  Check,
  RotateCcw,
  Sliders,
  Palette,
  Eye,
  BookmarkCheck,
} from 'lucide-react';

export const SETTINGS_STORAGE_KEY = 'sac_viet_studio_settings';

export interface StudioSettingsData {
  visualEffect: VisualEffectId;
  lighting: LightingAmbiance;
  windSpeed: WindSpeed;
  viewAngle: 'front' | 'three_quarter';
  jewelryPlacement: 'collar_base' | 'chest_drape' | 'hidden';
  displayMode: 'sketch' | 'studio';
  backgroundId: BackgroundId;
}

export const DEFAULT_STUDIO_SETTINGS: StudioSettingsData = {
  visualEffect: 'petals_peach',
  lighting: 'daylight',
  windSpeed: 'gentle',
  viewAngle: 'three_quarter',
  jewelryPlacement: 'collar_base',
  displayMode: 'studio',
  backgroundId: 'san_dinh',
};

// Helper to load settings from localStorage
export function loadSavedStudioSettings(): StudioSettingsData {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_STUDIO_SETTINGS, ...parsed };
    }
  } catch (err) {
    console.warn('Could not parse saved studio settings:', err);
  }
  return DEFAULT_STUDIO_SETTINGS;
}

// Helper to save settings to localStorage
export function saveStudioSettings(settings: StudioSettingsData): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Could not save studio settings:', err);
  }
}

const LIGHT_DESCS: Record<string, string> = {
  daylight: 'Ánh nắng ban ngày trong trẻo tự nhiên',
  sunset: 'Ánh hoàng hôn vàng cam ấm áp cố đô',
  lantern_night: 'Ánh đèn lồng ấm cúng phố cổ Hội An',
  moonlight: 'Ánh trăng rằm thanh lương huyền diệu',
  atelier: 'Ánh sáng nghệ thuật phòng tranh tối giản',
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: OutfitConfig;
  currentSettings: StudioSettingsData;
  onUpdateSettings: (newSettings: Partial<StudioSettingsData>) => void;
  onResetDefaults: () => void;
}

export const StudioSettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  currentSettings,
  onUpdateSettings,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'effects' | 'lighting' | 'view'>('effects');
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const handleUpdate = (updates: Partial<StudioSettingsData>) => {
    onUpdateSettings(updates);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl border border-[#E8E4DC] shadow-2xl p-5 sm:p-6 overflow-hidden text-left flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E8E4DC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E1E1E] text-white flex items-center justify-center shadow-xs">
              <Settings className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E1E1E]">
                Cài Đặt Studio & Khí Quyển
              </h3>
              <p className="text-[11px] text-[#71717A]">
                Tùy biến hiển thị, hiệu ứng hạt rơi & ánh sáng (tự động lưu)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#71717A] hover:text-[#1E1E1E] rounded-full hover:bg-[#EAE4D7] transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#F0EBE1] p-1.5 rounded-2xl my-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('effects')}
            className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'effects'
                ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                : 'text-[#71717A] hover:text-[#1E1E1E]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Hiệu Ứng Hạt</span>
          </button>

          <button
            onClick={() => setActiveTab('lighting')}
            className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'lighting'
                ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                : 'text-[#71717A] hover:text-[#1E1E1E]'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-[#E65100]" />
            <span>Ánh Sáng & Gió</span>
          </button>

          <button
            onClick={() => setActiveTab('view')}
            className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'view'
                ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                : 'text-[#71717A] hover:text-[#1E1E1E]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#0F4C81]" />
            <span>Góc Nhìn & Bối Cảnh</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 no-scrollbar py-1">
          {/* TAB 1: HIỆU ỨNG HẠT RƠI */}
          {activeTab === 'effects' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#554A42]">
                  Chọn Hiệu Ứng Hạt Khí Quyển:
                </span>
                <span className="text-[10px] text-[#71717A]">
                  {VISUAL_EFFECTS.length} hiệu ứng di sản
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {VISUAL_EFFECTS.map((eff) => {
                  const isSelected = currentSettings.visualEffect === eff.id;
                  return (
                    <button
                      key={eff.id}
                      onClick={() => handleUpdate({ visualEffect: eff.id })}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#1E1E1E] ring-1.5 ring-[#1E1E1E] shadow-xs'
                          : 'bg-[#FBF9F4] hover:bg-white border-[#E8E4DC]'
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{eff.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-[#1E1E1E] truncate">
                            {eff.name}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#D32F2F] shrink-0" />
                          )}
                        </div>
                        <p className="text-[10px] text-[#71717A] mt-0.5 line-clamp-1">
                          {eff.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ÁNH SÁNG & GIÓ ĐỘNG */}
          {activeTab === 'lighting' && (
            <div className="space-y-4">
              {/* Lighting Ambiance */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#554A42] block mb-2">
                  1. Khí Quyển Ánh Sáng (Lighting Ambiance):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {LIGHTING_PRESETS.map((lit) => {
                    const isSelected = currentSettings.lighting === lit.id;
                    return (
                      <button
                        key={lit.id}
                        onClick={() => handleUpdate({ lighting: lit.id })}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#1E1E1E] ring-1.5 ring-[#1E1E1E] shadow-xs'
                            : 'bg-[#FBF9F4] hover:bg-white border-[#E8E4DC]'
                        }`}
                      >
                        <span className="text-lg shrink-0">{lit.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-[#1E1E1E]">
                              {lit.name}
                            </span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-[#D32F2F] shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-[#71717A] truncate">
                            {LIGHT_DESCS[lit.id] || 'Ánh sáng nghệ thuật'}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Wind Speed Intensity */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#554A42] block mb-2">
                  2. Cường Độ Gió Thổi Tà Áo:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'still', name: 'Tĩnh Lặng', desc: 'Tắt hiệu ứng gió', icon: '🍃' },
                    { id: 'gentle', name: 'Gió Thoảng', desc: 'Tà áo bay nhẹ nhàng', icon: '💨' },
                    { id: 'strong', name: 'Gió Lộng', desc: 'Tung bay sống động', icon: '🌪️' },
                  ].map((w) => {
                    const isSelected = currentSettings.windSpeed === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => handleUpdate({ windSpeed: w.id as WindSpeed })}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#1E1E1E] ring-1.5 ring-[#1E1E1E] shadow-xs'
                            : 'bg-[#FBF9F4] hover:bg-white border-[#E8E4DC]'
                        }`}
                      >
                        <span className="text-base block mb-1">{w.icon}</span>
                        <span className="font-semibold text-xs text-[#1E1E1E] block">
                          {w.name}
                        </span>
                        <span className="text-[9px] text-[#71717A] block mt-0.5">
                          {w.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GÓC NHÌN & BỐI CẢNH */}
          {activeTab === 'view' && (
            <div className="space-y-4">
              {/* Display Mode: Sketch 2D vs Studio Atelier */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#554A42] block mb-2">
                  1. Chế Độ Hiển Thị:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdate({ displayMode: 'sketch' })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      currentSettings.displayMode === 'sketch'
                        ? 'bg-white border-[#1E1E1E] ring-1.5 ring-[#1E1E1E] shadow-xs'
                        : 'bg-[#FBF9F4] hover:bg-white border-[#E8E4DC]'
                    }`}
                  >
                    <Palette className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div>
                      <span className="font-semibold text-xs text-[#1E1E1E] block">
                        Phác Thảo 2D Croquis
                      </span>
                      <span className="text-[10px] text-[#71717A] block">
                        Bản vẽ nét giải phẫu thời trang
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleUpdate({ displayMode: 'studio' })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      currentSettings.displayMode === 'studio'
                        ? 'bg-white border-[#1E1E1E] ring-1.5 ring-[#1E1E1E] shadow-xs'
                        : 'bg-[#FBF9F4] hover:bg-white border-[#E8E4DC]'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 text-[#D32F2F] shrink-0" />
                    <div>
                      <span className="font-semibold text-xs text-[#1E1E1E] block">
                        Studio Sân Khấu
                      </span>
                      <span className="text-[10px] text-[#71717A] block">
                        Phục dựng trực quan & bối cảnh
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Angle View: Front vs 3/4 */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#554A42] block mb-2">
                  2. Góc Nhìn Người Mẫu:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdate({ viewAngle: 'front' })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      currentSettings.viewAngle === 'front'
                        ? 'bg-white border-[#1E1E1E] ring-1.5 ring-[#1E1E1E] shadow-xs'
                        : 'bg-[#FBF9F4] hover:bg-white border-[#E8E4DC]'
                    }`}
                  >
                    <Eye className="w-4 h-4 text-[#0F4C81] shrink-0" />
                    <div>
                      <span className="font-semibold text-xs text-[#1E1E1E] block">
                        Chính Diện (Front View)
                      </span>
                      <span className="text-[10px] text-[#71717A] block">
                        Thẳng góc chuẩn xác cổ & tay áo
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleUpdate({ viewAngle: 'three_quarter' })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      currentSettings.viewAngle === 'three_quarter'
                        ? 'bg-white border-[#1E1E1E] ring-1.5 ring-[#1E1E1E] shadow-xs'
                        : 'bg-[#FBF9F4] hover:bg-white border-[#E8E4DC]'
                    }`}
                  >
                    <Rotate3d className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <div>
                      <span className="font-semibold text-xs text-[#1E1E1E] block">
                        Nghiêng 3/4 (Perspective)
                      </span>
                      <span className="text-[10px] text-[#71717A] block">
                        Phối cảnh có chiều sâu tà áo
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Jewelry Placement */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#554A42] block mb-2">
                  3. Vị Trí Đeo Trang Sức:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'collar_base', name: 'Ôm Chân Cổ', desc: 'Chuẩn điển chế cổ phục' },
                    { id: 'chest_drape', name: 'Buông Ngực', desc: 'Duyên dáng thanh thoát' },
                    { id: 'hidden', name: 'Cổ Trần (Ẩn)', desc: 'Xem trọn vẹn cổ áo' },
                  ].map((j) => {
                    const isSelected = currentSettings.jewelryPlacement === j.id;
                    return (
                      <button
                        key={j.id}
                        onClick={() => handleUpdate({ jewelryPlacement: j.id as any })}
                        className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#1E1E1E] ring-1.5 ring-[#1E1E1E] shadow-xs'
                            : 'bg-[#FBF9F4] hover:bg-white border-[#E8E4DC]'
                        }`}
                      >
                        <span className="font-semibold text-xs text-[#1E1E1E] block">
                          {j.name}
                        </span>
                        <span className="text-[9px] text-[#71717A] block mt-0.5">
                          {j.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Background Selection (if Studio) */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#554A42] block mb-2">
                  4. Bối Cảnh Studio Sân Khấu:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {BACKGROUNDS.map((b) => {
                    const isSelected = currentSettings.backgroundId === b.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => handleUpdate({ backgroundId: b.id })}
                        className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#1E1E1E] ring-1.5 ring-[#1E1E1E] shadow-xs'
                            : 'bg-[#FBF9F4] hover:bg-white border-[#E8E4DC]'
                        }`}
                      >
                        <span className="text-base shrink-0">{b.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-xs text-[#1E1E1E] block truncate">
                            {b.name}
                          </span>
                          <span className="text-[9px] text-[#71717A] block truncate">
                            {b.tag}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Persistent Save Indicator & Reset */}
        <div className="pt-3.5 border-t border-[#E8E4DC] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#554A42]">
            <BookmarkCheck className="w-4 h-4 text-[#2E7D32]" />
            <span className="text-[11px] font-medium">
              {saveToast ? '✓ Đã lưu cài đặt tức thì!' : 'Đã tự động lưu vào bộ nhớ thiết bị'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetDefaults}
              className="px-3 py-2 rounded-xl text-xs font-medium text-[#71717A] hover:text-[#1E1E1E] hover:bg-[#EAE4D7] transition-colors flex items-center gap-1 cursor-pointer"
              title="Đặt lại cài đặt về mặc định ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mặc định</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1E1E1E] hover:bg-[#D32F2F] text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
