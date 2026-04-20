// GRAVITATE OSAKA — GODA BRIDGE LP (P0 spec implementation)
window.track = window.track || function(e,p){
  if(window.dataLayer) window.dataLayer.push({event:e,...(p||{})});
  if(window.fbq) window.fbq('trackCustom',e,p||{});
};

const { useState, useEffect, useRef, useMemo } = React;

// ============================================================
// SVG Icon set
// ============================================================
const Icon = {
  footprints:(p)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 16s-1-3 0-5 3-2 4 0 1 5-1 6-3-1-3-1z"/><path d="M16 8s-1-3 0-5 3-2 4 0 1 5-1 6-3-1-3-1z"/><circle cx="5" cy="11" r="1"/><circle cx="8" cy="9" r="1"/><circle cx="11" cy="10" r="1"/><circle cx="17" cy="3" r="1"/><circle cx="20" cy="5" r="1"/></svg>,
  wind:(p)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9.5 4.5A2.5 2.5 0 1 1 12 7H2"/><path d="M14 14.5a2.5 2.5 0 1 0 2.5 2.5H2"/><path d="M17.5 8a3 3 0 1 1 3 3h-20"/></svg>,
  heart:(p)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 14c1.5-1.5 3-3.5 3-6a4.5 4.5 0 0 0-9 0 4.5 4.5 0 0 0-9 0c0 2.5 1.5 4.5 3 6l6 6Z"/></svg>,
  phone:(p)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="5" y="2" width="14" height="20" rx="2.5"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  check:(p)=><svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" {...p}><path d="M8 13.5L4.5 10l-1.5 1.5L8 16.5 17 7.5 15.5 6z"/></svg>,
  cross:(p)=><svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" {...p}><path d="M14.4 4.6 10 9l-4.4-4.4-1.4 1.4L8.6 10l-4.4 4.4 1.4 1.4L10 11.4l4.4 4.4 1.4-1.4L11.4 10l4.4-4.4z"/></svg>,
  arrow:(p)=><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  play:(p)=><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...p}><polygon points="6 4 20 12 6 20 6 4"/></svg>,
  eye:(p)=><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>,
  clock:(p)=><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  scream:(p)=><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 8a6 6 0 0 0-9.33-5"/><path d="m10.67 21.33 1.24-1.24a6 6 0 0 0 8.48-8.48"/><path d="M12 16h.01"/><path d="M8 12h.01"/></svg>,
  camera:(p)=><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"/><circle cx="12" cy="13" r="3"/></svg>,
  users:(p)=><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  star:(p)=><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  chevronLeft:(p)=><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="15 18 9 12 15 6"/></svg>,
  chevronRight:(p)=><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="9 18 15 12 9 6"/></svg>,
  close:(p)=><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  mapPin:(p)=><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  line:(p)=><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...p}><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>,
};

