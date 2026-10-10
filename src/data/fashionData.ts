import {
  Occasion,
  Garment,
  OriginalDetail,
  RemixAccessory,
  Fabric,
  ColorItem,
  Headpiece,
  Jewelry,
  Handheld,
  Footwear,
  BackgroundItem,
  OutfitConfig,
  CulturalAssessment,
} from '../types';

export const OCCASIONS: Occasion[] = [
  {
    id: 'tet',
    name: 'Tết Cổ Truyền',
    tag: 'Đoàn Viên',
    icon: '🧧',
    vibe: 'Ấm áp, sum vầy, rạng rỡ sắc xuân',
    recommendedColors: ['red_cinnabar', 'gold_hoang_yen', 'white_bach', 'pink_lotus'],
    description: 'Dịp lễ đầu năm trang trọng nhất của dân tộc, mang năng lượng khởi sinh, may mắn và cát tường.',
    culturalEtiquette: 'Nên ưu tiên sắc Đỏ, Vàng rực rỡ tượng trưng tài lộc, tránh diện đơn độc toàn sắc đen thuần tuý chốn gia đình.',
  },
  {
    id: 'wedding',
    name: 'Hỷ Sự & Cưới Hỏi',
    tag: 'Trăm Năm',
    icon: '💐',
    vibe: 'Trang trọng, thủy chung, chúc phúc trăm năm',
    recommendedColors: ['red_cinnabar', 'red_dieu', 'pink_lotus', 'gold_hoang_yen'],
    description: 'Nghi thức kết duyên lứa đôi theo phong tục cổ truyền với trầu cau, áo ngũ thân hoặc áo tấc đoan chính.',
    culturalEtiquette: 'Tránh các màu tang chế (trắng tuyền không phối hoa văn, đen tuyền), nên chọn sắc son tươi sáng.',
  },
  {
    id: 'graduation',
    name: 'Kỷ Yếu & Tốt Nghiệp',
    tag: 'Thanh Xuân',
    icon: '🎓',
    vibe: 'Trong trẻo, thanh lịch, lưu giữ kỷ niệm',
    recommendedColors: ['white_bach', 'blue_thien_thanh', 'green_luc', 'pastel_suong_mai'],
    description: 'Khoảnh khắc đánh dấu cột mốc trưởng thành, tôn vinh truyền thống hiếu học của kẻ sĩ đất Việt.',
    culturalEtiquette: 'Màu sắc nhã nhặn, tôn dáng trí thức; tay chẽn hoặc ngũ thân gọn gàng thuận tiện di chuyển.',
  },
  {
    id: 'retro_street',
    name: 'Dạo Phố & Sự Kiện',
    tag: 'Trẻ Trung',
    icon: '☕',
    vibe: 'Phóng khoáng, giao thoa cổ điển và đương đại',
    recommendedColors: ['gold_hoang_yen', 'green_luc', 'pastel_suong_mai', 'smoke_blue'],
    description: 'Xu hướng đưa Việt phục vào đời sống hằng ngày của giới trẻ với các cách điệu phụ kiện phóng khoáng.',
    culturalEtiquette: 'Tự do sáng tạo phụ kiện remix (kính râm, bốt da), nhưng vẫn cần giữ phom áo kín đáo tôn trọng trang phục.',
  },
  {
    id: 'temple',
    name: 'Chiêm Bái Đình Chùa',
    tag: 'Tôn Nghiêm',
    icon: '🏮',
    vibe: 'Thanh tịnh, kín đáo, trang trọng chốn linh thiêng',
    recommendedColors: ['white_bach', 'blue_thien_thanh', 'pastel_vang_mo', 'brown_tram'],
    description: 'Không gian tâm linh, tưởng nhớ tiền nhân và cầu an chốn thiền môn.',
    culturalEtiquette: 'Yêu cầu cổ đứng lập lĩnh kín đáo, tuyệt đối không hở tà hay phối phụ kiện phá cách gây phản cảm.',
  },
  {
    id: 'diplomatic',
    name: 'Giao Lưu Quốc Tế',
    tag: 'Quốc Hồn',
    icon: '🌏',
    vibe: 'Đĩnh đạc, tự hào bản sắc dân tộc',
    recommendedColors: ['purple_hue', 'green_luc', 'red_cinnabar', 'gold_hoang_yen'],
    description: 'Quảng bá vẻ đẹp văn hiến ngàn năm của Việt Nam tới bạn bè năm châu.',
    culturalEtiquette: 'Áo Tấc tay thụng hoặc Nhật Bình hoàng cung là lựa chọn đại diện hoàn hảo nhất cho sự quyền quý.',
  },
];

