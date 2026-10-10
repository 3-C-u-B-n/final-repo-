import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, ShieldCheck, Palette, Bookmark, Heart } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalReason, loginWithGoogle } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      await loginWithGoogle();
      closeAuthModal();
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Cửa sổ đăng nhập đã bị đóng. Vui lòng thử lại!');
      } else {
        setErrorMessage(err?.message || 'Không thể đăng nhập. Vui lòng thử lại sau.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl border border-[#E8E4DC] shadow-2xl p-6 sm:p-8 overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-[#71717A] hover:text-[#1E1E1E] rounded-full hover:bg-[#EAE4D7] transition-colors cursor-pointer"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Motif */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#D32F2F] to-[#8E1010] text-white flex items-center justify-center shadow-md">
          <Palette className="w-7 h-7 text-[#FDE047]" />
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl font-bold text-[#1E1E1E] tracking-tight">
          Đăng Nhập Bằng Google
        </h3>
        <p className="text-xs text-[#D32F2F] font-semibold uppercase tracking-wider mt-1">
          Mở Khóa Đặc Quyền Phối Màu & Tủ Đồ Số
        </p>

        {/* Custom Reason Prompt */}
        <div className="mt-4 p-3 rounded-2xl bg-[#F0EBE1] border border-[#E2DBD0] text-xs text-[#554A42] leading-relaxed">
          {authModalReason}
        </div>

        {/* Privileges List */}
        <div className="my-5 text-left space-y-2.5 text-xs text-[#443830]">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#D32F2F]/10 text-[#D32F2F] flex items-center justify-center shrink-0">
              <Palette className="w-3 h-3" />
            </div>
            <span><strong>Tự do phối màu sắc:</strong> Chọn bảng màu Ngũ Hành, triều đình & tùy biến mã màu Hex.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#0F4C81]/10 text-[#0F4C81] flex items-center justify-center shrink-0">
              <Bookmark className="w-3 h-3" />
            </div>
            <span><strong>Lưu vào Tủ Đồ Đám Mây:</strong> Lưu trữ không giới hạn bộ Việt phục của bạn trên Firestore.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#D4AF37]/15 text-[#997B1A] flex items-center justify-center shrink-0">
              <Sparkles className="w-3 h-3" />
            </div>
            <span><strong>Phân tích văn hóa:</strong> Nhận đánh giá độ hài hòa trang phục và điển chế truyền thống.</span>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
            {errorMessage}
          </div>
        )}

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
          className="w-full py-3.5 px-4 bg-white hover:bg-[#F5F2EB] text-[#1E1E1E] border border-[#D5CEC2] rounded-2xl font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer hover:shadow-md disabled:opacity-50"
        >
          {isLoggingIn ? (
            <div className="w-5 h-5 border-2 border-[#D32F2F] border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
          )}
          <span>{isLoggingIn ? 'Đang kết nối Google...' : 'Đăng nhập với Google'}</span>
        </button>

        <p className="text-[11px] text-[#8C827A] mt-3">
          Bảo mật thông tin qua Firebase Authentication. Không cần mật khẩu.
        </p>
      </div>
    </div>
  );
};