// ============================================================
// Hooks
// ============================================================
function useLiveTime(){
  const [t, setT] = useState(()=>{
    const d = new Date();
    return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
  });
  useEffect(()=>{
    const id = setInterval(()=>{
      const d = new Date();
      setT(String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'));
    }, 15000);
    return ()=>clearInterval(id);
  },[]);
  return t;
}
function useViewers(){
  const [n, setN] = useState(14);
  useEffect(()=>{
    const id = setInterval(()=>setN(v=>Math.max(8,Math.min(24,v+Math.floor(Math.random()*5)-2))),4200);
    return ()=>clearInterval(id);
  },[]);
  return n;
}
function useCountdown(targetHour){
  const [secs, setSecs] = useState(()=>{
    const now = new Date();
    const t = new Date(now); t.setHours(targetHour,0,0,0);
    if(t<=now) t.setDate(t.getDate()+1);
    return Math.floor((t-now)/1000);
  });
  useEffect(()=>{
    const id = setInterval(()=>setSecs(s=>Math.max(0,s-1)),1000);
    return ()=>clearInterval(id);
  },[]);
  const fmt = v=>String(v).padStart(2,'0');
  return {h:Math.floor(secs/3600),m:Math.floor((secs%3600)/60),s:secs%60,fmt};
}
function useCalDays(count){
  return useMemo(()=>{
    const base = new Date();
    const wd = ['日','月','火','水','木','金','土'];
    const stocks = [2,5,3,8,8,4,1,6];
    return Array.from({length:count}).map((_,i)=>{
      const d = new Date(base); d.setDate(base.getDate()+i);
      return {wd:wd[d.getDay()],day:d.getDate(),stock:stocks[i]||5,low:(stocks[i]||5)<=3};
    });
  },[]);
}

// ============================================================
// ScrollProgress
// ============================================================
function ScrollProgress(){
  const [w,setW]=useState(0);
  useEffect(()=>{
    const on=()=>{
      const h=document.documentElement;
      const max=h.scrollHeight-h.clientHeight;
      setW(max>0?h.scrollTop/max*100:0);
    };
    window.addEventListener('scroll',on,{passive:true});
    return ()=>window.removeEventListener('scroll',on);
  },[]);
  return <div className="scroll-progress" style={{width:w+'%'}}/>;
}

// ============================================================
// Header
// ============================================================
function Header(){
  return (
    <header className="site-header">
      <div className="site-header__logo">GRAVITATE OSAKA</div>
      <button className="site-header__cta" onClick={()=>{window.openBooking('swing');window.track('cta_click',{plan:'swing',location:'header'});}}>
        <span className="full">日程を選ぶ</span>
        <span className="short">予約</span>
        <Icon.arrow width="14" height="14"/>
      </button>
    </header>
  );
}

// ============================================================
// Hero
// ============================================================
function Hero(){
  const viewers=useViewers();
  const calDays=useCalDays(5);
  const noMotion=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero__bg">
        {noMotion
          ?<img src="images/aerial-01.jpg" alt=""/>
          :<><video autoPlay muted loop playsInline poster="images/aerial-01.jpg" className="hero__video"/><img className="hero__bg-img" src="images/aerial-01.jpg" alt=""/></>
        }
      </div>
      <div className="hero__inner">
        <p className="hero__kicker">大阪駅から60分、大阪府茨木市</p>
        <h1 className="hero__title">
          渡った人だけが、<br/>
          <span className="accent">知っている。</span>
        </h1>
        <p className="hero__sub">
          日本最長 <strong>420m</strong>・高さ <strong>55m</strong>。<br/>
          大阪・安威川ダム湖上の吊り橋体験、4種類。
        </p>
        <button className="hero__cta" onClick={()=>{window.openBooking('swing');window.track('cta_click',{plan:'swing',location:'hero'});}}>
          <span className="hero__cta-price">￥1,500～</span>
          <span className="hero__cta-sep"/>
          <span>
            <span>日程を選ぶ →</span>
            <div className="hero__cta-meta">当日キャンセル無料</div>
          </span>
          <Icon.arrow/>
        </button>
        <div className="hero__badge-groups">
          <div className="hero__badge-group">
            <div className="hero__badge-group-label">実績</div>
            <div className="hero__badges">
              <span className="hero__badge hot"><span className="dot"/>TikTok 860万再生</span>
              <span className="hero__badge">じゃらん 4.9★</span>
              <span className="hero__badge">Google 4.7★</span>
            </div>
          </div>
          <div className="hero__badge-group">
            <div className="hero__badge-group-label">スペック</div>
            <div className="hero__badges">
              <span className="hero__badge">全長 420m 日本最長</span>
              <span className="hero__badge">高さ 55m</span>
              <span className="hero__badge">4プラン</span>
            </div>
          </div>
          <div className="hero__badge-group">
            <div className="hero__badge-group-label">安心</div>
            <div className="hero__badges">
              <span className="hero__badge">当日キャンセル無料</span>
              <span className="hero__badge">現地払いOK</span>
              <span className="hero__badge">雨天100%返金</span>
            </div>
          </div>
        </div>
      </div>
      <aside className="hero__proof">
        <div className="hero__proof-head">
          <span className="hero__proof-live">LIVE</span>
          <span>今日の予約状況</span>
        </div>
        <div className="hero__proof-num"><span>残り 2</span><span className="d">/ 20枠</span></div>
        <div className="hero__proof-bar"><div style={{width:'90%'}}/></div>
        <div className="hero__proof-sub">ブリッジスイング・本日分</div>
        <div className="hero__proof-cal">
          {calDays.map((d,i)=>(
            <button key={i} className={`hero__cal-day ${d.low?'low':''}`} onClick={()=>window.openBooking('swing')}>
              <span className="hero__cal-wd">{d.wd}</span>
              <span className="hero__cal-d">{i===0?'今':d.day}</span>
              <span className="hero__cal-s">残{d.stock}</span>
            </button>
          ))}
        </div>
        <div className="hero__proof-viewers">
          <Icon.eye/>
          <span>いま <b>{viewers}人</b> が検討中</span>
        </div>
      </aside>
    </section>
  );
}

