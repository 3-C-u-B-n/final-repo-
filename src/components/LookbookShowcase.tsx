import React, { useState, useEffect } from 'react';
import { OutfitConfig, GarmentId, OccasionId, FabricId, HeadpieceId, JewelryId, HandheldId, FootwearId, BackgroundId } from '../types';
import { Sparkles, ArrowRight, BookmarkCheck, Heart, Users, Globe } from 'lucide-react';
import { SavedOutfitRecord, fetchPublicOutfits } from '../lib/firebase';
import { GARMENTS, COLORS, OCCASIONS } from '../data/fashionData';

interface Props {
  onApplyOutfit: (preset: Partial<OutfitConfig>) => void;
  onGoToStudio: () => void;
}

interface LookbookItem {
  id: string;
  title: string;
  garment: string;
  century: string;
  vibe: string;
  colorHex: string;
  tags: string[];
  config: Partial<OutfitConfig>;
}

const CURATED_LOOKBOOKS: LookbookItem[] = [
  {
    id: 'lb1',
    title: 'Đại Triều Hoàng Kim',
    garment: 'Áo Tấc Hoàng Triều',
    century: 'Thế kỷ 19',
    vibe: 'Trang nghiêm & Quý phái',
    colorHex: '#C0292B',
    tags: ['#AoTac', '#LePhuc', '#TrieuNguyen'],
    config: {
      garmentId: 'ao_tac',
      colorId: 'red_cinnabar',
      fabricId: 'brocade_gam',
      headpieceId: 'man_lua',
      jewelryId: 'gold_kieng',
      handheldId: 'silk_fan',
      footwearId: 'wooden_clogs',
      backgroundId: 'san_dinh',
    },
  },
  {
    id: 'lb2',
    title: 'Huế Mộng Hoàng Tộc',
    garment: 'Áo Nhật Bình Cung Đình',
    century: 'Thế kỷ 19',
    vibe: 'Vạt cổ vuông & Dải ngũ sắc',
    colorHex: '#2B5B84',
    tags: ['#NhatBinh', '#CungDinhHue', '#DiSan'],
    config: {
      garmentId: 'nhat_binh',
      colorId: 'blue_thien_thanh',
      fabricId: 'silk_ha_dong',
      headpieceId: 'man_lua',
      jewelryId: 'pearl_necklace',
      handheldId: 'silk_fan',
      footwearId: 'satin_heels',
      backgroundId: 'san_dinh',
    },
  },
  {
    id: 'lb3',
    title: 'Phố Cổ Đông Dương',
    garment: 'Áo Ngũ Thân & Bốt Da',
    century: 'Đương Đại',
    vibe: 'Cá tính, trẻ trung và năng động',
    colorHex: '#D4AF37',
    tags: ['#NguThan', '#CachTan', '#DongDuong'],
    config: {
      garmentId: 'ngu_than',
      colorId: 'gold_hoang_yen',
      fabricId: 'linen_dui',
      headpieceId: 'none',
      jewelryId: 'none',
      handheldId: 'retro_sunglasses',
      footwearId: 'combat_boots',
      backgroundId: 'cafe_retro',
    },
  },
  {
    id: 'lb4',
    title: 'Duyên Dáng Quan Họ',
    garment: 'Áo Tứ Thân & Nón Quai Thao',
    century: 'Thế kỷ 15 - 19',
    vibe: 'Nón quai thao & dải yếm đào duyên dáng',
    colorHex: '#E8A598',
    tags: ['#TuThan', '#BacBo', '#NonQuaiThao'],
    config: {
      garmentId: 'tu_than',
      colorId: 'pastel_suong_mai',
      fabricId: 'silk_ha_dong',
      headpieceId: 'non_quai_thao',
      jewelryId: 'silver_kieng',
      handheldId: 'silk_fan',
      footwearId: 'ballet_embroidered',
      backgroundId: 'pho_co',
      visualEffect: 'petals_peach',
      lighting: 'daylight',
    },
  },
  {
    id: 'lb5',
    title: 'Hào Khí Đại Việt',
    garment: 'Áo Viên Lĩnh & Mũ Phác Đầu',
    century: 'Thế kỷ 11 - 15',
    vibe: 'Uy nghiêm, tráng lệ & Khí phách Đông A',
    colorHex: '#1E3A8A',
    tags: ['#VienLinh', '#MuPhacDau', '#HaoKhiDaiViet'],
    config: {
      gender: 'male',
      garmentId: 'vien_linh',
      colorId: 'blue_thien_thanh',
      fabricId: 'brocade_gam',
      headpieceId: 'mu_phac_dau',
      jewelryId: 'the_bai_nga',
      handheldId: 'kiem_le_phuc_trieu_dinh',
      footwearId: 'hai_nhung_theu_hac',
      backgroundId: 'san_dinh',
      visualEffect: 'gold_dust',
      lighting: 'moonlight',
      windSpeed: 'strong',
    },
  },
  {
    id: 'lb6',
    title: 'Xuân Vàng Nghinh Phúc',
    garment: 'Áo Tấc & Cành Mai Vàng',
    century: 'Thế kỷ 19',
    vibe: 'Rạng ngời sắc xuân & Vượng khí cát tường',
    colorHex: '#E5C158',
    tags: ['#AoTac', '#CanhMai', '#XuanGiapThin'],
    config: {
      gender: 'female',
      garmentId: 'ao_tac',
      colorId: 'pastel_vang_mo',
      fabricId: 'silk_ha_dong',
      headpieceId: 'khan_van',
      jewelryId: 'hoa_tai_vang_trieu_nguyen',
      handheldId: 'canh_hoa_mai_tet',
      footwearId: 'guoc_moc_son_son',
      backgroundId: 'pho_co',
      visualEffect: 'petals_apricot',
      lighting: 'daylight',
      windSpeed: 'gentle',
    },
  },
];

