import { useEffect, useMemo, useState } from 'react';

function psychologicalRound(price) {
  if (!price || price <= 0) return 0;
  const base = Math.floor(price / 100) * 100;
  const rounded = base + 90;
  if (rounded < price - 60) return base + 190;
  return rounded;
}

// 💰 Тон прибыли (для приёмщика)
function getProfitTone(margin) {
  if (margin >= 4000) {
    return { label: 'Высокая маржа', className: 'border-green-700 text-green-400' };
  }
  if (margin >= 2500) {
    return { label: 'Норм маржа', className: 'border-yellow-700 text-yellow-400' };
  }
  return { label: 'Низкая маржа', className: 'border-red-700 text-red-400' };
}

function getCloseScript(level) {
  if (level === 'soft') return 'Можно сделать базовый вариант дешевле, но лучше сразу закрыть вопрос, чтобы не возвращаться.';
  if (level === 'medium') return 'Смотрите, если сделать сейчас нормально — вы забудете про эту проблему.';
  if (level === 'hard') return 'Лучше сразу сделать нормально. Так надёжнее и дешевле, чем переделывать.';
  return '';
}

function applyCloseDiscount(price, mode) {
  if (mode === 'soft') return price - 300;
  if (mode === 'medium') return price - 500;
  if (mode === 'hard') return price - 700;
  return price;
}

