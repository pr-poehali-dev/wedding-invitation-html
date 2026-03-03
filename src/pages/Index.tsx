import { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2026-06-20T17:00:00");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold opacity-50" />
      <div className="w-2 h-2 rounded-full bg-gold opacity-70" />
      <div className="w-1.5 h-1.5 rounded-full bg-powder-dark opacity-50" />
      <div className="text-gold opacity-60 text-lg font-cormorant">✦</div>
      <div className="w-1.5 h-1.5 rounded-full bg-powder-dark opacity-50" />
      <div className="w-2 h-2 rounded-full bg-gold opacity-70" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold opacity-50" />
    </div>
  );
}

function LeafPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Top-left botanical */}
      <g opacity="0.08" fill="#C9A96E">
        <ellipse cx="60" cy="80" rx="30" ry="55" transform="rotate(-30 60 80)" />
        <ellipse cx="100" cy="40" rx="20" ry="45" transform="rotate(-60 100 40)" />
        <ellipse cx="30" cy="130" rx="18" ry="40" transform="rotate(10 30 130)" />
        <ellipse cx="130" cy="90" rx="14" ry="35" transform="rotate(-80 130 90)" />
        <line x1="60" y1="80" x2="60" y2="0" stroke="#C9A96E" strokeWidth="1.5" />
        <line x1="100" y1="40" x2="115" y2="-10" stroke="#C9A96E" strokeWidth="1" />
      </g>
      {/* Top-right botanical */}
      <g opacity="0.08" fill="#C9A96E" transform="translate(800,0) scale(-1,1)">
        <ellipse cx="60" cy="80" rx="30" ry="55" transform="rotate(-30 60 80)" />
        <ellipse cx="100" cy="40" rx="20" ry="45" transform="rotate(-60 100 40)" />
        <ellipse cx="30" cy="130" rx="18" ry="40" transform="rotate(10 30 130)" />
        <ellipse cx="130" cy="90" rx="14" ry="35" transform="rotate(-80 130 90)" />
        <line x1="60" y1="80" x2="60" y2="0" stroke="#C9A96E" strokeWidth="1.5" />
      </g>
      {/* Bottom-left */}
      <g opacity="0.06" fill="#E8C4B8" transform="translate(0,600) scale(1,-1)">
        <ellipse cx="50" cy="60" rx="25" ry="50" transform="rotate(-20 50 60)" />
        <ellipse cx="90" cy="30" rx="18" ry="38" transform="rotate(-50 90 30)" />
        <ellipse cx="20" cy="110" rx="15" ry="32" transform="rotate(15 20 110)" />
      </g>
      {/* Bottom-right */}
      <g opacity="0.06" fill="#E8C4B8" transform="translate(800,600) scale(-1,-1)">
        <ellipse cx="50" cy="60" rx="25" ry="50" transform="rotate(-20 50 60)" />
        <ellipse cx="90" cy="30" rx="18" ry="38" transform="rotate(-50 90 30)" />
        <ellipse cx="20" cy="110" rx="15" ry="32" transform="rotate(15 20 110)" />
      </g>
    </svg>
  );
}