export const GARMENTS: Garment[] = [
  {
    id: 'ao_tac',
    name: 'Áo Tấc',
    hanTuName: '襖𧘇 (Áo Thụng Lễ Phục)',
    dynasty: 'Triều Nguyễn',
    dynastyPeriod: '1802 – 1945',
    century: 'Thế kỷ 19',
    formality: 'Đại Lễ Phục Trang Trọng',
    socialClass: 'Mọi tầng lớp trong các dịp tế tự, đại lễ',
    description: 'Lễ phục cổ đứng tay thụng buông rộng 30-40cm, vạt áo dài quá gối, mang phong thái đoan trang đĩnh đạc nhất trong hệ thống cổ phục triều Nguyễn.',
    anatomy: {
      collarType: 'Lập lĩnh (cổ đứng vuông góc, ôm sát chân cổ cao 3-4cm)',
      sleeveType: 'Tay thụng rộng (ống tay buông rủ 30-40cm, dài chạm đầu gối)',
      flapStructure: 'Năm thân áo (4 thân ngoài che chở thân thứ năm bên trong)',
      fastenerType: 'Năm hạt khuy tròn cài bên sườn phải tượng trưng Ngũ Thường',
    },
    features: [
      'Tay thụng rộng buông dài đoan trang, uy nghiêm',
      'Cổ đứng lập lĩnh kín đáo chuẩn mực lễ nghi Nho gia',
      'Thân áo rộng rãi, buông rủ chấm mắt cá chân',
    ],
    vibe: 'Trang nghiêm, quyền quý, hào sảng cung đình',
    confucianMeaning: 'Áo Tấc tượng trưng cho đạo Nho mẫu mực với năm thân áo biểu trưng cha mẹ hai bên và người con, năm khuy cài đại diện cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín).',
    historicalTrivia: 'Thời vua Minh Mạng, quy định ban ra bắt buộc từ sĩ phu đến bình dân khi đi tế lễ, bái yết tổ tiên phải mặc Áo Tấc, thể hiện sự kính cẩn tối cao.',
    etiquetteRules: 'Khi mặc Áo Tấc, hai tay khoanh trước bụng để hai ống tay thụng buông rủ song song tạo thế bình phong nghiêm cẩn.',
    heritageArtifactLocation: 'Bảo tàng Cổ vật Cung đình Huế & Bảo tàng Lịch sử Quốc gia (Hà Nội)',
    suitableOccasions: ['tet', 'wedding', 'temple', 'diplomatic'],
  },
  {
    id: 'ngu_than',
    name: 'Áo Ngũ Thân Tay Chẽn',
    hanTuName: '襖五身 (Áo Thường Phục Trí Thức)',
    dynasty: 'Triều Nguyễn',
    dynastyPeriod: '1744 – 1945',
    century: 'Thế kỷ 18 – 19',
    formality: 'Thường phục Nho nhã & Lễ phục thường nhật',
    socialClass: 'Sĩ phu, trí thức, thương nhân, quan lại',
    description: 'Thiết kế năm thân áo kết hợp tay chẽn ôm gọn cổ tay, tiền thân trực tiếp của chiếc Áo Dài hiện đại, tôn vinh cốt cách tao nhã của người Việt.',
    anatomy: {
      collarType: 'Cổ đứng lập lĩnh có lót hồ cứng định hình cổ áo',
      sleeveType: 'Tay chẽn (ống tay thuôn nhỏ ôm sát từ cùi chỏ đến cổ tay)',
      flapStructure: 'Năm thân (vạt tả, vạt hữu, vạt con lót bên trong)',
      fastenerType: 'Khuy đồng, ngọc bích hoặc gỗ quý cài dọc sườn phải',
    },
    features: [
      'Năm thân áo khép kín đoan chính, gọn gàng',
      'Tay chẽn thư sinh linh hoạt cho công việc và giao tiếp',
      'Hàng khuy cài tinh xảo bên nách và sườn phải',
    ],
    vibe: 'Nho nhã, trí thức, thanh tao, đĩnh đạc',
    confucianMeaning: 'Bốn thân ngoài tượng trưng cho Tứ Thân Phụ Mẫu (cha mẹ đẻ và cha mẹ vợ/chồng), thân thứ năm con con lót trong lòng tượng trưng cho người con hiếu nghĩa.',
    historicalTrivia: 'Chúa Nguyễn Phúc Khoát năm 1744 ban hành cải cách trang phục Đàng Trong, chính thức định hình tiền đề cho áo ngũ thân tay chẽn.',
    etiquetteRules: 'Mặc cùng quần lụa trắng hoặc đen, chân đi hài hoặc guốc mộc, cử chỉ nhẹ nhàng nho nhã.',
    heritageArtifactLocation: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
    suitableOccasions: ['tet', 'graduation', 'retro_street', 'diplomatic'],
  },
  {
    id: 'nhat_binh',
    name: 'Áo Nhật Bình',
    hanTuName: '襖日平 (Hoàng Tộc Thường Triều Phục)',
    dynasty: 'Hoàng thất Triều Nguyễn',
    dynastyPeriod: '1807 – 1945',
    century: 'Thế kỷ 19',
    formality: 'Thường triều phục của Hậu phi, Công chúa',
    socialClass: 'Hậu phi, Công chúa, Nữ quan, Mệnh phụ phu nhân',
    description: 'Kiệt tác trang phục cung đình với cổ áo hình chữ nhật viền thêu kim tuyến, tay áo phối các dải vải ngũ sắc Ngũ Hành lộng lẫy và dây kết ngọc quý.',
    anatomy: {
      collarType: 'Viền cổ Nhật Bình (chữ nhật to bản thêu rồng phượng, hoa mai)',
      sleeveType: 'Tay thụng phối dải ngũ sắc (xanh, vàng, trắng, đỏ, lục)',
      flapStructure: 'Thân áo xẻ trước ngực cài cúc khảm ngọc hoặc trâm vàng',
      fastenerType: 'Dải thắt lưng và dây lụa kết ngọc rủ dài duyên dáng',
    },
    features: [
      'Vạt cổ hình chữ nhật viền thêu tinh xảo bậc nhất',
      'Dải ngũ sắc tay áo tượng trưng Ngũ Hành điều hòa vạn vật',
      'Dây kết ngọc hoàng gia quý phái buông nhẹ trước ngực',
    ],
    vibe: 'Hoàng gia, lộng lẫy, kiêu sa, tuyệt mỹ',
    confucianMeaning: 'Biểu trưng phẩm trật và tôn ti trật tự hoàng cung; hoa văn bát bửu cầu chúc thái bình thịnh trị.',
    historicalTrivia: 'Thời Khâm Định Đại Nam Hội Điển Sự Lệ, màu sắc Nhật Bình được ấn định nghiêm ngặt: Hoàng hậu mặc màu vàng chính sắc, Công chúa mặc đỏ điều, Cung tần mặc tím.',
    etiquetteRules: 'Thường kết hợp cùng khăn vành dây vàng hoặc xanh, dáng đứng thanh thoát đoan trang.',
    heritageArtifactLocation: 'Bảo tàng Cổ vật Cung đình Huế (Áo Nhật Bình của Thái hoàng thái hậu Từ Cung)',
    suitableOccasions: ['wedding', 'tet', 'diplomatic'],
  },
  {
    id: 'tu_than',
    name: 'Áo Tứ Thân',
    hanTuName: '襖四身 (Hồn Dân Gian Bắc Bộ)',
    dynasty: 'Dân gian Bắc Bộ',
    dynastyPeriod: 'Thế kỷ 15 – Đầu thế kỷ 20',
    century: 'Thế kỷ 15 – 19',
    formality: 'Lễ hội dân gian & Thường phục truyền thống',
    socialClass: 'Phụ nữ kinh kỳ và thôn dã Bắc Bộ',
    description: 'Biểu tượng vẻ đẹp mềm mại hồn hậu của người phụ nữ Việt với bốn vạt áo thướt tha, yếm đào trữ tình, bao thắt lưng lụa ngũ sắc và nón quai thao duyên dáng.',
    anatomy: {
      collarType: 'Cổ giao lĩnh mở ngực khoe yếm đào tế nhị',
      sleeveType: 'Tay chẽn lửng xắn cao gọn gàng, duyên dáng',
      flapStructure: 'Bốn vạt (hai vạt sau may liền sống áo, hai vạt trước buộc thắt)',
      fastenerType: 'Buộc vạt trước bụng và giữ bằng dải lụa thắt lưng',
    },
    features: [
      'Bốn vạt áo buông rủ bay bổng theo từng bước đi',
      'Yếm đào thêu hoa sen nữ tính e ấp bên trong',
      'Thắt lưng lụa ngũ sắc buông thả trước eo thon thả',
    ],
    vibe: 'Duyên dáng, mộc mạc, trữ tình đậm đà tình quê',
    confucianMeaning: 'Tứ thân tượng trưng cho bốn đấng sinh thành phụ mẫu dưỡng dục; dải yếm yểu điệu tượng trưng nét nết na tần tảo.',
    historicalTrivia: 'Áo Tứ Thân gắn liền với các làn điệu Quan họ Kinh Bắc, nơi câu hát giao duyên gửi gắm ân tình son sắt.',
    etiquetteRules: 'Vạt trước buộc thắt khéo léo ngang eo, nón quai thao cầm nghiêng che mặt e ấp.',
    heritageArtifactLocation: 'Bảo tàng Phụ nữ Việt Nam (Hà Nội)',
    suitableOccasions: ['retro_street', 'tet', 'graduation'],
  },
  {
    id: 'giao_linh',
    name: 'Áo Giao Lĩnh',
    hanTuName: '襖交領 (Cổ Giao Lĩnh Lê - Lý)',
    dynasty: 'Thời Lê - Lý - Trần',
    dynastyPeriod: 'Thế kỷ 11 – 18',
    century: 'Thế kỷ 15 – 18',
    formality: 'Lễ phục & Thường phục cổ truyền',
    socialClass: 'Quý tộc, quan viên, kẻ sĩ văn nhân',
    description: 'Trang phục cổ vạt chéo đè lên nhau, tay thụng rộng, mang dấu ấn lịch sử rực rỡ của các triều đại hưng thịnh Lý, Trần, Hậu Lê.',
    anatomy: {
      collarType: 'Giao lĩnh (hai vạt chéo nhau tạo góc chữ V thanh thoát)',
      sleeveType: 'Tay thụng rộng bay bổng uyển chuyển',
      flapStructure: 'Vạt áo dài rộng che kín thân dưới',
      fastenerType: 'Dây đai lụa buộc ngang hông hoặc nách',
    },
    features: [
      'Cổ áo giao nhau trang nhã mang phong vị ngàn năm',
      'Tay áo thụng rộng rủ mềm mại theo cử động',
      'Vạt áo dài thướt tha uyển chuyển',
    ],
    vibe: 'Cổ kính, tráng lệ, phong vị tiền triều',
    confucianMeaning: 'Tượng trưng cho sự tương giao hòa hợp của trời đất, âm dương cân đối.',
    historicalTrivia: 'Tranh tượng thời Hậu Lê tại các chùa cổ (như tượng chùa Dâu, chùa Bút Tháp) lưu giữ nhiều dấu tích sống động của áo Giao Lĩnh.',
    etiquetteRules: 'Thường mặc kèm thường (váy quây) và đai lưng lụa bản to, dáng đi thư thái khoan thai.',
    heritageArtifactLocation: 'Bảo tàng Lịch sử Quốc gia & Di tích Cố đô Lam Kinh',
    suitableOccasions: ['diplomatic', 'temple', 'tet'],
  },
  {
    id: 'vien_linh',
    name: 'Áo Viên Lĩnh',
    hanTuName: '襖圓領 (Cổ Tròn Hoàng Triều)',
    dynasty: 'Thời Tiền Lê - Lý - Trần',
    dynastyPeriod: 'Thế kỷ 10 – 15',
    century: 'Thế kỷ 11 – 15',
    formality: 'Triều phục & Quân phục quý tộc',
    socialClass: 'Đế vương, tướng soái, quan viên triều nghi',
    description: 'Áo cổ tròn ôm sát chân cổ cài nút bên vai phải, vạt xẻ cạnh, toát lên vẻ oai phong lẫm liệt của thời kỳ hào khí Đông A.',
    anatomy: {
      collarType: 'Viên lĩnh (cổ tròn viền cao ôm khít chân cổ)',
      sleeveType: 'Tay thụng hoặc chẽn linh hoạt theo chức năng',
      flapStructure: 'Thân áo dài có cơi vạt che kín khuy cài',
      fastenerType: 'Khuy ngọc cài cạnh cổ bên vai phải',
    },
    features: [
      'Cổ tròn gọn gàng, khỏe khoắn',
      'Bổ tử hoặc thêu hoa văn mây rồng trước ngực',
      'Thắt đai ngọc bản to uy nghi',
    ],
    vibe: 'Hào hùng, khí phách, uy phong lẫm liệt',
    confucianMeaning: 'Viên lĩnh biểu trưng trời tròn (Càn), che chở bốn phương vạn dân an lạc.',
    historicalTrivia: 'Trang phục thịnh hành của quan viên Đại Việt thời Lý - Trần trong các bức tượng và bia đá bảo vật quốc gia.',
    etiquetteRules: 'Đội mũ phác đầu hoặc khăn bịt đầu, tay cầm hốt ngà hoặc quạt xếp đĩnh đạc.',
    heritageArtifactLocation: 'Bảo tàng Hà Nội & Khu di tích Hoàng thành Thăng Long',
    suitableOccasions: ['diplomatic', 'retro_street'],
  },
];

