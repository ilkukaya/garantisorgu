export interface GarantiSorgusu {
  markaId: string;
  kategoriId: string;
  satin_alma_tarihi: Date;
}

export interface GarantiSonucu {
  marka_adi: string;
  kategori_adi: string;
  satin_alma_tarihi: Date;
  garanti_bitis_tarihi: Date;
  ek_garanti_bitis?: { aciklama: string; tarih: Date }[];
  kalan_gun: number;
  kalan_ay: number;
  kalan_yil: number;
  durum: 'aktif' | 'bitmis' | 'son_30_gun' | 'son_90_gun';
  yuzde_gecen: number;
  yuzde_kalan: number;
  musteri_hizmetleri_tel: string;
  musteri_hizmetleri_web: string;
  uzatma_url?: string;
  uyarilar: string[];
}

export function garantiHesapla(
  sorgu: GarantiSorgusu,
  markaData: any,
  kategoriVerisi: any
): GarantiSonucu | null {

  const marka = markaData.markalar.find(
    (m: any) => m.id === sorgu.markaId
  );
  if (!marka) return null;

  const kategoriGaranti = marka.kategoriler[sorgu.kategoriId];
  if (!kategoriGaranti) return null;

  const bugun = new Date();
  bugun.setHours(0, 0, 0, 0);

  const satin_alma = new Date(sorgu.satin_alma_tarihi);
  satin_alma.setHours(0, 0, 0, 0);

  const garanti_bitis = new Date(satin_alma);
  garanti_bitis.setFullYear(
    garanti_bitis.getFullYear() + kategoriGaranti.garanti_yil
  );

  const ek_garantiler: { aciklama: string; tarih: Date }[] = [];

  if (kategoriGaranti.kompressor_garanti_yil) {
    const kompressor_bitis = new Date(satin_alma);
    kompressor_bitis.setFullYear(
      kompressor_bitis.getFullYear() +
      kategoriGaranti.kompressor_garanti_yil
    );
    ek_garantiler.push({
      aciklama: `Kompresör Garantisi (${kategoriGaranti.kompressor_garanti_yil} yıl)`,
      tarih: kompressor_bitis
    });
  }

  if (kategoriGaranti.motor_garanti_yil) {
    const motor_bitis = new Date(satin_alma);
    motor_bitis.setFullYear(
      motor_bitis.getFullYear() + kategoriGaranti.motor_garanti_yil
    );
    ek_garantiler.push({
      aciklama: `Motor Garantisi (${kategoriGaranti.motor_garanti_yil} yıl)`,
      tarih: motor_bitis
    });
  }

  if (kategoriGaranti.panel_garanti_yil) {
    const panel_bitis = new Date(satin_alma);
    panel_bitis.setFullYear(
      panel_bitis.getFullYear() + kategoriGaranti.panel_garanti_yil
    );
    ek_garantiler.push({
      aciklama: `Panel Garantisi (${kategoriGaranti.panel_garanti_yil} yıl)`,
      tarih: panel_bitis
    });
  }

  const kalan_ms = garanti_bitis.getTime() - bugun.getTime();
  const kalan_gun = Math.ceil(kalan_ms / (1000 * 60 * 60 * 24));
  const kalan_ay = Math.max(0, Math.floor(kalan_gun / 30));
  const kalan_yil = Math.max(0, Math.floor(kalan_gun / 365));

  const toplam_gun = kategoriGaranti.garanti_yil * 365;
  const gecen_gun = toplam_gun - kalan_gun;
  const yuzde_gecen = Math.min(100,
    Math.max(0, Math.round((gecen_gun / toplam_gun) * 100))
  );
  const yuzde_kalan = 100 - yuzde_gecen;

  let durum: GarantiSonucu['durum'];
  if (kalan_gun <= 0) {
    durum = 'bitmis';
  } else if (kalan_gun <= 30) {
    durum = 'son_30_gun';
  } else if (kalan_gun <= 90) {
    durum = 'son_90_gun';
  } else {
    durum = 'aktif';
  }

  const uyarilar: string[] = [];

  if (durum === 'son_30_gun') {
    uyarilar.push(
      '⚠️ Garantinizin bitmesine 30 günden az kaldı. ' +
      'Varsa şikayetlerinizi iletmeyi unutmayın.'
    );
  }

  if (durum === 'son_90_gun') {
    uyarilar.push(
      '📅 Garantiniz 90 gün içinde bitiyor. ' +
      'Uzatılmış garanti satın almayı değerlendirebilirsiniz.'
    );
  }

  if (kategoriGaranti.notlar) {
    uyarilar.push(`ℹ️ ${kategoriGaranti.notlar}`);
  }

  uyarilar.push(
    '📋 Türkiye\'de 6502 Sayılı Tüketici Koruma Kanunu ' +
    'kapsamında garanti belgesi zorunludur. Faturanızı saklayın.'
  );

  return {
    marka_adi: marka.ad,
    kategori_adi: sorgu.kategoriId,
    satin_alma_tarihi: satin_alma,
    garanti_bitis_tarihi: garanti_bitis,
    ek_garanti_bitis: ek_garantiler.length > 0 ? ek_garantiler : undefined,
    kalan_gun: Math.max(0, kalan_gun),
    kalan_ay,
    kalan_yil,
    durum,
    yuzde_gecen,
    yuzde_kalan,
    musteri_hizmetleri_tel: marka.musteri_hizmetleri_tel || '',
    musteri_hizmetleri_web: marka.musteri_hizmetleri_web || '',
    uzatma_url: kategoriGaranti.uzatma_url,
    uyarilar
  };
}
