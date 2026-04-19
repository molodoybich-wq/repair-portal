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

const brandTabs = [
  { id: 'iphone', label: 'iPhone' },
  { id: 'samsung', label: 'Samsung' },
  { id: 'xiaomi', label: 'Xiaomi / Poco / Redmi' },
  { id: 'other', label: 'Другие бренды' },
];

const models = {
  iphone: [
    'iPhone 8', 'iPhone 8 Plus', 'iPhone X', 'iPhone XR', 'iPhone XS', 'iPhone XS Max',
    'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max',
    'iPhone 12 mini', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
    'iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
    'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
    'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
    'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max'
  ],
  samsung: [
    'Samsung A12', 'Samsung A13', 'Samsung A14', 'Samsung A15', 'Samsung A24', 'Samsung A25',
    'Samsung A32', 'Samsung A33', 'Samsung A34', 'Samsung A35', 'Samsung A52', 'Samsung A53', 'Samsung A54', 'Samsung A55',
    'Samsung S20', 'Samsung S21', 'Samsung S22', 'Samsung S23', 'Samsung S23 Ultra', 'Samsung S24', 'Samsung S24 Ultra'
  ],
  xiaomi: [
    'Redmi 10', 'Redmi 12', 'Redmi 13',
    'Redmi Note 10', 'Redmi Note 11', 'Redmi Note 12', 'Redmi Note 12 Pro', 'Redmi Note 13', 'Redmi Note 13 Pro',
    'Poco X3', 'Poco X4', 'Poco X5', 'Poco X6', 'Poco F3', 'Poco F4', 'Poco F5', 'Poco F6'
  ],
  other: [
    'Honor 50', 'Honor 70', 'Honor 90', 'Honor 200', 'Honor X5', 'Honor X6', 'Honor X7', 'Honor X8', 'Honor X9',
    'Oppo A54', 'Oppo A55', 'Oppo A57', 'Oppo A78',
    'Realme 8', 'Realme 9', 'Realme 10', 'Realme 11',
    'Infinix Note 12', 'Infinix Note 30',
    'Tecno Camon 20', 'Tecno Spark 20'
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
      'Не делает пену / ошибка нагрева — молочный тракт, термоблок, датчики, плата.',
    ],
    script: 'По кофемашине сначала диагностика, потому что один симптом часто скрывает несколько проблем.',
  },
  {
    key: 'printer',
    title: 'Принтеры / МФУ',
    items: [
      'Полосит — головка, засор, энкодер, капа, парковка.',
      'Не захватывает бумагу — ролики, датчики, механика.',
      'Ошибка / не включается — питание, плата, шлейфы.',
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
  'Лучше сказать “точно скажем после проверки”, чем обещать лишнее.',
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
  { title: 'Телефоны · когда только диагностика', bullets: ['Нет изображения, циклическая перезагрузка, после воды.', 'Не работает камера / Face ID / датчики после падения.', 'Устройство было в другом сервисе.'] },
  { title: 'Ноутбуки и ПК', bullets: ['Не включается — плата, питание, короткое.', 'Нет картинки — матрица, шлейф, видеочип.', 'Греется и выключается — СО, питание, датчики.'] },
  { title: 'ТВ', bullets: ['Подсветка, матрица, T-CON, main, питание.', 'Пятна и полосы часто не равны “просто шлейф”.'] },
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
  'Закрыл разговор на действие: оставить устройство / дождаться звонка.',
  'Показал выбор качества по модульному ремонту.',
];

const clientQuestions = [
  'Когда именно началась проблема?',
  'Устройство падало, заливалось или перегревалось?',
  'Уже был ремонт или вскрытие в другом сервисе?',
  'Проблема постоянная или проявляется иногда?',
];

const franchiseRules = [
  'Единый словарь качества: дешёвое / отличное / премиум.',
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

function getDeviceClass(model) {
  const text = String(model || '').toLowerCase();
  if (text.includes('pro max') || text.includes('ultra')) return 'flagship';
  if (text.includes('pro') || text.includes('plus')) return 'upper';
  return 'base';
}

function getAliases(model) {
  const aliasMap = {
    'Poco X5': ['Poco X5', 'Redmi Note 12'],
    'Redmi Note 12': ['Redmi Note 12', 'Poco X5'],
  };
  return aliasMap[model] || [model];
}

function isTierPriceSane(variantMap, repairKey, partType, price) {
  if (typeof price !== 'number' || price <= 0) return false;
  const node = variantMap?.[repairKey];
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
  aliases.forEach((name) => {
    const mainNode = supplierVariantMap[name];
    const otpNode = supplierVariantMapOtp[name];
    const mainPrice = mainNode?.[repairKey]?.[partType];
    const otpPrice = otpNode?.[repairKey]?.[partType];
    if (typeof mainPrice === 'number' && isTierPriceSane(mainNode, repairKey, partType, mainPrice)) {
      collected.push({ price: mainPrice, source: 'main', updatedAt: '19.04.2026', model: name });
    }
    if (typeof otpPrice === 'number' && isTierPriceSane(otpNode, repairKey, partType, otpPrice)) {
      collected.push({ price: otpPrice, source: 'otp', updatedAt: '19.04.2026', model: name });
    }
  });
  return collected.sort((a, b) => a.price - b.price);
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
      note: 'Фикс по сети',
    };
  }

  const chosen = collectCandidates(model, repairKey, partType)[0] || null;
  if (!chosen) {
    return {
      mode: isDiagnostic ? 'diagnostic-only' : 'no-price',
      source: 'unavailable',
      sourceModel: null,
      updatedAt: '—',
      priceType: isDiagnostic ? 'diagnostic' : 'supplier',
      supplierCost: null,
      retailPrice: null,
      margin: null,
      note: isDiagnostic ? 'Только диагностика.' : 'Цена не подтверждена.',
    };
  }

  if (isDiagnostic) {
    return {
      mode: 'diagnostic-only',
      source: chosen.source,
      sourceModel: chosen.model,
      updatedAt: chosen.updatedAt,
      priceType: 'diagnostic',
      supplierCost: chosen.price,
      retailPrice: null,
      margin: null,
      note: 'Даже при наличии закупки эта работа идёт только через диагностику.',
    };
  }

  let retailPrice = chosen.price + getMargin(model, repairKey, partType, chosen.price);
  if (repairKey === 'battery') retailPrice -= 1100;
  retailPrice = psychologicalRound(retailPrice);

  return {
    mode: 'ready',
    source: chosen.source,
    sourceModel: chosen.model,
    updatedAt: chosen.updatedAt,
    priceType: 'workAndPart',
    supplierCost: chosen.price,
    retailPrice,
    margin: retailPrice - chosen.price,
    note: chosen.source === 'main' ? 'Расчёт по основному прайсу' : 'Расчёт по альтернативному прайсу',
  };
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

  const filteredModels = useMemo(() => models[brandTab].filter((model) => model.toLowerCase().includes(search.toLowerCase())), [brandTab, search]);

  const qualityMeta = {
    cheap: { label: 'Дешёвое качество', short: 'База' },
    good: { label: 'Отличное качество', short: 'Хорошее' },
    orig: { label: 'Премиум', short: 'Премиум' },
  };

  const sourceMeta = {
    main: { label: 'A · основной прайс', className: 'border-sky-800/50 bg-sky-950/30 text-sky-300' },
    otp: { label: 'B · OTP прайс', className: 'border-violet-800/50 bg-violet-950/30 text-violet-300' },
    fixed: { label: 'manual override', className: 'border-fuchsia-800/50 bg-fuchsia-950/30 text-fuchsia-300' },
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
              ? 'Для модульного ремонта показываем источник цены, дату обновления, закупку и розницу. Если цена не подтверждена — расчёт отключаем.'
              : 'Для этой категории цена не обещается. Только диагностика и грамотный приём.'}
          </div>
        </Card>

        <div className="grid gap-4 xl:grid-cols-3">
          {tiers.map((tier) => {
            const meta = qualityMeta[tier];
            const pricing = buildPricing(model, repair.key, tier);
            return (
              <Card key={tier}>
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
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-slate-950 p-3">
                        <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Закупка</div>
                        <div className="mt-1 text-lg font-black">{pricing.supplierCost || '—'} ₽</div>
                      </div>
                      <div className="rounded-2xl bg-slate-950 p-3">
                        <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Маржа</div>
                        <div className="mt-1 text-lg font-black">{pricing.margin || '—'} ₽</div>
                      </div>
                      <div className="rounded-2xl bg-slate-950 p-3">
                        <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Розница</div>
                        <div className="mt-1 text-lg font-black text-emerald-300">{pricing.retailPrice || '—'} ₽</div>
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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-slate-800 bg-black p-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6">
          <div>
            <div className="text-xs text-slate-400">План</div>
            <input value={dailyTarget} onChange={(e) => setDailyTarget(Number(e.target.value) || 0)} className="w-24 rounded bg-slate-800 px-3 py-1 text-white" />
          </div>
          <div className="ml-auto rounded-2xl border border-cyan-900/40 bg-cyan-950/20 px-4 py-2 text-sm text-cyan-200">
            Франшизная логика: подтверждённая закупка → расчёт, нет закупки → только диагностика
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-cyan-900/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6">
          <div className="inline-flex rounded-full border border-cyan-800/50 bg-cyan-950/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Partner Repair Portal V3</div>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">CRM-портал приёмки, расчёта, диагностики и франшизы</h1>
          <p className="mt-4 max-w-5xl text-sm leading-7 text-slate-300 md:text-base">Портал должен не просто считать цену, а делать приёмщика сильнее: быстрее ориентировать в сценариях, подсказывать правильные слова, не давать обещать лишнее и повышать конверсию в диагностику и ремонт.</p>
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
                <p className="mt-2 text-sm leading-6 text-slate-400">Для телефонов модулька считается только при наличии подтверждённой закупки.</p>
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
                    <div className="mb-3 text-xs text-slate-500">Найдено моделей: {filteredModels.length}</div>
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
                          <button key={repair.key} onClick={() => setSelectedRepair(repair)} className={`rounded-2xl border p-4 text-left transition ${selectedRepair?.key === repair.key ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800 bg-slate-900 hover:border-cyan-700'}`}>
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
                  <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                    <QuoteBuilder model={selectedModel} repair={selectedRepair} />
                    <div className="space-y-6">
                      <Card>
                        <h4 className="text-xl font-bold">Что говорить по сценарию</h4>
                        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                          {selectedRepair.type === 'modular' ? (
                            <>
                              <div className="rounded-2xl bg-slate-800 p-4">По модульке показываем выбор по качеству только при подтверждённой закупке.</div>
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
      </div>
    </div>
  );
}