export const COLORS: ColorItem[] = [
  // 1. Ngũ Hành Triều Nguyễn
  {
    id: 'red_cinnabar',
    name: 'Đỏ Chu Sa (Hỏa)',
    hanTuName: '朱砂紅',
    category: 'ngu_hanh',
    element: 'Hỏa',
    meaning: 'Tượng trưng cho mặt trời, ngọn lửa sinh khí, may mắn hưng thịnh và quyền uy.',
    royalRule: 'Chánh sắc triều đình, dùng trong hôn lễ quý tộc và đại lễ tế tự.',
    hex: '#C0292B',
    accentHex: '#E57373',
    pantHex: '#F7F5EE',
    pantName: 'Quần lụa trắng tuyết',
    pantColor: 'Trắng Ngà',
    suggestedFabrics: ['Gấm Bảo Lộc', 'Sa Chiffon', 'Lụa Hà Đông'],
  },
  {
    id: 'gold_hoang_yen',
    name: 'Vàng Hoàng Yến (Thổ)',
    hanTuName: '黄燕色',
    category: 'ngu_hanh',
    element: 'Thổ',
    meaning: 'Biểu trưng trung tâm vũ trụ, đất đai trù phú, sự thịnh vượng và phúc lộc viên mãn.',
    royalRule: 'Sắc vàng óng quý phái; màu vàng hoàng yến dịu nhẹ thích hợp cho đại lễ và dạo phố.',
    hex: '#D4AF37',
    accentHex: '#FDE047',
    pantHex: '#262626',
    pantName: 'Quần lụa the đen tuyền',
    pantColor: 'Đen Tuyển',
    suggestedFabrics: ['Gấm hoa', 'Lụa tơ tằm'],
  },
  {
    id: 'blue_thien_thanh',
    name: 'Xanh Thiên Thanh (Thủy)',
    hanTuName: '天青色',
    category: 'ngu_hanh',
    element: 'Thủy',
    meaning: 'Sắc xanh da trời sau cơn mưa, thanh khiết, ôn hòa, tượng trưng dòng nước nguồn cội vô tận.',
    royalRule: 'Màu nhã nhặn của kẻ sĩ trí thức và quý cô thanh lịch.',
    hex: '#2B5B84',
    accentHex: '#93C5FD',
    pantHex: '#F7F5EE',
    pantName: 'Quần lụa trắng tuyết',
    pantColor: 'Trắng Ngà',
    suggestedFabrics: ['Lụa Hà Đông', 'Đũi tơ tằm'],
  },
  {
    id: 'white_bach',
    name: 'Trắng Bạch Ngọc (Kim)',
    hanTuName: '白玉色',
    category: 'ngu_hanh',
    element: 'Kim',
    meaning: 'Tượng trưng cho sự tinh khiết, đoan chính, tâm hồn trong sáng và tiết hạnh vô ngần.',
    royalRule: 'Màu truyền thống của trang phục nữ sinh và nghi thức thanh tịnh.',
    hex: '#F7F5EE',
    accentHex: '#D4AF37',
    pantHex: '#1E1E1E',
    pantName: 'Quần lụa the đen huyền',
    pantColor: 'Đen Huyền',
    suggestedFabrics: ['Lụa tơ tằm Hà Đông', 'Sa mỏng'],
  },
  {
    id: 'green_luc',
    name: 'Xanh Lục Diệp (Mộc)',
    hanTuName: '綠葉色',
    category: 'ngu_hanh',
    element: 'Mộc',
    meaning: 'Tượng trưng cho mầm xanh cây cỏ, sức sống đâm chồi nảy lộc và sự trường tồn sinh sôi.',
    royalRule: 'Thường phục mùa xuân được ưa chuộng khắp chốn cung đình lẫn thôn dã.',
    hex: '#2E6F40',
    accentHex: '#86EFAC',
    pantHex: '#F7F5EE',
    pantName: 'Quần lụa trắng',
    pantColor: 'Trắng Ngà',
    suggestedFabrics: ['Lụa Vạn Phúc', 'Gấm'],
  },

  // 2. Sắc Màu Cung Đình & Quý Tộc
  {
    id: 'purple_hue',
    name: 'Tím Cung Đình Huế',
    hanTuName: '紫宮色',
    category: 'cung_dinh',
    element: 'Thủy',
    meaning: 'Sắc màu đặc trưng của đất Cố đô, trầm mặc, thủy chung, kín đáo và quý phái.',
    royalRule: 'Màu trang phục danh dự của các bậc công thần và mệnh phụ triều đình.',
    hex: '#5E2B68',
    accentHex: '#D4AF37',
    pantHex: '#F7F5EE',
    pantName: 'Quần lụa trắng ngà',
    pantColor: 'Trắng Ngà',
    suggestedFabrics: ['Lụa tơ tằm', 'Nhung gấm'],
  },
  {
    id: 'red_dieu',
    name: 'Đỏ Điều Phẩm Phục',
    hanTuName: '紅條品服',
    category: 'cung_dinh',
    element: 'Hỏa',
    meaning: 'Màu đỏ sẫm trầm ấm, biểu trưng hỷ khí, phẩm cấp cao quý trong triều đình.',
    royalRule: 'Dành cho áo Nhật Bình của Công chúa và Hỷ phục đại hôn.',
    hex: '#8E1823',
    accentHex: '#FFD700',
    pantHex: '#F7F5EE',
    pantName: 'Quần lụa trắng',
    pantColor: 'Trắng Ngà',
    suggestedFabrics: ['Gấm cung đình', 'Nhung'],
  },
  {
    id: 'pink_lotus',
    name: 'Hồng Sen Thắm',
    hanTuName: '蓮花紅',
    category: 'cung_dinh',
    element: 'Hỏa',
    meaning: 'Sắc sen thơm ngát hồ Tịnh Tâm, e ấp, duyên dáng, nữ tính.',
    royalRule: 'Màu ưa chuộng của các cung tần và quý thư đài các.',
    hex: '#D95276',
    accentHex: '#FBCFE8',
    pantHex: '#F7F5EE',
    pantName: 'Quần lụa trắng',
    pantColor: 'Trắng Ngà',
    suggestedFabrics: ['Lụa tơ tằm', 'Sa Chiffon'],
  },

  // 3. Bảng Màu Pastel Cách Tân
  {
    id: 'pastel_suong_mai',
    name: 'Hồng Phấn Sương Mai',
    hanTuName: '朝露粉',
    category: 'pastel',
    element: 'Hỏa',
    meaning: 'Nhẹ nhàng như giọt sương mai đọng trên cánh hoa, thanh lịch thời thượng.',
    royalRule: 'Phù hợp phối đồ hiện đại, chụp ảnh ngoại cảnh.',
    hex: '#E8A598',
    accentHex: '#FFF1F2',
    pantHex: '#F7F5EE',
    pantName: 'Quần lụa ngà',
    pantColor: 'Trắng Ngà',
    suggestedFabrics: ['Sa mỏng', 'Lụa tơ'],
  },
  {
    id: 'smoke_blue',
    name: 'Xanh Khói Lam Chiều',
    hanTuName: '嵐煙青',
    category: 'pastel',
    element: 'Thủy',
    meaning: 'Làn khói lam chiều bảng lảng sông Hương, trầm tĩnh và mang chiều sâu thi ca.',
    royalRule: 'Phong cách tối giản đương đại, trang nhã.',
    hex: '#7A9A95',
    accentHex: '#CFFAFE',
    pantHex: '#1E1E1E',
    pantName: 'Quần đen tuyền',
    pantColor: 'Đen Tuyển',
    suggestedFabrics: ['Đũi Nam Cao', 'Lụa'],
  },
  {
    id: 'pastel_vang_mo',
    name: 'Vàng Mơ Nắng Nhạt',
    hanTuName: '淡杏黄',
    category: 'pastel',
    element: 'Thổ',
    meaning: 'Ánh nắng thu dìu dịu sưởi ấm kinh thành, thanh tao và ấm áp.',
    royalRule: 'Gam màu an toàn tuyệt đối cho mọi làn da và không gian.',
    hex: '#E5C158',
    accentHex: '#FEF08A',
    pantHex: '#F7F5EE',
    pantName: 'Quần lụa trắng',
    pantColor: 'Trắng Ngà',
    suggestedFabrics: ['Lụa Hà Đông', 'Đũi'],
  },
  {
    id: 'brown_tram',
    name: 'Nâu Trầm Trầm Hương',
    hanTuName: '沉香褐',
    category: 'pastel',
    element: 'Thổ',
    meaning: 'Màu mộc mạc của đất mẹ và hương trầm cổ kính, an yên thanh tịnh.',
    royalRule: 'Tuyệt hảo cho không gian chùa chiền hoặc phong cách thiền vị.',
    hex: '#6B4C35',
    accentHex: '#D4AF37',
    pantHex: '#F7F5EE',
    pantName: 'Quần trắng kem',
    pantColor: 'Trắng Kem',
    suggestedFabrics: ['Đũi tơ tằm', 'Linen'],
  },
];

