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
    'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max', 'iPhone 12 mini', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
    'iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
    'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
  ],
  samsung: [
    'Samsung A54', 'Samsung A55', 'Samsung S23', 'Samsung S23 Ultra', 'Samsung S24', 'Samsung S24 Ultra',
  ],
  xiaomi: [
    'Redmi Note 13', 'Redmi Note 13 Pro', 'Poco X5', 'Poco X6', 'Xiaomi 13T', 'Xiaomi 14T',
  ],
  other: [
    'Honor 90', 'Honor 200', 'Google Pixel 8', 'Google Pixel 9', 'Realme 10', 'Infinix Note 30',
  ],
};

const supplierVariantMap = {
  'iPhone 11': { battery: { cheap: 840, good: 1300 }, display: { cheap: 1100, good: 1600, orig: 2450 }, back: { cheap: 195 } },
  'iPhone 12': { battery: { cheap: 890, good: 1320, orig: 2880 }, display: { cheap: 1270, good: 1900, orig: 4500 }, back: { cheap: 175 } },
  'iPhone 13': { battery: { cheap: 900, good: 1450, orig: 3340 }, display: { cheap: 1300, good: 1900, orig: 6500 }, back: { cheap: 210 } },
  'iPhone 14': { battery: { cheap: 1050, good: 1420, orig: 3540 }, display: { cheap: 1450, good: 2400, orig: 8200 }, back: { cheap: 310 } },
  'iPhone 15': { battery: { cheap: 1000, good: 1250, orig: 3300 }, display: { cheap: 1500, good: 2550, orig: 9800 }, back: { cheap: 980 } },
  'iPhone 16': { battery: { good: 1750 }, display: { cheap: 2800, orig: 17500 }, back: { cheap: 1050 } },
  'Samsung A54': { battery: { cheap: 560 }, display: { cheap: 1390, good: 2450, orig: 5490 }, back: { cheap: 150 } },
  'Samsung A55': { battery: { cheap: 560 }, display: { cheap: 1650, good: 2890, orig: 5590 } },
  'Samsung S23': { battery: { good: 2000 }, display: { cheap: 4800, good: 7200, orig: 10900 } },
  'Redmi Note 13': { battery: { cheap: 750, good: 1200 }, display: { good: 2290, orig: 4550 } },
  'Poco X5': { battery: { cheap: 800, good: 1300 }, display: { good: 1990, orig: 2890 } },
};

const iphoneBackRetailOverride = {
  'iPhone 16 Pro Max': 8000,
  'iPhone 16 Pro': 8000,
  'iPhone 15 Pro Max': 7000,
  'iPhone 15 Pro': 7000,
  'iPhone 14 Pro Max': 8000,
  'iPhone 14 Pro': 8000,
  'iPhone 13 Pro Max': 7000,
  'iPhone 13 Pro': 7000,
  'iPhone 13': 5500,
  'iPhone 12 Pro Max': 5500,
  'iPhone 12 Pro': 5000,
  'iPhone 12': 5000,
  'iPhone 11 Pro Max': 5000,
  'iPhone 11 Pro': 5000,
  'iPhone 11': 4500,
};

const partLabels = {
  cheap: 'Дешёвый аналог',
  good: 'Хороший аналог',
  orig: 'Оригинал',
};

const intakePlaybook = [
  '1. Отзеркаль проблему: “Правильно понимаю, что …”.',
  '2. Дай 2–4 причины без финального диагноза.',
  '3. Объясни риск ошибки без диагностики.',
  '4. Переведи разговор из цены в точность и безопасность.',
  '5. Закрой на действие: оставить устройство и дождаться звонка.',
  '6. Обозначь срок диагностики.',
  '7. Зафиксируй контакт и ожидание обратной связи.',
];

const forbiddenPhrases = [
  'Это точно только одна деталь.',
  'Тут ерунда, сейчас быстро сделаем.',
  'Сразу скажу точную цену без проверки.',
  'Это 100% просто разъём / подсветка / картридж.',
  'Тут ничего серьёзного быть не может.',
];

const redFlags = [
  'Следы влаги, запах гари, окислы.',
  'Устройство уже было в другом сервисе.',
  'Проблема плавающая: то работает, то нет.',
  'После падения, удара или скачка напряжения.',
  'После замены одной детали проблема не ушла.',
  'Клиент требует точную цену без диагностики.',
];

const managerChecklist = [
  'Дал клиенту понятный следующий шаг.',
  'Не назвал точную цену по сложной технике раньше диагностики.',
  'Назвал 2–4 возможные причины без финального диагноза.',
  'Закрыл разговор на действие: оставить устройство / дождаться звонка.',
  'По модульке предложил минимум один доп.',
  'Звучал уверенно и не спорил с клиентом.',
];

const phoneRepairCatalog = [
  { key: 'display', title: 'Замена дисплея', icon: '📱', type: 'modular', upsell: ['Стекло', 'Плёнка', 'Чистка динамиков'] },
  { key: 'battery', title: 'Замена аккумулятора', icon: '🔋', type: 'modular', upsell: ['Чистка разъёма', 'Проверка зарядки', 'Настройка'] },
  { key: 'back', title: 'Замена задней крышки', icon: '🪞', type: 'modular', upsell: ['Стекло камеры', 'Плёнка', 'Чистка корпуса'] },
  { key: 'charge', title: 'Нижний разъём', icon: '🔌', type: 'diagnostic', upsell: ['Диагностика питания', 'Проверка шлейфа', 'Осмотр разъёма'], diagnosticText: 'По нижнему разъёму цену сразу не обещаем. Причина может быть в разъёме, шлейфе, дорожках, контроллере питания или последствиях влаги. Только диагностика.' },
  { key: 'camera', title: 'Камера', icon: '📷', type: 'diagnostic', upsell: ['Проверка шлейфа', 'Проверка питания камеры', 'Осмотр платы'], diagnosticText: 'По камере цену сразу не называем. Проблема может быть в модуле, шлейфе, питании или плате. Только диагностика.' },
  { key: 'speaker', title: 'Динамик / микрофон', icon: '🔊', type: 'diagnostic', upsell: ['Чистка сеток', 'Проверка аудиотракта', 'Осмотр на влагу'], diagnosticText: 'По динамику и микрофону не обещаем простую замену. Причина может быть в сетках, усилителе, шлейфе, окислах или плате. Только диагностика.' },
];

