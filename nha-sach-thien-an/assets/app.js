(() => {
  const { books, articles, videos, categories } = window.storeData;
  const main = document.querySelector("main");
  const menuButton = document.querySelector(".menu-toggle");
  const query = new URLSearchParams(window.location.search);
  const price = (amount) => new Intl.NumberFormat("vi-VN", {
    style: "currency", currency: "VND"
  }).format(amount);
  const bookURL = (book) => "sach.html?id=" + book.id;
  const coverURL = (book) => "assets/covers/" + book.id + ".webp";
  const cover = (book) => `<img src="${coverURL(book)}" alt="Bìa minh họa ${book.title}" width="320" height="472" loading="lazy">`;
  const back = (url, label) => `<a class="back" href="${url}">← ${label}</a>`;
  const head = (title, description) => `<header class="page-head"><h1>${title}</h1>${description ? `<p>${description}</p>` : ""}</header>`;
  const external = (url, label) => `<a class="text-link" href="${url}" target="_blank" rel="noopener noreferrer">${label} →</a>`;

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.focus();
    }
  });

  function bookCard(book, heading = "h3") {
    return `<article class="book-card">
      <a class="cover-tile tone-${book.category}" href="${bookURL(book)}" aria-label="Xem ${book.title}">${cover(book)}</a>
      <div class="book-meta">
        <p class="eyebrow">${categories[book.category]}</p>
        <${heading}><a href="${bookURL(book)}">${book.title}</a></${heading}>
        <p class="author">${book.author}</p>
        <p class="price">${price(book.price)}</p>
      </div>
    </article>`;
  }

  function articleCard(article, heading = "h3") {
    return `<article class="reading-card">
      <p class="eyebrow">${article.type}</p>
      <${heading}><a href="bai-viet.html?id=${article.id}">${article.title}</a></${heading}>
      <p>${article.paragraphs[0].split(". ")[0]}.</p>
      <a class="text-link" href="bai-viet.html?id=${article.id}" aria-label="Đọc bài ${article.title}">Đọc bài →</a>
    </article>`;
  }

  function home() {
    main.insertAdjacentHTML("beforeend", `
      <section class="wrap hero-wrap">
        <div class="hero">
          <div class="hero-copy">
            <p class="eyebrow">Văn học kinh điển</p>
            <h1>Một cuốn sách,<br>một thế giới.</h1>
            <p>Khám phá các ấn phẩm kinh điển, tìm một cuốn hợp gu và gửi yêu cầu đặt sách thử nghiệm.</p>
            <a class="button gold" href="danh-muc.html">Khám phá danh mục <span aria-hidden="true">→</span></a>
          </div>
          <img class="hero-image" src="assets/hero.webp" alt="Những cuốn sách bìa cứng và một cuốn sách đang mở" width="1050" height="700">
        </div>
      </section>
      <section class="wrap section" aria-labelledby="featured-title">
        <div class="section-top"><div><p class="eyebrow">Kệ sách Thiên Ân</p><h2 id="featured-title">Ấn phẩm nổi bật</h2></div>
        <a class="text-link" href="danh-muc.html">Xem tất cả 20 ấn phẩm →</a></div>
        <div class="book-grid">${books.slice(0, 4).map((book) => bookCard(book)).join("")}</div>
      </section>
      <section class="reading-band" aria-labelledby="reading-title"><div class="wrap section">
        <div class="section-top"><div><h2 id="reading-title">Góc đọc</h2></div><a class="text-link" href="goc-doc.html">Xem tất cả bài viết →</a></div>
        <div class="reading-grid">${articles.slice(0, 3).map((article) => articleCard(article)).join("")}</div>
      </div></section>`);
  }

  function catalog() {
    main.insertAdjacentHTML("beforeend", `<div class="wrap page">
      ${head("Danh mục sách", "Tìm ấn phẩm theo nhan đề, tác giả hoặc thể loại. Giá hiển thị dùng cho mô phỏng.")}
      <div class="filters">
        <div><label for="search">Tìm sách</label><input id="search" type="search" placeholder="Nhập tên sách hoặc tác giả"></div>
        <div><label for="genre">Thể loại</label><select id="genre"><option value="">Tất cả thể loại</option>
        ${categories.map((category, i) => `<option value="${i}">${category}</option>`).join("")}</select></div>
      </div>
      <p id="results" class="author" role="status"></p>
      <div id="books" class="book-grid catalog-grid"></div>
    </div>`);
    const search = document.querySelector("#search");
    const genre = document.querySelector("#genre");
    const results = document.querySelector("#results");
    const grid = document.querySelector("#books");
    const normalize = (input) => input.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/đ/g, "d").replace(/[’‘']/g, "");
    function showBooks() {
      const term = normalize(search.value.trim());
      const matches = books.filter((book) =>
        (genre.value === "" || book.category === Number(genre.value)) &&
        normalize(book.title + " " + book.author).includes(term)
      );
      results.textContent = matches.length ? `${matches.length} ấn phẩm` : "Không tìm thấy ấn phẩm phù hợp.";
      grid.innerHTML = matches.map((book) => bookCard(book, "h2")).join("");
    }
    search.addEventListener("input", showBooks);
    genre.addEventListener("change", showBooks);
    showBooks();
  }

  function bookDetails() {
    const book = books.find((item) => String(item.id) === query.get("id"));
    if (!book) {
      main.insertAdjacentHTML("beforeend", `<div class="wrap page">${head("Không tìm thấy sách")}${back("danh-muc.html", "Về danh mục sách")}</div>`);
      return;
    }
    document.title = book.title + " | Nhà sách Thiên Ân";
    main.insertAdjacentHTML("beforeend", `<div class="wrap page">
      ${back("danh-muc.html", "Danh mục sách")}
      <article class="detail">
        <div class="cover-tile tone-${book.category}">${cover(book)}</div>
        <div>
          <p class="eyebrow">${categories[book.category]}</p>
          <h1>${book.title}</h1><p class="detail-description">${book.description}</p>
          <dl class="facts">
            <div><dt>Tác giả</dt><dd>${book.author}</dd></div>
            <div><dt>Đơn vị phát hành bản điện tử</dt><dd>${book.publisher}</dd></div>
            <div><dt>Năm phát hành bản điện tử</dt><dd>${book.year}</dd></div>
            <div><dt>Giá tham khảo</dt><dd class="price">${price(book.price)}</dd></div>
          </dl>
          <div class="actions"><a class="button" href="lien-he.html?sach=${book.id}">Đặt sách thử →</a>
          ${external(book.source, "Hồ sơ và bản đọc tại Project Gutenberg")}</div>
          <p class="fine">Bìa minh họa do website thiết kế. Giá là dữ liệu mô phỏng của Thiên Ân. Bản điện tử dẫn nguồn có thể đọc miễn phí tại Project Gutenberg.</p>
        </div>
      </article>
    </div>`);
  }

  function articleList() {
    main.insertAdjacentHTML("beforeend", `<div class="wrap page">
      ${head("Góc đọc", "Review, gợi ý chọn sách và những cách đọc dành cho người mới làm quen với văn học kinh điển.")}
      <div class="reading-grid">${articles.map((article) => articleCard(article, "h2")).join("")}</div>
    </div>`);
  }

  function articleDetails() {
    const article = articles.find((item) => item.id === query.get("id"));
    if (!article) {
      main.insertAdjacentHTML("beforeend", `<div class="wrap page">${head("Không tìm thấy bài viết")}${back("goc-doc.html", "Về Góc đọc")}</div>`);
      return;
    }
    document.title = article.title + " | Nhà sách Thiên Ân";
    const related = article.books.map((id) => books.find((book) => book.id === id));
    main.insertAdjacentHTML("beforeend", `<article class="wrap page prose">
      ${back("goc-doc.html", "Góc đọc")}
      <p class="eyebrow">${article.type}</p>
      <h1>${article.title}</h1>
      ${article.paragraphs.map((p) => `<p>${p}</p>`).join("")}
      <h2>Sách được nhắc đến</h2>
      <ul>${related.map((book) => `<li><a href="${bookURL(book)}">${book.title}</a> · ${external(book.source, "Nguồn: Project Gutenberg")}</li>`).join("")}</ul>
    </article>`);
  }

  function videoList() {
    main.insertAdjacentHTML("beforeend", `<div class="wrap page">
      ${head("Video", "Hai video của TED-Ed để tìm hiểu thêm về tác giả và tác phẩm trong danh mục.")}
      <div class="video-grid">${videos.map((video) => `<article class="video-card">
        <iframe src="https://www.youtube-nocookie.com/embed/${video.id}" title="${video.title}" loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <div><h2>${video.title}</h2><p>${video.description}</p>
        <p class="fine">Nguồn: TED-Ed · Bài giảng của Iseult Gillespie</p>
        ${external("https://www.youtube.com/watch?v=" + video.id, "Mở trên YouTube")}</div>
      </article>`).join("")}</div>
    </div>`);
  }

  function contact() {
    main.insertAdjacentHTML("beforeend", `<div class="wrap page">
      ${head("Đặt sách thử nghiệm", "Chọn ấn phẩm và số lượng. Bạn sẽ thấy phiếu xác nhận ngay trên trang.")}
      <div class="contact-layout">
        <form id="order-form" class="form-card">
          <label for="book">Ấn phẩm</label>
          <select id="book" name="book" required><option value="">Chọn sách</option>
          ${books.map((book) => `<option value="${book.id}">${book.title}</option>`).join("")}</select>
          <label for="quantity">Số lượng</label>
          <input id="quantity" name="quantity" type="number" min="1" max="10" value="1" required>
          <button class="button" type="submit">Xác nhận đặt thử →</button>
        </form>
        <aside class="note"><h2>Thông tin mô phỏng</h2>
          <p>Phiếu được tạo trong trình duyệt. Thao tác này không gửi dữ liệu, tạo đơn hàng thật hoặc yêu cầu thanh toán.</p>
          <p id="receipt" role="status" aria-live="polite"></p></aside>
      </div>
    </div>`);
    const form = document.querySelector("#order-form");
    const bookField = document.querySelector("#book");
    const chosen = query.get("sach");
    if (books.some((book) => String(book.id) === chosen)) bookField.value = chosen;
    const receipt = document.querySelector("#receipt");
    form.addEventListener("input", () => { receipt.textContent = ""; });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const book = books.find((item) => String(item.id) === bookField.value);
      if (!book || !form.checkValidity()) return;
      const quantity = document.querySelector("#quantity").valueAsNumber;
      receipt.textContent = `Đã xác nhận đặt thử ${quantity} cuốn ${book.title}. Tổng giá tham khảo: ${price(book.price * quantity)}.`;
    });
  }

  const staticPages = {
    about: ["Giới thiệu", `<p>Nhà sách Thiên Ân là website mô phỏng giới thiệu 20 ấn phẩm văn học kinh điển dành cho học sinh, sinh viên và người đọc muốn tìm hiểu tác phẩm tiếng Anh.</p>
      <h2>Cách sử dụng website</h2><p>Bạn có thể tìm theo nhan đề hoặc tác giả, lọc theo thể loại, đọc thông tin bản điện tử và xem các bài viết hoặc video hướng dẫn. Mỗi hồ sơ sách dẫn đến bản đọc ở Project Gutenberg.</p>
      <h2>Mô hình hoạt động</h2><p>Website mô phỏng quá trình khám phá ấn phẩm và đặt sách. Giá mang tính minh họa và phiếu xác nhận chỉ xuất hiện trong phiên truy cập.</p>
      <p><a class="button" href="danh-muc.html">Xem danh mục →</a></p>`],
    copyright: ["Bản quyền", `<p>Nhà sách Thiên Ân là sản phẩm học tập. Website dẫn liên kết tới hồ sơ sách tại Project Gutenberg và nhúng video từ kênh TED-Ed qua trình phát YouTube.</p>
      <h2>Nguồn dữ liệu và nội dung</h2><p>Mỗi trang chi tiết ghi nguồn của bản điện tử. Năm hiển thị là năm phát hành của bản điện tử được dẫn. Giá dùng cho mô phỏng. Mô tả và bài viết bằng tiếng Việt được biên soạn cho website với sự hỗ trợ của AI.</p>
      <h2>Ảnh và video</h2><p>Bìa sách là minh họa chữ được tạo riêng cho website, không sao chép bìa thương mại. Ảnh kệ sách trang chủ được tạo bằng AI. Video thuộc quyền của nhà sáng tạo tương ứng và được phát qua trình nhúng của YouTube. Xem nguồn ngay bên dưới từng video.</p>
      <p>${external("https://www.gutenberg.org/", "Project Gutenberg")} · ${external("https://www.youtube.com/@TEDEd", "TED-Ed")}</p>`],
    privacy: ["Quyền riêng tư", `<h2>Biểu mẫu đặt sách</h2><p>Biểu mẫu chỉ yêu cầu chọn sách và số lượng. Website xử lý dữ liệu này trong trang và không lưu vào cơ sở dữ liệu hoặc gửi tới nhà sách.</p>
      <h2>Nội dung và liên kết bên thứ ba</h2><p>Trang video tải trình phát từ YouTube. Khi truy cập video hoặc liên kết Project Gutenberg, bạn tương tác với dịch vụ bên ngoài và chịu chính sách của dịch vụ tương ứng.</p>
      <h2>Đo lường lượt truy cập</h2><p>Bản mô phỏng chưa gắn công cụ thống kê. Khi triển khai, có thể dùng thống kê tổng hợp của nền tảng lưu trữ nếu nền tảng cung cấp. Các chỉ số tham khảo gồm lượt xem Trang chủ, Danh mục và Góc đọc.</p>`],
  };
  const routes = {
    home, catalog, book: bookDetails, articles: articleList, article: articleDetails, videos: videoList, contact
  };
  const page = document.body.dataset.page;
  if (routes[page]) {
    routes[page]();
  } else {
    const [title, content] = staticPages[page];
    main.insertAdjacentHTML("beforeend", `<div class="wrap page prose">${head(title)}${content}</div>`);
  }
})();
