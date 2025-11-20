document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('future-form');
    const mapSection = document.getElementById('future-map');
    const timelineContainer = document.getElementById('timeline-container');
    const riskText = document.getElementById('risk-text');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Ambil Nilai dari Form
        const usiaSekolah = parseInt(document.getElementById('usia_sekolah').value);
        const usiaKuliah = parseInt(document.getElementById('usia_kuliah').value);
        const usiaKarirMapan = parseInt(document.getElementById('usia_karir_mapan').value);
        const usiaMenikah = parseInt(document.getElementById('usia_menikah').value);

        // 2. Buat Daftar Event (Timeline)
        const events = [
            { usia: usiaSekolah, label: 'Lulus SMA/SMK (Awal Kehidupan Mandiri)', type: 'primary' },
            { usia: usiaKuliah, label: 'Lulus Kuliah/Pelatihan (Mulai Cari Kerja)', type: 'primary' },
            { usia: usiaKarirMapan, label: 'Karir Mapan (Finansial Stabil)', type: 'primary' },
            { usia: usiaMenikah, label: 'Menikah Ideal', type: 'highlight' } // Event Menikah di-highlight
        ];

        // 3. Urutkan Event berdasarkan Usia
        events.sort((a, b) => a.usia - b.usia);

        // 4. Generate Timeline HTML
        timelineContainer.innerHTML = '';
        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('timeline-event');
            if (event.type === 'highlight') {
                eventDiv.classList.add('highlight');
            }
            
            eventDiv.innerHTML = `
                <h4>${event.usia} Tahun</h4>
                <p>${event.label}</p>
            `;
            timelineContainer.appendChild(eventDiv);
        });

        // 5. Penilaian Risiko (Sederhana)
        let assessment = "";
        let isRisky = false;

        if (usiaMenikah < 20) {
            assessment += "🛑 **Usia Menikah < 20 Tahun:** Menikah terlalu dini dapat meningkatkan risiko finansial, kesehatan, dan mental. PIK-R menyarankan perencanaan matang (minimal 20 tahun ke atas).\n";
            isRisky = true;
        }

        if (usiaMenikah < usiaKarirMapan) {
            assessment += "⚠️ **Menikah Sebelum Mapan:** Jika usia menikah lebih muda dari usia karir mapan, Anda harus mempersiapkan diri untuk kemungkinan tantangan finansial di awal pernikahan.\n";
            isRisky = true;
        }
        
        if (!isRisky) {
            assessment = "✅ Rencana Anda terlihat seimbang dan realistis. Terus kembangkan *life skill* Anda!";
        }

        riskText.innerText = assessment;

        // 6. Tampilkan Peta
        mapSection.classList.remove('hidden');
    });
});
