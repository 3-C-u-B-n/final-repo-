import React, { useRef, useEffect, useState } from 'react';
import { OutfitConfig, CulturalAssessment, VisualEffectId, WindSpeed, LightingAmbiance } from '../types';
import {
  GARMENTS,
  COLORS,
  FABRICS,
  HEADPIECES,
  JEWELRIES,
  HANDHELDS,
  FOOTWEARS,
  BACKGROUNDS,
  VISUAL_EFFECTS,
  LIGHTING_PRESETS,
} from '../data/fashionData';
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  Wind,
  Rotate3d,
  User,
  Users,
  Sparkles,
  Sliders,
  Layers,
  Palette,
  Sun,
  Sunset,
  Flame,
  Flower2,
  Settings,
} from 'lucide-react';
import {
  StudioSettingsModal,
  StudioSettingsData,
  loadSavedStudioSettings,
  saveStudioSettings,
  DEFAULT_STUDIO_SETTINGS,
} from './StudioSettingsModal';

// Polyfill for roundRect on environments that do not natively implement it
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x: number, y: number, w: number, h: number, radii?: number | number[]) {
    const r = typeof radii === 'number' ? radii : (Array.isArray(radii) ? radii[0] : 0) || 0;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  };
}

interface Props {
  config: OutfitConfig;
  assessment: CulturalAssessment;
  onOpenCulturalModal: () => void;
  onOpenWarningModal: () => void;
  onToggleGender: () => void;
  onChangeBackground: (bgId: any) => void;
  onChangeConfig?: (updates: Partial<OutfitConfig>) => void;
  isAiGenerating?: boolean;
}