const diagnosticCategories = [
  {
    key: 'tv',
    title: 'ТВ',
    icon: '📺',
    items: [
      { title: 'Нет изображения, есть звук', bullets: ['Чаще всего это подсветка.', 'Но также может быть блок питания или main-плата.', 'Если экран вспыхивает и тухнет — высокая вероятность подсветки.', 'Иногда короткое по линии LED → уходит в защиту.'] },
      { title: 'Полосы / пятна / половина экрана', bullets: ['Часто матрица или COF/шлейфы.', 'Иногда T-CON или main.', 'Любые обещания по матрице — запрещены до диагностики.'] },
      { title: 'Не включается / мигает индикатор', bullets: ['БП.', 'Main.', 'КЗ по линиям питания.'] },
      { title: 'Звук есть, картинка тёмная', bullets: ['Подсветка деградировала.', 'Драйвер подсветки.', 'Пробой светодиодов.'] },
    ],
    script: 'По телевизору цену не называем: симптом может быть похож на подсветку, но нужно исключить блок питания, плату и матрицу. Сначала диагностика.',
  },
  {
    key: 'coffee',
    title: 'Кофемашины',
    icon: '☕',
    items: [
      { title: 'Течёт / вода в поддоне / льёт мимо', bullets: ['Возможны уплотнения, клапаны, тройники, бойлер, шланги.', 'Без разборки нельзя понять точную причину и объём работ.'] },
      { title: 'Не делает кофе / не качает / вода идёт слабо', bullets: ['Возможны помпа, заварочный блок, засор, клапаны, гидросистема.', 'Иногда проблема сразу в нескольких узлах.'] },
      { title: 'Не греет / слабый пар / нет пены / ошибка', bullets: ['Возможны термоблок, датчики температуры, клапаны, молочная система.', 'Без разборки цену не называем.'] },
    ],
    script: 'По кофемашине цену заранее не называем. Здесь нужно разбирать и смотреть гидросистему и рабочие узлы. Сначала диагностика, потом точное согласование.',
  },
  {
    key: 'printer',
    title: 'Принтеры',
    icon: '🖨️',
    items: [
      { title: 'Полосит / плохо печатает / пропуски', bullets: ['Может быть головка, засор, чернила, капа, парковка.', 'Иногда виновата электроника, а не расходники.'] },
      { title: 'Ошибка / не печатает / не включается', bullets: ['Может быть плата, датчики, механика, каретка, блок питания.', 'Без проверки можно ошибиться по цене.'] },
      { title: 'Не захватывает бумагу / не видит картридж', bullets: ['Возможны ролики, механика подачи, датчики, счётчик, плата.', 'Сразу цену не обещаем.'] },
    ],
    script: 'По принтеру цену без диагностики не называем. Один и тот же симптом может быть как по расходникам, так и по механике или плате.',
  },
];

const advancedDiagnosticExamples = {
  tv: [
    'Клиент: “Есть звук, экран чёрный”. Ответ: “Очень похоже на подсветку, но без проверки нельзя исключить блок питания и плату”.',
    'Клиент: “Появились полосы”. Ответ: “По полосам часто вопрос в матрице или шлейфах, а это уже требует осмотра и диагностики”.',
    'Клиент: “Телевизор щёлкает и не включается”. Ответ: “Это может быть блок питания, короткое или main, поэтому цену заранее не называем”.',
  ],
  coffee: [
    'Клиент: “Течёт снизу”. Ответ: “Причина может быть от уплотнений до гидросистемы, без разборки это гадание”.',
    'Клиент: “Не делает пену”. Ответ: “Здесь может быть молочный тракт, клапаны, термоблок или засор, нужно смотреть вживую”.',
    'Клиент: “Шумит и не варит”. Ответ: “Часто это не одна причина, а сразу несколько узлов, поэтому сначала диагностика”.',
  ],
  printer: [
    'Клиент: “Полосит”. Ответ: “Это может быть как голова и чернила, так и парковка или электроника”.',
    'Клиент: “Не видит картридж”. Ответ: “Причина бывает не только в картридже, но и в контактах, каретке или плате”.',
    'Клиент: “Не берёт бумагу”. Ответ: “Тут может быть механика, ролики, датчики — без разборки нельзя честно назвать цену”.',
  ],
};

const universalBlocks = [
  { title: 'Игровые приставки / консоли', bullets: ['Не включается — питание, HDMI, плата, перегрев.', 'Нет изображения — кабель, порт, GPU, плата.', 'Шум / перегрев — пыль, термопаста, вентилятор.'], script: 'По приставкам без диагностики нельзя честно назвать цену: проблема может быть от HDMI до платы.' },
  { title: 'Роботы-пылесосы', bullets: ['Не заряжается — база, АКБ, контроллер.', 'Крутится на месте — датчики, колёса, гироскоп.', 'Не сосёт — мотор, засор, фильтра.'], script: 'По роботам-пылесосам симптом часто не указывает на один узел, поэтому сначала диагностика.' },
  { title: 'Dyson / фены / стайлеры', bullets: ['Не включается — питание, плата, защита.', 'Выключается — перегрев, фильтр, датчики.', 'Слабая тяга — засор, мотор, герметичность.'], script: 'По Dyson и мелкой бытовой технике нужен осмотр и диагностика — причины бывают глубже, чем кажутся.' },
  { title: 'Ноутбуки / ПК', bullets: ['Не включается — питание, плата, КЗ.', 'Греется — пыль, термопаста, кулер.', 'Тормозит — диск, система, перегрев.'], script: 'По ноутбукам и ПК один симптом может означать несколько причин, поэтому сразу точную цену не называем.' },
  { title: 'Мониторы', bullets: ['Нет изображения — подсветка, плата, матрица, шлейф.', 'Полосы / артефакты — матрица, шлейф, плата управления.', 'Не включается — блок питания, плата, кнопки, КЗ.'], script: 'По монитору заранее цену не называем: причин несколько, от подсветки до матрицы и платы.' },
  { title: 'Колонки / акустика / саундбары', bullets: ['Нет звука — усилитель, питание, динамик, плата.', 'Хрип / треск — динамики, усилитель, питание, попадание влаги.', 'Не включается — блок питания, плата, контроллер.'], script: 'По акустике один и тот же симптом может быть от питания до усилителя, поэтому только диагностика.' },
  { title: 'Смарт-часы / браслеты', bullets: ['Не включаются — АКБ, зарядка, плата, влага.', 'Не заряжаются — контактная группа, шлейф, контроллер.', 'Не работает экран — дисплей, шлейф, питание.'], script: 'По носимой технике часто проблема глубже, чем кажется, особенно после воды или удара.' },
  { title: 'Электросамокаты / мелкий электротранспорт', bullets: ['Не включается — АКБ, BMS, контроллер, питание.', 'Не едет — мотор-колесо, контроллер, ручка газа, проводка.', 'Ошибка на дисплее — датчики, контроллер, прошивка, силовая часть.'], script: 'По электротранспорту без диагностики нельзя честно называть цену — там много силовых причин и скрытых повреждений.' },
];