export default function Index() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpSent, setRsvpSent] = useState(false);

  const pad = (n: number) => String(n).padStart(2, "0");

  const timeline = [
    { time: "17:00", event: "Торжественная церемония" },
    { time: "18:00", event: "Коктейльный час" },
    { time: "19:00", event: "Праздничный банкет" },
    { time: "21:00", event: "Первый танец молодожёнов" },
    { time: "22:00", event: "Вечерняя программа и дискотека" },
  ];

  return (
    <div className="min-h-screen bg-ivory font-montserrat text-text overflow-x-hidden">

      {/* ---- HERO ---- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        {/* Фон с акварельным градиентом */}
        <div className="absolute inset-0 bg-gradient-to-b from-blush via-ivory to-ivory-dark" />
        {/* Ботанический SVG узор */}
        <LeafPattern />
        {/* Золотой оверлей */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(201,169,110,0.08)_0%,transparent_60%)]" />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold mb-6 opacity-0 animate-fade-up">
            Мы приглашаем вас разделить с нами
          </p>
          <h1 className="font-cormorant text-7xl md:text-9xl font-light text-text leading-none mb-4 opacity-0 animate-fade-up-delay">
            Артур
            <span className="block text-gold italic font-extralight">&amp;</span>
            Марина
          </h1>

          <div className="w-0 h-px bg-gold mx-auto my-6 animate-line-grow" style={{ width: undefined }} />

          <p className="font-cormorant text-2xl md:text-3xl italic text-text-light opacity-0 animate-fade-up-delay2 font-light">
            20 июня 2026 года
          </p>
          <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-gold-dark mt-2 opacity-0 animate-fade-up-delay3">
            Ресторан «Империалъ» · Николо-Березовка
          </p>

          <div className="mt-10 opacity-0 animate-fade-up-delay3">
            <button
              onClick={() => setRsvpOpen(true)}
              className="inline-block border border-gold text-gold hover:bg-gold hover:text-ivory font-montserrat text-xs tracking-[0.3em] uppercase px-10 py-4 transition-all duration-500"
            >
              Подтвердить присутствие
            </button>
          </div>
        </div>

        {/* Scroll arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <Icon name="ChevronDown" size={24} className="text-gold" />
        </div>
      </section>

      {/* ---- ТАЙМЕР ---- */}
      <section className="py-20 px-6 bg-ivory-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.07)_0%,transparent_70%)]" />
        <Section className="max-w-3xl mx-auto text-center relative z-10">
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold mb-8">До торжества осталось</p>
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {[
              { val: pad(days), label: "дней" },
              { val: pad(hours), label: "часов" },
              { val: pad(minutes), label: "минут" },
              { val: pad(seconds), label: "секунд" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="relative">
                  <span className="font-cormorant text-5xl md:text-7xl font-light text-text leading-none">{val}</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-px bg-gold opacity-40" />
                </div>
                <span className="font-montserrat text-xs tracking-[0.2em] uppercase text-gold-dark mt-3">{label}</span>
              </div>
            ))}
          </div>
          <GoldDivider />
          <p className="font-cormorant text-xl italic text-text-light font-light">
            Каждая секунда приближает нас к самому важному дню
          </p>
        </Section>
      </section>

      {/* ---- ДАТА И МЕСТО ---- */}
      <section className="py-20 px-6 bg-ivory">
        <Section className="max-w-2xl mx-auto text-center">
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold mb-6">Дата и место</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-text mb-10">Детали торжества</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="flex flex-col items-center gap-3 p-6 border border-gold-light">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
                <Icon name="Calendar" size={18} className="text-gold" />
              </div>
              <p className="font-montserrat text-xs tracking-widest uppercase text-gold">Дата</p>
              <p className="font-cormorant text-2xl font-light text-text">20 июня 2026</p>
              <p className="font-montserrat text-xs text-text-light">суббота</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 border border-gold-light">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
                <Icon name="Clock" size={18} className="text-gold" />
              </div>
              <p className="font-montserrat text-xs tracking-widest uppercase text-gold">Время</p>
              <p className="font-cormorant text-2xl font-light text-text">17:00</p>
              <p className="font-montserrat text-xs text-text-light">начало церемонии</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 border border-gold-light">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
                <Icon name="MapPin" size={18} className="text-gold" />
              </div>
              <p className="font-montserrat text-xs tracking-widest uppercase text-gold">Место</p>
              <p className="font-cormorant text-2xl font-light text-text">Империалъ</p>
              <p className="font-montserrat text-xs text-text-light">Николо-Березовка</p>
            </div>
          </div>
        </Section>
      </section>

      {/* ---- ИСТОРИЯ ЛЮБВИ ---- */}
      <section className="py-20 px-6 bg-blush relative overflow-hidden">
        <LeafPattern />
        <Section className="max-w-2xl mx-auto text-center relative z-10">
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold mb-6">История нашей любви</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-text mb-10">Наш путь</h2>
          <GoldDivider />

          <div className="space-y-10 text-left mt-8">
            {[
              { year: "2019", icon: "Heart", title: "Первая встреча", desc: "Мы встретились в один обычный осенний вечер, который изменил всё. Взгляды пересеклись — и мир стал другим." },
              { year: "2021", icon: "Star", title: "Первое путешествие", desc: "Вместе мы открыли для себя, что лучший маршрут — тот, что пройден рядом. Санкт-Петербург стал нашим городом." },
              { year: "2024", icon: "Gem", title: "Предложение", desc: "На закате, у берега реки, Артур встал на колено. Марина сказала «да» ещё до того, как он закончил фразу." },
              { year: "2026", icon: "Sparkles", title: "Наша свадьба", desc: "Теперь мы зовём вас разделить с нами этот день — самый важный в нашей жизни." },
            ].map(({ year, icon, title, desc }, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-ivory">
                    <Icon name={icon} fallback="Star" size={16} className="text-gold" />
                  </div>
                  {i < 3 && <div className="w-px flex-1 bg-gold-light mt-2" style={{ height: 40 }} />}
                </div>
                <div className="pb-6">
                  <span className="font-montserrat text-xs tracking-widest text-gold uppercase">{year}</span>
                  <h3 className="font-cormorant text-2xl font-light text-text mt-1">{title}</h3>
                  <p className="font-montserrat text-sm text-text-light leading-relaxed mt-2">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* ---- ПРОГРАММА ---- */}
      <section className="py-20 px-6 bg-ivory-dark">
        <Section className="max-w-2xl mx-auto text-center">
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold mb-6">Программа</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-text mb-10">Расписание дня</h2>
          <GoldDivider />

          <div className="mt-8 space-y-0">
            {timeline.map(({ time, event }, i) => (
              <div key={i} className="flex items-center gap-6 py-5 border-b border-gold-light last:border-0">
                <span className="font-cormorant text-3xl font-light text-gold w-20 flex-shrink-0 text-right">{time}</span>
                <div className="w-px h-8 bg-gold opacity-40" />
                <span className="font-montserrat text-sm text-text-light text-left">{event}</span>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* ---- ДРЕСС-КОД ---- */}
      <section className="py-20 px-6 bg-ivory">
        <Section className="max-w-2xl mx-auto text-center">
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold mb-6">Дресс-код</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-text mb-4">Dress Code</h2>
          <p className="font-cormorant text-2xl italic text-text-light font-light mb-10">Классика и элегантность</p>
          <GoldDivider />

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="p-8 border border-gold-light bg-blush/30">
              <p className="font-montserrat text-xs tracking-widest uppercase text-gold mb-4">Для гостей</p>
              <p className="font-cormorant text-3xl font-light text-text mb-3">Вечерний наряд</p>
              <p className="font-montserrat text-sm text-text-light leading-relaxed">
                Просим вас придерживаться нежной цветовой палитры: слоновая кость, пастельные тона, золото.
                Избегайте белого и чёрного.
              </p>
            </div>
            <div className="p-8 border border-gold-light bg-ivory-dark/50">
              <p className="font-montserrat text-xs tracking-widest uppercase text-gold mb-4">Рекомендации</p>
              <ul className="space-y-2 text-left">
                {["Вечерние платья и костюмы", "Пастельные и нежные оттенки", "Классические украшения", "Удобная обувь для танцев"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-montserrat text-sm text-text-light">
                    <span className="text-gold text-xs">✦</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </section>

      {/* ---- ПОДАРКИ ---- */}
      <section className="py-20 px-6 bg-blush relative overflow-hidden">
        <LeafPattern />
        <Section className="max-w-2xl mx-auto text-center relative z-10">
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold mb-6">Подарки</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-text mb-10">Пожелания</h2>
          <GoldDivider />
          <div className="max-w-lg mx-auto mt-8 p-10 border border-gold-light bg-ivory/70 backdrop-blur">
            <Icon name="Gift" size={32} className="text-gold mx-auto mb-6" />
            <p className="font-cormorant text-2xl font-light text-text mb-4 italic">
              «Ваше присутствие — лучший подарок»
            </p>
            <p className="font-montserrat text-sm text-text-light leading-relaxed">
              Если вы хотите сделать нам подарок, мы будем рады денежному сертификату на путешествие или вклад в наш совместный старт. Реквизиты уточните у организатора.
            </p>
          </div>
        </Section>
      </section>

      {/* ---- КОНТАКТЫ ---- */}
      <section className="py-20 px-6 bg-ivory-dark">
        <Section className="max-w-2xl mx-auto text-center">
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold mb-6">Контакты</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-text mb-10">Свяжитесь с нами</h2>
          <GoldDivider />

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-8 border border-gold-light text-center">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mx-auto mb-4">
                <Icon name="Phone" size={20} className="text-gold" />
              </div>
              <p className="font-montserrat text-xs tracking-widest uppercase text-gold mb-2">Организатор</p>
              <p className="font-cormorant text-2xl font-light text-text">Ольга</p>
              <a href="tel:+79001234567" className="font-montserrat text-sm text-text-light hover:text-gold transition-colors">
                +7 (900) 123-45-67
              </a>
            </div>
            <div className="p-8 border border-gold-light text-center">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageCircle" size={20} className="text-gold" />
              </div>
              <p className="font-montserrat text-xs tracking-widest uppercase text-gold mb-2">Молодожёны</p>
              <p className="font-cormorant text-2xl font-light text-text">Артур и Марина</p>
              <a href="mailto:wedding@example.com" className="font-montserrat text-sm text-text-light hover:text-gold transition-colors">
                wedding@example.com
              </a>
            </div>
          </div>
        </Section>
      </section>

      {/* ---- RSVP CTA ---- */}
      <section className="py-24 px-6 bg-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-blush/30 to-ivory" />
        <LeafPattern />
        <Section className="max-w-xl mx-auto text-center relative z-10">
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold mb-6">RSVP</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-text mb-4">Будете ли вы?</h2>
          <p className="font-cormorant text-xl italic text-text-light mb-10 font-light">
            Просим подтвердить присутствие до 1 июня 2026 года
          </p>
          <button
            onClick={() => setRsvpOpen(true)}
            className="inline-block bg-gold text-ivory hover:bg-gold-dark font-montserrat text-xs tracking-[0.3em] uppercase px-12 py-5 transition-all duration-500 hover:shadow-lg"
          >
            Подтвердить присутствие
          </button>
        </Section>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="py-12 px-6 bg-text text-center">
        <p className="font-cormorant text-3xl font-light text-gold italic mb-2">Артур &amp; Марина</p>
        <p className="font-montserrat text-xs tracking-widest uppercase text-powder/50">20 · 06 · 2026</p>
        <div className="mt-6 flex justify-center gap-2 items-center opacity-30">
          <div className="w-8 h-px bg-gold" />
          <span className="text-gold text-xs">✦</span>
          <div className="w-8 h-px bg-gold" />
        </div>
      </footer>

      {/* ---- RSVP MODAL ---- */}
      {rsvpOpen && (
        <div
          className="fixed inset-0 bg-text/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={(e) => e.target === e.currentTarget && setRsvpOpen(false)}
        >
          <div className="bg-ivory max-w-md w-full p-10 relative animate-scale-in">
            <button
              onClick={() => setRsvpOpen(false)}
              className="absolute top-4 right-4 text-text-light hover:text-gold transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {rsvpSent ? (
              <div className="text-center py-6">
                <Icon name="Heart" size={40} className="text-gold mx-auto mb-4" />
                <h3 className="font-cormorant text-4xl font-light text-text mb-3">Спасибо!</h3>
                <p className="font-montserrat text-sm text-text-light">
                  Мы рады, что вы будете с нами, {rsvpName}!
                </p>
              </div>
            ) : (
              <>
                <p className="font-montserrat text-xs tracking-widest uppercase text-gold mb-4">RSVP</p>
                <h3 className="font-cormorant text-4xl font-light text-text mb-2">Ваш ответ</h3>
                <p className="font-montserrat text-xs text-text-light mb-8">Подтвердите участие в нашем торжестве</p>
                <GoldDivider />
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="font-montserrat text-xs tracking-widest uppercase text-gold-dark block mb-2">Ваше имя</label>
                    <input
                      type="text"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Иван Иванов"
                      className="w-full border border-gold-light bg-transparent px-4 py-3 font-montserrat text-sm text-text placeholder:text-text-light/50 outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-xs tracking-widest uppercase text-gold-dark block mb-2">Количество гостей</label>
                    <select className="w-full border border-gold-light bg-ivory px-4 py-3 font-montserrat text-sm text-text outline-none focus:border-gold transition-colors">
                      <option>1 — только я</option>
                      <option>2 — я и партнёр</option>
                      <option>3</option>
                      <option>4 и более</option>
                    </select>
                  </div>
                  <button
                    onClick={() => { if (rsvpName.trim()) setRsvpSent(true); }}
                    className="w-full bg-gold text-ivory hover:bg-gold-dark font-montserrat text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 mt-4"
                  >
                    Подтвердить
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}