// ============================================================
// WhatIs
// ============================================================
function WhatIs(){
  const cards=[
    {ico:<Icon.mapPin/>,title:'場所',items:['大阪府茨木市','最寄り駅から無料送迎','大阪駅から車60分']},
    {ico:<Icon.users/>,title:'対象',items:['8歳～シニアまで','グループ・一人・カップル','高所恐怤症も静割完走']},
    {ico:<Icon.check/>,title:'料金',items:['￥1,500～￥12,800','現地払いOK','雨天全額返金']},
  ];
  return (
    <section className="whatis" data-screen-label="WhatIs">
      <div className="whatis__inner">
        <p className="label">WHAT IS GRAVITATE?</p>
        <h2 className="h2">その動画、<em>大阪で体験できます。</em></h2>
        <p className="whatis__sub">TikTokで860万回再生されたのは、大阪府茨木市にある安威川ダムの吊り橋でした。</p>
        <div className="whatis__grid">
          {cards.map((c,i)=>(
            <div key={i} className="whatis__card">
              <div className="whatis__ico">{c.ico}</div>
              <h3 className="whatis__title">{c.title}</h3>
              <ul className="whatis__list">
                {c.items.map((item,j)=><li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Marquee
// ============================================================
function Marquee(){
  const items=['TikTok 860万回再生','日本最長 420m','じゃらん 4.9★','Google口コミ 4.7★','アソビュー 人気NO.1','高さ 55m'];
  const doubled=[...items,...items];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {doubled.map((t,i)=><span key={i} className="marquee__item">{t}</span>)}
      </div>
    </div>
  );
}

// ============================================================
// Imagine
// ============================================================
function Imagine(){
  const stepsRef=useRef([]);
  const [active,setActive]=useState(0);
  useEffect(()=>{
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{if(e.isIntersecting)setActive(Number(e.target.dataset.step));});
    },{rootMargin:'-40% 0px -40% 0px',threshold:0});
    stepsRef.current.forEach(el=>el&&io.observe(el));
    return ()=>io.disconnect();
  },[]);
  const steps=[
    {ico:<Icon.footprints/>,text:<>55m上空。足元は、<em>翡翠色のダム湖</em>。</>,img:'images/walk-03.jpg'},
    {ico:<Icon.wind/>,text:<>風の音と、自分の鼓動と、<em>誰かの笑い声。</em></>,img:'images/walk-02.jpg'},
    {ico:<Icon.heart/>,text:<>最初の一歩で、<em>全部、静かになる。</em></>,img:'images/swing-01.jpg'},
    {ico:<Icon.phone/>,text:<>撮った動画を、<em>もう一度見たくなる。</em></>,img:'images/climb-top-01.jpg'},
  ];
  return (
    <section className="imagine" data-screen-label="02 Imagine">
      <div className="imagine__head">
        <p className="label">IMAGINE</p>
        <h2 className="h2">想像してみてください。</h2>
      </div>
      <div className="imagine__stage">
        <div className="imagine__sticky">
          {steps.map((s,i)=><img key={i} className={`imagine__img ${active===i?'active':''}`} src={s.img} alt=""/>)}
        </div>
        <div className="imagine__text">
          {steps.map((s,i)=>(
            <div key={i} data-step={i} ref={el=>stepsRef.current[i]=el} className={`imagine__line ${active===i?'active':''}`}>
              <span className="imagine__ico">{s.ico}</span>
              <div>{s.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="imagine__close">
        ——その景色は、<b>渡った人だけ</b>が覚えている。
      </div>
    </section>
  );
}

// ============================================================
// Hook
// ============================================================
function Hook(){
  const nums=[
    {n:'860',u:'万',l:'TikTok再生数',fn:1},
    {n:'420',u:'m',l:'橋の全長 (日本最長)',fn:2},
    {n:'98',u:'%',l:'「また来たい」回答率',fn:3},
    {n:'17',u:'枠',l:'今週末の残枠',fn:4},
  ];
  return (
    <section className="hook" data-screen-label="03 Numbers">
      <div className="hook__head">
        <p className="label">THE NUMBERS</p>
        <h2 className="h2">TikTokが選んだのは、<em>この橋だけ。</em></h2>
      </div>
      <div className="hook__grid">
        {nums.map((x,i)=>(
          <div key={i} className="hook__cell">
            <div className="hook__num">{x.n}<em>{x.u}</em></div>
            <div className="hook__label">{x.l}<sup>※{x.fn}</sup></div>
          </div>
        ))}
      </div>
      <p className="hook__caption">設計でも歴史でもなく——<em>人間の本気の表情</em>だった。</p>
      <div className="hook__footnotes">
        <span>※1 TikTok公式アカウント 2024年3月投稿</span>
        <span>※2 国土交通省 歩道橋台帳 2023年</span>
        <span>※3 2025年1–3月来場者アンケート n=412</span>
        <span>※4 2026年4月第1週時点の週次予約数</span>
      </div>
    </section>
  );
}

// ============================================================
// Menu
// ============================================================
const PLANS=[
  {key:'walk',img:'images/walk-02.jpg',kicker:'BRIDGE WALK',name:'ブリッジウォーク',badges:[{t:'初心者OK'}],hook:<>怖かったら戻ってOK。でも、<em>戻った人はゼロ。</em></>,price:1500,time:45,age:'小学生～',stock:8,meter:{scream:1,scenic:3,couple:2}},
  {key:'swing',img:'images/swing-01.jpg',kicker:'BRIDGE SWING',name:'ブリッジスイング',badges:[{t:'最人気',c:'orange'},{t:'TikTok'}],hook:<>絶叫してる側か、<em>撮ってる側か。</em>選んでください。</>,price:3800,time:20,age:'16歳～',stock:2,hot:true,meter:{scream:5,scenic:5,couple:5}},
  {key:'climb',img:'images/climb-top-01.jpg',kicker:'BRIDGE CLIMB',name:'ブリッジクライム',badges:[{t:'絶景'}],hook:<>見下ろすのは、<em>大阪平野の全部。</em></>,price:6800,time:60,age:'15歳～',stock:5,meter:{scream:3,scenic:5,couple:3}},
  {key:'jump',img:'images/bungee-01.jpg',kicker:'BRIDGE BUNGEE',name:'ブリッジバンジー',badges:[{t:'絶叫'}],hook:<>3秒で、<em>人生を思い出す。</em></>,price:12800,time:30,age:'18～55歳',stock:4,meter:{scream:5,scenic:3,couple:2}},
];

function Meter({v,max=5}){
  return <span className="mcard__meter-dots">{Array.from({length:max}).map((_,i)=><span key={i} className={i<v?'on':''}/>)}</span>;
}

function PlanCard({p}){
  const handleClick=()=>{window.openBooking(p.key);window.track('cta_click',{plan:p.key,location:'menu_card'});};
  return (
    <article className={`mcard ${p.hot?'hot':''}`}>
      <div className="mcard__media" onClick={handleClick} style={{cursor:'pointer'}}>
        <img src={p.img} alt={p.name} loading="lazy"/>
        <div className="mcard__badges">
          {p.badges.map((b,i)=><span key={i} className={`mcard__badge ${b.c||''}`}>{b.t}</span>)}
        </div>
        <div className={`mcard__stock-badge ${p.stock<=3?'low':''}`}>残 {p.stock}</div>
      </div>
      <div className="mcard__body">
        <div>
          <div className="mcard__kicker">{p.kicker}</div>
          <h3 className="mcard__name">{p.name}</h3>
        </div>
        <p className="mcard__hook">{p.hook}</p>
        <div className="mcard__meter">
          <div className="mcard__meter-item"><Icon.scream/>絶叫 <Meter v={p.meter.scream}/></div>
          <div className="mcard__meter-item"><Icon.camera/>映え <Meter v={p.meter.scenic}/></div>
          <div className="mcard__meter-item"><Icon.users/>カップル <Meter v={p.meter.couple}/></div>
        </div>
        <div className="mcard__foot">
          <div>
            <div className="mcard__price">￥{p.price.toLocaleString()}<span className="mcard__price-unit">～</span></div>
            <div className="mcard__time">{p.time}分 / {p.age}</div>
          </div>
        </div>
        <button className="mcard__cta" onClick={handleClick}>日程を選ぶ →</button>
      </div>
    </article>
  );
}

function Menu(){
  return (
    <section className="menu" data-screen-label="04 Menu">
      <div className="menu__head">
        <p className="label">EXPERIENCE MENU</p>
        <h2 className="h2">4つの覚醒から、<em>選んでください。</em></h2>
        <p className="menu__sub">迷ったら SWING。後悔した人は、7%だけでした。</p>
      </div>
      <div className="menu__grid">
        {PLANS.map(p=><PlanCard key={p.key} p={p}/>)}
      </div>
      <div className="menu__common">★ 全プラン共通|現地でプラン変更OK・当日キャンセル無料</div>
    </section>
  );
}

// ============================================================
// PlanCompare
// ============================================================
function Stars({v,max=5}){
  return <span className="pcomp__stars">{Array.from({length:max}).map((_,i)=>i<v?'★':'☆').join('')}</span>;
}
function PlanCompare(){
  return (
    <section className="plan-compare" data-screen-label="PlanCompare">
      <div className="plan-compare__inner">
        <p className="label">PLAN GUIDE</p>
        <h2 className="h2">どれが合う？<em>全部見る。</em></h2>
        <div className="plan-compare__scroll">
          <table className="plan-compare__table">
            <thead>
              <tr>
                <th></th>
                <th>ウォーク</th>
                <th className="col-hot">スイング</th>
                <th>クライム</th>
                <th>バンジー</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>怖さ</th>
                <td><Stars v={1}/></td>
                <td className="col-hot"><Stars v={3}/></td>
                <td><Stars v={2}/></td>
                <td><Stars v={5}/></td>
              </tr>
              <tr>
                <th>映え</th>
                <td><Stars v={3}/></td>
                <td className="col-hot"><Stars v={5}/></td>
                <td><Stars v={4}/></td>
                <td><Stars v={3}/></td>
              </tr>
              <tr>
                <th>所要</th>
                <td>45分</td>
                <td className="col-hot">20分</td>
                <td>60分</td>
                <td>30分</td>
              </tr>
              <tr>
                <th>料金</th>
                <td>￥1,500～</td>
                <td className="col-hot">￥3,800～</td>
                <td>￥6,800～</td>
                <td>￥12,800～</td>
              </tr>
              <tr>
                <th>向いてる人</th>
                <td>誰でも</td>
                <td className="col-hot">カップル</td>
                <td>絶景派</td>
                <td>チャレンジャー</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="plan-compare__cta">
          <button className="hero__cta" onClick={()=>{window.openBooking('swing');window.track('cta_click',{plan:'swing',location:'plan_compare'});}}>
            <span>日程を選ぶ →</span>
            <Icon.arrow/>
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Compare
// ============================================================
function Compare(){
  const rows=[
    {l:'TikTok公式アカウント',us:'あり (86万フォロワー)',a:'—',b:'—'},
    {l:'全長',us:<b>420m・日本最長</b>,a:'180m',b:'240m'},
    {l:'体験時間',us:'20～60分から選べる',a:'10分程度',b:'15分程度'},
    {l:'料金 (最安)',us:<b>￥1,500～</b>,a:'￥2,800～',b:'￥2,000～'},
    {l:'予約完了まで',us:<b>90秒・登録不要</b>,a:'会員登録必要',b:'約4分'},
    {l:'悪天候 返金保証',us:'100%返金',a:'振替のみ',b:'一部返金'},
    {l:'夸間営業',us:'土曜 ～21:00',a:'—',b:'—'},
  ];
  return (
    <section className="compare" data-screen-label="05 Compare">
      <div className="compare__head">
        <p className="label">WHY HERE</p>
        <h2 className="h2">失礼ですが、<em>結論から。</em></h2>
        <p>他を検討している方へ。チケットを買う前に、3分だけ。</p>
      </div>
      <div className="compare__wrap">
        <div className="compare__scroll">
          <table className="compare__table">
            <thead>
              <tr>
                <th></th>
                <th className="col-us">GRAVITATE OSAKA</th>
                <th>他施設 A</th>
                <th>他施設 B</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  <td>{r.l}</td>
                  <td className="col-us">{r.us}</td>
                  <td>{r.a}</td>
                  <td>{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="compare__note">※他施設データは2025年12月時点の各社公式サイト記載値より。</p>
      </div>
    </section>
  );
}

// ============================================================
// Viral
// ============================================================
function ViralCard({c}){
  const ref=useRef(null);
  const [playing,setPlaying]=useState(false);
  useEffect(()=>{
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>setPlaying(e.isIntersecting&&e.intersectionRatio>.5));
    },{threshold:[0,.5,1]});
    if(ref.current)io.observe(ref.current);
    return ()=>io.disconnect();
  },[]);
  return (
    <div ref={ref} className={`vcard ${playing?'playing':''}`}>
      <img className="vcard__media" src={c.img} alt=""/>
      <span className="vcard__tag">{c.tag}</span>
      <div className="vcard__play" onClick={()=>window.open(c.url,'_blank','noopener')}><Icon.play/></div>
      <div className="vcard__meta">
        <div className="vcard__views"><Icon.eye/>{c.views}</div>
        <div className="vcard__cap">{c.cap}</div>
        <button className="vcard__plan" onClick={()=>{window.openBooking(c.plan);window.track('cta_click',{plan:c.plan,location:'viral'});}}>{c.planLabel} →</button>
      </div>
    </div>
  );
}
function Viral(){
  const cards=[
    {tag:'8.6M',img:'images/swing-01.jpg',views:'8.6M views',cap:'「彼女が先に叫んだ」',url:'https://www.tiktok.com/',plan:'swing',planLabel:'スイングを体験'},
    {tag:'3.2M',img:'images/walk-03.jpg',views:'3.2M views',cap:'420mを渡りきった瞬間',url:'https://www.tiktok.com/',plan:'walk',planLabel:'ウォークを体験'},
    {tag:'2.4M',img:'images/climb-top-01.jpg',views:'2.4M views',cap:'主塔からの大阪',url:'https://www.tiktok.com/',plan:'climb',planLabel:'クライムを体験'},
    {tag:'1.8M',img:'images/walk-02.jpg',views:'1.8M views',cap:'高所恐怤症が泣いた',url:'https://www.tiktok.com/',plan:'walk',planLabel:'ウォークを体験'},
  ];
  return (
    <section className="viral" data-screen-label="06 TikTok" id="viral">
      <div className="viral__head">
        <p className="label">TIKTOK</p>
        <h2 className="h2">バズった瞬間を、<em>もう一度。</em></h2>
      </div>
      <div className="viral__grid">
        {cards.map((c,i)=><ViralCard key={i} c={c}/>)}
      </div>
    </section>
  );
}

// ============================================================
// Voices
// ============================================================
function Voices(){
  const trackRef=useRef(null);
  const [filter,setFilter]=useState('全て');
  const filters=['全て','カップル','一人','家族','初心者'];
  const allQuotes=[
    {text:'彼女が絶対やらないって言ってたのに、先に叫んでた。',name:'Yuki K.',age:'24',src:'Google口コミ',avatar:'Y',url:'https://google.com',tags:['カップル']},
    {text:'高いとこ無理やのに行った自分を褒めたい。景色が全部持っていった。',name:'Rina M.',age:'27',src:'じゃらん',avatar:'R',url:'https://www.jalan.net',tags:['一人','初心者']},
    {text:'普通のクライミングとはエネルギーが違う。頂上で声出た。',name:'Daiki S.',age:'31',src:'Google口コミ',avatar:'D',url:'https://google.com',tags:['一人']},
    {text:'飛ぶまで 30分ビビってた。飛んだ後は「もう 1回」しか出てこなかった。',name:'Sota H.',age:'29',src:'アソビュー',avatar:'S',url:'https://www.asoview.com',tags:['一人']},
    {text:'TikTokで見た動画そのまま。一緒に行った友達とまだ余韻。',name:'Mei T.',age:'22',src:'Google口コミ',avatar:'M',url:'https://google.com',tags:['カップル','家族']},
    {text:'想像より怖かったけど達成感があった。足がガクガクだった笑',name:'Hana O.',age:'25',src:'じゃらん',avatar:'H',url:'https://www.jalan.net',tags:['初心者','一人']},
  ];
  const quotes=filter==='全て'?allQuotes:allQuotes.filter(q=>q.tags.includes(filter));
  const scroll=(dir)=>{
    const el=trackRef.current;if(!el)return;
    const card=el.querySelector('.vquote');
    const w=card?card.offsetWidth+24:360;
    el.scrollBy({left:dir*w,behavior:'smooth'});
  };
  return (
    <section className="voices" data-screen-label="07 Voices">
      <div className="voices__head">
        <p className="label">REAL VOICES</p>
        <h2 className="h2">体験した人の、<em>本音だけ。</em></h2>
        <div className="voices__stars">
          <Icon.star color="#FF6A1A"/>
          <b>4.8</b>
          <span>/ 5.0</span>
          <span className="sep"/>
          <span>2,847件のレビュー</span>
        </div>
      </div>
      <div className="voices__filters">
        {filters.map(f=>(
          <button key={f} className={`voices__chip ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="voices__track" ref={trackRef}>
        {quotes.map((q,i)=>(
          <a key={i} className="vquote" href={q.url} target="_blank" rel="noopener">
            <div className="vquote__stars">★★★★★</div>
            <p className="vquote__text">「{q.text}」</p>
            <div className="vquote__meta">
              <div className="vquote__avatar">{q.avatar}</div>
              <div>
                <div className="vquote__name">{q.name}・{q.age}歳</div>
                <div className="vquote__src">{q.src}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="voices__ctrls">
        <button className="voices__ctrl" onClick={()=>scroll(-1)} aria-label="前へ"><Icon.chevronLeft/></button>
        <button className="voices__ctrl" onClick={()=>scroll(1)} aria-label="次へ"><Icon.chevronRight/></button>
      </div>
    </section>
  );
}

// ============================================================
// Flow
// ============================================================
function Flow(){
  const steps=[
    {n:'01',t:'30秒',title:'日時とプランを選ぶ',desc:'カレンダーで空きを確認。気になった瞬間を、そのまま押さえられます。'},
    {n:'02',t:'30秒',title:'名前と連絡先を入力',desc:'会員登録は不要。SMSで確認コードが届くだけ。クレカも事前不要です。'},
    {n:'03',t:'30秒',title:'確認メールで完了',desc:'当日は10分前に現地へ。支払いは現地で。雨天中止は全額返金します。'},
  ];
  return (
    <section className="flow" data-screen-label="08 Flow">
      <div className="flow__head">
        <p className="label">HOW TO BOOK</p>
        <h2 className="h2">長い問診票は、<em>ありません。</em></h2>
        <p className="flow__sub">3ステップ・合記90秒で完了します。</p>
      </div>
      <div className="flow__wrap">
        <div className="flow__progress"></div>
        <div className="flow__grid">
          {steps.map((s,i)=>(
            <div key={i} className="fstep">
              <div className="fstep__bignum">{s.n}</div>
              <div className="fstep__body">
                <div className="fstep__time">{s.t}</div>
                <h3 className="fstep__title">{s.title}</h3>
                <p className="fstep__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flow__cta-wrap">
          <button className="hero__cta" onClick={()=>{window.openBooking('swing');window.track('cta_click',{plan:'swing',location:'flow'});}}>
            <span className="hero__cta-price">￥1,500～</span>
            <span className="hero__cta-sep"/>
            <span>日程を選ぶ →</span>
            <Icon.arrow/>
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Access
// ============================================================
function Access(){
  const rows=[
    {l:'住所',v:'大阪府茨木市大字車作地先（安威川ダム）'},
    {l:'車',v:'大阪市内から絀60分 / 名神茨木ICかも15分'},
    {l:'電車＋送迎',v:'JR茨木駅・阪急茨木市駅から無料送迎バス（要予約）'},
    {l:'驐車場',v:'無料・100台'},
    {l:'営業時間',v:'9:00～17:00（土曜は～21:00）'},
    {l:'定休日',v:'火曜・荒天時（当日朝にSMSでお知らせ）'},
    {l:'電話',v:'0726-XX-XXXX'},
  ];
  return (
    <section className="access" data-screen-label="09 Access">
      <div className="access__inner">
        <p className="label">ACCESS</p>
        <h2 className="h2">大阪から、<em>60分。</em></h2>
        <div className="access__grid">
          <div className="access__map">
            <iframe
              src="https://maps.google.com/maps?q=安威川ダム,大阪府茨木市&output=embed&z=14"
              width="100%" height="100%"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GRAVITATE OSAKA アクセスマップ"
            />
          </div>
          <div className="access__info">
            <table className="access__table">
              <tbody>
                {rows.map((r,i)=>(
                  <tr key={i}>
                    <th>{r.l}</th>
                    <td>{r.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="access__cta" onClick={()=>{window.openBooking('swing');window.track('cta_click',{plan:'swing',location:'access'});}}>
              日程を選ぶ →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================
function FAQ(){
  const [q,setQ]=useState('');
  const items=[
    {q:'高所恐怤症でも大丈夫ですか？',a:'8割のお客様が「最初は怖かった」と答えます。スタッフが1対1で付き添い、無理なく一歩ずつ進めます。途中引き返しも可能ですが、2025年実績で途中棄権はゼロ件です。',open:true},
    {q:'安全性は？過去に事故は？',a:'開業以来、重大事故ゼロ。使用するハーネスは国際安全基準UIAA準拠、毎日始業前に点検しています。地震・強風時は即時運営中止します。'},
    {q:'悪天候の場合は？',a:'雨・強風で運営中止の場合、100%全額返金します。振替も可能です。予約時の連絡先に当日朝までにご連絡します。'},
    {q:'予約は何日前まで可能？',a:'前日23:59まで。当日空きがあればその場でも受付可能です（推奨は事前予約）。キャンセルは当日朝10時まで無料。'},
    {q:'一人でも参加できますか？',a:'はい、1名から参加可能です。実際に来場者の終22%はお一人様です。グループ参加者と当日一緒のタイミングになります。'},
    {q:'TikTokで見た動画と同じ体験ができますか？',a:'はい、ブリッジスイング（最人気）が最もTikTokで拡散されているプランです。「同じ場所で撮影したい」というリクエストにもスタッフがお応えします。'},
    {q:'何歳から参加できますか？',a:'ブリッジウォークは小学生（保護者同伴必須）から。スイング・クライムは15歳～。バンジーは18～55歳。事前に年齢証明の提示が必要な場合があります。'},
    {q:'写真・動画撃影はできますか？',a:'もちろん！橋の上や主塔頂上での撃影をスタッフがサポートします。TikTok・インスタグラム用のスポットもご案内できます。'},
    {q:'持ち物・服装は？',a:'動きやすい服装でお越しください。ヒール・サンダルは不可。アクセサリーはスタッフが保管できます。防寒対策として上着をお持ちいただくことをお勧めしています。'},
    {q:'グループ（大人数）での予約は？',a:'10名以上の場合は団体料金が適用される場合があります。事前にメールまたは電話でお問い合わせいただくとスムーズです。'},
    {q:'プラン変更・当日追加は？',a:'当日スタッフに直接お伟いください。空きがあれば現地でプラン変更・追加が可能です。特にウォーク後にスイングを追加する方が多いです。'},
  ];
  const filtered=q?items.filter(it=>it.q.includes(q)||it.a.includes(q)):items;
  return (
    <section className="faq" data-screen-label="10 FAQ">
      <div className="faq__head">
        <p className="label">FAQ</p>
        <h2 className="h2">心配は、<em>ここで全部。</em></h2>
      </div>
      <div className="faq__search-wrap">
        <input
          className="faq__search"
          type="search"
          placeholder="質問を検索…"
          value={q}
          onChange={e=>setQ(e.target.value)}
        />
      </div>
      <div className="faq__list">
        {filtered.length===0&&<p style={{textAlign:'center',color:'rgba(255,255,255,.5)',padding:'32px 0'}}>該当する質問が見つかりませんでした。</p>}
        {filtered.map((it,i)=>(
          <details key={i} className="faq__item" open={i===0&&!q}>
            <summary>{it.q}</summary>
            <div className="faq__body">{it.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Final CTA
// ============================================================
function Final(){
  const {h,m,s,fmt}=useCountdown(17);
  return (
    <section className="final" data-screen-label="11 Final">
      <div className="final__inner">
        <p className="final__kicker">LAST STOP BEFORE THE EDGE</p>
        <h2>考える時間、<br/><em>あと何分</em>ありますか。</h2>
        <p className="final__sub">
          来週、友達のインスタで誰かの笑顔を見るか、<br/>
          それを投稿する側になるか。
        </p>
        <div className="final__countdown">
          <div className="final__countdown-unit"><span className="final__countdown-n">{fmt(h)}</span><span className="final__countdown-l">時間</span></div>
          <span className="final__countdown-sep">:</span>
          <div className="final__countdown-unit"><span className="final__countdown-n">{fmt(m)}</span><span className="final__countdown-l">分</span></div>
          <span className="final__countdown-sep">:</span>
          <div className="final__countdown-unit"><span className="final__countdown-n">{fmt(s)}</span><span className="final__countdown-l">秒</span></div>
        </div>
        <p style={{fontSize:12,color:'rgba(255,255,255,.45)',marginBottom:32}}>17:00以降の予約お問い合わせは翰日対応</p>
        <div className="final__btns">
          <button className="final__cta" onClick={()=>{window.openBooking('swing');window.track('cta_click',{plan:'swing',location:'final'});}}>
            <span>日程を選ぶ →</span>
            <Icon.arrow/>
          </button>
          <a href="https://line.me/R/ti/p/@gravitateosaka" className="final__line" target="_blank" rel="noopener" onClick={()=>window.track('line_click',{location:'final'})}>
            <Icon.line width="20" height="20"/>
            LINEで友達に送る
          </a>
        </div>
        <p className="final__note">￥1,500～・当日まで無料キャンセル・現地払いOK</p>
        <div className="final__footer">
          <span>© GRAVITATE OSAKA / GODA BRIDGE</span>
          <span>大阪府茨木市 安威川ダム</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Bottom sticky CTA
// ============================================================
function BottomCTA(){
  const [show,setShow]=useState(false);
  useEffect(()=>{
    const on=()=>{
      const hero=document.querySelector('.hero');
      const final=document.querySelector('.final');
      if(!hero)return;
      const bottom=hero.getBoundingClientRect().bottom;
      const finalTop=final?final.getBoundingClientRect().top:9999;
      setShow(bottom<0&&finalTop>window.innerHeight*.6);
    };
    window.addEventListener('scroll',on,{passive:true});on();
    return ()=>window.removeEventListener('scroll',on);
  },[]);
  return (
    <div className={`bottom-cta ${show?'show':''}`}>
      <div className="bottom-cta__inner">
        <div className="bottom-cta__text">
          <div className="bottom-cta__main">￥1,500～ <span style={{color:'#666'}}>/</span> <b>本日あと2枠</b></div>
          <div className="bottom-cta__sub">最人気 SWING ￥3,800～ ・ 当日キャンセル無料</div>
        </div>
        <button className="bottom-cta__btn" onClick={()=>{window.openBooking('swing');window.track('cta_click',{plan:'swing',location:'bottom_cta'});}}>
          日程を選ぶ →
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Exit Coupon
// ============================================================
function ExitCoupon(){
  const [show,setShow]=useState(false);
  const fired=useRef(false);
  const timer=useRef(null);
  useEffect(()=>{
    if(sessionStorage.getItem('exit_coupon_shown'))return;
    const onScroll=()=>{
      if(fired.current||timer.current)return;
      const h=document.documentElement;
      const pct=(h.scrollTop+h.clientHeight)/h.scrollHeight;
      if(pct>=0.80){
        timer.current=setTimeout(()=>{
          fired.current=true;
          sessionStorage.setItem('exit_coupon_shown','1');
          setShow(true);
        },8000);
      }
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    return ()=>{
      window.removeEventListener('scroll',onScroll);
      if(timer.current)clearTimeout(timer.current);
    };
  },[]);
  if(!show)return null;
  return (
    <div className="coupon-modal on" onClick={()=>setShow(false)}>
      <div className="coupon-modal__box" onClick={e=>e.stopPropagation()}>
        <button className="coupon-modal__close" onClick={()=>setShow(false)}><Icon.close/></button>
        <div className="coupon-modal__kicker">EXIT COUPON・本日限定</div>
        <div className="coupon-modal__big">￥500 OFF</div>
        <p className="coupon-modal__sub">今すぐ予約で、￥500 OFFクーポンを自動適用。<br/>当日まで無料キャンセル・現地払いOK。</p>
        <button className="coupon-modal__btn" onClick={()=>{setShow(false);window.openBooking('swing');window.track('coupon_used',{location:'exit_coupon'});}}>
          クーポンを使って予約 <Icon.arrow width="14" height="14"/>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Booking Modal
// ============================================================
function BookingModal(){
  const [open,setOpen]=useState(false);
  const [step,setStep]=useState(0);
  const [plan,setPlan]=useState('swing');
  const [day,setDay]=useState(1);
  useEffect(()=>{
    window.openBooking=(p='swing')=>{setPlan(p);setStep(0);setOpen(true);document.body.style.overflow='hidden';};
    return ()=>{delete window.openBooking};
  },[]);
  const close=()=>{setOpen(false);document.body.style.overflow='';};
  const days=useMemo(()=>{
    const base=new Date();
    const wd=['日','月','火','水','木','金','土'];
    return Array.from({length:8}).map((_,i)=>{
      const d=new Date(base);d.setDate(base.getDate()+i);
      const stock=[2,5,3,8,8,4,1,6][i];
      return {wd:wd[d.getDay()],day:d.getDate(),stock,low:stock<=3};
    });
  },[]);
  const selected=PLANS.find(p=>p.key===plan);
  return (
    <div className={`bmodal ${open?'on':''}`} onClick={close}>
      <div className="bmodal__box" onClick={e=>e.stopPropagation()}>
        <button className="bmodal__close" onClick={close}><Icon.close/></button>
        <div className="bmodal__steps">
          {[0,1,2].map(i=><div key={i} className={`bmodal__step ${step===i?'on':''} ${step>i?'done':''}`}/>)}
        </div>
        {step===0&&(
          <>
            <h3 className="bmodal__title">プランを選択</h3>
            <p className="bmodal__sub">現地でプラン変更もできます。</p>
            <div className="bmodal__opts">
              {PLANS.map(p=>(
                <button key={p.key} className={`bmodal__opt ${plan===p.key?'on':''}`} onClick={()=>setPlan(p.key)}>
                  <div>
                    <div className="bmodal__opt-main">{p.name}</div>
                    <div className="bmodal__opt-sub">{p.time}分 / {p.age}</div>
                  </div>
                  <div className="bmodal__opt-price">￥{p.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
            <div className="bmodal__actions">
              <button className="bmodal__btn bmodal__btn--next" onClick={()=>setStep(1)}>次へ <Icon.arrow width="14" height="14"/></button>
            </div>
          </>
        )}
        {step===1&&(
          <>
            <h3 className="bmodal__title">日時を選択</h3>
            <p className="bmodal__sub">当日朝まで無料キャンセル可能。</p>
            <div className="bmodal__grid">
              {days.map((d,i)=>(
                <button key={i} className={`bmodal__day ${day===i?'on':''} ${d.low?'low':''}`} onClick={()=>setDay(i)}>
                  <div className="bmodal__day-wd">{d.wd}</div>
                  <div className="bmodal__day-d">{i===0?'今日':d.day}</div>
                  <div className="bmodal__day-stock">残{d.stock}</div>
                </button>
              ))}
            </div>
            <div className="bmodal__actions">
              <button className="bmodal__btn bmodal__btn--back" onClick={()=>setStep(0)}>戻る</button>
              <button className="bmodal__btn bmodal__btn--next" onClick={()=>setStep(2)}>次へ <Icon.arrow width="14" height="14"/></button>
            </div>
          </>
        )}
        {step===2&&(
          <>
            <div className="bmodal__done">
              <div className="bmodal__done-ico"><Icon.check width="28" height="28"/></div>
              <h3 className="bmodal__title">予約内容の確認</h3>
              <p className="bmodal__sub">このままTikTokから友人を招待できます。</p>
            </div>
            <div className="bmodal__summary">
              <div className="bmodal__summary-row"><span>プラン</span><b>{selected.name}</b></div>
              <div className="bmodal__summary-row"><span>日時</span><b>{days[day].day}日 ({days[day].wd}) 希望枠</b></div>
              <div className="bmodal__summary-row"><span>料金</span><b>￥{selected.price.toLocaleString()}～</b></div>
              <div className="bmodal__summary-row"><span>支払い</span><b>現地払い</b></div>
            </div>
            <p style={{fontSize:12,color:'rgba(255,255,255,.6)',textAlign:'center',margin:'0 0 16px'}}>
              ※これはデモ版です。実際の予約は本番サイトで完了します。
            </p>
            <div className="bmodal__actions">
              <button className="bmodal__btn bmodal__btn--back" onClick={()=>setStep(1)}>戻る</button>
              <button className="bmodal__btn bmodal__btn--next" onClick={close}>予約を確定</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// App
// ============================================================
function App(){
  return (
    <>
      <ScrollProgress/>
      <Header/>
      <Hero/>
      <WhatIs/>
      <Marquee/>
      <Imagine/>
      <Hook/>
      <Menu/>
      <PlanCompare/>
      <Compare/>
      <Viral/>
      <Voices/>
      <Flow/>
      <Access/>
      <FAQ/>
      <Final/>
      <BottomCTA/>
      <ExitCoupon/>
      <BookingModal/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
