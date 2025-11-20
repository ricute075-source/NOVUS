let headerInnerHTML = `

<div class="nenbu" style="background: linear-gradient(90deg, #ffffff 0%, #9addff 100%);">



<nav id="wrapper">



<!-- (Code popup đăng nhập, đăng ký... của bạn được giữ nguyên) -->

<div id="loginPopup" class="popup">

  <div class="popup-content">

    <div class="close"><span style="  cursor: pointer;" onclick="closeLoginPopup()">&times;</span></div>

    <br>

    <h1 class="chaomungNOVUs">NOVUS CHÀO MỪNG BẠN</h1>

    <form>

<input type="text" class="inputne" id="loginUsername" placeholder="Tên đăng nhập">

<input type="password" class="inputne" id="loginPassword" placeholder="Mật khẩu">

<div class="quanly2nut">

  <center>

<button type="button" class="nutdangnhap" onclick="kiemTraDangNhap(event)"><strong>ĐĂNG NHẬP</strong></button>

    <button type="button"  class="google" onclick="signInWithGoogle()"><img src="Img/google.png" class="anhgg"><strong>Google</strong></button>

   </center>

</div>

<br>

   <p id="thongbao" style="color: red; display: none;">Sai Tài Khoản hoặc Mật Khẩu</p>

  <div class="phandkqmk">

    <a href="dangkyntd.html" class="quenmatkhau">Bạn là nhà tuyển dụng?</a>

    <span> | </span>

    <a href="#" class="dangkyngay">Đăng ký ngay</a>

  </div>

</form>

  </div>

</div>

<div id="popupOverlay" class="overlay">

  <div class="modal">

     <div class = "khung">

            <section class = "header"><button id="closeModalBtn" class="close2" aria-label="Đóng modal">✕</button></section>

        <section class = "dangkiungtuyen">

            <form id="registerForm">

                <h1 class ="dangki">Đăng kí ứng viên</h1>

            <section class = "nhapthongtin"> 

           <div class="ho_voi_ten">

  <input type="text" name="ho" placeholder="Họ">

  <input type="text" name="ten" placeholder="Tên">

</div>

                <input required class ="hovaten" name="tendangnhap" type = "text" placeholder="Tên đăng nhập">

            <input required class = "email" name="email" type="email" placeholder="Email">

            <section class = "password">

            <div class = "nhappassword"><input id = "mk" name="matkhau" required type = "password" placeholder="Nhập mật khẩu"><span id ="battatmk"><img src = "Img/Eye.png"></span></div>

            <div class = "nhappassword"><input id = "nhaplai" name="matkhau2" required type= "password" placeholder="Nhập lại mật khẩu"><span id ="anhienmk"><img src = "Img/Eye.png"></span></div>

             </section>

             <input required class = "sdt" name="sdt" type="text" placeholder="Số điện thoại">

             <div class ="thongbao"><input type="checkbox"><span>Luôn nhận thông báo từ NOVUS</span></div>

             <div class ="thoathuan"><input required type="checkbox"><span style="display:flex;white-space:nowrap;">Tôi đồng ý với   <a href="dieukhoan.html" style="white-space:nowrap;"> Chính sách </a> và <a href="quydinhbaomat.html" style="white-space:nowrap;"> Quy định bảo mật </a> của NOVUS</span></div>

             <div class ="or"><span>hoặc</span></div>

             <button class ="google" type= "button" aria-label= "Đăng nhập bằng google" onclick="signInWithGoogle()"><img src ="Img/google.png">Google</button>

            <div class ="ntd">Bạn là nhà tuyển dụng? Đăng ký&nbsp;<a href="dangkyntd.html">Nhà Tuyển Dụng</a>&nbsp;ngay</div>

            </section>

            <div class ="nutdangki"><input type ="submit" value="Đăng kí"></div>

            </form>

             <section class ="anhdangki">

            <img src ="Img/bannerdocdai.png" class="anhbannerthunho">

            </section>

        </section>

    </div>

</div>

</div>

<template id="profile-popup-template">

  <div class="profile-popup-backdrop" role="dialog" aria-modal="true">

    <div class="profile-popup" role="document" class="popupduynhatcostyle">

      <div class="profile-top">

        <div class="profile-left">

          <div class="profile-name">TÊN NGƯỜI DÙNG</div>

          <div class="profile-info">

          <br>

            <div><strong>SĐT:</strong> <span class="pp-phone"></span></div>

            <div><strong>Email:</strong> <span class="pp-email"></span></div>

          </div>

        </div>

        <div class="profile-avatar">

                 <button class="btn-logout">ĐĂNG XUẤT</button>

        </div>

      </div>

      <div class="profile-body">

      <div><img src="Img/thanhULnguoidung.png" class="thanhULnd"></div>

    


        </div>

        <nav class="profile-menu">


          <button class="profile-menu-item" id="openSettingsBtn">
  <img src="Img/setting.png" class="setting" alt="cài đặt">
  <strong style="margin-left:10px;" >  Chọn Ngôn Ngữ</strong>
</button>
          <button class="profile-menu-item" onclick="window.location.href='dieukhoan.html'"><img src="Img/chinhsach.png" class="setting" alt="chính sách"><strong style="margin-left:10px;" > Chính sách</strong></button>

        </nav>

      </div>

    </div>

  </div>

</template>


<div id="settingsPopup" class="popupup" style="display:none;">
  <div class="popup-contentup">
    <span class="closeup" id="closeSettingsBtn">&times;</span>
    <h2>Cài Đặt</h2>
    <p>Chọn ngôn ngữ để dịch trang:</p>
    <div id="google_translate_element"></div>
  </div>
</div>








<!-- (Hết code popup) -->



          <button id="hamburger-btn" class="hamburger-menu" aria-label="Mở menu" aria-expanded="false">

              <span class="hamburger-line"></span>

              <span class="hamburger-line"></span>

              <span class="hamburger-line"></span>

          </button>


           <div class="notification-wrapper">
        
        <i id="notification-toggle" class="fas fa-bell notification-icon"></i>
        <div class="submenu hidden">
            <div class="submenu-header">Thông báo</div>

<ul id="notificationList" class="submenu-list">

                <li class="submenu-item">
                    <img src="Img/logonovuschica.png" alt="logo">
                    <div class="item-content">
                        <div class="item-title">NOVUS</div>
                        <div class="item-desc">Tài Khoản Của Bạn Đã Được Duyệt</div>
                    </div>
                </li>
            </ul>

<div class="submenu-footer">
  <button id="showMoreBtn">Xem thêm</button>
</div>
        </div>
    </div> 
    
          
          <section id="logo">

            <img src="Img/LogoKhongMau.png" alt="Logo" />

          </section>

   

          <!-- 

            BỔ SUNG: Nút Hamburger (chỉ hiện trên di động)

          -->




          <!-- (Đây là code menu gốc của bạn) -->

          <section id="nav">

            <a href="index.html">Trang Chủ</a>

            <a href="VieclamChinhThucTamThoi.html">Tìm Việc</a>

            <a href="blog.html">Thảo Luận</a>

            <a href="Lienhe.html">Liên hệ</a>

          </section>

          <section id="hanhdong">

          <button class="navphaidangnhap" onclick="openLoginPopup()" style="cursor: pointer;border:none;">Đăng nhập</button>

          <div class="dangky_dangxuat"><button id="openModalBtn" class="navphaidangky">Đăng ký</button></div>

          </section>

          <div id="user-info"></div>





    

        </nav>

</div>

       

`;