export const StudioCanvas: React.FC<Props> = ({
  config,
  assessment,
  onOpenCulturalModal,
  onOpenWarningModal,
  onToggleGender,
  onChangeBackground,
  onChangeConfig,
  isAiGenerating,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Persistent Settings State
  const [savedSettings, setSavedSettings] = useState<StudioSettingsData>(() => {
    const saved = loadSavedStudioSettings();
    return {
      ...saved,
      visualEffect: config.visualEffect || saved.visualEffect,
      windSpeed: config.windSpeed || saved.windSpeed,
      lighting: config.lighting || saved.lighting,
      displayMode: config.sketchMode === 'croquis_sketch' ? 'sketch' : saved.displayMode,
      jewelryPlacement: config.jewelryPosition || saved.jewelryPlacement,
      backgroundId: config.backgroundId || saved.backgroundId,
    };
  });
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // View & Presentation State
  const [viewAngle, setViewAngle] = useState<'front' | 'three_quarter'>(savedSettings.viewAngle);
  const [windActive, setWindActive] = useState<boolean>(savedSettings.windSpeed !== 'still');
  const [windIntensity, setWindIntensity] = useState<WindSpeed>(config.windSpeed || savedSettings.windSpeed);
  const [visualEffect, setVisualEffect] = useState<VisualEffectId>(config.visualEffect || savedSettings.visualEffect);
  const [lighting, setLighting] = useState<LightingAmbiance>(config.lighting || savedSettings.lighting);
  const [displayMode, setDisplayMode] = useState<'sketch' | 'studio'>(
    config.sketchMode === 'croquis_sketch' ? 'sketch' : savedSettings.displayMode
  );
  const [jewelryPlacement, setJewelryPlacement] = useState<'collar_base' | 'chest_drape' | 'hidden'>(
    config.jewelryPosition || savedSettings.jewelryPlacement
  );

  // Unified Settings Updater with Persistence (localStorage)
  const handleUpdateSettings = (updates: Partial<StudioSettingsData>) => {
    const nextSettings: StudioSettingsData = {
      ...savedSettings,
      ...updates,
    };
    setSavedSettings(nextSettings);
    saveStudioSettings(nextSettings);

    if (updates.visualEffect !== undefined) setVisualEffect(updates.visualEffect);
    if (updates.lighting !== undefined) setLighting(updates.lighting);
    if (updates.windSpeed !== undefined) {
      setWindIntensity(updates.windSpeed);
      setWindActive(updates.windSpeed !== 'still');
    }
    if (updates.viewAngle !== undefined) setViewAngle(updates.viewAngle);
    if (updates.jewelryPlacement !== undefined) setJewelryPlacement(updates.jewelryPlacement);
    if (updates.displayMode !== undefined) setDisplayMode(updates.displayMode);
    if (updates.backgroundId !== undefined) onChangeBackground(updates.backgroundId);

    onChangeConfig?.({
      visualEffect: updates.visualEffect ?? savedSettings.visualEffect,
      lighting: updates.lighting ?? savedSettings.lighting,
      windSpeed: updates.windSpeed ?? savedSettings.windSpeed,
      jewelryPosition: updates.jewelryPlacement ?? savedSettings.jewelryPlacement,
      sketchMode: (updates.displayMode ?? savedSettings.displayMode) === 'sketch' ? 'croquis_sketch' : 'studio',
      backgroundId: updates.backgroundId ?? savedSettings.backgroundId,
    });
  };

  const handleResetSettingsDefaults = () => {
    handleUpdateSettings(DEFAULT_STUDIO_SETTINGS);
  };

  // Sync when config updates externally
  useEffect(() => {
    if (config.visualEffect !== undefined) {
      setVisualEffect(config.visualEffect);
      setSavedSettings((prev) => ({ ...prev, visualEffect: config.visualEffect! }));
    }
  }, [config.visualEffect]);

  useEffect(() => {
    if (config.windSpeed !== undefined) {
      setWindIntensity(config.windSpeed);
      setWindActive(config.windSpeed !== 'still');
      setSavedSettings((prev) => ({ ...prev, windSpeed: config.windSpeed! }));
    }
  }, [config.windSpeed]);

  useEffect(() => {
    if (config.lighting !== undefined) {
      setLighting(config.lighting);
      setSavedSettings((prev) => ({ ...prev, lighting: config.lighting! }));
    }
  }, [config.lighting]);

  useEffect(() => {
    if (config.sketchMode !== undefined) {
      const mode = config.sketchMode === 'croquis_sketch' ? 'sketch' : 'studio';
      setDisplayMode(mode);
      setSavedSettings((prev) => ({ ...prev, displayMode: mode }));
    }
  }, [config.sketchMode]);

  useEffect(() => {
    if (config.jewelryPosition !== undefined) {
      setJewelryPlacement(config.jewelryPosition);
      setSavedSettings((prev) => ({ ...prev, jewelryPlacement: config.jewelryPosition! }));
    }
  }, [config.jewelryPosition]);

  useEffect(() => {
    if (config.backgroundId !== undefined) {
      setSavedSettings((prev) => ({ ...prev, backgroundId: config.backgroundId }));
    }
  }, [config.backgroundId]);

  const garment = GARMENTS.find((g) => g.id === config.garmentId) || GARMENTS[0];
  const col = COLORS.find((c) => c.id === config.colorId) || COLORS[0];
  const fab = FABRICS.find((f) => f.id === config.fabricId) || FABRICS[0];
  const jew = JEWELRIES.find((j) => j.id === config.jewelryId) || JEWELRIES[0];
  const bg = BACKGROUNDS.find((b) => b.id === config.backgroundId) || BACKGROUNDS[0];

  useEffect(() => {
    let tick = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 500;
      const height = 700;
      canvas.width = width * 2;
      canvas.height = height * 2;
      ctx.resetTransform?.();
      ctx.scale(2, 2);

      const isMale = config.gender === 'male';
      const is3Q = viewAngle === 'three_quarter';
      const isSketch = displayMode === 'sketch';
      const windMult = windIntensity === 'strong' ? 1.6 : windIntensity === 'gentle' ? 1.0 : 0;
      const wave = windActive && !isSketch ? Math.sin(tick * 0.04) * 8 * windMult : (isSketch ? 2 : 0);

      // 1. BACKGROUND RENDERING (Croquis Fashion Paper vs Scenic Studio Atelier)
      if (isSketch) {
        drawCroquisSketchPaper(ctx, width, height, garment, col, fab, isMale);
      } else {
        drawAtmosphericBackground(ctx, width, height, bg.id);
      }

      // 2. MODEL ANATOMICAL DIMENSIONS & ANCHORS
      // Coordinated perspective tilt across whole figure
      const tilt = is3Q ? 8 : 0;
      const centerX = width / 2 + (is3Q ? -4 : 0);
      const headY = 96;
      const neckY = 138;
      const shoulderY = isMale ? 152 : 158;
      const bustY = 205;
      const waistY = 252;
      const hipY = 305;
      const kneeY = 440;
      const ankleY = 570;
      const feetY = 598;

      // 3. AMBIENT FLOOR SHADOW
      drawFloorShadow(ctx, centerX, feetY + 12, is3Q, wave, isSketch);

      // Pants and garment color resolution (supports custom palette when logged in)
      const colHex = config.customColorHex || col.hex;
      const pantsColor = config.customPantHex || col.pantHex;

      // 4. TROUSERS (Quần lụa ống rộng / Quần dài nam)
      drawTrousers(ctx, {
        centerX,
        hipY,
        kneeY,
        ankleY,
        pantsColor,
        is3Q,
        tilt,
        wave,
        isMale,
        isSketch,
      });

      // 5. FOOTWEAR (Guốc mộc, Giày satin, Boots da, Hài thêu)
      drawFootwear(ctx, { centerX, ankleY, config, is3Q, tilt, isSketch });

      // 6. BACK FLAP / DRAPE (Tà áo sau)
      drawBackGarment(ctx, {
        centerX,
        waistY,
        kneeY,
        ankleY,
        config,
        colHex,
        is3Q,
        tilt,
        wave,
        isMale,
        isSketch,
      });

      // 7. BODY FOUNDATION & NECK (Khung xương cổ & ngực)
      drawNeckAndBodyFoundation(ctx, {
        centerX,
        headY,
        neckY,
        shoulderY,
        bustY,
        is3Q,
        tilt,
        isMale,
        isSketch,
      });

      // 8. FRONT BODY & GARMENT FLAP (Vạt trước áo ngũ thân, tà áo chính)
      drawFrontGarment(ctx, {
        centerX,
        neckY,
        shoulderY,
        bustY,
        waistY,
        hipY,
        kneeY,
        ankleY,
        config,
        colHex,
        is3Q,
        tilt,
        wave,
        fab,
        isMale,
        isSketch,
      });

      // 9. SLEEVES & HANDS (Tay thụng áo tấc / Tay chẽn / Tay áo Nhật Bình ngũ sắc)
      drawSleevesAndHands(ctx, {
        centerX,
        shoulderY,
        bustY,
        waistY,
        config,
        colHex,
        is3Q,
        tilt,
        isMale,
        isSketch,
        wave,
      });

      // 10. COLLAR / VẠT CỔ THEO TỪNG LOẠI ÁO (Cổ lập lĩnh / Vạt chữ nhật Nhật Bình / Cổ yếm Tứ Thân)
      drawGarmentCollar(ctx, {
        centerX,
        neckY,
        shoulderY,
        bustY,
        config,
        colHex,
        is3Q,
        tilt,
        isMale,
        isSketch,
      });

      // 11. JEWELRY (Kiềng Bạc, Kiềng Vàng, Chuỗi Ngọc Trai, Mặt Ngọc Bích / Thẻ Bài Nam)
      // Được định vị chính xác, không bao giờ đè lên cổ áo, phối màu tương phản sang trọng
      if (jewelryPlacement !== 'hidden') {
        drawJewelry(ctx, {
          centerX,
          neckY,
          bustY,
          config,
          tick,
          is3Q,
          tilt,
          colHex,
          isMale,
          placement: jewelryPlacement,
          isSketch,
        });
      }

      // 12. FACE & HAIR (Khuôn mặt thanh tú, đường nét vẽ phác thảo mỹ thuật)
      drawFaceAndHair(ctx, {
        centerX,
        headY,
        neckY,
        is3Q,
        tilt,
        isMale,
        avatarUrl: config.userAvatarUrl,
        isSketch,
      });

      // 13. HEADPIECE (Mấn xếp lụa, Khăn đóng nam, Khăn vấn, Nón quai thao, Nón lá sen)
      drawHeadpiece(ctx, {
        centerX,
        headY,
        waistY,
        config,
        colHex,
        is3Q,
        tilt,
        wave,
        isMale,
        isSketch,
      });

      // 14. HANDHELD (Quạt lụa xếp, Ô giấy dầu, Quạt lông, Hoa sen, Túi gấm, Sách cổ, Kính râm)
      drawHandheld(ctx, {
        centerX,
        waistY,
        config,
        is3Q,
        tilt,
        wave,
        isSketch,
      });

      // 15. SILK SHIMMER LUSTRE (Ánh óng tơ lụa & gấm hoa)
      if (!isSketch && (fab.shine || 0) > 40) {
        drawSilkLustre(ctx, centerX, bustY, waistY, ankleY, colHex, fab.shine, wave, tick);
      }

      // 16. VISUAL EFFECTS PARTICLES (Hoa mai, hoa đào, bụi vàng, lá trúc)
      if (visualEffect !== 'none') {
        drawVisualParticles(ctx, width, height, visualEffect, tick, wave);
      }

      // 17. LIGHTING AMBIANCE OVERLAY (Hoàng hôn Cố đô, Đèn lồng đêm, Ban ngày)
      if (!isSketch) {
        drawLightingAmbiance(ctx, width, height, lighting, tick);
      }

      // 18. CROQUIS ANNOTATIONS & MEASUREMENT GUIDE MARKS (Chỉ hiển thị trong chế độ phác thảo 2D)
      if (isSketch) {
        drawMeasurementAndSpecAnnotations(ctx, width, height, garment, col, jew, config);
      }

      tick++;
      if (
        (windActive && windIntensity !== 'still' && !isSketch) ||
        visualEffect !== 'none' ||
        lighting === 'lantern_night' ||
        lighting === 'moonlight'
      ) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [config, viewAngle, windActive, windIntensity, visualEffect, lighting, displayMode, jewelryPlacement]);

  // Toggle jewelry placement mode
  const handleCycleJewelryPlacement = () => {
    const next =
      jewelryPlacement === 'collar_base'
        ? 'chest_drape'
        : jewelryPlacement === 'chest_drape'
        ? 'hidden'
        : 'collar_base';
    setJewelryPlacement(next);
    onChangeConfig?.({ jewelryPosition: next });
  };

  // Toggle display mode
  const handleToggleDisplayMode = () => {
    const next = displayMode === 'sketch' ? 'studio' : 'sketch';
    setDisplayMode(next);
    onChangeConfig?.({ sketchMode: next === 'sketch' ? 'croquis_sketch' : 'studio' });
  };

  return (
    <div className="relative w-full aspect-[5/7] max-h-[720px] bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#ECE6D9] shadow-sm flex items-center justify-center select-none">
      {/* 2D Croquis & 3D Atelier Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
      />

      {/* Top Floating Control Bar - Compact single row, no overflow */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-20">
        {/* Left: Mode Toggle (Bản Phác Thảo 2D vs Studio Sân Khấu) */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-[#1E1E1E]/85 backdrop-blur-md p-1 rounded-full text-white text-xs shadow-md border border-white/10">
            <button
              onClick={() => handleUpdateSettings({ displayMode: 'sketch' })}
              className={`px-3 py-1 rounded-full transition-all text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer ${
                displayMode === 'sketch'
                  ? 'bg-[#D4AF37] text-[#1E1E1E] shadow-xs font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Chuyển sang Chế độ Bản Vẽ Phác Thảo 2D (Croquis Fashion Sketch)"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Phác Thảo 2D</span>
            </button>
            <button
              onClick={() => handleUpdateSettings({ displayMode: 'studio' })}
              className={`px-3 py-1 rounded-full transition-all text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer ${
                displayMode === 'studio'
                  ? 'bg-white text-[#1E1E1E] shadow-xs font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Chuyển sang Chế độ Sân Khấu / Studio Trực Quan"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Studio</span>
            </button>
          </div>
        </div>

        {/* Right: Gender Toggle, 3D Rotate, and Unified Settings Button */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-[#1E1E1E]/85 backdrop-blur-md p-1 rounded-full text-white text-xs shadow-md border border-white/10">
          {/* Gender Toggle */}
          <button
            onClick={onToggleGender}
            className="px-2.5 py-1 rounded-full hover:bg-white/20 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            title="Chuyển đổi nhân vật Nam / Nữ"
          >
            {config.gender === 'female' ? (
              <User className="w-3 h-3 text-[#D4AF37]" />
            ) : (
              <Users className="w-3 h-3 text-[#0F4C81]" />
            )}
            <span>{config.gender === 'female' ? 'Nữ' : 'Nam'}</span>
          </button>

          <div className="w-[1px] h-3 bg-white/20" />

          {/* Rotate Angle (Front / 3/4) */}
          <button
            onClick={() => handleUpdateSettings({ viewAngle: viewAngle === 'front' ? 'three_quarter' : 'front' })}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              viewAngle === 'three_quarter' ? 'text-amber-300 bg-white/15' : 'text-white/70 hover:bg-white/20'
            }`}
            title="Xoay góc nhìn (Chính diện / Nghiêng 3/4 phối cảnh)"
          >
            <Rotate3d className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-3 bg-white/20" />

          {/* Unified Settings Button */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C59F2E] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#1E1E1E] font-bold text-[11px] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102"
            title="Cài đặt Studio: Hiệu ứng hạt rơi, ánh sáng, gió, góc nhìn & bối cảnh"
          >
            <Settings className="w-3.5 h-3.5 text-[#1E1E1E]" />
            <span>Cài đặt</span>
          </button>
        </div>
      </div>

      {/* Floating Bottom Left: Heritage Garment Card & Harmony Progress */}
      <div className="absolute bottom-4 left-4 pointer-events-auto z-20 flex flex-col gap-1.5 max-w-[280px] sm:max-w-xs">
        {/* Heritage Garment Info */}
        <button
          onClick={onOpenCulturalModal}
          className="group flex items-center gap-1.5 px-3 py-2 bg-[#1E1E1E]/85 hover:bg-[#1E1E1E] backdrop-blur-md text-white rounded-2xl text-[11px] sm:text-xs shadow-lg border border-white/15 transition-all text-left cursor-pointer"
        >
          <span className="font-serif font-bold text-[#D4AF37] whitespace-nowrap">
            {garment.name}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-white/90 whitespace-nowrap">
            {garment.century} ({garment.dynasty})
          </span>
          <Info className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 ml-1 group-hover:scale-115 transition-transform" />
        </button>

        {/* Harmony Indicator Progress Bar on Canvas */}
        <div className="px-3 py-1.5 bg-[#1E1E1E]/80 backdrop-blur-md rounded-xl border border-white/10 text-white text-[11px] shadow-md">
          <div className="flex items-center justify-between font-medium mb-1">
            <span className="text-white/80 text-[10px]">Độ hòa hợp trang phục:</span>
            <span className="font-bold text-[#D4AF37]">{assessment.harmonyScore.toFixed(1)}/10 ✨</span>
          </div>
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                assessment.harmonyScore >= 8.5
                  ? 'bg-emerald-500'
                  : assessment.harmonyScore >= 7
                  ? 'bg-[#D4AF37]'
                  : 'bg-[#D32F2F]'
              }`}
              style={{ width: `${(assessment.harmonyScore / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Floating Bottom Right: Cultural Alert Status Tag */}
      <div className="absolute bottom-4 right-4 pointer-events-auto z-20">
        <button
          onClick={onOpenWarningModal}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold shadow-lg backdrop-blur-md transition-all hover:scale-102 border cursor-pointer ${
            assessment.hasViolation
              ? 'bg-[#D32F2F]/90 hover:bg-[#D32F2F] text-white border-white/30 animate-pulse'
              : 'bg-[#1E1E1E]/80 hover:bg-[#1E1E1E] text-white border-white/15'
          }`}
        >
          {assessment.hasViolation ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              <span>⚠️ Cần lưu ý phối đồ</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px]">Chuẩn mực di sản ✨</span>
            </>
          )}
        </button>
      </div>

      {/* Loading overlay for AI generation */}
      {isAiGenerating && (
        <div className="absolute inset-0 bg-[#FBF9F4]/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-30">
          <div className="w-9 h-9 border-2 border-[#D32F2F] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-serif font-bold text-[#1E1E1E]">Đang vẽ phác thảo thời trang...</p>
        </div>
      )}

      {/* Unified Studio Settings Modal with persistent localStorage */}
      <StudioSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        config={config}
        currentSettings={savedSettings}
        onUpdateSettings={handleUpdateSettings}
        onResetDefaults={handleResetSettingsDefaults}
      />
    </div>
  );
};

// ==================== 1. BACKGROUNDS: SKETCH PAPER VS STUDIO ====================

function drawCroquisSketchPaper(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  garment: any,
  col: any,
  fab: any,
  isMale: boolean
) {
  // Fine vintage beige art paper
  ctx.fillStyle = '#F8F5EE';
  ctx.fillRect(0, 0, width, height);

  // Subtle architectural grid & croquis guidelines
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
  ctx.lineWidth = 0.8;
  for (let x = 30; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, height - 20);
    ctx.stroke();
  }
  for (let y = 30; y < height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(width - 20, y);
    ctx.stroke();
  }

  // Elegant Corner Border Frames
  ctx.strokeStyle = 'rgba(140, 110, 60, 0.22)';
  ctx.lineWidth = 1;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  // Sketch Watermark Title
  ctx.save();
  ctx.font = 'bold 11px "Lora", serif';
  ctx.fillStyle = 'rgba(30, 30, 30, 0.45)';
  ctx.textAlign = 'left';
  ctx.fillText('BẢN PHÁC THẢO THIẾT KẾ VIỆT PHỤC • HAUTE COUTURE CROQUIS', 28, 38);

  ctx.font = '500 9px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = 'rgba(113, 113, 122, 0.65)';
  ctx.fillText(`PHOM DÁNG: ${garment.name.toUpperCase()} (${garment.dynasty}) • MÔ HÌNH: ${isMale ? 'NAM' : 'NỮ'}`, 28, 52);
  ctx.restore();
}

function drawMeasurementAndSpecAnnotations(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  garment: any,
  col: any,
  jew: any,
  config: OutfitConfig
) {
  ctx.save();
  // Swatch box at bottom right
  const boxX = width - 150;
  const boxY = height - 120;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.strokeStyle = 'rgba(180, 150, 100, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, 130, 96, 10);
  ctx.fill();
  ctx.stroke();

  // Swatch color preview
  ctx.fillStyle = col.hex;
  ctx.beginPath();
  ctx.roundRect(boxX + 10, boxY + 12, 16, 16, 4);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.stroke();

  ctx.font = 'bold 9px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = '#1E1E1E';
  ctx.textAlign = 'left';
  ctx.fillText(col.name.split('•')[1]?.trim() || col.name, boxX + 32, boxY + 24);

  ctx.font = '500 8.5px "Be Vietnam Pro", sans-serif';
  ctx.fillStyle = '#71717A';
  ctx.fillText(`Mã màu: ${col.hex}`, boxX + 10, boxY + 44);
  ctx.fillText(`Quần: ${col.pantName}`, boxX + 10, boxY + 58);
  ctx.fillText(`Trang sức: ${config.gender === 'male' && jew.maleAltName ? jew.maleAltName : jew.name}`, boxX + 10, boxY + 72);
  ctx.fillText(`Đặc tính: ${garment.features?.[0] || 'Ngũ thân'}`, boxX + 10, boxY + 86);

  // Left Anatomical scale indicator (Croquis 8.5 heads)
  ctx.strokeStyle = 'rgba(140, 110, 60, 0.25)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(34, 100);
  ctx.lineTo(34, 600);
  ctx.stroke();

  // Tick marks
  const points = [
    { y: 100, label: 'Đầu' },
    { y: 156, label: 'Cổ/Vai' },
    { y: 252, label: 'Eo' },
    { y: 305, label: 'Hông' },
    { y: 440, label: 'Gối' },
    { y: 570, label: 'Cổ chân' },
  ];
  points.forEach((p) => {
    ctx.beginPath();
    ctx.moveTo(30, p.y);
    ctx.lineTo(38, p.y);
    ctx.stroke();
    ctx.font = '500 7.5px "Be Vietnam Pro", sans-serif';
    ctx.fillStyle = 'rgba(140, 110, 60, 0.6)';
    ctx.fillText(p.label, 42, p.y + 2.5);
  });

  ctx.restore();
}

function drawAtmosphericBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bgId: string
) {
  ctx.fillStyle = '#FBF9F4';
  ctx.fillRect(0, 0, width, height);

  if (bgId === 'san_dinh') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#E8DFD0');
    grad.addColorStop(0.5, '#F5EDE1');
    grad.addColorStop(1, '#EDE2D2');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(168, 85, 60, 0.08)';
    ctx.beginPath();
    ctx.moveTo(30, 180);
    ctx.quadraticCurveTo(width / 2, 130, width - 30, 180);
    ctx.lineTo(width - 30, 230);
    ctx.lineTo(30, 230);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(74, 45, 30, 0.05)';
    ctx.fillRect(50, 180, 24, 380);
    ctx.fillRect(width - 74, 180, 24, 380);
  } else if (bgId === 'pho_co') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#EFE0B9');
    grad.addColorStop(0.5, '#FBF3DD');
    grad.addColorStop(1, '#F2E8CB');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(211, 47, 47, 0.15)';
    ctx.beginPath();
    ctx.arc(80, 80, 22, 0, Math.PI * 2);
    ctx.arc(width - 80, 110, 26, 0, Math.PI * 2);
    ctx.fill();
  } else if (bgId === 'cafe_retro') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#EAE5DB');
    grad.addColorStop(0.6, '#F8F5EE');
    grad.addColorStop(1, '#ECE6DC');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(15, 76, 129, 0.07)';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(width / 2, 220, 160, Math.PI, 0);
    ctx.stroke();
  } else {
    const rad = ctx.createRadialGradient(width / 2, 260, 20, width / 2, 300, 360);
    rad.addColorStop(0, '#FFFFFF');
    rad.addColorStop(0.6, '#F6F3EB');
    rad.addColorStop(1, '#EAE4D7');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, width, height);
  }

  // Soft Studio Pedestal Ring on Floor
  ctx.beginPath();
  ctx.ellipse(width / 2, 608, 140, 24, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawFloorShadow(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  shadowY: number,
  is3Q: boolean,
  wave: number,
  isSketch: boolean
) {
  ctx.save();
  if (isSketch) {
    ctx.fillStyle = 'rgba(74, 59, 45, 0.1)';
    ctx.beginPath();
    ctx.ellipse(centerX, shadowY - 4, 65, 10, is3Q ? 0.04 : 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const rad = ctx.createRadialGradient(centerX + wave * 0.3, shadowY, 6, centerX + wave * 0.3, shadowY, 72);
    rad.addColorStop(0, 'rgba(30, 30, 30, 0.22)');
    rad.addColorStop(0.5, 'rgba(30, 30, 30, 0.08)');
    rad.addColorStop(1, 'rgba(30, 30, 30, 0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.ellipse(centerX + wave * 0.3, shadowY, 70, 15, is3Q ? 0.05 : 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ==================== 2. TROUSERS & FOOTWEAR ====================

function drawTrousers(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    hipY: number;
    kneeY: number;
    ankleY: number;
    pantsColor: string;
    is3Q: boolean;
    tilt: number;
    wave: number;
    isMale: boolean;
    isSketch: boolean;
  }
) {
  const { centerX, hipY, kneeY, ankleY, pantsColor, tilt, wave, isMale, isSketch } = opts;
  const legWave = wave * 0.35;

  ctx.save();
  ctx.fillStyle = pantsColor;
  ctx.strokeStyle = isSketch ? '#4A3B32' : 'rgba(30, 30, 30, 0.25)';
  ctx.lineWidth = isSketch ? 1.2 : 1.1;

  // Left Leg (Quần lụa ống rộng)
  ctx.beginPath();
  ctx.moveTo(centerX - (isMale ? 34 : 28) + tilt, hipY);
  ctx.quadraticCurveTo(centerX - 42 + tilt, kneeY, centerX - 54 + legWave, ankleY + 15);
  ctx.lineTo(centerX - 6 + legWave, ankleY + 15);
  ctx.quadraticCurveTo(centerX - 8 + tilt, kneeY, centerX - 2 + tilt, hipY + 40);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Right Leg
  ctx.beginPath();
  ctx.moveTo(centerX + 2 + tilt, hipY + 40);
  ctx.quadraticCurveTo(centerX + 8 + tilt, kneeY, centerX + 6 + legWave, ankleY + 15);
  ctx.lineTo(centerX + 54 + legWave, ankleY + 15);
  ctx.quadraticCurveTo(centerX + 42 + tilt, kneeY, centerX + (isMale ? 34 : 28) + tilt, hipY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Silk Pleat Crease Shadow
  ctx.strokeStyle = isSketch ? 'rgba(74, 59, 50, 0.18)' : 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(centerX - 30 + tilt, hipY + 30);
  ctx.quadraticCurveTo(centerX - 33 + legWave * 0.5, kneeY, centerX - 32 + legWave, ankleY + 10);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX + 30 + tilt, hipY + 30);
  ctx.quadraticCurveTo(centerX + 33 + legWave * 0.5, kneeY, centerX + 32 + legWave, ankleY + 10);
  ctx.stroke();

  ctx.restore();
}

function drawFootwear(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    ankleY: number;
    config: OutfitConfig;
    is3Q: boolean;
    tilt: number;
    isSketch: boolean;
  }
) {
  const { centerX, ankleY, config, tilt, isSketch } = opts;

  ctx.save();
  ctx.strokeStyle = isSketch ? '#3A2E28' : '#222222';
  ctx.lineWidth = 1;

  if (config.footwearId === 'wooden_clogs') {
    // Guốc mộc quai nhung
    ctx.fillStyle = '#C89437';
    ctx.fillRect(centerX - 46 + tilt, ankleY + 18, 28, 9);
    ctx.fillStyle = '#8C1D24';
    ctx.fillRect(centerX - 40 + tilt, ankleY + 12, 16, 6);

    ctx.fillStyle = '#C89437';
    ctx.fillRect(centerX + 18 + tilt, ankleY + 18, 28, 9);
    ctx.fillStyle = '#8C1D24';
    ctx.fillRect(centerX + 24 + tilt, ankleY + 12, 16, 6);
  } else if (config.footwearId === 'guoc_moc_son_son') {
    // Guốc mộc sơn son thếp vàng
    ctx.fillStyle = '#DC2626'; // Sơn son đỏ
    ctx.fillRect(centerX - 46 + tilt, ankleY + 18, 28, 9);
    ctx.fillRect(centerX + 18 + tilt, ankleY + 18, 28, 9);
    // Viền dát vàng
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(centerX - 46 + tilt, ankleY + 25, 28, 2);
    ctx.fillRect(centerX + 18 + tilt, ankleY + 25, 28, 2);
    // Quai gấm đen
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(centerX - 40 + tilt, ankleY + 12, 16, 6);
    ctx.fillRect(centerX + 24 + tilt, ankleY + 12, 16, 6);
  } else if (config.footwearId === 'hai_theu_rong_phuong') {
    // Hài thêu rồng phượng mũi cong hoàng cung
    ctx.fillStyle = '#8E1823';
    ctx.beginPath();
    ctx.roundRect(centerX - 46 + tilt, ankleY + 14, 28, 12, 3);
    ctx.roundRect(centerX + 18 + tilt, ankleY + 14, 28, 12, 3);
    ctx.fill();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.3;
    ctx.stroke();
    // Mũi cong vểnh hoàng cung
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(centerX - 46 + tilt, ankleY + 15, 3.5, 0, Math.PI * 2);
    ctx.arc(centerX + 46 + tilt, ankleY + 15, 3.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (config.footwearId === 'hai_nhung_theu_hac') {
    // Hài nhung đỏ thắm mũi cong thêu chim hạc
    ctx.fillStyle = '#991B1B';
    ctx.beginPath();
    ctx.roundRect(centerX - 46 + tilt, ankleY + 14, 28, 12, 3);
    ctx.roundRect(centerX + 18 + tilt, ankleY + 14, 28, 12, 3);
    ctx.fill();
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    // Thêu họa tiết chim hạc ánh bạc
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - 36 + tilt, ankleY + 20);
    ctx.lineTo(centerX - 30 + tilt, ankleY + 17);
    ctx.moveTo(centerX + 28 + tilt, ankleY + 20);
    ctx.lineTo(centerX + 34 + tilt, ankleY + 17);
    ctx.stroke();
    // Mũi cong vểnh bạc
    ctx.fillStyle = '#E2E8F0';
    ctx.beginPath();
    ctx.arc(centerX - 46 + tilt, ankleY + 15, 3, 0, Math.PI * 2);
    ctx.arc(centerX + 46 + tilt, ankleY + 15, 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (config.footwearId === 'giay_tay_oxford') {
    // Giày da Oxford đen bóng phong cách trí thức
    ctx.fillStyle = '#18181B';
    ctx.beginPath();
    ctx.roundRect(centerX - 48 + tilt, ankleY + 12, 30, 15, 4);
    ctx.roundRect(centerX + 18 + tilt, ankleY + 12, 30, 15, 4);
    ctx.fill();
    ctx.stroke();
    // Vệt bóng da cao cấp
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillRect(centerX - 42 + tilt, ankleY + 14, 14, 3);
    ctx.fillRect(centerX + 24 + tilt, ankleY + 14, 14, 3);
  } else if (config.footwearId === 'combat_boots') {
    // Modern Combat Boots
    ctx.fillStyle = '#18181B';
    ctx.beginPath();
    ctx.roundRect(centerX - 48 + tilt, ankleY + 6, 30, 22, 4);
    ctx.roundRect(centerX + 18 + tilt, ankleY + 6, 30, 22, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#3F3F46';
    ctx.fillRect(centerX - 48 + tilt, ankleY + 24, 30, 5);
    ctx.fillRect(centerX + 18 + tilt, ankleY + 24, 30, 5);
  } else if (config.footwearId === 'satin_heels') {
    // Satin heels
    ctx.fillStyle = '#D32F2F';
    ctx.beginPath();
    ctx.moveTo(centerX - 44 + tilt, ankleY + 14);
    ctx.lineTo(centerX - 18 + tilt, ankleY + 24);
    ctx.lineTo(centerX - 46 + tilt, ankleY + 24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + 44 + tilt, ankleY + 14);
    ctx.lineTo(centerX + 18 + tilt, ankleY + 24);
    ctx.lineTo(centerX + 46 + tilt, ankleY + 24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
    // Ballet embroidered (Hài thêu hoa)
    ctx.fillStyle = '#F5ECE1';
    ctx.beginPath();
    ctx.roundRect(centerX - 44 + tilt, ankleY + 16, 26, 9, 4);
    ctx.roundRect(centerX + 18 + tilt, ankleY + 16, 26, 9, 4);
    ctx.fill();
    ctx.stroke();

    // Tiny red floral motif
    ctx.fillStyle = '#D32F2F';
    ctx.fillRect(centerX - 33 + tilt, ankleY + 19, 4, 3);
    ctx.fillRect(centerX + 29 + tilt, ankleY + 19, 4, 3);
  }
  ctx.restore();
}

// ==================== 3. BODY FOUNDATION & GARMENT FLAPS ====================

function drawNeckAndBodyFoundation(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    headY: number;
    neckY: number;
    shoulderY: number;
    bustY: number;
    is3Q: boolean;
    tilt: number;
    isMale: boolean;
    isSketch: boolean;
  }
) {
  const { centerX, headY, neckY, shoulderY, tilt, isMale, isSketch } = opts;

  ctx.save();
  const skinTone = isSketch ? '#F7E7D9' : '#F6DFCE';
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = isSketch ? '#5D4636' : 'rgba(74, 59, 50, 0.4)';
  ctx.lineWidth = 1;

  // Neck base
  ctx.beginPath();
  const neckWidth = isMale ? 11 : 8.5;
  ctx.moveTo(centerX - neckWidth + tilt, neckY);
  ctx.lineTo(centerX - neckWidth * 0.9 + tilt, headY + 22);
  ctx.lineTo(centerX + neckWidth * 0.9 + tilt, headY + 22);
  ctx.lineTo(centerX + neckWidth + tilt, neckY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Clavicle & Collarbone lines (Xương quai xanh thanh thoát)
  ctx.strokeStyle = isSketch ? 'rgba(93, 70, 54, 0.35)' : 'rgba(168, 115, 80, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX - 24 + tilt, shoulderY + 4);
  ctx.quadraticCurveTo(centerX - 8 + tilt, neckY + 12, centerX + tilt, neckY + 15);
  ctx.quadraticCurveTo(centerX + 8 + tilt, neckY + 12, centerX + 24 + tilt, shoulderY + 4);
  ctx.stroke();

  ctx.restore();
}

function drawBackGarment(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    waistY: number;
    kneeY: number;
    ankleY: number;
    config: OutfitConfig;
    colHex: string;
    is3Q: boolean;
    tilt: number;
    wave: number;
    isMale: boolean;
    isSketch: boolean;
  }
) {
  const { centerX, waistY, kneeY, ankleY, colHex, tilt, wave, isMale, isSketch } = opts;
  const backWave = wave * 1.25;

  ctx.save();
  ctx.fillStyle = isSketch ? shadeColor(colHex, -14) : shadeColor(colHex, -22);
  ctx.strokeStyle = isSketch ? '#3D2F28' : shadeColor(colHex, -35);
  ctx.lineWidth = isSketch ? 1.3 : 1.2;

  const flapWidth = isMale ? 64 : 56;
  ctx.beginPath();
  ctx.moveTo(centerX - (isMale ? 30 : 25) + tilt, waistY + 10);
  ctx.quadraticCurveTo(centerX - (flapWidth - 4) + tilt, kneeY - 30, centerX - flapWidth + backWave, ankleY - 8);
  ctx.quadraticCurveTo(centerX + backWave, ankleY + 8, centerX + flapWidth + backWave, ankleY - 8);
  ctx.quadraticCurveTo(centerX + (flapWidth - 4) + tilt, kneeY - 30, centerX + (isMale ? 30 : 25) + tilt, waistY + 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawFrontGarment(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    neckY: number;
    shoulderY: number;
    bustY: number;
    waistY: number;
    hipY: number;
    kneeY: number;
    ankleY: number;
    config: OutfitConfig;
    colHex: string;
    is3Q: boolean;
    tilt: number;
    wave: number;
    fab: { shine: number };
    isMale: boolean;
    isSketch: boolean;
  }
) {
  const {
    centerX,
    neckY,
    shoulderY,
    bustY,
    waistY,
    hipY,
    kneeY,
    ankleY,
    config,
    colHex,
    tilt,
    wave,
    fab,
    isMale,
    isSketch,
  } = opts;

  ctx.save();

  // Subtle couture shader
  if (isSketch) {
    ctx.fillStyle = colHex;
  } else {
    const grad = ctx.createLinearGradient(centerX - 40, shoulderY, centerX + 40, ankleY);
    grad.addColorStop(0, shadeColor(colHex, 16));
    grad.addColorStop(0.2, shadeColor(colHex, 8));
    grad.addColorStop(0.5, colHex);
    grad.addColorStop(0.85, colHex);
    grad.addColorStop(1, shadeColor(colHex, -16));
    ctx.fillStyle = grad;
  }

  const shoulderSpan = isMale ? 46 : 38;
  const waistSpan = isMale ? 30 : 23;
  const hemSpan = isMale ? 54 : 48;

  // Front Flap Path
  ctx.beginPath();
  ctx.moveTo(centerX - shoulderSpan + tilt, shoulderY);
  ctx.quadraticCurveTo(centerX - (waistSpan + 8) + tilt, bustY, centerX - waistSpan + tilt, waistY);
  ctx.quadraticCurveTo(centerX - (waistSpan + 14) + tilt, hipY + 30, centerX - (hemSpan - 4) + wave * 0.7, kneeY);
  ctx.quadraticCurveTo(centerX - hemSpan + wave * 0.9, kneeY + 70, centerX - hemSpan + wave, ankleY);
  ctx.quadraticCurveTo(centerX + wave * 0.5, ankleY + 8, centerX + hemSpan + wave, ankleY);
  ctx.quadraticCurveTo(centerX + hemSpan + wave * 0.9, kneeY + 70, centerX + (hemSpan - 4) + wave * 0.7, kneeY);
  ctx.quadraticCurveTo(centerX + (waistSpan + 14) + tilt, hipY + 30, centerX + waistSpan + tilt, waistY);
  ctx.quadraticCurveTo(centerX + (waistSpan + 8) + tilt, bustY, centerX + shoulderSpan + tilt, shoulderY);
  ctx.lineTo(centerX + 14 + tilt, neckY);
  ctx.quadraticCurveTo(centerX + tilt, neckY + 4, centerX - 14 + tilt, neckY);
  ctx.closePath();
  ctx.fill();

  // Contour Stroke
  ctx.strokeStyle = isSketch ? '#3A2E28' : shadeColor(colHex, -35);
  ctx.lineWidth = isSketch ? 1.4 : 1.2;
  ctx.stroke();

  // SPECIAL GARMENT SILHOUETTES:
  // 1. Áo Nhật Bình: Đường xẻ giữa hai vạt đối khâm song song & hoa văn viền gấu
  if (config.garmentId === 'nhat_binh') {
    // Đường xẻ chính giữa hai vạt áo đối khâm
    ctx.strokeStyle = isSketch ? '#3A2E28' : '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX + tilt, neckY + 40);
    ctx.lineTo(centerX + wave * 0.4, ankleY);
    ctx.stroke();

    // Dải viền ngũ sắc chạy dọc gấu áo triều Nguyễn
    const colors = ['#D32F2F', '#D4AF37', '#0F4C81', '#F5F1E9', '#2B7A78'];
    colors.forEach((c, idx) => {
      ctx.strokeStyle = c;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(centerX - hemSpan + wave + idx * 2, ankleY - 6 + idx * 1.5);
      ctx.lineTo(centerX + hemSpan + wave - idx * 2, ankleY - 6 + idx * 1.5);
      ctx.stroke();
    });
  }

  // 2. Áo Tấc & Áo Ngũ Thân: Vạt con ngũ thân cài sang nách phải (5 thân áo)
  if (config.garmentId === 'ao_tac' || config.garmentId === 'ngu_than') {
    // Nẹp áo uốn lượn từ chân cổ qua ngực sang nách phải
    ctx.strokeStyle = isSketch ? 'rgba(74, 59, 45, 0.4)' : shadeColor(colHex, -28);
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(centerX + 6 + tilt, neckY + 4);
    ctx.quadraticCurveTo(centerX + 18 + tilt, bustY - 10, centerX + (isMale ? 28 : 22) + tilt, bustY + 15);
    ctx.lineTo(centerX + (isMale ? 24 : 18) + tilt, waistY);
    ctx.stroke();

    // 5 Khuy Cài Ngũ Thường (Khuy vàng đúc)
    const buttonPositions = [
      { x: centerX + 6 + tilt, y: neckY - 6 }, // Khuy cổ
      { x: centerX + 11 + tilt, y: neckY + 12 }, // Khuy xương quai xanh
      { x: centerX + 18 + tilt, y: bustY - 8 }, // Khuy nách
      { x: centerX + 22 + tilt, y: bustY + 15 }, // Khuy sườn 1
      { x: centerX + 20 + tilt, y: waistY - 5 }, // Khuy sườn 2
    ];

    buttonPositions.forEach((btn, idx) => {
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.arc(btn.x, btn.y, idx === 0 ? 2.5 : 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8C6B1F';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });
  }

  // 3. Áo Tứ Thân: Yếm đào lộ ở cổ V & thắt lưng ngũ sắc
  if (config.garmentId === 'tu_than') {
    // Yếm đào đỏ thắm/hồng sen bên trong
    ctx.fillStyle = '#C8102E';
    ctx.beginPath();
    ctx.moveTo(centerX - 16 + tilt, neckY + 6);
    ctx.lineTo(centerX + 16 + tilt, neckY + 6);
    ctx.lineTo(centerX + tilt, bustY + 6);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#8B0000';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Viền cổ yếm
    ctx.strokeStyle = '#FAF7F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX + tilt, neckY + 6, 12, 0, Math.PI);
    ctx.stroke();

    // Dải thắt lưng ngũ sắc mềm mại trước eo
    ctx.fillStyle = '#D4AF37'; // Thắt lưng vàng
    ctx.fillRect(centerX - 24 + tilt, waistY - 2, 48, 8);
    // Dải lụa đào & lụa xanh rủ xuống
    ctx.fillStyle = '#C8102E';
    ctx.fillRect(centerX - 10 + tilt, waistY + 6, 9, 52);
    ctx.fillStyle = '#0F4C81';
    ctx.fillRect(centerX + 1 + tilt, waistY + 6, 9, 46);
  }

  // Specular sheen for rich fabrics
  if (!isSketch && fab.shine > 0.3) {
    ctx.beginPath();
    ctx.moveTo(centerX - 8 + tilt, bustY - 10);
    ctx.quadraticCurveTo(centerX - 4 + tilt, hipY, centerX - 12 + wave * 0.5, ankleY);
    ctx.lineTo(centerX + 6 + wave * 0.5, ankleY);
    ctx.quadraticCurveTo(centerX + 8 + tilt, hipY, centerX + 4 + tilt, bustY - 10);
    ctx.fillStyle = `rgba(255, 255, 255, ${fab.shine * 0.32})`;
    ctx.fill();
  }

  ctx.restore();
}

// ==================== 4. SLEEVES, HANDS, AND COLLARS ====================

function drawSleevesAndHands(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    shoulderY: number;
    bustY: number;
    waistY: number;
    config: OutfitConfig;
    colHex: string;
    is3Q: boolean;
    tilt: number;
    isMale: boolean;
    isSketch: boolean;
    wave: number;
  }
) {
  const { centerX, shoulderY, bustY, waistY, config, colHex, tilt, isMale, isSketch } = opts;
  const isAoTac = config.garmentId === 'ao_tac';
  const isNhatBinh = config.garmentId === 'nhat_binh';
  const shoulderSpan = isMale ? 46 : 38;

  ctx.save();
  ctx.fillStyle = shadeColor(colHex, 6);
  ctx.strokeStyle = isSketch ? '#3A2E28' : shadeColor(colHex, -35);
  ctx.lineWidth = isSketch ? 1.3 : 1.2;

  // LEFT SLEEVE
  ctx.beginPath();
  ctx.moveTo(centerX - shoulderSpan + tilt, shoulderY);
  if (isAoTac) {
    // Tay thụng áo tấc rộng 30-40cm buông rủ tha thướt
    ctx.quadraticCurveTo(centerX - 85 + tilt, bustY + 20, centerX - 76 + tilt, waistY + 52);
    ctx.lineTo(centerX - 36 + tilt, waistY + 40);
  } else if (isNhatBinh) {
    // Tay áo Nhật Bình thụng uy nghi
    ctx.quadraticCurveTo(centerX - 78 + tilt, bustY + 15, centerX - 70 + tilt, waistY + 45);
    ctx.lineTo(centerX - 35 + tilt, waistY + 36);
  } else {
    // Tay chẽn thon gọn ôm cánh tay
    ctx.quadraticCurveTo(centerX - 56 + tilt, bustY, centerX - 44 + tilt, waistY + 25);
    ctx.lineTo(centerX - 34 + tilt, waistY + 25);
  }
  ctx.quadraticCurveTo(centerX - 42 + tilt, bustY, centerX - 33 + tilt, bustY - 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // RIGHT SLEEVE
  ctx.beginPath();
  ctx.moveTo(centerX + shoulderSpan + tilt, shoulderY);
  if (isAoTac) {
    ctx.quadraticCurveTo(centerX + 85 + tilt, bustY + 20, centerX + 76 + tilt, waistY + 52);
    ctx.lineTo(centerX + 36 + tilt, waistY + 40);
  } else if (isNhatBinh) {
    ctx.quadraticCurveTo(centerX + 78 + tilt, bustY + 15, centerX + 70 + tilt, waistY + 45);
    ctx.lineTo(centerX + 35 + tilt, waistY + 36);
  } else {
    ctx.quadraticCurveTo(centerX + 56 + tilt, bustY, centerX + 44 + tilt, waistY + 25);
    ctx.lineTo(centerX + 34 + tilt, waistY + 25);
  }
  ctx.quadraticCurveTo(centerX + 42 + tilt, bustY, centerX + 33 + tilt, bustY - 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // NHẬT BÌNH SPECIAL: Cửa tay áo ngũ sắc hoàng cung (Lục, Vàng, Xanh, Trắng, Đỏ)
  if (isNhatBinh) {
    const cuffColors = ['#2B7A78', '#D4AF37', '#0F4C81', '#FAF7F0', '#C8102E'];
    cuffColors.forEach((cc, i) => {
      ctx.fillStyle = cc;
      ctx.fillRect(centerX - 72 + tilt + i * 7, waistY + 44, 7, 5);
      ctx.fillRect(centerX + 38 + tilt + i * 7, waistY + 44, 7, 5);
    });
  }

  // HANDS (Bàn tay thon thả búp măng / Chắp tay tôn kính)
  ctx.fillStyle = isSketch ? '#F7E7D9' : '#F6DFCE';
  ctx.strokeStyle = isSketch ? '#5D4636' : 'rgba(74, 59, 50, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(centerX - 38 + tilt, waistY + 32, isMale ? 5.5 : 4.5, 0, Math.PI * 2);
  ctx.arc(centerX + 38 + tilt, waistY + 32, isMale ? 5.5 : 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawGarmentCollar(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    neckY: number;
    shoulderY: number;
    bustY: number;
    config: OutfitConfig;
    colHex: string;
    is3Q: boolean;
    tilt: number;
    isMale: boolean;
    isSketch: boolean;
  }
) {
  const { centerX, neckY, config, colHex, tilt, isMale, isSketch } = opts;

  ctx.save();
  ctx.fillStyle = shadeColor(colHex, 15);
  ctx.strokeStyle = isSketch ? '#3A2E28' : shadeColor(colHex, -40);
  ctx.lineWidth = 1.2;

  if (config.garmentId === 'nhat_binh') {
    // 1. ÁO NHẬT BÌNH: VẠT CỔ CHỮ NHẬT TO BẢN HOÀNG GIA (ĐỐI KHÂM)
    // Vạt cổ chạy từ sau gáy qua hai bên vai, buông song song trước ngực
    ctx.fillStyle = '#D4AF37'; // Nền cổ gấm vàng kim
    ctx.beginPath();
    ctx.moveTo(centerX - 22 + tilt, neckY - 10);
    ctx.lineTo(centerX + 22 + tilt, neckY - 10);
    ctx.lineTo(centerX + 18 + tilt, neckY + 42);
    ctx.lineTo(centerX - 18 + tilt, neckY + 42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dải ngũ sắc hoàng cung viền quanh vạt cổ
    const colors = ['#C8102E', '#0F4C81', '#2B7A78', '#FAF7F0'];
    colors.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(centerX - 16 + tilt + i * 8, neckY + 37, 7.5, 4);
    });

    // Khuy ngọc đính nối hai mép cổ chữ nhật ở ngực
    ctx.fillStyle = '#FAF7F0';
    ctx.beginPath();
    ctx.arc(centerX + tilt, neckY + 40, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#D4AF37';
    ctx.stroke();
  } else if (config.garmentId === 'ao_tac' || config.garmentId === 'ngu_than') {
    // 2. ÁO TẤC & ÁO NGŨ THÂN: CỔ LẬP LĨNH (CỔ ĐỨNG CAO 3CM)
    // Cổ đứng ngay ngắn, khép kín, chuẩn điển chế thời Nguyễn
    ctx.beginPath();
    const collarWidth = isMale ? 32 : 28;
    ctx.roundRect(centerX - collarWidth / 2 + tilt, neckY - 16, collarWidth, 16, 2);
    ctx.fill();
    ctx.stroke();

    // Viền trắng tinh khôi ở mép trên cổ áo (vải trắng lót cổ sạch sẽ truyền thống)
    ctx.strokeStyle = '#FAF7F0';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(centerX - collarWidth / 2 + tilt + 1, neckY - 15);
    ctx.lineTo(centerX + collarWidth / 2 + tilt - 1, neckY - 15);
    ctx.stroke();

    // Khuy vàng cài cổ
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(centerX + 6 + tilt, neckY - 8, 2.2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // 3. ÁO TỨ THÂN: CỔ V MỞ ĐỂ LỘ YẾM ĐÀO
    // Đường viền nẹp cổ chữ V mềm mại
    ctx.beginPath();
    ctx.moveTo(centerX - 16 + tilt, neckY);
    ctx.lineTo(centerX + tilt, neckY + 24);
    ctx.lineTo(centerX + 16 + tilt, neckY);
    ctx.stroke();
  }

  ctx.restore();
}

// ==================== 5. REDESIGNED JEWELRY ENGINE ====================
// Đảm bảo:
// 1. Tuyệt đối không đè bẹt lên cổ áo hay mặt
// 2. Tự động thích ứng theo giới tính: Nam đeo thẻ bài/bội ngọc/tràng hạt chuẩn Nho gia; Nữ đeo kiềng/ngọc trai duyên dáng
// 3. Phối màu tương phản với màu áo, có bóng đổ 3D và ánh kim kim hoàn
function drawJewelry(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    neckY: number;
    bustY: number;
    config: OutfitConfig;
    tick: number;
    is3Q: boolean;
    tilt: number;
    colHex: string;
    isMale: boolean;
    placement: 'collar_base' | 'chest_drape';
    isSketch: boolean;
  }
) {
  const { centerX, neckY, bustY, config, tick, is3Q, tilt, colHex, isMale, placement, isSketch } = opts;
  const isYellowGarment = config.colorId === 'gold_hoang_yen' || config.colorId === 'pastel_vang_mo';
  const isRedGarment = config.colorId === 'red_cinnabar';
  const isNhatBinh = config.garmentId === 'nhat_binh';

  ctx.save();

  // Drop shadow onto shirt fabric
  if (!isSketch) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 2;
  }

  // Vertical placement anchor
  // collar_base sits neatly right under the collar base
  // chest_drape hangs longer onto the upper chest
  const anchorY =
    placement === 'collar_base'
      ? isNhatBinh
        ? neckY + 28
        : neckY + 12
      : isNhatBinh
      ? bustY - 6
      : bustY - 14;

  // -------------------------------------------------------------
  // MALE ADAPTATION: NAM PHỤC ĐEO THẺ BÀI / BỘI NGỌC / TRÀNG HẠT
  // -------------------------------------------------------------
  if (isMale) {
    if (config.jewelryId === 'gold_kieng' || config.jewelryId === 'silver_kieng') {
      // Nam giới: Bội Ngọc / Thẻ Bài Vàng Cung Đình cài bên ngực phải theo khuy áo
      const isGold = config.jewelryId === 'gold_kieng';
      const plaqueX = centerX + 18 + tilt;
      const plaqueY = bustY - 6;

      // Silk cord from collar button to plaque
      ctx.strokeStyle = '#C8102E';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX + 6 + tilt, neckY - 6);
      ctx.quadraticCurveTo(plaqueX - 2, plaqueY - 12, plaqueX, plaqueY - 4);
      ctx.stroke();

      // Golden or Silver Jade Plaque
      ctx.fillStyle = isGold ? '#D4AF37' : '#E2E8F0';
      ctx.strokeStyle = isGold ? '#8C6B1F' : '#64748B';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(plaqueX - 7, plaqueY, 14, 22, 3);
      ctx.fill();
      ctx.stroke();

      // Chinese character / seal carving
      ctx.fillStyle = isGold ? '#8C6B1F' : '#334155';
      ctx.font = 'bold 7px serif';
      ctx.textAlign = 'center';
      ctx.fillText('吉', plaqueX, plaqueY + 14);

      // Red silk tassel hanging down
      ctx.strokeStyle = '#C8102E';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(plaqueX, plaqueY + 22);
      ctx.lineTo(plaqueX, plaqueY + 38);
      ctx.stroke();
      return ctx.restore();
    } else if (config.jewelryId === 'pearl_necklace') {
      // Nam giới: Chuỗi Tràng Hạt Trầm Hương (Agarwood Prayer Beads)
      const beadsX = centerX + tilt;
      const radiusX = is3Q ? 18 : 22;
      const radiusY = placement === 'collar_base' ? 24 : 34;

      for (let angle = 0.15; angle <= Math.PI - 0.15; angle += 0.22) {
        const bx = beadsX + Math.cos(angle) * radiusX;
        const by = neckY + 8 + Math.sin(angle) * radiusY;

        ctx.fillStyle = '#5C381E'; // Trầm hương nâu hổ phách
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#38200E';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      return ctx.restore();
    } else if (config.jewelryId === 'jade_pendant') {
      // Nam giới: Thẻ Bài Ngọc Bích Triều Nguyễn
      const plaqueX = centerX + 18 + tilt;
      const plaqueY = bustY - 6;

      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX + 6 + tilt, neckY - 6);
      ctx.lineTo(plaqueX, plaqueY);
      ctx.stroke();

      ctx.fillStyle = '#059669'; // Ngọc bích hoàng gia
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(plaqueX - 7, plaqueY, 14, 20, 2);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = '#C8102E';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(plaqueX, plaqueY + 20);
      ctx.lineTo(plaqueX, plaqueY + 34);
      ctx.stroke();
      return ctx.restore();
    }
  }

  // -------------------------------------------------------------
  // FEMALE JEWELRY: KIỀNG VÀNG, KIỀNG BẠC, NGỌC TRAI, MẶT NGỌC BÍCH
  // -------------------------------------------------------------
  if (config.jewelryId === 'gold_kieng' || config.jewelryId === 'silver_kieng') {
    const isGold = config.jewelryId === 'gold_kieng';

    // Ellipse dimensions matching perspective angle
    const rx = is3Q ? 17 : 20;
    const ry = placement === 'collar_base' ? 10 : 16;
    const jewCenterX = centerX + tilt;

    // Metallic multi-stop gradient for realistic shine
    const grad = ctx.createLinearGradient(
      jewCenterX - rx,
      anchorY,
      jewCenterX + rx,
      anchorY + ry
    );

    if (isGold) {
      if (isYellowGarment) {
        // High-contrast gold with rose-gold & ruby borders on yellow shirts
        grad.addColorStop(0, '#FFF5C2');
        grad.addColorStop(0.3, '#E6B83A');
        grad.addColorStop(0.7, '#A67C1A');
        grad.addColorStop(1, '#593E07');
      } else {
        grad.addColorStop(0, '#FFF2B2');
        grad.addColorStop(0.3, '#F59E0B');
        grad.addColorStop(0.6, '#D4AF37');
        grad.addColorStop(1, '#8C6B1F');
      }
    } else {
      // Sterling Silver
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, '#E2E8F0');
      grad.addColorStop(0.6, '#94A3B8');
      grad.addColorStop(1, '#475569');
    }

    ctx.strokeStyle = grad;
    ctx.lineWidth = 4.2;
    ctx.lineCap = 'round';

    // Graceful horseshoe curve resting on chest
    ctx.beginPath();
    ctx.ellipse(jewCenterX, anchorY, rx, ry, is3Q ? 0.08 : 0, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    // Metallic contour rim
    ctx.strokeStyle = isGold ? '#6B4D0D' : '#334155';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Central Lotus Jewel Accent or Engraving
    ctx.fillStyle = isGold ? (isRedGarment ? '#FFFFFF' : '#D32F2F') : '#0F4C81';
    ctx.beginPath();
    ctx.arc(jewCenterX, anchorY + ry, 2.4, 0, Math.PI * 2);
    ctx.fill();

    // Shimmer sparkle reflection
    const sparkleX = jewCenterX + Math.sin(tick * 0.05) * (rx * 0.5);
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(sparkleX, anchorY + ry * 0.75, 1.8, 0, Math.PI * 2);
    ctx.fill();
  } else if (config.jewelryId === 'pearl_necklace') {
    // CHUỖI VÒNG NGỌC TRAI: Catenary curve hanging down naturally
    const pearlCenterX = centerX + tilt;
    const rx = is3Q ? 18 : 22;
    const ry = placement === 'collar_base' ? 14 : 26;

    const pearlCount = 14;
    for (let i = 0; i <= pearlCount; i++) {
      const angle = 0.12 * Math.PI + (i / pearlCount) * (0.76 * Math.PI);
      const px = pearlCenterX + Math.cos(angle) * rx;
      const py = anchorY - 4 + Math.sin(angle) * ry;

      // Lustrous pearl sphere with radial highlight
      const pGrad = ctx.createRadialGradient(px - 0.8, py - 0.8, 0.5, px, py, 2.6);
      pGrad.addColorStop(0, '#FFFFFF');
      pGrad.addColorStop(0.6, '#F8FAFC');
      pGrad.addColorStop(1, '#CBD5E1');
      ctx.fillStyle = pGrad;

      ctx.beginPath();
      ctx.arc(px, py, 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Subtle pearl outline
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.35)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  } else if (config.jewelryId === 'jade_pendant') {
    // MẶT NGỌC BÍCH KHẮC HOA / KHÁNH NGỌC HOÀNG GIA
    const pendantX = centerX + tilt;
    const pendantY = anchorY + 12;

    // Red silk thread from collar
    ctx.strokeStyle = '#C8102E';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(pendantX - 8, neckY + 4);
    ctx.quadraticCurveTo(pendantX, pendantY - 8, pendantX, pendantY);
    ctx.moveTo(pendantX + 8, neckY + 4);
    ctx.quadraticCurveTo(pendantX, pendantY - 8, pendantX, pendantY);
    ctx.stroke();

    // Golden clasp
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(pendantX - 3, pendantY - 4, 6, 4);

    // Translucent Jade Stone
    const jGrad = ctx.createRadialGradient(pendantX - 2, pendantY + 6, 1, pendantX, pendantY + 8, 12);
    jGrad.addColorStop(0, '#6EE7B7');
    jGrad.addColorStop(0.5, '#059669');
    jGrad.addColorStop(1, '#064E3B');
    ctx.fillStyle = jGrad;

    // Rỗng tâm hoa sen hoặc khánh ngọc
    ctx.beginPath();
    ctx.ellipse(pendantX, pendantY + 8, 9, 7.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Core jade highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.beginPath();
    ctx.arc(pendantX - 2, pendantY + 6, 2, 0, Math.PI * 2);
    ctx.fill();

    // Silk tassel hanging below
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pendantX, pendantY + 16);
    ctx.lineTo(pendantX, pendantY + 28);
    ctx.stroke();
  } else if (config.jewelryId === 'the_bai_nga') {
    // Thẻ Bài Hoàng Gia Khảm Vàng Chỉ Dụ
    const tbX = centerX + (isMale ? 18 : 12) + tilt;
    const tbY = anchorY + 8;
    // Silk ribbon cord
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(centerX + 6 + tilt, neckY + 2);
    ctx.lineTo(tbX, tbY);
    ctx.stroke();
    // Ivory / Gold plaque
    ctx.fillStyle = '#FFFDF5';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.roundRect(tbX - 7, tbY, 14, 25, 3);
    ctx.fill();
    ctx.stroke();
    // Royal glyph
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 8px serif';
    ctx.textAlign = 'center';
    ctx.fillText('勅', tbX, tbY + 16);
    // Red tassel
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(tbX, tbY + 25);
    ctx.lineTo(tbX, tbY + 40);
    ctx.stroke();
  } else if (config.jewelryId === 'chuoi_tram_huong_108') {
    // Chuỗi Trầm Hương 108 Hạt
    const beadsX = centerX + tilt;
    const rx = is3Q ? 19 : 23;
    const ry = placement === 'collar_base' ? 18 : 30;
    for (let angle = 0.12 * Math.PI; angle <= 0.88 * Math.PI; angle += 0.18) {
      const bx = beadsX + Math.cos(angle) * rx;
      const by = anchorY + Math.sin(angle) * ry;
      ctx.fillStyle = '#3F2212';
      ctx.beginPath();
      ctx.arc(bx, by, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1F0F07';
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
  } else if (config.jewelryId === 'vong_ngoc_cam_thach') {
    // Vòng Ngọc Cẩm Thạch Phỉ Thúy đeo cổ tay
    const wristX = centerX + 38 + tilt;
    const wristY = bustY + 40;
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3.8;
    ctx.beginPath();
    ctx.ellipse(wristX, wristY, 8.5, 5.5, 0.35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(wristX, wristY - 1, 7.5, 4.5, 0.35, 0, Math.PI * 2);
    ctx.stroke();
  } else if (config.jewelryId === 'hoa_tai_vang_trieu_nguyen') {
    // Hoa Tai Vàng Giọt Ngọc Cung Đình (buông lơi 2 bên vành tai)
    const earY = neckY - 26;
    const leftEarX = centerX - 14 + tilt;
    const rightEarX = centerX + 14 + tilt;

    [leftEarX, rightEarX].forEach((ex) => {
      // Golden stud & hook
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.arc(ex, earY, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(ex, earY);
      ctx.lineTo(ex, earY + 7);
      ctx.stroke();

      // Teardrop emerald / jade gem
      ctx.fillStyle = '#059669';
      ctx.beginPath();
      ctx.ellipse(ex, earY + 9, 2.2, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Highlight
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(ex - 0.5, earY + 8, 0.8, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (config.jewelryId === 'khuyen_tai_bac_hoa_cuc') {
    // Khuyên Tai Bạc Chạm Hoa Cúc Cổ
    const earY = neckY - 26;
    const leftEarX = centerX - 14 + tilt;
    const rightEarX = centerX + 14 + tilt;

    [leftEarX, rightEarX].forEach((ex) => {
      ctx.fillStyle = '#E2E8F0';
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(ex, earY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Flower center dot
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.arc(ex, earY, 1, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  ctx.restore();
}

// ==================== 6. FACE, HAIR, HEADPIECE, AND HANDHELD ====================

function drawFaceAndHair(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    headY: number;
    neckY: number;
    is3Q: boolean;
    tilt: number;
    isMale: boolean;
    avatarUrl?: string | null;
    isSketch: boolean;
  }
) {
  const { centerX, headY, tilt, isMale, avatarUrl, isSketch } = opts;

  ctx.save();
  const skinTone = isSketch ? '#F7E7D9' : '#F6DFCE';
  ctx.fillStyle = skinTone;
  ctx.strokeStyle = isSketch ? '#4A3B32' : 'rgba(74, 59, 50, 0.4)';
  ctx.lineWidth = 1;

  // Face oval
  ctx.beginPath();
  ctx.moveTo(centerX - 13 + tilt, headY);
  ctx.quadraticCurveTo(centerX - 13 + tilt, headY + 20, centerX + tilt, headY + (isMale ? 25 : 23));
  ctx.quadraticCurveTo(centerX + 13 + tilt, headY + 20, centerX + 13 + tilt, headY);
  ctx.quadraticCurveTo(centerX + 13 + tilt, headY - 18, centerX + tilt, headY - 20);
  ctx.quadraticCurveTo(centerX - 13 + tilt, headY - 18, centerX - 13 + tilt, headY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (avatarUrl) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX + tilt, headY + 2, 16, 0, Math.PI * 2);
    ctx.clip();
    const img = new Image();
    img.src = avatarUrl;
    if (img.complete) {
      ctx.drawImage(img, centerX + tilt - 16, headY - 14, 32, 32);
    }
    ctx.restore();
  } else {
    // Editorial Eyes & Lips
    ctx.strokeStyle = '#4A3B32';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(centerX - 8 + tilt, headY + 4);
    ctx.quadraticCurveTo(centerX - 5 + tilt, headY + 2, centerX - 2 + tilt, headY + 4);
    ctx.moveTo(centerX + 2 + tilt, headY + 4);
    ctx.quadraticCurveTo(centerX + 5 + tilt, headY + 2, centerX + 8 + tilt, headY + 4);
    ctx.stroke();

    ctx.fillStyle = isMale ? '#C87D65' : '#D32F2F';
    ctx.beginPath();
    ctx.arc(centerX + tilt, headY + 15, isMale ? 2.2 : 2.6, 0, Math.PI);
    ctx.fill();
  }

  // Hair
  ctx.fillStyle = '#1C1613';
  if (isMale) {
    ctx.beginPath();
    ctx.arc(centerX + tilt, headY - 8, 15, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(centerX + tilt, headY - 8, 16, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + tilt, headY + 12, 11, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawHeadpiece(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    headY: number;
    waistY: number;
    config: OutfitConfig;
    colHex: string;
    is3Q: boolean;
    tilt: number;
    wave: number;
    isMale: boolean;
    isSketch: boolean;
  }
) {
  const { centerX, headY, waistY, config, colHex, tilt, wave, isMale, isSketch } = opts;

  ctx.save();
  ctx.strokeStyle = isSketch ? '#3A2E28' : '#222222';
  ctx.lineWidth = 1.2;

  if (config.headpieceId === 'khan_dong' || (isMale && config.headpieceId === 'none')) {
    // Khăn Đóng Nam Truyền Thống thời Nguyễn (Nếp quấn chữ Nhất)
    ctx.fillStyle = '#1E1E22';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(centerX + tilt, headY - 14, 20, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 16 + tilt, headY - 14);
    ctx.lineTo(centerX + 16 + tilt, headY - 14);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.stroke();
  } else if (config.headpieceId === 'man_lua') {
    // Mấn Lụa Xếp Cung Đình đồng điệu màu áo
    ctx.fillStyle = colHex;
    ctx.beginPath();
    ctx.ellipse(centerX + tilt, headY - 16, 21, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(centerX + tilt, headY - 22, 18, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (config.headpieceId === 'khan_van') {
    // Khăn Vấn Tối Giản
    ctx.fillStyle = '#1E1E1E';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(centerX + tilt, headY - 16, 21, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (config.headpieceId === 'non_quai_thao') {
    // Nón Quai Thao Quan Họ
    ctx.fillStyle = '#E8DFCE';
    ctx.strokeStyle = '#8C6A3E';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(centerX + tilt, headY - 18, 38, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Quai thao lụa đào
    ctx.strokeStyle = '#C8102E';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(centerX - 24 + tilt, headY - 14);
    ctx.quadraticCurveTo(centerX - 35 + tilt, headY + 30, centerX - 18 + tilt, headY + 60);
    ctx.stroke();
  } else if (config.headpieceId === 'non_la_sen') {
    // Nón Lá Sen Xứ Huế
    const hatX = centerX - 66 + tilt + wave * 0.3;
    const hatY = waistY + 45;
    ctx.fillStyle = '#EFE5D2';
    ctx.strokeStyle = '#8C7758';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(hatX, hatY - 34);
    ctx.lineTo(hatX - 36, hatY + 15);
    ctx.quadraticCurveTo(hatX, hatY + 23, hatX + 36, hatY + 15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (config.headpieceId === 'tram_cai_toc_ngoc') {
    // Trâm Cài Tóc Phượng Hoàng Khảm Ngọc
    const pinX = centerX + tilt + 15;
    const pinY = headY - 14;
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(pinX - 18, pinY + 6);
    ctx.lineTo(pinX + 16, pinY - 8);
    ctx.stroke();
    // Phoenix head & ruby gem
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(pinX + 14, pinY - 8, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.arc(pinX + 14, pinY - 8, 2.2, 0, Math.PI * 2);
    ctx.fill();
    // Hanging jade tassel
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pinX + 16, pinY - 4);
    ctx.lineTo(pinX + 18, pinY + 18);
    ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(pinX + 17, pinY + 8, 2, 0, Math.PI * 2);
    ctx.arc(pinX + 18, pinY + 18, 2.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (config.headpieceId === 'khan_dong_hoang_gia') {
    // Khăn Đóng Hoàng Gia Dát Kim Tuyến 9 nếp
    ctx.fillStyle = '#18181B';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(centerX + tilt, headY - 15, 23, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (let p = 1; p <= 4; p++) {
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.ellipse(centerX + tilt, headY - 15 - p * 2.8, 22 - p * 1.4, 10 - p * 1.1, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (config.headpieceId === 'mu_phac_dau') {
    // Mũ Phác Đầu Quan Viên Đại Việt (Thời Lê - Lý - Trần)
    ctx.fillStyle = '#0F172A';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.3;
    // Thân mũ
    ctx.beginPath();
    ctx.ellipse(centerX + tilt, headY - 16, 21, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Chóp mũ vòm cao
    ctx.beginPath();
    ctx.ellipse(centerX + tilt, headY - 26, 14, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Khánh ngọc chính giữa
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(centerX + tilt, headY - 17, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Hai cánh chuồn vươn ngang uy nghiêm
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX - 18 + tilt, headY - 19);
    ctx.quadraticCurveTo(centerX - 42 + tilt, headY - 24, centerX - 58 + tilt, headY - 16);
    ctx.moveTo(centerX + 18 + tilt, headY - 19);
    ctx.quadraticCurveTo(centerX + 42 + tilt, headY - 24, centerX + 58 + tilt, headY - 16);
    ctx.stroke();

    // Viền kim tuyến cánh chuồn
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(centerX - 18 + tilt, headY - 19);
    ctx.quadraticCurveTo(centerX - 42 + tilt, headY - 24, centerX - 58 + tilt, headY - 16);
    ctx.moveTo(centerX + 18 + tilt, headY - 19);
    ctx.quadraticCurveTo(centerX + 42 + tilt, headY - 24, centerX + 58 + tilt, headY - 16);
    ctx.stroke();
  } else if (config.headpieceId === 'vuong_mien_hoang_hau') {
    // Mũ Miện Hoàng Tộc Dát Vàng (Hoàng Hậu / Nữ Quan)
    ctx.fillStyle = '#D4AF37';
    ctx.strokeStyle = '#B45309';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(centerX + tilt, headY - 17, 21, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Cánh phượng hoàng vươn cao
    ctx.beginPath();
    ctx.moveTo(centerX - 14 + tilt, headY - 17);
    ctx.lineTo(centerX - 17 + tilt, headY - 30);
    ctx.lineTo(centerX - 8 + tilt, headY - 23);
    ctx.lineTo(centerX + tilt, headY - 34);
    ctx.lineTo(centerX + 8 + tilt, headY - 23);
    ctx.lineTo(centerX + 17 + tilt, headY - 30);
    ctx.lineTo(centerX + 14 + tilt, headY - 17);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Hạt hồng ngọc đỉnh miện
    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.arc(centerX + tilt, headY - 34, 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Chuỗi ngọc châu rủ trước trán
    ctx.fillStyle = '#FFFFFF';
    for (let i = -10; i <= 10; i += 5) {
      ctx.beginPath();
      ctx.arc(centerX + i + tilt, headY - 9, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawHandheld(
  ctx: CanvasRenderingContext2D,
  opts: {
    centerX: number;
    waistY: number;
    config: OutfitConfig;
    is3Q: boolean;
    tilt: number;
    wave: number;
    isSketch: boolean;
  }
) {
  const { centerX, waistY, config, tilt, isSketch } = opts;

  ctx.save();
  ctx.strokeStyle = isSketch ? '#3A2E28' : '#222222';
  ctx.lineWidth = 1;

  if (config.handheldId === 'silk_fan') {
    // Quạt Lụa Xếp Cầm Tay
    const fanX = centerX + 42 + tilt;
    const fanY = waistY + 30;
    ctx.fillStyle = '#F5E6CC';
    ctx.strokeStyle = '#8C6D4F';
    ctx.beginPath();
    ctx.moveTo(fanX, fanY + 16);
    ctx.arc(fanX, fanY + 16, 29, -Math.PI * 0.75, -Math.PI * 0.25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Nan quạt tre
    ctx.beginPath();
    ctx.moveTo(fanX, fanY + 16);
    ctx.lineTo(fanX - 18, fanY - 4);
    ctx.moveTo(fanX, fanY + 16);
    ctx.lineTo(fanX, fanY - 12);
    ctx.moveTo(fanX, fanY + 16);
    ctx.lineTo(fanX + 18, fanY - 4);
    ctx.stroke();
  } else if (config.handheldId === 'rattan_bag') {
    // Túi Cói Quai Trúc
    const bagX = centerX + 46 + tilt;
    const bagY = waistY + 46;
    ctx.strokeStyle = '#B58342';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(bagX, bagY - 14, 12, Math.PI, 0);
    ctx.stroke();

    ctx.fillStyle = '#D9BA8B';
    ctx.beginPath();
    ctx.roundRect(bagX - 16, bagY - 8, 32, 28, 4);
    ctx.fill();
    ctx.stroke();
  } else if (config.handheldId === 'tote_gam') {
    // Túi Gấm Hoa Cách Tân
    const bagX = centerX + 42 + tilt;
    const bagY = waistY + 44;
    ctx.fillStyle = '#C8102E';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(bagX - 16, bagY - 4, 32, 36, 4);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(bagX, bagY - 4, 11, Math.PI, 0);
    ctx.stroke();

    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(bagX, bagY + 14, 4.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (config.handheldId === 'o_giay_dau') {
    // Ô Giấy Dầu Cổ Trang Vẽ Thủy Mặc
    const umbX = centerX + 56 + tilt;
    const umbY = waistY - 32;
    // Cán ô bằng tre
    ctx.strokeStyle = '#8B5A2B';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX + 36 + tilt, waistY + 28);
    ctx.lineTo(umbX - 8, umbY - 26);
    ctx.stroke();

    // Vòm ô giấy dầu xòe nghiêng
    ctx.save();
    ctx.translate(umbX, umbY);
    ctx.rotate(-0.35);
    const canopyGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 72);
    canopyGrad.addColorStop(0, '#E53E3E');
    canopyGrad.addColorStop(0.85, '#B91C1C');
    canopyGrad.addColorStop(1, '#991B1B');
    ctx.fillStyle = canopyGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 74, 30, 0, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // Nan tre
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.55)';
    ctx.lineWidth = 0.9;
    for (let r = -60; r <= 60; r += 20) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(r, -Math.sqrt(Math.max(0, 1 - (r * r) / (74 * 74))) * 30);
      ctx.stroke();
    }
    // Nụ hoa mai vàng vẽ trên mặt ô
    ctx.fillStyle = '#FDE047';
    ctx.beginPath();
    ctx.arc(22, -15, 3.5, 0, Math.PI * 2);
    ctx.arc(-26, -18, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else if (config.handheldId === 'quat_long_chim') {
    // Quạt Lông Công Hoàng Cung
    const fanX = centerX + 44 + tilt;
    const fanY = waistY + 32;
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(fanX, fanY + 26);
    ctx.lineTo(fanX, fanY);
    ctx.stroke();

    const angles = [-0.55, -0.28, 0, 0.28, 0.55];
    angles.forEach((ang) => {
      ctx.save();
      ctx.translate(fanX, fanY);
      ctx.rotate(ang);
      ctx.fillStyle = '#065F46';
      ctx.beginPath();
      ctx.ellipse(0, -20, 6.5, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.arc(0, -25, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#D97706';
      ctx.beginPath();
      ctx.arc(0, -25, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(fanX, fanY + 26);
    ctx.lineTo(fanX + 2, fanY + 42);
    ctx.stroke();
  } else if (config.handheldId === 'hoa_sen_cam_tay') {
    // Búp Hoa Sen Hồng Tươi Cầm Tay
    const lotusX = centerX + 42 + tilt;
    const lotusY = waistY + 26;
    // Cuống hoa sen xanh mướt
    ctx.strokeStyle = '#15803D';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(lotusX - 3, lotusY + 28);
    ctx.quadraticCurveTo(lotusX, lotusY + 12, lotusX, lotusY);
    ctx.stroke();
    // Cánh sen ngoài
    ctx.fillStyle = '#F472B6';
    ctx.beginPath();
    ctx.ellipse(lotusX - 4, lotusY - 9, 5.5, 13, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(lotusX + 4, lotusY - 9, 5.5, 13, 0.25, 0, Math.PI * 2);
    ctx.fill();
    // Búp sen giữa
    ctx.fillStyle = '#FDA4AF';
    ctx.beginPath();
    ctx.ellipse(lotusX, lotusY - 11, 4.5, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#22C55E';
    ctx.beginPath();
    ctx.arc(lotusX, lotusY - 1, 4.5, 0, Math.PI);
    ctx.fill();
  } else if (config.handheldId === 'sach_co_thu_phap') {
    // Sách Cổ Nho Gia Khâu Chỉ & Bút Lông
    const bkX = centerX + 40 + tilt;
    const bkY = waistY + 34;
    ctx.fillStyle = '#1E3A8A';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(bkX - 14, bkY - 10, 28, 36, 2);
    ctx.fill();
    ctx.stroke();
    // Chỉ khâu trắng
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(bkX - 9, bkY - 10);
    ctx.lineTo(bkX - 9, bkY + 26);
    ctx.stroke();
    // Nhãn sách chữ Hán
    ctx.fillStyle = '#FDF6E2';
    ctx.fillRect(bkX - 4, bkY - 4, 8, 18);
  } else if (config.handheldId === 'retro_sunglasses') {
    // Kính Râm Thời Trang
    const sgX = centerX + 40 + tilt;
    const sgY = waistY + 28;
    ctx.fillStyle = '#141416';
    ctx.fillRect(sgX - 10, sgY, 20, 8);
  } else if (config.handheldId === 'canh_hoa_mai_tet') {
    // Cành Hoa Mai Vàng Du Xuân Cầm Tay
    const branchX = centerX + 40 + tilt;
    const branchY = waistY + 32;

    // Cành gỗ nâu uốn lượn
    ctx.strokeStyle = '#78350F';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(branchX - 2, branchY + 28);
    ctx.quadraticCurveTo(branchX + 8, branchY + 6, branchX + 16, branchY - 26);
    ctx.stroke();

    // Nhánh phụ nhỏ
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(branchX + 4, branchY + 10);
    ctx.quadraticCurveTo(branchX - 6, branchY, branchX - 8, branchY - 14);
    ctx.stroke();

    // Các bông hoa mai vàng 5 cánh & nụ đỏ
    const flowers = [
      { x: branchX + 16, y: branchY - 26, size: 5.5 },
      { x: branchX + 10, y: branchY - 12, size: 4.5 },
      { x: branchX - 8, y: branchY - 14, size: 5 },
      { x: branchX - 4, y: branchY - 2, size: 4 },
      { x: branchX + 5, y: branchY + 18, size: 3.5 },
    ];

    flowers.forEach((fl) => {
      // 5 cánh mai vàng óng
      ctx.fillStyle = '#FBBF24';
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * Math.PI * 2) / 5;
        const petX = fl.x + Math.cos(ang) * fl.size;
        const petY = fl.y + Math.sin(ang) * fl.size;
        ctx.arc(petX, petY, fl.size * 0.6, 0, Math.PI * 2);
      }
      ctx.fill();

      // Tâm hoa mai cam đỏ
      ctx.fillStyle = '#EA580C';
      ctx.beginPath();
      ctx.arc(fl.x, fl.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (config.handheldId === 'kiem_le_phuc_trieu_dinh') {
    // Kiếm Lễ Triều Đình Vỏ Khảm Trai
    const swordX = centerX + 42 + tilt;
    const swordY = waistY + 18;

    // Thân vỏ kiếm gỗ đen bóng bọc xà cừ
    ctx.strokeStyle = '#1E1E24';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(swordX - 10, swordY - 12);
    ctx.lineTo(swordX + 22, swordY + 54);
    ctx.stroke();

    // Khảm xà cừ hoa văn trắng bạc
    ctx.strokeStyle = '#E0E7FF';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(swordX - 4, swordY + 2);
    ctx.lineTo(swordX + 14, swordY + 38);
    ctx.stroke();

    // Chuôi kiếm vàng & đốc kiếm chạm rồng
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.ellipse(swordX - 10, swordY - 12, 7, 3, -0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#D4AF37';
    ctx.beginPath();
    ctx.moveTo(swordX - 10, swordY - 12);
    ctx.lineTo(swordX - 18, swordY - 26);
    ctx.stroke();

    // Dải lụa đỏ trang trọng buông rủ
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(swordX - 18, swordY - 26);
    ctx.quadraticCurveTo(swordX - 22, swordY, swordX - 14, swordY + 24);
    ctx.stroke();
  }

  ctx.restore();
}

// ==================== 7. SILK SHIMMER, PARTICLES & LIGHTING ====================

function drawSilkLustre(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  bustY: number,
  waistY: number,
  ankleY: number,
  colHex: string,
  shine: number,
  wave: number,
  tick: number
) {
  ctx.save();
  const shimmerShift = Math.sin(tick * 0.04) * 14;
  const lustreGrad = ctx.createLinearGradient(
    centerX - 24 + shimmerShift,
    bustY,
    centerX + 24 + shimmerShift,
    ankleY
  );
  lustreGrad.addColorStop(0, 'transparent');
  lustreGrad.addColorStop(0.48, `rgba(255, 255, 255, ${0.06 * (shine / 100)})`);
  lustreGrad.addColorStop(0.52, `rgba(255, 255, 255, ${0.22 * (shine / 100)})`);
  lustreGrad.addColorStop(0.56, `rgba(255, 255, 255, ${0.06 * (shine / 100)})`);
  lustreGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = lustreGrad;
  ctx.fillRect(centerX - 55, bustY, 110, ankleY - bustY);
  ctx.restore();
}

// Particle System State
const STATIC_PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  seedX: (i * 15.6) % 500,
  seedY: (i * 21.8) % 700,
  speedY: 0.8 + ((i % 5) * 0.25),
  speedX: 0.4 + ((i % 4) * 0.2),
  size: 6 + (i % 6),
  phase: (i * 0.35),
  rotSpeed: 0.02 + ((i % 3) * 0.015),
}));

function drawVisualParticles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  effect: VisualEffectId,
  tick: number,
  wave: number
) {
  ctx.save();

  STATIC_PARTICLES.forEach((p, idx) => {
    // Continuous wrapping coordinates
    const curY = (p.seedY + tick * p.speedY) % (height + 40) - 20;
    const curX =
      (p.seedX + tick * p.speedX + Math.sin(tick * 0.03 + p.phase) * 18 + wave * 0.3) %
      (width + 40) -
      20;
    const rot = tick * p.rotSpeed + p.phase;

    ctx.save();
    ctx.translate(curX, curY);
    ctx.rotate(rot);

    if (effect === 'petals_peach') {
      // 🌸 Hoa Đào Hồng Rơi
      ctx.fillStyle = idx % 2 === 0 ? 'rgba(255, 182, 193, 0.75)' : 'rgba(255, 160, 180, 0.85)';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      // Nhụy hoa đỏ thắm
      ctx.fillStyle = 'rgba(219, 39, 119, 0.6)';
      ctx.beginPath();
      ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
      ctx.fill();
    } else if (effect === 'petals_apricot') {
      // 🌼 Hoa Mai Vàng Hoàng Cung Rơi
      ctx.fillStyle = idx % 2 === 0 ? 'rgba(253, 224, 71, 0.85)' : 'rgba(245, 158, 11, 0.85)';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.58, 0, 0, Math.PI * 2);
      ctx.fill();
      // Nhụy cam tươi
      ctx.fillStyle = 'rgba(234, 88, 12, 0.7)';
      ctx.beginPath();
      ctx.arc(0, 0, 1.4, 0, Math.PI * 2);
      ctx.fill();
    } else if (effect === 'gold_dust') {
      // ✨ Bụi Vàng Cung Đình Lấp Lánh
      const pulse = Math.abs(Math.sin(tick * 0.08 + p.phase));
      const gSize = (p.size * 0.65) * (0.6 + pulse * 0.6);
      ctx.fillStyle = `rgba(254, 240, 138, ${0.4 + pulse * 0.5})`;
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 6;
      // 4-point diamond star
      ctx.beginPath();
      ctx.moveTo(0, -gSize);
      ctx.lineTo(gSize * 0.35, 0);
      ctx.lineTo(0, gSize);
      ctx.lineTo(-gSize * 0.35, 0);
      ctx.closePath();
      ctx.fill();
    } else if (effect === 'bamboo_leaves') {
      // 🍃 Lá Trúc Xanh Bay
      ctx.fillStyle = idx % 2 === 0 ? 'rgba(34, 197, 94, 0.75)' : 'rgba(16, 185, 129, 0.8)';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.45, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    } else if (effect === 'fireflies_night') {
      // 🏮 Đom Đóm Hoàng Thành Phát Sáng Lung Linh
      const glow = Math.abs(Math.sin(tick * 0.09 + p.phase));
      const fSize = 2 + (p.size % 3.5);
      // Soft outer halo glow
      const haloGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, fSize * 3.5);
      haloGrad.addColorStop(0, `rgba(250, 204, 21, ${0.45 + glow * 0.45})`);
      haloGrad.addColorStop(0.5, `rgba(132, 204, 22, ${0.25 + glow * 0.25})`);
      haloGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(0, 0, fSize * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Bioluminescent intense inner core
      ctx.fillStyle = '#FEF08A';
      ctx.beginPath();
      ctx.arc(0, 0, fSize, 0, Math.PI * 2);
      ctx.fill();
    } else if (effect === 'lotus_petals') {
      // 🪷 Cánh Sen Hồng Thanh Khiết Rơi Êm Đềm
      const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
      grad.addColorStop(0, 'rgba(251, 113, 133, 0.85)');
      grad.addColorStop(0.65, 'rgba(253, 164, 175, 0.8)');
      grad.addColorStop(1, 'rgba(255, 241, 242, 0.85)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 1.3, p.size * 0.7, 0.2, 0, Math.PI * 2);
      ctx.fill();
      // Gân cánh sen mờ ảo
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.8);
      ctx.lineTo(0, p.size * 0.8);
      ctx.stroke();
    } else if (effect === 'cherry_rain') {
      // 🌧️ Mưa Bụi Mùa Xuân Kinh Bắc Lất Phất
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(-4, 12);
      ctx.stroke();

      // Giọt sương nhỏ óng ánh
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(-2, 10, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  });

  ctx.restore();
}

function drawLightingAmbiance(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  lighting: LightingAmbiance,
  tick: number
) {
  if (lighting === 'sunset') {
    // Hoàng hôn Cố Đô tím cam ấm áp
    const grad = ctx.createRadialGradient(width * 0.82, 80, 20, width * 0.5, height * 0.5, width);
    grad.addColorStop(0, 'rgba(249, 115, 22, 0.24)');
    grad.addColorStop(0.55, 'rgba(217, 70, 239, 0.12)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0.18)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (lighting === 'lantern_night') {
    // Đèn Lồng Đêm Hội An lung linh
    const flicker = Math.sin(tick * 0.08) * 0.03;
    const grad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.44,
      50,
      width * 0.5,
      height * 0.5,
      width * 0.85
    );
    grad.addColorStop(0, `rgba(254, 215, 170, ${0.25 + flicker})`);
    grad.addColorStop(0.55, 'rgba(124, 45, 18, 0.18)');
    grad.addColorStop(1, 'rgba(15, 10, 10, 0.48)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (lighting === 'moonlight') {
    // Trăng Rằm Cố Đô huyền ảo
    const lunarGlow = Math.sin(tick * 0.04) * 0.02;
    const grad = ctx.createRadialGradient(
      width * 0.8,
      90,
      30,
      width * 0.5,
      height * 0.5,
      width * 0.95
    );
    grad.addColorStop(0, `rgba(224, 242, 254, ${0.28 + lunarGlow})`);
    grad.addColorStop(0.45, 'rgba(96, 165, 250, 0.14)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0.38)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (lighting === 'daylight') {
    // Ánh dương ban ngày rạng rỡ
    const grad = ctx.createLinearGradient(0, 0, width, height * 0.5);
    grad.addColorStop(0, 'rgba(255, 252, 238, 0.12)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }
}

function shadeColor(color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);
  if (isNaN(R) || isNaN(G) || isNaN(B)) return color;
  R = Math.min(255, Math.max(0, Math.round((R * (100 + percent)) / 100)));
  G = Math.min(255, Math.max(0, Math.round((G * (100 + percent)) / 100)));
  B = Math.min(255, Math.max(0, Math.round((B * (100 + percent)) / 100)));
  return `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`;
}
