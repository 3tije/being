const services=[
["🧠","Modalitas Terapi Spesifik","Motivational Interviewing, CBT untuk adiksi, 12-Step, dan pendekatan terarah."],
["🩺","Komorbiditas Klinis","Manajemen kasus adiksi dengan depresi, skizofrenia, dan gangguan mental lainnya."],
["🧩","Severe Denial & Motivasi Rendah","Strategi menangani penolakan kuat dan kesiapan berubah yang rendah."],
["🔍","Bedah Kasus Sulit","Case review terstruktur untuk memahami masalah dan pilihan intervensi."],
["🔄","Relapse Kronis","Pencegahan, penanganan, dan tindak lanjut pada kekambuhan berulang."],
["⚖️","Etika, Hukum & Boundaries","Dilema etika, aspek hukum, dan batasan profesional dalam pelayanan."],
["📋","Asesmen & Alat Tes","Pengembangan keterampilan asesmen dan penggunaan alat tes baru."],
["🌿","Countertransference","Pengelolaan emosi pribadi akibat paparan pengalaman dan cerita klien."],
["🗂️","Administrasi Klinis","Rekam medis, laporan profesional, dokumentasi, dan rujukan."],
["🏥","Tata Kelola Rehabilitasi","Penguatan mutu dan tata kelola rehabilitasi sesuai standar."],
["🎓","Karier & Sertifikasi","Persiapan uji kompetensi, uji sertifikasi, dan pengembangan profesi."],
["💼","Konsultasi Lintas Bidang","Dukungan hukum, keuangan, pendidikan, serta kebutuhan profesional lain."]
];
const pros=[
{name:"Dr. Aulia Santoso, M.Psi., Psikolog",initial:"AS",field:"Psikologi Klinis & Adiksi",tags:["klinis","adiksi","CBT"],years:"12 tahun",rating:"4.9",price:"Rp350.000"},
{name:"Raka Mahendra, M.Kes., ICAP II",initial:"RM",field:"Clinical Supervisor Adiksi",tags:["adiksi","rehabilitasi","relapse"],years:"15 tahun",rating:"4.8",price:"Rp325.000"},
{name:"Nadia Prameswari, M.Psi., Psikolog",initial:"NP",field:"Asesmen & Kesehatan Mental",tags:["klinis","asesmen","komorbiditas"],years:"9 tahun",rating:"4.9",price:"Rp375.000"},
{name:"Dimas Wicaksana, S.H., M.H.",initial:"DW",field:"Etika & Hukum Pelayanan",tags:["hukum","etik","boundaries"],years:"14 tahun",rating:"4.7",price:"Rp400.000"},
{name:"Maya Lestari, M.M., CHRP",initial:"ML",field:"Karier & Pengembangan Kompetensi",tags:["karier","sertifikasi","kompetensi"],years:"11 tahun",rating:"4.8",price:"Rp300.000"},
{name:"Farhan Akbar, M.Kes.",initial:"FA",field:"Tata Kelola Rehabilitasi",tags:["rehabilitasi","mutu","administrasi"],years:"13 tahun",rating:"4.8",price:"Rp350.000"}
];
const state={role:"client",requests:JSON.parse(localStorage.getItem("being_requests")||"[]")};

