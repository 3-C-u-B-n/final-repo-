import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Lock,
  Palette,
  BookmarkCheck,
  Feather,
  Crown,
  Compass,
  ArrowRight,
  ShieldCheck,
  Flower2,
  AlertCircle,
} from 'lucide-react';

export const GoogleAuthGate: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Cửa sổ đăng nhập Google đã bị đóng. Vui lòng bấm đăng nhập lại!');
      } else if (err?.code === 'auth/popup-blocked') {
        setErrorMessage('Trình duyệt đang chặn cửa sổ bật lên (popup). Vui lòng cho phép popup để đăng nhập Google.');
      } else {
        setErrorMessage(err?.message || 'Không thể đăng nhập Google. Vui lòng thử lại sau.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1E1E1E] flex flex-col justify-between selection:bg-[#D32F2F]/20 selection:text-[#D32F2F] relative overflow-hidden">
      {/* Decorative Traditional Corner Border Motif */}
      <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none opacity-20 bg-[radial-gradient(#D32F2F_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Top Header Bar */}
      <header className="w-full border-b border-[#E8E4DC] bg-white/70 backdrop-blur-md py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D32F2F] text-white flex items-center justify-center font-serif text-xl font-bold shadow-xs tracking-wider">
              V
            </div>
            <div>
              <span className="font-serif tracking-[0.16em] text-lg font-bold uppercase text-[#1E1E1E]">
                SẮC VIỆT <span className="text-[#D32F2F] font-sans text-xs font-semibold px-1.5 py-0.5 bg-[#D32F2F]/10 rounded ml-0.5">Remix</span>
              </span>
              <p className="text-[10px] text-[#71717A] tracking-wider uppercase font-medium">
                Đại Việt Y Quán • Không Gian Việt Phục Số
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#997B1A] border border-[#D4AF37]/30 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Yêu Cầu Xác Thực</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Central Content Gate */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="max-w-3xl w-full bg-white rounded-3xl border border-[#E8E4DC] shadow-xl p-6 sm:p-10 relative overflow-hidden text-center">
          {/* Subtle Top Gold Banner */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#D32F2F] to-[#D4AF37]" />

          {/* Imperial Crest Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#D32F2F] via-[#B71C1C] to-[#8E1010] text-white flex items-center justify-center shadow-lg shadow-red-950/20 mb-5 relative group">
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-[#FDE047] drop-shadow" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center border-2 border-white">
              <Lock className="w-3 h-3 text-[#FDE047]" />
            </div>
          </div>

          {/* Title and Subtitle */}
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#1E1E1E] tracking-tight leading-tight">
            Đăng Nhập Google Để Mở Khóa Atelier
          </h1>
          <p className="text-xs sm:text-sm text-[#D32F2F] font-semibold uppercase tracking-widest mt-1.5">
            Cổng Truy Cập Phòng Thử Đồ & Bảo Trợ Di Sản Cổ Phục
          </p>

          <p className="text-xs sm:text-sm text-[#554A42] max-w-xl mx-auto mt-3 leading-relaxed">
            Để bảo tồn tính chuẩn xác của các điển chế trang phục triều Nguyễn, Lê, Lý, Trần và cấp quyền lưu trữ vào <strong>Tủ Đồ Đám Mây</strong>, quý khách vui lòng đăng nhập bằng <strong>tài khoản Google</strong> để bắt đầu trải nghiệm.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 sm:my-8 text-left">
            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#ECE6D9] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#D32F2F]/10 text-[#D32F2F] flex items-center justify-center shrink-0 mt-0.5">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-[#1E1E1E]">
                  8 Dáng Cổ Phục Chuẩn Triều Đình
                </h4>
                <p className="text-[11px] text-[#71717A] mt-0.5">
                  Áo Tấc, Nhật Bình, Ngũ Thân, Giao Lĩnh, Viên Lĩnh, Áo Dài, Bà Ba, Tứ Thân với cấu trúc cổ & tay áo nguyên bản.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#ECE6D9] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#0F4C81]/10 text-[#0F4C81] flex items-center justify-center shrink-0 mt-0.5">
                <Feather className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-[#1E1E1E]">
                  Trọn Bộ Phụ Kiện Di Sản & Hiệu Ứng
                </h4>
                <p className="text-[11px] text-[#71717A] mt-0.5">
                  Mũ Phác Đầu, Nón Quai Thao, Khăn Vành, Bảo Kiếm Triều Đình, Hài Nhung Thêu Hạc, Hoa Mai Bay, Đom Đóm Đêm.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#ECE6D9] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 text-[#997B1A] flex items-center justify-center shrink-0 mt-0.5">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-[#1E1E1E]">
                  Bảng Màu Ngũ Hành & 12 Chất Liệu
                </h4>
                <p className="text-[11px] text-[#71717A] mt-0.5">
                  Tự do phối màu sắc tố, tùy chỉnh mã màu Hex tà áo & quần lụa, gấm Long Phụng, sa Hà Đông, lụa Vạn Phúc.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF9F4] border border-[#ECE6D9] flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                <BookmarkCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-[#1E1E1E]">
                  Tủ Đồ Đám Mây & Xuất Thẻ Lookbook
                </h4>
                <p className="text-[11px] text-[#71717A] mt-0.5">
                  Lưu trữ vĩnh viễn trên Firebase Firestore, so sánh đối chiếu trang phục và tải poster Lookbook 9:16 sắc nét.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message if Login Fails */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 justify-center text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Primary Action Button: Google Login */}
          <div className="max-w-md mx-auto space-y-3">
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full py-4 px-6 bg-[#1E1E1E] hover:bg-[#2C2C2C] active:scale-[0.99] text-white rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3.5 cursor-pointer disabled:opacity-60 group border border-white/10"
            >
              {isLoggingIn ? (
                <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {/* Official Google Icon */}
                  <div className="w-6 h-6 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-full h-full" viewBox="0 0 24 24">
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
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">
                    Đăng nhập bằng tài khoản Google
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform ml-auto" />
                </>
              )}
            </button>

            <p className="text-[11px] text-[#71717A] leading-relaxed">
              Bảo mật tiêu chuẩn bởi Google Firebase. Khi đăng nhập, bạn đồng ý với quy tắc tôn trọng trang phục truyền thống Việt Nam.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-[#E8E4DC] text-center text-[11px] text-[#71717A]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium text-[#554A42]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Đại Việt Y Quán • Bảo Chứng Nghiên Cứu Điển Chế Lịch Sử</span>
          </div>
          <span>© 2026 Sắc Việt Remix • Dự Án Số Hóa Cổ Phục Dành Cho Thế Hệ Trẻ</span>
        </div>
      </footer>
    </div>
  );
};
