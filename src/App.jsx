import React, { useMemo, useState } from 'react';

const kpis = [
  { title: 'Конверсия в диагностику', value: '78%', delta: '+6%' },
  { title: 'Средний чек', value: '18 450 ₽', delta: '+2 150 ₽' },
  { title: 'Средняя маржа', value: '32%', delta: '+3%' },
  { title: 'Ошибки по обещаниям', value: '2', delta: '-1' },
  { title: 'Допродажи', value: '27%', delta: '+5%' },
const scripts = ['Хочет только цену', 'Дорого', 'Спешит', 'Был в другом сервисе', 'Сравнивает с конкурентом'];
const parts = [
  { model: 'iPhone 15 Pro Max', part: 'Дисплейный модуль', quality: 'Отличное', cost: '11 900 ₽', margin: '34%', retail: '18 000 ₽', stock: '12 шт.' },
  { model: 'iPhone 15 Pro Max', part: 'Аккумулятор', quality: 'Премиум', cost: '4 900 ₽', margin: '33%', retail: '6 500 ₽', stock: '8 шт.' },
  { model: 'Samsung S23 Ultra', part: 'Задняя крышка', quality: 'Оригинал', cost: '—', margin: '—', retail: '—', stock: 'Нет цены' },
const offers = [
  { name: 'Дешёвое качество', risk: 'Риск', purchase: '8 500 ₽', retail: '13 000 ₽', margin: '4 500 ₽ (35%)' },
  { name: 'Отличное качество', risk: 'Оптимально', purchase: '11 900 ₽', retail: '18 000 ₽', margin: '6 100 ₽ (34%)' },
  { name: 'Премиум', risk: 'Лучший выбор', purchase: '15 900 ₽', retail: '24 000 ₽', margin: '8 100 ₽ (34%)' },
function Panel({ title, right, children, className = '' }) {
  return (
    <section className={`rp-panel ${className}`}>
      {(title || right) && (
        <header className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cyan-200">{title}</h3>
          {right}
        </header>
      )}
      {children}
    </section>
  );
export default function App() {
  const [query, setQuery] = useState('iPhone 15 Pro Max');
  const [answers] = useState({ fall: true, water: false, service: false, unstable: true, data: true });
  const risk = useMemo(() => {
    if (answers.water) return 'high';
    if (answers.unstable || answers.fall) return 'medium';
    return 'low';
  }, [answers]);
    <div className="rp-bg min-h-screen text-slate-100">
      <div className="mx-auto grid max-w-[1900px] grid-cols-[240px_1fr] gap-4 p-4">
        <aside className="rp-panel p-4">
          <div className="mb-6 text-xl font-bold tracking-wide text-cyan-300">REPAIR PORTAL</div>
          {['Главная', 'Телефоны и расчёт', 'Все запчасти', 'Intake Wizard', 'Скрипты', 'Обучение', 'KPI', 'Филиалы', 'Audit Log', 'Настройки'].map((item, i) => (
            <button key={item} className={`mb-2 w-full rounded-xl px-3 py-2 text-left text-sm ${i === 0 ? 'bg-cyan-500/20 text-cyan-100 ring-1 ring-cyan-300/40' : 'text-slate-300 hover:bg-slate-800/60'}`}>
              {item}
            </button>
          ))}
        </aside>

        <main className="space-y-4">
          <Panel>
            <div className="flex items-center gap-3">
              <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3" />
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">Смена открыта</div>
              <div className="rounded-xl border border-slate-700 px-4 py-2 text-sm"><div>Анна Петрова</div><div className="text-xs text-slate-400">Приёмщик</div></div>
          </Panel>

          <div className="grid grid-cols-5 gap-3">
            {kpis.map((item) => (
              <Panel key={item.title} className="p-3">
                <div className="text-xs text-slate-400">{item.title}</div>
                <div className="mt-1 text-2xl font-bold">{item.value}</div>
                <div className="text-sm text-emerald-300">{item.delta}</div>
              </Panel>
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <Panel title="1. Телефоны и расчёт">
              <div className="grid grid-cols-3 gap-3">
                {offers.map((o, idx) => (
                  <div key={o.name} className={`rounded-2xl border p-3 ${idx === 1 ? 'border-violet-400/40 bg-violet-500/10' : 'border-slate-700 bg-slate-900/40'}`}>
                    <div className="mb-2 flex items-center justify-between"><div className="font-semibold">{o.name}</div><span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-cyan-200">{o.risk}</span></div>
                    <div className="space-y-1 text-sm text-slate-300">
                      <div>Закупка: {o.purchase}</div><div>Маржа: {o.margin}</div><div>Розница: {o.retail}</div>
                    <button className="mt-3 w-full rounded-lg border border-cyan-400/30 bg-cyan-500/10 py-2 text-cyan-200">+ Добавить в чек</button>
                ))}
            </Panel>
            <div className="space-y-4">
              <Panel title="2. Обязательные вопросы">
                <div className="space-y-2 text-sm">
                  <div>Было падение: {answers.fall ? 'Да' : 'Нет'}</div>
                  <div>Было залитие: {answers.water ? 'Да' : 'Нет'}</div>
                  <div>Был другой сервис: {answers.service ? 'Да' : 'Нет'}</div>
                  <div>Дефект плавающий: {answers.unstable ? 'Да' : 'Нет'}</div>
                  <div>Важны ли данные: {answers.data ? 'Да' : 'Нет'}</div>
              </Panel>
              <Panel title="3. Индикатор риска заказа">
                <div className={`rounded-xl p-3 text-center font-semibold ${risk === 'high' ? 'bg-rose-500/20 text-rose-200' : risk === 'medium' ? 'bg-amber-500/20 text-amber-200' : 'bg-emerald-500/20 text-emerald-200'}`}>
                  {risk === 'high' ? 'Только диагностика' : risk === 'medium' ? 'Риск скрытых дефектов' : 'Понятная модулька'}
              </Panel>
              <Panel title="4. Что запрещено обещать">
                <ul className="list-disc space-y-1 pl-5 text-sm text-rose-300">
                  <li>Точную цену по сложному симптому</li><li>Срок без наличия детали</li><li>Face ID / True Tone без проверки</li>
                </ul>
              </Panel>
          <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-4">
            <Panel title="5. Готовые скрипты в 1 клик">
              <div className="mb-3 flex flex-wrap gap-2">{scripts.map((s) => <button key={s} className="rounded-lg border border-slate-700 px-3 py-1 text-sm hover:bg-slate-800/70">{s}</button>)}</div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-3 text-sm text-slate-300">Понимаю, вам важно сориентироваться по цене. Для точного расчёта нужно провести диагностику — это бесплатно и займет 10–15 минут.</div>
            </Panel>
            <Panel title="6. Что продать дополнительно"><ul className="space-y-2 text-sm text-slate-300"><li>Защитное стекло / плёнка +1 500 ₽</li><li>Защитный чехол +990 ₽</li><li>Чистка динамика +1 300 ₽</li></ul></Panel>
            <Panel title="8. Личная заметка приёмщика"><textarea className="h-28 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-sm" defaultValue="Клиент постоянный, попросил аккуратно с True Tone." /></Panel>
          <Panel title="9. Все запчасти" right={<button className="rounded-lg border border-cyan-400/40 px-3 py-1 text-sm text-cyan-200">Экспорт Excel</button>}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-slate-400"><tr><th>Модель</th><th>Тип</th><th>Качество</th><th>Закупка</th><th>Маржа</th><th>Розница</th><th>Остаток</th></tr></thead>
                <tbody>{parts.map((row) => <tr key={row.part} className="border-t border-slate-800"><td className="py-2">{row.model}</td><td>{row.part}</td><td>{row.quality}</td><td>{row.cost}</td><td>{row.margin}</td><td>{row.retail}</td><td>{row.stock}</td></tr>)}</tbody>
          </Panel>
        </main>
