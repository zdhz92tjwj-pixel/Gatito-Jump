# Gatito-Jump
Ss
<!doctype html>

<title>Touch me - Gatito</title> <style> :root{--pink:#ffb6d5;} html,body{height:100%;margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;} body{background:var(--pink);display:flex;align-items:center;justify-content:center;} .card{ background:#fff; width:260px; height:120px; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.18); display:flex; align-items:center; justify-content:center; cursor:pointer; user-select:none; transition:transform .12s ease, box-shadow .12s ease; font-weight:700; font-size:20px; color:#333; } .card:active{transform:scale(.98);box-shadow:0 6px 18px rgba(0,0,0,0.14);} .overlay{ position:fixed;inset:0;background:rgba(0,0,0,0.35);display:none;align-items:center;justify-content:center;padding:20px; } .overlay.show{display:flex;animation:fadeIn .18s ease;} .modal{ background:rgba(255,255,255,0.98); border-radius:14px; padding:18px; max-width:420px; width:100%; box-shadow:0 12px 36px rgba(0,0,0,0.28); display:flex; gap:12px; align-items:flex-start; } .cat-svg{ width:96px;height:96px;flex:0 0 96px; animation:jump 1s ease-in-out infinite alternate; } @Keyframes jump { 0% { transform: translateY(0); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0); } } .bubble{ background:#fff; border-radius:10px; padding:12px 14px; box-shadow:0 6px 18px rgba(0,0,0,0.06); font-size:18px; color:#222; line-height:1.2; } .close{ margin-left:auto; background:transparent; border:0; font-size:20px; cursor:pointer; color:#666; } .small{font-size:13px;color:#666;margin-top:8px;} @Keyframes fadeIn{from{opacity:0}to{opacity:1}} </style>
touch me
  <div>
    <div class="bubble" id="bubbleText">¿Te recordé hoy que te amo?</div>
    <div class="small">Presioná fuera del cuadro o en la X para cerrar.</div>
  </div>

  <button class="close" id="closeBtn" aria-label="Cerrar">✕</button>
</div>
<script> const overlay = document.getElementById('overlay'); const touch = document.getElementById('touch'); const closeBtn = document.getElementById('closeBtn'); function openModal() { overlay.classList.add('show'); closeBtn.focus(); } function closeModal() { overlay.classList.remove('show'); } touch.addEventListener('click', openModal); closeBtn.addEventListener('click', closeModal); overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); }); window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); }); </script>