function renderServices(){
 serviceGrid.innerHTML=services.map((s,i)=>`<article class="service-card" data-service="${i}"><div class="service-icon">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join("");
 needCategory.innerHTML=services.map(s=>`<option>${s[1]}</option>`).join("");
 document.querySelectorAll(".service-card").forEach(c=>c.onclick=()=>{needCategory.selectedIndex=+c.dataset.service;openModal("needModal")});
}
function renderPros(filter="all"){
 professionalGrid.innerHTML=pros.filter(p=>filter==="all"||p.tags.includes(filter)).map(p=>`<article class="professional-card"><div class="pro-top"><div class="avatar big">${p.initial}</div><div><h3>${p.name}</h3><p>${p.field}</p><div class="rating">★ ${p.rating}</div></div></div><div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div><div class="pro-meta"><span>${p.years} pengalaman</span><strong>${p.price}</strong></div><button class="btn primary full" style="margin-top:16px" onclick="openModal('bookingModal')">Pilih Profesional</button></article>`).join("");
}
function openModal(id){document.getElementById(id).classList.add("open")}
function closeModals(){document.querySelectorAll(".modal").forEach(m=>m.classList.remove("open"))}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openModal(b.dataset.open));
document.querySelectorAll(".modal-close").forEach(b=>b.onclick=closeModals);
document.querySelectorAll(".modal").forEach(m=>m.onclick=e=>{if(e.target===m)closeModals()});
expertiseFilter.onchange=e=>renderPros(e.target.value);

loginForm.onsubmit=e=>{e.preventDefault();closeModals();showDashboard();toast("Berhasil masuk ke dashboard Being")};
needForm.onsubmit=e=>{
 e.preventDefault();
 state.requests.unshift({title:needTitle.value,category:needCategory.value,date:new Date().toLocaleDateString("id-ID"),status:"Matching"});
 localStorage.setItem("being_requests",JSON.stringify(state.requests));renderRequests();closeModals();toast("Matching engine sedang mencari profesional terbaik");setTimeout(()=>openModal("bookingModal"),650)
};
bookingForm.onsubmit=e=>{e.preventDefault();closeModals();toast("Jadwal berhasil dikonfirmasi");showDashboard()};
paymentForm.onsubmit=e=>{e.preventDefault();closeModals();toast("Pembayaran berhasil diproses. Status: LUNAS")};
profileForm.onsubmit=e=>{e.preventDefault();toast("Profil berhasil diperbarui")};
chatForm.onsubmit=e=>{e.preventDefault();const v=chatInput.value.trim();if(!v)return;messages.insertAdjacentHTML("beforeend",`<div class="message me">${v.replace(/</g,"&lt;")}</div>`);chatInput.value="";messages.scrollTop=messages.scrollHeight};

function renderRequests(){
 const defaults=[{title:"Strategi penanganan severe denial",category:"Severe Denial & Motivasi Rendah",date:"28/07/2026",status:"Terjadwal"}];
 const rows=[...state.requests,...defaults];
 requestTable.innerHTML=rows.map(r=>`<tr><td><b>${r.title}</b></td><td>${r.category}</td><td>${r.date}</td><td><span class="badge green">${r.status}</span></td><td><button class="text-btn">Detail</button></td></tr>`).join("");
}
function renderCalendar(){
 const heads=["Sen","Sel","Rab","Kam","Jum","Sab","Min"];
 calendarGrid.innerHTML=heads.map(x=>`<div><b>${x}</b></div>`).join("")+
 Array.from({length:35},(_,i)=>{let d=i-1;return `<div class="${d===30?'active-day':''}">${d>0&&d<=31?`<b>${d}</b>${d===30?'<span>19.30 Konsultasi</span>':''}`:''}</div>`}).join("");
}
function showDashboard(){
 document.querySelector("main > section.hero").classList.add("hidden");
 document.querySelectorAll("main > section:not(.dashboard)").forEach(s=>s.classList.add("hidden"));
 document.querySelector("footer").classList.add("hidden");
 dashboard.classList.remove("hidden");
 updateRoleUI();
 window.scrollTo(0,0);
}
exitDashboard.onclick=()=>{
 dashboard.classList.add("hidden");document.querySelectorAll("main > section:not(.dashboard)").forEach(s=>s.classList.remove("hidden"));document.querySelector("footer").classList.remove("hidden");window.scrollTo(0,0)
};
document.querySelectorAll(".side-link[data-panel]").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".side-link").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));document.getElementById("panel-"+b.dataset.panel).classList.add("active")
});
roleBtn.onclick=()=>{state.role=state.role==="client"?"professional":"client";roleBtn.textContent=state.role==="client"?"Mode Klien":"Mode Profesional";toast(`Mode ${state.role==="client"?"klien":"profesional"} dipilih`)};
professionalModeBtn.onclick=()=>{state.role="professional";showDashboard()};
function updateRoleUI(){
 const pro=state.role==="professional";
 sideRole.textContent=pro?"Dashboard Profesional":"Dashboard Klien";
 dashGreeting.textContent=pro?"Halo, Profesional Being":"Halo, Tri";
 upcomingTitle.textContent=pro?"Sesi Berikutnya":"Jadwal Mendatang";
 statGrid.innerHTML=(pro?[
 ["Permintaan Baru","8","+3 hari ini"],["Sesi Bulan Ini","24","+12%"],["Laporan Tertunda","3","Perlu tindakan"],["Pendapatan","Rp8,4 jt","+9%"]
 ]:[
 ["Layanan Aktif","1","Sedang berjalan"],["Jadwal","2","Bulan ini"],["Laporan","4","Dapat diunduh"],["Pembayaran","1","Menunggu"]
 ]).map(s=>`<div class="stat"><small>${s[0]}</small><strong>${s[1]}</strong><span>${s[2]}</span></div>`).join("");
 upcomingContent.innerHTML=pro?
 `<div class="appointment"><div class="date"><small>KAM</small><strong>30</strong></div><div class="grow"><h4>Supervisi Klinis — Tri Tjahyono</h4><p>19.30–20.30 WIB • Telekonsultasi</p></div><button class="btn primary" onclick="document.querySelector('[data-panel=consultation]').click()">Buka Sesi</button></div>`:
 `<div class="appointment"><div class="date"><small>KAM</small><strong>30</strong></div><div class="grow"><h4>Dr. Aulia Santoso, M.Psi., Psikolog</h4><p>19.30–20.30 WIB • Telekonsultasi</p></div><button class="btn primary" onclick="document.querySelector('[data-panel=consultation]').click()">Masuk Ruang</button></div>`;
}
downloadReport.onclick=()=>{
 const text=`LAPORAN HASIL KONSULTASI BEING\n\nKlien: Tri Tjahyono\nProfesional: Dr. Aulia Santoso, M.Psi., Psikolog\nTanggal: 30 Juli 2026\n\nRingkasan Masalah:\nStrategi penanganan klien dengan motivasi rendah dan severe denial.\n\nAnalisis:\nDiperlukan asesmen kesiapan berubah, identifikasi pola penolakan, dan pendekatan bertahap.\n\nRekomendasi:\n1. Gunakan Motivational Interviewing.\n2. Susun tujuan kecil dan terukur.\n3. Lakukan evaluasi berkala.\n\nTindak Lanjut:\nSesi supervisi lanjutan dalam dua minggu.`;
 const blob=new Blob([text],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Laporan-Konsultasi-Being.txt";a.click();URL.revokeObjectURL(a.href);toast("Laporan berhasil diunduh")
};
renderServices();renderPros();renderRequests();renderCalendar();updateRoleUI();
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
