export interface AffiliateLink {
  label: string;
  url: string;
  type: 'uzatma' | 'servis' | 'satin_al';
  marka?: string;
}

const affiliateLinks: Record<string, AffiliateLink[]> = {
  samsung: [
    {
      label: 'Samsung Care+ ile Garantini Uzat',
      url: 'https://www.samsung.com/tr/samsung-care-plus/',
      type: 'uzatma',
      marka: 'samsung'
    },
    {
      label: 'Samsung Yetkili Servis',
      url: 'https://www.samsung.com/tr/support/',
      type: 'servis',
      marka: 'samsung'
    }
  ],
  apple: [
    {
      label: 'AppleCare+ ile Garantini Uzat',
      url: 'https://www.apple.com/tr/support/products/',
      type: 'uzatma',
      marka: 'apple'
    },
    {
      label: 'Apple Destek',
      url: 'https://getsupport.apple.com',
      type: 'servis',
      marka: 'apple'
    }
  ],
  arcelik: [
    {
      label: 'Arçelik Yetkili Servis',
      url: 'https://www.arcelik.com.tr/servis',
      type: 'servis',
      marka: 'arcelik'
    }
  ],
  beko: [
    {
      label: 'Beko Yetkili Servis',
      url: 'https://www.beko.com.tr/servis',
      type: 'servis',
      marka: 'beko'
    }
  ],
  lg: [
    {
      label: 'LG Yetkili Servis',
      url: 'https://www.lg.com/tr/support',
      type: 'servis',
      marka: 'lg'
    }
  ],
  bosch: [
    {
      label: 'Bosch Yetkili Servis',
      url: 'https://www.bosch-home.com/tr/',
      type: 'servis',
      marka: 'bosch'
    }
  ],
  sony: [
    {
      label: 'Sony Yetkili Servis',
      url: 'https://www.sony.com.tr/support',
      type: 'servis',
      marka: 'sony'
    }
  ],
  dyson: [
    {
      label: 'Dyson Yetkili Servis',
      url: 'https://www.dyson.com.tr/support',
      type: 'servis',
      marka: 'dyson'
    }
  ],
  default: [
    {
      label: 'Uzatılmış Garanti Seçeneklerini İncele',
      url: 'https://www.amazon.com.tr/s?k=uzatilmis+garanti',
      type: 'uzatma'
    },
    {
      label: 'Yeni Ürün Fiyatlarını Karşılaştır',
      url: 'https://www.amazon.com.tr/s?k=elektronik',
      type: 'satin_al'
    }
  ]
};

export function getAffiliateLinks(markaId: string, durum: string): AffiliateLink[] {
  const markaLinks = affiliateLinks[markaId] || affiliateLinks.default;

  if (durum === 'bitmis') {
    return markaLinks.filter(l => l.type === 'servis').concat(
      affiliateLinks.default.filter(l => l.type === 'satin_al')
    );
  }

  if (durum === 'son_30_gun' || durum === 'son_90_gun') {
    return markaLinks.filter(l => l.type === 'uzatma' || l.type === 'servis');
  }

  return markaLinks;
}

export function getGeneralAffiliateLinks(): AffiliateLink[] {
  return [
    {
      label: 'Amazon TR — Elektronik Fırsatları',
      url: 'https://www.amazon.com.tr/s?k=elektronik+firsatlari',
      type: 'satin_al'
    },
    {
      label: 'Hepsiburada — Çok Satan Elektronik',
      url: 'https://www.hepsiburada.com/elektronik-c',
      type: 'satin_al'
    },
    {
      label: 'Teknosa — Uzatılmış Garanti',
      url: 'https://www.teknosa.com/uzatilmis-garanti',
      type: 'uzatma'
    }
  ];
}
