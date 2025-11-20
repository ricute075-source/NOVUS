//================================================================
// PHẦN 1: HIỂN THỊ CÔNG VIỆC (jobsTable)
//================================================================

async function loadJobs() {
  const MAX = 6;
  try {
    /*
      SỬA LỖI:
      Sửa 'JSon' thành 'Json'
    */
    const res = await fetch("JSon/jobs3.json", { cache: "no-cache" });
    const jobs = await res.json();
    const container = document.getElementById("jobsTable");

    // Đảm bảo `jobs` là một mảng trước khi dùng .slice
    if (!Array.isArray(jobs)) {
      console.error("Dữ liệu jobs3.json không phải là một mảng");
      return;
    }

    container.innerHTML = jobs
      .slice(0, MAX)
      .map(
        (job) => `
      
      <article class="job-card2" onclick="window.location.href='Trangchitiet.html?id=${encodeURIComponent(
        job.id
      )}'">
        <table class="job-card3">
          <tr>
            <td class="joblogo" rowspan="2">
              <img src="Img/${job.logo}" alt="Logo">
            </td>
            <td class="nghe">
              <p class="nghetl"><strong>${job.nghe}</strong></p>
            </td>
            <td class="traitim" rowspan="2">

            </td>
          </tr>
          <tr>
            <td class="thongtin" colspan="2">
              <div class="ttw">
                <div class="ttcty" >
                <p class="thepqlvl">${job.cty}</p>
                  <p class="thepqlvl"><img src="Img/vitri.png" class="anh1515"> <span>${
                    job.daichi
                  }<span></p>
                  <span class="tienluong"><img src="Img/tien.png" class="anh1515"> ${
                    job.luong
                  }</span>
                </div>
                <img src="Img/thanhUL.jpg" class="anhthanhul" height="1">
                <div class="ttduoi">
                  <div class="traloi">${job.phanhoi}</div>
                  <div class="dadang">${job.dadang}</div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </article>
    `
      )
      .join("");
  } catch (err) {
    console.error("Lỗi tải jobs3.json", err);
  }
}

/* Cập nhật hàm 'toggleHeart' 
  Nó nhận 'event' và dùng 'event.stopPropagation()'
*/
function toggleHeart(event, btn) {
  event.stopPropagation(); // <-- Ngăn click lan ra thẻ <article>
  btn.classList.toggle("liked");
  const img = btn.querySelector("img");
  if (btn.classList.contains("liked")) {
    img.src = "Img/heart-filled.png";
  } else {
    img.src = "Img/traitim.png";
  }
}

// Chạy hàm
loadJobs();

//================================================================
// PHẦN 2: HIỂN THỊ CÔNG VIỆC (jobsGrid)
//================================================================

async function loadJobs2() {
  try {
    // Đường dẫn 'Json/jobs4.json' đã đúng
    const res = await fetch("JSon/jobs4.json");
    const jobs = await res.json();
    const container = document.getElementById("jobsGrid");

    // Đảm bảo `jobs` là một mảng
    if (!Array.isArray(jobs)) {
      console.error("Dữ liệu jobs4.json không phải là một mảng");
      return;
    }

    container.innerHTML = jobs
      .map(
        (job) => `
      <article class="job-card" onclick="window.location.href='Trangchitiet.html?id=${encodeURIComponent(
        job.id
      )}'">
        <div class="top">
          <div class="logo"><img src="Img/${
            job.logo
          }" alt="${job.company}" class="logocv"></div>
          <div>
            <p class="company">${job.company}</p>
            <p class="location">${job.location}</p>
          </div>
        </div>

        <h3 class="job-title">${job.title}</h3>
        <div class="meta">
          <span class="badge">${job.type}</span>
        </div>

        <p class="description">${job.description}</p>

        <div class="footer">
          <div class="salary">${job.salary}/<span class="luongthang">${
          job.thang
        }</span></div>
          <button class="apply-btn" type="button" onclick="applyNow(event)">Ứng tuyển ngay</button>
        </div>
      </article>
    `
      )
      .join("");
  } catch (err) {
    console.error("Lỗi tải jobs4.json", err);
  }
}

/* Thêm hàm 'applyNow'
  Hàm này dùng 'event.stopPropagation()' trước khi điều hướng
*/
function applyNow(event) {
  event.stopPropagation(); // <-- Ngăn click lan ra thẻ <article>
  window.location.href = "UngTuyen.html";
}

// Chạy hàm
loadJobs2();

//================================================================
// PHẦN 3: CODE TÌM KIẾM
//================================================================

