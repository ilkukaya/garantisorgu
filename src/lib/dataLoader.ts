import markalarData from '../../data/markalar.json';
import kategorilerData from '../../data/kategoriler.json';

export function loadMarkalar() {
  return markalarData;
}

export function loadMarkaBySlug(slug: string) {
  return markalarData.markalar.find((m: any) => m.slug === slug);
}

export function loadMarkaById(id: string) {
  return markalarData.markalar.find((m: any) => m.id === id);
}

export function loadKategoriler() {
  return kategorilerData;
}

export function loadKategoriBySlug(slug: string) {
  return kategorilerData.kategoriler.find((k: any) => k.slug === slug);
}

export function getMarkaKategorileri(markaId: string) {
  const marka = loadMarkaById(markaId);
  if (!marka || !marka.kategoriler) return [];
  return Object.keys(marka.kategoriler).map(katId => {
    const katData = marka.kategoriler[katId];
    const katInfo = kategorilerData.kategoriler.find((k: any) => k.id === katId);
    return {
      id: katId,
      ad: katInfo ? katInfo.ad : katId,
      ikon: katInfo ? katInfo.ikon : '📦',
      garanti_yil: katData.garanti_yil,
      ...katData
    };
  });
}

export function getKategoriMarkalar(kategoriId: string) {
  return markalarData.markalar
    .filter((m: any) => m.kategoriler && m.kategoriler[kategoriId])
    .map((m: any) => ({
      id: m.id,
      ad: m.ad,
      slug: m.slug,
      garanti_yil: m.kategoriler[kategoriId].garanti_yil,
      ...m.kategoriler[kategoriId]
    }));
}