const psychologyBlocks = [
  { title: 'Уверенность вместо оправданий', text: 'Говори фактами и паттернами, без “наверное”.' },
  { title: 'Продажа понятности', text: 'Клиент платит за ясность: сначала проверка → потом решение.' },
  { title: 'Якорь на удобство', text: '“Оставьте — мы сами разберёмся и позвоним с точным ответом”.' },
  { title: 'Страх двойной оплаты', text: 'Покажи риск: без диагностики можно сделать лишний ремонт.' },
  { title: 'Контроль диалога', text: 'Задавай вопросы и веди, не отвечай только на вопросы клиента.' },
  { title: 'Мягкая срочность', text: '“Лучше закрыть сейчас, пока не потянуло за собой другие узлы”.' },
];

const psychologyExtended = [
  'Клиенту важнее не цена, а ощущение, что им управляет компетентный человек.',
  'Если ты первым ставишь точный диагноз без проверки — ты теряешь авторитет при любой ошибке.',
  'Лучший продавец не спорит, а направляет клиента вопросами и логикой.',
  'Когда клиент слышит несколько возможных причин, он легче принимает идею диагностики.',
  'Фраза “чтобы не вводить вас в заблуждение” резко повышает доверие.',
  'Нельзя звучать как человек, который угадывает. Нужно звучать как человек, который знает процесс.',
];

const objectionScripts = [
  { objection: 'Дорого', answer: 'Важно не просто заменить деталь, а нормально закрыть вопрос с гарантией и без повторного обращения.' },
  { objection: 'Я подумаю', answer: 'Давайте хотя бы примем на диагностику, чтобы вы думали уже на основании точной информации.' },
  { objection: 'В другом месте дешевле', answer: 'Важно сравнивать не только цифру, но и качество детали, объём работ и гарантию.' },
];

const objectionExtended = [
  { objection: 'Мне надо просто узнать цену', answer: 'Ориентир “от” я могу дать, но точная сумма без проверки будет нечестной. Правильно — сначала диагностика, потом конкретика.' },
  { objection: 'Я уже был в другом сервисе', answer: 'Тем более лучше проверить у нас отдельно. После другого сервиса часто вскрываются дополнительные проблемы или последствия прошлого ремонта.' },
  { objection: 'Это точно мелочь', answer: 'Иногда так и бывает, но по опыту под таким симптомом часто скрывается более глубокая причина. Чтобы не ошибиться, лучше проверить.' },
  { objection: 'Я подумаю и потом решу', answer: 'Хорошо, но чтобы думать предметно, лучше получить точный ответ после диагностики, а не строить предположения.' },
];

const clientQuestions = [
  'Когда именно началась проблема?',
  'Проблема постоянная или проявляется иногда?',
  'Устройство падало, заливалось или перегревалось?',
  'Уже был ремонт или вскрытие в другом сервисе?',
  'Какие симптомы были до того, как техника перестала работать нормально?',
  'Использовались оригинальные зарядки, расходники или были аналоги?',
];

const intakeQuestionsByCategory = [
  { title: 'Телефоны', questions: ['Падал ли аппарат, заливался ли, был ли удар?', 'Когда началась проблема и как проявляется сейчас?', 'Был ли уже ремонт или замена дисплея / АКБ / разъёма?', 'Заряжается ли другим кабелем и блоком?', 'Проблема постоянная или проявляется временами?'] },
  { title: 'ТВ', questions: ['Есть ли звук при отсутствии изображения?', 'Экран тёмный полностью или видны вспышки / полосы?', 'Не было ли скачка напряжения?', 'Проблема появилась резко или нарастала постепенно?', 'Телевизор уже вскрывали или ремонтировали раньше?'] },
  { title: 'Кофемашины', questions: ['Течёт, шумит, не греет или не делает кофе?', 'Когда делали последнюю профилактику и чистку?', 'Какая вода использовалась и были ли ошибки на дисплее?', 'Проблема постоянная или иногда пропадает?', 'Машину уже разбирали или что-то меняли?'] },
  { title: 'Принтеры / МФУ', questions: ['Не печатает, полосит, не захватывает бумагу или выдает ошибку?', 'Какой тип печати: струйный или лазерный?', 'Когда менялись расходники или делалась чистка?', 'Проблема появилась после простоя или сразу во время работы?', 'Есть ли посторонние звуки, застревание бумаги, ошибки?'] },
  { title: 'Ноутбуки / ПК', questions: ['Не включается, греется, тормозит, выключается?', 'Было ли залитие, падение, удар, перегрев?', 'После чего началась проблема: обновление, чистка, перевозка?', 'Есть ли индикация, шум вентилятора, реакция на зарядку?', 'Вскрывали ли устройство или меняли что-то раньше?'] },
];

const noPromiseBlocks = [
  'По ТВ нельзя обещать, что это точно подсветка, пока не исключены блок питания, main и матрица.',
  'По нижнему разъёму нельзя обещать простую замену, пока не исключены дорожки, шлейф и питание.',
  'По камере нельзя обещать замену модуля, пока не исключены шлейф, питание и плата.',
  'По кофемашине нельзя обещать цену без разборки гидросистемы и рабочих узлов.',
  'По ноутбуку нельзя обещать “просто чистку”, пока не исключены питание, плата, память, SSD и перегрев.',
  'По принтеру нельзя обещать, что виноват только картридж, пока не исключены механика и электроника.',
];

const deepProblemSignals = [
  'Следы влаги, окислов, запах гари.',
  'Устройство уже было в другом сервисе.',
  'Проблема плавающая: то работает, то нет.',
  'После замены детали проблема не ушла.',
  'После падения, удара или скачка напряжения.',
  'Греется, быстро разряжается, сам выключается.',
];

const closeScripts = [
  'Давайте хотя бы сделаем диагностику, чтобы вы не гадали и не переплачивали вслепую.',
  'Сейчас важно не назвать красивую цифру, а дать вам точный ответ после проверки.',
  'Оставляйте устройство: после диагностики вы уже спокойно решите, делать ремонт или нет.',
  'Без диагностики можно либо завысить цену, либо наоборот не учесть серьёзную проблему.',
  'Лучше один раз нормально проверить, чем потом возвращаться с той же неисправностью.',
];

