import React, { useEffect, useMemo, useState } from 'react';

function psychologicalRound(price) {
  if (!price || price <= 0) return 0;
  const base = Math.floor(price / 100) * 100;
  const rounded = base + 90;
  if (rounded < price - 60) return base + 190;
  return rounded;
}

function ModelSearchInput({ initialValue, onSearch, onClear }) {
  const [draft, setDraft] = useState(initialValue || '');

  useEffect(() => {
    setDraft(initialValue || '');
  }, [initialValue]);

  const submitSearch = () => onSearch(draft.trim());

  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        inputMode="text"
        placeholder="Поиск модели (например: iPhone 13 Pro Max)"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            submitSearch();
          }
        }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
      />
      <div className="flex gap-2">
        <button onClick={submitSearch} className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-bold text-black transition hover:bg-cyan-400">
          Найти
        </button>
        <button
          onClick={() => {
            setDraft('');
            onClear();
          }}
          className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-800"
        >
          Сброс
        </button>
      </div>
    </div>
  );
}

function Badge({ children, className = '' }) {
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${className}`}>{children}</span>;
}

function Card({ children, className = '' }) {
  return <div className={`rounded-3xl border border-slate-800 bg-slate-900/90 p-5 ${className}`}>{children}</div>;
}

function NoPriceState({ title, note }) {
  return (
    <div className="rounded-3xl border border-rose-900/50 bg-rose-950/20 p-5">
      <div className="text-sm font-bold text-rose-300">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-300">{note}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-bold text-black hover:bg-cyan-400">Записать на диагностику</button>
        <button className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold text-slate-200 hover:bg-slate-800">Задать вопрос</button>
      </div>
    </div>
  );
}

const brandTabs = [
  { id: 'iphone', label: 'iPhone' },
  { id: 'samsung', label: 'Samsung' },
  { id: 'xiaomi', label: 'Xiaomi / Poco / Redmi' },
  { id: 'other', label: 'Другие бренды' },
];

const models = {
  iphone: [
    'iPhone 4', 'iPhone 5', 'iPhone 5s', 'iPhone 6', 'iPhone 6 Plus', 'iPhone 6s', 'iPhone 6s Plus',
    'iPhone 7', 'iPhone 7 Plus', 'iPhone 8', 'iPhone 8 Plus', 'iPhone SE 2020', 'iPhone SE 2022',
    'iPhone X', 'iPhone XR', 'iPhone XS', 'iPhone XS Max',
    'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max',
    'iPhone 12', 'iPhone 12 mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
    'iPhone 13', 'iPhone 13 mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
    'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
    'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
    'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
    'iPhone 17', 'iPhone 17 Air', 'iPhone 17 Pro', 'iPhone 17 Pro Max'
  ],
  samsung: [
    'Samsung A01', 'Samsung A01 Core', 'Samsung A02', 'Samsung A02s', 'Samsung A03', 'Samsung A03 Core', 'Samsung A03s',
    'Samsung A04', 'Samsung A04e', 'Samsung A04s', 'Samsung A05', 'Samsung A05s', 'Samsung A06', 'Samsung A07',
    'Samsung A10', 'Samsung A10s', 'Samsung A11', 'Samsung A12', 'Samsung A12 Nacho', 'Samsung A13', 'Samsung A13 5G',
    'Samsung A14', 'Samsung A14 5G', 'Samsung A15', 'Samsung A15 5G', 'Samsung A16', 'Samsung A20', 'Samsung A20s',
    'Samsung A21', 'Samsung A21s', 'Samsung A22', 'Samsung A22 5G', 'Samsung A23', 'Samsung A23 5G', 'Samsung A24', 'Samsung A25',
    'Samsung A30', 'Samsung A30s', 'Samsung A31', 'Samsung A32', 'Samsung A33', 'Samsung A33 5G', 'Samsung A34', 'Samsung A35',
    'Samsung A40', 'Samsung A41', 'Samsung A42', 'Samsung A50', 'Samsung A51', 'Samsung A52', 'Samsung A52s', 'Samsung A53', 'Samsung A53 5G',
    'Samsung A54', 'Samsung A55', 'Samsung A70', 'Samsung A71', 'Samsung A72', 'Samsung A73',
    'Samsung M11', 'Samsung M12', 'Samsung M13', 'Samsung M14', 'Samsung M15', 'Samsung M21', 'Samsung M22', 'Samsung M23', 'Samsung M31', 'Samsung M32', 'Samsung M33', 'Samsung M34', 'Samsung M51',
    'Samsung Note 8', 'Samsung Note 9', 'Samsung Note 10', 'Samsung Note 10 Plus', 'Samsung Note 20', 'Samsung Note 20 Ultra',
    'Samsung S6', 'Samsung S7', 'Samsung S8', 'Samsung S8 Plus', 'Samsung S9', 'Samsung S9 Plus',
    'Samsung S10', 'Samsung S10 Plus', 'Samsung S10e', 'Samsung S20', 'Samsung S20 FE', 'Samsung S20 Ultra',
    'Samsung S21', 'Samsung S21 FE', 'Samsung S21 Ultra', 'Samsung S22', 'Samsung S22 Ultra',
    'Samsung S23', 'Samsung S23 FE', 'Samsung S23 Ultra', 'Samsung S24', 'Samsung S24 FE', 'Samsung S24 Ultra',
    'Samsung S25', 'Samsung S25 Ultra',
    'Samsung Z Flip 1', 'Samsung Z Flip 2', 'Samsung Z Flip 3', 'Samsung Z Flip 4', 'Samsung Z Flip 5', 'Samsung Z Flip 6', 'Samsung Z Flip 7',
    'Samsung Z Fold 1', 'Samsung Z Fold 2', 'Samsung Z Fold 3', 'Samsung Z Fold 4', 'Samsung Z Fold 5', 'Samsung Z Fold 6', 'Samsung Z Fold 7'
  ],
  xiaomi: [
    'Poco C3', 'Poco C40', 'Poco C50', 'Poco C51', 'Poco C55', 'Poco C61', 'Poco C65', 'Poco C71', 'Poco C75',
    'Poco F1', 'Poco F2 Pro', 'Poco F3', 'Poco F3 5G', 'Poco F3 GT', 'Poco F4', 'Poco F4 5G', 'Poco F4 GT', 'Poco F5', 'Poco F5 5G', 'Poco F5 Pro', 'Poco F6', 'Poco F6 5G', 'Poco F6 Pro', 'Poco F7', 'Poco F7 Pro', 'Poco F7 Ultra',
    'Poco M2', 'Poco M2 Pro', 'Poco M3', 'Poco M3 Pro', 'Poco M4 5G', 'Poco M4 Pro', 'Poco M5', 'Poco M5s', 'Poco M6', 'Poco M6 Pro', 'Poco M7', 'Poco M7 Pro',
    'Poco X2', 'Poco X3', 'Poco X3 NFC', 'Poco X3 Pro', 'Poco X4 GT', 'Poco X4 Pro', 'Poco X5', 'Poco X5 5G', 'Poco X5 Pro', 'Poco X5 Pro 5G', 'Poco X6', 'Poco X6 5G', 'Poco X6 Pro', 'Poco X6 Pro 5G', 'Poco X7', 'Poco X7 Pro',
    'Redmi 3', 'Redmi 3 Pro', 'Redmi 3S', 'Redmi 4', 'Redmi 4A', 'Redmi 4X', 'Redmi 5', 'Redmi 5A', 'Redmi 5 Plus',
    'Redmi 6', 'Redmi 6A', 'Redmi 6 Pro', 'Redmi 7', 'Redmi 7A', 'Redmi 8', 'Redmi 8A', 'Redmi 9', 'Redmi 9A', 'Redmi 9C', 'Redmi 9T',
    'Redmi 10', 'Redmi 10A', 'Redmi 10C', 'Redmi 11A', 'Redmi 12', 'Redmi 12C', 'Redmi 13', 'Redmi 13C', 'Redmi 14C',
    'Redmi Note 7', 'Redmi Note 8', 'Redmi Note 8 Pro', 'Redmi Note 8T', 'Redmi Note 9', 'Redmi Note 9 Pro', 'Redmi Note 9S',
    'Redmi Note 10', 'Redmi Note 10 Pro', 'Redmi Note 11', 'Redmi Note 11 Pro', 'Redmi Note 11S',
    'Redmi Note 12', 'Redmi Note 12 5G', 'Redmi Note 12 Pro', 'Redmi Note 12S', 'Redmi Note 13', 'Redmi Note 13 Pro', 'Redmi Note 14 Pro',
    'Xiaomi 11T', 'Xiaomi 12', 'Xiaomi 12 Lite', 'Xiaomi 12T', 'Xiaomi 13', 'Xiaomi 13T', 'Xiaomi 14', 'Xiaomi 14T',
    'Xiaomi Mi 2', 'Xiaomi Mi 3', 'Xiaomi Mi 4', 'Xiaomi Mi 5', 'Xiaomi Mi 6', 'Xiaomi Mi 8', 'Xiaomi Mi 8 Lite', 'Xiaomi Mi 8 Pro', 'Xiaomi Mi 9', 'Xiaomi Mi 9 Lite', 'Xiaomi Mi 9T', 'Xiaomi Mi 10', 'Xiaomi Mi 10T', 'Xiaomi Mi 11', 'Xiaomi Mi 11 Lite'
  ],
  other: [
    'Alcatel 1B', 'Alcatel 1X', 'Alcatel 3L',
    'Asus Rog Phone 2', 'Asus Rog Phone 3', 'Asus Rog Phone 5', 'Asus Rog Phone 5S', 'Asus Rog Phone 6', 'Asus Rog Phone 8', 'Asus Rog Phone 9',
    'Asus Zenfone 8', 'Asus Zenfone 10', 'Asus Zenfone 11 Ultra', 'Asus Zenfone 12 Ultra',
    'Google Pixel 3', 'Google Pixel 4', 'Google Pixel 5', 'Google Pixel 6', 'Google Pixel 6 Pro', 'Google Pixel 7', 'Google Pixel 7 Pro', 'Google Pixel 8', 'Google Pixel 8 Pro', 'Google Pixel 9', 'Google Pixel 9 Pro', 'Google Pixel 10 Pro',
    'Honor 8', 'Honor 8A', 'Honor 8 Lite', 'Honor 9', 'Honor 9A', 'Honor 9 Lite', 'Honor 10', 'Honor 10 Lite', 'Honor 10X Lite', 'Honor 20', 'Honor 20 Lite', 'Honor 20 Pro', 'Honor 30', 'Honor 30S', 'Honor 50', 'Honor 50 Lite', 'Honor 70', 'Honor 90', 'Honor 100', 'Honor 200', 'Honor X5', 'Honor X6', 'Honor X7', 'Honor X8', 'Honor X9',
    'Huawei P20', 'Huawei P20 Lite', 'Huawei P20 Pro', 'Huawei P30', 'Huawei P30 Lite', 'Huawei P30 Pro', 'Huawei P40', 'Huawei P40 Lite', 'Huawei P40 Pro', 'Huawei P50', 'Huawei Y5', 'Huawei Y6', 'Huawei Y7', 'Huawei Y8', 'Huawei Y9', 'Huawei nova 5T', 'Huawei nova 7', 'Huawei nova 8',
    'Infinix Hot 10', 'Infinix Hot 11', 'Infinix Hot 12', 'Infinix Hot 20', 'Infinix Note 10', 'Infinix Note 11', 'Infinix Note 12', 'Infinix Note 30', 'Infinix Smart 6', 'Infinix Smart 7', 'Infinix Smart 8',
    'Motorola G54', 'Motorola G84',
    'Nokia G21', 'Nokia G22',
    'OnePlus 8', 'OnePlus 9', 'OnePlus 10', 'OnePlus 11',
    'Oppo A5', 'Oppo A16', 'Oppo A17', 'Oppo A18', 'Oppo A31', 'Oppo A38', 'Oppo A53', 'Oppo A54', 'Oppo A55', 'Oppo A57', 'Oppo A58', 'Oppo A77', 'Oppo A78', 'Oppo Reno 5', 'Oppo Reno 6', 'Oppo Reno 8',
    'Realme 6', 'Realme 7', 'Realme 8', 'Realme 8i', 'Realme 9', 'Realme 9 Pro', 'Realme 10', 'Realme 10 Pro', 'Realme 11', 'Realme 11 Pro', 'Realme 12', 'Realme 12 Pro', 'Realme C3', 'Realme C11', 'Realme C21', 'Realme C25', 'Realme C30', 'Realme C31', 'Realme C35', 'Realme C51', 'Realme C53', 'Realme C55', 'Realme C67', 'Realme Narzo 50',
    'Tecno Camon 17', 'Tecno Camon 18', 'Tecno Camon 19', 'Tecno Camon 20', 'Tecno Pova 4', 'Tecno Pova 5', 'Tecno Spark 8', 'Tecno Spark 10', 'Tecno Spark 20',
    'Vivo Y27', 'Vivo Y28', 'Vivo Y30', 'Vivo Y31', 'Vivo Y35', 'Vivo Y36', 'Vivo Y81', 'Vivo Y91',
    'itel A17', 'itel A25', 'itel A27', 'itel A48', 'itel A49', 'itel A60', 'itel A70', 'itel P40', 'itel P55', 'itel S23', 'itel S24', 'itel S25'
  ],
};

const supplierVariantMap = {
  'iPhone X': { battery: { cheap: 850, good: 850, orig: 1400 }, display: { cheap: 1240, good: 1650, orig: 2800 } },
  'iPhone XR': { battery: { cheap: 850, good: 850, orig: 1400 }, display: { cheap: 1240, good: 1860, orig: 2800 } },
  'iPhone XS': { battery: { cheap: 1000, good: 1000, orig: 1580 }, display: { cheap: 1240, good: 1760, orig: 5100 } },
  'iPhone XS Max': { battery: { cheap: 1000, good: 1000, orig: 1580 }, display: { cheap: 1550, good: 1860, orig: 5800 } },
  'iPhone 11': { battery: { cheap: 850, good: 850, orig: 1500 }, display: { cheap: 1190, good: 1760, orig: 2900 }, back: { good: 850 } },
  'iPhone 11 Pro': { battery: { cheap: 1120, good: 1120, orig: 1800 }, display: { cheap: 1340, good: 1960, orig: 5700 }, back: { good: 1300 } },
  'iPhone 11 Pro Max': { battery: { cheap: 1150, good: 1150, orig: 1900 }, display: { cheap: 1450, good: 2280, orig: 7200 } },
  'iPhone 12 mini': { battery: { cheap: 780, good: 780, orig: 1500 }, display: { cheap: 1600, good: 2370 } },
  'iPhone 12': { battery: { cheap: 780, good: 780, orig: 1500 }, display: { cheap: 1340, good: 1810, orig: 6600 }, back: { good: 890 } },
  'iPhone 12 Pro': { battery: { cheap: 1120, good: 1120, orig: 1800 }, display: { cheap: 1760, good: 1960, orig: 15350 }, back: { good: 1500 } },
  'iPhone 12 Pro Max': { battery: { cheap: 1120, good: 1120, orig: 1800 }, display: { cheap: 1760, good: 1960, orig: 15350 } },
  'iPhone 13 mini': { battery: { cheap: 820, good: 820, orig: 1500 }, display: { cheap: 1650, good: 2170, orig: 14730 } },
  'iPhone 13': { battery: { cheap: 820, good: 820, orig: 1500 }, display: { cheap: 1550, good: 2170, orig: 7700 }, back: { good: 950 } },
  'iPhone 13 Pro': { battery: { cheap: 1140, good: 1140, orig: 1790 }, display: { cheap: 1960, good: 2170, orig: 8500 }, back: { good: 1070 } },
  'iPhone 13 Pro Max': { battery: { cheap: 1210, good: 1210, orig: 1800 }, display: { cheap: 1960, good: 2170, orig: 14500 } },
  'iPhone 14': { battery: { cheap: 950, good: 950, orig: 1600 }, display: { cheap: 1650, good: 2480, orig: 7100 }, back: { good: 1400 } },
  'iPhone 14 Plus': { battery: { cheap: 1000, good: 1000, orig: 1700 }, display: { good: 2790 } },
  'iPhone 14 Pro': { battery: { cheap: 1270, good: 1270, orig: 1800 }, display: { cheap: 1960, good: 2680, orig: 15900 }, back: { good: 2100 } },
  'iPhone 14 Pro Max': { battery: { cheap: 1350, good: 1350, orig: 1800 }, display: { cheap: 2170, good: 4230, orig: 19500 } },
  'iPhone 15': { battery: { cheap: 1070, good: 1070, orig: 1800 }, display: { cheap: 1960, good: 2580, orig: 13900 }, back: { good: 2360 } },
  'iPhone 15 Plus': { battery: { cheap: 1160, good: 1160, orig: 1890 }, display: { cheap: 2990, good: 3300 } },
  'iPhone 15 Pro': { battery: { cheap: 1250, good: 1250, orig: 1800 }, display: { cheap: 1960, good: 2680, orig: 20900 }, back: { cheap: 1360 } },
  'iPhone 15 Pro Max': { battery: { cheap: 1600, good: 1600, orig: 2100 }, display: { cheap: 2370, good: 4430, orig: 24300 }, back: { cheap: 1360 } },
  'iPhone 16': { battery: { orig: 1700 }, display: { good: 4330 }, back: { cheap: 1050 } },
  'iPhone 16 Plus': { battery: { orig: 1800 }, display: { good: 6710 } },
  'iPhone 16 Pro': { battery: { orig: 2100 }, display: { good: 5050 }, back: { cheap: 1450 } },
  'iPhone 16 Pro Max': { battery: { orig: 2300 }, display: { good: 6900 }, back: { cheap: 1460 } },
  'Samsung A15': { battery: { cheap: 560 }, display: { cheap: 1250, good: 2350, orig: 4650 } },
  'Samsung A24': { battery: { cheap: 560 }, display: { cheap: 1390, good: 2390, orig: 4550 } },
  'Samsung A25': { battery: { cheap: 560 }, display: { cheap: 1450, good: 2450, orig: 4590 } },
  'Samsung A34': { battery: { cheap: 560 }, display: { cheap: 1390, good: 2450, orig: 4490 } },
  'Samsung A35': { battery: { cheap: 560 }, display: { cheap: 1450, good: 2550, orig: 4650 } },
  'Samsung A54': { battery: { cheap: 560 }, display: { cheap: 1390, good: 2450, orig: 5490 }, back: { cheap: 150 } },
  'Samsung A55': { battery: { cheap: 560 }, display: { cheap: 1650, good: 2890, orig: 5590 } },
  'Samsung S23': { battery: { good: 2000 }, display: { cheap: 4800, good: 7200, orig: 10900 } },
  'Samsung S23 Ultra': { display: { orig: 13790 }, back: { cheap: 600 } },
  'Samsung S24': { display: { orig: 9590 } },
  'Samsung S24 Ultra': { display: { orig: 14990 } },
  'Redmi Note 12': { battery: { cheap: 470, good: 1100 }, display: { good: 1990, orig: 2890 } },
  'Redmi Note 12 Pro': { display: { good: 2290, orig: 3190 } },
  'Redmi Note 13': { battery: { good: 1200 }, display: { cheap: 1250, good: 2290, orig: 4550 } },
  'Redmi Note 13 Pro': { display: { cheap: 1290, good: 2450, orig: 3450 } },
  'Poco X5': { battery: { good: 1300 }, display: { good: 1990, orig: 2890 } },
  'Poco X6': { battery: { good: 1050 }, display: { cheap: 1290, good: 2390, orig: 2750 } },
  'Poco F5': { display: { cheap: 1200, orig: 4850 }, back: { cheap: 200 } },
  'Poco F6': { display: { orig: 3650 } },
  'Honor 90': { battery: { good: 1700 }, display: { good: 2550 } },
  'Honor 200': { display: { good: 2850 } },
  'Oppo A78': { display: { good: 1690 } },
  'Realme 11': { display: { good: 1690 } },
  'Infinix Note 30': { display: { good: 1590, orig: 2450 } },
  'Tecno Spark 20': { display: { good: 990 } },
};

const supplierVariantMapOtp = {
  'Honor 90': { display: { orig: 1640 } },
  'Honor 200': { display: { orig: 3050 } },
  'Oppo A78': { display: { orig: 1480 } },
  'Realme 11': { display: { orig: 1690 } },
  'Infinix Note 30': { display: { orig: 1500 } },
  'Tecno Spark 20': { display: { orig: 820 } },
};

const estimatedPriceRanges = {
  iphone: {
    display: { budget: [900, 1400, 2200], standard: [1400, 2100, 4200], premium: [2100, 3800, 9000], flagship: [2600, 4800, 16000] },
    battery: { budget: [700, 900, 1300], standard: [850, 1100, 1500], premium: [1050, 1350, 1800], flagship: [1300, 1700, 2300] },
    back: { budget: [300, 500], standard: [500, 800], premium: [800, 1200], flagship: [1200, 1800] },
  },
  samsung: {
    display: { budget: [800, 1300, 1900], standard: [1200, 1900, 3000], premium: [2000, 3200, 5200], flagship: [4200, 7600, 14000] },
    battery: { budget: [450, 650, 900], standard: [550, 780, 1100], premium: [700, 980, 1400], flagship: [1100, 1600, 2200] },
    back: { budget: [120, 220], standard: [180, 300], premium: [250, 420], flagship: [400, 700] },
  },
  xiaomi: {
    display: { budget: [650, 950, 1400], standard: [900, 1350, 2200], premium: [1200, 1900, 3200], flagship: [1800, 2900, 5200] },
    battery: { budget: [380, 550, 800], standard: [450, 680, 950], premium: [650, 900, 1250], flagship: [850, 1200, 1600] },
    back: { budget: [120, 180], standard: [160, 240], premium: [220, 320], flagship: [320, 500] },
  },
  other: {
    display: { budget: [700, 1050, 1500], standard: [950, 1450, 2300], premium: [1300, 2100, 3400], flagship: [2000, 3200, 6000] },
    battery: { budget: [400, 600, 850], standard: [500, 760, 1050], premium: [700, 980, 1350], flagship: [900, 1250, 1700] },
    back: { budget: [120, 180], standard: [180, 260], premium: [240, 360], flagship: [350, 550] },
  },
};

const iphoneBackRetailOverride = {
  'iPhone 16 Pro Max': 7500,
  'iPhone 16 Pro': 7500,
  'iPhone 16': 6500,
  'iPhone 15 Pro Max': 6500,
  'iPhone 15 Pro': 6500,
  'iPhone 15': 6500,
  'iPhone 14 Pro': 7500,
  'iPhone 14': 5000,
  'iPhone 13 Pro': 6500,
  'iPhone 13': 5000,
  'iPhone 12 Pro': 4500,
  'iPhone 12': 4500,
  'iPhone 11 Pro': 4500,
  'iPhone 11': 4000,
};

const androidBackParts = [];

const fullPartsCatalog = [{"model":"iPad Air 10.2 (2019/2020)+кнопка HOME","title":"Тачскрин для iPad Air 10.2 (2019/2020)+кнопка HOME (белый)","type":"display","quality":"standard","price":119.0,"source":"file"},{"model":"iPad Air 10.2 (2019/2020)+кнопка HOME","title":"Тачскрин для iPad Air 10.2 (2019/2020)+кнопка HOME (черный)","type":"display","quality":"standard","price":119.0,"source":"file"},{"model":"iPad Air+кнопка HOME","title":"Тачскрин для iPad Air+кнопка HOME (белый)","type":"display","quality":"standard","price":119.0,"source":"file"},{"model":"iPad Mini (2019)+кнопка (HOME) белый","title":"Тачскрин для iPad Mini (2019)+кнопка (HOME) белый","type":"display","quality":"standard","price":49.0,"source":"file"},{"model":"iPad Mini (2019)+кнопка (HOME) черный","title":"Тачскрин для iPad Mini (2019)+кнопка (HOME) черный","type":"display","quality":"standard","price":49.0,"source":"file"},{"model":"iPad Mini 5 7.9 (2019) (A2133/A2124/A2126/A2125)","title":"Тачскрин для iPad Mini 5 7.9 (2019) (A2133/A2124/A2126/A2125) + кнопка Home (белый)","type":"display","quality":"standard","price":279.0,"source":"file"},{"model":"iPad Mini 5 7.9 (2019) (A2133/A2124/A2126/A2125)","title":"Тачскрин для iPad Mini 5 7.9 (2019) (A2133/A2124/A2126/A2125) + кнопка Home (черный)","type":"display","quality":"standard","price":279.0,"source":"file"},{"model":"iPad Mini 5 7.9 (2019) (белый)","title":"Тачскрин для iPad Mini 5 7.9 (2019) (белый)","type":"display","quality":"standard","price":199.0,"source":"file"},{"model":"iPad Mini 5 7.9 (2019) (черный)","title":"Тачскрин для iPad Mini 5 7.9 (2019) (черный)","type":"display","quality":"standard","price":199.0,"source":"file"},{"model":"iPad Mini 7.9 2/3 (A1489/A1490/A1491/A1599/A1600)","title":"Тачскрин для iPad Mini 7.9 2/3 (A1489/A1490/A1491/A1599/A1600) (белый)","type":"display","quality":"standard","price":100.0,"source":"file"},{"model":"iPad Mini 7.9 2/3 (A1489/A1490/A1491/A1599/A1600)","title":"Тачскрин для iPad Mini 7.9 2/3 (A1489/A1490/A1491/A1599/A1600) (черный)","type":"display","quality":"standard","price":99.0,"source":"file"},{"model":"iPad Mini","title":"Тачскрин для iPad Mini (белый)","type":"display","quality":"standard","price":89.0,"source":"file"},{"model":"iPad Mini","title":"Тачскрин для iPad Mini (черный)","type":"display","quality":"standard","price":89.0,"source":"file"},{"model":"iPad Pro 10.5 (2017) A1701/A1709/A1852 + микросхема сенсора","title":"Тачскрин для iPad Pro 10.5 (2017) A1701/A1709/A1852 + микросхема сенсора (черный)","type":"display","quality":"standard","price":559.0,"source":"file"},{"model":"iPad Pro 12.9 3th (2018) (белый)","title":"Тачскрин для iPad Pro 12.9 3th (2018) (белый)","type":"display","quality":"standard","price":279.0,"source":"file"},{"model":"iPad Pro 12.9 3th (2018) (черный)","title":"Тачскрин для iPad Pro 12.9 3th (2018) (черный)","type":"display","quality":"standard","price":279.0,"source":"file"},{"model":"iPad Pro 12.9 5th (2021) A2378/A2461/A2379/A2462 (черный)","title":"Тачскрин для iPad Pro 12.9 5th (2021) A2378/A2461/A2379/A2462 (черный)","type":"display","quality":"standard","price":559.0,"source":"file"},{"model":"iPad Pro 9.7 1th (2016) (A1673/A1674/A1675) (белый)","title":"Тачскрин для iPad Pro 9.7 1th (2016) (A1673/A1674/A1675) (белый)","type":"display","quality":"standard","price":189.0,"source":"file"},{"model":"iPad Pro 9.7 1th (2016) (A1673/A1674/A1675) (черный)","title":"Тачскрин для iPad Pro 9.7 1th (2016) (A1673/A1674/A1675) (черный)","type":"display","quality":"standard","price":189.0,"source":"file"},{"model":"iPad Air 1/A1474/A1475/A1476 (LM) Original +тачскрин (белый)","title":"Дисплей для iPad Air 1/A1474/A1475/A1476 (LM) Original +тачскрин (белый)","type":"display","quality":"standard","price":1779.0,"source":"file"},{"model":"iPad Air 1/A1474/A1475/A1476 (LM) Original +тачскрин (черный)","title":"Дисплей для iPad Air 1/A1474/A1475/A1476 (LM) Original +тачскрин (черный)","type":"display","quality":"standard","price":1779.0,"source":"file"},{"model":"iPad Air 2 A1566/A1567 (LM)+тачскрин (белый)","title":"Дисплей для iPad Air 2 A1566/A1567 (LM)+тачскрин (белый)","type":"display","quality":"standard","price":1639.0,"source":"file"},{"model":"iPad Air 2 A1566/A1567 (LM)+тачскрин (черный)","title":"Дисплей для iPad Air 2 A1566/A1567 (LM)+тачскрин (черный)","type":"display","quality":"standard","price":1639.0,"source":"file"},{"model":"iPad Air 3 10.5 (2019) A2152/A2123/A2153/A2154 (LM)+тачскрин (белый)","title":"Дисплей для iPad Air 3 10.5 (2019) A2152/A2123/A2153/A2154 (LM)+тачскрин (белый)","type":"display","quality":"standard","price":2469.0,"source":"file"},{"model":"iPad Air 3 10.5 (2019) A2152/A2123/A2153/A2154 (LM)+тачскрин (черный)","title":"Дисплей для iPad Air 3 10.5 (2019) A2152/A2123/A2153/A2154 (LM)+тачскрин (черный)","type":"display","quality":"standard","price":2469.0,"source":"file"},{"model":"iPad Air 4 10.9 2020/A2316/A2324/A2325/A2072 Original + тачскрин (черный)","title":"Дисплей для iPad Air 4 10.9 2020/A2316/A2324/A2325/A2072 Original + тачскрин (черный)","type":"display","quality":"standard","price":4379.0,"source":"file"},{"model":"iPad Air 5 10.9 2022/A2588/A2589/A2591 Original + тачскрин (серый)","title":"Дисплей для iPad Air 5 10.9 2022/A2588/A2589/A2591 Original + тачскрин (серый)","type":"display","quality":"standard","price":4389.0,"source":"file"},{"model":"iPad Air 5 10.9 2022/A2588/A2589/A2591 Original + тачскрин (синий)","title":"Дисплей для iPad Air 5 10.9 2022/A2588/A2589/A2591 Original + тачскрин (синий)","type":"display","quality":"standard","price":4389.0,"source":"file"},{"model":"iPad Air 5 10.9 2022/A2588/A2589/A2591 Original + тачскрин (фиолетовый)","title":"Дисплей для iPad Air 5 10.9 2022/A2588/A2589/A2591 Original + тачскрин (фиолетовый)","type":"display","quality":"standard","price":4389.0,"source":"file"},{"model":"iPad Air 5 10.9 2022/A2588/A2589/A2591 Original + тачскрин (черный)","title":"Дисплей для iPad Air 5 10.9 2022/A2588/A2589/A2591 Original + тачскрин (черный)","type":"display","quality":"standard","price":4389.0,"source":"file"},{"model":"iPad Pro 10.5 A1701/A1709/A1852 (LM) + тачскрин (белый)","title":"Дисплей для iPad Pro 10.5 A1701/A1709/A1852 (LM) + тачскрин (белый)","type":"display","quality":"standard","price":2179.0,"source":"file"},{"model":"iPad Pro 10.5 A1701/A1709/A1852 (LM) + тачскрин (черный)","title":"Дисплей для iPad Pro 10.5 A1701/A1709/A1852 (LM) + тачскрин (черный)","type":"display","quality":"standard","price":2179.0,"source":"file"},{"model":"iPad Pro 10.5 A1701/A1709/A1852 (LM) + тачскрин + IC chip (белый)","title":"Дисплей для iPad Pro 10.5 A1701/A1709/A1852 (LM) + тачскрин + IC chip (белый)","type":"display","quality":"standard","price":3179.0,"source":"file"},{"model":"iPad Pro 10.5 A1701/A1709/A1852 (LM) + тачскрин + IC chip (черный)","title":"Дисплей для iPad Pro 10.5 A1701/A1709/A1852 (LM) + тачскрин + IC chip (черный)","type":"display","quality":"standard","price":3179.0,"source":"file"},{"model":"iPad Pro 11 1/2th (2018/2020) A1934/A1979/A1980/A2013/A2068/A2228/A2230 Original + тачскрин (серый)","title":"Дисплей для iPad Pro 11 1/2th (2018/2020) A1934/A1979/A1980/A2013/A2068/A2228/A2230 Original + тачскрин (серый)","type":"display","quality":"standard","price":4869.0,"source":"file"},{"model":"iPad Pro 11 3th (2021) A2377/A2459/A2301/A2460 + touch Original (черный)","title":"Дисплей для iPad Pro 11 3th (2021) A2377/A2459/A2301/A2460 + touch Original (черный)","type":"display","quality":"standard","price":4799.0,"source":"file"},{"model":"iPad Pro 11 4th (2022) A2435/A2761/A2762/A2759 Original + тачскрин (черный)","title":"Дисплей для iPad Pro 11 4th (2022) A2435/A2761/A2762/A2759 Original + тачскрин (черный)","type":"display","quality":"standard","price":4799.0,"source":"file"},{"model":"iPad Pro 12.9 3/4th (2018/2020) A1876/A2014/A1895/A1983/A2229/A2069/A2232/A2233 +тачскрин Original (черный)","title":"Дисплей для iPad Pro 12.9 3/4th (2018/2020) A1876/A2014/A1895/A1983/A2229/A2069/A2232/A2233 +тачскрин Original (черный)","type":"display","quality":"standard","price":7819.0,"source":"file"},{"model":"iPad Pro 12.9 5th (2021) A2378/A2461/A2379/A2462 (LM) +тачскрин Original (черный)","title":"Дисплей для iPad Pro 12.9 5th (2021) A2378/A2461/A2379/A2462 (LM) +тачскрин Original (черный)","type":"display","quality":"standard","price":12889.0,"source":"file"},{"model":"iPad Pro 12.9 6th (2022) A2436/A2764/A2437/A2766 (LM) +тачскрин Original (черный)","title":"Дисплей для iPad Pro 12.9 6th (2022) A2436/A2764/A2437/A2766 (LM) +тачскрин Original (черный)","type":"display","quality":"standard","price":11999.0,"source":"file"},{"model":"iPad Pro 9.7 A1673/A1674/A1675 (LM) +тачскрин (белый)","title":"Дисплей для iPad Pro 9.7 A1673/A1674/A1675 (LM) +тачскрин (белый)","type":"display","quality":"standard","price":1479.0,"source":"file"},{"model":"iPad Pro 9.7 A1673/A1674/A1675 (LM) +тачскрин (черный)","title":"Дисплей для iPad Pro 9.7 A1673/A1674/A1675 (LM) +тачскрин (черный)","type":"display","quality":"standard","price":1479.0,"source":"file"},{"model":"A400CG (ZenFone 4)","title":"Задняя крышка Asus A400CG (ZenFone 4) белая","type":"android-back","quality":"standard","price":25.0,"source":"file"},{"model":"A400CG (ZenFone 4)","title":"Задняя крышка Asus A400CG (ZenFone 4) желтый","type":"android-back","quality":"standard","price":25.0,"source":"file"},{"model":"A400CG (ZenFone 4)","title":"Задняя крышка Asus A400CG (ZenFone 4) красный","type":"android-back","quality":"standard","price":25.0,"source":"file"},{"model":"A400CG (ZenFone 4)","title":"Задняя крышка Asus A400CG (ZenFone 4) синий","type":"android-back","quality":"standard","price":25.0,"source":"file"},{"model":"A400CG (ZenFone 4)","title":"Задняя крышка Asus A400CG (ZenFone 4) черный","type":"android-back","quality":"standard","price":25.0,"source":"file"},{"model":"A500CG (ZenFone 5)","title":"Задняя крышка Asus A500CG (ZenFone 5) белая","type":"android-back","quality":"standard","price":30.0,"source":"file"},{"model":"A500CG (ZenFone 5)","title":"Задняя крышка Asus A500CG (ZenFone 5) желтая","type":"android-back","quality":"standard","price":30.0,"source":"file"},{"model":"A500CG (ZenFone 5)","title":"Задняя крышка Asus A500CG (ZenFone 5) красная","type":"android-back","quality":"standard","price":30.0,"source":"file"},{"model":"A500CG (ZenFone 5)","title":"Задняя крышка Asus A500CG (ZenFone 5) синяя","type":"android-back","quality":"standard","price":30.0,"source":"file"},{"model":"A500CG (ZenFone 5)","title":"Задняя крышка Asus A500CG (ZenFone 5) черная","type":"android-back","quality":"standard","price":30.0,"source":"file"},{"model":"A501CG (ZenFone 5 LTE)","title":"Задняя крышка Asus A501CG (ZenFone 5 LTE) белая","type":"android-back","quality":"standard","price":30.0,"source":"file"},{"model":"A600CG (ZenFone 6)","title":"Задняя крышка Asus A600CG (ZenFone 6) белая","type":"android-back","quality":"standard","price":35.0,"source":"file"},{"model":"A600CG (ZenFone 6)","title":"Задняя крышка Asus A600CG (ZenFone 6) желтая","type":"android-back","quality":"standard","price":35.0,"source":"file"},{"model":"A600CG (ZenFone 6)","title":"Задняя крышка Asus A600CG (ZenFone 6) красная","type":"android-back","quality":"standard","price":35.0,"source":"file"},{"model":"A600CG (ZenFone 6)","title":"Задняя крышка Asus A600CG (ZenFone 6) серая","type":"android-back","quality":"standard","price":35.0,"source":"file"},{"model":"A600CG (ZenFone 6)","title":"Задняя крышка Asus A600CG (ZenFone 6) черная","type":"android-back","quality":"standard","price":35.0,"source":"file"},{"model":"One X9 белый","title":"Дисплей для HTC One X9 белый","type":"display","quality":"standard","price":465.0,"source":"file"},{"model":"One X9 черный","title":"Дисплей для HTC One X9 черный","type":"display","quality":"standard","price":465.0,"source":"file"},{"model":"Xiaomi Redmi 8A черный","title":"Дисплей для Xiaomi Redmi 8A черный","type":"display","quality":"standard","price":520.0,"source":"file"},{"model":"Asus A600CG (ZenFone 6)","title":"Дисплейный модуль Asus A600CG (ZenFone 6) черный Original PRC","type":"display","quality":"standard","price":189.0,"source":"file"},{"model":"Asus FE170CG (Fonepad 7)","title":"Дисплейный модуль Asus FE170CG (Fonepad 7) черный Original PRC","type":"display","quality":"standard","price":225.0,"source":"file"},{"model":"Asus ME302KL (MemoPad FHD 10)","title":"Дисплейный модуль Asus ME302KL (MemoPad FHD 10) белый Original PRC","type":"display","quality":"standard","price":349.0,"source":"file"},{"model":"Asus Padfone Mini 4.3 черный Original PRC","title":"Дисплейный модуль Asus Padfone Mini 4.3 черный Original PRC","type":"display","quality":"standard","price":499.0,"source":"file"},{"model":"Asus ZenFone 2 Laser ZE550KL 5.5 черный Original PRC","title":"Дисплейный модуль Asus ZenFone 2 Laser ZE550KL 5.5 черный Original PRC","type":"display","quality":"standard","price":239.0,"source":"file"},{"model":"Asus ZenFone 2 Laser ZE601KL 6.0 черный Original PRC","title":"Дисплейный модуль Asus ZenFone 2 Laser ZE601KL 6.0 черный Original PRC","type":"display","quality":"standard","price":559.0,"source":"file"},{"model":"Asus ZenFone 4 Max (ZC554KL) черный","title":"Дисплейный модуль Asus ZenFone 4 Max (ZC554KL) черный","type":"display","quality":"standard","price":599.0,"source":"file"},{"model":"Asus ZenFone 4 Max ZC520KL золотой","title":"Дисплейный модуль Asus ZenFone 4 Max ZC520KL золотой","type":"display","quality":"standard","price":599.0,"source":"file"},{"model":"Asus ZenFone 4 Max ZC520KL черный","title":"Дисплейный модуль Asus ZenFone 4 Max ZC520KL черный","type":"display","quality":"standard","price":599.0,"source":"file"},{"model":"Asus ZenFone 5 Lite (ZC600KL) черный Original PRC","title":"Дисплейный модуль Asus ZenFone 5 Lite (ZC600KL) черный Original PRC","type":"display","quality":"standard","price":749.0,"source":"file"},{"model":"Asus ZenFone Go (ZB452KG) черный","title":"Дисплейный модуль Asus ZenFone Go (ZB452KG) черный","type":"display","quality":"standard","price":270.0,"source":"file"},{"model":"Asus ZenFone Max (ZC550KL) черный Original PRC","title":"Дисплейный модуль Asus ZenFone Max (ZC550KL) черный Original PRC","type":"display","quality":"standard","price":529.0,"source":"file"},{"model":"Asus ZenFone Max (ZC550KL) белый Original PRC","title":"Дисплейный модуль Asus ZenFone Max (ZC550KL) белый Original PRC","type":"display","quality":"standard","price":669.0,"source":"file"},{"model":"Asus ZenFone Max (ZC550KL) золотой Original PRC","title":"Дисплейный модуль Asus ZenFone Max (ZC550KL) золотой Original PRC","type":"display","quality":"standard","price":639.0,"source":"file"},{"model":"Asus ZenFone Max M1 (ZB556KL) черный","title":"Дисплейный модуль Asus ZenFone Max M1 (ZB556KL) черный","type":"display","quality":"standard","price":499.0,"source":"file"},{"model":"Asus ZenFone Max M2 (ZB633KL) черный Original PRC","title":"Дисплейный модуль Asus ZenFone Max M2 (ZB633KL) черный Original PRC","type":"display","quality":"standard","price":599.0,"source":"file"},{"model":"Asus ZenFone Max Plus M1 (ZB570TL) черный Original PRC","title":"Дисплейный модуль Asus ZenFone Max Plus M1 (ZB570TL) черный Original PRC","type":"display","quality":"standard","price":449.0,"source":"file"},{"model":"Asus ZenFone Max Pro M1 (ZB602KL) черный Original PRC","title":"Дисплейный модуль Asus ZenFone Max Pro M1 (ZB602KL) черный Original PRC","type":"display","quality":"standard","price":539.0,"source":"file"},{"model":"Asus ZenFone Max Pro M2 (ZB631KL) черный Original PRC","title":"Дисплейный модуль Asus ZenFone Max Pro M2 (ZB631KL) черный Original PRC","type":"display","quality":"standard","price":879.0,"source":"file"},{"model":"Asus ZenFone Selfie (ZD551KL) золотой","title":"Дисплейный модуль Asus ZenFone Selfie (ZD551KL) золотой","type":"display","quality":"standard","price":519.0,"source":"file"},{"model":"Asus ZenFone Selfie (ZD551KL) черный","title":"Дисплейный модуль Asus ZenFone Selfie (ZD551KL) черный","type":"display","quality":"standard","price":519.0,"source":"file"},{"model":"iPhone 11 Pro Max (3969 mAh) DEJI","title":"АКБ для iPhone 11 Pro Max (3969 mAh) DEJI","type":"battery","quality":"deji","price":740.0,"source":"file"},{"model":"iPhone 15 (3349 mAh) DEJI","title":"АКБ для iPhone 15 (3349 mAh) DEJI","type":"battery","quality":"deji","price":810.0,"source":"file"},{"model":"iPhone 15 Pro (3274 mAh) DEJI","title":"АКБ для iPhone 15 Pro (3274 mAh) DEJI","type":"battery","quality":"deji","price":970.0,"source":"file"},{"model":"iPhone 15 Pro Max (4422 mAh) DEJI","title":"АКБ для iPhone 15 Pro Max (4422 mAh) DEJI","type":"battery","quality":"deji","price":1100.0,"source":"file"},{"model":"iPhone 12 Mini (2227 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 12 Mini (2227 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":2780.0,"source":"file"},{"model":"iPhone 12 mini (2227 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 12 mini (2227 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":1690.0,"source":"file"},{"model":"iPhone 12 Pro Max (3687 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 12 Pro Max (3687 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":3560.0,"source":"file"},{"model":"iPhone 12 Pro Max (3687 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 12 Pro Max (3687 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":1810.0,"source":"file"},{"model":"iPhone 12/12 Pro (2815 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 12/12 Pro (2815 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":2780.0,"source":"file"},{"model":"iPhone 12/12 Pro (2815 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 12/12 Pro (2815 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":1690.0,"source":"file"},{"model":"iPhone 13 (3227 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 13 (3227 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":3230.0,"source":"file"},{"model":"iPhone 13 (3227 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 13 (3227 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":1690.0,"source":"file"},{"model":"iPhone 13 Mini (2520 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 13 Mini (2520 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":2960.0,"source":"file"},{"model":"iPhone 13 Pro (3095 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 13 Pro (3095 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":3630.0,"source":"file"},{"model":"iPhone 13 Pro (3095 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 13 Pro (3095 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":1810.0,"source":"file"},{"model":"iPhone 13 Pro Max (4352 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 13 Pro Max (4352 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":3780.0,"source":"file"},{"model":"iPhone 13 Pro Max (4352 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 13 Pro Max (4352 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":1930.0,"source":"file"},{"model":"iPhone 14 (3279 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 14 (3279 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":3380.0,"source":"file"},{"model":"iPhone 14 (3279 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 14 (3279 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":1930.0,"source":"file"},{"model":"iPhone 14 Pro (3200 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 14 Pro (3200 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":3630.0,"source":"file"},{"model":"iPhone 14 Pro (3200 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 14 Pro (3200 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":2050.0,"source":"file"},{"model":"iPhone 14 Pro Max (4323 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 14 Pro Max (4323 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":3890.0,"source":"file"},{"model":"iPhone 14 Pro Max (4323 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 14 Pro Max (4323 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":2170.0,"source":"file"},{"model":"iPhone 15 (3349 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 15 (3349 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":3670.0,"source":"file"},{"model":"iPhone 15 (3349 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 15 (3349 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":2170.0,"source":"file"},{"model":"iPhone 15 Pro (3274 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 15 Pro (3274 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":3850.0,"source":"file"},{"model":"iPhone 15 Pro (3274 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 15 Pro (3274 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":2290.0,"source":"file"},{"model":"iPhone 15 Pro Max (4422 mAh) ориг 100% (Diagnostic, подлинное)","title":"АКБ для iPhone 15 Pro Max (4422 mAh) ориг 100% (Diagnostic, подлинное)","type":"battery","quality":"diagnostic","price":4010.0,"source":"file"},{"model":"iPhone 15 Pro Max (4422 mAh) ориг 100% (лого,без ошибки,0 циклов)","title":"АКБ для iPhone 15 Pro Max (4422 mAh) ориг 100% (лого,без ошибки,0 циклов)","type":"battery","quality":"ориг 100%","price":2340.0,"source":"file"},{"model":"iPhone 11 (3610 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 11 (3610 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1570.0,"source":"file"},{"model":"iPhone 11 Pro (3546 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 11 Pro (3546 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1810.0,"source":"file"},{"model":"iPhone 11 Pro Max (4469 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 11 Pro Max (4469 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1980.0,"source":"file"},{"model":"iPhone 12 Mini (2727 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 12 Mini (2727 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1570.0,"source":"file"},{"model":"iPhone 12 Pro Max (4187 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 12 Pro Max (4187 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1980.0,"source":"file"},{"model":"iPhone 12/12 Pro (3315 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 12/12 Pro (3315 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1690.0,"source":"file"},{"model":"iPhone 13 (3780 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 13 (3780 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1810.0,"source":"file"},{"model":"iPhone 13 Pro (3580 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 13 Pro (3580 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1980.0,"source":"file"},{"model":"iPhone 13 Pro Max (4780 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 13 Pro Max (4780 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":2000.0,"source":"file"},{"model":"iPhone 14 Pro (3780 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 14 Pro (3780 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":2030.0,"source":"file"},{"model":"iPhone 14 Pro Max (4860 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 14 Pro Max (4860 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":2170.0,"source":"file"},{"model":"iPhone 6 Plus (3510 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 6 Plus (3510 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":620.0,"source":"file"},{"model":"iPhone 7 (2400 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 7 (2400 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":820.0,"source":"file"},{"model":"iPhone 8 (2700 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 8 (2700 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":970.0,"source":"file"},{"model":"iPhone 8 Plus (3300 mAh) Elephant повышенной емкости","title":"АКБ для iPhone 8 Plus (3300 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1090.0,"source":"file"},{"model":"iPhone SE 2020 (2321 mAh) Elephant повышенной емкости","title":"АКБ для iPhone SE 2020 (2321 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":820.0,"source":"file"},{"model":"iPhone X (3216 mAh) Elephant повышенной емкости","title":"АКБ для iPhone X (3216 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1400.0,"source":"file"},{"model":"iPhone XR (3442 mAh) Elephant повышенной емкости","title":"АКБ для iPhone XR (3442 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1400.0,"source":"file"},{"model":"iPhone XS (3158 mAh) Elephant повышенной емкости","title":"АКБ для iPhone XS (3158 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1570.0,"source":"file"},{"model":"iPhone XS Max (3674 mAh) Elephant повышенной емкости","title":"АКБ для iPhone XS Max (3674 mAh) Elephant повышенной емкости","type":"battery","quality":"elephant","price":1740.0,"source":"file"},{"model":"iPhone 11 (3110 mAh) FOXCONN","title":"АКБ для iPhone 11 (3110 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1190.0,"source":"file"},{"model":"iPhone 11 Pro (3046 mAh) FOXCONN","title":"АКБ для iPhone 11 Pro (3046 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1410.0,"source":"file"},{"model":"iPhone 11 Pro Max (3969 mAh) FOXCONN","title":"АКБ для iPhone 11 Pro Max (3969 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1510.0,"source":"file"},{"model":"iPhone 12 Mini (2227 mAh) FOXCONN","title":"АКБ для iPhone 12 Mini (2227 mAh) FOXCONN","type":"battery","quality":"foxconn","price":880.0,"source":"file"},{"model":"iPhone 12 Pro Max (3687 mAh) FOXCONN","title":"АКБ для iPhone 12 Pro Max (3687 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1570.0,"source":"file"},{"model":"iPhone 12/12 Pro (2815 mAh) FOXCONN","title":"АКБ для iPhone 12/12 Pro (2815 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1100.0,"source":"file"},{"model":"iPhone 13 (3227 mAh) FOXCONN","title":"АКБ для iPhone 13 (3227 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1190.0,"source":"file"},{"model":"iPhone 13 Mini (2406 mAh) FOXCONN","title":"АКБ для iPhone 13 Mini (2406 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1190.0,"source":"file"},{"model":"iPhone 13 Pro (3095 mAh) FOXCONN","title":"АКБ для iPhone 13 Pro (3095 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1600.0,"source":"file"},{"model":"iPhone 13 Pro Max (4352 mAh) FOXCONN","title":"АКБ для iPhone 13 Pro Max (4352 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1600.0,"source":"file"},{"model":"iPhone 14 (3279 mAh) FOXCONN","title":"АКБ для iPhone 14 (3279 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1410.0,"source":"file"},{"model":"iPhone 14 Pro (3200 mAh) FOXCONN","title":"АКБ для iPhone 14 Pro (3200 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1600.0,"source":"file"},{"model":"iPhone 14 Pro Max (4323 mAh) FOXCONN","title":"АКБ для iPhone 14 Pro Max (4323 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1790.0,"source":"file"},{"model":"iPhone 15 (3349 mAh) FOXCONN","title":"АКБ для iPhone 15 (3349 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1540.0,"source":"file"},{"model":"iPhone 15 Pro (3274 mAh) FOXCONN","title":"АКБ для iPhone 15 Pro (3274 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1690.0,"source":"file"},{"model":"iPhone 15 Pro Max (4422 mAh) FOXCONN","title":"АКБ для iPhone 15 Pro Max (4422 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1790.0,"source":"file"},{"model":"iPhone 16 (3561 mAh) FOXCONN","title":"АКБ для iPhone 16 (3561 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1940.0,"source":"file"},{"model":"iPhone 16 Pro (3582 mAh) FOXCONN","title":"АКБ для iPhone 16 Pro (3582 mAh) FOXCONN","type":"battery","quality":"foxconn","price":2100.0,"source":"file"},{"model":"iPhone 7 (1960 mAh) FOXCONN","title":"АКБ для iPhone 7 (1960 mAh) FOXCONN","type":"battery","quality":"foxconn","price":790.0,"source":"file"},{"model":"iPhone 8 (1821mAh) FOXCONN","title":"АКБ для iPhone 8 (1821mAh) FOXCONN","type":"battery","quality":"foxconn","price":760.0,"source":"file"},{"model":"iPhone 8 Plus (2691 mAh) FOXCONN","title":"АКБ для iPhone 8 Plus (2691 mAh) FOXCONN","type":"battery","quality":"foxconn","price":850.0,"source":"file"},{"model":"iPhone SE (1624 mAh) FOXCONN","title":"АКБ для iPhone SE (1624 mAh) FOXCONN","type":"battery","quality":"foxconn","price":660.0,"source":"file"},{"model":"iPhone SE 2020 (1821 mAh) FOXCONN","title":"АКБ для iPhone SE 2020 (1821 mAh) FOXCONN","type":"battery","quality":"foxconn","price":820.0,"source":"file"},{"model":"iPhone SE 2022 (2018 mAh) FOXCONN","title":"АКБ для iPhone SE 2022 (2018 mAh) FOXCONN","type":"battery","quality":"foxconn","price":880.0,"source":"file"},{"model":"iPhone X (2716 mAh) FOXCONN","title":"АКБ для iPhone X (2716 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1260.0,"source":"file"},{"model":"iPhone XR (2942 mAh) FOXCONN","title":"АКБ для iPhone XR (2942 mAh) FOXCONN","type":"battery","quality":"foxconn","price":940.0,"source":"file"},{"model":"iPhone XS (2658 mAh) FOXCONN","title":"АКБ для iPhone XS (2658 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1410.0,"source":"file"},{"model":"iPhone XS Max (3174 mAh) FOXCONN","title":"АКБ для iPhone XS Max (3174 mAh) FOXCONN","type":"battery","quality":"foxconn","price":1410.0,"source":"file"},{"model":"iPhone 11 Pro Max (3969 mAh) HOCO","title":"АКБ для iPhone 11 Pro Max (3969 mAh) HOCO","type":"battery","quality":"hoco","price":690.0,"source":"file"},{"model":"iPhone 11 Pro Max (3969 mAh) HQ","title":"АКБ для iPhone 11 Pro Max (3969 mAh) HQ","type":"battery","quality":"hq","price":670.0,"source":"file"},{"model":"iPhone 12 mini (2227 mAh) HQ","title":"АКБ для iPhone 12 mini (2227 mAh) HQ","type":"battery","quality":"hq","price":380.0,"source":"file"},{"model":"iPhone 12 Pro Max (3687 mAh) HQ","title":"АКБ для iPhone 12 Pro Max (3687 mAh) HQ","type":"battery","quality":"hq","price":690.0,"source":"file"},{"model":"iPhone 13 Pro Max (4352 mAh) HQ","title":"АКБ для iPhone 13 Pro Max (4352 mAh) HQ","type":"battery","quality":"hq","price":680.0,"source":"file"},{"model":"iPhone 14 (3279 mAh) HQ","title":"АКБ для iPhone 14 (3279 mAh) HQ","type":"battery","quality":"hq","price":590.0,"source":"file"},{"model":"iPhone 14 Pro Max (4323 mAh) HQ","title":"АКБ для iPhone 14 Pro Max (4323 mAh) HQ","type":"battery","quality":"hq","price":760.0,"source":"file"},{"model":"iPhone 15 Pro Max (4422 mAh) HQ","title":"АКБ для iPhone 15 Pro Max (4422 mAh) HQ","type":"battery","quality":"hq","price":760.0,"source":"file"},{"model":"iPhone 6 Plus (2915 mAh) HQ","title":"АКБ для iPhone 6 Plus (2915 mAh) HQ","type":"battery","quality":"hq","price":260.0,"source":"file"},{"model":"iPhone SE 2022 (2018 mAh) HQ","title":"АКБ для iPhone SE 2022 (2018 mAh) HQ","type":"battery","quality":"hq","price":330.0,"source":"file"},{"model":"iPhone 11 (3500 mAh) JСID повышенной емкости","title":"АКБ для iPhone 11 (3500 mAh) JСID повышенной емкости","type":"battery","quality":"jcid","price":810.0,"source":"file"},{"model":"iPhone 11 Pro (3400 mAh) JCID повышенной емкости","title":"АКБ для iPhone 11 Pro (3400 mAh) JCID повышенной емкости","type":"battery","quality":"jcid","price":1130.0,"source":"file"},{"model":"iPhone 11 Pro Max (4440 mAh) JСID повышенной емкости","title":"АКБ для iPhone 11 Pro Max (4440 mAh) JСID повышенной емкости","type":"battery","quality":"jcid","price":1280.0,"source":"file"},{"model":"iPhone 12 Mini (2460 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 12 Mini (2460 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":1280.0,"source":"file"},{"model":"iPhone 12 Pro Max (4450 mAh) JСID повышенной емкости","title":"АКБ для iPhone 12 Pro Max (4450 mAh) JСID повышенной емкости","type":"battery","quality":"jcid","price":1300.0,"source":"file"},{"model":"iPhone 12 Pro Max (4530 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 12 Pro Max (4530 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":1540.0,"source":"file"},{"model":"iPhone 12/12 Pro (3200 mAh) JСID повышенной емкости","title":"АКБ для iPhone 12/12 Pro (3200 mAh) JСID повышенной емкости","type":"battery","quality":"jcid","price":830.0,"source":"file"},{"model":"iPhone 12/12 Pro (3230 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 12/12 Pro (3230 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":1350.0,"source":"file"},{"model":"iPhone 13 (3500 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 13 (3500 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":1390.0,"source":"file"},{"model":"iPhone 13 (3500 mAh) JСID повышенной емкости","title":"АКБ для iPhone 13 (3500 mAh) JСID повышенной емкости","type":"battery","quality":"jcid","price":940.0,"source":"file"},{"model":"iPhone 13 Pro (3300 mAh) JСID повышенной емкости","title":"АКБ для iPhone 13 Pro (3300 mAh) JСID повышенной емкости","type":"battery","quality":"jcid","price":1220.0,"source":"file"},{"model":"iPhone 13 Pro (3330 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 13 Pro (3330 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":1560.0,"source":"file"},{"model":"iPhone 13 Pro Max (4550 mAh) JCID повышенной емкости","title":"АКБ для iPhone 13 Pro Max (4550 mAh) JCID повышенной емкости","type":"battery","quality":"jcid","price":1480.0,"source":"file"},{"model":"iPhone 13 Pro Max (4790 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 13 Pro Max (4790 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":1740.0,"source":"file"},{"model":"iPhone 14 (3590 mAh) JCID повышенной емкости","title":"АКБ для iPhone 14 (3590 mAh) JCID повышенной емкости","type":"battery","quality":"jcid","price":1040.0,"source":"file"},{"model":"iPhone 14 Pro (3400 mAh) JCID повышенной емкости","title":"АКБ для iPhone 14 Pro (3400 mAh) JCID повышенной емкости","type":"battery","quality":"jcid","price":1390.0,"source":"file"},{"model":"iPhone 14 Pro (3410 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 14 Pro (3410 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":1740.0,"source":"file"},{"model":"iPhone 14 Pro Max (4770 mAh) JCID повышенной емкости","title":"АКБ для iPhone 14 Pro Max (4770 mAh) JCID повышенной емкости","type":"battery","quality":"jcid","price":1630.0,"source":"file"},{"model":"iPhone 14 Pro Max (4790 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 14 Pro Max (4790 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":1910.0,"source":"file"},{"model":"iPhone 15 (3520 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 15 (3520 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":1630.0,"source":"file"},{"model":"iPhone 15 (3550 mAh) JCID повышенной емкости","title":"АКБ для iPhone 15 (3550 mAh) JCID повышенной емкости","type":"battery","quality":"jcid","price":1220.0,"source":"file"},{"model":"iPhone 15 Pro (3420 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 15 Pro (3420 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":2000.0,"source":"file"},{"model":"iPhone 15 Pro (3430 mAh) JCID повышенной емкости","title":"АКБ для iPhone 15 Pro (3430 mAh) JCID повышенной емкости","type":"battery","quality":"jcid","price":1480.0,"source":"file"},{"model":"iPhone 15 Pro Max (4780 mAh) JCID (верификация, пов.емкость)","title":"АКБ для iPhone 15 Pro Max (4780 mAh) JCID (верификация, пов.емкость)","type":"battery","quality":"jcid","price":2280.0,"source":"file"},{"model":"iPhone 15 Pro Max (4800 mAh) JCID повышенной емкости","title":"АКБ для iPhone 15 Pro Max (4800 mAh) JCID повышенной емкости","type":"battery","quality":"jcid","price":1760.0,"source":"file"},{"model":"iPhone 11 (3110 mAh) New Orig","title":"АКБ для iPhone 11 (3110 mAh) New Orig","type":"battery","quality":"new orig","price":770.0,"source":"file"},{"model":"iPhone 11 Pro (3046 mAh) New Orig","title":"АКБ для iPhone 11 Pro (3046 mAh) New Orig","type":"battery","quality":"new orig","price":990.0,"source":"file"},{"model":"iPhone 11 Pro Max (3969 mAh) New Orig","title":"АКБ для iPhone 11 Pro Max (3969 mAh) New Orig","type":"battery","quality":"new orig","price":990.0,"source":"file"},{"model":"iPhone 11 Pro Max (3969 mAh) ориг 100%","title":"АКБ для iPhone 11 Pro Max (3969 mAh) ориг 100%","type":"battery","quality":"ориг 100%","price":830.0,"source":"file"},{"model":"iPhone 12 Mini (2227 mAh) New Orig","title":"АКБ для iPhone 12 Mini (2227 mAh) New Orig","type":"battery","quality":"new orig","price":710.0,"source":"file"},{"model":"iPhone 12 Pro Max (3687 mAh) New Orig","title":"АКБ для iPhone 12 Pro Max (3687 mAh) New Orig","type":"battery","quality":"new orig","price":970.0,"source":"file"},{"model":"iPhone 12 Pro Max (3687 mAh) ориг 100%","title":"АКБ для iPhone 12 Pro Max (3687 mAh) ориг 100%","type":"battery","quality":"ориг 100%","price":890.0,"source":"file"},{"model":"iPhone 12/12 Pro (2815 mAh) New Orig","title":"АКБ для iPhone 12/12 Pro (2815 mAh) New Orig","type":"battery","quality":"new orig","price":710.0,"source":"file"},{"model":"iPhone 13 (3227 mAh) New Orig","title":"АКБ для iPhone 13 (3227 mAh) New Orig","type":"battery","quality":"new orig","price":740.0,"source":"file"},{"model":"iPhone 13 Pro (3095 mAh) New Orig","title":"АКБ для iPhone 13 Pro (3095 mAh) New Orig","type":"battery","quality":"new orig","price":1110.0,"source":"file"},{"model":"iPhone 13 Pro Max (4352 mAh) New Orig","title":"АКБ для iPhone 13 Pro Max (4352 mAh) New Orig","type":"battery","quality":"new orig","price":1220.0,"source":"file"},{"model":"iPhone 14 (3279 mAh) New Orig","title":"АКБ для iPhone 14 (3279 mAh) New Orig","type":"battery","quality":"new orig","price":850.0,"source":"file"},{"model":"iPhone 14 Pro (3200 mAh) New Orig","title":"АКБ для iPhone 14 Pro (3200 mAh) New Orig","type":"battery","quality":"new orig","price":1160.0,"source":"file"},{"model":"iPhone 14 Pro Max (4323 mAh) New Orig","title":"АКБ для iPhone 14 Pro Max (4323 mAh) New Orig","type":"battery","quality":"new orig","price":1280.0,"source":"file"},{"model":"iPhone 14 Pro Max (4323 mAh) ориг 100%","title":"АКБ для iPhone 14 Pro Max (4323 mAh) ориг 100%","type":"battery","quality":"ориг 100%","price":1060.0,"source":"file"},{"model":"iPhone 15 (3349 mAh) New Orig","title":"АКБ для iPhone 15 (3349 mAh) New Orig","type":"battery","quality":"new orig","price":1170.0,"source":"file"},{"model":"iPhone 15 (3349 mAh) ориг 100%","title":"АКБ для iPhone 15 (3349 mAh) ориг 100%","type":"battery","quality":"ориг 100%","price":1060.0,"source":"file"},{"model":"iPhone 15 Pro (3274 mAh) New Orig","title":"АКБ для iPhone 15 Pro (3274 mAh) New Orig","type":"battery","quality":"new orig","price":1300.0,"source":"file"},{"model":"iPhone 15 Pro (3274 mAh) ориг 100%","title":"АКБ для iPhone 15 Pro (3274 mAh) ориг 100%","type":"battery","quality":"ориг 100%","price":1120.0,"source":"file"},{"model":"iPhone 15 Pro Max (4422 mAh) New Orig","title":"АКБ для iPhone 15 Pro Max (4422 mAh) New Orig","type":"battery","quality":"new orig","price":1460.0,"source":"file"},{"model":"iPhone 15 Pro Max (4422 mAh) ориг 100%","title":"АКБ для iPhone 15 Pro Max (4422 mAh) ориг 100%","type":"battery","quality":"ориг 100%","price":1190.0,"source":"file"},{"model":"iPhone 6 Plus (2915 mAh) ориг 100%","title":"АКБ для iPhone 6 Plus (2915 mAh) ориг 100%","type":"battery","quality":"ориг 100%","price":440.0,"source":"file"},{"model":"iPhone SE 2022 (2018 mAh) ориг 100%","title":"АКБ для iPhone SE 2022 (2018 mAh) ориг 100%","type":"battery","quality":"ориг 100%","price":460.0,"source":"file"},{"model":"iPhone X (2716 mAh) New Orig","title":"АКБ для iPhone X (2716 mAh) New Orig","type":"battery","quality":"new orig","price":710.0,"source":"file"},{"model":"iPhone XR (2942 mAh) New Orig","title":"АКБ для iPhone XR (2942 mAh) New Orig","type":"battery","quality":"new orig","price":630.0,"source":"file"},{"model":"iPhone XS (2658 mAh) New Orig","title":"АКБ для iPhone XS (2658 mAh) New Orig","type":"battery","quality":"new orig","price":940.0,"source":"file"},{"model":"iPhone XS Max (3174 mAh) New Orig","title":"АКБ для iPhone XS Max (3174 mAh) New Orig","type":"battery","quality":"new orig","price":770.0,"source":"file"}];

const rawCatalogText = `
М7767729	2007677297960	Дисплей Realme GT6 (RMX3851)+тачскрин (черный) ориг 100%	**	4'390.00 руб.
М7767733	2007677337963	Дисплей Realme Note 50 (RMX3834) в рамке (черный) ориг 100%	**	1'050.00 руб.
М7765284	2007652847968	Дисплей Realme Pad 10,4"+тачскрин (черный)	*	3'490.00 руб.
М7767201	2007672017969	Дисплей Realme Pad Mini 8,7"+тачскрин (черный)	*	1'450.00 руб.
М7762259	2007622597961	Дисплей Realme V20 5G (RMX3610)+тачскрин (черный) ориг 100%	*	1'100.00 руб.
М7759112	2007591127961	Дисплей Realme X3 SuperZoom / X3+тачскрин (черный)	*	1'100.00 руб.
М7754825	2007548257963	Дисплей Realme XT/X2/OPPO Reno Z (RMX1921/CPH1979)+тачскрин (черный) TFT	*	1'390.00 руб.
М7767152	2007671527964	Задняя крышка Realme 6 Pro (RMX2063) красная молния	*	180.00 руб.
М7765094	2007650947967	Задняя крышка Realme 8 4G/8 Pro (RMX3085/RMX3081) черная	*	140.00 руб.
М7765090	2007650907961	Задняя крышка Realme C25/C25s (RMX3191/RMX3195) черная	*	160.00 руб.
М7765095	2007650957966	Задняя крышка Realme C3 (RMX2020) синяя	*	140.00 руб.
М7768208	2007682087969	Задняя крышка Realme C30 (RMX3581) голубая	*	180.00 руб.
М7765085	2007650857969	Задняя крышка Realme C30 (RMX3581) черная	*	220.00 руб.
М7768209	2007682097968	Задняя крышка Realme C31 (RMX3501) со стеклом камеры (зеленая)	*	220.00 руб.
М7768211	2007682117963	Задняя крышка Realme C35 (RMX3511) зеленая	*	160.00 руб.
М7768212	2007682127962	Задняя крышка Realme C35 (RMX3511) черная	*	150.00 руб.
М7768268	2007682687964	Задняя крышка Realme C51 (RMX3830) зеленая	*	150.00 руб.
М7768269	2007682697963	Задняя крышка Realme C51 (RMX3830) черная	*	190.00 руб.
М7769085	2007690857962	Задняя крышка Realme C63 (RMX3939) со стеклом камеры (синяя)	*	280.00 руб.
М7769764	2007697647960	Задняя крышка Realme C65 4G (RMX3910) черная	*	170.00 руб.
М7769769	2007697697965	Задняя крышка Realme Note 60 (RMX3933) со стеклом камеры (черная)	*	390.00 руб.
М7769770	2007697707961	Задняя крышка Realme Note 60 (RMX3933) черная	*	190.00 руб.
М7760647	2007606477968	Задняя крышка Samsung A03 (A035F) синяя	*	130.00 руб.
М7754067	2007540677967	Задняя крышка Samsung A105F/DS (A10) черная	*	150.00 руб.
М7769295	2007692957962	Задняя крышка Samsung A115F (A11) со стеклом камеры (черная)	*	230.00 руб.
М7757672	2007576727964	Задняя крышка Samsung A125F/A127F Nacho (A12/A12) со стеклом камеры (черная)	*	150.00 руб.
М7768234	2007682347964	Задняя крышка Samsung A146B (A14 5G) черная	*	110.00 руб.
М7768235	2007682357963	Задняя крышка Samsung A155F/A156B (A15 4G/5G) черная	*	120.00 руб.
М7754483	2007544837961	Задняя крышка Samsung A202F (A20E) белая	*	90.00 руб.
М7754646	2007546467968	Задняя крышка Samsung A207F (A20s) синяя	*	80.00 руб.
М7754647	2007546477967	Задняя крышка Samsung A207F (A20s) черная	*	100.00 руб.
0L-00050322	Задняя крышка для Samsung Galaxy A01 Core SM-A013 (красный)	280.00	1
0L-00050320	Задняя крышка для Samsung Galaxy A01 Core SM-A013 (черный)	250.00	1
0L-00050325	Задняя крышка для Samsung Galaxy A01 SM-A015 (красный)	180.00	1
0L-00050324	Задняя крышка для Samsung Galaxy A01 SM-A015 (синий)	180.00	1
0L-00050323	Задняя крышка для Samsung Galaxy A01 SM-A015 (черный)	220.00	1
0L-00050978	Задняя крышка для Samsung Galaxy A01 SM-M015 (черный)	170.00	1
0L-00050326	Задняя крышка для Samsung Galaxy A21s SM-A217 (черный)	200.00	1
0L-00050329	Задняя крышка для Samsung Galaxy A80 SM-A805 (золотистый)	300.00	2
0L-00050327	Задняя крышка для Samsung Galaxy A80 SM-A805 (черный)	250.00	2
0L-00050985	Задняя крышка для Samsung Galaxy M31s SM-M317 (синий)	250.00	2
0L-00050984	Задняя крышка для Samsung Galaxy M31s SM-M317 (черный)	230.00	1
0L-00050331	Задняя крышка для Samsung Galaxy S20 FE SM-G780 (белый)	260.00	1
0L-00050332	Задняя крышка для Samsung Galaxy S20 FE SM-G780 (синий)	220.00	1
М7763159	2007631597969	Дисплей для iPhone 11 (In-Сell)+тачскрин (GX) с заменяемой IC	***	1'190.00 руб.
М7762763	2007627637969	Дисплей для iPhone 11 (In-Сell)+тачскрин (JK) New	***	1'390.00 руб.
М7762760	2007627607962	Дисплей для iPhone 11 (In-Сell)+тачскрин с заменяемой IC	**	1'050.00 руб.
М7764911	2007649117968	Дисплей для iPhone 11 Pro (In-Сell)+тачскрин	**	1'200.00 руб.
М7768500	2007685007964	Дисплей для iPhone 11 Pro (In-Сell)+тачскрин (GX) с заменяемой IC	*	1'290.00 руб.
М7755590	2007555907967	Дисплей для iPhone 11 Pro (In-Сell)+тачскрин (JK)	**	1'490.00 руб.
М7762708	2007627087962	Дисплей для iPhone 11 Pro Max (In-Сell)+тачскрин	*	1'190.00 руб.
М7767506	2007675067961	Дисплей для iPhone 12 Mini (In-Сell)+тачскрин (JK)	*	2'400.00 руб.
М7764912	2007649127967	Дисплей для iPhone 12 Pro Max (In-Сell)+тачскрин	*	1'290.00 руб.
М7759102	2007591027964	Дисплей для iPhone 12 Pro Max (In-Сell)+тачскрин (JK)	*	2'590.00 руб.
М7768502	2007685027962	Дисплей для iPhone 12/12 Pro (In-Сell)+тачскрин (GX) с заменяемой IC	*	1'490.00 руб.
М7759101	2007591017965	Дисплей для iPhone 12/12 Pro (In-Сell)+тачскрин (JK)	**	1'690.00 руб.
М7764913	2007649137966	Дисплей для iPhone 12/12 Pro (In-Сell)+тачскрин c заменяемой IC	*	1'200.00 руб.
М7762076	2007620767960	Дисплей для iPhone 13 (In-Сell)+тачскрин (JK)	**	1'890.00 руб.
М7765147	2007651477968	Дисплей для iPhone 13 (In-Сell)+тачскрин c заменяемой IC	*	1'290.00 руб.
М7769077	2007690777968	Дисплей для iPhone 13 Mini (A2630) (In-Сell)+тачскрин c заменяемой IC	*	1'800.00 руб.
М7767365	2007673657966	Дисплей для iPhone 13 Pro (In-Сell)+тачскрин (JK)	*	2'390.00 руб.
М7762924	2007629247968	Дисплей для iPhone 13 Pro (In-Сell)+тачскрин c заменяемой IC	*	1'690.00 руб.
М7762925	2007629257967	Дисплей для iPhone 13 Pro Max (In-Сell)+тачскрин	*	1'790.00 руб.
М7767366	2007673667965	Дисплей для iPhone 13 Pro Max (In-Сell)+тачскрин (JK)	*	2'500.00 руб.
М7768478	2007684787966	Дисплей для iPhone 13 Pro Max (In-Сell)+тачскрин (TC) с заменяемой IC	*	2'450.00 руб.
М7767229	2007672297965	Дисплей для iPhone 14 (In-Сell)+тачскрин	*	1'390.00 руб.
М7762077	2007620777969	Дисплей для iPhone 14 (In-Сell)+тачскрин (JK)	*	2'000.00 руб.
М7768480	2007684807961	Дисплей для iPhone 14 (In-Сell)+тачскрин (TC) с заменяемой IC	*	1'950.00 руб.
М7767367	2007673677964	Дисплей для iPhone 14 Pro (In-Сell)+тачскрин (JK)	*	2'400.00 руб.
М7767786	2007677867965	Дисплей для iPhone 14 Pro (In-Сell)+тачскрин (с заменяемой IC)	*	1'690.00 руб.
М7767368	2007673687963	Дисплей для iPhone 14 Pro Max (In-Сell)+тачскрин (JK)	*	3'300.00 руб.
М7767787	2007677877964	Дисплей для iPhone 14 Pro Max (In-Сell)+тачскрин (с заменяемой IC)	*	2'000.00 руб.
М7767800	2007678007964	Дисплей для iPhone 15 (In-Сell)+тачскрин (JK)	*	2'290.00 руб.
М7767378	2007673787960	Дисплей для iPhone 15 (In-Сell)+тачскрин (с заменяемой IC)	*	1'490.00 руб.
М7767370	2007673707968	Дисплей для iPhone 15 Pro (In-Сell)+тачскрин (JK)	*	2'590.00 руб.
М7767788	2007677887963	Дисплей для iPhone 15 Pro (In-Сell)+тачскрин (с заменяемой IC)	*	1'690.00 руб.
М7767371	2007673717967	Дисплей для iPhone 15 Pro Max (In-Сell)+тачскрин (JK)	*	3'550.00 руб.
М7767789	2007677897962	Дисплей для iPhone 15 Pro Max (In-Сell)+тачскрин (с заменяемой IC)	*	1'900.00 руб.
М7767790	2007677907968	Дисплей для iPhone 16 (In-Сell)+тачскрин (с заменяемой IC)	*	2'800.00 руб.
М7767791	2007677917967	Дисплей для iPhone 16 Pro (In-Сell)+тачскрин	*	4'800.00 руб.
М7767792	2007677927966	Дисплей для iPhone 16 Pro Max (In-Сell)+тачскрин (с заменяемой IC)	*	5'800.00 руб.
М7762709	2007627097961	Дисплей для iPhone X (In-Сell)+тачскрин	**	890.00 руб.
М7755505	2007555057969	Дисплей для iPhone X (In-Сell)+тачскрин (JK)	**	1'250.00 руб.
М7762765	2007627657967	Дисплей для iPhone XR (In-Сell)+тачскрин	*	950.00 руб.
М7760881	2007608817960	Дисплей для iPhone XR (In-Сell)+тачскрин (GX)	*	1'200.00 руб.
М7762764	2007627647968	Дисплей для iPhone XR (In-Сell)+тачскрин (JK) New	**	1'450.00 руб.
М7764914	2007649147965	Дисплей для iPhone XS (In-Сell)+тачскрин	**	950.00 руб.
М7755588	2007555887962	Дисплей для iPhone XS (In-Сell)+тачскрин (JK)	*	1'290.00 руб.
М7764915	2007649157964	Дисплей для iPhone XS Max (In-Сell)+тачскрин	*	1'100.00 руб.
М7763160	2007631607965	Дисплей для iPhone 11 Pro (Hard Oled)+тачскрин (GX) с заменяемой IC	*	2'500.00 руб.
М7762564	2007625647960	Дисплей для iPhone 12 Mini (Hard Oled)+тачскрин (GX)	*	4'600.00 руб.
М7763161	2007631617964	Дисплей для iPhone 12 Pro Max (Soft Oled)+тачскрин (GX) с заменяемой IC	*	4'600.00 руб.
М7767796	2007677967962	Дисплей для iPhone 12 Pro Max (Soft Oled)+тачскрин (с заменяемой IC)	*	4'700.00 руб.
М7769285	2007692857965	Дисплей для iPhone 12/12 Pro (Hard Oled)+тачскрин (JCID с привязкой без ошибки)	**	4'690.00 руб.
М7767797	2007677977961	Дисплей для iPhone 12/12 Pro (Hard Oled)+тачскрин (с заменяемой IC)	*	3'290.00 руб.
М7766665	2007666657966	Дисплей для iPhone 13 (Hard Oled)+тачскрин	*	3'500.00 руб.
М7763163	2007631637962	Дисплей для iPhone 13 (Hard Oled)+тачскрин (GX) с заменяемой IC	**	3'600.00 руб.
М7768948	2007689487960	Дисплей для iPhone 13 (Soft Amoled)+тачскрин (GX) с заменяемой IC	*	4'490.00 руб.
М7769224	2007692247964	Дисплей для iPhone 13 (Soft Oled)+тачскрин (JCID с привязкой без ошибки)	*	5'400.00 руб.
М7768976	2007689767963	Дисплей для iPhone 13 Pro (A2640) Soft Oled + ALS Flex (без ошибки)	*	6'700.00 руб.
М7766664	2007666647967	Дисплей для iPhone 13 Pro (Hard Oled)+тачскрин	*	4'100.00 руб.
М7767013	2007670137966	Дисплей для iPhone 13 Pro (Hard Oled)+тачскрин (GX) с заменяемой IC	*	4'300.00 руб.
М7768958	2007689587967	Дисплей для iPhone 13 Pro (Soft Amoled 120 Гц)+тачскрин (GX) с заменяемой IC	*	5'000.00 руб.
М7769225	2007692257963	Дисплей для iPhone 13 Pro (Soft OLED 120 Гц)+тачскрин (JCID с привязкой без ошибки)	*	6'700.00 руб.
М7763289	2007632897969	Дисплей для iPhone 13 Pro (Soft Oled)+тачскрин	*	4'600.00 руб.
М7763290	2007632907965	Дисплей для iPhone 13 Pro Max (Hard Oled)+тачскрин	*	4'000.00 руб.
М7767811	2007678117960	Дисплей для iPhone 13 Pro Max (Hard Oled)+тачскрин (GX) с заменяемой IC	*	4'600.00 руб.
М7768959	2007689597966	Дисплей для iPhone 13 Pro Max (Soft Amoled 120 Гц)+тачскрин (GX) с заменяемой IC	*	5'000.00 руб.
М7761771	2007617717961	Дисплей для iPhone 14 (Hard Oled)+тачскрин	*	3'500.00 руб.
М7769228	2007692287960	Дисплей для iPhone 14 (Soft OLED)+тачскрин (JCID с привязкой без ошибки)	*	5'600.00 руб.
М7767014	2007670147965	Дисплей для iPhone 14 Pro (Hard Oled)+тачскрин (GX) с заменяемой IC	*	7'500.00 руб.
М7767798	2007677987960	Дисплей для iPhone 14 Pro (Hard Oled)+тачскрин с заменяемой IC	*	5'500.00 руб.
М7769259	2007692597960	Дисплей для iPhone 14 Pro (Soft OLED 120 Гц)+тачскрин (JCID с привязкой без ошибки)	*	11'700.00 руб.
М7768430	2007684307966	Дисплей для iPhone 14 Pro Max (Hard Oled)+тачскрин с заменяемой IC	*	6'850.00 руб.
М7768610	2007686107960	Дисплей для iPhone 15 (Hard Oled)+тачскрин (TC) с заменяемой IC	*	7'300.00 руб.
М7765362	2007653627965	Дисплей для iPhone 15 (Soft Amoled)+тачскрин	*	7'500.00 руб.
М7768485	2007684857966	Дисплей для iPhone 15 Pro (Hard Oled)+тачскрин (TC) с заменяемой IC	*	7'500.00 руб.
М7767814	2007678147967	Дисплей для iPhone 15 Pro (Hard Oled)+тачскрин (с заменяемой IC)	*	7'200.00 руб.
М7765363	2007653637964	Дисплей для iPhone 15 Pro (Soft Amoled)+тачскрин (с заменяемой IC)	*	10'300.00 руб.
М7769019	2007690197964	Дисплей для iPhone 15 Pro Max (A3106) Soft Oled + ALS Flex (без ошибки)	*	11'000.00 руб.
М7768843	2007688437966	Дисплей для iPhone 15 Pro Max (Hard Oled)+тачскрин (GX) с заменяемой IC	*	7'050.00 руб.
М7768957	2007689577968	Дисплей для iPhone 15 Pro Max (Soft Amoled 120 Гц)+тачскрин (GX) с заменяемой IC	*	10'500.00 руб.
М7767799	2007677997969	Дисплей для iPhone 15 Pro Max (Soft Amoled)+тачскрин	*	8'500.00 руб.
М7768607	2007686077966	Дисплей для iPhone 16 Pro (Hard Oled)+тачскрин (GX) с заменяемой IC	*	7'900.00 руб.
М7762766	2007627667966	Дисплей для iPhone X (Hard Oled)+тачскрин	**	2'200.00 руб.
М7750081	2007500817969	Дисплей для iPhone X (Hard Oled)+тачскрин (GX)	**	2'100.00 руб.
М7762767	2007627677965	Дисплей для iPhone XS (Hard Oled)+тачскрин	*	2'300.00 руб.
М7751398	2007513987963	Дисплей для iPhone XS (Hard Oled)+тачскрин (GX)	**	2'200.00 руб.
М7762768	2007627687964	Дисплей для iPhone XS Max (Hard Oled)+тачскрин	*	2'800.00 руб.
М7757205	2007572057966	Дисплей для iPhone XS Max (Hard Oled)+тачскрин (GX)	*	2'895.00 руб.
М7767981	2007679817968	Дисплей для iPhone 11 Pro Max+тачскрин Original Change Glass	*	6'900.00 руб.
М7767982	2007679827967	Дисплей для iPhone 11 Pro+тачскрин Original Change Glass	*	4'900.00 руб.
М7763169	2007631697966	Дисплей для iPhone 11+тачскрин ORG Ref c заменяемой IC	****	2'000.00 руб.
М7768329	2007683297961	Дисплей для iPhone 11+тачскрин Original Change Glass	***	2'450.00 руб.
М7768937	2007689377964	Дисплей для iPhone 12 Mini Оригинал+ ALS Flex (снятый,без ошибки)	*	7'500.00 руб.
М7768428	2007684287961	Дисплей для iPhone 12 Mini+тачскрин Original Change Glass	*	5'900.00 руб.
М7768938	2007689387963	Дисплей для iPhone 12 Pro Max Оригинал+ ALS Flex (снятый,без ошибки)	*	13'500.00 руб.
М7767983	2007679837966	Дисплей для iPhone 12 Pro Max+тачскрин Original Change Glass	*	12'400.00 руб.
М7767984	2007679847965	Дисплей для iPhone 12/12 Pro+тачскрин Original Change Glass	**	4'900.00 руб.
М7767987	2007679877962	Дисплей для iPhone 13 (A2635)+тачскрин Original Change Glass	*	6'500.00 руб.
М7768634	2007686347960	Дисплей для iPhone 13 Pro (A2640) Оригинал+ ALS Flex	*	8'500.00 руб.
М7768939	2007689397962	Дисплей для iPhone 13 Pro (A2640) Оригинал+ ALS Flex (снятый,без ошибки)	*	10'900.00 руб.
М7767986	2007679867963	Дисплей для iPhone 13 Pro (A2640)+тачскрин Original Change Glass	*	8'000.00 руб.
М7768940	2007689407968	Дисплей для iPhone 13 Pro Max (A2645) Оригинал+ ALS Flex (снятый,без ошибки)	*	14'100.00 руб.
М7767985	2007679857964	Дисплей для iPhone 13 Pro Max (A2645)+тачскрин Original Change Glass	*	10'800.00 руб.
М7768943	2007689437965	Дисплей для iPhone 14 (A2883) Оригинал+ ALS Flex (снятый,без ошибки)	*	8'100.00 руб.
М7767989	2007679897960	Дисплей для iPhone 14 (A2883)+тачскрин Original Change Glass	*	6'600.00 руб.
М7767988	2007679887961	Дисплей для iPhone 14 Pro (A2891)+тачскрин Original Change Glass	*	17'000.00 руб.
М7768942	2007689427966	Дисплей для iPhone 14 Pro Max (A2895) Оригинал+ ALS Flex (снятый,без ошибки)	*	24'700.00 руб.
М7767816	2007678167965	Дисплей для iPhone 14 Pro Max (A2895)+тачскрин Original Change Glass	*	18'700.00 руб.
М7768944	2007689447964	Дисплей для iPhone 15 (A3090) Оригинал+ ALS Flex (снятый,без ошибки)	*	14'700.00 руб.
М7767992	2007679927964	Дисплей для iPhone 15 (A3090)+тачскрин Original Change Glass	*	12'600.00 руб.
М7768945	2007689457963	Дисплей для iPhone 15 Pro (A3102) Оригинал+ ALS Flex (снятый,без ошибки)	*	22'700.00 руб.
М7767991	2007679917965	Дисплей для iPhone 15 Pro (A3102)+тачскрин Original Change Glass	*	18'500.00 руб.
М7767990	2007679907966	Дисплей для iPhone 15 Pro Max (A3106)+тачскрин Original Change Glass	*	19'300.00 руб.
М7768642	2007686427969	Дисплей для iPhone 16 (A3287) Оригинал+ ALS Flex	*	17'500.00 руб.
М7767822	2007678227966	Дисплей для iPhone 16 (A3287)+тачскрин Original Change Glass	*	15'300.00 руб.
М7757328	2007573287966	Дисплей для iPhone 6 (PREMIUM)+тачскрин (белый)	*	750.00 руб.
М7757329	2007573297965	Дисплей для iPhone 6 (PREMIUM)+тачскрин (черный)	*	750.00 руб.
М7760510	2007605107965	Дисплей для iPhone 6 Plus (PREMIUM)+тачскрин (белый)	***	700.00 руб.
М7757337	2007573377964	Дисплей для iPhone 6 Plus (PREMIUM)+тачскрин (черный)	**	700.00 руб.
М7750063	2007500637963	Дисплей для iPhone 5 (TianMa)+тачскрин (черный)	*	600.00 руб.
М7750064	2007500647962	Дисплей для iPhone 5C (TianMa)+тачскрин (черный)	*	600.00 руб.
М7750065	2007500657961	Дисплей для iPhone 6 (TianMa)+тачскрин (белый)	****	650.00 руб.
М7750072	2007500727961	Дисплей для iPhone 6 Plus (TianMa)+тачскрин (белый)	****	600.00 руб.
М7750071	2007500717962	Дисплей для iPhone 6 Plus (TianMa)+тачскрин (черный)	****	600.00 руб.
М7750074	2007500747969	Дисплей для iPhone 7 (TianMa)+тачскрин (черный)	*	650.00 руб.
М7750077	2007500777966	Дисплей для iPhone 8/iPhone SE 2020 (TianMa)+тачскрин (белый)	***	700.00 руб.
М7750078	2007500787965	Дисплей для iPhone 8/iPhone SE 2020 (TianMa)+тачскрин (черный)	**	700.00 руб.
М7753639	2007536397961	Задняя крышка (стекло) для iPhone 11 (белая)	****	220.00 руб.
М7753640	2007536407967	Задняя крышка (стекло) для iPhone 11 (красная)	**	220.00 руб.
М7753635	2007536357965	Задняя крышка (стекло) для iPhone 11 (фиолетовая)	*	195.00 руб.
М7769128	2007691287961	Задняя крышка (стекло) для iPhone 11 (фиолетовая) ORG монолитная	*	335.00 руб.
М7753638	2007536387962	Задняя крышка (стекло) для iPhone 11 (черная)	****	210.00 руб.
М7768762	2007687627962	Задняя крышка (стекло) для iPhone 11 (черная) ORG монолитная	**	335.00 руб.
М7769131	2007691317965	Задняя крышка (стекло) для iPhone 11 Pro (темно-зеленая) ORG монолитная	*	550.00 руб.
М7769132	2007691327964	Задняя крышка (стекло) для iPhone 11 Pro Max (серый космос) ORG монолитная	**	560.00 руб.
М7758261	2007582617969	Задняя крышка (стекло) для iPhone 12 Pro (графитовая)	*	310.00 руб.
М7768764	2007687647960	Задняя крышка (стекло) для iPhone 12 Pro (графитовая) ORG монолитная	*	560.00 руб.
М7758263	2007582637967	Задняя крышка (стекло) для iPhone 12 Pro Max (графитовая)	*	335.00 руб.
М7768766	2007687667968	Задняя крышка (стекло) для iPhone 13 (черная) ORG монолитная	*	415.00 руб.
М7768767	2007687677967	Задняя крышка (стекло) для iPhone 13 Pro (графитовая) ORG монолитная	*	640.00 руб.
М7768768	2007687687966	Задняя крышка (стекло) для iPhone 13 Pro Max (графитовая) ORG монолитная	*	640.00 руб.
М7768212	2007682127962	Задняя крышка (стекло) для iPhone 14 (красная) со стеклом камеры	*	755.00 руб.
М7768216	2007682167968	Задняя крышка (стекло) для iPhone 14 (фиолетовая) со стеклом камеры	*	765.00 руб.
М7768220	2007682207961	Задняя крышка (стекло) для iPhone 14 (черная) со стеклом камеры	*	745.00 руб.
М7768455	2007684557965	Задняя крышка (стекло) для iPhone 14 Pro Max (темно-фиолетовая) со стеклом камеры	*	790.00 руб.
М7768457	2007684577963	Задняя крышка (стекло) для iPhone 14 Pro Max (черная) со стеклом камеры	*	755.00 руб.
М7767443	2007674437963	Задняя крышка (стекло) для iPhone 15 (голубая) со стеклом камеры	*	970.00 руб.
М7767447	2007674477969	Задняя крышка (стекло) для iPhone 15 Pro (белая) со стеклом камеры	*	1'400.00 руб.
М7767446	2007674467960	Задняя крышка (стекло) для iPhone 15 Pro (черная) со стеклом камеры	*	1'330.00 руб.
М7767449	2007674497967	Задняя крышка (стекло) для iPhone 15 Pro Max (серая) со стеклом камеры	*	1'360.00 руб.
М7767452	2007674527961	Задняя крышка (стекло) для iPhone 15 Pro Max (синяя) со стеклом камеры	*	1'360.00 руб.
М7767450	2007674507963	Задняя крышка (стекло) для iPhone 15 Pro Max (черный) со стеклом камеры	*	1'400.00 руб.
М7767879	2007678797964	Задняя крышка (стекло) для iPhone 16 (розовая) со стеклом камеры	*	1'120.00 руб.
М7767878	2007678787965	Задняя крышка (стекло) для iPhone 16 (черная) со стеклом камеры	*	1'050.00 руб.
М7767883	2007678837967	Задняя крышка (стекло) для iPhone 16 Pro (белая) со стеклом камеры	*	1'400.00 руб.
М7767885	2007678857965	Задняя крышка (стекло) для iPhone 16 Pro (серая) со стеклом камеры	*	1'450.00 руб.
М7767882	2007678827968	Задняя крышка (стекло) для iPhone 16 Pro (черная) со стеклом камеры	*	1'450.00 руб.
М7767887	2007678877963	Задняя крышка (стекло) для iPhone 16 Pro Max (золото) со стеклом камеры	*	1'460.00 руб.
0L-00069798	Задняя крышка для Samsung Galaxy S10e SM-G970F со стеклом камеры (синий)	300.00	1
`;

const rawCatalogTextExtra = `
М7753473	2007534737967	Тачскрин для iPad Mini 4 (белый)	*	49.00 руб.
М7753474	2007534747966	Тачскрин для iPad Mini 4 (черный)	*	49.00 руб.
М7752164	2007521647965	Дисплей для iPhone 6 +тачскрин (белый) ORG Ref	*	850.00 руб.
М7752165	2007521657964	Дисплей для iPhone 6S +тачскрин (черный) ORG Ref	*	1'200.00 руб.
М7752175	2007521757961	Дисплей для iPhone 7 +тачскрин (белый) ORG Ref	*	1'340.00 руб.
М7767972	2007679727960	Дисплей для iPhone 7 Plus (ver:LG DTP; C3F)+тачскрин (белый) ORG Ref	*	1'960.00 руб.
М7752173	2007521737963	Дисплей для iPhone 7 Plus+тачскрин (белый) ORG Ref	*	1'660.00 руб.
М7767970	2007679707962	Дисплей для iPhone 8 Plus (ver:LG DTP; C3F)+тачскрин (черный) ORG Ref	*	1'960.00 руб.
М7752170	2007521707966	Дисплей для iPhone 8 Plus +тачскрин (черный) ORG Ref	*	1'660.00 руб.
М7752168	2007521687961	Дисплей для iPhone 8/SE 2020/SE 2022+тачскрин (белый) ORG Ref	*	1'250.00 руб.
М7752167	2007521677962	Дисплей для iPhone 8/SE 2020/SE 2022+тачскрин (черный) ORG Ref	*	1'250.00 руб.
М7767993	2007679937963	Дисплей для iPhone X+тачскрин (черный) Original Change Glass	*	4'300.00 руб.
М7753470	2007534707960	Дисплей для iPhone XR+тачскрин ORG Ref	***	1'690.00 руб.
М7768330	2007683307967	Дисплей для iPhone XR+тачскрин Original Change Glass	**	1'990.00 руб.
М7768429	2007684297960	Дисплей для iPhone XS Max+тачскрин Original Change Glass	*	5'500.00 руб.
М7767994	2007679947962	Дисплей для iPhone XS+тачскрин Original Change Glass	*	4'500.00 руб.
М7757331	2007573317960	Дисплей для iPhone 6S (PREMIUM)+тачскрин (черный)	*	1'100.00 руб.
М7757334	2007573347967	Дисплей для iPhone 8/iPhone SE 2020 (PREMIUM)+тачскрин (белый)	*	950.00 руб.
М7750069	2007500697967	Дисплей для iPhone 5S/SE (TianMa)+тачскрин (черный)	*	550.00 руб.
М7750068	2007500687968	Дисплей для iPhone 6S (TianMa)+тачскрин (черный)	*	650.00 руб.
М7750909	2007509097966	Дисплей для iPhone 6S Plus (TianMa)+тачскрин (черный)	*	750.00 руб.
М7750075	2007500757968	Дисплей для iPhone 7 Plus (TianMa)+тачскрин (белый)	*	750.00 руб.
М7769363	2007693637962	Задняя крышка (стекло) для iPhone 17 (белая) ORG монолитная,со стеклами камер	*	1'950.00 руб.
М7769366	2007693667969	Задняя крышка (стекло) для iPhone 17 (голубая) ORG монолитная,со стеклами камер	*	1'950.00 руб.
М7769365	2007693657960	Задняя крышка (стекло) для iPhone 17 (зеленая) ORG монолитная,со стеклами камер	*	1'950.00 руб.
М7769367	2007693677968	Задняя крышка (стекло) для iPhone 17 (фиолетовая) ORG монолитная, со стеклами камер	*	1'950.00 руб.
М7769364	2007693647961	Задняя крышка (стекло) для iPhone 17 (черная) ORG монолитная,со стеклами камер	*	1'950.00 руб.
М7769358	2007693587960	Задняя крышка (стекло) для iPhone 17 Pro (оранжевая)	*	1'050.00 руб.
М7769359	2007693597969	Задняя крышка (стекло) для iPhone 17 Pro (серебристая)	*	1'050.00 руб.
М7769357	2007693577961	Задняя крышка (стекло) для iPhone 17 Pro (темно-синяя)	*	1'050.00 руб.
М7769361	2007693617964	Задняя крышка (стекло) для iPhone 17 Pro Max (оранжевая)	*	1'050.00 руб.
М7769360	2007693607965	Задняя крышка (стекло) для iPhone 17 Pro Max (серебристая)	*	1'050.00 руб.
М7769362	2007693627963	Задняя крышка (стекло) для iPhone 17 Pro Max (темно-синяя)	*	1'050.00 руб.
М7747547	2007475477960	Задняя крышка (стекло) для iPhone 8 (черная)	*	175.00 руб.
М7747554	2007475547960	Задняя крышка (стекло) для iPhone X (черная)	*	210.00 руб.
М7750919	2007509197963	Задняя крышка (стекло) для iPhone XR (белая)	*	175.00 руб.
М7750920	2007509207969	Задняя крышка (стекло) для iPhone XR (черная)	*	185.00 руб.
М7750707	2007507077960	Задняя крышка (стекло) для iPhone XS (черная)	*	210.00 руб.
`;

function normalizePriceString(value) {
  const only = Array.from(String(value)).filter((ch) => '0123456789.,'.includes(ch)).join('').replace(',', '.');
  return Number(only) || 0;
}

function detectTypeFromTitle(title) {
  const lower = title.toLowerCase();
  if (lower.includes('акб') || lower.includes('аккумулятор')) return 'battery';
  if (lower.includes('задняя крышка')) return 'android-back';
  if (lower.includes('дисплей') || lower.includes('тачскрин')) return 'display';
  return null;
}

function detectQualityFromTitle(title) {
  const lower = title.toLowerCase();
  if (lower.includes('diagnostic')) return 'diagnostic';
  if (lower.includes('foxconn')) return 'foxconn';
  if (lower.includes('jcid')) return 'jcid';
  if (lower.includes('elephant')) return 'elephant';
  if (lower.includes('new orig')) return 'new orig';
  if (lower.includes('deji')) return 'deji';
  if (lower.includes('hq')) return 'hq';
  if (lower.includes('hoco')) return 'hoco';
  if (lower.includes('tianma')) return 'tianma';
  if (lower.includes('premium')) return 'premium';
  if (lower.includes('incell') || lower.includes('in-сell')) return 'incell';
  if (lower.includes('oled') || lower.includes('amoled')) return 'oled';
  if (lower.includes('original') || lower.includes('orig')) return 'original';
  return 'standard';
}

function extractModelFromTitle(title, type) {
  if (type === 'battery' && title.startsWith('АКБ для ')) return title.slice(8).trim();
  if (type === 'android-back') {
    if (title.startsWith('Задняя крышка для ')) return title.slice(18).trim();
    if (title.startsWith('Задняя крышка ')) return title.slice(14).trim();
  }
  if (type === 'display') {
    if (title.startsWith('Дисплейный модуль ')) return title.slice(18).trim();
    if (title.startsWith('Дисплей для ')) return title.slice(12).trim();
    if (title.startsWith('Тачскрин для ')) return title.slice(13).trim();
  }
  return title;
}

function parseRawCatalogText(text) {
  return text
    .split(String.fromCharCode(10))
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(String.fromCharCode(9)).filter(Boolean);
      if (parts.length < 3) return null;
      const title = parts.length >= 5 ? parts[2] : parts[1];
      const rawPrice = parts.length >= 5 ? parts[4] : parts[2];
      const type = detectTypeFromTitle(title);
      const price = normalizePriceString(rawPrice);
      if (!type || !price) return null;
      return {
        model: extractModelFromTitle(title, type),
        title,
        type,
        quality: detectQualityFromTitle(title),
        price,
        source: 'file-auto',
      };
    })
    .filter(Boolean);
}

const parsedCatalogParts = [
  ...fullPartsCatalog,
  ...parseRawCatalogText(rawCatalogText),
  ...parseRawCatalogText(rawCatalogTextExtra),
];

function normalizeModelName(value) {
  return String(value || '')
    .toLowerCase()
    .replaceAll('ё', 'е')
    .replaceAll('+', ' plus ')
    .replaceAll('(', ' ')
    .replaceAll(')', ' ')
    .replaceAll(',', ' ')
    .replaceAll('"', ' ')
    .replaceAll('galaxy', 'samsung')
    .replaceAll('iphone se 2020', 'iphone 8')
    .replaceAll('iphone se 2022', 'iphone 8')
    .replaceAll('iphone se', 'iphone 8')
    .split('sm-').join(' ')
    .split('ver:').join(' ')
    .split('/').join(' ')
    .split('-').join(' ')
    .split('_').join(' ')
    .split('  ').join(' ')
    .trim();
}

function getWantedCatalogType(repairKey) {
  if (repairKey === 'display') return 'display';
  if (repairKey === 'battery') return 'battery';
  if (repairKey === 'back') return 'android-back';
  return null;
}

function matchesCatalogTier(item, repairKey, partType) {
  const title = String(item.title || '').toLowerCase();
  const quality = String(item.quality || '').toLowerCase();

  if (repairKey === 'battery') {
    if (partType === 'cheap') return ['hq', 'deji', 'hoco', 'new orig', 'standard'].includes(quality) || title.includes('hq') || title.includes('deji') || title.includes('hoco') || title.includes('new orig');
    if (partType === 'good') return ['foxconn', 'elephant', 'jcid'].includes(quality) || title.includes('foxconn') || title.includes('elephant') || title.includes('jcid');
    if (partType === 'orig') return title.includes('diagnostic') || title.includes('ориг 100%') || title.includes('orig') || title.includes('original');
  }

  if (repairKey === 'display') {
    if (partType === 'cheap') return ['incell', 'tianma', 'premium', 'standard'].includes(quality) || title.includes('incell') || title.includes('in-сell') || title.includes('jk') || title.includes('gx') || title.includes('tianma') || title.includes('premium');
    if (partType === 'good') return quality === 'oled' || title.includes('hard oled') || title.includes('soft oled') || title.includes('soft amoled') || title.includes('oled');
    if (partType === 'orig') return quality === 'original' || title.includes('original change glass') || title.includes('als flex') || title.includes('org ref') || title.includes('original');
  }

  if (repairKey === 'back') {
    if (partType === 'cheap') return !title.includes('org монолит');
    if (partType === 'good') return true;
  }

  return false;
}

function collectCatalogCandidates(model, repairKey, partType) {
  const wantedType = getWantedCatalogType(repairKey);
  if (!wantedType) return [];
  const aliases = getAliases(model).map(normalizeModelName);

  return parsedCatalogParts
    .filter((item) => item.type === wantedType)
    .filter((item) => {
      const normalizedItem = normalizeModelName(item.model);
      return aliases.some((alias) => normalizedItem.includes(alias) || alias.includes(normalizedItem));
    })
    .filter((item) => matchesCatalogTier(item, repairKey, partType))
    .map((item) => ({
      price: item.price,
      source: item.source || 'file-auto',
      updatedAt: 'Файл каталога',
      model: item.model,
      title: item.title,
    }))
    .sort((a, b) => a.price - b.price);
}

const phoneRepairCatalog = [
  { key: 'display', title: 'Замена дисплея', icon: '📱', type: 'modular', upsell: ['Стекло', 'Плёнка', 'Чистка динамиков'] },
  { key: 'battery', title: 'Замена аккумулятора', icon: '🔋', type: 'modular', upsell: ['Чистка разъёма', 'Проверка зарядки', 'Настройка'] },
  { key: 'back', title: 'Замена задней крышки', icon: '🪞', type: 'modular', upsell: ['Стекло камеры', 'Плёнка', 'Чистка корпуса'] },
  { key: 'charge', title: 'Нижний разъём', icon: '🔌', type: 'diagnostic', diagnosticText: 'По нижнему разъёму цену сразу не обещаем. Причина может быть в разъёме, шлейфе, дорожках, контроллере питания или последствиях влаги. Только диагностика.' },
  { key: 'camera', title: 'Камера', icon: '📷', type: 'diagnostic', diagnosticText: 'По камере цену сразу не называем. Проблема может быть в модуле, шлейфе, питании или плате. Только диагностика.' },
  { key: 'speaker', title: 'Динамик / микрофон', icon: '🔊', type: 'diagnostic', diagnosticText: 'По динамику и микрофону не обещаем простую замену. Причина может быть в сетках, усилителе, шлейфе, окислах или плате. Только диагностика.' },
];

const diagnosticCategories = [
  {
    key: 'tv',
    title: 'ТВ',
    items: [
      'Есть звук, нет изображения — часто подсветка, но также питание или main-плата.',
      'Полосы, пятна, половина экрана — матрица, COF, T-CON, шлейфы.',
      'Щелчки, защита, запах — блок питания и силовая часть.',
    ],
    script: 'По телевизору точную цену заранее не называем. Сначала диагностика.',
  },
  {
    key: 'coffee',
    title: 'Кофемашины',
    items: [
      'Течь — уплотнения, клапаны, бойлер, соединения.',
      'Не качает — помпа, гидросистема, засор, расходомер.',
      'Не делает пену или ошибка нагрева — молочный тракт, термоблок, датчики, плата.',
    ],
    script: 'По кофемашине сначала диагностика, потому что один симптом часто скрывает несколько проблем.',
  },
  {
    key: 'printer',
    title: 'Принтеры / МФУ',
    items: [
      'Полосит — головка, засор, энкодер, капа, парковка.',
      'Не захватывает бумагу — ролики, датчики, механика.',
      'Ошибка или не включается — питание, плата, шлейфы.',
    ],
    script: 'По принтеру цену без диагностики не называем. Сначала проверка.',
  },
];

const universalBlocks = [
  { title: 'Ноутбуки / ПК', bullets: ['Не включается — питание, плата, КЗ.', 'Нет изображения — матрица, шлейф, GPU, питание.', 'Греется — СО, термопаста, кулер.'] },
  { title: 'Игровые приставки', bullets: ['Нет изображения — HDMI, порт, GPU, плата.', 'Не включается — питание, перегрев, плата.'] },
  { title: 'Dyson / мелкая техника', bullets: ['Не включается — питание, плата, защита.', 'Выключается — перегрев, датчики, износ узлов.'] },
  { title: 'Электротранспорт', bullets: ['Не включается — АКБ, BMS, контроллер.', 'Не едет — контроллер, мотор-колесо, проводка.'] },
];

const psychologyBlocks = [
  'Сначала снимаем тревогу клиента, потом ведём к решению.',
  'Не спорим о цене, а переводим разговор в понятный следующий шаг.',
  'Лучше сказать: точно скажем после проверки, чем обещать лишнее.',
  'Сильный приёмщик продаёт ясность, безопасность и удобство.',
];

const objectionScripts = [
  { objection: 'Дорого', answer: 'Важно сравнивать не только цифру, но и качество детали, объём работ и гарантию.' },
  { objection: 'Я подумаю', answer: 'Давайте хотя бы примем на диагностику, чтобы вы думали уже на основании точной информации.' },
  { objection: 'В другом месте дешевле', answer: 'Я могу показать разницу по качеству и объяснить, за что именно вы платите.' },
  { objection: 'Мне срочно', answer: 'Если случай типовой — сориентируем быстро. Если симптом глубже — лучше сразу проверить и не терять время на догадки.' },
];

const knowledgeBaseCards = [
  { title: 'Телефоны · когда можно считать сразу', bullets: ['Разбит дисплей, модель известна, нет следов воды.', 'Замена АКБ без плавающих симптомов.', 'Крышка и стекло камеры как понятный модульный сценарий.'] },
  { title: 'Телефоны · когда только диагностика', bullets: ['Нет изображения, циклическая перезагрузка, после воды.', 'Не работает камера, Face ID или датчики после падения.', 'Устройство было в другом сервисе.'] },
  { title: 'Ноутбуки и ПК', bullets: ['Не включается — плата, питание, короткое.', 'Нет картинки — матрица, шлейф, видеочип.', 'Греется и выключается — СО, питание, датчики.'] },
  { title: 'ТВ', bullets: ['Подсветка, матрица, T-CON, main, питание.', 'Пятна и полосы часто не равны простому шлейфу.'] },
  { title: 'Кофемашины', bullets: ['Течь, нет давления, нагрев, молочный тракт.', 'Часто одна жалоба тянет несколько узлов.'] },
  { title: 'Принтеры / МФУ', bullets: ['Полосы, захват бумаги, ошибка каретки, питание.', 'Без диагностики легко ошибиться по цене.'] },
];

const scriptLibrary = [
  { title: 'Клиент хочет только цену', good: 'Если случай типовой — сориентирую. Если симптом глубже, без диагностики любая цифра будет гаданием.', bad: 'Без понятия, надо смотреть.' },
  { title: 'Клиент боится оставлять технику', good: 'После диагностики вы уже спокойно решите, делать ремонт или нет — без давления и без сюрпризов.', bad: 'Оставляйте, потом разберёмся.' },
  { title: 'Дорогое устройство', good: 'На дорогих моделях лучше сразу делать нормально: разница в качестве потом очень заметна по работе и ресурсу.', bad: 'Тут только дорогой вариант, других нет.' },
];

const managerChecklist = [
  'Дал клиенту понятный следующий шаг.',
  'Не назвал точную цену по сложной технике раньше диагностики.',
  'Закрыл разговор на действие: оставить устройство или дождаться звонка.',
  'Показал выбор качества по модульному ремонту.',
];

const clientQuestions = [
  'Когда именно началась проблема?',
  'Устройство падало, заливалось или перегревалось?',
  'Уже был ремонт или вскрытие в другом сервисе?',
  'Проблема постоянная или проявляется иногда?',
];

const franchiseRules = [
  'Единый словарь качества: дешёвое, отличное, премиум.',
  'Нет подтверждённой закупки — нет публичной цены.',
  'Сложные ремонты всегда переводятся в диагностику.',
  'Каждое изменение цены должно быть понятно по источнику.',
];

const branchStats = [
  { branch: 'Филиал 1', margin: '182 400 ₽', conversion: '71%', avgCheck: '8 900 ₽' },
  { branch: 'Филиал 2', margin: '156 200 ₽', conversion: '66%', avgCheck: '7 840 ₽' },
  { branch: 'Филиал 3', margin: '204 900 ₽', conversion: '74%', avgCheck: '9 240 ₽' },
];

const trainingTracks = [
  { title: 'Модульный ремонт', items: ['Уровни качества', 'Тип цены', 'Допродажа', 'Логика чека'] },
  { title: 'Диагностический ремонт', items: ['Когда нельзя называть цену', 'Как объяснить диагностику', 'Красные флаги'] },
  { title: 'Франшиза и филиалы', items: ['Единые правила', 'Контроль ошибок', 'KPI и стандарты'] },
];

const auditLog = [
  { when: '19.04 10:15', action: 'Обновлена логика цены', who: 'Админ', details: 'Добавлены source badges и отключение расчёта без закупки' },
  { when: '19.04 10:46', action: 'Обновлены правила крышек', who: 'Управляющий', details: 'Фикс-правила по задним крышкам iPhone' },
  { when: '19.04 11:04', action: 'Включён Intake Wizard', who: 'Система', details: 'ТВ, ПК, принтеры, кофемашины только через диагностику' },
];

const mistakeCards = [
  { title: 'Назвать точную цену слишком рано', text: 'Опасно, потому что скрытые повреждения меняют объём работ. Система должна вести в диагностику при красных флагах.' },
  { title: 'Ставить диагноз с потолка', text: 'Клиент слышит уверенность, но потом теряет доверие. Лучше назвать вероятные причины и следующий шаг.' },
  { title: 'Спорить с клиентом о цене', text: 'Это уводит в конфликт. Правильнее переводить разговор в качество детали, риски и удобство решения.' },
  { title: 'Не уточнить воду, удар или прошлый ремонт', text: 'Без этого легко ошибиться по сценарию приёмки и по рискам.' },
  { title: 'Не отметить важность данных', text: 'Для ноутбуков и ПК это критично: меняется сценарий работы и приоритет ремонта.' },
  { title: 'Не предложить допродажу в модульке', text: 'Теряется средний чек. После понятной модульной работы должен идти хотя бы один доп.' },
];

function getDeviceClass(model) {
  const text = String(model || '').toLowerCase();
  if (text.includes('pro max') || text.includes('ultra') || text.includes('fold')) return 'flagship';
  if (text.includes('pro') || text.includes('plus') || text.includes('flip') || text.includes('fe')) return 'upper';
  return 'base';
}

function getAliases(model) {
  const aliasMap = {
    'Poco X5': ['Poco X5', 'Poco X5 5G', 'Redmi Note 12', 'Redmi Note 12 5G'],
    'Redmi Note 12': ['Redmi Note 12', 'Redmi Note 12 5G', 'Poco X5', 'Poco X5 5G'],
    'iPhone 8': ['iPhone 8', 'iPhone SE 2020', 'iPhone SE 2022'],
    'iPhone SE 2020': ['iPhone SE 2020', 'iPhone 8'],
    'iPhone SE 2022': ['iPhone SE 2022', 'iPhone 8'],
    'Poco F5': ['Poco F5', 'Poco F5 5G'],
    'Poco F6': ['Poco F6', 'Poco F6 5G'],
    'Poco X6': ['Poco X6', 'Poco X6 5G'],
    'Poco X6 Pro': ['Poco X6 Pro', 'Poco X6 Pro 5G'],
    'Samsung A33': ['Samsung A33', 'Samsung A33 5G'],
    'Samsung A53': ['Samsung A53', 'Samsung A53 5G'],
    'Samsung A15': ['Samsung A15', 'Samsung A15 5G'],
    'Samsung A14': ['Samsung A14', 'Samsung A14 5G'],
    'Samsung A13': ['Samsung A13', 'Samsung A13 5G'],
  };
  return aliasMap[model] || [model];
}

function isTierPriceSane(variantMap, repairKey, partType, price) {
  if (typeof price !== 'number' || price <= 0) return false;
  const node = variantMap && variantMap[repairKey];
  if (!node) return true;
  const cheap = typeof node.cheap === 'number' ? node.cheap : null;
  const good = typeof node.good === 'number' ? node.good : null;
  if (partType === 'good' && cheap && price < cheap * 0.9) return false;
  if (partType === 'orig' && good && price < good * 0.9) return false;
  return true;
}

function collectCandidates(model, repairKey, partType) {
  const aliases = getAliases(model);
  const collected = [];

  collectCatalogCandidates(model, repairKey, partType).forEach((item) => collected.push(item));

  aliases.forEach((name) => {
    const mainNode = supplierVariantMap[name];
    const otpNode = supplierVariantMapOtp[name];
    const mainPrice = mainNode && mainNode[repairKey] ? mainNode[repairKey][partType] : null;
    const otpPrice = otpNode && otpNode[repairKey] ? otpNode[repairKey][partType] : null;
    if (typeof mainPrice === 'number' && isTierPriceSane(mainNode, repairKey, partType, mainPrice)) {
      collected.push({ price: mainPrice, source: 'main', updatedAt: '19.04.2026', model: name });
    }
    if (typeof otpPrice === 'number' && isTierPriceSane(otpNode, repairKey, partType, otpPrice)) {
      collected.push({ price: otpPrice, source: 'otp', updatedAt: '19.04.2026', model: name });
    }
  });

  const deduped = [];
  const seen = new Set();
  collected.sort((a, b) => a.price - b.price).forEach((item) => {
    const key = `${item.model}|${item.price}|${item.source}|${item.title || ''}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
  });

  return deduped;
}

