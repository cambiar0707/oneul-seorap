(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const PX = window.PX;
  const posts = window.POSTS;
  const SITE = window.SITE;

  /* ---------- 카드 ---------- */
  function card(p) {
    return `
    <a class="card reveal" href="post.html?id=${p.id}" data-cat="${p.cat}">
      <div class="top"><span>${p.date}</span><span class="tag">${p.cat}</span></div>
      <div class="img on-${p.bg}">
        <span class="no">No.${p.no}</span>
        ${PX.sprite(p.sprite)}
        <span class="fmt">PDF · ${p.pages}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      <div class="read"><span class="read-more">자료 보러 가기</span></div>
    </a>`;
  }

  /* ---------- 다운로드 → 쿠팡 ---------- */
  function toast(msg) {
    let t = $('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.innerHTML = PX.sprite('gift') + `<span>${msg}</span>`;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 4200);
  }

  function download(p) {
    // 1) 쿠팡 새 탭 (클릭 이벤트 안에서 바로 열어야 팝업 차단이 안 됨)
    window.open(p.coupang || SITE.coupangDefault, '_blank', 'noopener');
    // 2) 자료 다운로드
    const a = document.createElement('a');
    a.href = p.file;
    a.download = p.file.split('/').pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('쿠팡 창이 열렸어요. 자료는 다운로드 폴더에 들어갔어요.');
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-download]');
    if (!b) return;
    e.preventDefault();
    const p = posts.find(x => x.id === b.dataset.download);
    if (p) download(p);
  });

  /* ---------- 공통: 헤더, 리빌, 푸터 연도 ---------- */
  function reveal() {
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal:not(.in)').forEach((el, i) => {
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      io.observe(el);
    });
  }

  function band() {
    const el = $('.px-band .track');
    if (!el) return;
    const items = [
      ['pencil', '연필 깎는 소리가 나는 오후'], ['apple', '간식은 사과 반쪽'], ['book', '오늘의 서랍을 엽니다'],
      ['star', '틀린 문제에 별 하나'], ['envelope', '매주 화요일 새 자료'], ['house', '집에서 하는 작은 실험'],
      ['heart', '잘하고 있어요, 정말로'], ['clock', '오후 네 시']
    ];
    const html = items.map(([s, t]) => `<span>${PX.sprite(s)}${t}</span>`).join('');
    el.innerHTML = html + html;
  }

  /* ---------- index ---------- */
  function initIndex() {
    const grid = $('#grid');
    grid.innerHTML = posts.map(card).join('');
    $('#count').textContent = posts.length;

    const cats = ['전체', ...new Set(posts.map(p => p.cat))];
    const f = $('#filters');
    f.innerHTML = cats.map((c, i) => `<button class="tag${i ? '' : ' on'}" data-cat="${c}">${c}</button>`).join('');
    f.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', f).forEach(x => x.classList.toggle('on', x === b));
      $$('.card', grid).forEach(c => {
        const show = b.dataset.cat === '전체' || c.dataset.cat === b.dataset.cat;
        c.classList.toggle('hide', !show);
        if (show) { c.classList.remove('in'); requestAnimationFrame(() => c.classList.add('in')); }
      });
    });
  }

  /* ---------- post ---------- */
  function initPost() {
    const id = new URLSearchParams(location.search).get('id');
    const p = posts.find(x => x.id === id) || posts[0];
    document.title = `${p.title} — ${SITE.name}`;
    $('#crumb-cat').textContent = p.cat;

    const fl = ['star', 'pencil', 'heart', 'apple'];
    $('#post-head').innerHTML = `
      <div class="title">
        <div class="top"><span>${p.date} · No.${p.no}</span><span class="tag">${p.cat}</span></div>
        <h1>${p.title}</h1>
        <p class="sub">${p.sub}</p>
        <div class="facts">
          <div>대상<b>${p.grade}</b></div>
          <div>분량<b>PDF ${p.pages}</b></div>
          <div>읽는 시간<b>${p.read}</b></div>
        </div>
      </div>
      <div class="cover on-${p.bg}">
        ${PX.sprite(p.sprite, 'main')}
        ${fl.map((s, i) => PX.sprite(s, 'fl').replace('<svg', `<svg style="left:${[12, 78, 20, 72][i]}%;top:${[18, 22, 70, 68][i]}%;animation-delay:${-i * 2}s"`)).join('')}
      </div>`;

    const art = $('#article');
    art.innerHTML = p.body;
    // 소제목에 픽셀 아이콘 + 목차
    const icons = ['pencil', 'star', 'book', 'heart'];
    const toc = [];
    $$('h2', art).forEach((h, i) => {
      h.id = 's' + i;
      toc.push(`<li><a href="#s${i}">${h.textContent}</a></li>`);
      h.insertAdjacentHTML('afterbegin', PX.sprite(icons[i % icons.length]));
    });
    $('#toc').innerHTML = toc.join('');

    $('#inbox').innerHTML = `
      <div class="list">
        <div class="top"><h3>서랍 안에 든 것</h3><span class="tag">PDF · ${p.pages}</span></div>
        <ul>${p.contents.map((c, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${c}</li>`).join('')}</ul>
        <div class="howto"><h4>이렇게 써 보세요</h4><ol>${p.howto.map(h => `<li>${h}</li>`).join('')}</ol></div>
      </div>
      <div class="preview on-${p.bg}">
        <iframe class="sheet" src="${p.sheet}" tabindex="-1" loading="lazy" title="자료 미리보기"></iframe>
        <div class="peek"><a class="pill-btn" href="${p.sheet}" target="_blank">인쇄용 미리보기</a></div>
      </div>`;

    $('#cta').innerHTML = `
      <div class="msg">
        <h3>${p.title.split(' — ')[0]}<br>PDF로 소장하기</h3>
        <p>A4 ${p.pages} · 인쇄해서 바로 쓰는 버전 · 무료</p>
      </div>
      <div class="act">
        <button class="btn-dl" data-download="${p.id}"><span>자료 받기</span>${PX.sprite('down')}</button>
        <small>버튼을 누르면 쿠팡이 새 창으로 열리고 자료가 다운로드돼요. ${SITE.disclosure}</small>
      </div>`;

    const rel = posts.filter(x => x.id !== p.id).slice(0, 3);
    $('#grid').innerHTML = rel.map(card).join('');

    // 읽기 진행 바
    const bar = $('.progress');
    addEventListener('scroll', () => {
      const r = art.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight * .6)));
      bar.style.width = pct * 100 + '%';
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
    $$('[data-disclosure]').forEach(el => el.textContent = SITE.disclosure);
    if ($('#grid') && $('#filters')) initIndex();
    if ($('#article')) initPost();
    band();
    reveal();
  });
})();