const leaveSignals = ['Смотрит на часы / торопится', 'Говорит “я ещё подумаю”', 'Сравнивает с другим сервисом', 'Просит сразу цену без диагностики.'];
const saveClientScripts = ['Давайте хотя бы оставим на диагностику — это даст точный ответ.', 'Вы ничего не теряете, зато понимаете реальную ситуацию.', 'Лучше один раз проверить, чем потом делать дороже.'];
const dangerClients = [
  { type: 'Торг сразу с порога', whatToSay: 'Понимаю, что важно по цене. Но без проверки можно ошибиться — либо переплатите, либо проблема окажется глубже. Давайте сначала посмотрим.' },
  { type: 'Требует точную цену сразу', whatToSay: 'Если назвать сейчас — это будет гадание. Я могу назвать “от”, но корректно — только после диагностики.' },
  { type: 'Говорит “мне просто скажите сколько”', whatToSay: 'Могу назвать диапазон, но чтобы не обмануть — лучше сначала проверить. Так будет честнее для вас.' },
];

const upsellScripts = ['Раз уж уже вскрываем устройство — можно сразу обслужить аккумулятор, чтобы потом не возвращаться.', 'Пока аппарат разобран — дешевле сразу заменить изношенные элементы.', 'Чтобы не платить дважды за разбор — лучше сделать сразу.'];
const oneDayTraining = ['1. Никогда не называй точную цену без диагностики.', '2. Всегда переводи разговор в “давайте проверим”.', '3. Не спорь с клиентом — соглашайся и веди дальше.', '4. Говори уверенно, без “наверное”.', '5. Твоя задача — чтобы устройство осталось.'];
const kpiTips = ['Цель: минимум 70% устройств оставляют на диагностику.', 'Средний чек повышается за счёт доп услуг.', 'Каждый отказ = недозаработок.', 'Главная метрика: сколько устройств осталось на точке.'];

const commonReceptionMistakes = ['Назвал точную цену слишком рано.', 'Поставил диагноз с порога без проверки.', 'Начал спорить с клиентом вместо того, чтобы вести разговор.', 'Не обозначил срок диагностики.', 'Не зафиксировал следующий шаг: звонок, срок, согласование.', 'Не предложил допродажу к модульному ремонту.'];
const newbieStartPack = ['Сначала слушай клиента, потом задавай 3–5 уточняющих вопросов.', 'Никогда не обещай точный диагноз и точную сумму без проверки.', 'Любую сложную технику переводи в диагностику через 2–4 возможные причины.', 'Если модулька понятная — показывай 3 варианта качества и сразу предлагай доп.', 'В конце разговора всегда должен быть следующий шаг: оставить устройство, срок и обратная связь.'];
const closingScriptsByType = [
  { title: 'Закрытие на диагностику', lines: ['Оставляйте устройство, после проверки мы скажем точную сумму и срок.', 'Давайте не будем гадать — лучше посмотрим и дадим вам нормальный ответ.'] },
  { title: 'Закрытие на срочную диагностику', lines: ['Оставляйте сейчас, постараемся посмотреть в приоритетном порядке.', 'Чем раньше примем, тем быстрее поймем реальную причину и сроки.'] },
  { title: 'Если клиент уходит думать', lines: ['Хорошо, но правильнее думать уже после диагностики, а не на предположениях.', 'Давайте хотя бы примем технику, чтобы у вас был точный ответ, а не догадки.'] },
];
const managerScenarios = [
  { title: 'Клиент торопится', points: ['Сразу обещай быстрый срок диагностики.', 'Говори коротко и по делу.', 'Закрывай на действие: “Оставляйте, сегодня/завтра свяжемся”.'] },
  { title: 'Клиент умничает и спорит', points: ['Не спорь лоб в лоб.', 'Соглашайся частично: “Да, такое возможно”.', 'Возвращай к проверке: “Чтобы не гадать, лучше посмотреть точно”.'] },
  { title: 'Клиент боится цены', points: ['Не называй максимум без проверки.', 'Говори про точность, а не про дороговизну.', 'Подчёркивай, что диагностика нужна, чтобы не переплатить лишнего.'] },
];

const realCases = [
  { device: 'Телефон', symptom: 'Не заряжается', whatManagerSays: 'Может быть разъём, но часто дорожки или контроллер питания. Без диагностики можно ошибиться — давайте проверим.', result: 'Оставил на диагностику' },
  { device: 'Телевизор', symptom: 'Есть звук, нет изображения', whatManagerSays: 'Похоже на подсветку, но исключить блок питания и плату можно только после проверки.', result: 'Оставил ТВ' },
  { device: 'Ноутбук', symptom: 'Не включается', whatManagerSays: 'От кнопки до материнской платы — причин много. Нужны замеры.', result: 'Оставил на диагностику' },
  { device: 'Кофемашина', symptom: 'Течёт', whatManagerSays: 'Уплотнения, клапаны, бойлер — без разборки это гадание.', result: 'Оставил на разбор' },
  { device: 'Принтер', symptom: 'Полосит', whatManagerSays: 'Голова, засор, электроника — сначала диагностика, чтобы не покупать лишнее.', result: 'Согласился' },
  { device: 'Dyson', symptom: 'Выключается', whatManagerSays: 'Перегрев, датчики, плата — проверка обязательна.', result: 'Оставил' },
];

const quickReplyScenarios = [
  { client: 'Дорого', reply: 'Важно не цифра, а чтобы не платить дважды. Сначала проверим — потом точная сумма.' },
  { client: 'Я подумаю', reply: 'Давайте хотя бы сделаем диагностику — будете думать уже с точными данными.' },
  { client: 'Скажите цену', reply: 'Могу назвать “от”, но корректно — после проверки.' },
  { client: 'В другом дешевле', reply: 'Сравним ли объём работ и качество? У нас — без сюрпризов после диагностики.' },
  { client: 'Не хочу оставлять', reply: 'Без проверки это гадание. После диагностики вы решите спокойно.' },
  { client: 'Срочно надо', reply: 'Тем более — быстрая диагностика даст реальную картину и срок.' },
  { client: 'Это просто разъём', reply: 'Бывает, но часто глубже — дорожки, контроллер. Проверим и скажем точно.' },
  { client: 'Сколько максимум?', reply: 'Дам верхнюю границу после диагностики, чтобы не завысить сейчас.' },
];

