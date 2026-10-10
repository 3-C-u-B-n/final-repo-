import React, { useState, useMemo } from 'react';
import { OutfitConfig, GarmentId, OccasionId, BackgroundId } from './types';
import { evaluateCulturalOutfit, GARMENTS, OCCASIONS } from './data/fashionData';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { StudioCanvas } from './components/StudioCanvas';
import { StyleDrawer } from './components/StyleDrawer';
import { BottomActionBar } from './components/BottomActionBar';
import { LookbookModal } from './components/LookbookModal';
import { CulturalInfoModal } from './components/CulturalInfoModal';
import { CulturalWarningModal } from './components/CulturalWarningModal';
import { AvatarUploadModal } from './components/AvatarUploadModal';
import { CompareModal } from './components/CompareModal';
import { LookbookShowcase } from './components/LookbookShowcase';
import { ExploreGarments } from './components/ExploreGarments';
import { AuthModal } from './components/AuthModal';
import { SaveOutfitModal } from './components/SaveOutfitModal';
import { WardrobeModal } from './components/WardrobeModal';
import { GoogleAuthGate } from './components/GoogleAuthGate';
import { CheckCircle2, BookmarkCheck } from 'lucide-react';

const INITIAL_CONFIG: OutfitConfig = {
  gender: 'female',
  occasionId: 'tet',
  garmentId: 'ao_tac',
  fabricId: 'silk_ha_dong',
  colorId: 'red_cinnabar',
  headpieceId: 'man_lua',
  jewelryId: 'gold_kieng',
  handheldId: 'silk_fan',
  footwearId: 'wooden_clogs',
  backgroundId: 'san_dinh',
  visualEffect: 'petals_peach',
  windSpeed: 'gentle',
  lighting: 'daylight',
  userAvatarUrl: null,
};

