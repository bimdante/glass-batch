// URL ของเว็บแอป Apps Script (ลงท้าย /exec) หน้าเว็บนี้เรียก ?p=api เพื่อดึงข้อมูล
// ข้อมูลทุกอย่างอยู่ใน Google Drive ของเจ้าของบอท หน้าเว็บนี้เก็บแค่โค้ดแสดงผล
window.GLASS_API = 'https://script.google.com/macros/s/AKfycbwmbeA-xpOdBBgWOTjKTuws6u3fuaJQt3Z0dSsPutThBJEfLQSn1pdXGYuBiWoYsMcz3A/exec';

window.glassApi = function (params) {
  const qs = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
  // credentials: 'omit' → ไม่ส่ง cookie ของ Google จึงไม่ติดปัญหาล็อกอินหลายบัญชี
  return fetch(window.GLASS_API + '?p=api&' + qs, { credentials: 'omit' })
    .then(r => {
      if (!r.ok) throw new Error('เซิร์ฟเวอร์ตอบ ' + r.status);
      return r.json();
    });
};

window.esc = function (s) {
  return String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
};

window.thaiDate = function (iso) {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? (+m[3]) + '/' + (+m[2]) + '/' + m[1] : String(iso || '-');
};
