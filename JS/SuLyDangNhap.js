async function kiemTraDangNhap(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("loginUsername");
  const passwordInput = document.getElementById("loginPassword");
  const thongbao = document.getElementById("thongbao");

  // normalize input
  let usernameOrEmail = (usernameInput?.value || "").trim().toLowerCase();
  const password = (passwordInput?.value || "").toString();

  // if user types "name{ntd}", strip suffix
  usernameOrEmail = usernameOrEmail.replace(/\{ntd\}$/i, "");

  try {
    const uvList = JSON.parse(localStorage.getItem("dangkyList") || "[]");
    const ntdList = JSON.parse(localStorage.getItem("ntdList") || "[]");
    const list = [...uvList, ...ntdList];

    // helper to normalize a record’s username/email for matching
    const getUsernames = (u) => {
      const tdn = (u.tendangnhap || "").trim().toLowerCase();
      const un = (u.username || "").trim().toLowerCase();
      const em = (u.email || "").trim().toLowerCase();
      return { tdn, un, em };
    };

    const user = list.find(u => {
      const { tdn, un, em } = getUsernames(u);
      return usernameOrEmail === tdn || usernameOrEmail === un || usernameOrEmail === em;
    });

    // also normalize saved password to string for comparison
    if (user && String(user.matkhau) === String(password)) {
      localStorage.setItem("daDangNhap", "true");

      // build display name: prefer tendangnhap, else username, else email
// sau khi xác thực thành công
// sau khi xác thực thành công
localStorage.setItem("daDangNhap", "true");

// build display name: prefer tendangnhap, else username, else email
let baseName = (user.tendangnhap || user.username || user.email || "").trim();
let displayName = baseName;
if ((user.role || "").toLowerCase() === "ntd") {
  displayName = `${baseName}{ntd}`;

  // 👉 thêm các thông tin riêng cho NTD
// trong kiemTraDangNhap

localStorage.setItem("role", "ntd");

  localStorage.setItem("company", user.company || "");
  localStorage.setItem("repPhone", user.repPhone || "");
} else {
  localStorage.setItem("role", "ungvien");
}

localStorage.setItem("username", displayName);
localStorage.setItem("fullname", user.fullname || "");
localStorage.setItem("email", user.email || "");
localStorage.setItem("sdt", user.sdt || user.phone || "");
localStorage.setItem("avt", user.avt || "Img/matdinh.png");

localStorage.setItem("currentUserId", user.tendangnhap || user.username || user.email);


      if (thongbao) thongbao.style.display = "none";
      if (typeof closeLoginPopup === "function") closeLoginPopup();
      location.reload();
    } else {
      if (thongbao) thongbao.style.display = "block";
    }
  } catch (error) {
    console.error("Lỗi khi đăng nhập (local):", error);
    if (thongbao) thongbao.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const nutDangNhap = document.querySelector(".nutdangnhap");
  if (nutDangNhap) nutDangNhap.addEventListener("click", kiemTraDangNhap);


  const savedUsername = localStorage.getItem("username");
  const avt = localStorage.getItem("avt");
  if (savedUsername) {
    const navtrai = document.getElementById("hanhdong");
    if (navtrai) navtrai.style.display = "none";

    const userInfo = document.getElementById("user-info");
    if (userInfo) {
      userInfo.innerHTML = `
        <div>
          <div class="sldninline">
            <button class="nutbellvatinnhan" onclick=(toggleNotificationPanel())><img src="Img/belltt.png" class="bellvatinnhan1"></button>
  
          <div class="sldninline">

          </div>
          <div class="avt">
            <button class="nutavt1"><img src="${avt || 'Img/matdinh.png'}" class="nutavtanh1"></button>
            <button class="nutavt2"><img src="Img/nutxanhcomuiten.png" class="nutavtanh2"></button>
          </div>
        </div>
      `;
    }
  }
});

function toggleNotificationPanel() {
  const panel = document.querySelector('.submenu');
  if (!panel) return;

  const isOpen = panel.classList.contains('show');

  // đóng tất cả popup khác
  closeAllPopups();

  if (!isOpen) {
    panel.classList.remove('hidden');
    panel.classList.add('show');
    const notifIcon = document.getElementById("notification-toggle");
    if (notifIcon) notifIcon.classList.add("active");
  }
}