function getMargin(model, repairKey, partType, supplierCost) {
  const deviceClass = getDeviceClass(model);
  let margin = 3200;
  if (deviceClass === 'upper') margin = 4300;
  if (deviceClass === 'flagship') margin = 5600;
  if (repairKey === 'battery') margin = Math.max(3200, margin - 900);
  if (partType === 'good') margin += 250;
  if (partType === 'orig') margin += 450;
  if (supplierCost >= 6500) margin += 300;
  return margin;
}

function getBrandBucket(model) {
  const text = String(model || '').toLowerCase();
  if (text.includes('iphone')) return 'iphone';
  if (text.includes('samsung')) return 'samsung';
  if (text.includes('redmi') || text.includes('xiaomi') || text.includes('poco')) return 'xiaomi';
  return 'other';
}

function getSegment(model) {
  const text = String(model || '').toLowerCase();
  if (text.includes('pro max') || text.includes('ultra') || text.includes('fold') || text.includes('rog')) return 'flagship';
  if (text.includes('pro') || text.includes('plus') || text.includes('flip') || text.includes('fe')) return 'premium';
  const standardHints = ['note 12', 'note 13', 'a54', 'a55', 's20', 's21', 's22', 's23', 'pixel 7', 'pixel 8', 'pixel 9', 'honor 90', 'honor 100', 'honor 200', 'reno', 'oneplus 10', 'oneplus 11', 'xiaomi 12', 'xiaomi 13', 'xiaomi 14'];
  if (standardHints.some((hint) => text.includes(hint))) return 'standard';
  return 'budget';
}

