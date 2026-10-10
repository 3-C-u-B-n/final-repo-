import React from 'react';
import { GARMENTS } from '../data/fashionData';
import { GarmentId } from '../types';
import { ArrowRight, BookOpen, Feather, Landmark, Compass } from 'lucide-react';

interface Props {
  onSelectGarmentToStyle: (id: GarmentId) => void;
}

export const ExploreGarments: React.FC<Props> = ({
  onSelectGarmentToStyle,
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#ECE6D9] pb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#D32F2F] bg-[#D32F2F]/10 px-2.5 py-0.5 rounded-full">
          Cẩm Nang Di Sản
        </span>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1E1E1E] mt-1">
          Khám Phá Di Sản Cổ Phục Việt
        </h2>
        <p className="text-xs sm:text-sm text-[#7D6E63] mt-0.5 max-w-2xl">
          Tìm hiểu lịch sử, niên đại, cấu trúc giải phẫu và điển chế của từng trang phục truyền thống Việt Nam trước khi trải nghiệm phòng thử đồ số.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {GARMENTS.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-3xl border border-[#ECE6D9] p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                  {g.dynasty}
                </span>
                <span className="text-[11px] text-[#8C7A6B] bg-[#F5F1E9] px-2 py-0.5 rounded-full font-medium">
                  {g.dynastyPeriod || g.century}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="font-serif font-bold text-xl text-[#1E1E1E]">
                  {g.name}
                </h3>
                {g.hanTuName && (
                  <span className="text-xs font-serif text-[#D32F2F] font-semibold">
                    {g.hanTuName.split(' ')[0]}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-block text-[11px] font-semibold text-[#D32F2F]">
                  {g.formality}
                </span>
                {g.socialClass && (
                  <span className="text-[10px] text-[#71717A] bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E8E4DC]">
                    {g.socialClass}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#554A42] leading-relaxed mt-2.5">
                {g.description}
              </p>

              {/* Anatomy details */}
              {g.anatomy && (
                <div className="mt-3 p-2.5 bg-[#FAF8F5] rounded-xl border border-[#F0EBE1] text-[11px] text-[#554A42] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#71717A]">Cổ áo:</span>
                    <span className="font-semibold text-right max-w-[170px] truncate">{g.anatomy.collarType.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#71717A]">Kiểu tay:</span>
                    <span className="font-semibold text-right max-w-[170px] truncate">{g.anatomy.sleeveType.split('(')[0]}</span>
                  </div>
                </div>
              )}

              {/* Museum artifact */}
              {g.heritageArtifactLocation && (
                <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-[#8C7A6B]">
                  <Landmark className="w-3 h-3 text-[#D4AF37] shrink-0" />
                  <span className="truncate">{g.heritageArtifactLocation}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => onSelectGarmentToStyle(g.id)}
              className="mt-5 w-full py-2.5 bg-[#1E1E1E] hover:bg-[#D32F2F] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Thử phối {g.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