(function () {
  const imgFolder = "Img/";

  let allJobs = [];
  let activeIndex = -1;

  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");
  const panel = document.getElementById("searchResults");

  // Thêm kiểm tra
  if (!input || !btn || !panel) {
    console.warn("Trang chủ thiếu các thành phần tìm kiếm (searchInput, searchBtn, searchResults).");
    return;
  }

  async function initJobs() {
    try {
      /*
        SỬA LỖI:
        Sửa 'JSon' thành 'Json'
      */
      const res1 = await fetch("JSon/jobs3.json", { cache: "no-cache" });
      const res2 = await fetch("JSon/jobs4.json", { cache: "no-cache" });

      const jobs1 = res1.ok ? await res1.json() : [];
      const jobs2 = res2.ok ? await res2.json() : [];

      // Gộp 2 mảng jobs, đảm bảo chúng là mảng
      allJobs = (Array.isArray(jobs1) ? jobs1 : []).concat(
        Array.isArray(jobs2) ? jobs2 : []
      );
    } catch (e) {
      console.error(e);
    }
  }

  function itemHTML(job) {
    const logo = job.logo ? `${imgFolder}${job.logo}` : "";
    const title = job.nghe || job.title || "";
    const company = job.cty || job.company || "";
    const location = job.daichi || job.location || "";
    const salary = job.luong || job.salary || "";

    return `
      <div class="result-item" tabindex="0" 
           data-id="${escapeAttr(job.id)}" 
           data-cty="${escapeAttr(company)}" 
           data-title="${escapeAttr(title)}">
        <img class="logo" src="${logo}" alt="${escapeAttr(
      company
    )}" onerror="this.style.display='none'">
        <div class="info">
          <p class="title">${escapeText(title)}</p>
          <p class="company">${escapeText(company)}</p>
          <p class="meta">
            <img src="${imgFolder}vitri.png" class="anh1515"> ${escapeText(
      location
    )}
            &nbsp;•&nbsp;
            <img src="${imgFolder}tien.png" class="anh1515" alt=""> ${escapeText(
      salary
    )}
          </p>
        </div>
      </div>
    `;
  }

  function escapeText(v) {
    return String(v == null ? "" : v);
  }
  function escapeAttr(v) {
    return String(v == null ? "" : v).replace(/"/g, "&quot;");
  }

  // Cập nhật hàm filter để tìm trong các trường mới (title, company, location...)
  function filterJobs(keyword) {
    const k = keyword.trim().toLowerCase();
    if (!k) return [];
    return allJobs
      .filter(
        (j) =>
          (j.nghe || j.title || "").toLowerCase().includes(k) ||
          (j.cty || j.company || "").toLowerCase().includes(k) ||
          (j.daichi || j.location || "").toLowerCase().includes(k) ||
          (j.luong || j.salary || "").toLowerCase().includes(k)
      )
      .slice(0, 12);
  }

  function showPanel(items) {
    if (!items || items.length === 0) {
      panel.innerHTML = `<div class="empty">Không tìm thấy công việc nào</div>`;
    } else {
      panel.innerHTML = items.map(itemHTML).join("");
    }
    panel.classList.add("show");
    panel.setAttribute("aria-expanded", "true");
    activeIndex = -1;

    panel.querySelectorAll(".result-item").forEach((el, idx) => {
      el.addEventListener("click", () => selectItem(idx));
      el.addEventListener("mouseenter", () => setActive(idx));
    });
  }

  function hidePanel() {
    panel.classList.remove("show");
    panel.setAttribute("aria-expanded", "false");
    panel.innerHTML = "";
    activeIndex = -1;
  }

  /*
    Cập nhật 'selectItem'
    Thay vì 'alert', nó sẽ điều hướng đến trang chi tiết
  */
  function selectItem(idx) {
    const items = panel.querySelectorAll(".result-item");
    const el = items[idx];
    if (!el) return;

    const jobId = el.getAttribute("data-id"); // Lấy 'id'

    if (jobId) {
      // Điều hướng đến trang chi tiết
      window.location.href = `Trangchitiet.html?id=${encodeURIComponent(
        jobId
      )}`;
    } else {
      // Dự phòng nếu không có 'id'
      const title = el.getAttribute("data-title") || "";
      const company = el.getAttribute("data-cty") || "";
      alert(`Lỗi: Không tìm thấy ID cho: ${title} — ${company}`);
    }

    hidePanel();
  }

  function setActive(idx) {
    const items = panel.querySelectorAll(".result-item");
    items.forEach((i) => i.classList.remove("active"));
    const el = items[idx];
    if (el) {
      el.classList.add("active");
      activeIndex = idx;
      el.focus();
    }
  }

  function debounce(fn, wait = 200) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  const doSearch = () => {
    const kw = input.value || "";
    const list = filterJobs(kw);
    if (kw.trim() === "") {
      hidePanel();
      return;
    }
    showPanel(list);
  };

  input.addEventListener("input", debounce(doSearch, 250));
  btn.addEventListener("click", doSearch);

  input.addEventListener("keydown", (e) => {
    const items = panel.querySelectorAll(".result-item");
    if (!panel.classList.contains("show")) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(Math.min(items.length - 1, activeIndex + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(Math.max(0, activeIndex - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) selectItem(activeIndex);
    } else if (e.key === "Escape") {
      hidePanel();
    }
  });

  document.addEventListener("click", (e) => {
    const inside = e.target.closest(".search-box");
    if (!inside) hidePanel();
  });

// SỬA LỖI: Gọi hàm trực tiếp
initJobs();
})();
