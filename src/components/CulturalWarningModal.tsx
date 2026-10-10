import React from 'react';
import { CulturalAssessment } from '../types';
import { X, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  assessment: CulturalAssessment;
}

export const CulturalWarningModal: React.FC<Props> = ({
  isOpen,
  onClose,
  assessment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#FBF9F4] rounded-3xl border border-[#ECE6D9] shadow-2xl p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE6D9]">
          <div className="flex items-center gap-2">
            {assessment.hasViolation ? (
              <AlertTriangle className="w-4 h-4 text-[#D32F2F]" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
            <h3 className="font-serif font-bold text-base text-[#1E1E1E]">
              {assessment.hasViolation ? 'Lưu Ý Bối Cảnh Phục Trang' : 'Chuẩn Mực Phục Trang'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D7] text-[#665A51] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="my-4 space-y-3">
          <div className="p-3.5 bg-white rounded-2xl border border-[#ECE6D9]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7A6B] block mb-1">
              Đánh Giá Độ Phù Hợp:
            </span>
            <p className="text-sm font-semibold text-[#1E1E1E] leading-snug">
              {assessment.quickAdvice}
            </p>
          </div>

          <p className="text-xs text-[#7D6E63] leading-relaxed">
            Thời trang cổ phục Việt Nam tôn trọng quyền tự do sáng tạo của người mặc, đồng thời hướng tới việc gìn giữ những giá trị lịch sử và chuẩn mực thẩm mỹ truyền thống.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#1E1E1E] text-white rounded-xl text-xs font-semibold hover:bg-[#2C2C2C] transition-colors cursor-pointer"
        >
          Đã hiểu • Tiếp tục hoàn thiện bản phối
        </button>
      </div>
    </div>
  );
};
