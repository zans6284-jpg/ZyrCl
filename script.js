// Loading animated progress bar
if (window.location.pathname.endsWith('Loading.html')) {
  let percent = 0;
  const bar = document.getElementById('progress-bar');
  const label = document.getElementById('progress-percent');
  function runProgress() {
    percent += 1 + Math.random()*2;
    if(percent > 100) percent = 100;
    bar.style.width = percent + '%';
    label.textContent = Math.floor(percent) + '%';
    if(percent < 100) setTimeout(runProgress, 100); // Total waktu minimal 10 detik
    else setTimeout(()=>{
      bar.style.transition = 'all 0.8s cubic-bezier(.68,-0.55,.27,1.55)';
      bar.style.transform = 'translateY(80px) scaleX(0.8) skewY(24deg)';
      setTimeout(()=>window.location.href="Index.html", 1000);
    }, 800);
  }
  setTimeout(runProgress, 500);
}

// ---------- TikTok Downloader Function -----------
if (window.location.pathname.endsWith('TiktokD.html')) {
  document.getElementById('takevideo').onclick = async function() {
    const url = document.getElementById('tturl').value.trim();
    if (!url) return alert('Link TikTok tidak boleh kosong!');
    const info = document.getElementById('ttinfo');
    info.style.display = 'block';
    info.innerHTML = '<b>Loading...</b>';
    // Contoh API: https://api.tiklydown.me/api/download?url=<url>
    try {
      const res = await fetch('https://api.tiklydown.me/api/download?url=' + encodeURIComponent(url));
      const data = await res.json();
      if (!data || !data.video || !data.author) throw new Error('API Error!');
      info.innerHTML = `
        <video src="${data.video}" controls style="max-width:100%"></video>
        <div>👤Username: ${data.author.unique_id} | <b>${data.author.nickname}</b></div>
        <div>♥️Like: ${data.stats.diggCount} | 💬Komentar: ${data.stats.commentCount} | 🔶Favorit: ${data.stats.collectCount}</div>
        <div>👥 Views: ${data.stats.playCount} | 🌐Region: ${data.region}</div>
        <div>Caption: <i>${data.desc}</i></div>
        <button onclick="window.open('${data.video}', '_blank')">Download Video</button>
        <button onclick="window.open('${data.music}', '_blank')">Download Sound</button>
      `;
    } catch (e) {
      info.innerHTML = 'Gagal fetch TikTok info/video!';
    }
  }
}
// ----------- YTMP3 Function ------------
if(window.location.pathname.endsWith('Ytmp3.html')){
  document.getElementById('yttake').onclick = async function(){
    const url = document.getElementById('yturl').value.trim();
    if(!url){alert('Link YouTube kosong!');return;}
    const info = document.getElementById('ytinfo');
    info.innerHTML = 'Loading...';
    try{
      // API YT MP3 bisa diganti sesuai endpoint (placeholder)
      const res = await fetch('https://yya.su/api/mp3?url='+encodeURIComponent(url));
      const data = await res.json();
      if(data.title && data.link){
        info.innerHTML = `<video src="${data.thumb}" controls style="max-width:100%"></video>
         <div>Link: <a href="${url}" target="_blank">${url}</a></div>
         <div>Judul: ${data.title}</div>
         <button onclick="window.open('${data.link}','_blank')">Download MP3</button>`;
      }else{
        info.innerHTML = 'Tidak dapat mengambil info/mp3.';
      }
    }catch(e){info.innerHTML = 'Gagal ambil info/mp3 Youtube.';}
  }
}
// ----- Placeholder Remini & Upq Function ----
if(window.location.pathname.endsWith('Reminihd.html')){
  document.getElementById('hdBtn').onclick = function() {
    document.getElementById('reminiResult').innerHTML = `Demo mode! Integrasi ke API pengHDan Remini bisa ditambahkan di sini.`;
  }
}
if(window.location.pathname.endsWith('Upq.html')){
  document.getElementById('upbtn').onclick = function() {
    document.getElementById('upqresult').innerHTML = `Demo mode! Integrasi ke API pengHDan 1k bisa ditambahkan di sini.`;
  }
}
