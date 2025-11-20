          let job = null;
  // Trang chi tiết: load job theo id và populate đầy đủ
      document.addEventListener("DOMContentLoaded", () => {
        populateDetailPage().catch(console.warn);
      });

      async function populateDetailPage() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        // helpers
        function safeParseJson(str) {
          try {
            return JSON.parse(str);
          } catch (e) {
            return [];
          }
        }
        async function fetchJson(url) {
          try {
            const r = await fetch(url, { cache: "no-cache" });
            return r.ok ? await r.json() : [];
          } catch (e) {
            return [];
          }
        }
        function fmtDate(raw) {
          if (!raw) return "";
          const d = new Date(raw);
          return isNaN(d.getTime())
            ? String(raw)
            : d.toLocaleDateString("vi-VN");
        }
        const setText = (sel, v) => {
          const el = document.querySelector(sel);
          if (el) el.textContent = v ?? "";
        };

        // 1) Lấy nguồn dữ liệu (ưu tiên localStorage)
        let jobs = safeParseJson(localStorage.getItem("jobs") || "[]");
        if (!Array.isArray(jobs) || jobs.length === 0) {
          
          /* SỬA LỖI 3:
            Sửa 'JSon' thành 'Json' (viết thường)
          */
          const [a, b] = await Promise.all([
            fetchJson("JSon/jobs3.json"),
            fetchJson("JSon/jobs4.json"),
          ]);
          jobs = (a || []).concat(b || []);
        }

        // 2) Tìm job theo id

        if (id) {
          const decoded = decodeURIComponent(id);
          job = jobs.find((j) => String(j.id) === String(decoded)) || null;
          if (!job) {
            const needle = decoded.replace(/_/g, " ").toLowerCase();
            job =
              jobs.find((j) =>
                ((j.nghe || j.title || "") + " " + (j.cty || j.company || ""))
                  .toLowerCase()
                  .includes(needle)
              ) || null;
          }
        } else {
          job = jobs[0] || null;
        }

        /* SỬA LỖI 4:
          Thêm khối "chống crash" này
        */
        if (!job) {
          const main = document.querySelector("main") || document.body;
          const p = document.createElement("p");
          p.style.textAlign = "center";
          p.style.padding = "20px";
          p.style.fontSize = "1.2rem";
          p.textContent = `Không tìm thấy công việc với ID: ${id}. Vui lòng quay lại trang chủ.`;

          // Xóa nội dung mẫu và hiển thị lỗi
          const container = document.querySelector(".divtongitem");
          if (container) container.innerHTML = "";
          setText("#title", "Không tìm thấy công việc"); // Cập nhật banner

          main.prepend(p);
          return; // Dừng hàm tại đây
        }

        // 3) Populate các trường
        const title = job.nghe || job.title || "";
        const company = job.cty || job.company || "";
        const salary =
          job.luongDisplay ?? job.luongRaw ?? job.luong ?? job.salary ?? "";
        const location = job.vitri || job.daichi || job.location || "";
        const address = job.diachi || job.address || "";
        const expiry = job.expiry || job.ngayhethang || "";

        setText("#title", title);
        setText("#title2", title);
        setText("#title3", company); // công ty ở cột phải
        setText("#salary", salary);
        setText("#location", location);
        setText("#location2", location);
        setText("#address", address);
        setText("#expiry", expiry ? fmtDate(expiry) : "Chưa có hạn nộp");
        setText("#howtoapply", job.cachthuc || job.howtoapply || "");

        // nội dung dài: giữ xuống dòng bằng .preserve
        setText("#jobDetail", job.chitietcongviec || job.description || "");
        setText("#request", job.yeucau || job.request || "");
        setText("#benefits", job.quyenloi || job.benefits || "");

        // các thông tin cột phải
        setText("#quymo", job.quymo || job.quyMo || "");
        setText("#field", job.linhvuc || job.field || "");

        // logo
        const logoEl = document.querySelector(".logocty");
        if (logoEl) {
          const logo = job.logo || job.logoURL || "";
          logoEl.src = logo ? `Img/${logo}` : "Img/matdinh2.png";
          logoEl.alt = company || "Logo công ty";
        }

        // 4) (tùy chọn) tăng views và lưu lại
        try {
          job.views = (Number(job.views) || 0) + 1;
          const stored = safeParseJson(localStorage.getItem("jobs") || "[]");
          const ix = stored.findIndex((j) => String(j.id) === String(job.id));
          if (ix >= 0) stored[ix] = job;
          else stored.unshift(job);
          localStorage.setItem("jobs", JSON.stringify(stored));
        } catch (e) {
          console.warn("Không lưu được views", e);
        }
      }

      (function () {
        const imgFolder = "Img/";

        let allJobs = [];
        let activeIndex = -1;

        const input = document.getElementById("searchInput");
        const btn = document.getElementById("searchBtn");
        const panel = document.getElementById("searchResults");

        if (!input || !btn || !panel) {
          console.warn("Trang này không có đủ các thành phần tìm kiếm.");
          return;
        }

        async function initJobs() {
          try {
            // Sửa 'JSon' thành 'Json'
            const res1 = await fetch("JSon/jobs3.json", { cache: "no-cache" });
            const res2 = await fetch("JSon/jobs4.json", { cache: "no-cache" });

            const jobs1 = res1.ok ? await res1.json() : [];
            const jobs2 = res2.ok ? await res2.json() : [];
            
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

        function selectItem(idx) {
          const items = panel.querySelectorAll(".result-item");
          const el = items[idx];
          if (!el) return;

          const jobId = el.getAttribute("data-id"); // Lấy 'id'

          if (jobId) {
            // Điều hướng đến trang chi tiết
            window.location.href = `trangchitiet.html?id=${encodeURIComponent(
              jobId
            )}`;
          } else {
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

        document.addEventListener("DOMContentLoaded", initJobs);
      })();

      document.addEventListener("DOMContentLoaded", () => {
   const applyBtn = document.getElementById("applyBtn");
  if (applyBtn) {
applyBtn.addEventListener("click", () => {
  localStorage.setItem("currentJob", JSON.stringify(job));
  window.location.href = `UngTuyen.html?jobId=${encodeURIComponent(job.id)}&ntdId=${encodeURIComponent(job.ntdId)}`;
});


  }
});