export const FABRICS: Fabric[] = [
  {
    id: 'silk_ha_dong',
    name: 'Lụa Tơ Tằm Hà Đông',
    originVillage: 'Làng lụa Vạn Phúc (Hà Đông, Hà Nội) - hơn 1000 năm lịch sử',
    texture: 'Mịn màng như làn mây, óng ánh tự nhiên, mềm rủ chạm vào mát lạnh',
    element: 'Kim',
    shine: 75,
    breathability: 'Rất cao, đông ấm hè mát điều hòa thân nhiệt',
    seasonRecommendation: 'Xuân, Thu, Hạ mát',
    careInstructions: 'Giặt tay bằng dầu gội đầu hoặc xà phòng dịu nhẹ, phơi nơi râm mát, là ủi ở nhiệt độ thấp.',
  },
  {
    id: 'brocade_gam',
    name: 'Gấm Hoa Cung Đình Bảo Lộc',
    originVillage: 'Kinh đô tơ tằm Bảo Lộc (Lâm Đồng) & Gấm tiến vua Thừa Thiên Huế',
    texture: 'Dày dặn, bề mặt dệt hoa văn chìm nổi tinh xảo, giữ phom áo đứng chuẩn mực',
    element: 'Thổ',
    shine: 85,
    breathability: 'Trung bình, dày dặn giữ nhiệt tốt',
    seasonRecommendation: 'Thu đông, Đại lễ trang trọng',
    careInstructions: 'Giặt khô chuyên dụng để giữ độ bóng của sợi tơ và họa tiết kim tuyến.',
  },
  {
    id: 'sa_chiffon',
    name: 'Sa Tơ Mỏng Nam Định',
    originVillage: 'Làng dệt Sa Cổ Chất (Nam Định) truyền đời',
    texture: 'Mỏng nhẹ bay bổng, có độ xuyên thấu bán phần tạo lớp lang huyền ảo',
    element: 'Thủy',
    shine: 45,
    breathability: 'Cực kỳ thoáng khí, siêu nhẹ',
    seasonRecommendation: 'Xuân hè, khí hậu nhiệt đới',
    careInstructions: 'Tránh cọ xát vật sắc nhọn, giặt nhẹ nhàng trong túi lưới.',
  },
  {
    id: 'linen_dui',
    name: 'Đũi Tơ Tằm Tự Nhiên',
    originVillage: 'Làng đũi Nam Cao (Thái Bình)',
    texture: 'Sợi đũi dệt thủ công mộc mạc, gợn sợi tự nhiên, càng giặt càng mềm mại',
    element: 'Mộc',
    shine: 20,
    breathability: 'Thoáng mát tuyệt đối, hút ẩm tốt',
    seasonRecommendation: 'Mùa hè và dạo phố thường nhật',
    careInstructions: 'Giặt nước mát, phơi tự nhiên không vắt kiệt để sợi đũi giữ cấu trúc mềm.',
  },
  {
    id: 'velvet_nhung',
    name: 'Nhung Gấm Cung Đình',
    originVillage: 'Kỹ nghệ dệt nhung cổ truyền Kinh Bắc & Cung đình Huế',
    texture: 'Tuyết nhung mềm mượt, sâu thẳm, óng ánh quý phái khi bắt ánh sáng',
    element: 'Hỏa',
    shine: 90,
    breathability: 'Dày ấm, giữ nhiệt cao',
    seasonRecommendation: 'Đông lạnh, Lễ đón Tết rét ngọt',
    careInstructions: 'Hấp nhiệt chuyên dụng, treo móc đệm vai tránh gấp nếp làm gãy tuyết nhung.',
  },
  {
    id: 'lotus_silk',
    name: 'Tơ Sen Đồng Tháp',
    originVillage: 'Làng nghề dệt tơ cuống sen Đồng Tháp & Phan Thiết',
    texture: 'Dệt thủ công từ hàng ngàn cuống sen, thoang thoảng hương thơm tự nhiên',
    element: 'Thủy',
    shine: 60,
    breathability: 'Cực phẩm tơ quý cao cấp, siêu nhẹ và êm dịu',
    seasonRecommendation: 'Bốn mùa quanh năm',
    careInstructions: 'Chăm sóc thủ công cẩn trọng như báu vật nghệ nhân.',
  },
];

