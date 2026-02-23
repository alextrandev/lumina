import { Translations } from "./types";

export const vi: Translations = {
  welcome: {
    title: "✦ Lumina ✦",
    subtitle: "Trí Tuệ Nhân Tạo Đọc Bài Tarot",
    text: "Chào mừng, người tìm kiếm. Ta là Lumina, người dẫn đường cho bạn xuyên qua bức màn huyền bí. Những lá bài đã chờ đợi bạn. Chúng ta bắt đầu nhé?",
    begin: "Bắt Đầu Trải Bài",
  },
  spreadSelect: {
    intro: "Trước khi bắt đầu, ta cần biết bạn muốn nhìn sâu đến đâu. Hãy chọn một kiểu trải bài — mỗi kiểu sẽ hé lộ vũ trụ theo một cách khác nhau...",
    cardLabel: "lá",
    cardsLabel: "lá",
  },
  question: {
    prompt: "Bây giờ, hãy nói cho ta biết... điều gì đang nặng trĩu trong tâm trí bạn? Câu hỏi nào đã đưa bạn đến với những lá bài hôm nay?\n\nHãy nói tự do — về tình yêu, sự nghiệp, một quyết định bạn đang đối mặt, hoặc đơn giản là điều vũ trụ muốn bạn biết. Trái tim bạn càng mở rộng, những lá bài càng nói rõ ràng.",
    placeholder: "Hãy nói câu hỏi của bạn...",
    submit: "Tiết Lộ Câu Hỏi",
  },
  userInfo: {
    questions: [
      { key: "name", question: "Đầu tiên, hãy để ta biết bạn một chút. Ta nên gọi bạn là gì?" },
      { key: "age", question: "Bạn đã đi qua bao nhiêu mùa trên trái đất này? Tuổi của bạn, nếu bạn không ngại." },
      { key: "occupation", question: "Điều gì chiếm lấy ngày tháng của bạn? Công việc, nghề nghiệp — bạn làm gì?" },
      { key: "status", question: "Điều cuối cùng — trạng thái tâm hồn hiện tại của bạn là gì? Bạn đang yêu, tìm kiếm, hay đang chữa lành?" },
    ],
    placeholder: "Câu trả lời của bạn...",
    answer: "Trả Lời",
    skip: "Bỏ Qua",
  },
  cardPick: {
    intro: "Những lá bài được bày trước mặt bạn, úp xuống, bao phủ trong huyền bí. Đừng vội vàng. Hãy để trực giác nói to hơn lý trí.",
    cardOf: "Lá {current} trong {total}:",
    faceDownLabel: "Lá bài tarot úp",
  },
  thinking: [
    "Những vì sao đang xếp hàng...",
    "Ta cảm nhận năng lượng đang dịch chuyển...",
    "Bức màn giữa các thế giới mỏng dần...",
    "Hãy để ta điều chỉnh theo rung động của bạn...",
    "Vũ trụ thì thầm...",
    "Ta cảm thấy điều gì đó đang hình thành...",
    "Những lá bài đang lắng nghe...",
  ],
  loading: {
    phrases: [
      "Vũ trụ đang dệt nên bài đọc của bạn...",
      "Những lá bài nói bằng tiếng thì thầm... ta đang lắng nghe...",
      "Năng lượng cổ xưa hội tụ trên trải bài của bạn...",
      "Những sợi chỉ số phận đang được đọc...",
      "Ta thấy những hoa văn hình thành trong ánh sao...",
    ],
  },
  reading: {
    title: "Bài Đọc Của Bạn, {name}",
    subtitle: "{spread} — {count} Lá",
    questionLabel: "Câu Hỏi Của Bạn",
    interpretationTitle: "Vũ Trụ Lên Tiếng",
    interpretationText: "Những lá bài đã được rút và năng lượng của chúng rõ ràng. Bài đọc này đang được vũ trụ chuẩn bị — sớm thôi, AI của Lumina sẽ truyền tải toàn bộ ý nghĩa của trải bài. Hiện tại, hãy biết rằng những lá bài đã nghe bạn, và câu trả lời đang hình thành trong ánh sao.",
    placeholderNote: "✦ Diễn giải bằng AI sắp ra mắt ✦",
    restart: "Bắt Đầu Bài Đọc Mới",
    defaultName: "Người Tìm Kiếm",
  },
  spreads: {
    single: {
      name: "Một Lá Bài",
      description: "Một cái nhìn nhanh vào năng lượng bao quanh câu hỏi của bạn.",
      positions: [
        { name: "Câu Trả Lời", meaning: "Năng lượng cốt lõi và hướng dẫn cho câu hỏi của bạn", instruction: "Nhắm mắt lại. Giữ câu hỏi trong trái tim. Khi bạn cảm thấy sẵn sàng, hãy để tay bạn được dẫn dắt đến một lá bài." },
      ],
    },
    "three-card": {
      name: "Trải Bài Ba Lá",
      description: "Quá khứ, hiện tại và tương lai — cung đường hành trình của bạn.",
      positions: [
        { name: "Quá Khứ", meaning: "Điều gì đã dẫn bạn đến đây", instruction: "Hãy nghĩ về nơi bạn đã đi qua. Những sự kiện nào đã định hình khoảnh khắc này? Hãy để trực giác dẫn tay bạn đến lá bài giữ quá khứ." },
        { name: "Hiện Tại", meaning: "Nơi bạn đang đứng", instruction: "Bây giờ, hãy đưa nhận thức về khoảnh khắc này. Cảm nhận năng lượng xung quanh. Chọn lá bài nói với hiện tại của bạn." },
        { name: "Tương Lai", meaning: "Điều gì phía trước", instruction: "Cuối cùng, mở rộng tâm trí cho những gì có thể đến. Đừng cố ép câu trả lời — hãy để vũ trụ hé lộ con đường. Chọn lá bài cuối cùng." },
      ],
    },
    "five-card": {
      name: "Trải Bài Năm Lá",
      description: "Nhìn sâu hơn vào tình huống từ mọi góc độ.",
      positions: [
        { name: "Hiện Tại", meaning: "Tình huống hiện tại", instruction: "Tập trung lại. Cảm nhận sức nặng câu hỏi. Chọn lá bài đại diện cho nơi bạn đang đứng." },
        { name: "Thử Thách", meaning: "Điều gì cản đường bạn", instruction: "Nghĩ về những trở ngại bạn đối mặt. Điều gì giữ bạn lại? Hãy để lá bài tự hé lộ." },
        { name: "Nền Tảng", meaning: "Nguyên nhân gốc rễ", instruction: "Đi sâu hơn. Điều gì nằm dưới bề mặt? Chọn lá bài nói với sự thật ẩn giấu." },
        { name: "Quá Khứ Gần", meaning: "Sự kiện gần đây ảnh hưởng bạn", instruction: "Nhìn lại phía sau. Những sự kiện gần đây nào vẫn vọng lại? Chọn lá bài mang năng lượng đó." },
        { name: "Tiềm Năng", meaning: "Kết quả tốt nhất có thể", instruction: "Giờ hãy nhìn về phía trước với hy vọng. Khả năng cao nhất là gì? Chọn lá bài cuối với trái tim rộng mở." },
      ],
    },
    horseshoe: {
      name: "Trải Bài Móng Ngựa",
      description: "Bảy lá bài cho cái nhìn toàn diện về con đường của bạn.",
      positions: [
        { name: "Quá Khứ", meaning: "Ảnh hưởng quá khứ", instruction: "Bắt đầu từ khởi nguồn. Hãy để ký ức trồi lên nhẹ nhàng, và chọn lá bài giữ năng lượng quá khứ." },
        { name: "Hiện Tại", meaning: "Hoàn cảnh hiện tại", instruction: "Đưa bản thân hoàn toàn vào khoảnh khắc này. Bạn cảm thấy gì? Chọn một lá bài." },
        { name: "Ảnh Hưởng Ẩn", meaning: "Điều bạn có thể không thấy", instruction: "Có những lực lượng bạn không thể nhìn thấy. Tin vào trực giác — chọn lá bài mà không suy nghĩ quá nhiều." },
        { name: "Trở Ngại", meaning: "Thử thách cần vượt qua", instruction: "Thừa nhận điều gì đứng giữa bạn và mong muốn. Chọn lá bài đại diện cho rào cản đó." },
        { name: "Ảnh Hưởng Bên Ngoài", meaning: "Con người và năng lượng xung quanh", instruction: "Nghĩ về những người trong cuộc sống. Ai ảnh hưởng tình huống này? Để năng lượng của họ dẫn dắt lựa chọn." },
        { name: "Lời Khuyên", meaning: "Vũ trụ gợi ý điều gì", instruction: "Mở lòng đón nhận hướng dẫn. Vũ trụ có thông điệp cho bạn. Chọn lá bài với sự tôn kính." },
        { name: "Kết Quả", meaning: "Kết quả có thể xảy ra", instruction: "Đây là lá bài cuối cùng. Hít thở sâu. Dù điều gì đến, hãy tin rằng đó là điều bạn cần thấy. Chọn ngay." },
      ],
    },
    "celtic-cross": {
      name: "Thập Tự Celtic",
      description: "Trải bài mười lá cổ điển cho cái nhìn sâu sắc, nhiều tầng.",
      positions: [
        { name: "Hiện Tại", meaning: "Trọng tâm vấn đề", instruction: "Lá bài này là trung tâm của mọi thứ. Giữ câu hỏi thật gần và chọn lá bài cộng hưởng sâu nhất với bạn." },
        { name: "Thử Thách", meaning: "Điều gì chắn ngang", instruction: "Mọi câu hỏi đều mang theo căng thẳng. Cảm nhận sự căng thẳng và chọn lá bài thể hiện nó." },
        { name: "Nền Tảng", meaning: "Gốc rễ tình huống", instruction: "Đào sâu dưới bề mặt. Những lực lượng vô thức nào đang hoạt động? Chọn lá bài từ bản năng." },
        { name: "Quá Khứ Gần", meaning: "Điều gì đang qua đi", instruction: "Điều gì đó đang rời xa cuộc đời bạn. Cảm nhận sự buông bỏ, và chọn lá bài ghi lại điều đang phai mờ." },
        { name: "Vương Miện", meaning: "Khát vọng và kết quả tốt nhất", instruction: "Nhìn lên. Bạn hy vọng điều gì? Hãy để ước muốn cao nhất dẫn dắt lựa chọn này." },
        { name: "Tương Lai Gần", meaning: "Điều gì đang đến", instruction: "Điều gì đó mới đang tiến về phía bạn. Bạn có cảm nhận được không? Chọn lá bài mang năng lượng đó." },
        { name: "Sức Mạnh", meaning: "Nguồn lực bên trong", instruction: "Suy ngẫm về sức mạnh của bạn. Bạn mang trong mình quyền năng gì? Chọn lá bài phản chiếu bản thân." },
        { name: "Lực Bên Ngoài", meaning: "Người khác nhìn bạn thế nào", instruction: "Bước ra ngoài bản thân. Thế giới nhìn nhận bạn thế nào trong tình huống này? Chọn lá bài phản ánh điều đó." },
        { name: "Hy Vọng & Sợ Hãi", meaning: "Điều bạn mong muốn và lo sợ", instruction: "Hy vọng và sợ hãi thường là hai mặt của một đồng xu. Cảm nhận cả hai, và chọn lá bài giữ sự đối lập đó." },
        { name: "Kết Quả Cuối", meaning: "Nơi hành trình này dẫn đến", instruction: "Đây là lá bài cuối cùng. Dành một khoảnh khắc im lặng. Hít thở sâu. Khi sẵn sàng, hãy để linh hồn chọn lá bài hoàn thành bài đọc." },
      ],
    },
  },
};
