/* 학습지 공통: 머리말·꼬리말, 빈 줄 생성 */
document.addEventListener('DOMContentLoaded', () => {
  const b = document.body;
  const pages = [...document.querySelectorAll('.page')];
  pages.forEach((p, i) => {
    p.insertAdjacentHTML('afterbegin',
      `<div class="hd"><span class="l">${window.PX ? PX.sprite(b.dataset.icon || 'pencil') : ''}오후 네 시 서랍</span><span class="r">No.${b.dataset.no} · ${b.dataset.title}</span></div>`);
    p.insertAdjacentHTML('beforeend',
      `<div class="ft"><span><b>오후 네 시 서랍</b> · 개인·가정 내 사용 가능, 재배포 시 출처 표기</span><span>${i + 1} / ${pages.length}</span></div>`);
  });
  setTimeout(()=>{document.body.dataset.overflow=pages.map((p,i)=>p.scrollHeight>p.clientHeight+1?(i+1)+':'+(p.scrollHeight-p.clientHeight)+'px':'').filter(Boolean).join(',')||'none'},1500);
  // <tbody data-rows="5" data-cols="4"> 빈 행 채우기, data-first="1,2,3" 첫 칸 번호
  document.querySelectorAll('tbody[data-rows]').forEach(tb => {
    const n = +tb.dataset.rows, c = +tb.dataset.cols;
    const first = tb.dataset.first ? tb.dataset.first.split(',') : null;
    let h = '';
    for (let r = 0; r < n; r++) {
      h += '<tr>';
      for (let k = 0; k < c; k++) h += `<td${k === 0 && first ? ' class="c num"' : ''}>${k === 0 && first ? (first[r] || '') : ''}</td>`;
      h += '</tr>';
    }
    tb.insertAdjacentHTML('beforeend', h);
  });
});