const headerLinkTagCSS = `

<link rel="stylesheet" href="CSS/header.css">

<link rel="stylesheet" href="CSS/QuanLyPopup.css">`

;

document.head.innerHTML += headerLinkTagCSS;



document.body.getElementsByTagName("header")[0].innerHTML = headerInnerHTML;





// --- BỔ SUNG: LOGIC CHO SUBMENU DI ĐỘNG ---



function setupMobileMenu() {

    const hamburgerBtn = document.getElementById('hamburger-btn');

    const nav = document.getElementById('nav');

    const hanhdong = document.getElementById('hanhdong');



    if (!hamburgerBtn || !nav || !hanhdong) {

        // Nếu không tìm thấy các nút, không làm gì cả

        return;

    }



    // Thêm nút "Đóng" (X) vào bên trong menu

    const closeBtn = document.createElement('button');

    closeBtn.id = 'mobile-menu-close-btn';

    closeBtn.className = 'mobile-menu-close';

    closeBtn.innerHTML = '&times;';

    closeBtn.setAttribute('aria-label', 'Đóng menu');

    

    // Chèn nút Đóng vào đầu của <section id="nav">

    nav.prepend(closeBtn);



    // Khi bấm nút hamburger

hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn sự kiện lan tỏa
        
        // Kiểm tra xem menu đang đóng hay mở
        const isOpen = document.body.classList.contains('mobile-menu-open');

        // Đóng tất cả các popup khác trước
        closeAllPopups();

        // Nếu lúc nãy nó đang đóng, thì giờ mở ra
        // (Vì hàm closeAllPopups ở trên đã tắt nó đi rồi, nên ta phải check biến isOpen trước đó)
        if (!isOpen) {
            document.body.classList.add('mobile-menu-open');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
        }
    });


    // Khi bấm nút "Đóng" (X)

    closeBtn.addEventListener('click', () => {

        document.body.classList.remove('mobile-menu-open');

        hamburgerBtn.setAttribute('aria-expanded', 'false');

    });

}



