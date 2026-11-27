// File: config.js
// Masukkan URL dan Key asli Anda di sini
const SUPABASE_URL = 'https://uasndiqnzekfsinahfug.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhc25kaXFuemVrZnNpbmFoZnVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNjg1NzcsImV4cCI6MjEwOTg0NDU3N30.MmrHQSdJFZE8nrO3PzA4N7IvEmouefSpPquWYdF0i80';

const session = JSON.parse(localStorage.getItem('nilai_pro_session') || '{}');
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: {
    headers: {
      'x-school-id': session.school_id || '',
      'x-user-role': session.role || '',   // 'admin' atau 'guru'
      'x-user-token': session.token || ''  // admin_token atau guru.code
    }
  }
});

// 1. Mencegah input selain angka dan titik (desimal)
function cegahBukanAngka(e) {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
}

// 2. Validasi KKM: min 30 maks 99 ATAU min 3 maks 9.9
function validasiKKM(e) {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) return;

    let isValid = (val >= 3 && val <= 9.9) || (val >= 30 && val <= 99);
    
    if (!isValid) {
        munculkanNotif("Nilai KKM harus antara 3 - 9.9 atau 30 - 99!");
        e.target.value = ""; // Mengosongkan input yang salah
    }
}

// 3. Validasi Bobot: min 0 maks 50
function validasiBobot(e) {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) return;

    if (val < 0 || val > 50) {
        munculkanNotif("Nilai Bobot harus antara 0 hingga 50!");
        e.target.value = ""; // Mengosongkan input yang salah
    }
}

// 4. Membuat Notifikasi di Kanan Bawah
function munculkanNotif(pesan) {
    let notif = document.createElement("div");
    notif.innerText = pesan;
    
    // Style notifikasi (kanan bawah, merah)
    Object.assign(notif.style, {
        position: "fixed", bottom: "20px", right: "20px",
        backgroundColor: "#e74c3c", color: "white",
        padding: "12px 20px", borderRadius: "6px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)", zIndex: "9999",
        transition: "opacity 0.3s ease-in-out"
    });

    document.body.appendChild(notif);

    // Hapus notif otomatis setelah 3 detik
    setTimeout(() => {
        notif.style.opacity = "0";
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}
