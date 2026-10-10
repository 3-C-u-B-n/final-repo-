import React, { useState } from 'react';
import { OccasionId } from '../types';
import { OCCASIONS } from '../data/fashionData';
import { useAuth } from '../context/AuthContext';
import {
  CloudSun,
  Upload,
  Sparkles,
  Check,
  Info,
  Bookmark,
  LogOut,
  User as UserIcon,
} from 'lucide-react';

interface Props {
  activeOccasionId: OccasionId;
  onSelectOccasion: (id: OccasionId) => void;
  activeNavTab?: 'explore' | 'studio' | 'lookbook';
  onNavTabChange?: (tab: 'explore' | 'studio' | 'lookbook') => void;
  onOpenAvatarUpload: () => void;
  onOpenWardrobe?: () => void;
}

export const Header: React.FC<Props> = ({
  activeOccasionId,
  onSelectOccasion,
  activeNavTab = 'studio',
  onNavTabChange,
  onOpenAvatarUpload,
  onOpenWardrobe,
}) => {
  const { user, openAuthModal, logout } = useAuth();
  const [showWeatherTip, setShowWeatherTip] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F4]/95 backdrop-blur-md border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Header Bar */}
        <div className="h-16 flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Editorial Serif Logo */}
          <div 
            onClick={() => onNavTabChange?.('studio')}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#D32F2F] text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs tracking-wider group-hover:scale-105 transition-transform">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.16em] text-base sm:text-lg font-bold uppercase text-[#1E1E1E] leading-none">
                SẮC VIỆT <span className="text-[#D32F2F] font-normal tracking-normal text-xs uppercase font-sans font-semibold ml-0.5 px-1.5 py-0.5 bg-[#D32F2F]/10 rounded">Remix</span>
              </span>
              <span className="text-[9px] text-[#71717A] tracking-wider uppercase mt-0.5 font-medium">
                Không Gian Việt Phục Số
              </span>
            </div>
          </div>

          {/* Center / Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F0EAE1]/70 p-1 rounded-full border border-[#E8E4DC]">
            <button
              onClick={() => onNavTabChange?.('explore')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeNavTab === 'explore'
                  ? 'bg-white text-[#1E1E1E] font-semibold shadow-xs'
                  : 'text-[#554A42] hover:text-[#1E1E1E]'
              }`}
            >
              Khám Phá Di Sản
            </button>
            <button
              onClick={() => onNavTabChange?.('studio')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeNavTab === 'studio'
                  ? 'bg-[#1E1E1E] text-white font-semibold shadow-xs'
                  : 'text-[#554A42] hover:text-[#1E1E1E]'
              }`}
            >
              Phòng Thử Đồ
            </button>
            <button
              onClick={() => onNavTabChange?.('lookbook')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeNavTab === 'lookbook'
                  ? 'bg-white text-[#1E1E1E] font-semibold shadow-xs'
                  : 'text-[#554A42] hover:text-[#1E1E1E]'
              }`}
            >
              Bộ Sưu Tập Mẫu
            </button>
          </nav>

          {/* Right Actions: Auth, Wardrobe, Weather & Primary Upload CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Weather / Fabric advisory badge */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setShowWeatherTip(!showWeatherTip)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F0EBE1] hover:bg-[#EAE4D7] rounded-full text-xs font-medium text-[#1E1E1E] transition-colors border border-[#E8E4DC] cursor-pointer"
                title="Khuyến nghị chất liệu theo thời tiết"
              >
                <CloudSun className="w-3.5 h-3.5 text-[#0F4C81]" />
                <span className="text-[11px]">Hà Nội 22°C • Sa / Lụa</span>
              </button>

              {/* Weather Tip Tooltip */}
              {showWeatherTip && (
                <div className="absolute right-0 top-full mt-2 w-64 p-3.5 bg-white rounded-2xl border border-[#E8E4DC] shadow-xl text-xs text-[#554A42] z-50 animate-in fade-in">
                  <div className="flex items-center justify-between font-semibold text-[#1E1E1E] pb-1.5 mb-1.5 border-b border-[#F0EBE1]">
                    <span>Thời Tiết & Gợi Ý Chất Liệu</span>
                    <span className="text-[10px] text-[#0F4C81] font-bold">Thu mát 22°C</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#71717A]">
                    Thời tiết se lạnh hanh hao lý tưởng nhất để diện <strong>Lụa tơ tằm Hà Đông</strong> và <strong>Sa tơ mỏng nhẹ</strong> giúp tà áo bay bổng tự nhiên mà vẫn giữ ấm thanh nhã.
                  </p>
                </div>
              )}
            </div>

            {/* My Wardrobe button (Tủ đồ) */}
            {onOpenWardrobe && (
              <button
                onClick={onOpenWardrobe}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#F0EBE1] hover:bg-[#EAE4D7] text-[#1E1E1E] text-xs font-semibold rounded-xl border border-[#E8E4DC] shadow-2xs transition-all cursor-pointer"
                title="Mở Tủ Đồ Số"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Tủ Đồ</span>
              </button>
            )}

            {/* Primary CTA: [↑ Thử ảnh gương mặt] */}
            <button
              onClick={onOpenAvatarUpload}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Thử ảnh</span>
            </button>

            {/* Google Authentication Component */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 pl-2 sm:pr-2.5 bg-white hover:bg-[#F5F2EB] border border-[#D5CEC2] rounded-xl text-xs font-semibold text-[#1E1E1E] transition-all cursor-pointer shadow-xs"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Avatar'}
                      className="w-6 h-6 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-lg bg-[#D32F2F] text-white flex items-center justify-center text-[10px] font-bold">
                      {(user.displayName || 'U')[0]}
                    </div>
                  )}
                  <span className="hidden sm:inline max-w-[80px] truncate">
                    {user.displayName?.split(' ')[0] || 'Tài khoản'}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-white rounded-2xl border border-[#E8E4DC] shadow-xl text-xs text-[#1E1E1E] z-50 animate-in fade-in">
                    <div className="p-2 border-b border-[#F0EBE1]">
                      <span className="font-bold block truncate">{user.displayName}</span>
                      <span className="text-[10px] text-[#71717A] block truncate">{user.email}</span>
                    </div>

                    {onOpenWardrobe && (
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onOpenWardrobe();
                        }}
                        className="w-full text-left px-2.5 py-2 hover:bg-[#F5F2EB] rounded-xl flex items-center gap-2 text-xs font-medium cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Tủ Đồ Của Tôi</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full text-left px-2.5 py-2 hover:bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-xs font-medium cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('Đăng nhập với Google để mở khóa tính năng Phối màu & Tủ đồ số!')}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-white hover:bg-[#F5F2EB] text-[#1E1E1E] border border-[#D5CEC2] text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer hover:shadow-sm"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-bar / Context Bar: Quick switcher for "Vibes / Bối cảnh & Dịp diện" */}
        <div className="py-2.5 border-t border-[#E8E4DC]/60 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0 text-[11px] text-[#71717A] uppercase font-semibold tracking-wider">
            <span>Bối cảnh & Dịp diện:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {OCCASIONS.map((occ) => {
              const isSelected = occ.id === activeOccasionId;
              return (
                <button
                  key={occ.id}
                  onClick={() => {
                    onSelectOccasion(occ.id);
                    if (activeNavTab !== 'studio') onNavTabChange?.('studio');
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E1E1E] text-white shadow-xs ring-1 ring-[#D4AF37]/50 scale-102 font-semibold'
                      : 'bg-[#F2ECE1]/80 hover:bg-[#EAE2D5] text-[#554A42]'
                  }`}
                >
                  <span>{occ.icon}</span>
                  <span className="whitespace-nowrap">{occ.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Navigation Tabs */}
          <div className="flex md:hidden items-center gap-1 shrink-0 bg-[#F0EAE1] p-0.5 rounded-full text-[11px]">
            <button
              onClick={() => onNavTabChange?.('explore')}
              className={`px-2 py-1 rounded-full ${activeNavTab === 'explore' ? 'bg-white font-semibold text-[#1E1E1E]' : 'text-[#71717A]'}`}
            >
              Di sản
            </button>
            <button
              onClick={() => onNavTabChange?.('studio')}
              className={`px-2 py-1 rounded-full ${activeNavTab === 'studio' ? 'bg-[#1E1E1E] text-white font-semibold' : 'text-[#71717A]'}`}
            >
              Thử đồ
            </button>
            <button
              onClick={() => onNavTabChange?.('lookbook')}
              className={`px-2 py-1 rounded-full ${activeNavTab === 'lookbook' ? 'bg-white font-semibold text-[#1E1E1E]' : 'text-[#71717A]'}`}
            >
              Mẫu
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