// Chạy hàm setup sau khi DOM (HTML) đã tải xong

if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', setupMobileMenu);

} else {

    // DOM đã sẵn sàng

    setupMobileMenu();

}



// Mở popup khi bấm nút Cài Đặt
function showProfilePopup() {
  const template = document.getElementById('profile-popup-template');
  const clone = template.content.cloneNode(true);
  document.body.appendChild(clone);

  // Sau khi clone, phần tử openSettingsBtn mới có thật
  const settingsBtn = document.getElementById("openSettingsBtn");
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
    closeAllPopups();
      document.getElementById("settingsPopup").style.display = "flex";
    });
  }

  const closeBtn = document.getElementById("closeSettingsBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("settingsPopup").style.display = "none";
    });
  }
}


// Hàm khởi tạo Google Translate
// Hàm khởi tạo Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "vi",
      includedLanguages: "vi,en,ja,ko,zh-CN,zh-TW,fr,th,ru",
      autoDisplay: false,
    },
    "google_translate_element"
  );
}

// Load script Google Translate
const script = document.createElement("script");
script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(script);

// Sau khi DOM sẵn sàng, gắn sự kiện cho nút
document.addEventListener("click", (e) => {
  if (e.target.closest("#openSettingsBtn")) {
        closeAllPopups();
    document.getElementById("settingsPopup").style.display = "flex";
  }
  if (e.target.closest("#closeSettingsBtn")) {
    document.getElementById("settingsPopup").style.display = "none";
  }
});

// Lấy id người dùng hiện tại (tùy bạn lưu như nào; ví dụ: localStorage.usernameId)
function getCurrentUserId() {
  return localStorage.getItem('currentUserId') || null;
}

function loadNotificationsForCurrentUser() {
  const userId = getCurrentUserId();
  if (!userId) return [];
  const key = 'notifs_' + userId;
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch(e){ return []; }
}