function MainApp() {
  const { user, loading } = useAuth();
  const [config, setConfig] = useState<OutfitConfig>(INITIAL_CONFIG);
  const [activeNavTab, setActiveNavTab] = useState<'explore' | 'studio' | 'lookbook'>('studio');

  // Modals state
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isCulturalInfoOpen, setIsCulturalInfoOpen] = useState(false);
  const [isCulturalWarningOpen, setIsCulturalWarningOpen] = useState(false);
  const [isAvatarUploadOpen, setIsAvatarUploadOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSaveOutfitOpen, setIsSaveOutfitOpen] = useState(false);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);

  // In-app elegant toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cultural Assessment Computation
  const assessment = useMemo(() => {
    return evaluateCulturalOutfit(config);
  }, [config]);

  const currentGarment = useMemo(() => {
    return GARMENTS.find((g) => g.id === config.garmentId) || GARMENTS[0];
  }, [config.garmentId]);

  // Update Config
  const handleConfigChange = (updates: Partial<OutfitConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  // Switch Male / Female Avatar
  const handleToggleGender = () => {
    setConfig((prev) => {
      const nextGender = prev.gender === 'female' ? 'male' : 'female';
      // Automatically adjust headpiece if gender conflicts
      const nextHeadpiece = nextGender === 'male' ? 'khan_dong' : 'man_lua';
      return {
        ...prev,
        gender: nextGender,
        headpieceId: nextHeadpiece,
      };
    });
  };

  // Change Background Ambiance
  const handleChangeBackground = (bgId: BackgroundId) => {
    setConfig((prev) => ({ ...prev, backgroundId: bgId }));
  };

  // Select Occasion
  const handleSelectOccasion = (occId: OccasionId) => {
    const occ = OCCASIONS.find((o) => o.id === occId);
    const updates: Partial<OutfitConfig> = { occasionId: occId };
    if (occ && occ.recommendedColors?.length) {
      updates.colorId = occ.recommendedColors[0];
    }
    handleConfigChange(updates);
  };

  // 1. Loading screen while authenticating
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-3xl bg-[#D32F2F] text-white flex items-center justify-center shadow-lg shadow-red-950/20 mb-4 animate-pulse">
          <span className="font-serif text-3xl font-bold">V</span>
        </div>
        <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-3" />
        <h2 className="font-serif text-lg font-bold text-[#1E1E1E]">SẮC VIỆT REMIX • ĐẠI VIỆT Y QUÁN</h2>
        <p className="text-xs text-[#71717A] mt-1">Đang kiểm tra chứng thực tài khoản Google...</p>
      </div>
    );
  }

  // 2. Google Authentication Guard: User must be signed in with Google to access the app
  if (!user) {
    return <GoogleAuthGate />;
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1E1E1E] flex flex-col selection:bg-[#D32F2F]/20 selection:text-[#D32F2F] pb-24">
      {/* 1. Header with Classical Serif Logo, Auth, Context Bar & Navigation */}
      <Header
        activeOccasionId={config.occasionId}
        onSelectOccasion={handleSelectOccasion}
        activeNavTab={activeNavTab}
        onNavTabChange={(tab) => setActiveNavTab(tab)}
        onOpenAvatarUpload={() => setIsAvatarUploadOpen(true)}
        onOpenWardrobe={() => setIsWardrobeOpen(true)}
      />

      {/* 2. Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* TAB: STUDIO PHỐI ĐỒ (Core 2-Column Interactive Atelier) */}
        {activeNavTab === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
            {/* Cột Trái (60%): Studio Visual Canvas */}
            <div className="lg:col-span-7 xl:col-span-8">
              <StudioCanvas
                config={config}
                assessment={assessment}
                onOpenCulturalModal={() => setIsCulturalInfoOpen(true)}
                onOpenWarningModal={() => setIsCulturalWarningOpen(true)}
                onToggleGender={handleToggleGender}
                onChangeBackground={handleChangeBackground}
                onChangeConfig={handleConfigChange}
              />
            </div>

            {/* Cột Phải (40%): Bộ Công Cụ Phối Đồ (Style Drawer) */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
              <StyleDrawer
                config={config}
                assessment={assessment}
                onChange={handleConfigChange}
                onOpenCulturalModal={() => setIsCulturalInfoOpen(true)}
                onOpenSaveOutfit={() => setIsSaveOutfitOpen(true)}
              />
            </div>
          </div>
        )}

        {/* TAB: KHÁM PHÁ (Heritage Catalog) */}
        {activeNavTab === 'explore' && (
          <ExploreGarments
            onSelectGarmentToStyle={(garmentId) => {
              handleConfigChange({ garmentId });
              setActiveNavTab('studio');
            }}
          />
        )}

        {/* TAB: LOOKBOOK (Curated Gallery) */}
        {activeNavTab === 'lookbook' && (
          <LookbookShowcase
            onApplyOutfit={(updates) => {
              handleConfigChange(updates);
              showToast('Đã áp dụng mẫu phối từ Bộ Sưu Tập!');
            }}
            onGoToStudio={() => setActiveNavTab('studio')}
          />
        )}
      </main>

      {/* 3. Blurry Glassmorphism Bottom Action Bar */}
      <BottomActionBar
        onExportLookbook={() => setIsLookbookOpen(true)}
        onToggleGender={handleToggleGender}
        onOpenCompare={() => setIsCompareOpen(true)}
        onSaveOutfit={() => setIsSaveOutfitOpen(true)}
        isMale={config.gender === 'male'}
      />

      {/* In-app Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 p-3 px-4 bg-[#1E1E1E] text-white rounded-2xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-top duration-200 border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <AuthModal />

      <SaveOutfitModal
        isOpen={isSaveOutfitOpen}
        onClose={() => setIsSaveOutfitOpen(false)}
        config={config}
        assessment={assessment}
        onSavedSuccess={() => showToast('Đã lưu thiết kế vào Tủ Đồ Số thành công!')}
      />

      <WardrobeModal
        isOpen={isWardrobeOpen}
        onClose={() => setIsWardrobeOpen(false)}
        onApplyOutfit={(updates) => {
          handleConfigChange(updates);
          setActiveNavTab('studio');
          showToast('Đã áp dụng mẫu phối từ Tủ Đồ lên Studio!');
        }}
        onOpenCreateNew={() => {
          setActiveNavTab('studio');
        }}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        config={config}
        assessment={assessment}
      />

      <CulturalInfoModal
        isOpen={isCulturalInfoOpen}
        onClose={() => setIsCulturalInfoOpen(false)}
        garment={currentGarment}
      />

      <CulturalWarningModal
        isOpen={isCulturalWarningOpen}
        onClose={() => setIsCulturalWarningOpen(false)}
        assessment={assessment}
      />

      <AvatarUploadModal
        isOpen={isAvatarUploadOpen}
        onClose={() => setIsAvatarUploadOpen(false)}
        currentAvatarUrl={config.userAvatarUrl}
        onSelectAvatar={(url) => handleConfigChange({ userAvatarUrl: url })}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        currentConfig={config}
        onApplyConfig={(cfg) => setConfig(cfg)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