export default function RepairPortal() {
  const [dailyTarget, setDailyTarget] = useState(30000);
  const [currentRevenue] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [phoneSection, setPhoneSection] = useState('phones');
  const [brandTab, setBrandTab] = useState('iphone');
  const [search, setSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(diagnosticCategories[0]);
  const [cart, setCart] = useState([]);
  const [quickNote, setQuickNote] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const filteredModels = useMemo(() => models[brandTab].filter((model) => model.toLowerCase().includes(search.toLowerCase())), [brandTab, search]);

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 1200);
    } catch (e) {
      console.error(e);
    }
  };

  function estimateSupplierPrice(model, repairKey, partType) {
    const exact = supplierVariantMap[model]?.[repairKey];

    if (exact && typeof exact[partType] === 'number') {
      return exact[partType];
    }

    if (repairKey === 'back' && model.startsWith('iPhone')) {
      return 0;
    }

    const fallback = {
      display: { cheap: 1500, good: 2500, orig: 6000 },
      battery: { cheap: 700, good: 1300, orig: 3200 },
      back: { cheap: 300, good: 600, orig: 1200 },
      charge: { cheap: 500, good: 900, orig: 1500 },
      camera: { cheap: 700, good: 1200, orig: 2500 },
      speaker: { cheap: 300, good: 700, orig: 1200 },
    };

    return fallback[repairKey]?.[partType] ?? 1000;
  }

  function marginByCost(supplierCost, partType) {
    if (supplierCost <= 750) {
      let margin = 1800 + Math.round((supplierCost / 750) * 600);
      if (partType === 'good') margin += 200;
      if (partType === 'orig') margin += 400;
      return margin;
    }

    let margin = 3600;
    if (supplierCost >= 2000) margin = 4200;
    if (supplierCost >= 4000) margin = 5000;
    if (supplierCost >= 7000) margin = 6200;
    if (supplierCost >= 11000) margin = 7600;
    if (partType === 'good') margin += 500;
    if (partType === 'orig') margin += 1200;
    return Math.min(margin, 7600);
  }

  function buildRetailPrice(model, repairKey, partType) {
    const supplierCost = estimateSupplierPrice(model, repairKey, partType);
    if (repairKey === 'back' && model.startsWith('iPhone') && typeof iphoneBackRetailOverride[model] === 'number') {
      const retail = psychologicalRound(iphoneBackRetailOverride[model]);
      const fakeSupplier = Math.max(0, retail - 2000);
      return { supplierCost: fakeSupplier, retailPrice: retail, margin: retail - fakeSupplier, note: 'Фикс прайс по крышке (прайс + 2000 ₽)' };
    }
    if (['charge', 'camera', 'speaker'].includes(repairKey)) {
      const retailPrice = psychologicalRound(Math.max(supplierCost + 1800, 2500));
      return { supplierCost, retailPrice, margin: retailPrice - supplierCost, note: 'Минимальная цена от. Обязательно диагностика: причина может быть глубже.' };
    }
    let retailPrice = supplierCost + marginByCost(supplierCost, partType);
    if (repairKey === 'battery') retailPrice = Math.max(0, retailPrice - 1100);
    retailPrice = psychologicalRound(retailPrice);
    return { supplierCost, retailPrice, margin: retailPrice - supplierCost, note: repairKey === 'battery' ? 'АКБ снижена на 1100 ₽' : 'Стандартная маржа по дороговизне детали' };
  }

  function addToCart(repairTitle, partType, supplierCost, retailPrice) {
    setCart((prev) => [...prev, { model: selectedModel, repairKey: selectedRepair?.key || null, label: `${repairTitle} — ${partLabels[partType]}`, supplierCost, retailPrice }]);
  }

  function getEffectiveRetailPrice(item, items) {
    if (item.repairKey !== 'battery') return item.retailPrice;
    const hasDisplay = items.some((other) => other.model === item.model && other.repairKey === 'display');
    return hasDisplay ? Math.max(0, item.retailPrice - 1500) : item.retailPrice;
  }

  const totalRetail = cart.reduce((sum, item) => sum + getEffectiveRetailPrice(item, cart), 0);
  const totalSupplier = cart.reduce((sum, item) => sum + item.supplierCost, 0);
  const totalMargin = totalRetail - totalSupplier;

  const Button = ({ active, children, onClick }) => (
    <button onClick={onClick} className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${active ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>
      {children}
    </button>
  );

  const Card = ({ children, className = '' }) => <div className={`rounded-3xl border border-slate-800 bg-slate-900/90 p-5 ${className}`}>{children}</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="bg-black border-b border-slate-800 p-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6">
          <div>
            <div className="text-xs text-slate-400">План</div>
            <input value={dailyTarget} onChange={(e) => setDailyTarget(Number(e.target.value) || 0)} className="w-24 rounded bg-slate-800 px-3 py-1 text-white" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Сделано</div>
            <div className="font-bold text-green-400">{currentRevenue} ₽</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Осталось</div>
            <div className="font-bold text-red-400">{Math.max(0, dailyTarget - currentRevenue)} ₽</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-cyan-900/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6">
          <div className="inline-flex rounded-full border border-cyan-800/50 bg-cyan-950/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Внутренний портал партнёров и приёмщиков</div>
          <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">CRM-портал продаж, согласования и удержания клиента</h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-base">Телефоны — модулька и понятные цены. ТВ, кофемашины, принтеры и любая другая техника — техпамятки и перевод в диагностику без обещаний по цене.</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { id: 'dashboard', label: 'Главная' },
            { id: 'phones', label: 'Телефоны и техпамятки' },
            { id: 'diagnostics', label: 'Скрипты на диагностику' },
            { id: 'universal', label: 'Любая техника' },
            { id: 'psychology', label: 'Психология продаж' },
            { id: 'objections', label: 'Возражения' },
            { id: 'manager', label: 'Топ-менеджер' },
          ].map((tab) => (
            <Button key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>{tab.label}</Button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Card>
                <h2 className="text-2xl font-bold">Схема идеального диалога</h2>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <div className="rounded-2xl bg-slate-800 p-4">1) Выслушал → перефразировал</div>
                  <div className="rounded-2xl bg-slate-800 p-4">2) Дал 2–4 причины</div>
                  <div className="rounded-2xl bg-slate-800 p-4">3) Объяснил риск без диагностики</div>
                  <div className="rounded-2xl bg-slate-800 p-4">4) Предложил диагностику и срок</div>
                  <div className="rounded-2xl bg-slate-800 p-4">5) Закрыл: оставить устройство</div>
                </div>
              </Card>
              <Card>
                <h2 className="text-2xl font-bold">Триггеры увеличения чека</h2>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <div className="rounded-2xl bg-slate-800 p-4">Разобран — предложи АКБ / чистку</div>
                  <div className="rounded-2xl bg-slate-800 p-4">Экран — добавь стекло / плёнку</div>
                  <div className="rounded-2xl bg-slate-800 p-4">Крышка — добавь стекло камеры</div>
                  <div className="rounded-2xl bg-slate-800 p-4">Всегда 1 доп минимум</div>
                </div>
              </Card>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <h2 className="text-2xl font-bold">Признаки, что проблема может быть глубже</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">{deepProblemSignals.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{item}</div>)}</div>
              </Card>
              <Card>
                <h2 className="text-2xl font-bold">Что нельзя обещать</h2>
                <div className="mt-4 space-y-3">{noPromiseBlocks.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{item}</div>)}</div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'phones' && (
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <Card>
                <div className="mb-4 flex flex-wrap gap-2">
                  <Button active={phoneSection === 'phones'} onClick={() => { setPhoneSection('phones'); setSelectedRepair(null); }}>Телефоны</Button>
                  {diagnosticCategories.map((cat) => (
                    <Button key={cat.key} active={phoneSection === cat.key} onClick={() => { setPhoneSection(cat.key); setSelectedDiagnostic(cat); setSelectedRepair(null); }}>{cat.title}</Button>
                  ))}
                </div>

                {phoneSection === 'phones' ? (
                  <>
                    <h2 className="text-2xl font-bold">Телефоны, модели и цены</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">Для телефонов оставляем модульку по дисплею, АКБ и задней крышке. Разъём, камера и аудио — только через диагностику.</p>
                    <div className="mt-5 flex flex-wrap gap-2">{brandTabs.map((brand) => <Button key={brand.id} active={brandTab === brand.id} onClick={() => { setBrandTab(brand.id); setSelectedModel(null); setSelectedRepair(null); setSearch(''); }}>{brand.label}</Button>)}</div>
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
                        <div className="rounded-3xl border border-cyan-900/40 bg-slate-800/70 p-5">
                          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <div><div className="text-xs uppercase tracking-[0.16em] text-slate-500">Выбрана модель</div><h3 className="mt-2 text-2xl font-bold">{selectedModel}</h3></div>
                            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-300">Приёмщик продаёт: выбор, понятность и уверенность</div>
                          </div>
                          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {phoneRepairCatalog.map((repair) => (
                              <button key={repair.key} onClick={() => setSelectedRepair(repair)} className={`rounded-2xl border p-4 text-left transition ${selectedRepair?.key === repair.key ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800 bg-slate-900 hover:border-cyan-700'}`}>
                                <div className="text-xl">{repair.icon}</div>
                                <div className="mt-2 font-bold">{repair.title}</div>
                                <div className="mt-2 text-xs text-slate-400">{repair.type === 'modular' ? 'Нажми, чтобы увидеть цены' : 'Нажми, чтобы открыть скрипт диагностики'}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedRepair && selectedModel && (
                      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                        <Card>
                          <h4 className="text-xl font-bold">{selectedRepair.title}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-400">{selectedRepair.type === 'modular' ? 'Ниже 3 варианта: дешёвый аналог, хороший аналог и оригинал. Для АКБ действует логика скидки при комплекте с дисплеем.' : 'По этой работе цену сразу не обещаем как за простую модульку. Допустимо назвать только минимальную цену от и обязательно переводить клиента в диагностику.'}</p>
                          <div className="mt-5 grid gap-3">
                            {(selectedRepair.type === 'modular' ? ['cheap', 'good', 'orig'] : ['cheap']).map((partType) => {
                              const pricing = buildRetailPrice(selectedModel, selectedRepair.key, partType);
                              return (
                                <div key={partType} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
                                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div>
                                      <div className="text-sm font-bold text-cyan-300">{partType === 'cheap' ? 'Дешёвый аналог / от' : partLabels[partType]}</div>
                                      <div className="mt-1 text-xs text-slate-400">Закупка: {pricing.supplierCost} ₽ · Моржа: {pricing.margin} ₽</div>
                                      <div className="mt-1 text-[11px] text-slate-500">{pricing.note}</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-black text-emerald-400">{pricing.retailPrice} ₽</div>
                                      <button onClick={() => addToCart(selectedRepair.title, partType, pricing.supplierCost, pricing.retailPrice)} className="mt-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-cyan-400">{selectedRepair.type === 'modular' ? 'Добавить в чек' : 'Принять на диагностику'}</button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Card>
                        <div className="space-y-6">
                          <Card>
                            <h4 className="text-xl font-bold">{selectedRepair.type === 'modular' ? 'Что говорить по модульке' : 'Что говорить по диагностике'}</h4>
                            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                              {selectedRepair.type === 'modular' ? (
                                <>
                                  <div className="rounded-2xl bg-slate-800 p-4">Типовой модульный ремонт — можно сделать сразу.</div>
                                  <div className="rounded-2xl bg-slate-800 p-4">Предлагаем 3 варианта по качеству и цене.</div>
                                  <div className="rounded-2xl bg-slate-800 p-4">Закрываем допами и увеличиваем чек.</div>
                                </>
                              ) : (
                                <>
                                  <div className="rounded-2xl bg-slate-800 p-4">{selectedRepair.diagnosticText}</div>
                                  <div className="rounded-2xl bg-slate-800 p-4">По этой проблеме нельзя точно назвать цену без проверки, потому что причин может быть несколько.</div>
                                  <div className="rounded-2xl bg-slate-800 p-4">Главная задача — принять устройство на диагностику.</div>
                                </>
                              )}
                            </div>
                          </Card>
                          <Card>
                            <h4 className="text-xl font-bold">{selectedRepair.type === 'modular' ? 'Что ещё продать к этой работе' : 'Что проверить / на что обратить внимание'}</h4>
                            <div className="mt-4 flex flex-wrap gap-2">{selectedRepair.upsell.map((item) => <span key={item} className="rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-300">{item}</span>)}</div>
                          </Card>
                          <Card>
                            <h4 className="text-xl font-bold">Быстрые подсказки</h4>
                            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                              {selectedRepair.type === 'modular' ? (
                                <>
                                  <div className="rounded-2xl bg-slate-800 p-4">Сначала показывай 3 уровня качества — так клиент выбирает, а не спорит.</div>
                                  <div className="rounded-2xl bg-slate-800 p-4">После основной услуги сразу предлагай один доп.</div>
                                </>
                              ) : (
                                <>
                                  <div className="rounded-2xl bg-slate-800 p-4">Не ставь точный диагноз и не называй сумму с потолка.</div>
                                  <div className="rounded-2xl bg-slate-800 p-4">Звучать нужно технично, но без обещаний.</div>
                                </>
                              )}
                            </div>
                            <textarea value={quickNote} onChange={(e) => setQuickNote(e.target.value)} placeholder="Личная заметка приёмщика" className="mt-4 min-h-[120px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500" />
                          </Card>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{selectedDiagnostic.icon} {selectedDiagnostic.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">В этом разделе цен не называем вообще. Здесь только техническая памятка для приёмщика и готовый скрипт на приём в диагностику.</p>
                    <div className="mt-5 grid gap-4">
                      {selectedDiagnostic.items.map((item) => (
                        <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
                          <div className="font-bold text-cyan-300">{item.title}</div>
                          <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{item.bullets.map((bullet) => <div key={bullet}>• {bullet}</div>)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                      <Card>
                        <h4 className="text-xl font-bold">Что говорить клиенту</h4>
                        <div className="mt-4 rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{selectedDiagnostic.script}</div>
                        <div className="mt-4 rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">Цены не называем. Ремонт не обещаем. Цель — грамотно принять устройство на диагностику.</div>
                        <div className="mt-4 rounded-2xl bg-slate-800 p-4">
                          <div className="text-sm font-bold text-cyan-300">Алгоритм приёма</div>
                          <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{intakePlaybook.map((step) => <div key={step}>{step}</div>)}</div>
                        </div>
                      </Card>
                      <Card>
                        <h4 className="text-xl font-bold">Как должен звучать приёмщик</h4>
                        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                          <div className="rounded-2xl bg-slate-800 p-4">Говори уверенно и спокойно, без “наверное”.</div>
                          <div className="rounded-2xl bg-slate-800 p-4">Называй возможные причины, но не ставь окончательный диагноз.</div>
                          <div className="rounded-2xl bg-slate-800 p-4">Главная задача — не отпустить клиента без диагностики.</div>
                        </div>
                        <div className="mt-4 rounded-2xl bg-slate-800 p-4"><div className="text-sm font-bold text-amber-300">Что нельзя говорить</div><div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{forbiddenPhrases.map((item) => <div key={item}>• {item}</div>)}</div></div>
                        <div className="mt-4 rounded-2xl bg-slate-800 p-4"><div className="text-sm font-bold text-rose-300">Красные флаги</div><div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{redFlags.map((item) => <div key={item}>• {item}</div>)}</div></div>
                      </Card>
                    </div>
                  </>
                )}
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <h3 className="text-xl font-bold">CRM-чек</h3>
                <div className="mt-2 text-xs text-slate-500">Позиций в чеке: {cart.length}</div>
                <div className="mt-4 space-y-3">
                  {cart.length === 0 ? (
                    <div className="rounded-2xl bg-slate-800 p-4 text-sm text-slate-400">{phoneSection === 'phones' ? 'Выбери модель, ремонт и тип запчасти — позиции появятся здесь.' : 'Для ТВ, кофемашин и принтеров чек не собираем. Здесь задача — грамотно принять технику на диагностику.'}</div>
                  ) : (
                    cart.map((item, index) => <div key={`${item.label}-${index}`} className="rounded-2xl bg-slate-800 p-4"><div className="font-semibold">{item.label}</div><div className="mt-1 text-xs text-slate-400">Закупка: {item.supplierCost} ₽</div><div className="mt-2 text-lg font-bold text-emerald-400">{getEffectiveRetailPrice(item, cart)} ₽</div></div>)
                  )}
                </div>
                <div className="mt-5 rounded-2xl bg-slate-950 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-400"><span>Закупка всего</span><span>{totalSupplier} ₽</span></div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-400"><span>Моржа всего</span><span>{totalMargin} ₽</span></div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3 text-lg font-black"><span>Итоговый чек</span><span className="text-emerald-400">{totalRetail} ₽</span></div>
                </div>
              </Card>
              <Card>
                <h3 className="text-xl font-bold">{phoneSection === 'phones' ? 'Как вести клиента к оплате' : 'Как вести клиента к диагностике'}</h3>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  {phoneSection === 'phones' ? (
                    <>
                      <div className="rounded-2xl bg-slate-800 p-4">Сначала покажи выбор по качеству и цене.</div>
                      <div className="rounded-2xl bg-slate-800 p-4">После выбора основной работы сразу предложи один доп.</div>
                      <div className="rounded-2xl bg-slate-800 p-4">Завершай фразой: “можем сразу закрыть вопрос сегодня”.</div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-2xl bg-slate-800 p-4">Не озвучивай цену и не обещай конкретный ремонт.</div>
                      <div className="rounded-2xl bg-slate-800 p-4">Главная цель — чтобы клиент оставил технику на диагностику.</div>
                      <div className="rounded-2xl bg-slate-800 p-4">Звучать нужно технично, но без гаданий и без окончательного диагноза.</div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2">
              {diagnosticCategories.map((group) => (
                <Card key={group.key}>
                  <h2 className="text-2xl font-bold">{group.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">Типовые поводы не называть цену, а переводить в диагностику.</p>
                  <div className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <div key={item.title} className="rounded-2xl bg-slate-800/80 p-4 text-sm leading-6 text-slate-200">
                        <div className="font-semibold text-cyan-300">{item.title}</div>
                        <div className="mt-2 space-y-1">{item.bullets.map((bullet) => <div key={bullet}>• {bullet}</div>)}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {Object.entries(advancedDiagnosticExamples).map(([key, examples]) => (
                <Card key={key}>
                  <h3 className="text-xl font-bold">Примеры диалога: {key === 'tv' ? 'ТВ' : key === 'coffee' ? 'Кофемашины' : 'Принтеры'}</h3>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">{examples.map((example) => <div key={example} className="rounded-2xl bg-slate-800 p-4">{example}</div>)}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'universal' && (
          <div className="grid gap-6 lg:grid-cols-2">
            {universalBlocks.map((block) => (
              <Card key={block.title}>
                <h3 className="text-xl font-bold text-cyan-300">{block.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-300">{block.bullets.map((b) => <div key={b}>• {b}</div>)}</div>
                <div className="mt-4 rounded-2xl bg-slate-800 p-4 text-sm text-slate-300">{block.script}</div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'psychology' && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {psychologyBlocks.map((item) => <Card key={item.title}><h3 className="text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p></Card>)}
            </div>
            <Card>
              <h3 className="text-2xl font-bold">Глубже по психологии продаж</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">{psychologyExtended.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{item}</div>)}</div>
            </Card>
          </div>
        )}

        {activeTab === 'objections' && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {objectionScripts.map((item) => <Card key={item.objection}><div className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Возражение</div><h3 className="mt-2 text-xl font-bold">{item.objection}</h3><div className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Что отвечать</div><p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p></Card>)}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {objectionExtended.map((item) => <Card key={item.objection}><div className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Ещё возражение</div><h3 className="mt-2 text-xl font-bold">{item.objection}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{item.answer}</p></Card>)}
            </div>
          </div>
        )}

        {activeTab === 'manager' && (
          <div className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <Card>
                <h2 className="text-2xl font-bold">Чек-лист топ-менеджера</h2>
                <div className="mt-5 space-y-3">{managerChecklist.map((item) => <div key={item} className="rounded-2xl bg-slate-800/80 p-4 text-sm text-slate-300">{item}</div>)}</div>
              </Card>
              <Card>
                <h2 className="text-2xl font-bold">Вопросы клиенту</h2>
                <div className="mt-5 space-y-3">{clientQuestions.map((item) => <div key={item} className="rounded-2xl bg-slate-800/80 p-4 text-sm text-slate-300">{item}</div>)}</div>
              </Card>
            </div>

            <Card>
              <h2 className="text-2xl font-bold">Что спросить при приёмке по категориям</h2>
              <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {intakeQuestionsByCategory.map((block) => (
                  <div key={block.title} className="rounded-2xl bg-slate-800/80 p-4">
                    <div className="font-bold text-cyan-300">{block.title}</div>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{block.questions.map((q) => <div key={q}>• {q}</div>)}</div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <Card>
                <h2 className="text-2xl font-bold">Дожим на диагностику</h2>
                <div className="mt-5 space-y-3">{closeScripts.map((item) => <div key={item} className="rounded-2xl bg-slate-800/80 p-4 text-sm text-slate-300"><div>{item}</div><button onClick={() => copyText(item)} className="mt-3 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-black hover:bg-cyan-400">{copiedText === item ? 'Скопировано' : 'Скопировать'}</button></div>)}</div>
              </Card>
              <Card>
                <h2 className="text-2xl font-bold">Если клиент уходит</h2>
                <div className="mt-5 space-y-2">{leaveSignals.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-3 text-sm">⚠️ {item}</div>)}{saveClientScripts.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-3 text-sm">💬 {item}</div>)}</div>
              </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <Card>
                <h2 className="text-2xl font-bold">Опасные клиенты</h2>
                <div className="mt-5 space-y-3">{dangerClients.map((item) => <div key={item.type} className="rounded-2xl bg-slate-800 p-4"><div className="font-bold text-rose-300">{item.type}</div><div className="text-sm text-slate-300 mt-2">{item.whatToSay}</div></div>)}</div>
              </Card>
              <Card>
                <h2 className="text-2xl font-bold">Апселлы</h2>
                <div className="mt-5 space-y-3">{upsellScripts.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-3 text-sm"><div>{item}</div><button onClick={() => copyText(item)} className="mt-3 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-black hover:bg-cyan-400">{copiedText === item ? 'Скопировано' : 'Скопировать'}</button></div>)}</div>
              </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <Card>
                <h2 className="text-2xl font-bold">Обучение за 1 день</h2>
                <div className="mt-5 space-y-3">{oneDayTraining.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-3 text-sm">{item}</div>)}</div>
              </Card>
              <Card>
                <h2 className="text-2xl font-bold">KPI</h2>
                <div className="mt-5 space-y-3">{kpiTips.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-3 text-sm">{item}</div>)}</div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <h2 className="text-2xl font-bold">Типовые ошибки приёмщика</h2>
                <div className="mt-4 space-y-3">{commonReceptionMistakes.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{item}</div>)}</div>
              </Card>
              <Card>
                <h2 className="text-2xl font-bold">Старт для новичка</h2>
                <div className="mt-4 space-y-3">{newbieStartPack.map((item) => <div key={item} className="rounded-2xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">{item}</div>)}</div>
              </Card>
            </div>

            <Card>
              <h2 className="text-2xl font-bold">Как закрывать на действие</h2>
              <div className="mt-5 grid gap-4 lg:grid-cols-3">{closingScriptsByType.map((block) => <div key={block.title} className="rounded-2xl bg-slate-800/80 p-4"><div className="font-bold text-cyan-300">{block.title}</div><div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{block.lines.map((line) => <div key={line}>• {line}</div>)}</div></div>)}</div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold">Реальные кейсы приёмки</h2>
              <div className="mt-5 grid gap-4 lg:grid-cols-3">{realCases.map((item) => <div key={item.device + item.symptom} className="rounded-2xl bg-slate-800/80 p-4 text-sm leading-6 text-slate-300"><div className="font-bold text-cyan-300">{item.device}</div><div className="mt-2"><span className="font-semibold">Симптом:</span> {item.symptom}</div><div className="mt-2"><span className="font-semibold">Что говорить:</span> {item.whatManagerSays}</div><div className="mt-2"><span className="font-semibold">Результат:</span> {item.result}</div><button onClick={() => copyText(item.whatManagerSays)} className="mt-3 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-black hover:bg-cyan-400">{copiedText === item.whatManagerSays ? 'Скопировано' : 'Скопировать фразу'}</button></div>)}</div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold">Режим подсказок: что сказал клиент → что ответить</h2>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">{quickReplyScenarios.map((item) => <div key={item.client} className="rounded-2xl bg-slate-800/80 p-4 text-sm leading-6 text-slate-300"><div className="font-bold text-amber-300">Клиент сказал:</div><div className="mt-1">{item.client}</div><div className="mt-3 font-bold text-cyan-300">Что ответить:</div><div className="mt-1">{item.reply}</div><button onClick={() => copyText(item.reply)} className="mt-3 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-black hover:bg-cyan-400">{copiedText === item.reply ? 'Скопировано' : 'Скопировать ответ'}</button></div>)}</div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">{managerScenarios.map((scenario) => <Card key={scenario.title}><h3 className="text-xl font-bold">{scenario.title}</h3><div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">{scenario.points.map((point) => <div key={point}>• {point}</div>)}</div></Card>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