function renderNotificationsForCurrentUser() {
  const listEl = document.getElementById('notificationList');
  const showMoreBtn = document.getElementById('showMoreBtn');
  if (!listEl) return;

  const arr = loadNotificationsForCurrentUser();


  const maxVisible = 3;
  const visibleArr = arr.slice(0, maxVisible);

  // render tối đa 3 thông báo
  visibleArr.forEach(n => {
    const li = document.createElement('li');
    li.className = 'submenu-item';

    const buttonHtml = n.link 
      ? `<button class="open-detail" onclick="window.location.href='${n.link}'">Xem hồ sơ</button>` 
      : "";

    li.innerHTML = `
      <img src="${n.logo || 'Img/logonovuschica.png'}" alt="logo">
      <div class="item-content">
        <div class="item-title">${n.title}</div>
        <div class="item-desc">${n.message}</div>
        <div class="item-time">${new Date(n.time).toLocaleString()}</div>
        ${buttonHtml}
      </div>
    `;
    listEl.appendChild(li);
  });

  // nếu có nhiều hơn 3 thì hiện nút "Xem thêm"
  if (arr.length > maxVisible) {
    showMoreBtn.style.display = "block";
    showMoreBtn.onclick = () => {
      listEl.innerHTML = "";
      arr.forEach(n => {
        const li = document.createElement('li');
        li.className = 'submenu-item';

        const buttonHtml = n.link 
          ? `<button class="open-detail" onclick="window.location.href='${n.link}'">Xem hồ sơ</button>` 
          : "";

        li.innerHTML = `
          <img src="${n.logo || 'Img/logonovuschica.png'}" alt="logo">
          <div class="item-content">
            <div class="item-title">${n.title}</div>
            <div class="item-desc">${n.message}</div>
            <div class="item-time">${new Date(n.time).toLocaleString()}</div>
            ${buttonHtml}
          </div>
        `;
        listEl.appendChild(li);
      });
      showMoreBtn.style.display = "none"; // ẩn nút sau khi bấm
    };
  } else {
    showMoreBtn.style.display = "none";
  }
}


window.addEventListener('app:notification-added-for-user', (ev) => {
  const current = getCurrentUserId();
  if (ev.detail && ev.detail.recipientId === current) {
    renderNotificationsForCurrentUser();
    // optional: show badge / toast
  }
});

// giữa tab (storage event)
window.addEventListener('storage', (e) => {
  if (!e.key) return;
  // nếu key startsWith 'notifs_' và dành cho current user, reload
  const current = getCurrentUserId();
  if (e.key === 'notifs_' + current || e.key === 'app_last_toast' || e.key === 'app_last_change') {
    renderNotificationsForCurrentUser();
  }
});


// escape đơn giản để tránh XSS
function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

document.addEventListener('DOMContentLoaded', () => {
  renderNotificationsForCurrentUser();
});
// --- ĐOẠN CODE NÀY DÀNH CHO TRANG CỦA NHÀ TUYỂN DỤNG ---

// 1. Lấy ID của người đang đăng nhập
const myCurrentId = localStorage.getItem("currentUserId");
const myRole = localStorage.getItem("role"); // Ví dụ: 'ntd'

