export type OccasionId = 
  | 'tet' 
  | 'graduation' 
  | 'retro_street' 
  | 'temple'
  | 'wedding'
  | 'diplomatic';

export interface Occasion {
  id: OccasionId;
  name: string;
  tag: string;
  icon: string;
  vibe: string;
  recommendedColors: string[];
  description?: string;
  culturalEtiquette?: string;
}

export type GarmentId = 
  | 'ao_tac' 
  | 'ngu_than' 
  | 'nhat_binh' 
  | 'tu_than'
  | 'giao_linh'
  | 'vien_linh';

export interface GarmentAnatomy {
  collarType: string; // Kiểu cổ áo (Lập lĩnh, Giao lĩnh, Viên lĩnh...)
  sleeveType: string; // Kiểu tay (Tay thụng rộng 35-40cm, Tay chẽn...)
  flapStructure: string; // Cấu trúc thân & vạt áo
  fastenerType: string; // Kiểu khuy cài (5 hạt khuy ngọc/đồng, dải buộc lụa...)
}

export interface Garment {
  id: GarmentId;
  name: string;
  hanTuName: string; // Tên Hán Nôm
  dynasty: string;
  dynastyPeriod: string; // Ví dụ: "1802 – 1945"
  century: string;
  formality: string;
  socialClass: string; // Hoàng tộc, Quý tộc, Quan lại, Nho sĩ, Bình dân
  description: string;
  anatomy: GarmentAnatomy;
  features: string[];
  vibe: string;
  confucianMeaning: string; // Triết lý đạo Nho / Dân gian
  historicalTrivia: string; // Điển tích & giai thoại lịch sử
  etiquetteRules: string; // Quy tắc lễ nghi khi vận mặc
  heritageArtifactLocation: string; // Hiện vật bảo tàng lưu giữ
  suitableOccasions: OccasionId[];
}

export type OriginalDetailId = 
  | 'five_buttons' 
  | 'lap_linh_collar' 
  | 'nhat_binh_kerchief' 
  | 'tu_than_knot'
  | 'ngoc_boi_trieu_nguyen';

export interface OriginalDetail {
  id: OriginalDetailId;
  name: string;
  dynasty: string;
  meaning: string;
  icon: string;
  historicalContext?: string;
}

export type RemixAccessoryId = 
  | 'retro_sunglasses' 
  | 'combat_boots' 
  | 'silk_fan' 
  | 'khan_van' 
  | 'tote_gam'
  | 'pearl_modern_choker';

export interface RemixAccessory {
  id: RemixAccessoryId;
  name: string;
  tag: string;
  category: 'head' | 'hand' | 'footwear';
  desc: string;
}

export type FabricId = 
  | 'silk_ha_dong' 
  | 'brocade_gam' 
  | 'sa_chiffon' 
  | 'linen_dui' 
  | 'velvet_nhung'
  | 'lotus_silk';

export interface Fabric {
  id: FabricId;
  name: string;
  originVillage: string; // Làng nghề truyền thống (Vạn Phúc, Bảo Lộc...)
  texture: string;
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  shine: number; // 0 - 100%
  breathability: string;
  seasonRecommendation: string;
  careInstructions: string;
}

export interface ColorItem {
  id: string;
  name: string;
  hanTuName?: string;
  category: 'ngu_hanh' | 'pastel' | 'cung_dinh';
  element?: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  meaning: string; // Ý nghĩa văn hóa & phong thủy ngũ hành
  royalRule: string; // Điển chế triều đình (Chánh sắc vs Gian sắc)
  hex: string;
  accentHex?: string;
  pantHex: string;
  pantName: string;
  pantColor: string;
  suggestedFabrics?: string[];
  isRoyalRestricted?: boolean;
}

export type HeadpieceId = 
  | 'none' 
  | 'man_lua' 
  | 'khan_dong' 
  | 'khan_dong_hoang_gia'
  | 'khan_van' 
  | 'non_quai_thao' 
  | 'non_la_sen'
  | 'tram_cai_toc_ngoc'
  | 'mu_phac_dau'
  | 'vuong_mien_hoang_hau';

export interface Headpiece {
  id: HeadpieceId;
  name: string;
  genderFit?: 'female' | 'male' | 'unisex';
  desc: string;
  etiquetteNote?: string;
}