function ModelSearchInput({ initialValue, onSearch, onClear }) {
  const [draft, setDraft] = useState(initialValue || '');

  useEffect(() => {
    setDraft(initialValue || '');
  }, [initialValue]);

  const submitSearch = () => {
    onSearch(draft.trim());
  };

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
        <button
          onClick={submitSearch}
          className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-bold text-black transition hover:bg-cyan-400"
        >
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

export default function RepairPortal() {
  // 🎯 План дня
  const [dailyTarget, setDailyTarget] = useState(30000);
  const [currentRevenue, setCurrentRevenue] = useState(0);

  // 📊 Индикатор закрытия
  function getCloseProbability(price) {
    if (price < 4000) return { label: '🟢 Легко закрыть', color: 'text-green-400' };
    if (price < 8000) return { label: '🟡 Нормально', color: 'text-yellow-400' };
    return { label: '🔴 Риск отказа', color: 'text-red-400' };
  }

  // 🧠 Авто-рекомендация
  function getSmartAdvice(partType, margin) {
    if (margin > 4000) return '🔥 Максимальная маржа — продавай уверенно';
    if (partType === 'orig') return '⚠️ Оригинал дорогой — высокий риск отказа';
    return '💰 Оптимальный вариант по цене/качеству';
  }

  // 🤖 AI-дожим (что сказать прямо сейчас)
  function getLiveScript(price, repairKey) {
    if (price < 4000) return 'Сделаем быстро и недорого, сейчас закроем и забудете про проблему.';
    if (repairKey === 'display') return 'Если ставить нормальный дисплей — будет как новый, без возвратов.';
    if (repairKey === 'battery') return 'После замены батареи телефон будет держать как новый.';
    return 'Лучше сделать сразу нормально, чтобы не возвращаться к этому.';
  }

  // 💸 фиксация сделки
  function closeDeal(price) {
    setCurrentRevenue((prev) => prev + price);
  }

  // 📊 KPI
  function getKPI(current, target) {
    const percent = (current / target) * 100;
    if (percent >= 100) return '🔥 План выполнен';
    if (percent >= 70) return '⚡ Почти сделали';
    return '⏳ Нужно продавать';
  }
  const [activeTab, setActiveTab] = useState('dashboard');
  const [brandTab, setBrandTab] = useState('iphone');
  const [search, setSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [cart, setCart] = useState([]);
  const [quickNote, setQuickNote] = useState('');
  const [budgetMode, setBudgetMode] = useState('balanced');

  const topTabs = [
    { id: 'dashboard', label: 'Главная' },
    { id: 'phones', label: 'Телефоны и цены' },
    { id: 'diagnostics', label: 'Скрипты на диагностику' },
    { id: 'psychology', label: 'Психология продаж' },
    { id: 'objections', label: 'Возражения' },
    { id: 'manager', label: 'Топ-менеджер' },
  ];

  const kpiStats = [
    { title: '3 варианта выбора', value: 'Китай / хороший / оригинал' },
    { title: 'Цель приёмщика', value: 'Закрыть модульку на месте' },
    { title: 'Сложная техника', value: 'Только оставить на диагностике' },
    { title: 'Минимум в чек', value: '+1 допродажа к ремонту' },
  ];

  const budgetModes = [
    { id: 'econom', label: 'Эконом' },
    { id: 'balanced', label: 'Оптимум' },
    { id: 'premium', label: 'Премиум' },
  ];

  const brandTabs = [
    { id: 'iphone', label: 'iPhone' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'xiaomi', label: 'Xiaomi / Poco / Redmi' },
    { id: 'other', label: 'Другие бренды' },
  ];

  const models = {
    iphone: [
      'iPhone 7', 'iPhone 7 Plus', 'iPhone 8', 'iPhone 8 Plus', 'iPhone X', 'iPhone XR', 'iPhone XS', 'iPhone XS Max',
      'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max', 'iPhone SE 2020',
      'iPhone 12 mini', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
      'iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone SE 2022',
      'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
      'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
      'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
    ],
    samsung: [
      'Samsung A12', 'Samsung A13', 'Samsung A14', 'Samsung A15', 'Samsung A22', 'Samsung A23', 'Samsung A24', 'Samsung A25',
      'Samsung A32', 'Samsung A33', 'Samsung A34', 'Samsung A35', 'Samsung A51', 'Samsung A52', 'Samsung A53', 'Samsung A54', 'Samsung A55',
      'Samsung A72', 'Samsung A73', 'Samsung S20', 'Samsung S20 FE', 'Samsung S21', 'Samsung S21 FE', 'Samsung S22', 'Samsung S22 Ultra',
      'Samsung S23', 'Samsung S23 FE', 'Samsung S23 Ultra', 'Samsung S24', 'Samsung S24 FE', 'Samsung S24 Ultra',
      'Samsung Z Flip 4', 'Samsung Z Flip 5', 'Samsung Z Fold 4', 'Samsung Z Fold 5',
    ],
    xiaomi: [
      'Redmi 10', 'Redmi 12', 'Redmi 13', 'Redmi Note 8', 'Redmi Note 9', 'Redmi Note 10', 'Redmi Note 10 Pro', 'Redmi Note 11', 'Redmi Note 11 Pro',
      'Redmi Note 12', 'Redmi Note 12 Pro', 'Redmi Note 13', 'Redmi Note 13 Pro', 'Redmi Note 13 Pro Plus',
      'Poco X3', 'Poco X4', 'Poco X5', 'Poco X6', 'Poco F3', 'Poco F4', 'Poco F5', 'Poco F6', 'Poco M4', 'Poco M5', 'Poco M6',
      'Xiaomi 11T', 'Xiaomi 12', 'Xiaomi 12T', 'Xiaomi 13', 'Xiaomi 13T', 'Xiaomi 14', 'Xiaomi 14T',
    ],
    other: [
      'Honor 50', 'Honor 70', 'Honor 90', 'Honor 200', 'Huawei P30', 'Huawei P40', 'Huawei P50', 'Huawei Nova 10',
      'Realme 8', 'Realme 9', 'Realme 10', 'Realme 11', 'Infinix Note 12', 'Infinix Note 30', 'Tecno Camon 20', 'Tecno Pova 5',
      'Google Pixel 7', 'Google Pixel 8', 'Google Pixel 9', 'OnePlus 10', 'OnePlus 11', 'Oppo Reno 8', 'Oppo Reno 10',
    ],
  };

  // ПРАЙС КРЫШЕК iPhone (готовая розница = база + 2000)
  const iphoneBackRetailOverride = {
    'iPhone 16 Pro Max': 8000,
    'iPhone 16 Pro': 8000,
    'iPhone 16 Plus': 7000,
    'iPhone 16': 7000,

    'iPhone 15 Pro Max': 7000,
    'iPhone 15 Pro': 7000,
    'iPhone 15 Plus': 7000,
    'iPhone 15': 7000,

    'iPhone 14 Pro Max': 8000,
    'iPhone 14 Pro': 8000,
    'iPhone 14 Plus': 5500,
    'iPhone 14': 5500,

    'iPhone 13 Pro Max': 7000,
    'iPhone 13 Pro': 7000,
    'iPhone 13': 5500,
    'iPhone 13 mini': 5500,

    'iPhone 12 Pro Max': 5500,
    'iPhone 12 Pro': 5000,
    'iPhone 12': 5000,
    'iPhone 12 mini': 5000,

    'iPhone 11 Pro Max': 5000,
    'iPhone 11 Pro': 5000,
    'iPhone 11': 4500,

    'iPhone XR': 4000,
    'iPhone XS Max': 4000,
    'iPhone XS': 4000,
    'iPhone X': 4000,

    'iPhone 8 Plus': 4000,
    'iPhone 8': 4000,
    'iPhone SE 2020': 4000,
    'iPhone SE 2022': 4000,
  };

  const supplierVariantMap = {
  "iPhone 7": {
    "battery": {
      "good": 920
    },
    "display": {
      "china": 650
    },
    "speaker": {
      "china": 40
    }
  },
  "iPhone 7 Plus": {
    "display": {
      "china": 750
    },
    "speaker": {
      "china": 40
    }
  },
  "iPhone 8": {
    "back": {
      "china": 175
    },
    "battery": {
      "good": 1090
    },
    "display": {
      "china": 700
    },
    "speaker": {
      "china": 40
    }
  },
  "iPhone 8 Plus": {
    "battery": {
      "good": 1220
    },
    "display": {
      "china": 1660
    },
    "speaker": {
      "china": 40
    }
  },
  "iPhone X": {
    "back": {
      "china": 175
    },
    "battery": {
      "china": 850,
      "good": 1300
    },
    "charge": {
      "china": 200
    },
    "display": {
      "china": 250,
      "good": 1100,
      "orig": 1990
    },
    "speaker": {
      "china": 90
    }
  },
  "iPhone XR": {
    "back": {
      "china": 175
    },
    "battery": {
      "china": 850,
      "good": 1300
    },
    "charge": {
      "china": 200
    },
    "display": {
      "china": 250,
      "good": 1100,
      "orig": 1990
    }
  },
  "iPhone XS": {
    "back": {
      "china": 210
    },
    "battery": {
      "china": 1040,
      "good": 1580
    },
    "display": {
      "china": 945,
      "good": 1300,
      "orig": 4500
    }
  },
  "iPhone XS Max": {
    "battery": {
      "china": 1000,
      "good": 1530
    },
    "display": {
      "china": 250,
      "good": 1500,
      "orig": 5500
    }
  },
  "iPhone 11": {
    "back": {
      "china": 195,
      "orig": 335
    },
    "battery": {
      "china": 840,
      "good": 1300
    },
    "charge": {
      "china": 340
    },
    "display": {
      "china": 1100,
      "good": 1100,
      "orig": 2450
    },
    "speaker": {
      "orig": 240
    }
  },
  "iPhone 11 Pro": {
    "back": {
      "china": 285,
      "orig": 505
    },
    "battery": {
      "china": 1120,
      "good": 1180
    },
    "charge": {
      "china": 480
    },
    "display": {
      "china": 1200,
      "good": 1900,
      "orig": 6450
    }
  },
  "iPhone 11 Pro Max": {
    "back": {
      "china": 285,
      "orig": 505
    },
    "battery": {
      "china": 1180,
      "good": 1200,
      "orig": 950
    },
    "charge": {
      "china": 480
    },
    "display": {
      "china": 1400,
      "good": 2200,
      "orig": 7400
    }
  },
  "iPhone SE 2020": {
    "display": {
      "china": 600
    }
  },
  "iPhone 12 mini": {
    "back": {
      "china": 210,
      "orig": 435
    },
    "battery": {
      "china": 950,
      "good": 1190,
      "orig": 2880
    },
    "display": {
      "china": 1400,
      "good": 1800,
      "orig": 4200
    }
  },
  "iPhone 12": {
    "back": {
      "china": 175,
      "orig": 260
    },
    "battery": {
      "china": 890,
      "good": 1320,
      "orig": 2880
    },
    "display": {
      "china": 1270,
      "good": 1900,
      "orig": 4500
    },
    "speaker": {
      "orig": 210
    }
  },
  "iPhone 12 Pro": {
    "back": {
      "china": 240,
      "orig": 435
    },
    "battery": {
      "china": 890,
      "good": 1320,
      "orig": 2880
    },
    "display": {
      "china": 1500,
      "good": 2300,
      "orig": 6000
    }
  },
  "iPhone 12 Pro Max": {
    "back": {
      "china": 250,
      "orig": 450
    },
    "battery": {
      "china": 910,
      "good": 1350,
      "orig": 3680
    },
    "display": {
      "china": 1700,
      "good": 2700,
      "orig": 8200
    }
  },
  "iPhone 13 mini": {
    "battery": {
      "china": 900,
      "good": 1450,
      "orig": 3060
    },
    "display": {
      "china": 2300,
      "good": 2800,
      "orig": 5500
    }
  },
  "iPhone 13": {
    "back": {
      "china": 210,
      "orig": 415
    },
    "battery": {
      "china": 900,
      "good": 1450,
      "orig": 3340
    },
    "display": {
      "china": 1300,
      "good": 1900,
      "orig": 6500
    }
  },
  "iPhone 13 Pro": {
    "back": {
      "china": 310,
      "orig": 640
    },
    "battery": {
      "china": 1190,
      "good": 1630,
      "orig": 3750
    },
    "charge": {
      "orig": 1000
    },
    "display": {
      "china": 1700,
      "good": 2400,
      "orig": 8000
    },
    "speaker": {
      "orig": 290
    }
  },
  "iPhone 13 Pro Max": {
    "back": {
      "china": 300,
      "orig": 640
    },
    "battery": {
      "china": 800,
      "good": 1540,
      "orig": 3910
    },
    "charge": {
      "orig": 950
    },
    "display": {
      "china": 1800,
      "good": 2450,
      "orig": 10800
    }
  },
  "iPhone SE 2022": {
    "display": {
      "china": 700
    }
  },
  "iPhone 14": {
    "back": {
      "china": 310,
      "orig": 860
    },
    "battery": {
      "china": 1050,
      "good": 1420,
      "orig": 3540
    },
    "display": {
      "china": 1450,
      "good": 2400,
      "orig": 8200
    }
  },
  "iPhone 14 Plus": {
    "back": {
      "china": 700,
      "orig": 1430
    },
    "battery": {
      "china": 1200,
      "good": 1540,
      "orig": 3740
    },
    "display": {
      "good": 2600,
      "orig": 9000
    }
  },
  "iPhone 14 Pro": {
    "back": {
      "china": 860,
      "orig": 1430
    },
    "battery": {
      "china": 1100,
      "good": 1440,
      "orig": 3640
    },
    "display": {
      "china": 1900,
      "good": 2800,
      "orig": 14800
    }
  },
  "iPhone 14 Pro Max": {
    "back": {
      "china": 980,
      "orig": 1430
    },
    "battery": {
      "china": 1130,
      "good": 1590,
      "orig": 4310
    },
    "display": {
      "china": 2100,
      "good": 3000,
      "orig": 15800
    }
  },
  "iPhone 15": {
    "back": {
      "china": 980,
      "orig": 1360
    },
    "battery": {
      "china": 1000,
      "good": 1250,
      "orig": 3300
    },
    "camera": {
      "china": 420
    },
    "display": {
      "china": 1500,
      "good": 2550,
      "orig": 9800
    },
    "speaker": {
      "china": 190
    }
  },
  "iPhone 15 Plus": {
    "back": {
      "china": 1360
    },
    "battery": {
      "china": 1030,
      "good": 1250,
      "orig": 3480
    },
    "camera": {
      "china": 420
    },
    "display": {
      "china": 1850,
      "good": 3100,
      "orig": 13000
    },
    "speaker": {
      "china": 190
    }
  },
  "iPhone 15 Pro": {
    "back": {
      "china": 1360
    },
    "battery": {
      "china": 1010,
      "good": 1250,
      "orig": 3940
    },
    "camera": {
      "china": 420
    },
    "charge": {
      "orig": 1440
    },
    "display": {
      "china": 1900,
      "good": 3550,
      "orig": 15500
    },
    "speaker": {
      "china": 190
    }
  },
  "iPhone 15 Pro Max": {
    "back": {
      "china": 1360
    },
    "battery": {
      "china": 1050,
      "good": 1250,
      "orig": 4140
    },
    "camera": {
      "china": 420
    },
    "charge": {
      "orig": 1500
    },
    "display": {
      "china": 1900,
      "good": 3550,
      "orig": 19300
    },
    "speaker": {
      "china": 190
    }
  },
  "iPhone 16": {
    "back": {
      "china": 1050
    },
    "battery": {
      "good": 1750
    },
    "camera": {
      "china": 140
    },
    "charge": {
      "orig": 1300
    },
    "display": {
      "china": 2800,
      "orig": 17500
    }
  },
  "iPhone 16 Plus": {
    "back": {
      "china": 1120
    },
    "battery": {
      "good": 1750
    },
    "camera": {
      "china": 140
    },
    "charge": {
      "orig": 1300
    },
    "display": {
      "china": 3200,
      "orig": 18500
    }
  },
  "iPhone 16 Pro": {
    "back": {
      "china": 1450
    },
    "battery": {
      "good": 2200
    },
    "camera": {
      "china": 190
    },
    "charge": {
      "orig": 1200
    },
    "display": {
      "china": 4800,
      "good": 7900
    }
  },
  "iPhone 16 Pro Max": {
    "back": {
      "china": 1460
    },
    "battery": {
      "good": 2200
    },
    "camera": {
      "china": 190
    },
    "charge": {
      "orig": 1300
    },
    "display": {
      "china": 5800
    }
  },
  "Samsung A12": {
    "battery": { "china": 650, "good": 950 },
    "display": { "china": 1200, "good": 1800 },
    "charge": { "china": 500 },
    "camera": { "china": 200 }
  },
  "Samsung A21": {
    "battery": { "china": 700, "good": 1000 },
    "display": { "china": 1300, "good": 2000 },
    "charge": { "china": 500 }
  },
  "Samsung A31": {
    "battery": { "china": 750, "good": 1100 },
    "display": { "china": 1800, "good": 2600 },
    "charge": { "china": 600 }
  },
  "Samsung A51": {
    "battery": { "china": 800, "good": 1200 },
    "display": { "china": 2000, "good": 3000 },
    "charge": { "china": 600 }
  },
  "Samsung A71": {
    "battery": { "china": 900, "good": 1300 },
    "display": { "china": 2200, "good": 3200 },
    "charge": { "china": 650 }
  },
  "Samsung A72": {
    "battery": { "china": 950, "good": 1400 },
    "display": { "china": 2500, "good": 3500 },
    "charge": { "china": 700 }
  },
  "Samsung S20": {
    "battery": { "good": 1500 },
    "display": { "china": 3500, "good": 5500 },
    "charge": { "china": 900 }
  },
  "Samsung S21": {
    "battery": { "good": 1600 },
    "display": { "china": 3800, "good": 6000 },
    "charge": { "china": 950 }
  },
  "Samsung S22": {
    "battery": { "good": 1800 },
    "display": { "china": 4200, "good": 6500 },
    "charge": { "china": 1000 }
  },
  "Samsung S23": {
    "battery": { "good": 2000 },
    "display": { "china": 4800, "good": 7200 },
    "charge": { "china": 1100 }
  },

  "Redmi Note 8": {
    "battery": { "china": 500, "good": 800 },
    "display": { "china": 900, "good": 1500 },
    "charge": { "china": 400 }
  },
  "Redmi Note 9": {
    "battery": { "china": 550, "good": 850 },
    "display": { "china": 1000, "good": 1600 },
    "charge": { "china": 450 }
  },
  "Redmi Note 10": {
    "battery": { "china": 600, "good": 900 },
    "display": { "china": 1200, "good": 1800 },
    "charge": { "china": 500 }
  },
  "Redmi Note 11": {
    "battery": { "china": 650, "good": 1000 },
    "display": { "china": 1300, "good": 2000 },
    "charge": { "china": 550 }
  },
  "Redmi Note 12": {
    "battery": { "china": 700, "good": 1100 },
    "display": { "china": 1500, "good": 2200 },
    "charge": { "china": 600 }
  },
  "Redmi Note 13": {
    "battery": { "china": 750, "good": 1200 },
    "display": { "china": 1700, "good": 2500 },
    "charge": { "china": 650 }
  },

  "Poco X3": {
    "battery": { "china": 700, "good": 1100 },
    "display": { "china": 1300, "good": 2000 },
    "charge": { "china": 500 }
  },
  "Poco X4": {
    "battery": { "china": 750, "good": 1200 },
    "display": { "china": 1500, "good": 2300 },
    "charge": { "china": 550 }
  },
  "Poco X5": {
    "battery": { "china": 800, "good": 1300 },
    "display": { "china": 1700, "good": 2600 },
    "charge": { "china": 600 }
  },

  "Samsung A12": {
    "display": {
      "china": 990,
      "orig": 1650
    }
  },
  "Samsung A13": {
    "display": {
      "china": 1090,
      "orig": 1750
    }
  },
  "Samsung A14": {
    "display": {
      "china": 1250,
      "orig": 1800
    }
  },
  "Samsung A15": {
    "battery": {
      "china": 560
    },
    "display": {
      "china": 1250,
      "good": 2350,
      "orig": 4650
    }
  },
  "Samsung A22": {
    "display": {
      "china": 1090,
      "good": 1690,
      "orig": 2650
    }
  },
  "Samsung A23": {
    "display": {
      "china": 1090,
      "orig": 2990
    }
  },
  "Samsung A24": {
    "battery": {
      "china": 560
    },
    "display": {
      "china": 1390,
      "good": 2390,
      "orig": 4550
    }
  },
  "Samsung A25": {
    "battery": {
      "china": 560
    },
    "display": {
      "china": 1450,
      "good": 2450,
      "orig": 4590
    }
  },
  "Samsung A32": {
    "display": {
      "china": 1290,
      "good": 2250,
      "orig": 3390
    }
  },
  "Samsung A33": {
    "display": {
      "china": 1390,
      "good": 2450,
      "orig": 4290
    }
  },
  "Samsung A34": {
    "battery": {
      "china": 560
    },
    "display": {
      "china": 1390,
      "good": 2450,
      "orig": 4490
    }
  },
  "Samsung A35": {
    "battery": {
      "china": 560
    },
    "display": {
      "china": 1450,
      "good": 2550,
      "orig": 4650
    }
  },
  "Samsung A51": {
    "battery": {
      "china": 390
    },
    "display": {
      "china": 1050,
      "good": 1590,
      "orig": 2790
    }
  },
  "Samsung A52": {
    "display": {
      "china": 1150,
      "good": 1690,
      "orig": 2990
    }
  },
  "Samsung A53": {
    "display": {
      "china": 1290,
      "good": 2390,
      "orig": 4290
    }
  },
  "Samsung A54": {
    "back": {
      "china": 150
    },
    "battery": {
      "china": 560
    },
    "charge": {
      "china": 460
    },
    "display": {
      "china": 1390,
      "good": 2450,
      "orig": 5490
    }
  },
  "Samsung A55": {
    "battery": {
      "china": 560
    },
    "display": {
      "china": 1650,
      "good": 2890,
      "orig": 5590
    }
  },
  "Samsung A72": {
    "display": {
      "china": 1190,
      "good": 1690,
      "orig": 2990
    }
  },
  "Samsung A73": {
    "display": {
      "good": 2890,
      "orig": 5190
    }
  },
  "Samsung S20": {
    "display": {
      "good": 3490,
      "orig": 6990
    }
  },
  "Samsung S20 FE": {
    "display": {
      "good": 2850,
      "orig": 5190
    }
  },
  "Samsung S21": {
    "battery": {
      "china": 780
    },
    "display": {
      "good": 3550,
      "orig": 5790
    }
  },
  "Samsung S21 FE": {
    "display": {
      "good": 3390,
      "orig": 6290
    }
  },
  "Samsung S22": {
    "display": {
      "good": 4190,
      "orig": 7690
    }
  },
  "Samsung S22 Ultra": {
    "display": {
      "good": 4850,
      "orig": 9890
    }
  },
  "Samsung S23": {
    "display": {
      "orig": 10900
    }
  },
  "Samsung S23 FE": {
    "display": {
      "orig": 6890
    }
  },
  "Samsung S23 Ultra": {
    "back": {
      "china": 600
    },
    "display": {
      "orig": 13790
    }
  },
  "Samsung S24": {
    "display": {
      "orig": 9590
    }
  },
  "Samsung S24 FE": {
    "display": {
      "orig": 7390
    }
  },
  "Redmi 10": {
    "display": {
      "china": 690
    }
  },
  "Redmi 12": {
    "display": {
      "china": 850
    }
  },
  "Redmi 13": {
    "display": {
      "china": 890
    }
  },
  "Redmi Note 8": {
    "display": {
      "china": 650
    }
  },
  "Redmi Note 9": {
    "display": {
      "china": 690
    }
  },
  "Redmi Note 10": {
    "battery": {
      "china": 430
    },
    "display": {
      "china": 990,
      "good": 1490,
      "orig": 2290
    }
  },
  "Redmi Note 10 Pro": {
    "display": {
      "good": 1790,
      "orig": 2590
    }
  },
  "Redmi Note 11": {
    "display": {
      "good": 1690,
      "orig": 2450
    }
  },
  "Redmi Note 11 Pro": {
    "display": {
      "good": 1890,
      "orig": 2790
    }
  },
  "Redmi Note 12": {
    "battery": {
      "china": 470
    },
    "display": {
      "good": 1990,
      "orig": 2890
    }
  },
  "Redmi Note 12 Pro": {
    "display": {
      "good": 2290,
      "orig": 3190
    }
  },
  "Redmi Note 13": {
    "display": {
      "good": 2290,
      "orig": 4550
    }
  },
  "Redmi Note 13 Pro": {
    "camera": {
      "china": 40
    },
    "display": {
      "china": 1290,
      "good": 2450,
      "orig": 3450
    }
  },
  "Redmi Note 13 Pro Plus": {
    "display": {
      "orig": 2850
    }
  },
  "Poco X3": {
    "display": {
      "china": 750
    }
  },
  "Poco X4": {
    "display": {
      "good": 1650,
      "orig": 2390
    }
  },
  "Poco X5": {
    "display": {
      "good": 1990,
      "orig": 2890
    }
  },
  "Poco X6": {
    "display": {
      "china": 1290,
      "good": 2390,
      "orig": 2750
    }
  },
  "Poco F3": {
    "display": {
      "good": 1850,
      "orig": 2590
    }
  },
  "Poco F4": {
    "display": {
      "good": 2290,
      "orig": 3150
    }
  },
  "Poco F5": {
    "back": {
      "china": 200
    },
    "display": {
      "china": 1200,
      "orig": 4850
    }
  },
  "Poco F6": {
    "display": {
      "orig": 3650
    }
  },
  "Poco M4": {
    "display": {
      "china": 690
    }
  },
  "Poco M5": {
    "display": {
      "china": 790
    }
  },
  "Poco M6": {
    "display": {
      "good": 2450,
      "orig": 2650
    }
  },
  "Xiaomi 11T": {
    "display": {
      "good": 2490,
      "orig": 3350
    }
  },
  "Xiaomi 12": {
    "display": {
      "orig": 3990
    }
  },
  "Xiaomi 12T": {
    "display": {
      "orig": 3650
    }
  },
  "Xiaomi 13": {
    "charge": {
      "china": 40
    }
  },
  "Xiaomi 13T": {
    "charge": {
      "china": 40
    }
  },
  "Honor 50": {
    "display": {
      "good": 1950,
      "orig": 2950
    }
  },
  "Honor 70": {
    "display": {
      "good": 2350,
      "orig": 3290
    }
  },
  "Honor 90": {
    "display": {
      "good": 2550,
      "orig": 3450
    }
  },
  "Huawei P30": {
    "display": {
      "good": 1650,
      "orig": 2550
    }
  },
  "Huawei P40": {
    "display": {
      "good": 2290,
      "orig": 3190
    }
  },
  "Huawei P50": {
    "display": {
      "orig": 4950
    }
  },
  "Realme 8": {
    "display": {
      "good": 1390,
      "orig": 2250
    }
  },
  "Realme 9": {
    "display": {
      "good": 1490,
      "orig": 2390
    }
  },
  "Realme 10": {
    "display": {
      "good": 1590,
      "orig": 2450
    }
  },
  "Infinix Note 12": {
    "display": {
      "good": 1390,
      "orig": 2250
    }
  },
  "Infinix Note 30": {
    "display": {
      "good": 1590,
      "orig": 2450
    }
  },
  "Tecno Camon 20": {
    "display": {
      "good": 1590,
      "orig": 2350
    }
  }
};

  const estimateSupplierPrice = (model, repairKey, partType) => {
    // для крышек закупка не нужна, ниже используем готовую розницу
    if (repairKey === 'back' && model.startsWith('iPhone')) {
      return 0;
    }
    const exact = supplierVariantMap[model]?.[repairKey];
    if (exact) {
      if (typeof exact[partType] === 'number') return exact[partType];
      const variants = Object.values(exact).filter((v) => typeof v === 'number');
      if (variants.length > 0) {
        const min = Math.min(...variants);
        const max = Math.max(...variants);
        if (partType === 'china') return Math.round(exact.china ?? min);
        if (partType === 'good') return Math.round(exact.good ?? (exact.china ? exact.china * 1.25 : (min + max) / 2));
        if (partType === 'orig') return Math.round(exact.orig ?? (exact.good ? exact.good * 1.45 : max * 1.35));
      }
    }

    const premium = model.includes('Pro Max') || model.includes('Ultra') || model.includes('Fold');
    const mid = model.includes('11') || model.includes('12') || model.includes('13') || model.includes('A5') || model.includes('S21') || model.includes('S22');
    const baseMatrix = {
      display: premium ? 12000 : mid ? 6000 : 3000,
      battery: premium ? 4000 : mid ? 2200 : 1200,
      back: premium ? 5000 : mid ? 3000 : 1500,
      charge: premium ? 3500 : mid ? 2000 : 1000,
      camera: premium ? 4500 : mid ? 2500 : 1500,
      speaker: premium ? 1600 : mid ? 1100 : 700,
    };
    const base = baseMatrix[repairKey] || 2000;
    return Math.round(base * partMultiplier[partType]);
  };

  const marginByCost = (supplierCost, partType) => {
    // 🔥 Гибкая маржа для дешёвых деталей (≤ 750 ₽): 1800–2400
    if (supplierCost <= 750) {
      let margin = 1800 + Math.round((supplierCost / 750) * 600); // от 1800 до 2400
      if (partType === 'good') margin += 200;
      if (partType === 'orig') margin += 400;
      return margin;
    }

    let baseMargin = 3600;
    if (supplierCost >= 2000) baseMargin = 4200;
    if (supplierCost >= 4000) baseMargin = 5000;
    if (supplierCost >= 7000) baseMargin = 6200;
    if (supplierCost >= 11000) baseMargin = 7600;

    if (partType === 'good') baseMargin += 500;
    if (partType === 'orig') baseMargin += 1200;

    return Math.min(baseMargin, 7600);
  };

  const partMultiplier = {
    china: 1,
    good: 1.22,
    orig: 1.55,
  };

  const partLabels = {
    china: 'Китай',
    good: 'Хороший аналог',
    orig: 'Оригинал',
  };

  const quickUpsellCatalog = {
    display: [
      { label: 'Защитное стекло', price: 1000 },
      { label: 'Бронеплёнка', price: 1500 },
      { label: 'Чистка динамиков', price: 500 },
    ],
    battery: [
      { label: 'Чистка разъёма', price: 500 },
      { label: 'Проверка зарядки', price: 500 },
      { label: 'Настройка устройства', price: 700 },
    ],
    back: [
      { label: 'Стекло камеры 1 шт.', price: 1000 },
      { label: 'Стекло камеры 2 шт.', price: 2000 },
      { label: 'Чистка корпуса', price: 500 },
    ],
    charge: [
      { label: 'Чистка динамиков', price: 500 },
      { label: 'Проверка кабеля', price: 300 },
      { label: 'Профилактика разъёма', price: 700 },
    ],
    camera: [
      { label: 'Стекло камеры', price: 1000 },
      { label: 'Чистка модуля', price: 500 },
      { label: 'Проверка фокуса', price: 500 },
    ],
    speaker: [
      { label: 'Чистка сеток', price: 500 },
      { label: 'Проверка звука', price: 500 },
      { label: 'Чистка разъёма', price: 500 },
    ],
  };

  const repairCatalog = [
    { key: 'display', title: 'Замена дисплея', icon: '📱', upsell: ['Стекло', 'Плёнка', 'Чистка динамиков'] },
    { key: 'battery', title: 'Замена аккумулятора', icon: '🔋', upsell: ['Чистка разъёма', 'Проверка зарядки', 'Настройка'] },
    { key: 'back', title: 'Замена задней крышки', icon: '🪞', upsell: ['Стекло камеры', 'Плёнка', 'Чистка корпуса'] },
    { key: 'charge', title: 'Замена нижнего разъёма', icon: '🔌', upsell: ['Чистка динамиков', 'Проверка кабеля', 'Профилактика'] },
    { key: 'camera', title: 'Замена камеры', icon: '📷', upsell: ['Стекло камеры', 'Чистка', 'Проверка фокуса'] },
    { key: 'speaker', title: 'Замена динамика / микрофона', icon: '🔊', upsell: ['Чистка сеток', 'Проверка звука', 'Чистка разъёма'] },
  ];

  const diagnosticsScripts = {
    tv: {
      title: 'Телевизоры',
      intro: 'Задача приёмщика — не диагностировать телевизор, а объяснить клиенту, почему разумно оставить технику на проверку.',
      scripts: [
        'По телевизорам одинаковый симптом может быть вызван разными узлами, поэтому правильно сначала провести диагностику и только потом называть точную стоимость.',
        'Чтобы не назвать неверную цену с потолка, лучше принять телевизор на проверку и уже после неё дать вам нормальный ответ.',
        'Сейчас важно не гадать — это может быть как относительно простой ремонт, так и более сложная история. Диагностика сразу покажет реальную картину.',
        'Оставьте телевизор на диагностику, и мы уже предметно скажем, есть ли смысл в ремонте, сколько это займёт и во сколько обойдётся.',
      ],
      phrases: ['Есть звук, нет изображения', 'Не включается', 'Полосы / пятна', 'Уходит в перезагрузку'],
    },
    pc: {
      title: 'ПК / Ноутбуки',
      intro: 'Здесь приёмщик продаёт не ремонт, а понятность и безопасность: без диагностики по ноутбукам и ПК легко ошибиться.',
      scripts: [
        'По ноутбукам и ПК один и тот же симптом может быть как простой неисправностью, так и платным серьёзным ремонтом. Чтобы не вводить вас в заблуждение, сначала проверим технику.',
        'Если назвать цену без диагностики, можно или завысить, или наоборот не учесть важную проблему. Правильно — сначала принять устройство на проверку.',
        'Оставьте устройство на диагностику, и уже после проверки мы скажем, можно ли ограничиться обслуживанием или нужен полноценный ремонт.',
        'Если внутри есть риск по плате, перегреву или накопителю, без диагностики это не увидеть. Поэтому лучше сразу сделать всё правильно.',
      ],
      phrases: ['Не включается', 'Тормозит', 'Греется', 'Нет изображения', 'Синий экран'],
    },
    coffee: {
      title: 'Кофемашины',
      intro: 'По кофемашинам почти всегда надо продавать идею комплексной проверки, а не “примерной цены”.',
      scripts: [
        'У кофемашин одна проблема часто тянет за собой другие, поэтому без проверки назвать точную стоимость будет нечестно.',
        'Если сейчас просто гадать по цене, можно не учесть износ других узлов. Лучше принять машину на диагностику и уже после неё всё согласовать.',
        'Оставьте кофемашину на проверку: мы посмотрим не только текущий симптом, но и общее состояние основных рабочих узлов.',
        'Так вы получите не абстрактную цену, а понятный список работ — что действительно нужно делать и что можно пока не трогать.',
      ],
      phrases: ['Не льёт', 'Течёт', 'Не мелет', 'Не делает пену', 'Ошибка нагрева'],
    },
    printers: {
      title: 'Принтеры',
      intro: 'По принтерам приёмщик не должен спорить с клиентом о картриджах. Его задача — перевести разговор в диагностику.',
      scripts: [
        'По принтерам одинаковая проблема может быть как по расходникам, так и по механике или плате, поэтому лучше сначала проверить устройство.',
        'Чтобы не покупать лишние расходники и не гадать, разумнее оставить принтер на диагностику и уже после этого принимать решение.',
        'После проверки мы сможем точно сказать: вопрос решается обслуживанием или уже нужен полноценный ремонт.',
        'Если принять устройство сейчас на диагностику, вы получите понятный ответ по сроку, цене и целесообразности ремонта.',
      ],
      phrases: ['Не печатает', 'Полосит', 'Не захватывает бумагу', 'Ошибка', 'Не видит картридж'],
    },
  };

  const psychologyBlocks = [
    {
      title: 'Уверенность вместо оправданий',
      text: 'Приёмщик должен говорить спокойно и уверенно. Не “наверное”, не “может быть”, а “по таким случаям мы сначала проверяем и потом даём точный ответ”.',
    },
    {
      title: 'Продавай безопасность решения',
      text: 'Клиент боится не цены, а неизвестности. Нужно продавать не ремонт, а понятность: сначала диагностика, потом решение без сюрпризов.',
    },
    {
      title: 'Якорь на удобство',
      text: 'Формулировка “оставьте устройство, и мы сами разберёмся и всё объясним” психологически снимает нагрузку с клиента.',
    },
    {
      title: 'Мягкая срочность',
      text: 'Не дави. Говори: “лучше закрыть вопрос сейчас, пока проблема не потянула за собой другие расходы”.',
    },
    {
      title: 'Выбор без отказа',
      text: 'При модульке предлагай 3 варианта: Китай, хороший аналог, оригинал. Когда есть выбор, клиент чаще принимает решение на месте.',
    },
    {
      title: 'Допродажа через заботу',
      text: 'Не “купи стекло”, а “раз уж меняем дисплей, лучше сразу защитить новый экран, чтобы снова не вкладываться”.',
    },
  ];

  const objectionScripts = [
    {
      objection: 'Дорого',
      answer: 'Понимаю. Здесь важно, чтобы вы заплатили не просто за деталь, а за нормальное решение вопроса с гарантией и без повторного обращения через неделю.',
    },
    {
      objection: 'Я подумаю',
      answer: 'Хорошо. Тогда давайте хотя бы примем устройство на диагностику, чтобы вы думали уже на основании точной информации, а не предположений.',
    },
    {
      objection: 'В другом месте дешевле',
      answer: 'Такое возможно. Важно только понимать, одинаковый ли там объём работ и какое качество запчасти предлагают. У нас вы сразу видите варианты и понимаете, за что платите.',
    },
    {
      objection: 'Мне только цену узнать',
      answer: 'По модульному ремонту с понятной проблемой цену скажем сразу. Если симптом сложнее, лучше сначала проверить, чтобы не назвать вам неверную сумму.',
    },
    {
      objection: 'Не хочу оставлять устройство',
      answer: 'Понимаю. Но без проверки мы будем только гадать. Если оставить на диагностику, вы уже после неё сами решите, делать ремонт или нет.',
    },
  ];

  const managerChecklist = [
    'Назвал клиенту понятную причину, почему нужна диагностика или почему модульку можно сделать на месте.',
    'Дал выбор по запчастям: Китай / хороший аналог / оригинал.',
    'Собрал минимум одну допродажу к модульному ремонту.',
    'Не спорил и не ставил диагноз с потолка.',
    'Использовал уверенные формулировки без “наверное” и “может быть”.',
    'Если техника сложная — перевёл разговор в диагностику и не отпускал клиента с пустыми руками.',
  ];

  const filteredModels = useMemo(() => {
    return models[brandTab].filter((model) => model.toLowerCase().includes(search.toLowerCase()));
  }, [brandTab, search]);

  const buildRetailPrice = (model, repairKey, partType) => {
    const supplierCost = estimateSupplierPrice(model, repairKey, partType);

    if (repairKey === 'back' && model.startsWith('iPhone') && typeof iphoneBackRetailOverride[model] === 'number') {
      const retail = psychologicalRound(iphoneBackRetailOverride[model]);
      const fakeSupplier = Math.max(0, retail - 2000);
      return {
        supplierCost: fakeSupplier,
        retailPrice: retail,
        margin: retail - fakeSupplier,
        note: 'Фикс прайс по крышке (прайс + 2000 ₽)',
      };
    }

    let retailPrice = supplierCost + marginByCost(supplierCost, partType);

    if (repairKey === 'charge') {
      retailPrice = Math.max(retailPrice, 2500);
    }

    if (repairKey === 'battery') {
      retailPrice = Math.max(0, retailPrice - 1100);
    }

    retailPrice = psychologicalRound(retailPrice);

    return {
      supplierCost,
      retailPrice,
      margin: retailPrice - supplierCost,
      note: repairKey === 'battery'
        ? 'Стандартная маржа по дороговизне детали · АКБ снижена на 1100 ₽'
        : repairKey === 'charge'
          ? 'Нижний разъём: от 2500 ₽, дальше по факту смотрим дорожки, питание и сопутствующие повреждения'
          : 'Стандартная маржа по дороговизне детали',
    };
  };

  const addToCart = (repairTitle, partType, supplierCost, retailPrice) => {
    setCart((prev) => [
      ...prev,
      {
        model: selectedModel,
        repairKey: selectedRepair?.key || null,
        label: `${repairTitle} — ${partLabels[partType]}`,
        supplierCost,
        retailPrice,
      },
    ]);
  };

  const getEffectiveRetailPrice = (item, items) => {
    if (item.repairKey !== 'battery') return item.retailPrice;

    const hasDisplayForSameModel = items.some(
      (other) => other.model === item.model && other.repairKey === 'display'
    );

    if (!hasDisplayForSameModel) return item.retailPrice;

    return Math.max(0, item.retailPrice - 1500);
  };

  const addQuickUpsell = (label, price) => {
    setCart((prev) => [
      ...prev,
      {
        model: selectedModel,
        repairKey: 'upsell',
        label,
        supplierCost: 0,
        retailPrice: psychologicalRound(price),
      },
    ]);
  };

  const getProfitTone = (margin) => {
    if (margin >= 6000) return { label: 'Высокая маржа', className: 'text-emerald-300 border-emerald-700 bg-emerald-950/30' };
    if (margin >= 4500) return { label: 'Средняя маржа', className: 'text-amber-300 border-amber-700 bg-amber-950/30' };
    return { label: 'Базовая маржа', className: 'text-rose-300 border-rose-700 bg-rose-950/30' };
  };

  const getRecommendedPartType = (repairKey) => {
    if (repairKey === 'back') return 'china';
    if (budgetMode === 'econom') return 'china';
    if (budgetMode === 'premium') return 'orig';
    return 'good';
  };

  const totalRetail = cart.reduce((sum, item) => sum + getEffectiveRetailPrice(item, cart), 0);
  const totalItems = cart.length;
  const totalSupplier = cart.reduce((sum, item) => sum + item.supplierCost, 0);
  const totalMargin = totalRetail - totalSupplier;

  const Button = ({ active, children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${active ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'} ${className}`}
    >
      {children}
    </button>
  );

  const Card = ({ children, className = '' }) => (
    <div className={`rounded-3xl border border-slate-800 bg-slate-900/90 p-5 ${className}`}>{children}</div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* 💰 ПАНЕЛЬ ДНЯ */}
      <div className="bg-black border-b border-slate-800 p-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6">
          <div>
            <div className="text-xs text-slate-400">План</div>
            <input
              value={dailyTarget}
              onChange={(e) => setDailyTarget(Number(e.target.value) || 0)}
              className="w-24 rounded bg-slate-800 px-3 py-1 text-white"
            />
          </div>
          <div>
            <div className="text-xs text-slate-400">Сделано</div>
            <div className="font-bold text-green-400">{currentRevenue} ₽</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Осталось</div>
            <div className="font-bold text-red-400">{Math.max(0, dailyTarget - currentRevenue)} ₽</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Статус</div>
            <div className="font-bold text-cyan-400">{getKPI(currentRevenue, dailyTarget)}</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-cyan-900/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6">
          <div className="inline-flex rounded-full border border-cyan-800/50 bg-cyan-950/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            Внутренний портал партнёров и приёмщиков
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            CRM-портал продаж, согласования и удержания клиента
          </h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-base">
            Здесь приёмщик не просто ищет цену. Он получает понятный интерфейс, выбор по запчастям, автоматическую логику наценки, скрипты удержания клиента на диагностике, психологию продаж и чек-лист, как стать сильным менеджером по согласованию прямо на точке.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {kpiStats.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500">{item.title}</div>
                <div className="mt-2 text-sm font-bold text-cyan-300">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {topTabs.map((tab) => (
            <Button key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <h2 className="text-2xl font-bold">Что должен уметь сильный приёмщик</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {[
                  ['Согласовать модульку на месте', 'Дать 3 варианта запчастей и быстро собрать чек.'],
                  ['Не потерять сложную технику', 'Телевизоры, ПК, кофе и принтеры переводить в диагностику через правильный скрипт.'],
                  ['Продать допы', 'Не отпускать модульный ремонт без стекла, плёнки, чистки или сопутствующей услуги.'],
                  ['Держать инициативу', 'Говорить уверенно, спокойно и без лишней технической каши.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-slate-800/80 p-4">
                    <div className="font-bold text-cyan-300">{title}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-300">{text}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold">Быстрые опоры по психологии</h2>
              <div className="mt-5 space-y-3">
                {psychologyBlocks.slice(0, 4).map((item) => (
                  <div key={item.title} className="rounded-2xl bg-slate-800/80 p-4">
                    <div className="font-bold">{item.title}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-300">{item.text}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'phones' && (
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <Card>
                <h2 className="text-2xl font-bold">Телефоны, модели и цены</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Выбирай бренд, находи модель, нажимай на неё и внутри сразу получай работы, 3 типа запчастей и итоговую цену с наценкой. Логика наценки: от 3600 до 7600 ₽ в зависимости от стоимости детали, а на дорогих вариантах — выше в рамках лимита.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {brandTabs.map((brand) => (
                    <Button
                      key={brand.id}
                      active={brandTab === brand.id}
                      onClick={() => {
                        setBrandTab(brand.id);
                        setSelectedModel(null);
                        setSelectedRepair(null);
                        setSearch('');
                      }}
                    >
                      {brand.label}
                    </Button>
                  ))}
                </div>

                <ModelSearchInput initialValue={search} onSearch={setSearch} onClear={() => setSearch('')} />

                {!selectedModel && (
                  <div className="mt-4">
                    <div className="mb-3 text-xs text-slate-500">Найдено моделей: {filteredModels.length}</div>
                    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                      {filteredModels.map((model) => (
                        <button
                          key={model}
                          onClick={() => {
                            setSelectedModel(model);
                            setSelectedRepair(null);
                            setCart([]);
                          }}
                          className="rounded-2xl border border-slate-800 bg-slate-800/80 p-4 text-left transition hover:border-cyan-600 hover:bg-slate-700"
                        >
                          <div className="font-semibold">{model}</div>
                          <div className="mt-2 text-xs text-slate-400">Нажми, чтобы открыть карточку модели и выбрать ремонт</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedModel && (
                  <div className="mt-5">
                    <button
                      onClick={() => {
                        setSelectedModel(null);
                        setSelectedRepair(null);
                        setCart([]);
                      }}
                      className="mb-4 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      ← Назад к списку моделей
                    </button>

                    <div className="rounded-3xl border border-cyan-900/40 bg-slate-800/70 p-5">
                      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Выбрана модель</div>
                          <h3 className="mt-2 text-2xl font-bold">{selectedModel}</h3>
                        </div>
                        <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-300">
                          Приёмщик продаёт: выбор, понятность и уверенность
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {repairCatalog.map((repair) => (
                          <button
                            key={repair.key}
                            onClick={() => setSelectedRepair(repair)}
                            className={`rounded-2xl border p-4 text-left transition ${selectedRepair?.key === repair.key ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800 bg-slate-900 hover:border-cyan-700'}`}
                          >
                            <div className="text-xl">{repair.icon}</div>
                            <div className="mt-2 font-bold">{repair.title}</div>
                            <div className="mt-2 text-xs text-slate-400">Нажми, чтобы увидеть цены по типам запчастей</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedRepair && (
                      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                        <Card>
                          <h4 className="text-xl font-bold">{selectedRepair.title}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            Ниже 3 варианта: Китай, хороший аналог и оригинал. Розничная цена считается от закупки плюс моржа в диапазоне 3600–7600 ₽ по логике дороговизны детали. Если в чеке у этой же модели уже есть дисплей, на АКБ автоматически действует скидка 1500 ₽.
                          </p>

                          <div className="mt-5 grid gap-3">
                            {(['china', 'good', 'orig']).map((partType) => {
                              const pricing = buildRetailPrice(selectedModel, selectedRepair.key, partType);
                              const adjustedSupplier = pricing.supplierCost;
                              const retailPrice = pricing.retailPrice;
                              const margin = pricing.margin;

                              return (
                                <div key={partType} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
                                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div>
                                      <div className="text-sm font-bold text-cyan-300">{partLabels[partType]}</div>
                                      <div className="mt-1 text-xs text-slate-400">Закупка: {adjustedSupplier} ₽ · Моржа: {margin} ₽</div>
                                      <div className="mt-1 text-[11px] text-slate-500">{pricing.note}</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-black text-emerald-400">{retailPrice} ₽</div>
                                      <button
                                        onClick={() => addToCart(selectedRepair.title, partType, adjustedSupplier, retailPrice)}
                                        className="mt-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-cyan-400"
                                      >
                                        Добавить в чек
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Card>

                        <div className="space-y-6">
                          <Card>
                            <h4 className="text-xl font-bold">Что говорить по модульке</h4>
                            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                              {selectedRepair?.key === 'charge' ? (
                                <>
                                  <div className="rounded-2xl bg-slate-800 p-4">По нижнему разъёму ориентируем от 2500 ₽, но точная сумма зависит от состояния самой платы, дорожек и цепей питания.</div>
                                  <div className="rounded-2xl bg-slate-800 p-4">Если проблема только в разъёме — закрываем как обычную модульную работу. Если внутри есть повреждения по дорожкам или питанию, отдельно согласуем после вскрытия.</div>
                                  <div className="rounded-2xl bg-slate-800 p-4">Раз уж устройство уже в работе, есть смысл сразу проверить кабель, зарядку и почистить всё вокруг разъёма, чтобы клиент не вернулся с той же жалобой.</div>
                                </>
                              ) : (
                                <>
                                  <div className="rounded-2xl bg-slate-800 p-4">По этой модели это типовой ремонт, можем сделать сразу на месте.</div>
                                  <div className="rounded-2xl bg-slate-800 p-4">У вас есть выбор: Китай, хороший аналог и оригинал — покажу разницу по цене и качеству.</div>
                                  <div className="rounded-2xl bg-slate-800 p-4">Раз уж устройство уже в работе, есть смысл сразу закрыть сопутствующие моменты и не возвращаться к ним отдельно.</div>
                                </>
                              )}
                            </div>
                          </Card>

                          <Card>
                            <h4 className="text-xl font-bold">Что ещё продать к этой работе</h4>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {selectedRepair.upsell.map((item) => (
                                <span key={item} className="rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-300">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </Card>

                          <Card>
                            <h4 className="text-xl font-bold">Быстрые подсказки продавцу</h4>
                            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                              <div className="rounded-2xl bg-slate-800 p-4">Сначала покажи клиенту 3 уровня качества — так он не спорит с ценой, а выбирает формат ремонта.</div>
                              <div className="rounded-2xl bg-slate-800 p-4">После выбора основной работы сразу предложи один доп: стекло, плёнку, чистку или проверку разъёма.</div>
                              <div className="rounded-2xl bg-slate-800 p-4">Закрывающая фраза: “можем сразу сделать и сегодня закрыть вопрос, чтобы не возвращаться к нему повторно”.</div>
                            </div>
                            <textarea
                              value={quickNote}
                              onChange={(e) => setQuickNote(e.target.value)}
                              placeholder="Личная заметка приёмщика по клиенту: что возражал, на чём акцентировать, что допродать"
                              className="mt-4 min-h-[120px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500"
                            />
                          </Card>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <h3 className="text-xl font-bold">CRM-чек</h3>
                <div className="mt-2 text-xs text-slate-500">Позиций в чеке: {totalItems}</div>
                <div className="mt-4 space-y-3">
                  {cart.length === 0 ? (
                    <div className="rounded-2xl bg-slate-800 p-4 text-sm text-slate-400">Выбери модель, ремонт и тип запчасти — позиции появятся здесь.</div>
                  ) : (
                    cart.map((item, index) => (
                      <div key={`${item.label}-${index}`} className="rounded-2xl bg-slate-800 p-4">
                        <div className="font-semibold">{item.label}</div>
                        <div className="mt-1 text-xs text-slate-400">Закупка: {item.supplierCost} ₽</div>
                        <div className="mt-2 text-lg font-bold text-emerald-400">{getEffectiveRetailPrice(item, cart)} ₽</div>
                        {item.repairKey === 'battery' && getEffectiveRetailPrice(item, cart) !== item.retailPrice && (
                          <div className="mt-1 text-xs text-cyan-300">Автоскидка -1500 ₽ за установку дисплея</div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-5 rounded-2xl bg-slate-950 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Закупка всего</span>
                    <span>{totalSupplier} ₽</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                    <span>Моржа всего</span>
                    <span>{totalMargin} ₽</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3 text-lg font-black">
                    <span>Итоговый чек</span>
                    <span className="text-emerald-400">{totalRetail} ₽</span>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-bold">Как вести клиента к оплате</h3>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <div className="rounded-2xl bg-slate-800 p-4">Сначала покажи выбор по качеству и цене — клиенту проще купить, когда он выбирает, а не когда ему навязывают.</div>
                  <div className="rounded-2xl bg-slate-800 p-4">После выбора основной работы сразу предложи один доп: защита, чистка, стекло, проверка разъёма.</div>
                  <div className="rounded-2xl bg-slate-800 p-4">Завершай фразой: “можем сразу закрыть вопрос сегодня, чтобы вы не возвращались к этому повторно”.</div>
                  <div className="rounded-2xl bg-slate-800 p-4">Если клиент сомневается, не спорь о цене — переводи разговор в выбор между вариантами качества и в удобство решения вопроса прямо сейчас.</div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2">
            {Object.entries(diagnosticsScripts).map(([key, group]) => (
              <Card key={key}>
                <h2 className="text-2xl font-bold">{group.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{group.intro}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.phrases.map((phrase) => (
                    <span key={phrase} className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {phrase}
                    </span>
                  ))}
                </div>
                <div className="mt-5 space-y-3">
                  {group.scripts.map((script, index) => (
                    <div key={index} className="rounded-2xl bg-slate-800/80 p-4 text-sm leading-6 text-slate-200">
                      {script}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'psychology' && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {psychologyBlocks.map((item) => (
              <Card key={item.title}>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'objections' && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {objectionScripts.map((item) => (
              <Card key={item.objection}>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Возражение</div>
                <h3 className="mt-2 text-xl font-bold">{item.objection}</h3>
                <div className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Что отвечать</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'manager' && (
          <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <Card>
              <h2 className="text-2xl font-bold">Чек-лист топ-менеджера на точке</h2>
              <div className="mt-5 space-y-3">
                {managerChecklist.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-800/80 p-4 text-sm leading-6 text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold">Мини-скрипт идеального согласования модульки</h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                <div className="rounded-2xl bg-slate-800 p-4">1. Подтверждаю проблему: “Да, по такой модели это типовой ремонт”.</div>
                <div className="rounded-2xl bg-slate-800 p-4">2. Даю выбор: “Есть Китай, хороший аналог и оригинал — покажу сразу разницу по цене”.</div>
                <div className="rounded-2xl bg-slate-800 p-4">3. Убираю страх: “Работа понятная, всё согласуем до ремонта”.</div>
                <div className="rounded-2xl bg-slate-800 p-4">4. Добавляю допродажу: “Раз уж меняем модуль, лучше сразу защитить новый экран”.</div>
                <div className="rounded-2xl bg-slate-800 p-4">5. Закрываю: “Можем сразу сделать и закрыть вопрос сегодня”.</div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