if (myCurrentId && myRole === 'ntd') { // Chỉ chạy nếu là NTD
    
    // Hàm hiển thị thông báo (Bạn có thể thay bằng code hiển thị chuông đỏ)
    function checkNewMessages() {
        const myMailboxKey = 'notifications_' + myCurrentId;
        const notifs = JSON.parse(localStorage.getItem(myMailboxKey) || "[]");
        
        // Kiểm tra xem có thông báo nào chưa đọc không
        const unreadCount = notifs.filter(n => !n.isRead).length;
        
        if (unreadCount > 0) {
            // Cập nhật giao diện (Ví dụ: Hiện số đỏ trên quả chuông)
            console.log(`Bạn có ${unreadCount} thông báo mới!`);
            
            // Lấy thông báo mới nhất để Alert cho sinh động
            const newest = notifs[0];
            // Kiểm tra để tránh alert liên tục cái cũ, chỉ alert nếu nó rất mới (trong vòng 2 giây)
            const notifTime = new Date(newest.time).getTime();
            if (Date.now() - notifTime < 5000) {
                 alert("🔔 THÔNG BÁO MỚI:\n" + newest.message);
            }
        }
    }

    // 2. Lắng nghe sự kiện 'storage'
    // Sự kiện này tự động kích hoạt khi một tab KHÁC thay đổi localStorage
    window.addEventListener('storage', function(event) {
        // Nếu ứng viên vừa nộp hồ sơ (họ thay đổi key 'notifications_...' hoặc 'trigger_update')
        if (event.key && (event.key.startsWith('notifications_') || event.key === 'trigger_update')) {
            checkNewMessages();
        }
    });

    // Chạy 1 lần khi vừa load trang để xem có tin cũ không
    checkNewMessages();
}

  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const overlay = document.getElementById('popupOverlay');

  openBtn.addEventListener('click', () => {
        closeAllPopups();
    overlay.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

// đăng ký

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const ho = (formData.get('ho') || '').trim();
  const ten = (formData.get('ten') || '').trim();
  const tendangnhap = (formData.get('tendangnhap') || '').trim();
  const email = (formData.get('email') || '').trim();
  const pw = (formData.get('matkhau') || '').toString();
  const pw2 = (formData.get('matkhau2') || '').toString();
  const phone = (formData.get('sdt') || '').trim();

  if (pw !== pw2) {
    alert('❌ Mật khẩu nhập lại không khớp!');
    return;
  }
  if (phone.length !== 10 && phone.length !== 11) {
    alert('❌ Số điện thoại phải có 10 hoặc 11 chữ số!');
    return;
  }

  const key = 'dangkyList';
  const current = JSON.parse(localStorage.getItem(key) || '[]');

  if (current.some(u => u.email === email)) {
    alert('❌ Email đã tồn tại.');
    return;
  }
  if (current.some(u => u.tendangnhap === tendangnhap)) {
    alert('❌ Tên đăng nhập đã tồn tại.');
    return;
  }
  const fullName = `${ho} ${ten}`.trim();

const record = {
  ho,
  ten,
  tendangnhap,
  email,
  sdt: phone,
  matkhau: pw,
  ngayDangKy: new Date().toISOString(),
  trangthai: 'đã duyệt',
  fullname: fullName // lưu luôn vào record
};

  current.push(record);
localStorage.setItem(key, JSON.stringify(current));

// lưu thông tin hiển thị
localStorage.setItem('fullname', fullName);
localStorage.setItem('username', tendangnhap);
localStorage.setItem('email', email);
localStorage.setItem('sdt', phone);
localStorage.setItem('avt', 'Img/matdinh.png');
  alert('✅ Đăng ký thành công.');
  registerForm.reset();
  location.reload();
});


// đóng mở cập nhật giao diện avt người dùng

