# GarantiSorgu.com

Türkiye'nin ilk kapsamlı ürün garanti süresi sorgulama platformu.

## 🚀 Hızlı Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Preview
npm run preview
```

## 📁 Proje Yapısı

```
garantisorgu/
├── data/                    # Statik JSON verileri
│   ├── markalar.json        # 20 marka garanti bilgileri
│   ├── kategoriler.json     # 12 ürün kategorisi
│   └── blog-posts.json      # Blog yazıları metadata
├── src/
│   ├── components/          # Astro bileşenleri
│   ├── layouts/             # Sayfa düzenleri
│   ├── lib/                 # TypeScript yardımcıları
│   │   ├── garantiHesapla.ts
│   │   ├── dateHelpers.ts
│   │   ├── dataLoader.ts
│   │   └── affiliateLinks.ts
│   ├── pages/               # Sayfa dosyaları
│   └── styles/              # Global CSS
├── public/                  # Statik dosyalar
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 📊 Veri Güncelleme

Garanti süreleri değiştiğinde sadece `data/markalar.json` dosyasını güncelleyin.
Build otomatik olarak yeni verileri kullanacaktır.

1. `data/markalar.json` dosyasını açın
2. İlgili markanın `kategoriler` bölümünü güncelleyin
3. `son_guncelleme` tarihini güncelleyin
4. `npm run build` ile yeniden derleyin

## 🌐 Deploy

Site Netlify üzerinde barındırılmaktadır. `main` branch'e push yapıldığında otomatik deploy gerçekleşir.

```bash
git push origin main
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
