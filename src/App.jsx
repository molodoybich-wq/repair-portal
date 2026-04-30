import React from 'react';

const metrics = [
  ['Конверсия в диагностику', '78%', '+6%'],
  ['Средний чек', '18 450 ₽', '+2 150 ₽'],
  ['Средняя маржа', '32%', '+3%'],
  ['Ошибки по обещаниям', '2', '-1'],
  ['Допродажи', '27%', '+5%'],
];

const offers = [
  { title: 'Дешёвое качество', cost: '8 500 ₽', margin: '4 500 ₽ (35%)', price: '13 000 ₽', tag: 'Риск' },
  { title: 'Отличное качество', cost: '11 900 ₽', margin: '6 100 ₽ (34%)', price: '18 000 ₽', tag: 'Оптимально' },
  { title: 'Премиум', cost: '15 900 ₽', margin: '8 100 ₽ (34%)', price: '24 000 ₽', tag: 'Лучший выбор' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-[1800px] grid-cols-[250px_1fr] gap-4 p-4">
        <aside className="neon-panel p-4">
          <div className="mb-6 text-xl font-bold tracking-wide text-cyan-300">REPAIR PORTAL</div>
          {['Главная', 'Телефоны и расчёт', 'Все запчасти', 'Intake Wizard', 'Скрипты', 'Обучение', 'KPI', 'Филиалы', 'Audit Log', 'Настройки'].map((item, i) => (
            <div key={item} className={`mb-2 rounded-xl px-4 py-3 text-sm ${i === 0 ? 'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/40' : 'text-slate-300 hover:bg-slate-800/70'}`}>
              {item}
            </div>
          ))}
        </aside>

        <main className="space-y-4">
          <header className="neon-panel flex items-center justify-between p-4">
            <input className="w-[45%] rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2" placeholder="Поиск по модели (например, iPhone 15 Pro Max)" />
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300">Смена открыта</div>
            <div className="text-right">
              <div className="font-semibold">Анна Петрова</div>
              <div className="text-xs text-slate-400">Приёмщик</div>
            </div>
          </header>

          <section className="grid grid-cols-5 gap-3">
            {metrics.map((m) => (
              <div key={m[0]} className="neon-panel p-3">
                <div className="text-xs text-slate-400">{m[0]}</div>
                <div className="mt-1 text-2xl font-bold">{m[1]}</div>
                <div className="text-emerald-400 text-sm">{m[2]}</div>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-[2fr_1fr] gap-4">
            <div className="neon-panel p-4">
              <h2 className="mb-3 text-xl font-semibold text-cyan-300">1. Телефоны и расчёт</h2>
              <div className="grid grid-cols-3 gap-3">
                {offers.map((o, idx) => (
                  <div key={o.title} className={`rounded-2xl border p-4 ${idx === 1 ? 'border-violet-400/50 bg-violet-500/10' : 'border-slate-700 bg-slate-900/50'}`}>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">{o.title}</h3>
                      <span className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-cyan-300">{o.tag}</span>
                    </div>
                    <div className="space-y-1 text-sm text-slate-300">
                      <div>Закупка: {o.cost}</div>
                      <div>Маржа: {o.margin}</div>
                      <div>Розница: {o.price}</div>
                    </div>
                    <button className="mt-4 w-full rounded-xl bg-cyan-500/20 py-2 text-cyan-200 ring-1 ring-cyan-400/30">+ Добавить в чек</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="neon-panel p-4">
                <h3 className="mb-2 text-lg text-cyan-300">2. Обязательные вопросы</h3>
                {['Было падение', 'Было залитие', 'Дефект плавающий', 'Важны ли данные'].map((q) => (
                  <label key={q} className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    {q}
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-cyan-400" />
                  </label>
                ))}
              </div>
              <div className="neon-panel p-4">
                <h3 className="mb-2 text-lg text-amber-300">4. Что запрещено обещать</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-rose-300">
                  <li>Точную цену по сложному симптому</li>
                  <li>Срок без наличия детали</li>
                  <li>Сохранность Face ID без проверки</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