export const ORIGINAL_DETAILS: OriginalDetail[] = [
  {
    id: 'five_buttons',
    name: 'Khuy Cài Ngũ Thường',
    dynasty: 'Nho gia Việt',
    meaning: 'Năm hạt cúc tượng trưng cho Ngũ Thường đạo làm người: Nhân, Lễ, Nghĩa, Trí, Tín.',
    icon: '✨',
    historicalContext: 'Cài khuy ngay ngắn nhắc nhở người mặc giữ gìn phẩm hạnh và phép tắc đối nhân xử thế.',
  },
  {
    id: 'lap_linh_collar',
    name: 'Cổ Đứng Lập Lĩnh',
    dynasty: 'Triều Nguyễn',
    meaning: 'Cổ áo đứng vuông góc ôm sát chân cổ, thể hiện sự đứng đắn, ngay thẳng và đoan chính.',
    icon: '📐',
    historicalContext: 'Được định hình qua các đợt cải cách trang phục của Chúa Nguyễn và Vua Minh Mạng.',
  },
  {
    id: 'nhat_binh_kerchief',
    name: 'Viền Cổ Ngũ Sắc Nhật Bình',
    dynasty: 'Cung đình Huế',
    meaning: 'Dải viền năm màu đại diện cho Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) cân bằng vũ trụ.',
    icon: '🎨',
    historicalContext: 'Thể hiện trật tự âm dương và uy quyền của nữ nhân hoàng gia triều Nguyễn.',
  },
  {
    id: 'tu_than_knot',
    name: 'Buộc Vạt Áo Tứ Thân',
    dynasty: 'Dân gian Bắc Bộ',
    meaning: 'Hai vạt trước buộc thắt duyên dáng tượng trưng cho sự gắn kết lứa đôi son sắt.',
    icon: '🎀',
    historicalContext: 'Hình ảnh quen thuộc trong văn học dân gian và câu hát quan họ Kinh Bắc.',
  },
  {
    id: 'ngoc_boi_trieu_nguyen',
    name: 'Ngọc Bội Thắt Lưng Hoàng Gia',
    dynasty: 'Triều Nguyễn',
    meaning: 'Dây kết ngọc rủ dài va chạm tạo tiếng leng keng thanh tao, nhắc nhở bước đi khoan thai.',
    icon: '💎',
    historicalContext: 'Phụ kiện điển chế của bậc quyền quý hoàng cung.',
  },
];

export const REMIX_ACCESSORIES: RemixAccessory[] = [
  {
    id: 'retro_sunglasses',
    name: 'Kính Râm Thời Trang',
    tag: 'Hiện Đại Phá Cách',
    category: 'hand',
    desc: 'Điểm nhấn thời trang đương đại phối cùng phom áo truyền thống, tạo diện mạo ấn tượng khi dạo phố.',
  },
  {
    id: 'combat_boots',
    name: 'Giày Bốt Da Cổ Cao',
    tag: 'Năng Động Trẻ Trung',
    category: 'footwear',
    desc: 'Đế cao mạnh mẽ mang lại nét tương phản cá tính, trẻ trung cho tà áo cổ truyền.',
  },
  {
    id: 'silk_fan',
    name: 'Quạt Xếp Cầm Tay Khảm Trai',
    tag: 'Cổ Điển Tinh Tế',
    category: 'hand',
    desc: 'Phụ kiện cầm tay tao nhã khảm xà cừ, tạo dáng e ấp đầy chất thơ di sản.',
  },
  {
    id: 'khan_van',
    name: 'Khăn Vấn Cách Tân',
    tag: 'Tối Giản Tinh Tế',
    category: 'head',
    desc: 'Nếp vấn bằng lụa hoặc nhung thiết kế tinh gọn theo xu hướng thời trang đương đại.',
  },
  {
    id: 'tote_gam',
    name: 'Túi Gấm Thêu Cung Đình',
    tag: 'Tiện Dụng Phố Thị',
    category: 'hand',
    desc: 'Túi xách dệt gấm hoa sen hoa cúc phối quai da thanh lịch, tiện lợi chứa đồ khi ra phố.',
  },
  {
    id: 'pearl_modern_choker',
    name: 'Vòng Cổ Choker Ngọc Trai',
    tag: 'Tiểu Thư Đài Các',
    category: 'head',
    desc: 'Chuỗi ngọc trai ôm sát cổ áo lập lĩnh, tạo điểm nhấn kiêu sa hiện đại.',
  },
];