document.addEventListener('DOMContentLoaded', () => {
  const template = document.getElementById('profile-popup-template');
  if (!template) return;

  let popupNode = null;
  let backdropNode = null;
  let escHandler = null;

  function resolveContactFromStorage() {
    let email = localStorage.getItem('email') || '';
    let phone = localStorage.getItem('sdt') || '';

    if ((!email || !phone) && localStorage.getItem('dangkyList')) {
      try {
        const list = JSON.parse(localStorage.getItem('dangkyList') || '[]');
        const savedUsername = (localStorage.getItem('username') || '').toLowerCase();
        if (savedUsername) {
          const found = list.find(u => (u.tendangnhap || '').toLowerCase() === savedUsername);
          if (found) {
            email = email || (found.email || '');
            phone = phone || (found.sdt || '');
          }
        }
      } catch (err) {
        console.error('Lỗi parse dangkyList', err);
      }
    }

    return { email, phone };
  }

  function openProfilePopup(anchorEl, user = {}) {
    closeProfilePopup();

    const clone = template.content.cloneNode(true);
    const backdrop = clone.querySelector('.profile-popup-backdrop');
    const popup = clone.querySelector('.profile-popup');
    if (!backdrop || !popup) return;


    const nameEl = popup.querySelector('.profile-name');
    const emailEl = popup.querySelector('.pp-email');
    const phoneEl = popup.querySelector('.pp-phone');
    const avtImg = popup.querySelector('.pp-avt');

const fullName = localStorage.getItem('fullname') || '';
const displayName = user.name || 'TÊN NGƯỜI DÙNG';
if (nameEl) nameEl.textContent = fullName ? `${fullName} (${displayName})` : displayName;


    const contact = resolveContactFromStorage();
    const emailVal = user.email || contact.email || '';
    const phoneVal = user.phone || contact.phone || '';

    if (emailEl) emailEl.textContent = emailVal;
    if (phoneEl) phoneEl.textContent = phoneVal;
    if (avtImg && user.avt) avtImg.src = user.avt;

    document.body.appendChild(backdrop);
    backdrop.classList.add('show');


    const rect = anchorEl.getBoundingClientRect();
    const popupWidth = 424;
    const popupHeight = 325;
    let left = rect.left + window.scrollX + rect.width - popupWidth;
    let top = rect.bottom + window.scrollY + 8;

    if (left < 8) left = rect.left + window.scrollX;
    if (left + popupWidth > window.innerWidth - 8) left = window.innerWidth - popupWidth - 8;
    if (top + popupHeight > window.scrollY + window.innerHeight - 8) {
      top = rect.top + window.scrollY - popupHeight - 8;
    }

    backdrop.style.position = 'absolute';
    backdrop.style.left = '0';
    backdrop.style.top = '0';
    popup.style.position = 'absolute';
    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;

    popupNode = popup;
    backdropNode = backdrop;


    popup.querySelector('.profile-close')?.addEventListener('click', closeProfilePopup);
    backdrop.addEventListener('mousedown', (ev) => { if (!popup.contains(ev.target)) closeProfilePopup(); });

    escHandler = (e) => { if (e.key === 'Escape') closeProfilePopup(); };
    document.addEventListener('keydown', escHandler);

    backdrop._cleanup = () => { document.removeEventListener('keydown', escHandler); escHandler = null; };
  }

  function closeProfilePopup() {
    if (!backdropNode) return;
    if (typeof backdropNode._cleanup === 'function') backdropNode._cleanup();
    backdropNode.remove();
    backdropNode = null;
    popupNode = null;
  }


  document.addEventListener('click', (e) => {
const btn = e.target.closest('.nutavt1, .nutavt2');

    if (!btn) return;
    e.preventDefault();

    if (backdropNode) { closeProfilePopup(); return; }

    const user = {
      name: localStorage.getItem('username') || 'TÊN NGƯỜI DÙNG',
      email: localStorage.getItem('email') || '',
      phone: localStorage.getItem('sdt') || '',
      avt: localStorage.getItem('avt') || 'Img/matdinh.png'
    };
    closeAllPopups();
    openProfilePopup(btn, user);
  });

  window.closeProfilePopup = closeProfilePopup;
});




// logout

document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-logout');
    if (!btn) return;

    const keysToRemove = ['daDangNhap','fullname','displayName', 'username', 'avt', 'email', 'sdt','role'];
    keysToRemove.forEach(k => localStorage.removeItem(k));

    if (window.firebase && firebase.auth && typeof firebase.auth().signOut === 'function') {
      firebase.auth().signOut().catch(err => console.warn('Firebase signOut error:', err));
    }


    if (typeof window.closeProfilePopup === 'function') {
      try { window.closeProfilePopup(); } catch (e) {  }
    }


    const userInfo = document.getElementById('user-info');
    if (userInfo) userInfo.innerHTML = '';

    const hanhdong = document.getElementById('hanhdong') || document.getElementById('navtrai');
    if (hanhdong) hanhdong.style.display = '';

    location.reload();
  });
});

function openChangeNamePopup() {
  document.getElementById('changeNamePopup').style.display = 'flex';

  // điền sẵn dữ liệu hiện tại
  document.getElementById('newDisplayName').value = localStorage.getItem('username') || '';
  document.getElementById('newEmail').value = localStorage.getItem('email') || '';
  document.getElementById('newPhone').value = localStorage.getItem('sdt') || '';
}