function estimateSupplierPrice(model, repairKey, partType) {
  if (!['display', 'battery', 'back'].includes(repairKey)) return null;
  const brandBucket = getBrandBucket(model);
  const segment = getSegment(model);
  const brandNode = estimatedPriceRanges[brandBucket];
  const repairNode = brandNode ? brandNode[repairKey] : null;
  const ranges = repairNode ? repairNode[segment] : null;
  if (!ranges) return null;
  const map = { cheap: ranges[0], good: ranges[1], orig: ranges[2] == null ? ranges[1] : ranges[2] };
  return map[partType] == null ? null : map[partType];
}

function buildPricing(model, repairKey, partType) {
  const isDiagnostic = ['charge', 'camera', 'speaker'].includes(repairKey);
  const isFixedBack = repairKey === 'back' && model.startsWith('iPhone') && typeof iphoneBackRetailOverride[model] === 'number';

  if (isFixedBack) {
    const retail = partType === 'cheap' ? Math.max(0, iphoneBackRetailOverride[model] - 500) : iphoneBackRetailOverride[model];
    const chosen = collectCandidates(model, repairKey, partType)[0] || null;
    return {
      mode: 'ready',
      source: chosen ? chosen.source : 'fixed',
      sourceModel: chosen ? chosen.model : model,
      updatedAt: chosen ? chosen.updatedAt : '19.04.2026',
      priceType: 'fixed',
      supplierCost: chosen ? chosen.price : null,
      retailPrice: retail,
      margin: chosen ? retail - chosen.price : null,
      note: chosen ? 'Фикс по сети на основе прайса' : 'Фикс по сети',
    };
  }

  const chosen = collectCandidates(model, repairKey, partType)[0] || null;

  if (!chosen && isDiagnostic) {
    return {
      mode: 'diagnostic-only',
      source: 'unavailable',
      sourceModel: null,
      updatedAt: '—',
      priceType: 'diagnostic',
      supplierCost: null,
      retailPrice: null,
      margin: null,
      note: 'Только диагностика.',
    };
  }

  const estimated = !chosen ? estimateSupplierPrice(model, repairKey, partType) : null;
  const baseCost = chosen ? chosen.price : estimated;

  if (!baseCost) {
    return {
      mode: 'no-price',
      source: 'unavailable',
      sourceModel: null,
      updatedAt: '—',
      priceType: 'supplier',
      supplierCost: null,
      retailPrice: null,
      margin: null,
      note: 'Цена не подтверждена. Модель оставлена в каталоге, но по закупке нет инфы.',
    };
  }

  let retailPrice = baseCost + getMargin(model, repairKey, partType, baseCost);
  if (repairKey === 'battery') retailPrice -= 1100;
  retailPrice = psychologicalRound(retailPrice);

  return {
    mode: 'ready',
    source: chosen ? chosen.source : 'estimate',
    sourceModel: chosen ? chosen.model : model,
    updatedAt: chosen ? chosen.updatedAt : 'Оценка',
    priceType: 'workAndPart',
    supplierCost: baseCost,
    retailPrice,
    margin: retailPrice - baseCost,
    note: chosen ? (chosen.source === 'main' ? 'Расчёт по основному прайсу' : 'Расчёт по альтернативному прайсу') : 'Оценочная закупка по диапазонам из загруженных прайсов',
  };
}

