# 오후 네 시 서랍

초등 엄마를 위한 학습 자료 배포 블로그 (정적 사이트, 빌드 없음)

## 구조
```
index.html            메인 (소개 + 자료 그리드 + 칼럼 + 구독)
post.html?id=...      게시물 상세 (에세이 + 자료 구성 + 미리보기 + 다운로드)
assets/posts.js       ★ 사이트 설정(쿠팡 링크) + 모든 게시물 글
assets/style.css      디자인 (나눔스퀘어, 자간 -0.07em)
assets/pixel.js       픽셀아트 스프라이트
assets/app.js         렌더링, 필터, 다운로드→쿠팡 흐름
worksheets/*.html     A4 학습지 원본 (인쇄용 미리보기로도 사용)
files/*.pdf           실제 다운로드되는 PDF
```

## 쿠팡 링크 바꾸기
`assets/posts.js` 맨 위 `coupangDefault`를 쿠팡 파트너스 링크로 교체.
게시물마다 다른 상품을 연결하려면 각 게시물의 `coupang: ''`에 링크를 넣으면 됩니다.
다운로드 버튼을 누르면 → 쿠팡이 새 탭으로 열리고 → PDF가 다운로드됩니다.
(파트너스 고지 문구는 버튼 아래와 푸터에 자동 표시)

## 새 자료 추가
1. `worksheets/`에 기존 파일을 복사해 학습지 작성
2. PDF로 출력:
   ```
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf=files/새파일.pdf "file://$PWD/worksheets/새파일.html"
   ```
3. `assets/posts.js` 배열 맨 앞에 게시물 객체 추가 (`sprite`는 pixel.js의 이름, `bg`는 black/gray/red/green/sky/sand)

## 배포
폴더 전체를 Netlify / Vercel / GitHub Pages에 그대로 올리면 됩니다.
