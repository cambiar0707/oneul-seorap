/* 픽셀아트 스프라이트 — 문자 격자를 SVG로 그린다 */
(function () {
  const PAL = {
    k: '#1b1a17', w: '#fbf9f4', r: '#c4512f', R: '#8f3420', y: '#d9a63e', Y: '#f1cf7a',
    g: '#8fa676', G: '#55693f', b: '#8fb0c6', B: '#46607a', p: '#e9a9a0', s: '#f2c9a5',
    n: '#8a5a3b', N: '#6b4229', l: '#ddd6c8', c: '#cfdde6', e: '#ece3d3'
  };

  const S = {
    pencil: [
      '....kkkk....',
      '....kppk....',
      '....kppk....',
      '....kllk....',
      '....kyyk....',
      '....kyYk....',
      '....kyYk....',
      '....kyYk....',
      '....kyYk....',
      '....kyyk....',
      '....kssk....',
      '.....ks.....',
      '.....kk.....'
    ],
    book: [
      '............',
      '..kkkkkkkkk.',
      '..krrrrrrRk.',
      '..krrrrrrRk.',
      '..krwwwwrRk.',
      '..krwkkwrRk.',
      '..krwwwwrRk.',
      '..krrrrrrRk.',
      '..krrrrrrRk.',
      '..kkkkkkkkk.',
      '..kwwwwwwwk.',
      '...kkkkkkkk.'
    ],
    heart: [
      '............',
      '..kkk..kkk..',
      '.krrrkkrrrk.',
      '.krwrrrrrrk.',
      '.krrrrrrrRk.',
      '..krrrrrRk..',
      '...krrrRk...',
      '....krRk....',
      '.....kk.....'
    ],
    apple: [
      '......k.....',
      '......kgg...',
      '...kkkkkkk..',
      '..krrrkrrrk.',
      '.krwrrrrrrRk',
      '.krwrrrrrrRk',
      '.krrrrrrrrRk',
      '.krrrrrrrrRk',
      '..krrrrrrRk.',
      '..krrrrrrRk.',
      '...kkk.kkk..'
    ],
    house: [
      '.....kk.....',
      '....krrk....',
      '...krrrrk...',
      '..krrrrrrk..',
      '.krrrrrrrrk.',
      'kkkkkkkkkkkk',
      '.kwwwwwwwwk.',
      '.kwbbwwnnwk.',
      '.kwbbwwnnwk.',
      '.kwwwwwnnwk.',
      '.kwwwwwnYwk.',
      '.kkkkkkkkkk.'
    ],
    lamp: [
      '...kkkk...',
      '..kyyyyk..',
      '.kyyyyyyk.',
      'kkkkkkkkkk',
      '......k...',
      '.....k....',
      '....k.....',
      '...k......',
      '....k.....',
      '.....k....',
      '...kkkk...',
      '..kkkkkk..'
    ],
    cup: [
      '..r.....',
      '..ry.b..',
      '..ryyb..',
      '.kkkkkk.',
      '.kgggGk.',
      '.kgwgGk.',
      '.kgggGk.',
      '.kgggGk.',
      '.kkkkkk.'
    ],
    books: [
      '..kkkkkkkk..',
      '..kbbbbbbBk.',
      '.kkkkkkkkkk.',
      '.krrrrrrrRk.',
      'kkkkkkkkkkk.',
      'kyyyyyyyyYk.',
      'kkkkkkkkkkk.'
    ],
    plant: [
      '....g.....',
      '...gGg.g..',
      '.g.gGggG..',
      '.gGgGgGg..',
      '..gGgGg...',
      '...gGg....',
      '....G.....',
      '..kkkkkk..',
      '..krrrrk..',
      '...krrk...',
      '...kkkk...'
    ],
    mug: [
      'kkkkkk..',
      'kwwwwkkk',
      'kwrrwk.k',
      'kwwwwkkk',
      'kkkkkk..'
    ],
    clock: [
      '..kkkkk..',
      '.kwwwwwk.',
      'kwwwkwwwk',
      'kwwwkwwwk',
      'kwwwkkkwk',
      'kwwwwwwwk',
      'kwwwwwwwk',
      '.kwwwwwk.',
      '..kkkkk..'
    ],
    paper: [
      'kkkkkkkk',
      'kwwwwwwk',
      'kwkkkkwk',
      'kwwwwwwk',
      'kwkkkwwk',
      'kwwwwwwk',
      'kwrwkkwk',
      'kwwwwwwk',
      'kwrwkkwk',
      'kwwwwwwk',
      'kkkkkkkk'
    ],
    star: [
      '.....k.....',
      '....kyk....',
      '....kyk....',
      'kkkkyyykkkk',
      '.kyyyyyyyk.',
      '..kyyyyyk..',
      '..kyyyyyk..',
      '.kyykkkyyk.',
      'kykk...kkyk',
      'kk.......kk'
    ],
    envelope: [
      'kkkkkkkkkkkk',
      'kkwwwwwwwwkk',
      'kwkwwwwwwkwk',
      'kwwkwwwwkwwk',
      'kwwwkrrkwwwk',
      'kwwwwkkwwwwk',
      'kwwwwwwwwwwk',
      'kwwwwwwwwwwk',
      'kkkkkkkkkkkk'
    ],
    bubble: [
      '.kkkkkkkkkk.',
      'kwwwwwwwwwwk',
      'kwwwwwwwwwwk',
      'kwwkwwkwwkwk',
      'kwwwwwwwwwwk',
      '.kkkwwkkkkk.',
      '...kwk......',
      '...kk.......'
    ],
    gift: [
      '..kk....kk..',
      '.kyyk..kyyk.',
      '..kyykkyyk..',
      'kkkkkkkkkkkk',
      'krrrrYyrrrrk',
      'kkkkkkkkkkkk',
      '.krrrYyrrrk.',
      '.krrrYyrrrk.',
      '.krrrYyrrRk.',
      '.krrrYyrrRk.',
      '.kkkkkkkkkk.'
    ],
    cat: [
      '.k........k.',
      '.kk......kk.',
      '.kwkkkkkkwk.',
      '.kwwwwwwwwk.',
      'kwwkwwwwkwwk',
      'kwwkwwwwkwwk',
      'kwpwwrrwwpwk',
      'kwwwkwwkwwwk',
      '.kwwwkkwwwk.',
      '..kkkkkkkk..'
    ],
    magnifier: [
      '..kkkkk.....',
      '.kwwbbbk....',
      'kwwbbbbbk...',
      'kwbbbbbbk...',
      'kbbbbbbbk...',
      '.kbbbbbk....',
      '..kkkkkkk...',
      '.......kkk..',
      '........nnk.',
      '.........nnk',
      '..........kk'
    ],
    hourglass: [
      'kkkkkkkkkk',
      '.knnnnnnk.',
      '.kwYYYYwk.',
      '..kwYYwk..',
      '...kwYk...',
      '....kk....',
      '...kwyk...',
      '..kwwywk..',
      '.kwwYYYwk.',
      '.kYYYYYYk.',
      '.knnnnnnk.',
      'kkkkkkkkkk'
    ],
    coins: [
      '..kkkkkkkk..',
      '.kYYYYYYYYk.',
      '.kyyyyyyyyk.',
      '..kkkkkkkk..',
      '.kYYYYYYYYk.',
      '.kyyyyyyyyk.',
      '..kkkkkkkk..',
      '.kYYYYYYYYk.',
      '.kyyyyyyyyk.',
      '..kkkkkkkk..'
    ],
    megaphone: [
      '........kk..',
      '......kkrk..',
      '..kkkkrrrk..',
      '.kwwwrrrrk.w',
      '.kwwwrrrrk..',
      '.kwwwrrrrk.w',
      '..kkkkrrrk..',
      '...kk.kkrk..',
      '...kk...kk..'
    ],
    down: [
      '..kkkk..',
      '..kwwk..',
      '..kwwk..',
      'kkkwwkkk',
      '.kwwwwk.',
      '..kwwk..',
      '...kk...',
      'kkkkkkkk'
    ]
  };

  function rects(rows, ox, oy, extra) {
    let out = '';
    rows.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        const ch = row[x];
        if (ch === '.' || ch === ' ' || !PAL[ch]) { x++; continue; }
        let len = 1;
        while (row[x + len] === ch) len++;
        out += `<rect x="${ox + x}" y="${oy + y}" width="${len}" height="1" fill="${PAL[ch]}"${extra || ''}/>`;
        x += len;
      }
    });
    return out;
  }

  function sprite(name, cls) {
    const rows = S[name] || S.star;
    const w = Math.max(...rows.map(r => r.length));
    const h = rows.length;
    const size = Math.max(w, h);
    const ox = Math.floor((size - w) / 2), oy = Math.floor((size - h) / 2);
    return `<svg class="px ${cls || ''}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" aria-hidden="true">${rects(rows, ox, oy)}</svg>`;
  }

  /* 히어로: 오후 네 시의 책상 */
  function scene() {
    let g = '';
    // 벽 패널 (모서리 깎은 사각)
    g += `<path d="M2 0h44v1h1v1h1v44h-1v1h-1v1H2v-1H1v-1H0V2h1V1h1z" fill="#ebe3d4"/>`;
    // 창문
    g += `<rect x="6" y="5" width="20" height="16" fill="${PAL.k}"/>`;
    g += `<rect x="7" y="6" width="18" height="14" fill="${PAL.c}"/>`;
    g += `<rect x="20" y="8" width="3" height="3" fill="${PAL.y}"/><rect x="21" y="7" width="1" height="5" fill="${PAL.Y}"/><rect x="19" y="9" width="5" height="1" fill="${PAL.Y}"/>`;
    g += `<g class="cloud"><rect x="9" y="11" width="5" height="1" fill="${PAL.w}"/><rect x="8" y="12" width="8" height="2" fill="${PAL.w}"/></g>`;
    g += `<rect x="16" y="6" width="1" height="14" fill="${PAL.k}"/><rect x="7" y="13" width="18" height="1" fill="${PAL.k}"/>`;
    g += `<rect x="5" y="21" width="22" height="1" fill="${PAL.n}"/>`;
    // 시계
    g += rects(S.clock, 34, 7);
    // 책상
    g += `<rect x="1" y="35" width="46" height="1" fill="${PAL.k}"/>`;
    g += `<rect x="1" y="36" width="46" height="2" fill="${PAL.n}"/>`;
    g += `<rect x="1" y="38" width="46" height="1" fill="${PAL.N}"/>`;
    g += `<rect x="4" y="39" width="2" height="8" fill="${PAL.N}"/><rect x="42" y="39" width="2" height="8" fill="${PAL.N}"/>`;
    g += `<rect x="30" y="39" width="12" height="5" fill="${PAL.n}"/><rect x="35" y="41" width="2" height="1" fill="${PAL.Y}"/>`;
    // 책상 위
    g += rects(S.books, 3, 28);
    g += rects(S.plant, 4, 17);
    g += rects(S.cup, 16, 26);
    g += rects(S.mug, 25, 30);
    g += `<g class="steam"><rect x="26" y="27" width="1" height="1" fill="#a9a294"/><rect x="27" y="26" width="1" height="1" fill="#a9a294"/><rect x="28" y="28" width="1" height="1" fill="#a9a294"/></g>`;
    // 펼친 학습지
    g += `<rect x="16" y="34" width="9" height="1" fill="${PAL.w}"/>`;
    // 램프 + 불빛
    g += `<polygon class="glow" points="36,27 44,27 46,35 33,35" fill="${PAL.Y}" opacity=".35"/>`;
    g += rects(S.lamp, 35, 23);
    return `<svg class="px-scene" viewBox="0 0 48 48" shape-rendering="crispEdges" aria-hidden="true">
      <style>
        .glow{animation:glow 3s ease-in-out infinite}
        .steam rect{animation:steam 2.4s steps(4) infinite}
        .steam rect:nth-child(2){animation-delay:-.8s}.steam rect:nth-child(3){animation-delay:-1.6s}
        .cloud{animation:cloud 12s steps(6) infinite alternate}
        @keyframes glow{50%{opacity:.12}}
        @keyframes steam{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-3px);opacity:0}}
        @keyframes cloud{to{transform:translateX(5px)}}
      </style>${g}</svg>`;
  }

  window.PX = { sprite, scene, names: Object.keys(S) };

  // data-px="name" 자동 채우기
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-px]').forEach(el => {
      el.outerHTML = sprite(el.dataset.px, el.className);
    });
    const sc = document.querySelector('[data-scene]');
    if (sc) sc.innerHTML = scene();
  });
})();