function saveNewDisplayName() {
  const newName = document.getElementById('newDisplayName').value.trim();
  const newEmail = document.getElementById('newEmail').value.trim();
  const newPhone = document.getElementById('newPhone').value.trim();

  if (!newName) {
    alert("Vui lòng nhập tên hiển thị mới");
    return;
  }

  const key = 'dangkyList';
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  const currentEmail = localStorage.getItem('email') || '';

  // Kiểm tra trùng email
  if (newEmail && newEmail !== currentEmail) {
    const exists = list.some(u => u.email && u.email.toLowerCase() === newEmail.toLowerCase());
    if (exists) {
      alert("❌ Email đã tồn tại, vui lòng nhập email khác!");
      return;
    }
  }

  // Cập nhật bản ghi trong dangkyList nhưng KHÔNG đổi tendangnhap
  const updatedList = list.map(u => {
    if (u.email === currentEmail) {
      return {
        ...u,
        displayName: newName, // tên hiển thị
        email: newEmail || u.email,
        sdt: newPhone || u.sdt
      };
    }
    return u;
  });
  localStorage.setItem(key, JSON.stringify(updatedList));

  // Cập nhật localStorage cho user hiện tại
  localStorage.setItem('username', newName); // tên hiển thị
  if (newEmail) localStorage.setItem('email', newEmail);
  if (newPhone) localStorage.setItem('sdt', newPhone);

  closeChangeNamePopup();

  alert("✅ Thông tin đã được lưu thành công!");
  location.reload();
}

function closeChangeNamePopup() {
  const popup = document.getElementById('changeNamePopup');
  if (popup) {
    popup.style.display = 'none';
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const dangKyNgayLink = document.querySelector(".dangkyngay");
  const overlay = document.getElementById("popupOverlay");
  const loginPopup = document.getElementById("loginPopup");

  if (dangKyNgayLink && overlay) {
    dangKyNgayLink.addEventListener("click", (e) => {
      e.preventDefault(); // ngăn không cho nhảy trang #
      // Ẩn popup đăng nhập
      if (loginPopup) loginPopup.style.display = "none";
      // Hiện popup đăng ký
            closeAllPopups();
      overlay.style.display = "flex";
    });
  }
});
// xử lý đăng nhập
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm"); // form đăng nhập của bạn
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const tendangnhap = (formData.get("tendangnhap") || "").trim();
    const pw = (formData.get("matkhau") || "").toString();

    const list = JSON.parse(localStorage.getItem("dangkyList") || "[]");
    const found = list.find(u => u.tendangnhap === tendangnhap && u.matkhau === pw);

    if (!found) {
      alert("❌ Sai tên đăng nhập hoặc mật khẩu");
      return;
    }

    // nếu là nhà tuyển dụng thì gắn thêm {ntd}
    let displayName = found.tendangnhap;
    if (found.role === "ntd") {
      displayName = `${displayName}{ntd}`;
    }

// lưu thông tin đăng nhập hiện tại
localStorage.setItem("daDangNhap", "true");
localStorage.setItem("username", found.tendangnhap + (found.role === "ntd" ? "{ntd}" : ""));
localStorage.setItem("fullname", found.fullname || "");
localStorage.setItem("email", found.email || "");
localStorage.setItem("sdt", found.sdt || "");
localStorage.setItem("avt", "Img/matdinh.png");
localStorage.setItem("role", found.role || "ungvien");



    alert(`✅ Đăng nhập thành công: ${displayName}`);
    location.reload();
  });
});

function closeAllPopups() {
  // 1. Đóng các popup ID cứng
  ["loginPopup", "popupOverlay", "settingsPopup", "changeNamePopup"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  // 2. Đóng popup profile
  if (typeof window.closeProfilePopup === 'function') {
    window.closeProfilePopup();
  } else {
    const profileBackdrop = document.querySelector(".profile-popup-backdrop");
    if (profileBackdrop) profileBackdrop.remove();
  }

  // 3. Đóng submenu thông báo
  const notifSubmenu = document.querySelector(".notification-wrapper .submenu");
  if (notifSubmenu) {
    notifSubmenu.classList.remove("show");
    notifSubmenu.classList.add("hidden");
  }
  const notifIcon = document.getElementById("notification-toggle");
  if (notifIcon) notifIcon.classList.remove("active");

  // 4. (MỚI) Đóng Menu Mobile (Hamburger)
  document.body.classList.remove('mobile-menu-open');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
}