export type JewelryId = 
  | 'none' 
  | 'silver_kieng' 
  | 'gold_kieng' 
  | 'pearl_necklace' 
  | 'jade_pendant'
  | 'the_bai_nga'
  | 'chuoi_tram_huong_108'
  | 'vong_ngoc_cam_thach'
  | 'hoa_tai_vang_trieu_nguyen'
  | 'khuyen_tai_bac_hoa_cuc';

export interface Jewelry {
  id: JewelryId;
  name: string;
  desc: string;
  icon?: string;
  genderFit?: 'female' | 'male' | 'unisex';
  maleAltName?: string;
  maleAltDesc?: string;
  placementNote?: string;
  material?: string;
}

export type HandheldId = 
  | 'none' 
  | 'silk_fan' 
  | 'o_giay_dau'
  | 'quat_long_chim'
  | 'hoa_sen_cam_tay'
  | 'rattan_bag' 
  | 'tote_gam' 
  | 'sach_co_thu_phap'
  | 'retro_sunglasses'
  | 'kiem_le_phuc_trieu_dinh'
  | 'canh_hoa_mai_tet';

export interface Handheld {
  id: HandheldId;
  name: string;
  desc: string;
  icon?: string;
}

export type FootwearId = 
  | 'wooden_clogs' 
  | 'guoc_moc_son_son'
  | 'hai_theu_rong_phuong'
  | 'satin_heels' 
  | 'combat_boots' 
  | 'ballet_embroidered'
  | 'giay_tay_oxford'
  | 'hai_nhung_theu_hac';

export interface Footwear {
  id: FootwearId;
  name: string;
  desc: string;
}

export type BackgroundId = 
  | 'san_dinh' 
  | 'pho_co' 
  | 'cafe_retro' 
  | 'studio_minimal';

export interface BackgroundItem {
  id: BackgroundId;
  name: string;
  tag: string;
  icon: string;
  ambianceHex: string;
}

export type VisualEffectId = 
  | 'none'
  | 'petals_peach'     // Hoa đào hồng rơi
  | 'petals_apricot'   // Hoa mai vàng rơi
  | 'gold_dust'        // Bụi vàng lấp lánh hoàng gia
  | 'bamboo_leaves'    // Lá trúc xanh bay
  | 'fireflies_night'  // Đom đóm hoàng thành lung linh
  | 'lotus_petals'     // Cánh sen hồng thanh khiết
  | 'cherry_rain';     // Mưa bụi mùa xuân Kinh Bắc

export type WindSpeed = 'still' | 'gentle' | 'strong';

export type LightingAmbiance = 'daylight' | 'sunset' | 'lantern_night' | 'atelier' | 'moonlight';

export interface OutfitConfig {
  gender: 'female' | 'male';
  occasionId: OccasionId;
  garmentId: GarmentId;
  fabricId: FabricId;
  colorId: string;
  customColorHex?: string; // Mã màu hex tùy chỉnh khi người dùng phối màu chuyên sâu
  customPantHex?: string;  // Mã màu quần lụa tùy chỉnh
  originalDetailId?: OriginalDetailId;
  headpieceId: HeadpieceId;
  jewelryId: JewelryId;
  handheldId: HandheldId;
  footwearId: FootwearId;
  backgroundId: BackgroundId;
  userAvatarUrl?: string | null;
  customStylingNote?: string;
  jewelryPosition?: 'collar_base' | 'chest_drape' | 'hidden';
  sketchMode?: 'studio' | 'croquis_sketch';
  designTitle?: string;
  visualEffect?: VisualEffectId;
  windSpeed?: WindSpeed;
  lighting?: LightingAmbiance;
}

export interface CulturalAssessment {
  harmonyScore: number; // 0.0 - 10.0
  traditionStatus: 'safe' | 'caution' | 'warning';
  traditionLabel: string;
  alertMessage?: string;
  hasViolation: boolean;
  quickAdvice: string;
  historicalContext: {
    title: string;
    dynasty: string;
    century: string;
    etiquetteRule: string;
    confucianPhilosophy: string;
    remixTip: string;
  };
}

export interface LookbookPosterData {
  title: string;
  userName: string;
  garmentName: string;
  colorName: string;
  occasionName: string;
  harmonyScore: number;
  qrCodeText: string;
  dateStr: string;
}
