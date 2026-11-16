window.storeData = (() => {
  const categories = ["Jane Austen", "Tuổi thơ & trưởng thành", "Bí ẩn & Gothic", "Phiêu lưu"];
  // Năm ghi dưới đây là năm phát hành bản điện tử được dẫn ở Project Gutenberg.
  const records = [
    [1342, "Pride and Prejudice", "Jane Austen", 1998, 89000, 0, "Elizabeth Bennet và Mr. Darcy dần nhìn lại những nhận xét ban đầu của họ giữa các kỳ vọng về hôn nhân và địa vị."],
    [11, "Alice’s Adventures in Wonderland", "Lewis Carroll", 2008, 69000, 1, "Theo chân Thỏ Trắng, Alice bước vào một thế giới nơi kích thước, thời gian và cả luật chơi đều có thể thay đổi."],
    [84, "Frankenstein", "Mary Shelley", 1993, 79000, 2, "Victor Frankenstein tạo ra một sinh thể rồi bỏ rơi nó. Hai lời kể đan xen đặt câu hỏi về sự cô độc và trách nhiệm."],
    [120, "Treasure Island", "Robert Louis Stevenson", 2006, 75000, 3, "Một tấm bản đồ đưa Jim Hawkins lên tàu đi tìm kho báu, nơi lòng trung thành của thủy thủ đoàn liên tục bị thử thách."],
    [158, "Emma", "Jane Austen", 1994, 98000, 0, "Emma Woodhouse tự tin sắp đặt chuyện tình cảm cho bạn bè. Sai lầm của cô khiến cuộc sống làng quê trở thành một câu chuyện hài hước."],
    [105, "Persuasion", "Jane Austen", 1994, 82000, 0, "Anne Elliot gặp lại người từng đính hôn sau nhiều năm xa cách và phải tự quyết định liệu cô có còn muốn một cơ hội thứ hai."],
    [121, "Northanger Abbey", "Jane Austen", 1994, 76000, 0, "Niềm mê truyện Gothic khiến Catherine Morland nhìn ngôi tu viện bằng trí tưởng tượng phong phú hơn những gì diễn ra trước mắt."],
    [161, "Sense and Sensibility", "Jane Austen", 1994, 92000, 0, "Hai chị em Elinor và Marianne Dashwood đối diện với những thay đổi về tài chính và tình yêu theo hai cách rất khác nhau."],
    [514, "Little Women", "Louisa May Alcott", 1996, 99000, 1, "Bốn chị em nhà March lớn lên cùng những buổi diễn kịch, ước mơ riêng và các thử thách của gia đình thời Nội chiến Hoa Kỳ."],
    [45, "Anne of Green Gables", "L. M. Montgomery", 2008, 88000, 1, "Anne Shirley đến sống tại Green Gables vì một sự nhầm lẫn và dần trở thành một phần của cộng đồng Avonlea."],
    [113, "The Secret Garden", "Frances Hodgson Burnett", 1994, 85000, 1, "Mary tìm được lối vào một khu vườn đã khóa và cùng các bạn chăm sóc nó, từng bước làm quen với ngôi nhà mới."],
    [16, "Peter Pan", "J. M. Barrie", 2008, 70000, 1, "Wendy và các em bay đến Neverland, nơi Peter Pan, những đứa trẻ đi lạc và thuyền trưởng Hook sống trong những cuộc phiêu lưu."],
    [345, "Dracula", "Bram Stoker", 1995, 105000, 2, "Qua thư từ và nhật ký, một nhóm nhân vật ráp nối những sự kiện kỳ lạ liên quan đến Bá tước Dracula."],
    [1661, "The Adventures of Sherlock Holmes", "Arthur Conan Doyle", 1999, 90000, 2, "Bác sĩ Watson kể lại các vụ án nơi Holmes biến đồ vật, thói quen và những lời kể tưởng chừng vụn vặt thành manh mối."],
    [43, "Strange Case of Dr. Jekyll and Mr. Hyde", "Robert Louis Stevenson", 2008, 65000, 2, "Luật sư Utterson điều tra mối liên hệ giữa bác sĩ Jekyll và Edward Hyde, người xuất hiện trong những câu chuyện đáng ngờ."],
    [174, "The Picture of Dorian Gray", "Oscar Wilde", 1994, 87000, 2, "Dorian Gray giữ vẻ trẻ trung trong khi bức chân dung của anh dần thay đổi theo những lựa chọn mà anh cố che giấu."],
    [103, "Around the World in Eighty Days", "Jules Verne", 1994, 83000, 3, "Phileas Fogg và Passepartout chạy đua với thời gian, chuyển từ tàu hỏa sang tàu biển để hoàn thành một vụ cá cược."],
    [2701, "Moby Dick; or, The Whale", "Herman Melville", 2001, 118000, 3, "Ishmael lên tàu Pequod và chứng kiến thuyền trưởng Ahab biến một chuyến săn cá voi thành cuộc truy đuổi cá nhân."],
    [521, "The Life and Adventures of Robinson Crusoe", "Daniel Defoe", 1996, 86000, 3, "Sau một vụ đắm tàu, Robinson Crusoe phải học cách dựng chỗ ở, chuẩn bị thức ăn và thích nghi với cuộc sống trên đảo."],
    [1257, "The Three Musketeers", "Alexandre Dumas và Auguste Maquet", 1998, 115000, 3, "D’Artagnan đến Paris và kết bạn với ba chàng lính ngự lâm giữa những chuyến đi bí mật và các mưu toan trong triều đình."],
  ];
  const palettes = ["#763f32", "#566448", "#273d4b", "#96602c", "#354d42", "#6a5a55", "#723e55", "#77673a"];
  const books = records.map(([id, title, author, year, price, category, description], index) => ({
    id, title, author, publisher: "Project Gutenberg", year, price, category, description,
    color: palettes[index % palettes.length],
    source: "https://www.gutenberg.org/ebooks/" + id
  }));
  const articles = [
    ["austen", "Cách bắt đầu đọc Jane Austen", "Hướng dẫn đọc", [1342, 158, 105], [
      "Nếu muốn bắt đầu bằng một câu chuyện nhiều đối thoại dí dỏm, hãy chọn Pride and Prejudice. Ở những chương đầu, thử ghi lại điều Elizabeth nghĩ về Darcy và xem nhận xét đó dựa trên lời đồn hay trải nghiệm của chính cô. Đọc tiếp, bạn sẽ nhận ra những cuộc gặp tưởng chừng xã giao có thể làm thay đổi cách hai người nhìn nhau.",
      "Emma phù hợp nếu bạn thích nhân vật chính có nhiều điểm để tranh luận. Còn Persuasion dành cho lúc bạn muốn đọc một câu chuyện ít ồn ào hơn. Với mỗi cuốn, hãy giữ lại một đoạn đối thoại yêu thích để thấy Jane Austen thay đổi giọng kể theo từng nhân vật."]],
    ["frankenstein", "Đọc Frankenstein qua hai lời kể", "Review sách", [84], [
      "Frankenstein đặt câu chuyện của Victor bên cạnh lời kể của sinh thể mà anh tạo ra. Tiểu thuyết mở đầu bằng những lá thư của nhà thám hiểm Walton. Cấu trúc ấy buộc người đọc để ý ai đang nói và khi nào họ nhường lời cho người khác.",
      "Bạn có thể ghi riêng những lần mỗi nhân vật nói rằng mình bị hiểu lầm. Khi đối chiếu, hãy cân nhắc điều họ kể về trách nhiệm của bản thân và người khác. Cách đọc này làm nổi bật câu hỏi về việc chăm sóc và thấu hiểu sau hành động sáng tạo."]],
    ["alice", "Theo chân Alice qua những cuộc đối thoại kỳ lạ", "Review sách", [11], [
      "Alice liên tục gặp những nhân vật có vẻ đang nói cùng ngôn ngữ với cô nhưng hiểu câu chữ hoàn toàn khác. Chọn một cảnh ở bàn trà và theo dõi xem trò chuyện rẽ hướng từ câu hỏi nào. Nhiều đoạn ngắn có thể đọc thành tiếng để nghe rõ nhịp gây cười.",
      "Khi gặp một đoạn chơi chữ khó dịch, thử đối chiếu hai cách hiểu trước khi tra chú giải. Việc này càng thú vị khi đọc cùng bạn bè vì mỗi người có thể nhìn ra một kiểu đùa khác nhau."]],
    ["holmes", "Tập đọc manh mối cùng Sherlock Holmes", "Hướng dẫn đọc", [1661], [
      "Sherlock Holmes thường chú ý tới những thứ người khác bỏ qua, nhưng ta hầu như nhìn vụ án qua lời Watson. Trước phần giải đáp, hãy dừng lại và viết ba chi tiết mà Watson ghi nhận ở hiện trường. Sau đó thử nối chúng với một giả thuyết.",
      "Khi đọc lời giải, đánh dấu manh mối nào thực sự có sẵn và chi tiết nào được bổ sung về sau. Bạn sẽ thấy một phần thú vị của truyện trinh thám nằm ở cách tác giả phân phối thông tin cho nhân vật và độc giả."]],
    ["little-women", "Bốn chị em, bốn cách lớn lên", "Review sách", [514, 45], [
      "Little Women theo dõi bốn chị em khác nhau về sở thích, mong muốn và cách phản ứng trước những ràng buộc của gia đình. Hãy chú ý những sinh hoạt tưởng nhỏ như chia việc nhà hay tập kịch. Đó là chỗ các chị em thể hiện mình rõ nhất.",
      "Nếu thích theo dõi một nhóm nhân vật lâu dài, thử ghi một mong muốn của mỗi chị em ở đầu truyện rồi xem nó thay đổi thế nào. Bạn có thể đọc tiếp Anne of Green Gables để đối chiếu cách một người trẻ tìm chỗ đứng trong một cộng đồng mới."]],
    ["gothic", "Ba lối vào văn học Gothic", "Giới thiệu sách", [84, 345, 43], [
      "Nhật ký, thư từ và lời kể gián tiếp trong Dracula tạo cảm giác người đọc đang ghép một hồ sơ. Frankenstein dành nhiều chỗ hơn cho câu chuyện của sinh thể, còn Jekyll và Hyde đưa người đọc đi qua cuộc điều tra của một luật sư.",
      "Nếu thích văn bản ngắn gọn, hãy đọc Jekyll và Hyde trước. Nếu thích theo chân nhiều người kể, thử Dracula. Với mỗi cuốn, chọn một địa điểm và ghi lại cách miêu tả ánh sáng hoặc âm thanh làm bạn hình dung nơi đó."]],
    ["adventure", "Chọn một cuốn phiêu lưu cho cuối tuần", "Giới thiệu sách", [120, 103, 521], [
      "Treasure Island mở ra bằng một tấm bản đồ và một chuyến biển có thủy thủ đoàn khó đoán. Around the World in Eighty Days có nhịp khác: từng chặng đường bị giới hạn bởi lịch tàu và thời hạn của vụ cá cược.",
      "Nếu thích quan sát nhân vật học kỹ năng mới, bạn có thể đọc Robinson Crusoe. Hãy chọn theo kiểu thử thách bạn muốn theo dõi: nghi ngờ giữa các nhân vật, áp lực thời gian hay xử lý những việc cần thiết để sống trên đảo."]],
    ["edition", "Đọc thông tin ấn bản trước khi chọn sách", "Hướng dẫn đọc", [1342, 11], [
      "Một tác phẩm có thể xuất hiện dưới nhiều bản in, bản dịch và bản điện tử. Bắt đầu bằng việc kiểm tra tên tác giả và ngôn ngữ. Nếu đọc bản dịch, tên dịch giả và nội dung lời giới thiệu có thể giúp bạn chọn bản phù hợp.",
      "Sau đó, đối chiếu đơn vị phát hành và năm của ấn bản. Trong danh mục Thiên Ân, năm ghi trên trang chi tiết là năm phát hành bản điện tử được dẫn nguồn. Bạn có thể mở liên kết Project Gutenberg để xem đúng hồ sơ và các định dạng đọc."]],
  ].map(([id, title, type, books, paragraphs]) => ({id, title, type, books, paragraphs}));
  const videos = [
    {id: "NSL55lOwznU", title: "Nét châm biếm của Jane Austen", description: "Iseult Gillespie giới thiệu cách Jane Austen viết về hôn nhân, địa vị và đời sống xã hội qua giọng kể dí dỏm."},
    {id: "PDgu25Dsv34", title: "Những điều cần biết trước khi đọc Frankenstein", description: "Iseult Gillespie giới thiệu bối cảnh tác phẩm của Mary Shelley và những câu hỏi về sáng tạo, cô độc và trách nhiệm."},
  ];
  return {categories, books, articles, videos};
})();