function getPartsSortPriority(model) {
  const text = String(model || '').toLowerCase();
  if (text.includes('iphone')) return 1;
  if (text.includes('samsung')) return 2;
  if (text.includes('redmi') || text.includes('xiaomi') || text.includes('poco')) return 3;
  if (text.includes('realme')) return 4;
  if (text.includes('honor')) return 5;
  if (text.includes('oppo')) return 6;
  if (text.includes('vivo')) return 7;
  if (text.includes('tecno')) return 8;
  if (text.includes('infinix')) return 9;
  return 20;
}

function formatPrice(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—';
  return `${value.toLocaleString('ru-RU')} ₽`;
}

function buildPartsInventory() {
  const rows = [...parsedCatalogParts];

  Object.entries(supplierVariantMap).forEach(([model, services]) => {
    ['battery', 'display'].forEach((type) => {
      const tierNode = services[type];
      if (!tierNode) return;
      Object.entries(tierNode).forEach(([quality, price]) => {
        if (typeof price === 'number' && price > 0) {
          rows.push({ model, title: `${type === 'battery' ? 'АКБ' : 'Дисплей'} · ${quality}`, type, quality, price, source: 'main' });
        }
      });
    });
  });

  Object.entries(supplierVariantMapOtp).forEach(([model, services]) => {
    ['battery', 'display'].forEach((type) => {
      const tierNode = services[type];
      if (!tierNode) return;
      Object.entries(tierNode).forEach(([quality, price]) => {
        if (typeof price === 'number' && price > 0) {
          rows.push({ model, title: `${type === 'battery' ? 'АКБ' : 'Дисплей'} · ${quality}`, type, quality, price, source: 'otp' });
        }
      });
    });
  });

  androidBackParts.forEach((item) => rows.push(item));

  const deduped = [];
  const seen = new Set();
  rows.forEach((item) => {
    const key = `${item.model}|${item.title}|${item.type}|${item.quality}|${item.price}|${item.source}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
  });

  return deduped.sort((a, b) => {
    const priorityDiff = getPartsSortPriority(a.model) - getPartsSortPriority(b.model);
    if (priorityDiff !== 0) return priorityDiff;
    const modelDiff = a.model.localeCompare(b.model, 'ru');
    if (modelDiff !== 0) return modelDiff;
    return String(a.title || '').localeCompare(String(b.title || ''), 'ru');
  });
}

export default function RepairPortal() {
  const [dailyTarget, setDailyTarget] = useState(30000);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [brandTab, setBrandTab] = useState('iphone');
  const [search, setSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [selectedWizardCategory, setSelectedWizardCategory] = useState('phone-simple');
  const [cart, setCart] = useState([]);
  const [quickNote, setQuickNote] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const [assistantMode, setAssistantMode] = useState('newbie');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loginError, setLoginError] = useState('');
  const [partsFilter, setPartsFilter] = useState('all');
  const [partsSearch, setPartsSearch] = useState('');

  const filteredModels = useMemo(() => models[brandTab].filter((model) => model.toLowerCase().includes(search.toLowerCase())), [brandTab, search]);
  const partsInventory = useMemo(() => buildPartsInventory(), []);
  const filteredPartsInventory = useMemo(() => {
    return partsInventory.filter((item) => {
      const typeOk = partsFilter === 'all' ? true : item.type === partsFilter;
      const haystack = `${item.model} ${item.title || ''}`.toLowerCase();
      const searchOk = haystack.includes(partsSearch.toLowerCase());
      return typeOk && searchOk;
    });
  }, [partsInventory, partsFilter, partsSearch]);

  const qualityMeta = {
    cheap: { label: 'Дешёвое качество', short: 'База' },
    good: { label: 'Отличное качество', short: 'Хорошее' },
    orig: { label: 'Премиум', short: 'Премиум' },
  };

  const sourceMeta = {
    main: { label: 'A · основной прайс', className: 'border-sky-800/50 bg-sky-950/30 text-sky-300' },
    otp: { label: 'B · OTP прайс', className: 'border-violet-800/50 bg-violet-950/30 text-violet-300' },
    fixed: { label: 'manual override', className: 'border-fuchsia-800/50 bg-fuchsia-950/30 text-fuchsia-300' },
    estimate: { label: 'estimated', className: 'border-amber-800/50 bg-amber-950/30 text-amber-300' },
    unavailable: { label: 'цена не подтверждена', className: 'border-rose-800/50 bg-rose-950/30 text-rose-300' },
  };

  const priceTypeMeta = {
    fixed: { label: 'Фикс-прайс', className: 'border-fuchsia-800/50 bg-fuchsia-950/30 text-fuchsia-300' },
    supplier: { label: 'Цена из прайса', className: 'border-cyan-800/50 bg-cyan-950/30 text-cyan-300' },
    workAndPart: { label: 'Работа + деталь', className: 'border-emerald-800/50 bg-emerald-950/30 text-emerald-300' },
    diagnostic: { label: 'Только диагностика', className: 'border-rose-800/50 bg-rose-950/30 text-rose-300' },
  };

  const wizardCards = [
    { id: 'phone-simple', title: 'Телефон · понятная модулька', mode: 'ready', description: 'Сразу расчёт' },
    { id: 'phone-complex', title: 'Телефон · сложный симптом', mode: 'diagnostic', description: 'Только диагностика' },
    { id: 'tv', title: 'ТВ', mode: 'diagnostic', description: 'Только диагностика' },
    { id: 'coffee', title: 'Кофемашина', mode: 'diagnostic', description: 'Только диагностика' },
    { id: 'printer', title: 'Принтер / МФУ', mode: 'diagnostic', description: 'Только диагностика' },
  ];

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 1000);
    } catch (e) {
      console.error(e);
    }
  };

  function addToCart(item) {
    setCart((prev) => prev.concat([item]));
  }

  function getEffectiveRetailPrice(item, items) {
    if (item.repairKey !== 'battery') return item.retailPrice;
    const hasDisplay = items.some((other) => other.model === item.model && other.repairKey === 'display');
    return hasDisplay ? Math.max(0, item.retailPrice - 1500) : item.retailPrice;
  }

  const totalSupplier = cart.reduce((sum, item) => sum + (item.supplierCost || 0), 0);
  const totalRetail = cart.reduce((sum, item) => sum + getEffectiveRetailPrice(item, cart), 0);
  const totalMargin = totalRetail - totalSupplier;

  function Button({ active, children, onClick }) {
    return (
      <button onClick={onClick} className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${active ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>
        {children}
      </button>
    );
  }

  function PriceTypeBadge({ type }) {
    const meta = priceTypeMeta[type] || priceTypeMeta.supplier;
    return <Badge className={meta.className}>{meta.label}</Badge>;
  }

  function PriceSourceBadge({ source, updatedAt, sourceModel }) {
    const meta = sourceMeta[source] || sourceMeta.unavailable;
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={meta.className}>{meta.label}</Badge>
        <span className="text-xs text-slate-500">Обновлено: {updatedAt || '—'}</span>
        {sourceModel ? <span className="text-xs text-slate-500">Источник модели: {sourceModel}</span> : null}
      </div>
    );
  }

  function QuoteBuilder({ model, repair }) {
    const tiers = repair.key === 'back' ? ['cheap', 'good'] : ['cheap', 'good', 'orig'];

    return (
      <div className="space-y-4">
        <Card className="bg-slate-900/80">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Карточка расчёта</div>
              <h4 className="mt-2 text-2xl font-black">{model} · {repair.title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <PriceTypeBadge type={repair.type === 'modular' ? (repair.key === 'back' ? 'fixed' : 'workAndPart') : 'diagnostic'} />
              {getDeviceClass(model) === 'flagship' ? <Badge className="border-amber-800/50 bg-amber-950/30 text-amber-300">дорогое устройство</Badge> : null}
            </div>
          </div>
          <div className="mt-3 text-sm leading-6 text-slate-400">
            {repair.type === 'modular'
              ? 'Для модульного ремонта показываем источник цены, дату обновления, закупку и розницу. Если точной строки в прайсах нет, используем estimated-оценку по похожим моделям.'
              : 'Для этой категории цена не обещается. Только диагностика и грамотный приём.'}
          </div>
          {assistantMode === 'newbie' ? (
            <div className="mt-4 rounded-2xl border border-cyan-900/40 bg-cyan-950/20 p-4 text-sm leading-6 text-cyan-100">
              Подсказка: не говори клиенту окончательный диагноз. Говори: «По симптому есть несколько вероятных причин, точный ответ дадим после проверки».
            </div>
          ) : null}
        </Card>

        <div className="grid gap-4 xl:grid-cols-2">
          {tiers.map((tier) => {
            const meta = qualityMeta[tier];
            const pricing = buildPricing(model, repair.key, tier);
            return (
              <Card key={tier} className="min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold">{meta.label}</div>
                    <div className="mt-1 text-xs text-slate-400">{meta.short}</div>
                  </div>
                  <PriceTypeBadge type={pricing.priceType} />
                </div>

                <div className="mt-4">
                  <PriceSourceBadge source={pricing.source} updatedAt={pricing.updatedAt} sourceModel={pricing.sourceModel} />
                </div>

                {pricing.mode === 'ready' ? (
                  <>
                    <div className="mt-4 grid grid-cols-1 gap-3">
                      <div className="rounded-2xl bg-slate-950 p-3">
                        <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Закупка</div>
                        <div className="mt-1 whitespace-nowrap text-lg font-black">{pricing.supplierCost || '—'} ₽</div>
                      </div>
                      <div className="rounded-2xl bg-slate-950 p-3">
                        <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Маржа</div>
                        <div className="mt-1 whitespace-nowrap text-lg font-black">{pricing.margin || '—'} ₽</div>
                      </div>
                      <div className="rounded-2xl bg-slate-950 p-3">
                        <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Розница</div>
                        <div className="mt-1 whitespace-nowrap text-lg font-black text-emerald-300">{pricing.retailPrice || '—'} ₽</div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm leading-6 text-slate-300">{pricing.note}</div>
                    <button
                      onClick={() => addToCart({ model, repairKey: repair.key, label: `${repair.title} — ${meta.label}`, supplierCost: pricing.supplierCost, retailPrice: pricing.retailPrice, source: pricing.source, sourceModel: pricing.sourceModel })}
                      className="mt-4 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-bold text-black hover:bg-cyan-400"
                    >
                      Добавить в чек
                    </button>
                  </>
                ) : (
                  <div className="mt-4">
                    <NoPriceState title={pricing.mode === 'diagnostic-only' ? 'Публичный расчёт выключен' : 'Цена не подтверждена'} note={pricing.note} />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginValue === 'service' && passwordValue === 'singa') {
      setIsAuthenticated(true);
      setLoginError('');
      return;
    }
    setLoginError('Неверный логин или пароль');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl">
            <div className="inline-flex rounded-full border border-cyan-800/50 bg-cyan-950/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
              Внутренний доступ
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight">Вход в портал</h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Для просмотра цен, скриптов и внутренней информации введи логин и пароль.
            </p>
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Логин</label>
                <input
                  type="text"
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                  placeholder="Введите логин"
                  autoComplete="username"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Пароль</label>
                <input
                  type="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>
              {loginError ? <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 px-4 py-3 text-sm text-rose-300">{loginError}</div> : null}
              <button
                type="submit"
                className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-bold text-black transition hover:bg-cyan-400"
              >
                Войти
              </button>
            </form>
            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs leading-6 text-slate-500">
              Доступ закрыт для внешних пользователей.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-slate-800 bg-black p-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6">
          <div>
            <div className="text-xs text-slate-400">План</div>
            <input value={dailyTarget} onChange={(e) => setDailyTarget(Number(e.target.value) || 0)} className="w-24 rounded bg-slate-800 px-3 py-1 text-white" />
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-2 py-2">
              <button onClick={() => setAssistantMode('newbie')} className={`rounded-xl px-3 py-2 text-xs font-bold ${assistantMode === 'newbie' ? 'bg-cyan-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}>
                Новичок
              </button>
              <button onClick={() => setAssistantMode('pro')} className={`rounded-xl px-3 py-2 text-xs font-bold ${assistantMode === 'pro' ? 'bg-cyan-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}>
                Опытный
              </button>
            </div>
            <div className="rounded-2xl border border-cyan-900/40 bg-cyan-950/20 px-4 py-2 text-sm text-cyan-200">
              Франшизная логика: подтверждённая закупка → расчёт, нет закупки → только диагностика
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-cyan-900/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6">
          <div className="inline-flex rounded-full border border-cyan-800/50 bg-cyan-950/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Partner Repair Portal V4</div>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">CRM-портал приёмки, расчёта, диагностики и франшизы</h1>
          <p className="mt-4 max-w-5xl text-sm leading-7 text-slate-300 md:text-base">Портал не просто считает цену, а помогает приёмщику быстро понять сценарий, не обещать лишнее, видеть источник цены и работать по единому стандарту сети.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Философия', 'Не прайс-лист, а система принятия решений'],
              ['Главная цель', 'Помочь быстро понять: считать или вести в диагностику'],
              ['Стандарт сети', 'Единые правила, источники цен и контроль ошибок'],
              ['Рост выручки', 'Больше средний чек, меньше пустых обещаний'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500">{title}</div>
                <div className="mt-2 text-sm font-bold text-cyan-300">{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { id: 'dashboard', label: 'Главная' },
            { id: 'phones', label: 'Телефоны и расчёт' },
            { id: 'parts', label: 'Все запчасти' },
            { id: 'diagnostics', label: 'Диагностика' },
            { id: 'universal', label: 'Любая техника' },
            { id: 'psychology', label: 'Психология продаж' },
            { id: 'objections', label: 'Возражения' },
            { id: 'manager', label: 'Топ-менеджер' },
            { id: 'partner', label: 'Партнёрский кабинет' },
            { id: 'training', label: 'Training Center' },
            { id: 'audit', label: 'Audit Log' },
            { id: 'knowledge', label: 'База знаний' },
            { id: 'scripts', label: 'Скрипты' },
            { id: 'mistakes', label: 'Ошибки приёмщика' },
          ].map((tab) => (
            <Button key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <Card>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Intake Wizard</div>
              <h2 className="mt-2 text-2xl font-black">Маршрутизация заявки</h2>
              <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
                {wizardCards.map((item) => (
                  <button key={item.id} onClick={() => setSelectedWizardCategory(item.id)} className={`rounded-2xl border p-4 text-left transition ${selectedWizardCategory === item.id ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800 bg-slate-950 hover:border-cyan-700'}`}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold">{item.title}</div>
                      <Badge className={item.mode === 'ready' ? 'border-emerald-800/50 bg-emerald-950/30 text-emerald-300' : 'border-rose-800/50 bg-rose-950/30 text-rose-300'}>{item.description}</Badge>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-slate-300">
                {selectedWizardCategory === 'phone-simple' ? 'Понятная модулька: можно считать только при наличии подтверждённой закупки.' : 'Сложная техника и сложные симптомы: только диагностика, без публичной цены.'}
                {assistantMode === 'newbie' ? (
                  <div className="mt-3 rounded-2xl border border-cyan-900/40 bg-cyan-950/20 p-3 text-cyan-100">
                    Подсказка для новичка: сначала выясни удар, воду, прошлый ремонт и плавающий ли дефект. Эти четыре ответа чаще всего сразу показывают правильный маршрут.
                  </div>
                ) : null}
              </div>
            </Card>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Card>
                <h2 className="text-2xl font-bold">Бысткий чек-лист приёмки</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    'За 30–60 секунд понять: модулька или диагностика.',
                    'Спросить про удар, воду, перегрев, предыдущий ремонт.',
                    'Если симптом плавающий — сразу в диагностику.',
                    'Если устройство дорогое — акцент на качестве и рисках дешёвого решения.',
                  ].map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{item}</div>)}
                </div>
              </Card>
              <Card>
                <h2 className="text-2xl font-bold">Красные флаги при приёмке</h2>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  {[
                    'Следы воды, коррозии, запах гари.',
                    'Сильный удар, изгиб корпуса, следы деформации рамы.',
                    'Плавающий дефект: то работает, то нет.',
                    'После предыдущего сервиса или уже вскрывалось.',
                  ].map((item) => <div key={item} className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-4">{item}</div>)}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'phones' && (
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <Card>
                <h2 className="text-2xl font-bold">Телефоны, модели и карточки расчёта</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">Для телефонов модулька считается только при наличии подтверждённой закупки. Если точной цены в загруженных прайсах нет, модель всё равно остаётся в каталоге, а портал показывает estimated по диапазонам похожих моделей.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {brandTabs.map((brand) => (
                    <Button key={brand.id} active={brandTab === brand.id} onClick={() => { setBrandTab(brand.id); setSelectedModel(null); setSelectedRepair(null); setSearch(''); }}>
                      {brand.label}
                    </Button>
                  ))}
                </div>
                <ModelSearchInput initialValue={search} onSearch={setSearch} onClear={() => setSearch('')} />

                {!selectedModel && (
                  <div className="mt-4">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>Найдено моделей: {filteredModels.length}</span>
                      <Badge className="border-amber-800/40 bg-amber-950/20 text-amber-200">если точной закупки нет — показываем estimated</Badge>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                      {filteredModels.map((model) => (
                        <button key={model} onClick={() => { setSelectedModel(model); setSelectedRepair(null); setCart([]); }} className="rounded-2xl border border-slate-800 bg-slate-800/80 p-4 text-left transition hover:border-cyan-600 hover:bg-slate-700">
                          <div className="font-semibold">{model}</div>
                          <div className="mt-2 text-xs text-slate-400">Нажми, чтобы открыть карточку модели и выбрать ремонт</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedModel && (
                  <div className="mt-5">
                    <button onClick={() => { setSelectedModel(null); setSelectedRepair(null); setCart([]); }} className="mb-4 text-sm font-semibold text-cyan-400 hover:text-cyan-300">← Назад к списку моделей</button>
                    <Card className="border-cyan-900/40 bg-slate-800/70">
                      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Выбрана модель</div>
                          <h3 className="mt-2 text-2xl font-bold">{selectedModel}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-300">Класс устройства: {getDeviceClass(selectedModel) === 'flagship' ? 'флагман' : getDeviceClass(selectedModel) === 'upper' ? 'верхний средний' : 'базовый'}</div>
                          {getDeviceClass(selectedModel) === 'flagship' ? <Badge className="border-amber-800/50 bg-amber-950/30 text-amber-300">дорогое устройство</Badge> : null}
                        </div>
                      </div>
                      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {phoneRepairCatalog.map((repair) => (
                          <button key={repair.key} onClick={() => setSelectedRepair(repair)} className={`rounded-2xl border p-4 text-left transition ${selectedRepair && selectedRepair.key === repair.key ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800 bg-slate-900 hover:border-cyan-700'}`}>
                            <div className="text-xl">{repair.icon}</div>
                            <div className="mt-2 font-bold">{repair.title}</div>
                            <div className="mt-2 flex flex-wrap gap-2"><PriceTypeBadge type={repair.type === 'modular' ? (repair.key === 'back' ? 'fixed' : 'workAndPart') : 'diagnostic'} /></div>
                          </button>
                        ))}
                      </div>
                    </Card>
                  </div>
                )}

                {selectedRepair && selectedModel && (
                  <div className="mt-6 grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
                    <QuoteBuilder model={selectedModel} repair={selectedRepair} />
                    <div className="space-y-6">
                      <Card>
                        <h4 className="text-xl font-bold">Что говорить по сценарию</h4>
                        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                          {selectedRepair.type === 'modular' ? (
                            <>
                              <div className="rounded-2xl bg-slate-800 p-4">По модульке показываем выбор по качеству только при подтверждённой закупке или estimated-оценке.</div>
                              <div className="rounded-2xl bg-slate-800 p-4">Для дорогих моделей основной акцент на хорошем качестве и премиуме.</div>
                              <div className="rounded-2xl bg-slate-800 p-4">После выбора основной работы сразу предлагаем один доп.</div>
                            </>
                          ) : (
                            <>
                              <div className="rounded-2xl bg-slate-800 p-4">{selectedRepair.diagnosticText}</div>
                              <div className="rounded-2xl bg-slate-800 p-4">Главная задача — не обещать сумму, а принять устройство на диагностику.</div>
                            </>
                          )}
                        </div>
                      </Card>
                      <Card>
                        <h4 className="text-xl font-bold">Личная заметка приёмщика</h4>
                        <textarea value={quickNote} onChange={(e) => setQuickNote(e.target.value)} placeholder="Фиксируй важные нюансы разговора" className="mt-4 min-h-[120px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500" />
                      </Card>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <h3 className="text-xl font-bold">CRM-чек</h3>
                <div className="mt-2 text-xs text-slate-500">Позиций в чеке: {cart.length}</div>
                <div className="mt-4 space-y-3">
                  {cart.length === 0 ? (
                    <div className="rounded-2xl bg-slate-800 p-4 text-sm text-slate-400">Выбери модель, ремонт и уровень качества — позиции появятся здесь.</div>
                  ) : (
                    cart.map((item, index) => (
                      <div key={`${item.label}-${index}`} className="rounded-2xl bg-slate-800 p-4">
                        <div className="font-semibold">{item.label}</div>
                        <div className="mt-1 text-xs text-slate-400">Закупка: {item.supplierCost || '—'} ₽</div>
                        <div className="mt-1 text-[11px] text-slate-500">Источник: {item.source || '—'}{item.sourceModel ? ` · ${item.sourceModel}` : ''}</div>
                        <div className="mt-2 text-lg font-bold text-emerald-400">{getEffectiveRetailPrice(item, cart)} ₽</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="mt-5 rounded-2xl bg-slate-950 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-400"><span>Закупка всего</span><span>{totalSupplier} ₽</span></div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-400"><span>Маржа всего</span><span>{totalMargin} ₽</span></div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3 text-lg font-black"><span>Итоговый чек</span><span className="text-emerald-400">{totalRetail} ₽</span></div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'parts' && (
          <div className="space-y-6">
            <Card>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Все запчасти на модульный ремонт</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Отдельный каталог для быстрого подбора: АКБ, дисплейные модули и задние крышки только на Android.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button active={partsFilter === 'all'} onClick={() => setPartsFilter('all')}>Все</Button>
                  <Button active={partsFilter === 'battery'} onClick={() => setPartsFilter('battery')}>Батареи</Button>
                  <Button active={partsFilter === 'display'} onClick={() => setPartsFilter('display')}>Дисплеи</Button>
                  <Button active={partsFilter === 'android-back'} onClick={() => setPartsFilter('android-back')}>Задние крышки Android</Button>
                </div>
              </div>
              <div className="mt-4">
                <ModelSearchInput initialValue={partsSearch} onSearch={setPartsSearch} onClear={() => setPartsSearch('')} />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>Найдено позиций: {filteredPartsInventory.length}</span>
                <Badge className="border-cyan-800/40 bg-cyan-950/20 text-cyan-200">поиск по конкретной модели</Badge>
                <Badge className="border-amber-800/40 bg-amber-950/20 text-amber-200">Android крышки — только из отдельного прайса</Badge>
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredPartsInventory.map((item, index) => (
                <Card key={`${item.model}-${item.type}-${item.quality}-${index}`} className="min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-bold">{item.model}</div>
                      {item.title ? <div className="mt-1 text-xs leading-5 text-slate-500">{item.title}</div> : null}
                      <div className="mt-2 text-sm text-slate-400">
                        {item.type === 'battery' ? 'Аккумулятор' : item.type === 'display' ? 'Дисплейный модуль' : 'Задняя крышка Android'}
                      </div>
                    </div>
                    <Badge className={item.type === 'battery' ? 'border-emerald-800/50 bg-emerald-950/30 text-emerald-300' : item.type === 'display' ? 'border-cyan-800/50 bg-cyan-950/30 text-cyan-300' : 'border-fuchsia-800/50 bg-fuchsia-950/30 text-fuchsia-300'}>
                      {item.type === 'battery' ? 'АКБ' : item.type === 'display' ? 'Дисплей' : 'Крышка'}
                    </Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="border-slate-700 bg-slate-950 text-slate-300">качество: {item.quality}</Badge>
                    <Badge className="border-slate-700 bg-slate-950 text-slate-300">источник: {item.source}</Badge>
                  </div>
                  <div className="mt-5 rounded-2xl bg-slate-950 p-4">
                    <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Закупка</div>
                    <div className="mt-1 whitespace-nowrap text-2xl font-black text-emerald-300">{formatPrice(item.price)}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {diagnosticCategories.map((group) => (
                <Card key={group.key}>
                  <h2 className="text-2xl font-bold">{group.title}</h2>
                  <div className="mt-5 space-y-3">
                    {group.items.map((item) => <div key={item} className="rounded-2xl bg-slate-800/80 p-4 text-sm leading-6 text-slate-200">• {item}</div>)}
                  </div>
                  <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-slate-300">{group.script}</div>
                </Card>
              ))}
            </div>
            <Card>
              <h3 className="text-xl font-bold text-cyan-300">Телефоны · сложные кейсы</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {[
                  ['После воды', 'Риск коррозии, коротких замыканий и отложенных последствий.'],
                  ['Нет изображения', 'Может быть дисплей, подсветка, питание, плата, шлейф.'],
                  ['После другого сервиса', 'Проверяем следы пайки, сорванные элементы, некорректные детали.'],
                  ['Плавающий дефект', 'Если то работает, то нет — почти всегда диагностика.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">
                    <div className="font-semibold text-white">{title}</div>
                    <div className="mt-2">{text}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'universal' && (
          <div className="grid gap-6 lg:grid-cols-2">
            {universalBlocks.map((block) => (
              <Card key={block.title}>
                <h3 className="text-xl font-bold text-cyan-300">{block.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-300">{block.bullets.map((b) => <div key={b}>• {b}</div>)}</div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'psychology' && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {psychologyBlocks.map((item) => (
              <Card key={item}>
                <div className="text-sm leading-6 text-slate-300">{item}</div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'objections' && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {objectionScripts.map((item) => (
              <Card key={item.objection}>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Возражение</div>
                <h3 className="mt-2 text-xl font-bold">{item.objection}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.answer}</p>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'manager' && (
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold">Чек-лист топ-менеджера</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {managerChecklist.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{item}</div>)}
              </div>
            </Card>
            <Card>
              <h2 className="text-2xl font-bold">Вопросы клиенту</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {clientQuestions.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{item}</div>)}
              </div>
            </Card>
            <Card>
              <h2 className="text-2xl font-bold">Дожим на диагностику</h2>
              <div className="mt-5 space-y-3">
                {[
                  'Давайте хотя бы сделаем диагностику, чтобы вы не гадали и не переплачивали вслепую.',
                  'Сейчас важно не назвать красивую цифру, а дать вам точный ответ после проверки.',
                  'Оставляйте устройство: после диагностики вы уже спокойно решите, делать ремонт или нет.',
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-800/80 p-4 text-sm text-slate-300">
                    <div>{item}</div>
                    <button onClick={() => copyText(item)} className="mt-3 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-black hover:bg-cyan-400">{copiedText === item ? 'Скопировано' : 'Скопировать'}</button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'partner' && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Средняя маржа', value: '5 240 ₽', tone: 'text-emerald-400' },
                { label: 'Конверсия в приём', value: '69%', tone: 'text-cyan-400' },
                { label: 'Средний чек', value: '8 660 ₽', tone: 'text-amber-400' },
                { label: 'Диагностик в работе', value: '47', tone: 'text-fuchsia-400' },
              ].map((item) => (
                <Card key={item.label}>
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                  <div className={`mt-3 text-3xl font-black ${item.tone}`}>{item.value}</div>
                </Card>
              ))}
            </div>
            <Card>
              <h2 className="text-2xl font-bold">Правила франшизы</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-2">
                {franchiseRules.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{item}</div>)}
              </div>
            </Card>
            <Card>
              <h2 className="text-2xl font-bold">Филиалы и KPI</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-300">
                  <thead className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    <tr>
                      <th className="px-3 py-3">Филиал</th>
                      <th className="px-3 py-3">Маржа</th>
                      <th className="px-3 py-3">Конверсия</th>
                      <th className="px-3 py-3">Средний чек</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchStats.map((row) => (
                      <tr key={row.branch} className="border-t border-slate-800">
                        <td className="px-3 py-3 font-semibold">{row.branch}</td>
                        <td className="px-3 py-3">{row.margin}</td>
                        <td className="px-3 py-3">{row.conversion}</td>
                        <td className="px-3 py-3">{row.avgCheck}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {trainingTracks.map((track) => (
                <Card key={track.title}>
                  <h3 className="text-xl font-bold text-cyan-300">{track.title}</h3>
                  <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">{track.items.map((item) => <div key={item}>• {item}</div>)}</div>
                </Card>
              ))}
            </div>
            <Card>
              <h2 className="text-2xl font-bold">Адаптация нового сотрудника</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {[
                  'День 1–3: как задавать вопросы и не обещать лишнего.',
                  'Неделя 1: модулька, уровни качества, допродажи.',
                  'Неделя 2: диагностика по ТВ, кофемашинам, принтерам, ПК.',
                  'Неделя 3: работа с возражениями и сложными клиентами.',
                ].map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{item}</div>)}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'audit' && (
          <Card>
            <h2 className="text-2xl font-bold">История изменений</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  <tr>
                    <th className="px-3 py-3">Когда</th>
                    <th className="px-3 py-3">Действие</th>
                    <th className="px-3 py-3">Кто</th>
                    <th className="px-3 py-3">Комментарий</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLog.map((row) => (
                    <tr key={row.when + row.action} className="border-t border-slate-800">
                      <td className="px-3 py-3">{row.when}</td>
                      <td className="px-3 py-3 font-semibold">{row.action}</td>
                      <td className="px-3 py-3">{row.who}</td>
                      <td className="px-3 py-3">{row.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'knowledge' && (
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold">База знаний приёмщика</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Короткие карточки по симптомам, вероятным причинам и правилам общения с клиентом.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {knowledgeBaseCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
                    <div className="font-bold text-cyan-300">{card.title}</div>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{card.bullets.map((item) => <div key={item}>• {item}</div>)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'scripts' && (
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold">Библиотека скриптов</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Готовые рабочие формулировки и анти-примеры.</p>
              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                {scriptLibrary.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                    <div className="font-bold text-cyan-300">{item.title}</div>
                    <div className="mt-4 rounded-2xl bg-emerald-950/20 p-4 text-sm leading-6 text-emerald-100">
                      <div className="text-xs uppercase tracking-[0.14em] text-emerald-300">Как говорить</div>
                      <div className="mt-2">{item.good}</div>
                    </div>
                    <div className="mt-3 rounded-2xl bg-rose-950/20 p-4 text-sm leading-6 text-rose-100">
                      <div className="text-xs uppercase tracking-[0.14em] text-rose-300">Как не говорить</div>
                      <div className="mt-2">{item.bad}</div>
                    </div>
                    <button onClick={() => copyText(item.good)} className="mt-4 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-black hover:bg-cyan-400">{copiedText === item.good ? 'Скопировано' : 'Скопировать хороший скрипт'}</button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'mistakes' && (
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold">Ошибки приёмщика</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Что ломает конверсию, доверие и средний чек — и как портал должен это предотвращать.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {mistakeCards.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-rose-900/30 bg-slate-900/80 p-5">
                    <div className="font-bold text-rose-300">{item.title}</div>
                    <div className="mt-3 text-sm leading-6 text-slate-300">{item.text}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
