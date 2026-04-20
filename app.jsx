// GRAVITATE OSAKA — GODA BRIDGE LP (Apple-grade refactor)
const { useState, useEffect, useRef, useMemo } = React;

// ============================================================
// SVG Icon set — replaces ALL emoji
// ============================================================
const Icon = {
  footprints:(p)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 16s-1-3 0-5 3-2 4 0 1 5-1 6-3-1-3-1z"/><path d="M16 8s-1-3 0-5 3-2 4 0 1 5-1 6-3-1-3-1z"/><circle cx="5" cy="11" r="1"/><circle cx="8" cy="9" r="1"/><circle cx="11" cy="10" r="1"/><circle cx="17" cy="3" r="1"/><circle cx="20" cy="5" r="1"/></svg>,
  wind:(p)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9.5 4.5A2.5 2.5 0 1 1 12 7H2"/><path d="M14 14.5a2.5 2.5 0 1 0 2.5 2.5H2"/><path d="M17.5 8a3 3 0 1 1 3 3h-20"/></svg>,
  heart:(p)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 14c1.5-1.5 3-3.5 3-6a4.5 4.5 0 0 0-9 0 4.5 4.5 0 0 0-9 0c0 2.5 1.5 4.5 3 6l6 6Z"/><path d="M3.22 12H7l2-3 3 6 2-3 2 2h4.78"/></svg>,
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
};

// ============================================================
// Helpers
// ============================================================
function useLiveTime(){
  const [t, setT] = useState(()=>{
    const d = new Date();
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  });
  useEffect(()=>{
    const id = setInterval(()=>{
      const d = new Date();
      setT(`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`);
    }, 15000);
    return ()=> clearInterval(id);
  },[]);
  return t;
}
function useViewers(){
  const [n, setN] = useState(14);
  useEffect(()=>{
    const id = setInterval(()=>{
      setN(v => Math.max(8, Math.min(24, v + Math.floor(Math.random()*5) - 2)));
    }, 4200);
    return ()=> clearInterval(id);
  },[]);
  return n;
}

// ============================================================
// Header
// ============================================================
function Header(){
  return (
    <header className="site-header">
      <div className="site-header__logo">GRAVITATE OSAKA</div>
      <button className="site-header__cta" onClick={()=>window.openBooking('swing')}>
        <span className="full">空き状況を見る</span>
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
  const viewers = useViewers();
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero__bg">
        <img src="images/aerial-01.jpg" alt=""/>
      </div>
      <div className="hero__inner">
        <p className="hero__kicker">GODA BRIDGE — OSAKA</p>
        <h1 className="hero__title">
          渡った人だけが、<br/>
          <span className="accent">知っている。</span>
        </h1>
        <p className="hero__sub">
          日本最長 <strong>420m</strong>・高さ <strong>55m</strong>。<br/>
          大阪・安威川ダム湖上の吊り橋体験、4種類。
        </p>
        <button className="hero__cta" onClick={()=>window.openBooking('swing')}>
          <span className="hero__cta-price">¥1,500〜</span>
          <span className="hero__cta-sep"/>
          <span>
            <span>空き状況を見る</span>
            <div className="hero__cta-meta">当日キャンセル無料</div>
          </span>
          <Icon.arrow/>
        </button>

        <div className="hero__badges">
          <span className="hero__badge hot"><span className="dot"/>TikTok 860万回再生</span>
          <span className="hero__badge">日本最長 420m</span>
          <span className="hero__badge">高さ 55m</span>
          <span className="hero__badge">最短20分</span>
          <span className="hero__badge">現地払いOK</span>
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
        <div className="hero__proof-viewers">
          <Icon.eye/>
          <span>いま <b>{viewers}人</b> が検討中</span>
        </div>
      </aside>
    </section>
  );
}

// ============================================================
// Marquee
// ============================================================
function Marquee(){
  const items = ['TikTok 860万回再生','日本最長 420m','じゃらん 4.9★','Google口コミ 4.7★','アソビュー 人気NO.1','高さ 55m'];
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {doubled.map((t,i)=><span key={i} className="marquee__item">{t}</span>)}
      </div>
    </div>
  );
}