export const HEADPIECES: Headpiece[] = [
  {
    id: 'none',
    name: 'Tóc Tự Nhiên Buông Xõa / Búi Gọn',
    genderFit: 'unisex',
    desc: 'Phong cách tối giản, nhẹ nhàng thích hợp cho dạo phố hằng ngày.',
  },
  {
    id: 'man_lua',
    name: 'Khăn Vành Dây Hoàng Cung',
    genderFit: 'female',
    desc: 'Khăn xếp nhiều vòng bằng lụa quý hoặc gấm dát vàng, đỉnh cao lễ phục nữ triều Nguyễn.',
    etiquetteNote: 'Thường mặc cùng Áo Nhật Bình hoặc Áo Tấc trong đại hôn.',
  },
  {
    id: 'tram_cai_toc_ngoc',
    name: 'Trâm Cài Tóc Phượng Hoàng Khảm Ngọc',
    genderFit: 'female',
    desc: 'Trâm vàng chạm phượng ngậm hạt ngọc rủ nhẹ bên mái tóc tiểu thư đài các.',
    etiquetteNote: 'Cài nghiêng bên búi tóc sau, buông nhẹ sợi tua rua tơ tằm óng ả.',
  },
  {
    id: 'khan_dong',
    name: 'Khăn Đóng Nam Giới (7 nếp chữ Nhất)',
    genderFit: 'male',
    desc: 'Khăn xếp hình chữ Nhân hoặc chữ Nhất, tôn vinh dáng vẻ đĩnh đạc của đấng nam nhi quân tử.',
    etiquetteNote: 'Đội ngay ngắn trước trán, hơi chếch nhẹ về phía sau.',
  },
  {
    id: 'khan_dong_hoang_gia',
    name: 'Khăn Đóng Hoàng Gia Dát Kim Tuyến',
    genderFit: 'male',
    desc: 'Khăn gấm dệt chỉ vàng 9 nếp dành cho bậc vương giả và đại lễ trang trọng bậc nhất.',
    etiquetteNote: 'Thường mặc cùng Áo Tấc hoặc Viên Lĩnh hoàng triều.',
  },
  {
    id: 'khan_van',
    name: 'Khăn Vấn Lụa / Nhung Nữ',
    genderFit: 'female',
    desc: 'Khăn vấn quanh đầu gọn gàng bằng lụa Hà Đông, mang vẻ đẹp phụ nữ kinh kỳ xưa.',
  },
  {
    id: 'non_quai_thao',
    name: 'Nón Quai Thao (Nón Ba Tầm)',
    genderFit: 'female',
    desc: 'Chiếc nón tròn phẳng rộng vành thắt quai thao thao lụa mềm mại, biểu tượng phụ nữ Kinh Bắc.',
  },
  {
    id: 'non_la_sen',
    name: 'Nón Lá Sen Xứ Huế',
    genderFit: 'unisex',
    desc: 'Chiếc nón lá thanh thoát làm từ lá sen tự nhiên, tỏa bóng mát dịu dàng che nghiêng vành nón.',
  },
  {
    id: 'mu_phac_dau',
    name: 'Mũ Phác Đầu Quan Viên Đại Việt',
    genderFit: 'male',
    desc: 'Mũ phác đầu hai cánh chuồn oai vệ của quan viên triều Lê - Lý - Trần, toát lên phong thái uy nghiêm đĩnh đạc.',
    etiquetteNote: 'Chuẩn mực triều phục khi diện cùng Áo Viên Lĩnh hoặc Áo Giao Lĩnh.',
  },
  {
    id: 'vuong_mien_hoang_hau',
    name: 'Mũ Miện Hoàng Tộc Dát Vàng',
    genderFit: 'female',
    desc: 'Mũ miện chạm trổ kim long phượng vũ dát ngọc bích lộng lẫy của bậc Mẫu nghi thiên hạ.',
    etiquetteNote: 'Điển chế tối cao của hậu cung khi diện cùng Áo Nhật Bình trong đại lễ đăng quang.',
  },
];

export const JEWELRIES: Jewelry[] = [
  {
    id: 'none',
    name: 'Không đeo trang sức',
    desc: 'Tối giản thuần khiết, tôn vinh trọn vẹn đường nét cổ áo.',
    genderFit: 'unisex',
  },
  {
    id: 'silver_kieng',
    name: 'Kiềng Bạc Chạm Hoa Mai',
    desc: 'Chiếc kiềng tròn ôm chân cổ chạm khắc hoa mai tinh xảo, biểu tượng của sự thuần hậu.',
    genderFit: 'female',
    maleAltName: 'Khánh Bạc Chạm Khắc Cung Đình',
    maleAltDesc: 'Mề đay khánh bạc chạm hoa văn kỷ hà trang trọng cài nơi ngực áo.',
    placementNote: 'Đeo sát dưới chân cổ áo lập lĩnh, tạo đường cong tương phản với cổ vuông.',
    material: 'Bạc ta 99.9% chạm khắc thủ công',
  },
  {
    id: 'gold_kieng',
    name: 'Kiềng Vàng Ngũ Phúc',
    desc: 'Kiềng vàng đúc nổi họa tiết Ngũ Phúc Lâm Môn (năm con dơi ngậm đồng tiền) quý tộc.',
    genderFit: 'female',
    maleAltName: 'Thẻ Bài Gỗ Quý Khảm Vàng',
    maleAltDesc: 'Thẻ bài khắc chữ Nho may mắn mang phong thái nho sinh đỗ đạt.',
    placementNote: 'Tỏa sáng rạng ngời trong các dịp lễ tết và đại hôn mừng duyên.',
    material: 'Vàng 18K / 24K dát nổi',
  },
  {
    id: 'pearl_necklace',
    name: 'Chuỗi Ngọc Trai Tự Nhiên',
    desc: 'Chuỗi hạt ngọc tròn đều bóng bẩy, phong thái tiểu thư đài các tao nhã.',
    genderFit: 'female',
    maleAltName: 'Chuỗi Tràng Hạt Trầm Hương Cổ',
    maleAltDesc: 'Tràng hạt trầm hương tự nhiên thoang thoảng hương thơm thanh tao.',
    placementNote: 'Buông dài qua ngực áo, tạo chiều sâu mềm mại cho vạt áo.',
    material: 'Ngọc trai nước ngọt / Trầm hương tự nhiên',
  },
  {
    id: 'jade_pendant',
    name: 'Ngọc Bội Dây Kết Như Ý',
    desc: 'Miếng ngọc bích chạm rỗng dây tơ kết hoa mai, mang ý nghĩa vạn sự như ý.',
    genderFit: 'unisex',
    placementNote: 'Đeo rủ bên sườn áo hoặc cài khuy áo thứ hai.',
    material: 'Ngọc bích phỉ thúy & Dây tơ tằm thủ công',
  },
  {
    id: 'the_bai_nga',
    name: 'Thẻ Bài Hoàng Gia Khảm Vàng',
    desc: 'Thẻ bài ngọc hoặc ngà dát vàng khắc chữ Cát Tường phong thái hoàng thất.',
    genderFit: 'unisex',
    maleAltName: 'Thẻ Bài Quan Viên Triều Nguyễn',
    maleAltDesc: 'Thẻ bài phẩm hàm quan lại triều đình cài trang trọng trước ngực.',
    placementNote: 'Cài dây thắt ngọc buông dọc vạt áo phải.',
    material: 'Ngà khảm vàng 24K',
  },
  {
    id: 'chuoi_tram_huong_108',
    name: 'Chuỗi Trầm Hương 108 Hạt',
    desc: 'Chuỗi tràng hạt trầm hương Khánh Hòa tự nhiên, xua tan phiền não mang bình an cát tường.',
    genderFit: 'unisex',
    placementNote: 'Quấn vòng cổ tay hoặc buông nhẹ trước ngực áo.',
    material: 'Trầm hương tự nhiên 100%',
  },
  {
    id: 'vong_ngoc_cam_thach',
    name: 'Vòng Ngọc Cẩm Thạch Phỉ Thúy',
    desc: 'Chiếc vòng ngọc xanh ngọc bích đeo tay mát lạnh, tượng trưng cho đức hạnh và phú quý.',
    genderFit: 'female',
    placementNote: 'Đeo bên cổ tay mềm mại lấp ló sau tà áo.',
    material: 'Ngọc cẩm thạch thiên nhiên',
  },
  {
    id: 'hoa_tai_vang_trieu_nguyen',
    name: 'Hoa Tai Vàng Giọt Ngọc Cung Đình',
    desc: 'Đôi hoa tai vàng ta đính giọt ngọc bích buông nhẹ bên mang tai quý phái kiêu kỳ.',
    genderFit: 'female',
    placementNote: 'Lấp lánh bên vành tai, tăng vẻ đài các cho nữ nhân hoàng triều.',
    material: 'Vàng 24K & Ngọc Bích tự nhiên',
  },
  {
    id: 'khuyen_tai_bac_hoa_cuc',
    name: 'Khuyên Tai Bạc Chạm Hoa Cúc Cổ',
    desc: 'Đôi khuyên bạc chạm hoa cúc thời Lý tinh tế, thanh tao mộc mạc.',
    genderFit: 'unisex',
    placementNote: 'Cài tai phong cách cổ trang Đại Việt.',
    material: 'Bạc ta 99.9%',
  },
];

