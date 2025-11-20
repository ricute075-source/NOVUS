
function esc(v){ return String(v == null ? '' : v); }
function safeParseJson(str, fallback = []) {
  try { const v = JSON.parse(str); return Array.isArray(v) ? v : fallback; }
  catch(e){ return fallback; }
}
function ensureId(job, prefix, idx) {
  if (!job || typeof job !== 'object') return null;
  if (!job.id) job.id = job._id ?? job.slug ?? `${prefix}_${idx}`;
  return job;
}

// Global state
let allJobs = [];

// Core: load + merge + dedupe + persist + render
async function loadJobs() {
  const container = document.getElementById('jobsTable1');
  if (!container) {
    console.warn('#jobsTable1 not found'); 
    return;
  }

  // 1) tải base từ JSON
  let base = [];
  try {
    const res = await fetch('JSon/jobs3.json', { cache: 'no-cache' });
    if (res.ok) base = await res.json();
  } catch (err) {
    console.warn('Không tải được jobs3.json', err);
  }
  if (!Array.isArray(base)) base = [];

  // 2) đọc saved từ localStorage
  const saved = safeParseJson(localStorage.getItem('jobs'), []);

  // 3) chuẩn hóa id
  base = base.map((j,i) => ensureId(j, 'base', i)).filter(Boolean);
  const savedNormalized = saved.map((j,i) => ensureId(j, 'saved', i)).filter(Boolean);

  // 4) merge: ưu tiên saved (đặt trước), sau đó base nếu chưa có
  const merged = [];
  const seen = new Set();
  savedNormalized.forEach(j => { merged.push(j); seen.add(String(j.id)); });
  base.forEach(j => { if (!seen.has(String(j.id))) { merged.push(j); seen.add(String(j.id)); } });

  // 5) dedupe theo id (phòng trường hợp id trùng do data lỗi)
  const deduped = [];
  const seen2 = new Set();
  for (const j of merged) {
    const key = String(j.id ?? j._id ?? (j.nghe + '|' + j.cty)).trim();
    if (!key) continue;
    if (seen2.has(key)) {
      console.warn('Duplicate job skipped', key);
      continue;
    }
    seen2.add(key);
    deduped.push(j);
  }

  allJobs = deduped;

  // 6) persist (ghi lại localStorage từ merged/deduped)
  try { localStorage.setItem('jobs', JSON.stringify(allJobs)); }
  catch(e) { console.warn('Không lưu localStorage', e); }

  // 7) render
  renderJobs(allJobs);
}

// Render helper
function formatDate(raw) {
  if (!raw) return '';
  // accept YYYY-MM-DD or ISO or timestamp
  const d = new Date(raw);
  if (!isNaN(d.getTime())) return d.toLocaleDateString('vi-VN');
  // fallback: try split YYYY-MM-DD
  if (typeof raw === 'string' && raw.includes('-')) {
    const parts = raw.split('-');
    if (parts.length >= 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return String(raw);
}

function renderJobs(jobs) {
  const container = document.getElementById('jobsTable1');
  if (!container) return;

  if (!Array.isArray(jobs) || jobs.length === 0) {
    container.innerHTML = '<p>Không có việc làm phù hợp.</p>';
    return;
  }

  container.innerHTML = jobs.map(job => {
    const id = esc(job.id);
    const logo = esc(job.logo || 'matdinh2.png');
    const title = esc(job.nghe || job.title || '');
    const cty = esc(job.cty || job.company || '');
    const daichi = esc(job.daichi || job.diachi || '');
    const luong = esc(job.luongDisplay ?? job.luongRaw ?? job.luong ?? '');
    const phanhoi = esc(job.phanhoi || 'Thường phản hồi trong 2 giờ');
    const dadang = formatDate(job.dadang || job.posted || job.createdAt || '');

    return `
      <div class="job-card1" data-job-id="${id}" role="button" tabindex="0">
        <div class="logo1">
          <img src="Img/${logo}" alt="${cty}" class="anhdangnhap">
        </div>
        <div class="job-info1">
          <h3>${title}</h3>
          <p class="company1">${cty}</p>
          <div class="location1">
            <img src="Img/vitri.png" class="anh1515" alt="vị trí"> ${daichi || '<em>Địa điểm chưa rõ</em>'}<br>
            <span class="tienluong"><img src="Img/tien.png" class="anh1515" alt="lương"> ${luong || '<em>Thương lượng</em>'}</span>
          </div>
          <div class="divider1"></div>
          <div class="job-meta1">
            <p class="response-time1">${phanhoi}</p>
            <p class="posted1">${dadang || ''}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach handlers
  container.querySelectorAll('.job-card1').forEach(el => {
    const id = el.getAttribute('data-job-id');
    const openDetail = () => {
      if (!id) return;
      window.location.href = `Trangchitiet.html?id=${encodeURIComponent(id)}`;
    };
    el.addEventListener('click', openDetail);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openDetail(); });
  });
}

// Search/filter
function renderByName(keyword, options = {}) {
  const k = String(keyword || '').trim().toLowerCase();
  if (!k) { renderJobs(allJobs); return; }
  let filtered = allJobs.filter(job =>
    (job.nghe || job.title || '').toLowerCase().includes(k) ||
    (job.cty || job.company || '').toLowerCase().includes(k)
  );
  if (options.limit) filtered = filtered.slice(0, options.limit);
  renderJobs(filtered);
}

function setupSearchByName(inputSelector = '#searchInput', buttonSelector = '#searchBtn') {
  const input = document.querySelector(inputSelector);
  const btn = document.querySelector(buttonSelector);
  if (!input || !btn) return;
  const doSearch = () => renderByName(input.value, { limit: 60 });
  btn.addEventListener('click', doSearch);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(); });
}

// Guard: đảm bảo chỉ init 1 lần mỗi load
if (!window.__jobsInit) {
  window.__jobsInit = true;
  document.addEventListener('DOMContentLoaded', () => {
    loadJobs();
    setupSearchByName('#searchInput', '#searchBtn');
  });
} else {
  console.warn('Jobs manager already initialized, skipping duplicate init.');
}
async function initJobs(){
  try {
    const res = await fetch(DATA_URL, { cache: 'no-cache' });
    const base = await res.json();
    const saved = JSON.parse(localStorage.getItem('jobs')||'[]');
    allJobs = saved.concat(base); // saved trước, base sau
  } catch(e){ console.error(e); }
}
function filterVisible(jobs){
  const role = (localStorage.getItem('role')||'').toLowerCase();
  return jobs.filter(j=>{
    if (j.featured) return ['ntd','admin','premium'].includes(role);
    if (j.suggested) return ['user','ntd','admin','premium'].includes(role);
    return true; // job thường vẫn render
  });
}