// ============================================================
// Imagine — sticky scroll-driven crossfade
// ============================================================
function Imagine(){
  const stepsRef = useRef([]);
  const [active, setActive] = useState(0);
  useEffect(()=>{
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const i = Number(e.target.dataset.step);
          setActive(i);
        }
      });
    },{rootMargin:'-40% 0px -40% 0px', threshold:0});
    stepsRef.current.forEach(el=> el && io.observe(el));
    return ()=> io.disconnect();
  },[]);

  const steps = [
    { ico:<Icon.footprints/>, text:<>55m上空。足元は、<em>翡翠色のダム湖</em>。</>, img:'images/walk-03.jpg' },
    { ico:<Icon.wind/>, text:<>風の音と、自分の鼓動と、<em>誰かの笑い声。</em></>, img:'images/walk-02.jpg' },
    { ico:<Icon.heart/>, text:<>最初の一歩で、<em>全部、静かになる。</em></>, img:'images/swing-01.jpg' },
    { ico:<Icon.phone/>, text:<>撮った動画を、<em>もう一度見たくなる。</em></>, img:'images/climb-top-01.jpg' },
  ];

  return (
    <section className="imagine" data-screen-label="02 Imagine">
      <div className="imagine__head">
        <p className="label">IMAGINE</p>
        <h2 className="h2">想像してみてください。</h2>
      </div>
      <div className="imagine__stage">
        <div className="imagine__sticky">
          {steps.map((s,i)=>(
            <img key={i} className={`imagine__img ${active===i?'active':''}`} src={s.img} alt=""/>
          ))}
        </div>
        <div className="imagine__text">
          {steps.map((s,i)=>(
            <div key={i} data-step={i} ref={el=> stepsRef.current[i]=el} className={`imagine__line ${active===i?'active':''}`}>
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
// Hook — numbers
// ============================================================
function Hook(){
  const nums = [
    { n:'860', u:'万', l:'TikTok再生数' },
    { n:'420', u:'m', l:'橋の全長 (日本最長)' },
    { n:'98', u:'%', l:'「また来たい」回答率' },
    { n:'17', u:'枠', l:'今週末の残枠' },
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
            <div className="hook__label">{x.l}</div>
          </div>
        ))}
      </div>
      <p className="hook__caption">設計でも歴史でもなく——<em>人間の本気の表情</em>だった。</p>
    </section>
  );
}

// ============================================================
// Menu — 4 plans
// ============================================================
const PLANS = [
  {
    key:'walk', img:'images/walk-02.jpg',
    kicker:'BRIDGE WALK', name:'ブリッジウォーク',
    badges:[{t:'初心者OK'}],
    hook:<>怖かったら戻ってOK。でも、<em>戻った人はゼロ。</em></>,
    price:1500, time:45, age:'小学生〜',
    meter:{ scream:1, scenic:3, couple:2 },
  },
  {
    key:'swing', img:'images/swing-01.jpg',
    kicker:'BRIDGE SWING', name:'ブリッジスイング',
    badges:[{t:'最人気', c:'orange'},{t:'TikTok'}],
    hook:<>絶叫してる側か、<em>撮ってる側か。</em>選んでください。</>,
    price:3800, time:20, age:'16歳〜', hot:true,
    meter:{ scream:5, scenic:5, couple:5 },
  },
  {
    key:'climb', img:'images/climb-top-01.jpg',
    kicker:'BRIDGE CLIMB', name:'ブリッジクライム',
    badges:[{t:'絶景'}],
    hook:<>見下ろすのは、<em>大阪平野の全部。</em></>,
    price:6800, time:60, age:'15歳〜',
    meter:{ scream:3, scenic:5, couple:3 },
  },
  {
    key:'jump', img:'images/bungee-01.jpg',
    kicker:'BRIDGE BUNGEE', name:'ブリッジバンジー',
    badges:[{t:'絶叫'}],
    hook:<>3秒で、<em>人生を思い出す。</em></>,
    price:12800, time:30, age:'18〜55歳',
    meter:{ scream:5, scenic:3, couple:2 },
  },
];

function Meter({v,max=5}){
  return (
    <span className="mcard__meter-dots">
      {Array.from({length:max}).map((_,i)=><span key={i} className={i<v?'on':''}/>)}
    </span>
  );
}

function PlanCard({p}){
  return (
    <article className={`mcard ${p.hot?'hot':''}`} onClick={()=>window.openBooking(p.key)}>
      <div className="mcard__media">
        <img src={p.img} alt={p.name} loading="lazy"/>
        <div className="mcard__badges">
          {p.badges.map((b,i)=>(
            <span key={i} className={`mcard__badge ${b.c||''}`}>{b.t}</span>
          ))}
        </div>
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
            <div className="mcard__price">¥{p.price.toLocaleString()}<span className="mcard__price-unit">〜</span></div>
            <div className="mcard__time">{p.time}分 / {p.age}</div>
          </div>
          <span className="mcard__go"><Icon.arrow/></span>
        </div>
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
// Compare
// ============================================================
function Compare(){
  const rows = [
    { l:'TikTok公式アカウント', us:'あり (86万フォロワー)', a:'—', b:'—' },
    { l:'全長', us:<b>420m・日本最長</b>, a:'180m', b:'240m' },
    { l:'体験時間', us:'20〜60分から選べる', a:'10分程度', b:'15分程度' },
    { l:'料金 (最安)', us:<b>¥1,500〜</b>, a:'¥2,800〜', b:'¥2,000〜' },
    { l:'予約完了まで', us:<b>90秒・登録不要</b>, a:'会員登録必要', b:'約5分' },
    { l:'悪天候 返金保証', us:'100%返金', a:'振替のみ', b:'一部返金' },
    { l:'夜間営業', us:'土曜 〜21:00', a:'—', b:'—' },
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
// Viral — TikTok video cards (IO autoplay via CSS ken-burns)
// ============================================================
function ViralCard({c}){
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(()=>{
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=> setPlaying(e.isIntersecting && e.intersectionRatio>.5));
    },{threshold:[0,.5,1]});
    if(ref.current) io.observe(ref.current);
    return ()=> io.disconnect();
  },[]);
  return (
    <div ref={ref} className={`vcard ${playing?'playing':''}`} onClick={()=>window.open(c.url,'_blank','noopener')}>
      <img className="vcard__media" src={c.img} alt=""/>
      <span className="vcard__tag">{c.tag}</span>
      <div className="vcard__play"><Icon.play/></div>
      <div className="vcard__meta">
        <div className="vcard__views"><Icon.eye/>{c.views}</div>
        <div className="vcard__cap">{c.cap}</div>
      </div>
    </div>
  );
}
function Viral(){
  const cards = [
    { tag:'8.6M', img:'images/swing-01.jpg', views:'8.6M views', cap:'「彼女が先に叫んだ」', url:'https://www.tiktok.com/' },
    { tag:'3.2M', img:'images/walk-03.jpg', views:'3.2M views', cap:'420mを渡りきった瞬間', url:'https://www.tiktok.com/' },
    { tag:'2.4M', img:'images/climb-top-01.jpg', views:'2.4M views', cap:'主塔からの大阪', url:'https://www.tiktok.com/' },
    { tag:'1.8M', img:'images/walk-02.jpg', views:'1.8M views', cap:'高所恐怖症が泣いた', url:'https://www.tiktok.com/' },
  ];
  return (
    <section className="viral" data-screen-label="06 TikTok" id="viral">
      <div className="viral__head">
        <p className="label">TIKTOK</p>
        <h2 className="h2">一番正直な動画を、<em>先に並べます。</em></h2>
      </div>
      <div className="viral__grid">
        {cards.map((c,i)=><ViralCard key={i} c={c}/>)}
      </div>
    </section>
  );
}

// ============================================================
// Voices — carousel
// ============================================================
function Voices(){
  const trackRef = useRef(null);
  const quotes = [
    { text:'彼女が絶対やらないって言ってたのに、先に叫んでた。', name:'Yuki K.', age:'24', src:'Google口コミ', avatar:'Y', url:'https://google.com' },
    { text:'高いとこ無理やのに行った自分を褒めたい。景色が全部持っていった。', name:'Rina M.', age:'27', src:'じゃらん', avatar:'R', url:'https://www.jalan.net' },
    { text:'普通のクライミングとはエネルギーが違う。頂上で声出た。', name:'Daiki S.', age:'31', src:'Google口コミ', avatar:'D', url:'https://google.com' },
    { text:'飛ぶまで30分ビビってた。飛んだ後は「もう1回」しか出てこなかった。', name:'Sota H.', age:'29', src:'アソビュー', avatar:'S', url:'https://www.asoview.com' },
    { text:'TikTokで見た動画そのまま。一緒に行った友達とまだ余韻。', name:'Mei T.', age:'22', src:'Google口コミ', avatar:'M', url:'https://google.com' },
  ];
  const scroll = (dir)=>{
    const el = trackRef.current; if(!el) return;
    const card = el.querySelector('.vquote');
    const w = card ? card.offsetWidth + 24 : 360;
    el.scrollBy({left: dir*w, behavior:'smooth'});
  };
  return (
    <section className="voices" data-screen-label="07 Voices">
      <div className="voices__head">
        <p className="label">REAL VOICES</p>
        <h2 className="h2">一番正直なレビューを、<em>先に並べます。</em></h2>
        <div className="voices__stars">
          <Icon.star color="#FF6A1A"/>
          <b>4.8</b>
          <span>/ 5.0</span>
          <span className="sep"/>
          <span>2,847件のレビュー</span>
        </div>
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
  const steps = [
    { n:'01', t:'30秒', title:'日時とプランを選ぶ', desc:'カレンダーで空きを確認。気になった瞬間を、そのまま押さえられます。' },
    { n:'02', t:'30秒', title:'名前と連絡先を入力', desc:'会員登録は不要。SMSで確認コードが届くだけ。クレカも事前不要です。' },
    { n:'03', t:'30秒', title:'確認メールで完了', desc:'当日は10分前に現地へ。支払いは現地で。雨天中止は全額返金します。' },
  ];
  return (
    <section className="flow" data-screen-label="08 Flow">
      <div className="flow__head">
        <p className="label">HOW TO BOOK</p>
        <h2 className="h2">長い問診票は、<em>ありません。</em></h2>
        <p className="flow__sub">3ステップ・合計90秒で完了します。</p>
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
          <button className="hero__cta" onClick={()=>window.openBooking('swing')}>
            <span className="hero__cta-price">¥1,500〜</span>
            <span className="hero__cta-sep"/>
            <span>今すぐ予約する</span>
            <Icon.arrow/>
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — <details>
// ============================================================
function FAQ(){
  const items = [
    { q:'高所恐怖症でも大丈夫ですか？', a:'8割のお客様が「最初は怖かった」と答えます。スタッフが1対1で付き添い、無理なく一歩ずつ進めます。途中引き返しも可能ですが、2025年実績で途中棄権はゼロ件です。', open:true },
    { q:'安全性は？過去に事故は？', a:'開業以来、重大事故ゼロ。使用するハーネスは国際安全基準UIAA準拠、毎日始業前に点検しています。地震・強風時は即時運営中止します。' },
    { q:'悪天候の場合は？', a:'雨・強風で運営中止の場合、100%全額返金します。振替も可能です。予約時の連絡先に当日朝までにご連絡します。' },
    { q:'予約は何日前まで可能？', a:'前日23:59まで。当日空きがあればその場でも受付可能です(推奨は事前予約)。キャンセルは当日朝10時まで無料。' },
    { q:'一人でも参加できますか？', a:'はい、1名から参加可能です。実際に来場者の約22%はお一人様です。グループ参加者と当日一緒のタイミングになります。' },
    { q:'TikTokで見た動画と同じ体験ができますか？', a:'はい、ブリッジスイング(最人気)が最もTikTokで拡散されているプランです。「同じ場所で撮影したい」というリクエストにも、スタッフがお応えします。' },
  ];
  return (
    <section className="faq" data-screen-label="09 FAQ">
      <div className="faq__head">
        <p className="label">FAQ</p>
        <h2 className="h2">心配は、<em>ここで全部。</em></h2>
      </div>
      <div className="faq__list">
        {items.map((it,i)=>(
          <details key={i} className="faq__item" open={it.open}>
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
  return (
    <section className="final" data-screen-label="10 Final">
      <div className="final__inner">
        <p className="final__kicker">LAST STOP BEFORE THE EDGE</p>
        <h2>考える時間、<br/><em>あと何分</em>ありますか。</h2>
        <p className="final__sub">
          来週、友達のインスタで誰かの笑顔を見るか、<br/>
          それを投稿する側になるか。
        </p>
        <button className="final__cta" onClick={()=>window.openBooking('swing')}>
          <span>空き状況を見る</span>
          <Icon.arrow/>
        </button>
        <p className="final__note">¥1,500〜・当日まで無料キャンセル・現地払いOK</p>

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
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const on = ()=>{
      const hero = document.querySelector('.hero');
      const final = document.querySelector('.final');
      if(!hero) return;
      const bottom = hero.getBoundingClientRect().bottom;
      const finalTop = final ? final.getBoundingClientRect().top : 9999;
      setShow(bottom<0 && finalTop>window.innerHeight*.6);
    };
    window.addEventListener('scroll', on, {passive:true}); on();
    return ()=> window.removeEventListener('scroll', on);
  },[]);
  return (
    <div className={`bottom-cta ${show?'show':''}`}>
      <div className="bottom-cta__inner">
        <div className="bottom-cta__text">
          <div className="bottom-cta__main">¥1,500〜 <span style={{color:'#666'}}>/</span> <b>本日あと2枠</b></div>
          <div className="bottom-cta__sub">当日キャンセル無料・現地払いOK</div>
        </div>
        <button className="bottom-cta__btn" onClick={()=>window.openBooking('swing')}>
          予約する <Icon.arrow width="14" height="14"/>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Exit Coupon
// ============================================================
function ExitCoupon(){
  const [show, setShow] = useState(false);
  const fired = useRef(false);
  useEffect(()=>{
    if(sessionStorage.getItem('exit_coupon_shown')) return;
    const on = ()=>{
      if(fired.current) return;
      const h = document.documentElement;
      const p = (h.scrollTop + h.clientHeight) / h.scrollHeight;
      if(p >= 0.88){
        fired.current = true;
        sessionStorage.setItem('exit_coupon_shown','1');
        setShow(true);
      }
    };
    window.addEventListener('scroll', on, {passive:true});
    return ()=> window.removeEventListener('scroll', on);
  },[]);
  if(!show) return null;
  return (
    <div className="coupon-modal on" onClick={()=>setShow(false)}>
      <div className="coupon-modal__box" onClick={e=>e.stopPropagation()}>
        <button className="coupon-modal__close" onClick={()=>setShow(false)}><Icon.close/></button>
        <div className="coupon-modal__kicker">EXIT COUPON・本日限定</div>
        <div className="coupon-modal__big">¥500 OFF</div>
        <p className="coupon-modal__sub">今すぐ予約で、¥500 OFFクーポンを自動適用。<br/>当日まで無料キャンセル・現地払いOK。</p>
        <button className="coupon-modal__btn" onClick={()=>{setShow(false); window.openBooking('swing');}}>
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
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState('swing');
  const [day, setDay] = useState(1);

  useEffect(()=>{
    window.openBooking = (p='swing')=>{
      setPlan(p); setStep(0); setOpen(true);
      document.body.style.overflow = 'hidden';
    };
    return ()=>{ delete window.openBooking };
  },[]);
  const close = ()=>{ setOpen(false); document.body.style.overflow = ''; };

  const days = useMemo(()=>{
    const base = new Date();
    const wd = ['日','月','火','水','木','金','土'];
    return Array.from({length:8}).map((_,i)=>{
      const d = new Date(base); d.setDate(base.getDate()+i);
      const stock = [2,5,3,8,8,4,1,6][i];
      return {wd:wd[d.getDay()], day:d.getDate(), stock, low:stock<=3};
    });
  },[]);

  const selected = PLANS.find(p=>p.key===plan);

  return (
    <div className={`bmodal ${open?'on':''}`} onClick={close}>
      <div className="bmodal__box" onClick={e=>e.stopPropagation()}>
        <button className="bmodal__close" onClick={close}><Icon.close/></button>
        <div className="bmodal__steps">
          {[0,1,2].map(i=>(
            <div key={i} className={`bmodal__step ${step===i?'on':''} ${step>i?'done':''}`}/>
          ))}
        </div>

        {step===0 && (
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
                  <div className="bmodal__opt-price">¥{p.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
            <div className="bmodal__actions">
              <button className="bmodal__btn bmodal__btn--next" onClick={()=>setStep(1)}>次へ <Icon.arrow width="14" height="14"/></button>
            </div>
          </>
        )}

        {step===1 && (
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

        {step===2 && (
          <>
            <div className="bmodal__done">
              <div className="bmodal__done-ico"><Icon.check width="28" height="28"/></div>
              <h3 className="bmodal__title">予約内容の確認</h3>
              <p className="bmodal__sub">このままTikTokから友人を招待できます。</p>
            </div>
            <div className="bmodal__summary">
              <div className="bmodal__summary-row"><span>プラン</span><b>{selected.name}</b></div>
              <div className="bmodal__summary-row"><span>日時</span><b>{days[day].day}日 ({days[day].wd}) 希望枠</b></div>
              <div className="bmodal__summary-row"><span>料金</span><b>¥{selected.price.toLocaleString()}〜</b></div>
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
      <Header/>
      <Hero/>
      <Marquee/>
      <Imagine/>
      <Hook/>
      <Menu/>
      <Compare/>
      <Viral/>
      <Voices/>
      <Flow/>
      <FAQ/>
      <Final/>
      <BottomCTA/>
      <ExitCoupon/>
      <BookingModal/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
