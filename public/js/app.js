(() => {
  // ================= SETTINGS =================
  const WA = '923710416136';
  const MAIL = 'webservices7373@gmail.com';

  // Upload these files into the public folder with EXACT names.
  const PHOTOS = {
    web: '/work-web.jpg',          // Service card 1 + portfolio card 1
    photo: '/work-photo.jpg',      // Service card 2 + portfolio card 2
    video: '/work-video.jpg',      // Service card 3 + portfolio card 3
    background: '/bg-main.jpg',    // Main page background/fallback
    feature: '/feature-bg.jpg'     // Feature section background
  };
  const LOGO = '/webedit-logo.svg';
  const VIDEO_BACKGROUND = '/bg-video.mp4'; // Optional animated 1080p background
  // ============================================

  const ready = fn =>
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn)
      : fn();

  if (!document.querySelector('meta[name="viewport"]')) {
    const m = document.createElement('meta');
    m.name = 'viewport';
    m.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(m);
  }

  const uri = svg => 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  const NS = "xmlns='http://www.w3.org/2000/svg'";
  const ART = {
    web: `<svg ${NS} width='600' height='400' viewBox='0 0 600 400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#4f6bff'/><stop offset='1' stop-color='#7ee8ff'/></linearGradient></defs><rect width='600' height='400' fill='url(#g)'/><circle cx='540' cy='50' r='130' fill='#fff' opacity='.14'/><rect x='80' y='60' width='440' height='290' rx='18' fill='#fff'/><path d='M80 78a18 18 0 0 1 18-18h404a18 18 0 0 1 18 18v22H80z' fill='#eef0ff'/><circle cx='104' cy='80' r='6' fill='#ff6b8b'/><circle cx='124' cy='80' r='6' fill='#ffd166'/><circle cx='144' cy='80' r='6' fill='#4ade80'/><rect x='110' y='125' width='210' height='20' rx='10' fill='#10163a'/><rect x='110' y='158' width='170' height='10' rx='5' fill='#c9cff0'/><rect x='110' y='178' width='140' height='10' rx='5' fill='#c9cff0'/><rect x='110' y='208' width='96' height='30' rx='15' fill='#5b4bff'/><rect x='350' y='125' width='140' height='120' rx='14' fill='#9b5cf6'/><rect x='110' y='262' width='120' height='64' rx='12' fill='#eef0ff'/><rect x='244' y='262' width='120' height='64' rx='12' fill='#eef0ff'/><rect x='378' y='262' width='112' height='64' rx='12' fill='#eef0ff'/></svg>`,
    photo: `<svg ${NS} width='600' height='400' viewBox='0 0 600 400'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#9b5cf6'/><stop offset='.6' stop-color='#ff8fc2'/><stop offset='1' stop-color='#ffd1a6'/></linearGradient></defs><rect width='600' height='400' fill='url(#g)'/><circle cx='430' cy='140' r='58' fill='#fff' opacity='.9'/><path d='M0 400V280l110-90 90 70 120-130 130 150 150-80v200z' fill='#4b2f8f' opacity='.85'/><path d='M0 400V330l140-70 120 60 140-90 200 90v80z' fill='#2a1a5e'/><rect x='60' y='50' width='480' height='300' rx='16' fill='none' stroke='#fff' stroke-width='4' opacity='.7'/></svg>`,
    video: `<svg ${NS} width='600' height='400' viewBox='0 0 600 400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#ff8a5c'/><stop offset='1' stop-color='#9b5cf6'/></linearGradient></defs><rect width='600' height='400' fill='url(#g)'/><circle cx='300' cy='170' r='80' fill='#fff' opacity='.95'/><path d='M280 130l62 40-62 40z' fill='#9b5cf6'/><rect x='60' y='300' width='480' height='40' rx='12' fill='#fff' opacity='.25'/><rect x='70' y='308' width='120' height='24' rx='8' fill='#fff'/><rect x='200' y='308' width='90' height='24' rx='8' fill='#ffd166'/><rect x='300' y='308' width='150' height='24' rx='8' fill='#7ee8ff'/><rect x='460' y='308' width='70' height='24' rx='8' fill='#fff' opacity='.7'/></svg>`,
    hero: `<svg ${NS} width='1200' height='900' viewBox='0 0 1200 900' preserveAspectRatio='xMidYMid slice'><defs><filter id='b' x='-50%' y='-50%' width='200%' height='200%'><feGaussianBlur stdDeviation='70'/></filter></defs><circle cx='1020' cy='120' r='260' fill='#a855f7' opacity='.28' filter='url(#b)'/><circle cx='120' cy='160' r='230' fill='#22b8e6' opacity='.26' filter='url(#b)'/><circle cx='620' cy='700' r='300' fill='#ff5fa2' opacity='.16' filter='url(#b)'/><g fill='none' stroke='#5b4bff' stroke-opacity='.12'><circle cx='980' cy='200' r='170'/><circle cx='980' cy='200' r='250'/><circle cx='180' cy='700' r='140'/><circle cx='180' cy='700' r='210'/></g></svg>`
  };
  const shade = 'linear-gradient(180deg,rgba(8,12,40,0) 35%,rgba(8,12,40,.72))';

  const base = document.createElement('style');
  base.textContent = `
.process{width:min(var(--max,1180px),calc(100% - 40px));margin:0 auto;padding:64px 0 24px}
.process-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px}
.process-step{padding:26px;border:1px solid var(--line,#e4e7fb);border-radius:var(--radius,18px);background:var(--card-bg,rgba(255,255,255,.82));box-shadow:var(--shadow-sm,0 10px 30px rgba(55,65,140,.08));backdrop-filter:blur(12px)}
.process-step b{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--grad,linear-gradient(120deg,#246bff,#a23bff));color:#fff;font-family:Manrope,sans-serif;margin-bottom:14px}
.process-step h3{font:700 18px Manrope,sans-serif;margin:0 0 6px}
.process-step p{margin:0;color:var(--muted,#65708e);font-size:13px;line-height:1.65}
.rv{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease}
.rv.in{opacity:1;transform:none}
.wes-bg-video{position:fixed;inset:0;width:100vw;height:100vh;object-fit:cover;z-index:-2;pointer-events:none;opacity:.58;filter:saturate(1.05)}
.wes-bg-overlay{position:fixed;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(180deg,rgba(247,249,255,.42),rgba(248,245,255,.60))}
.wes-brand-logo{display:block;width:clamp(125px,15vw,205px);height:auto;max-height:48px;object-fit:contain;object-position:left center}
.service-card{overflow:hidden;isolation:isolate}
.service-card::before{content:"";display:block;height:170px;margin:-27px -27px 22px;background:${uri(ART.web)} center/cover no-repeat;border-radius:inherit}
.service-card:nth-child(2)::before{background:${uri(ART.photo)} center/cover no-repeat}
.service-card:nth-child(3)::before{background:${uri(ART.video)} center/cover no-repeat}
.portfolio-visual{height:210px;place-items:end start;padding:18px;font-size:18px;background:${shade},${uri(ART.web)} center/cover no-repeat;border-radius:14px}
.portfolio-visual.v2{background:${shade},${uri(ART.photo)} center/cover no-repeat}
.portfolio-visual.v3{background:${shade},${uri(ART.video)} center/cover no-repeat}
.feature-section{background-size:cover;background-position:center;background-repeat:no-repeat}
.wc-launch{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:9999;width:58px;height:58px;border:1px solid rgba(255,255,255,.6);border-radius:50%;background:var(--grad,linear-gradient(135deg,#176dff,#a43bff));color:#fff;box-shadow:0 12px 30px rgba(91,75,255,.32);cursor:pointer;display:grid;place-items:center;transition:transform .2s ease,box-shadow .2s ease}
.wc-launch:hover{transform:translateY(-3px);box-shadow:0 16px 34px rgba(91,75,255,.4)}
.wc-box{position:fixed;right:16px;bottom:calc(86px + env(safe-area-inset-bottom));z-index:9999;width:min(370px,calc(100vw - 32px));height:min(560px,calc(100dvh - 130px));min-height:350px;display:none;flex-direction:column;background:var(--panel,#fff);color:var(--text,#1a2142);border:1px solid rgba(130,140,210,.25);border-radius:22px;box-shadow:0 22px 70px rgba(28,38,100,.22);overflow:hidden;backdrop-filter:blur(18px)}
.wc-box.open{display:flex;animation:wc-in .22s ease-out}
@keyframes wc-in{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
.wc-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 16px;background:var(--grad,linear-gradient(120deg,#176dff,#a43bff));color:#fff;flex-shrink:0}
.wc-head-brand{display:flex;align-items:center;gap:10px;min-width:0}
.wc-bot-icon{width:37px;height:37px;border-radius:12px;background:rgba(255,255,255,.2);display:grid;place-items:center;font-size:21px;flex-shrink:0}
.wc-head b{display:block;font-size:14px;letter-spacing:.1px}
.wc-head small{display:block;opacity:.86;font-size:11px;margin-top:2px}
.wc-x{background:rgba(255,255,255,.12);border:0;color:#fff;font-size:18px;cursor:pointer;width:32px;height:32px;border-radius:10px;flex-shrink:0}
.wc-log{flex:1;min-height:0;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:9px;scroll-behavior:smooth;background:linear-gradient(180deg,rgba(248,249,255,.86),rgba(255,255,255,.96))}
.wc-m{max-width:88%;align-self:flex-start;padding:10px 12px;border:1px solid rgba(113,129,196,.10);border-radius:5px 14px 14px 14px;background:#f0f3ff;color:#222947;font-size:13px;line-height:1.55;white-space:pre-line;overflow-wrap:anywhere}
.wc-m.me{align-self:flex-end;background:linear-gradient(135deg,#2d6bff,#7c45fa);color:#fff;border:0;border-radius:14px 5px 14px 14px}
.wc-m a{color:inherit;text-decoration:underline}
.wc-typing{font-size:12px;color:#66708d;font-style:italic}
.wc-chips{display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px 10px;background:#fff;border-top:1px solid #eef0fa;max-height:104px;overflow:auto;flex-shrink:0}
.wc-chips button{border:1px solid #dfe4ff;background:#fff;color:#34416f;border-radius:99px;padding:7px 10px;font-size:11px;cursor:pointer;transition:background .15s ease,border-color .15s ease}
.wc-chips button:hover{background:#f0f2ff;border-color:#aebaff}
.wc-row{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #edf0fb;background:#fff;flex-shrink:0}
.wc-row input{flex:1;min-width:0;padding:11px 12px;border:1px solid #dfe4f5;border-radius:12px;background:#f9faff;color:#202746;font-size:16px;outline:none}
.wc-row input:focus{border-color:#8b8cff;box-shadow:0 0 0 3px rgba(91,75,255,.08)}
.wc-row button{border:0;border-radius:12px;width:44px;background:linear-gradient(120deg,#246bff,#8d45ff);color:#fff;font-size:18px;font-weight:700;cursor:pointer;flex-shrink:0}
.wc-wa{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;background:#18c875;color:#fff;text-decoration:none;font-weight:750;font-size:13px;flex-shrink:0}
.wc-wa:hover{background:#13b768}
.wc-powered{font-size:10px;color:#8991ad;text-align:center;padding:4px 8px;background:#fff}
@media(max-width:800px){.process{padding:42px 0 18px}.process-grid{grid-template-columns:1fr}.service-card::before{height:155px}.portfolio-visual{height:180px}}
@media(max-width:480px){.wc-box{right:10px;bottom:calc(78px + env(safe-area-inset-bottom));width:calc(100vw - 20px);height:min(570px,calc(100dvh - 112px));min-height:330px;border-radius:18px}.wc-launch{width:54px;height:54px;right:13px;bottom:calc(13px + env(safe-area-inset-bottom))}.wc-m{font-size:12.5px}.wc-chips button{padding:6px 9px}.process{width:calc(100% - 28px)}}
@media(prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}.wc-box.open{animation:none}.wc-launch{transition:none}.wes-bg-video{display:none}}
`;
  document.head.appendChild(base);

  ready(() => {
    const isApp = !!document.querySelector('[data-admin-note],[data-dashboard-name]');

    // ---------- Mobile menu ----------
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.textContent = open ? '✕' : '☰';
      });
    }

    // ---------- Current year ----------
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    // ---------- Login-aware menu ----------
    let loggedIn = false;
    try { loggedIn = !!localStorage.getItem('wes_token'); } catch (e) {}
    if (loggedIn) {
      document.querySelectorAll('a[href*="login"]').forEach(link => {
        if (!/sign\s*in|log\s*in/i.test(link.textContent)) return;
        const out = link.cloneNode(true);
        out.textContent = 'Logout';
        out.setAttribute('href', '#');
        out.addEventListener('click', e => {
          e.preventDefault();
          try {
            localStorage.removeItem('wes_token');
            localStorage.removeItem('wes_email');
          } catch (err) {}
          window.location.href = 'index.html';
        });
        link.textContent = 'Dashboard';
        link.setAttribute('href', 'dashboard.html');
        link.insertAdjacentElement('afterend', out);
      });
    }

    // ---------- WhatsApp contact forms ----------
    document.querySelectorAll('[data-wa-form]').forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault();
        const d = new FormData(form);
        const message = [
          'Hello WebEdit Studio!',
          `Name: ${d.get('name') || 'there'}`,
          `Email: ${d.get('email') || 'Not provided'}`,
          `Service: ${d.get('service') || 'General enquiry'}`,
          `Message: ${d.get('message') || ''}`
        ].join('\n');
        window.open(`https://wa.me/${WA}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      });
    });

    if (isApp) return;

    // ---------- Add logo to an existing header brand slot ----------
    const brandSlot = document.querySelector(
      '[data-site-logo], .site-logo, .brand-logo, .nav-brand, .navbar-brand, header .logo, header a.logo'
    );
    if (brandSlot && !brandSlot.querySelector('img')) {
      const logoImg = document.createElement('img');
      logoImg.className = 'wes-brand-logo';
      logoImg.src = LOGO;
      logoImg.alt = 'WebEdit Studio';
      logoImg.loading = 'eager';
      logoImg.decoding = 'async';
      logoImg.onerror = () => logoImg.remove();
      if (/webedit|studio/i.test(brandSlot.textContent || '') || brandSlot.hasAttribute('data-site-logo')) {
        brandSlot.replaceChildren(logoImg);
      } else {
        brandSlot.prepend(logoImg);
      }
      brandSlot.setAttribute('aria-label', 'WebEdit Studio');
      brandSlot.setAttribute('title', 'WebEdit Studio');
    }

    // Add the generated logo as a favicon if the page has none.
    if (!document.querySelector('link[rel~="icon"]')) {
      const icon = document.createElement('link');
      icon.rel = 'icon';
      icon.type = 'image/png';
      icon.href = '/webedit-logo.png';
      document.head.appendChild(icon);
    }

    // ---------- HD background video, with image fallback ----------
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.style.backgroundColor = '#f5f7ff';
    document.body.style.backgroundColor = 'transparent';
    document.body.style.backgroundImage = `url("${PHOTOS.background}")`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';

    if (!reduceMotion && !document.querySelector('.wes-bg-video')) {
      const video = document.createElement('video');
      video.className = 'wes-bg-video';
      video.src = VIDEO_BACKGROUND;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-hidden', 'true');
      video.setAttribute('disablepictureinpicture', '');
      video.addEventListener('error', () => video.remove(), { once: true });
      document.body.prepend(video);
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === 'function') playAttempt.catch(() => {});

      const overlay = document.createElement('div');
      overlay.className = 'wes-bg-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(overlay, document.body.children[1] || null);
    }

    // ---------- Service and portfolio photography ----------
    const deco = document.createElement('style');
    deco.textContent = `
body::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background:${uri(ART.hero)} center/cover no-repeat;opacity:.16}
.service-card{overflow:hidden}
.service-card::before{content:"";display:block;height:150px;margin:-27px -27px 22px;background:${uri(ART.web)} center/cover no-repeat}
.service-card:nth-child(2)::before{background:${uri(ART.photo)} center/cover no-repeat}
.service-card:nth-child(3)::before{background:${uri(ART.video)} center/cover no-repeat}
.portfolio-visual{height:210px;place-items:end start;padding:18px;font-size:18px;background:${shade},${uri(ART.web)} center/cover no-repeat}
.portfolio-visual.v2{background:${shade},${uri(ART.photo)} center/cover no-repeat}
.portfolio-visual.v3{background:${shade},${uri(ART.video)} center/cover no-repeat}
`;
    document.head.appendChild(deco);

    const U = p => `url("${p}") center/cover`;
    const RULES = {
      web: p => `.service-card::before{background:${U(p)}}.portfolio-visual{background:${shade},${U(p)}}`,
      photo: p => `.service-card:nth-child(2)::before{background:${U(p)}}.portfolio-visual.v2{background:${shade},${U(p)}}`,
      video: p => `.service-card:nth-child(3)::before{background:${U(p)}}.portfolio-visual.v3{background:${shade},${U(p)}}`,
      background: p => `html{background-color:#f6f7ff}body{background-image:url("${p}");background-position:center;background-size:cover;background-attachment:fixed}`, 
      feature: p => `.feature-section{background-image:linear-gradient(rgba(238,240,255,.82),rgba(248,239,255,.86)),${U(p)} no-repeat;background-size:cover;background-position:center}`
    };
    Object.keys(PHOTOS).forEach(key => {
      if (!RULES[key]) return;
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        const s = document.createElement('style');
        s.textContent = RULES[key](PHOTOS[key]);
        document.head.appendChild(s);
      };
      img.onerror = () => {
        // The built-in SVG illustrations remain visible if a photo is missing.
      };
      img.src = PHOTOS[key];
    });

    // ---------- How it works (home page only) ----------
    const cta = document.querySelector('.cta');
    if (cta && document.querySelector('.hero') && !document.querySelector('.process')) {
      const section = document.createElement('section');
      section.className = 'process';
      const steps = [
        ['1', 'Share your idea', 'Send the contact form or message us on WhatsApp with what you need.'],
        ['2', 'Get a custom quote', 'We discuss your requirements and share pricing on WhatsApp.'],
        ['3', 'Track your order', 'Create a free account, place orders and follow their status in your dashboard.']
      ];
      section.innerHTML =
        '<div class="section-heading"><h2>How it <span>works</span></h2></div>' +
        '<div class="process-grid">' +
        steps.map(([n, h, p]) =>
          `<div class="process-step"><b>${n}</b><h3>${h}</h3><p>${p}</p></div>`).join('') +
        '</div>';
      cta.parentNode.insertBefore(section, cta);
    }

    // ---------- Scroll reveal ----------
    if ('IntersectionObserver' in window && !reduceMotion) {
      const io = new IntersectionObserver(list => list.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
        window.setTimeout(() => entry.target.classList.remove('rv', 'in'), 800);
      }), { threshold: 0.12 });
      document.querySelectorAll(
        '.service-card,.content-card,.process-step,.feature-list>div,.stat-card'
      ).forEach(node => {
        node.classList.add('rv');
        io.observe(node);
      });
    }

    // ---------- WebEdit FAQ assistant (rule-based, no external AI API) ----------
    if (document.querySelector('.wc-box')) return; // Prevent duplicate widgets.

    const el = (tag, className, text) => {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined && text !== null) node.textContent = text;
      return node;
    };

    const FAQ = [
      {
        key: 'greeting',
        pattern: /\b(hi|hello|hey|salam|assalam|aoa|good morning|good evening)\b/i,
        answer: 'Hello! 👋 Welcome to WebEdit Studio. I can guide you about websites, photo editing, video editing, pricing, orders and contact details. What would you like to know?'
      },
      {
        key: 'pricing',
        pattern: /price|pricing|cost|\brate\b|charge|quote|how much|budget|kitna|qeemat|keemat|paisay|paise|fees|sasta|cheap/i,
        answer: 'Our pricing is customised for each project, so we do not publish fixed prices here. Tell us what you need, your deadline and any features you have in mind; we will discuss a quote with you on WhatsApp.'
      },
      {
        key: 'website',
        pattern: /website|web site|web development|web design|landing page|business site|portfolio site|online store|e.?commerce|custom site|site banana|website banana|web ban|website ban/i,
        answer: '🌐 Website Development: we can discuss a responsive business website, landing page, portfolio, service website or online store. Share your preferred design, pages and features on WhatsApp so the requirements and quote can be confirmed.'
      },
      {
        key: 'photo',
        pattern: /photo|picture|image|tasveer|pic\b|retouch|background remove|background change|enhance|hd image|upscale|thumbnail/i,
        answer: '🖼️ Photo Editing: we can discuss clean retouching, colour correction, background changes, image enhancement and creative edits. Send a sample image and explain the result you want on WhatsApp.'
      },
      {
        key: 'video',
        pattern: /video|reel|shorts?|youtube edit|tiktok|transition|clip|montage|video edit|editing video/i,
        answer: '🎬 Video & Reels Editing: we can discuss short-form reels, social clips, cuts, transitions, captions and a polished final edit. Share the footage, target platform and preferred style to receive a custom quote.'
      },
      {
        key: 'services',
        pattern: /services?|what do you do|what do you offer|offer|available work|kya kart|konsay kaam|kaun se kaam|kaam kya/i,
        answer: 'Our main services are: 1) Website Development, 2) Photo Editing, and 3) Video & Reels Editing. Use the quick buttons below to learn more about one service, or tell me what you are planning.'
      },
      {
        key: 'order',
        pattern: /how to order|place an order|order|book|start project|kaam dena|order kaise|kaam kaise shuru/i,
        answer: '📝 To get started: 1) tell us which service you need, 2) share your requirements and deadline, 3) discuss the quote on WhatsApp, and 4) confirm the project details before work begins. If your site account has a dashboard, you can also use it to check your order status.'
      },
      {
        key: 'account',
        pattern: /account|register|sign ?up|log ?in|login|dashboard|password|profile/i,
        answer: 'For account or login help, open the Login/Sign Up page on the website and follow the instructions there. Never share your password or verification codes in chat; if the problem continues, contact us on WhatsApp.'
      },
      {
        key: 'delivery',
        pattern: /delivery|deliver|turn.?around|how long|deadline|time take|kitna time|kab tak|jaldi|urgent|days?/i,
        answer: 'Delivery time depends on the project size, supplied files and requested changes. Tell us your target date on WhatsApp first, and we will confirm whether that schedule is possible before accepting the project.'
      },
      {
        key: 'revisions',
        pattern: /revision|revise|change|correction|edit again|modify|update|badalna|tabdeeli/i,
        answer: 'Revision requirements should be agreed before the project starts. Please explain what needs changing and share the relevant reference; we will confirm the available revisions and any additional cost on WhatsApp.'
      },
      {
        key: 'seo',
        pattern: /\bseo\b|google ranking|rank on google|search engine|search console|keywords?|google search|first page/i,
        answer: '🔎 SEO helps search engines understand a website, but first-page ranking cannot be guaranteed. We can discuss page titles, descriptions, useful content, technical basics and Google Search Console setup depending on your project.'
      },
      {
        key: 'domain',
        pattern: /domain|\.com|web address|custom url|website name|domain name/i,
        answer: 'A custom domain such as yourbrand.com is usually registered separately and may have a renewal fee. Free hosting addresses often include the hosting provider name; tell us your desired domain and budget so we can discuss the options.'
      },
      {
        key: 'hosting',
        pattern: /hosting|host website|deploy|deployment|railway|render|github pages|vercel|netlify|live website|publish site/i,
        answer: 'Hosting and deployment depend on the technology and features your website needs. A simple static site is different from a site requiring a server, login or database; share the project setup and any error message so we can help identify the right path.'
      },
      {
        key: 'database',
        pattern: /database|supabase|firebase|save data|stored data|backend|admin panel|admin dashboard/i,
        answer: 'A database or admin panel requires a correctly configured backend, access rules and secure credentials. The exact setup depends on the project; do not put private API keys or database passwords in public frontend code or GitHub.'
      },
      {
        key: 'responsive',
        pattern: /mobile|responsive|phone|tablet|screen size|mobile friendly/i,
        answer: 'A responsive website adapts its layout to phones, tablets and desktop screens. Tell us which devices and pages matter most so those layouts can be checked as part of the project.'
      },
      {
        key: 'payment',
        pattern: /payment|pay|paid|advance|deposit|bank|easypaisa|jazzcash|paypal|refund|return money/i,
        answer: 'Payment method, any advance and cancellation/refund terms should be agreed clearly before work starts. Please confirm the current terms with us on WhatsApp; never send card PINs, passwords or one-time verification codes.'
      },
      {
        key: 'discount',
        pattern: /discount|coupon|promo|offer code|sale|free work|free website|muft|free/i,
        answer: 'Current discounts or coupons are not guaranteed. Message us on WhatsApp with the service you need and we can tell you whether any offer is available at that time.'
      },
      {
        key: 'logo',
        pattern: /logo|brand identity|branding|brand design/i,
        answer: 'A logo helps make a brand recognisable. Send the brand name, preferred colours and a few visual references on WhatsApp; we can confirm whether your design request fits the services available for your project.'
      },
      {
        key: 'portfolio',
        pattern: /portfolio|sample|examples?|previous work|show me work|projects?|demo/i,
        answer: 'You can browse the Portfolio/Our Work section on the website for the examples currently displayed. If you have a particular style in mind, send a reference on WhatsApp so we can discuss a suitable direction.'
      },
      {
        key: 'security',
        pattern: /security|secure|privacy|data safe|hack|hacked|password|personal data/i,
        answer: 'Security depends on how the website and any backend are built and configured. Use strong unique passwords, keep private keys on the server, enable HTTPS and never share your login codes in chat.'
      },
      {
        key: 'chatbot',
        pattern: /chatbot|chat bot|assistant|ai|artificial intelligence|robot/i,
        answer: 'This is an automated FAQ assistant: it matches common questions with prepared answers, so it is not a live person or a full AI model. For detailed or unusual requests, the WhatsApp button connects you with the business contact.'
      },
      {
        key: 'contact',
        pattern: /contact|whatsapp|email|reach|talk to|message you|number|rabta|baat kar/i,
        answer: `You can contact WebEdit Studio here:\nWhatsApp: +${WA}\nEmail: ${MAIL}\nFor a quicker quote, include the service name, requirements and deadline.`
      },
      {
        key: 'email',
        pattern: /email|mail address|gmail/i,
        answer: `Our contact email is ${MAIL}. You can also use the green WhatsApp button below to send a project enquiry directly.`
      },
      {
        key: 'support',
        pattern: /support|help|problem|issue|error|not working|does not work|doesn't work|masla|problem hai/i,
        answer: 'I will try to guide you. Tell me which page or feature is not working and copy the exact error message if there is one. For account-specific help, contact us through WhatsApp; do not post passwords or secret keys.'
      },
      {
        key: 'social',
        pattern: /social media|instagram|facebook|youtube|post design|story|banner|cover|reel size/i,
        answer: 'We can discuss visual content and short videos for social platforms. Tell us the platform, dimensions, quantity and preferred style so we can confirm the scope and quote.'
      },
      {
        key: 'about',
        pattern: /about|who are you|your studio|your company|webedit studio/i,
        answer: 'WebEdit Studio focuses on website development, photo editing and video/reels editing. We discuss project requirements and pricing directly, with WhatsApp as the main contact channel.'
      },
      {
        key: 'thanks',
        pattern: /thank|thanks|shukriya|jazak/i,
        answer: 'You are welcome! 😊 Ask another question any time, or message us on WhatsApp if you want to discuss a specific project.'
      },
      {
        key: 'goodbye',
        pattern: /\b(bye|goodbye|allah hafiz|khuda hafiz|see you)\b/i,
        answer: 'Thanks for visiting WebEdit Studio. Take care! 👋 You can return here or contact us on WhatsApp whenever you need project information.'
      }
    ];

    const FALL = 'I may not have a prepared answer for that yet. You can ask about our services, pricing, delivery time, SEO, website hosting or orders. For a specific request, please message us on WhatsApp and we will help you further.';

    const box = el('div', 'wc-box');
    box.id = 'wes-chat-box';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'WebEdit Assistant chat');

    const head = el('div', 'wc-head');
    const headBrand = el('div', 'wc-head-brand');
    const botIcon = el('div', 'wc-bot-icon', '✦');
    botIcon.setAttribute('aria-hidden', 'true');
    const titleWrap = el('div');
    titleWrap.append(
      el('b', '', 'WebEdit Assistant'),
      el('small', '', 'Automated FAQ · WhatsApp support')
    );
    headBrand.append(botIcon, titleWrap);
    const close = el('button', 'wc-x', '✕');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close chat');
    head.append(headBrand, close);

    const log = el('div', 'wc-log');
    log.setAttribute('aria-live', 'polite');
    log.setAttribute('aria-relevant', 'additions');

    const chips = el('div', 'wc-chips');
    chips.setAttribute('aria-label', 'Suggested questions');
    const row = el('form', 'wc-row');
    const inp = el('input');
    inp.type = 'text';
    inp.name = 'question';
    inp.autocomplete = 'off';
    inp.maxLength = 500;
    inp.placeholder = 'Type your question...';
    inp.setAttribute('aria-label', 'Type your question');
    const go = el('button', '', '➤');
    go.type = 'submit';
    go.setAttribute('aria-label', 'Send message');
    row.append(inp, go);

    const wa = el('a', 'wc-wa', '☏  Chat on WhatsApp');
    wa.href = `https://wa.me/${WA}?text=${encodeURIComponent('Hello WebEdit Studio! I have a question about your services.')}`;
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    const powered = el('div', 'wc-powered', 'Automated replies · Not a person');
    box.append(head, log, chips, row, wa, powered);

    const launch = el('button', 'wc-launch');
    launch.type = 'button';
    launch.id = 'wes-chat-launch';
    launch.setAttribute('aria-label', 'Open WebEdit chat assistant');
    launch.setAttribute('aria-controls', box.id);
    launch.setAttribute('aria-expanded', 'false');
    launch.innerHTML = '<svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.8 8.8 0 0 1-4-.9L3 20l1.1-4.1a8.3 8.3 0 1 1 16.9-4.4z"/><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01"/></svg>';

    const say = (message, fromUser = false) => {
      const node = el('div', 'wc-m' + (fromUser ? ' me' : ''), message);
      log.appendChild(node);
      log.scrollTop = log.scrollHeight;
      return node;
    };

    const pickReply = question => {
      const q = question.toLowerCase().replace(/[’‘]/g, "'").trim();
      const match = FAQ.find(item => item.pattern.test(q));
      return match ? match.answer : FALL;
    };

    let greeted = false;
    let typingTimer = null;
    const ask = question => {
      const q = String(question || '').trim();
      if (!q) return;
      say(q, true);
      inp.value = '';
      chips.querySelectorAll('button').forEach(button => { button.disabled = true; });
      const typing = el('div', 'wc-m wc-typing', 'WebEdit Assistant is preparing a reply…');
      log.appendChild(typing);
      log.scrollTop = log.scrollHeight;
      if (typingTimer) window.clearTimeout(typingTimer);
      typingTimer = window.setTimeout(() => {
        typing.remove();
        say(pickReply(q));
        chips.querySelectorAll('button').forEach(button => { button.disabled = false; });
        log.scrollTop = log.scrollHeight;
      }, 320);
    };

    [
      'Services', 'Website', 'Photo editing', 'Video editing',
      'Pricing', 'How to order', 'Delivery time', 'SEO', 'Contact'
    ].forEach(label => {
      const button = el('button', '', label);
      button.type = 'button';
      button.addEventListener('click', () => ask(label));
      chips.appendChild(button);
    });

    row.addEventListener('submit', event => {
      event.preventDefault();
      ask(inp.value);
    });

    const openChat = () => {
      box.classList.add('open');
      launch.setAttribute('aria-expanded', 'true');
      if (!greeted) {
        greeted = true;
        say('Hi! 👋 Welcome to WebEdit Studio. Ask me about website development, photo editing, video editing, pricing or how to order. You can also choose a topic below.');
      }
      window.setTimeout(() => inp.focus(), 50);
    };
    const closeChat = () => {
      box.classList.remove('open');
      launch.setAttribute('aria-expanded', 'false');
      launch.focus();
    };

    launch.addEventListener('click', () => {
      if (box.classList.contains('open')) {
        box.classList.remove('open');
        launch.setAttribute('aria-expanded', 'false');
      } else {
        openChat();
      }
    });
    close.addEventListener('click', closeChat);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && box.classList.contains('open')) closeChat();
    });

    document.body.append(box, launch);
  });
})();