export const HANDHELDS: Handheld[] = [
  {
    id: 'none',
    name: 'Tay Thả Tự Nhiên',
    desc: 'Khoanh tay đoan trang trước bụng hoặc buông nhẹ theo thân áo.',
  },
  {
    id: 'silk_fan',
    name: 'Quạt The Tranh Thủy Mặc',
    desc: 'Quạt xếp nan trúc bọc the vẽ hoa sen hoặc thư pháp chữ Hán tao nhã.',
    icon: '🪭',
  },
  {
    id: 'o_giay_dau',
    name: 'Ô Giấy Dầu Cổ Trang Vẽ Thủy Mặc',
    desc: 'Chiếc ô giấy dầu truyền thống xòe bóng nghiêng, che nắng tạo nét thi vị hữu tình.',
    icon: '☂️',
  },
  {
    id: 'quat_long_chim',
    name: 'Quạt Lông Công Hoàng Cung',
    desc: 'Quạt kết lông công ngũ sắc lộng lẫy, biểu tượng quyền quý của bậc Hoàng gia.',
    icon: '🦚',
  },
  {
    id: 'hoa_sen_cam_tay',
    name: 'Búp Hoa Sen Hồng Tươi',
    desc: 'Cành hoa sen thơm ngát thanh khiết cầm tay, tượng trưng quốc hoa và nét thuần hậu.',
    icon: '🪷',
  },
  {
    id: 'canh_hoa_mai_tet',
    name: 'Cành Hoa Mai Vàng Du Xuân',
    desc: 'Cành hoa mai vàng đượm sắc xuân khoe nụ rực rỡ, mang sinh khí thịnh vượng ngày Tết.',
    icon: '🌼',
  },
  {
    id: 'kiem_le_phuc_trieu_dinh',
    name: 'Kiếm Lễ Triều Đình Vỏ Khảm Trai',
    desc: 'Thanh bảo kiếm nghi lễ vỏ gỗ quý khảm xà cừ thắt dải lụa đỏ, biểu trưng cho uy dũng của tướng sĩ triều đình.',
    icon: '🗡️',
  },
  {
    id: 'rattan_bag',
    name: 'Túi Mây Đan Thủ Công',
    desc: 'Chất liệu tự nhiên thân thiện môi trường, gợi cảm giác mộc mạc thư thái.',
    icon: '🧺',
  },
  {
    id: 'tote_gam',
    name: 'Túi Gấm Thêu Tay Cung Đình',
    desc: 'Túi xách lụa gấm thêu hoa cúc và chim hạc tinh xảo, phong thái quý cô.',
    icon: '👜',
  },
  {
    id: 'sach_co_thu_phap',
    name: 'Sách Cổ Khâu Chỉ & Bút Lông',
    desc: 'Cuốn sách cổ Nho gia cùng phong thái trí thức đĩnh đạc của bậc danh sĩ.',
    icon: '📜',
  },
  {
    id: 'retro_sunglasses',
    name: 'Kính Râm Thời Trang Hiện Đại',
    desc: 'Phụ kiện đương đại tạo vẻ ngoài tương phản cực chất khi chụp ảnh ngoại cảnh.',
    icon: '🕶️',
  },
];

export const FOOTWEARS: Footwear[] = [
  {
    id: 'wooden_clogs',
    name: 'Guốc Mộc Quai Da Xưa',
    desc: 'Âm thanh lách cách của guốc mộc trên sân gạch Bát Tràng gợi nhớ hồn quê xưa.',
  },
  {
    id: 'guoc_moc_son_son',
    name: 'Guốc Mộc Sơn Son Thếp Vàng',
    desc: 'Guốc gỗ sơn son bóng bẩy viền hoa văn vàng dát mỏng, phong cách quyền quý kinh thành.',
  },
  {
    id: 'hai_theu_rong_phuong',
    name: 'Hài Thêu Rồng Phượng Mũi Cong',
    desc: 'Đôi hài gấm mũi vểnh chạm mây rồng phượng hoàng cung, bước đi thanh thoát quyền uy.',
  },
  {
    id: 'hai_nhung_theu_hac',
    name: 'Hài Nhung Đỏ Thêu Chim Hạc',
    desc: 'Đôi hài nhung đỏ thắm mũi cong thêu chỉ bạc hình chim hạc thanh cao, bước chân nhẹ êm quyền quý.',
  },
  {
    id: 'satin_heels',
    name: 'Giày Cao Gót Lụa Satin',
    desc: 'Tôn vinh dáng vóc thanh mảnh, giúp tà áo dài buông rủ thướt tha uyển chuyển.',
  },
  {
    id: 'combat_boots',
    name: 'Giày Bốt Da Cổ Cao Hiện Đại',
    desc: 'Nét tương phản thời trang mạnh mẽ, đậm chất Gen Z đương đại.',
  },
  {
    id: 'ballet_embroidered',
    name: 'Hài Thêu Hoa Sen Mũi Cong',
    desc: 'Đôi hài cổ mũi cong thêu hoa cúc, bước chân nhẹ tênh như lướt trên mây.',
  },
  {
    id: 'giay_tay_oxford',
    name: 'Giày Da Oxford Đông Dương',
    desc: 'Đôi giày da bóng bẩy lịch thiệp của quý ông trí thức thời kỳ giao lưu văn hóa Á - Âu.',
  },
];

export const VISUAL_EFFECTS = [
  { id: 'none', name: 'Không hiệu ứng', icon: '🚫', desc: 'Khung cảnh tĩnh lặng tập trung vào phom áo' },
  { id: 'petals_peach', name: 'Hoa Đào Hồng Rơi', icon: '🌸', desc: 'Cánh hoa đào mùa xuân bay lượn trong gió Tết' },
  { id: 'petals_apricot', name: 'Hoa Mai Vàng Rơi', icon: '🌼', desc: 'Sắc vàng hoàng mai xứ Huế rực rỡ cát tường' },
  { id: 'gold_dust', name: 'Bụi Vàng Cung Đình', icon: '✨', desc: 'Hạt ánh kim lấp lánh như dát vàng hoàng cung' },
  { id: 'bamboo_leaves', name: 'Lá Trúc Lãng Đãng', icon: '🍃', desc: 'Những phiến lá trúc xanh bay nhẹ thanh tịnh' },
  { id: 'fireflies_night', name: 'Đom Đóm Hoàng Thành', icon: '🏮', desc: 'Những đốm lửa xanh lục lập lòe huyền ảo trong đêm' },
  { id: 'lotus_petals', name: 'Cánh Sen Hồng Thanh Khiết', icon: '🪷', desc: 'Cánh hoa sen hồng dịu dàng rơi chậm trong không gian' },
  { id: 'cherry_rain', name: 'Mưa Bụi Kinh Bắc', icon: '🌧️', desc: 'Mưa phùn xuân lất phất mờ sương tạo chiều sâu thơ mộng' },
] as const;