export const LookbookShowcase: React.FC<Props> = ({
  onApplyOutfit,
  onGoToStudio,
}) => {
  const [activeTab, setActiveTab] = useState<'curated' | 'community'>('curated');
  const [communityOutfits, setCommunityOutfits] = useState<SavedOutfitRecord[]>([]);
  const [isLoadingCommunity, setIsLoadingCommunity] = useState(false);

  useEffect(() => {
    if (activeTab === 'community') {
      setIsLoadingCommunity(true);
      fetchPublicOutfits()
        .then((data) => {
          setCommunityOutfits(data || []);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingCommunity(false);
        });
    }
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#ECE6D9] pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full">
            Tuyển Tập Lookbook Sắc Việt
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1E1E1E] mt-1">
            Bộ Sưu Tập Việt Phục Mẫu
          </h2>
          <p className="text-xs sm:text-sm text-[#7D6E63] mt-0.5">
            Các bản phối tiêu biểu giao thoa giữa chuẩn mực di sản lịch sử và phong cách sống đương đại của thế hệ trẻ.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented Filter: Curated vs Community */}
          <div className="bg-[#F0EAE1] p-1 rounded-full flex items-center text-xs font-semibold">
            <button
              onClick={() => setActiveTab('curated')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === 'curated'
                  ? 'bg-white text-[#1E1E1E] shadow-2xs font-bold'
                  : 'text-[#71717A] hover:text-[#1E1E1E]'
              }`}
            >
              Giám Tuyển
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'community'
                  ? 'bg-white text-[#1E1E1E] shadow-2xs font-bold'
                  : 'text-[#71717A] hover:text-[#1E1E1E]'
              }`}
            >
              <Globe className="w-3 h-3 text-[#0F4C81]" />
              <span>Cộng Đồng</span>
            </button>
          </div>

          <button
            onClick={onGoToStudio}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1E1E1E] text-white rounded-xl text-xs font-semibold hover:bg-[#2C2C2C] transition-colors cursor-pointer"
          >
            <span>Vào studio tự phối</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. CURATED TAB */}
      {activeTab === 'curated' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CURATED_LOOKBOOKS.map((lb) => (
            <div
              key={lb.id}
              className="group bg-white rounded-3xl border border-[#ECE6D9] p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Color Bar / Swatch Header */}
                <div
                  className="h-36 rounded-2xl p-3 flex flex-col justify-between relative overflow-hidden shadow-xs"
                  style={{ backgroundColor: lb.colorHex }}
                >
                  <div className="flex items-center justify-between text-white/90 text-[10px] font-bold tracking-widest uppercase">
                    <span>{lb.century}</span>
                    <span className="px-2 py-0.5 bg-black/25 backdrop-blur-xs rounded-full">
                      {lb.garment}
                    </span>
                  </div>

                  <div className="text-white">
                    <h3 className="font-serif font-bold text-lg leading-tight">
                      {lb.title}
                    </h3>
                    <p className="text-[11px] text-white/80 mt-0.5">
                      {lb.vibe}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {lb.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium text-[#7D6E63] bg-[#F5F1E9] px-2 py-0.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Try Style Button */}
              <button
                onClick={() => {
                  onApplyOutfit(lb.config);
                  onGoToStudio();
                }}
                className="mt-4 w-full py-2 bg-[#FBF9F4] hover:bg-[#D32F2F] text-[#1E1E1E] hover:text-white rounded-xl text-xs font-semibold border border-[#ECE6D9] hover:border-[#D32F2F] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Thử phong cách này</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 2. COMMUNITY TAB */}
      {activeTab === 'community' && (
        <div>
          {isLoadingCommunity ? (
            <div className="flex items-center justify-center py-16 gap-2 text-xs text-[#71717A]">
              <div className="w-5 h-5 border-2 border-[#D32F2F] border-t-transparent rounded-full animate-spin" />
              <span>Đang tải các bản phối từ cộng đồng Firebase...</span>
            </div>
          ) : communityOutfits.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-dashed border-[#D5CEC2]">
              <Globe className="w-10 h-10 text-[#D4AF37] mx-auto mb-2" />
              <h4 className="font-serif font-bold text-base text-[#1E1E1E]">
                Chưa có bản phối công khai nào
              </h4>
              <p className="text-xs text-[#71717A] mt-1 max-w-sm mx-auto">
                Hãy là người đầu tiên phối một bộ Việt phục và bật chia sẻ công khai khi lưu vào Tủ Đồ Số!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {communityOutfits.map((item) => {
                const garment = GARMENTS.find((g) => g.id === item.garmentId) || GARMENTS[0];
                const col = COLORS.find((c) => c.id === item.colorId) || COLORS[0];
                const occ = OCCASIONS.find((o) => o.id === item.occasionId) || OCCASIONS[0];
                const mainColor = item.customColorHex || col.hex;

                return (
                  <div
                    key={item.id}
                    className="group bg-white rounded-3xl border border-[#ECE6D9] p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <div
                        className="h-32 rounded-2xl p-3 flex flex-col justify-between relative overflow-hidden shadow-xs"
                        style={{ backgroundColor: mainColor }}
                      >
                        <div className="flex items-center justify-between text-white/90 text-[10px] font-bold tracking-wider uppercase">
                          <span>{garment.dynasty}</span>
                          <span className="px-2 py-0.5 bg-black/30 backdrop-blur-xs rounded-full">
                            {item.harmonyScore.toFixed(1)}/10
                          </span>
                        </div>

                        <div className="text-white drop-shadow">
                          <h4 className="font-serif font-bold text-base leading-tight line-clamp-1">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-white/90 block">
                            Tác giả: {item.authorName}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 text-xs">
                        <span className="font-semibold text-[#1E1E1E] block">
                          {garment.name}
                        </span>
                        <span className="text-[11px] text-[#71717A] block">
                          {col.name} • {occ.name}
                        </span>
                        {item.note && (
                          <p className="text-[10px] text-[#8C827A] italic mt-1 line-clamp-2 bg-[#FAF8F5] p-1.5 rounded-lg border border-[#F0EBE1]">
                            "{item.note}"
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
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
                        });
                        onGoToStudio();
                      }}
                      className="mt-4 w-full py-2 bg-[#FBF9F4] hover:bg-[#D32F2F] text-[#1E1E1E] hover:text-white rounded-xl text-xs font-semibold border border-[#ECE6D9] hover:border-[#D32F2F] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Thử bản phối này</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
