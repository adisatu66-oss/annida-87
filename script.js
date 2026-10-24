document.addEventListener('DOMContentLoaded', () => {
  const pilih = (selektor, akar = document) => akar.querySelector(selektor);
  const semua = (selektor, akar = document) => [...akar.querySelectorAll(selektor)];
  const navigasi = pilih('#navigasiUtama');
  const tombolMenu = pilih('#tombolMenu');
  const halaman = semua('[data-halaman]');
  const tautanNavigasi = semua('.tautan-nav');
  const tombolAtas = pilih('#tombolAtas');
  const notifikasi = pilih('#notifikasi');
  let pewaktuNotifikasi;
  let jumlahTayangan = 128;

  const dataBerita = {
    'detail-berita-1': {kategori:'AKADEMIK', tanggal:'12 Agustus 2026', judul:'Belajar kolaboratif, tumbuhkan rasa ingin tahu', penulis:'Tim Redaksi SMPIT Nurhidayah', waktu:'4 menit baca', gambar:'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85', alt:'Siswa belajar di kelas', pengantar:'Ruang kelas menjadi tempat siswa bertanya, mencoba, dan saling menguatkan.', paragraf:['Belajar adalah perjalanan yang lebih kaya ketika dilakukan bersama. Dalam kegiatan kolaboratif, siswa berlatih menyampaikan gagasan, mendengarkan pendapat teman, serta mencari solusi melalui proses yang terarah.','Guru mendampingi proses tersebut dengan memberi ruang untuk bertanya, bereksperimen, dan merefleksikan hasil. Setiap langkah menjadi kesempatan untuk tumbuh, baik dalam pengetahuan maupun karakter.','Artikel ini merupakan contoh konten awal. Sesuaikan dengan berita, tanggal, dokumentasi, dan informasi yang sudah diverifikasi oleh sekolah.']},
    'detail-berita-2': {kategori:'KARAKTER', tanggal:'5 Agustus 2026', judul:'Belajar peduli melalui aksi kebaikan', penulis:'Tim Redaksi SMPIT Nurhidayah', waktu:'3 menit baca', gambar:'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1400&q=85', alt:'Aktivitas luar ruang', pengantar:'Membiasakan kepedulian melalui kegiatan sederhana yang bermakna.', paragraf:['Kepedulian tumbuh dari kebiasaan kecil: menyapa dengan ramah, membantu teman, menjaga kebersihan, dan mendengarkan orang lain. Nilai-nilai ini menjadi bagian penting dari perjalanan belajar.','Melalui kegiatan bersama, siswa berlatih melihat kebutuhan di sekitarnya dan mengambil peran sesuai kemampuan. Harapannya, kebaikan tidak berhenti di sekolah, tetapi ikut hidup di rumah dan lingkungan.','Konten ini adalah contoh dan perlu diganti dengan dokumentasi kegiatan nyata sekolah.']},
    'detail-berita-3': {kategori:'KEGIATAN', tanggal:'28 Juli 2026', judul:'Pekan kreativitas: saat ide bertemu karya', penulis:'Tim Redaksi SMPIT Nurhidayah', waktu:'5 menit baca', gambar:'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=85', alt:'Siswa berkolaborasi', pengantar:'Perayaan proses belajar, kreativitas, dan keberanian untuk mencoba.', paragraf:['Setiap anak memiliki cara unik untuk menyampaikan gagasan. Kegiatan kreatif memberi ruang bagi siswa untuk mencoba teknik baru, bekerja sama, dan menyelesaikan karya dengan bangga.','Yang terpenting bukan hanya hasil akhir, melainkan proses bertanya, memperbaiki, dan belajar dari masukan. Dukungan teman dan guru membantu ide sederhana berkembang menjadi pengalaman berharga.','Konten ini merupakan contoh tata letak berita. Silakan perbarui dengan kegiatan dan informasi resmi.']}
  };

  function tampilkanNotifikasi(pesan) {
    notifikasi.textContent = pesan;
    notifikasi.classList.add('muncul');
    clearTimeout(pewaktuNotifikasi);
    pewaktuNotifikasi = setTimeout(() => notifikasi.classList.remove('muncul'), 2800);
  }

  function bukaHalaman(id, gulir = true) {
    const tujuan = id.startsWith('detail-berita-') ? 'detail-berita' : id;
    const halamanTujuan = pilih(`[data-halaman="${tujuan}"]`);
    if (!halamanTujuan) return;
    halaman.forEach(item => item.classList.toggle('aktif', item === halamanTujuan));
    tautanNavigasi.forEach(link => link.classList.toggle('aktif', link.getAttribute('href') === `#${tujuan}`));
    navigasi.classList.remove('buka');
    tombolMenu.setAttribute('aria-expanded', 'false');
    if (tujuan === 'detail-berita') muatBerita(id);
    if (gulir) window.scrollTo({top: 0, behavior: 'smooth'});
    setTimeout(amatiAnimasi, 80);
  }

  function muatBerita(id) {
    const berita = dataBerita[id] || dataBerita['detail-berita-1'];
    pilih('#kategoriDetail').textContent = berita.kategori;
    pilih('#tanggalDetail').textContent = berita.tanggal;
    pilih('#judulDetail').textContent = berita.judul;
    pilih('#penulisDetail').textContent = berita.penulis;
    pilih('#waktuBaca').textContent = berita.waktu;
    pilih('#gambarDetail').src = berita.gambar;
    pilih('#gambarDetail').alt = berita.alt;
    pilih('#pengantarDetail').textContent = berita.pengantar;
    const isi = pilih('#isiArtikel');
    isi.replaceChildren();
    berita.paragraf.slice(0, 2).forEach(teks => { const p = document.createElement('p'); p.textContent = teks; isi.append(p); });
    const kutipan = document.createElement('blockquote');
    kutipan.textContent = '“Setiap pertanyaan adalah awal dari penemuan baru.”';
    isi.append(kutipan);
    const akhir = document.createElement('p'); akhir.textContent = berita.paragraf[2]; isi.append(akhir);
    jumlahTayangan += 1;
    pilih('#jumlahTayangan').textContent = jumlahTayangan.toLocaleString('id-ID');
    document.title = berita.judul + ' — SMPIT Nurhidayah';
  }

  function tanganiRute() {
    const rute = decodeURIComponent(location.hash.slice(1));
    if (!rute || rute === 'atas') { bukaHalaman('beranda', false); return; }
    if (rute.startsWith('detail-berita-')) { bukaHalaman(rute, false); return; }
    if (rute === 'berita') { bukaHalaman('beranda', false); pilih('.berita-bagian').scrollIntoView({behavior:'smooth'}); return; }
    bukaHalaman(rute, false);
    if (rute !== 'developer' && rute !== 'detail-berita') document.title = 'SMPIT Nurhidayah — Tumbuh, Berilmu, Berakhlak';
  }
  window.addEventListener('hashchange', tanganiRute);
  semua('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    const rute = link.getAttribute('href').slice(1);
    if (rute && rute !== 'atas') setTimeout(() => { if (location.hash.slice(1) === rute) tanganiRute(); }, 0);
  }));
  tombolMenu.addEventListener('click', () => {
    const terbuka = navigasi.classList.toggle('buka');
    tombolMenu.setAttribute('aria-expanded', String(terbuka));
  });
  document.addEventListener('click', e => {
    if (!navigasi.contains(e.target) && !tombolMenu.contains(e.target)) {
      navigasi.classList.remove('buka'); tombolMenu.setAttribute('aria-expanded', 'false');
    }
  });

  // Slideshow utama: teks, gambar, dan indikator berganti otomatis.
  const slide = [
    {judul:'Tempat tumbuhnya<br><em>generasi berakhlak.</em>', deskripsi:'Mendampingi setiap langkah anak untuk mengenal potensi, mencintai ilmu, dan menebar kebaikan.', foto:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85', alt:'Suasana belajar siswa di lingkungan sekolah'},
    {judul:'Belajar dengan hati,<br><em>berkarya sepenuh arti.</em>', deskripsi:'Ruang belajar yang menguatkan rasa ingin tahu, kolaborasi, dan keberanian mencoba hal baru.', foto:'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85', alt:'Guru dan siswa di ruang kelas'},
    {judul:'Menjadi pribadi baik,<br><em>memberi manfaat.</em>', deskripsi:'Bersama keluarga dan guru, merawat akhlak dan menyiapkan langkah untuk masa depan.', foto:'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85', alt:'Siswa melakukan aktivitas bersama'}
  ];
  let indeksSlide = 0;
  function gantiSlide(indeks) {
    indeksSlide = (indeks + slide.length) % slide.length;
    const data = slide[indeksSlide];
    const judul = pilih('#judulBerganti');
    judul.animate([{opacity:1, transform:'translateY(0)'},{opacity:0,transform:'translateY(8px)'}], {duration:160, fill:'forwards'}).onfinish = () => {
      judul.innerHTML = data.judul;
      judul.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}], {duration:300, fill:'forwards'});
    };
    pilih('#deskripsiBerganti').textContent = data.deskripsi;
    const gambar = pilih('#fotoPahlawan');
    gambar.style.opacity = '.5';
    setTimeout(() => { gambar.src = data.foto; gambar.alt = data.alt; gambar.style.opacity = '1'; }, 130);
    semua('[data-slide]').forEach((tanda, i) => tanda.classList.toggle('slide-aktif', i === indeksSlide));
    pilih('#nomorSlide').textContent = `0${indeksSlide + 1} / 0${slide.length}`;
  }
  semua('[data-slide]').forEach(tanda => tanda.addEventListener('click', () => gantiSlide(Number(tanda.dataset.slide))));
  let jedaSlide = setInterval(() => gantiSlide(indeksSlide + 1), 6000);
  pilih('.pahlawan').addEventListener('mouseenter', () => clearInterval(jedaSlide));
  pilih('.pahlawan').addEventListener('mouseleave', () => { clearInterval(jedaSlide); jedaSlide = setInterval(() => gantiSlide(indeksSlide + 1), 6000); });

  // Testimoni berganti dengan tombol.
  const testimoni = [
    {isi:'Kami ingin anak belajar dengan bahagia, mengenal tanggung jawab, dan tetap dekat dengan nilai-nilai kebaikan. Semoga sekolah menjadi rumah kedua yang menguatkan langkahnya.', nama:'Orang Tua Siswa', peran:'Wali siswa · testimoni contoh'},
    {isi:'Anak-anak perlu ruang untuk bertanya, mencoba, dan belajar dari proses. Semoga setiap hari di sekolah menjadi pengalaman yang menumbuhkan rasa percaya diri.', nama:'Pendidik', peran:'Guru · kutipan ilustratif'},
    {isi:'Lingkungan belajar yang hangat membuat kami bersemangat untuk terus berkembang, saling menghargai, dan berani menyampaikan ide.', nama:'Siswa SMP', peran:'Siswa · kutipan ilustratif'}
  ];
  let indeksTestimoni = 0;
  function gantiTestimoni(arah) {
    indeksTestimoni = (indeksTestimoni + arah + testimoni.length) % testimoni.length;
    const t = testimoni[indeksTestimoni];
    const isi = pilih('#isiTestimoni');
    isi.animate([{opacity:1},{opacity:0}], {duration:120, fill:'forwards'}).onfinish = () => { isi.textContent = t.isi; isi.animate([{opacity:0},{opacity:1}], {duration:200, fill:'forwards'}); };
    pilih('#namaTestimoni').textContent = t.nama; pilih('#peranTestimoni').textContent = t.peran;
  }
  pilih('#testimoniSebelumnya').addEventListener('click', () => gantiTestimoni(-1));
  pilih('#testimoniBerikutnya').addEventListener('click', () => gantiTestimoni(1));

  // Animasi saat bagian memasuki area pandang.
  let pengamat;
  function amatiAnimasi() {
    if (pengamat) pengamat.disconnect();
    const aktif = pilih('.halaman.aktif');
    if (!aktif) return;
    const elemen = semua('.animasi-gulir', aktif);
    if (!('IntersectionObserver' in window)) { elemen.forEach(e => e.classList.add('terlihat')); return; }
    pengamat = new IntersectionObserver((entri, obs) => entri.forEach((entri, urutan) => {
      if (entri.isIntersecting) { entri.target.style.transitionDelay = `${Math.min(urutan % 4, 3) * 70}ms`; entri.target.classList.add('terlihat'); obs.unobserve(entri.target); }
    }), {threshold:.12});
    elemen.forEach(e => pengamat.observe(e));
  }
  amatiAnimasi();

  // Statistik bertambah saat terlihat, dengan parallax latar yang ringan.
  const bagianStatistik = pilih('.statistik');
  let statistikDimulai = false;
  if ('IntersectionObserver' in window) {
    const pengamatAngka = new IntersectionObserver(entri => {
      if (entri[0].isIntersecting && !statistikDimulai) {
        statistikDimulai = true;
        semua('[data-angka]').forEach(el => {
          const target = Number(el.dataset.angka), awal = performance.now(), durasi = 1400;
          function hitung(waktu) { const progres = Math.min((waktu-awal)/durasi,1); el.textContent = Math.floor(target*(1-Math.pow(1-progres,3))).toLocaleString('id-ID'); if(progres<1) requestAnimationFrame(hitung); }
          requestAnimationFrame(hitung);
        });
      }
    }, {threshold:.25});
    if (bagianStatistik) pengamatAngka.observe(bagianStatistik);
  }
  window.addEventListener('scroll', () => {
    tombolAtas.classList.toggle('muncul', window.scrollY > 450);
    if (bagianStatistik && window.innerWidth > 780) {
      const posisi = bagianStatistik.getBoundingClientRect();
      const latar = pilih('.statistik-latar', bagianStatistik);
      latar.style.transform = `translateY(${(posisi.top - window.innerHeight / 2) * -0.045}px)`;
    }
  }, {passive:true});
  tombolAtas.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Filter dan penampil foto galeri.
  semua('[data-filter]').forEach(tombol => tombol.addEventListener('click', () => {
    semua('[data-filter]').forEach(t => t.classList.toggle('filter-aktif', t === tombol));
    semua('.foto-galeri').forEach(foto => { foto.hidden = tombol.dataset.filter !== 'semua' && foto.dataset.kategori !== tombol.dataset.filter; });
  }));
  const penampil = pilih('#penampilFoto');
  semua('.foto-galeri').forEach(foto => foto.addEventListener('click', () => {
    const gambar = pilih('img', foto);
    pilih('#fotoBesar').src = gambar.src;
    pilih('#fotoBesar').alt = gambar.alt;
    pilih('#keteranganFotoBesar').textContent = foto.dataset.alt;
    penampil.hidden = false; document.body.style.overflow = 'hidden'; pilih('#tutupPenampil').focus();
  }));
  function tutupFoto() { penampil.hidden = true; document.body.style.overflow = ''; }
  pilih('#tutupPenampil').addEventListener('click', tutupFoto);
  penampil.addEventListener('click', e => { if (e.target === penampil) tutupFoto(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') tutupFoto(); });

  async function bagikan() {
    const data = {title: pilih('#judulDetail').textContent, text: 'Baca cerita dari SMPIT Nurhidayah', url: location.href};
    try {
      if (navigator.share) await navigator.share(data);
      else if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(location.href); tampilkanNotifikasi('Tautan berita berhasil disalin.'); }
      else { window.prompt('Salin tautan berita berikut:', location.href); }
    } catch (kesalahan) { if (kesalahan.name !== 'AbortError') tampilkanNotifikasi('Tautan siap dibagikan melalui alamat halaman ini.'); }
  }
  pilih('#bagikanBerita').addEventListener('click', bagikan);
  pilih('#bagikanArtikel').addEventListener('click', bagikan);
  pilih('#tahunSekarang').textContent = new Date().getFullYear();

  // Perbarui tampilan animasi ketika rute halaman berubah.
  if (location.hash) tanganiRute();
  else bukaHalaman('beranda', false);
});