export const LIGHTING_PRESETS = [
  { id: 'daylight', name: 'Ánh Dương Ban Ngày', icon: '☀️', color: 'rgba(255, 250, 240, 0.15)' },
  { id: 'sunset', name: 'Hoàng Hôn Cố Đô', icon: '🌅', color: 'rgba(235, 120, 80, 0.22)' },
  { id: 'lantern_night', name: 'Đèn Lồng Phố Đêm', icon: '🏮', color: 'rgba(245, 160, 40, 0.28)' },
  { id: 'moonlight', name: 'Trăng Rằm Cố Đô', icon: '🌙', color: 'rgba(147, 197, 253, 0.20)' },
  { id: 'atelier', name: 'Studio Tranh Vẽ', icon: '🎨', color: 'transparent' },
] as const;

export const BACKGROUNDS: BackgroundItem[] = [
  {
    id: 'san_dinh',
    name: 'Sân Đình Cổ & Mái Ngói Rêu Phong',
    tag: 'Truyền Thống',
    icon: '🏛️',
    ambianceHex: '#F4ECE1',
  },
  {
    id: 'pho_co',
    name: 'Phố Cổ Hội An & Đèn Lồng Đêm',
    tag: 'Hoài Niệm',
    icon: '🏮',
    ambianceHex: '#FDF6E3',
  },
  {
    id: 'cafe_retro',
    name: 'Quán Cà Phê Gạch Bông Retro Sài Gòn',
    tag: 'Tân Thời',
    icon: '☕',
    ambianceHex: '#EAE5D9',
  },
  {
    id: 'studio_minimal',
    name: 'Phòng Tranh Minimalist Hiện Đại',
    tag: 'Đương Đại',
    icon: '🎨',
    ambianceHex: '#FAF8F5',
  },
];

// Helper: Cultural Outfit Evaluator
export function evaluateCulturalOutfit(config: OutfitConfig): CulturalAssessment {
  let score = 9.2;
  let status: 'safe' | 'caution' | 'warning' = 'safe';
  let label = 'Chuẩn mực văn hóa & Hài hòa';
  let alert = undefined;
  let hasViolation = false;
  let advice = 'Bản phối trang phục đạt độ hài hòa mỹ mãn giữa điển chế truyền thống và tinh thần đương đại.';

  const occ = OCCASIONS.find(o => o.id === config.occasionId) || OCCASIONS[0];
  const garment = GARMENTS.find(g => g.id === config.garmentId) || GARMENTS[0];
  const color = COLORS.find(c => c.id === config.colorId) || COLORS[0];

  // 1. Kiểm tra cấm kỵ chốn tâm linh (Đình chùa)
  if (config.occasionId === 'temple') {
    if (config.handheldId === 'retro_sunglasses' || config.footwearId === 'combat_boots') {
      score -= 2.2;
      status = 'caution';
      label = 'Cần lưu ý lễ nghi chốn thiền môn';
      advice = 'Chốn tôn nghiêm thanh tịnh nên ưu tiên giày mộc hoặc hài thêu thanh nhã, cởi bỏ kính râm khi bước vào lễ bái.';
    }
  }

  // 2. Kiểm tra dịp Tết
  if (config.occasionId === 'tet') {
    if (config.colorId === 'brown_tram' || config.colorId === 'smoke_blue') {
      score -= 1.0;
      status = 'safe';
      label = 'Sắc màu trầm mặc ngày Xuân';
      advice = 'Ngày Tết đầu năm nên điểm xuyết thêm trang sức kiềng vàng hoặc khăn vấn tươi sáng để tăng cường vượng khí cát tường.';
    }
  }

  // 3. Kiểm tra Áo Nhật Bình
  if (config.garmentId === 'nhat_binh') {
    if (config.gender === 'male') {
      score -= 3.5;
      status = 'warning';
      hasViolation = true;
      label = 'Lệ trang phục triều Nguyễn: Nhật Bình dành cho Nữ giới';
      alert = 'Trong điển chế triều Nguyễn, Áo Nhật Bình là thường phục hoàng gia dành riêng cho Hậu phi, Công chúa và Nữ quan. Nam giới nên chọn Áo Tấc hoặc Áo Ngũ Thân!';
      advice = 'Hãy chuyển giới tính sang Nữ để chiêm ngưỡng trọn vẹn vẻ kiêu sa của Nhật Bình, hoặc chọn Áo Tấc cho Nam giới.';
    }
  }

  // 4. Áo Tứ Thân & Nón Quai Thao
  if (config.garmentId === 'tu_than' && config.gender === 'male') {
    score -= 3.0;
    status = 'warning';
    hasViolation = true;
    label = 'Áo Tứ Thân là trang phục phụ nữ dân gian';
    alert = 'Áo Tứ Thân kết hợp yếm đào là đặc trưng của phụ nữ Bắc Bộ. Đấng nam nhi xưa thường mặc Áo Ngũ Thân hoặc Áo Tấc.';
    advice = 'Khuyên dùng Áo Ngũ Thân hoặc Áo Tấc để thể hiện trọn vẹn phong thái nam nhân xưa.';
  }

  // 5. Mũ Phác Đầu & Áo Cổ Triều Nghi
  if (config.headpieceId === 'mu_phac_dau') {
    if (config.garmentId === 'vien_linh' || config.garmentId === 'giao_linh' || config.garmentId === 'ao_tac') {
      score += 0.6;
      advice = 'Phối Mũ Phác Đầu với áo cổ triều nghi tái hiện chuẩn mực phong thái quan viên Đại Việt oai phong lẫm liệt.';
    }
  }

  // 6. Mũ Miện Hoàng Tộc & Nhật Bình
  if (config.headpieceId === 'vuong_mien_hoang_hau' && config.garmentId === 'nhat_binh' && config.gender === 'female') {
    score = 10.0;
    advice = 'Tuyệt tác điển chế! Mũ miện hoàng tộc phối cùng Áo Nhật Bình tái hiện vẻ lộng lẫy đỉnh cao của bậc Mẫu nghi hoàng cung.';
  }

  // 7. Cành Hoa Mai & Tết
  if (config.handheldId === 'canh_hoa_mai_tet' && config.occasionId === 'tet') {
    score += 0.5;
    advice = 'Cành mai vàng khoe sắc thắm cùng tà áo truyền thống mang lại vượng khí may mắn ngập tràn cho năm mới.';
  }

  // Clamp score
  score = Math.max(1.0, Math.min(10.0, Math.round(score * 10) / 10));

  return {
    harmonyScore: score,
    traditionStatus: status,
    traditionLabel: label,
    alertMessage: alert,
    hasViolation,
    quickAdvice: advice,
    historicalContext: {
      title: `${garment.name} • ${garment.dynasty}`,
      dynasty: garment.dynasty,
      century: garment.century,
      etiquetteRule: garment.etiquetteRules || 'Giữ tư thế đoan trang, bước đi khoan thai tự nhiên.',
      confucianPhilosophy: garment.confucianMeaning,
      remixTip: `Phối cùng vải ${FABRICS.find(f => f.id === config.fabricId)?.name || 'Lụa'} tạo độ rủ mềm mại tuyệt hảo.`,
    },
  };
}
