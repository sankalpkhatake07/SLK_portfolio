/* ══════════════════════════════════════════════
   SANKALP KHATAKE — PORTFOLIO JS v3
══════════════════════════════════════════════ */

/* ── THEME TOGGLE ─────────────────────────── */
(function(){
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  // Persist theme
  const saved = localStorage.getItem('sk-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'black' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('sk-theme', next);
    // Ripple effect
    btn.style.transform = 'scale(1.3) rotate(20deg)';
    setTimeout(() => { btn.style.transform = ''; }, 300);
  });
})();

/* ── PRELOADER ────────────────────────────── */
(function(){
  const fill = document.getElementById('preFill');
  const txt  = document.getElementById('preText');
  const loader = document.getElementById('preloader');
  const msgs = ['Booting AI Systems...','Loading Vision Engine...','Deploying LLM Ops...','Rendering Portfolio...'];
  let pct = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 15 + 5;
    if (pct > 100) pct = 100;
    fill.style.width = pct + '%';
    txt.textContent = msgs[Math.min(Math.floor(pct/26), 3)];
    if (pct >= 100) {
      clearInterval(iv);
      setTimeout(() => { loader.classList.add('done'); }, 350);
    }
  }, 110);
})();

/* ── BACKGROUND PARTICLE NET ─────────────── */
(function(){
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize(){
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  class Pt {
    constructor(){this.reset(true);}
    reset(init){
      this.x  = Math.random()*W;
      this.y  = init ? Math.random()*H : -6;
      this.vx = (Math.random()-.5)*.35;
      this.vy = (Math.random()-.5)*.35;
      this.r  = Math.random()*1.4+.3;
      this.a  = Math.random()*.55+.1;
      const c = [[0,255,209],[0,102,255],[123,47,255]];
      this.col = c[Math.floor(Math.random()*3)];
    }
    update(){
      this.x+=this.vx; this.y+=this.vy;
      if(this.x<-10||this.x>W+10||this.y<-10||this.y>H+10) this.reset(false);
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${this.col[0]},${this.col[1]},${this.col[2]},${this.a})`;
      ctx.fill();
    }
  }

  resize();
  for(let i=0;i<180;i++) pts.push(new Pt());

  function draw(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
        const d=Math.hypot(dx,dy);
        if(d<95){
          const a=(1-d/95)*.08;
          ctx.beginPath();
          ctx.moveTo(pts[i].x,pts[i].y);
          ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=`rgba(0,255,209,${a})`;
          ctx.lineWidth=.6; ctx.stroke();
        }
      }
    }
    pts.forEach(p=>{p.update();p.draw();});
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  draw();
})();

/* ── THREE.JS PROFILE ORB (subtle behind image) */
// Three.js not used directly for orb since we show the real photo.
// The CSS rings + glow handle the visual effect.

/* ── CUSTOM CURSOR ────────────────────────── */
(function(){
  const cur   = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  if(!cur||!trail) return;
  let tx=0,ty=0,cx=0,cy=0;

  document.addEventListener('mousemove', e=>{
    cur.style.left = e.clientX+'px';
    cur.style.top  = e.clientY+'px';
    tx=e.clientX; ty=e.clientY;
  });

  (function lerp(){
    cx += (tx-cx)*.12; cy += (ty-cy)*.12;
    trail.style.left = cx+'px'; trail.style.top = cy+'px';
    requestAnimationFrame(lerp);
  })();

  const hoverEls = 'a,button,.proj-card,.cert-card,.sk-card,.ac,.cli,.tl-card';
  document.querySelectorAll(hoverEls).forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cur-hover'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cur-hover'));
  });
})();

/* ── SCROLL PROGRESS + NAV ────────────────── */
window.addEventListener('scroll', ()=>{
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('scroll-progress').style.width = pct+'%';
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY>50);
});

/* ── ACTIVE NAV ───────────────────────────── */
(function(){
  const secs  = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        links.forEach(l=>l.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if(a) a.classList.add('active');
      }
    });
  },{threshold:.35});
  secs.forEach(s=>obs.observe(s));
})();

/* ── MOBILE MENU ──────────────────────────── */
function closeMobile(){ document.getElementById('mobileMenu').classList.remove('open'); }
document.getElementById('hamburger').addEventListener('click',()=>
  document.getElementById('mobileMenu').classList.toggle('open'));

/* ── SCROLL REVEALS ───────────────────────── */
(function(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  },{threshold:.1});
  document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(el=>obs.observe(el));
})();

/* ── SKILL BARS (triggered on scroll) ───────── */
(function(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  },{threshold:.2});
  document.querySelectorAll('.sk-card').forEach(el=>obs.observe(el));
})();

/* ── COUNTER ANIMATION ────────────────────── */
(function(){
  function count(el, target, suf){
    const dur=2000; let start=null;
    function step(ts){
      if(!start) start=ts;
      const p=Math.min((ts-start)/dur,1);
      const v=Math.round((1-Math.pow(1-p,4))*target);
      el.textContent = v+suf;
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const box=e.target;
        count(box.querySelector('.st-num'), +box.dataset.target, box.dataset.suf||'');
        obs.unobserve(box);
      }
    });
  },{threshold:.5});
  document.querySelectorAll('.st-box[data-target]').forEach(el=>obs.observe(el));
})();

/* ── TYPEWRITER ───────────────────────────── */
(function(){
  const el=document.getElementById('typewriter');
  if(!el) return;
  const roles=['AI Engineer','ML Engineer','Generative AI Developer','Computer Vision Engineer','IoT Innovator','Full Stack Developer'];
  let ri=0,ci=0,del=false;
  function type(){
    const cur=roles[ri];
    if(!del){ el.textContent=cur.slice(0,++ci); if(ci===cur.length){del=true;setTimeout(type,1800);return;} setTimeout(type,80); }
    else { el.textContent=cur.slice(0,--ci); if(ci===0){del=false;ri=(ri+1)%roles.length;setTimeout(type,300);return;} setTimeout(type,44); }
  }
  setTimeout(type,1200);
})();

/* ── SKILL FILTER TABS ────────────────────── */
(function(){
  const btns  = document.querySelectorAll('.skf');
  const cards = document.querySelectorAll('.sk-card');
  btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.f;
      cards.forEach(c=>{
        const show = f==='all'||c.dataset.cat===f;
        c.classList.toggle('hidden',!show);
        if(show){
          c.style.opacity='0'; c.style.transform='translateY(20px)';
          requestAnimationFrame(()=>{
            c.style.transition='opacity .35s,transform .35s';
            c.style.opacity='1'; c.style.transform='translateY(0)';
          });
        }
      });
    });
  });
})();

/* ── 3D CARD TILT ─────────────────────────── */
(function(){
  document.querySelectorAll('.proj-card,.cert-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`translateY(-7px) rotateX(${-y*7}deg) rotateY(${x*7}deg)`;
      card.style.transition='border-color .3s,box-shadow .3s,transform .08s';
    });
    card.addEventListener('mouseleave',()=>{
      card.style.transform='';
      card.style.transition='transform .5s ease,border-color .3s,box-shadow .3s';
    });
  });
})();

/* ── CONTACT FORM ─────────────────────────── */
(function(){
  const form=document.getElementById('cForm');
  const ok=document.getElementById('cfOk');
  if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=form.querySelector('button[type=submit]');
    btn.textContent='Sending...'; btn.style.opacity='.7';
    setTimeout(()=>{
      btn.innerHTML='<span class="btn-pulse">◉</span> Send Message';
      btn.style.opacity='1';
      ok.classList.add('show');
      form.reset();
      setTimeout(()=>ok.classList.remove('show'),4500);
    },1300);
  });
})();

/* ── MORE PROJECTS BOX PARTICLE SPARKLE ─── */
(function(){
  const box=document.querySelector('.more-projects-box');
  if(!box) return;
  box.addEventListener('mouseenter',()=>{
    for(let i=0;i<6;i++){
      const sp=document.createElement('div');
      sp.style.cssText=`position:absolute;width:4px;height:4px;border-radius:50%;background:var(--c1);
        left:${Math.random()*100}%;top:${Math.random()*100}%;
        pointer-events:none;z-index:2;
        animation:spkl .7s ease-out forwards;
        transform-origin:center;`;
      box.appendChild(sp);
      setTimeout(()=>sp.remove(),800);
    }
  });
  if(!document.getElementById('spklStyle')){
    const s=document.createElement('style');
    s.id='spklStyle';
    s.textContent=`@keyframes spkl{0%{opacity:1;transform:scale(1) translate(0,0)}100%{opacity:0;transform:scale(0) translate(${Math.random()*40-20}px,${Math.random()*40-20}px)}}`;
    document.head.appendChild(s);
  }
})();

/* ── GLITCH EFFECT ON NAME HOVER ─────────── */
(function(){
  const name=document.querySelector('.hero-name');
  if(!name) return;
  name.addEventListener('mouseenter',()=>{
    name.style.animation='glitch .3s step-end 2';
    setTimeout(()=>name.style.animation='',700);
  });
  const s=document.createElement('style');
  s.textContent=`@keyframes glitch{
    0%{transform:none;filter:none}
    20%{transform:translate(-2px,1px);filter:hue-rotate(90deg)}
    40%{transform:translate(2px,-1px);filter:hue-rotate(-90deg)}
    60%{transform:translate(-1px,2px);filter:none}
    80%{transform:translate(1px,-2px);filter:hue-rotate(45deg)}
    100%{transform:none;filter:none}
  }`;
  document.head.appendChild(s);
})();

/* ── SECTION ENTRANCE SOUND (visual ripple) ─ */
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const sec=e.target;
        sec.style.animation='secEntrance .5s ease both';
        obs.unobserve(sec);
      }
    });
  },{threshold:.05});
  document.querySelectorAll('section').forEach(s=>obs.observe(s));
  const st=document.createElement('style');
  st.textContent=`@keyframes secEntrance{from{opacity:.85}to{opacity:1}}`;
  document.head.appendChild(st);
})();