# Startup Pack Generator

한국어로 스타트업 아이디어를 입력하면 AI가 구조화된 “스타트업 팩”을 만들어주는 Next.js 앱입니다. 비즈니스 모델, 시장 규모(TAM/SAM/SOM), MVP 계획, 경쟁사(링크·설명), XYZ 가설, 검증 계획을 한 번에 제공합니다. 피드백은 Google Apps Script로 수집합니다.

## 주요 기능
- 비즈니스 모델 캔버스 요약
- 한국 시장 기준 TAM/SAM/SOM 바 그래프 + 계산 근거
- MVP 계획 + 텍스트 목업
- 경쟁사 리스트 (실제 URL과 설명 포함)
- XYZ 가설(X/Y/Z 각각 수치/단위, 한국어)
- 리스크 & 검증 계획 (옵션)
- 피드백 수집 (이메일 + 내용 → GAS Web App)

## 실행 방법 (처음부터 끝까지)
1) 필수 준비물
- Node.js 18+
- OpenAI API Key: https://platform.openai.com/api-keys
- Google Apps Script Web App URL (피드백 저장용)

2) 의존성 설치
```bash
npm install
```

3) 환경 변수 설정 (`.env.local`)
루트에 `.env.local` 파일 생성:
```bash
OPENAI_API_KEY=your_openai_api_key_here
GAS_FEEDBACK_URL=https://script.google.com/macros/s/your-deployed-web-app-id/exec
```
- `GAS_FEEDBACK_URL`: 제공된 Apps Script 코드를 Web App으로 배포 후 `/exec`로 끝나는 URL

4) 개발 서버 실행
```bash
npm run dev
```
브라우저에서 http://localhost:3000 접속

5) 사용 흐름
- “스타트업 아이디어” 1문장 입력
- “간단한 설명” 1~3문장 입력
- “스타트업 팩 생성하기” 클릭
- 결과 카드에서 비즈니스 모델, 시장 규모, 경쟁사, MVP, XYZ, 검증 계획 확인
- 필요 시 피드백 카드에서 이메일/내용 제출 (GAS로 전송)

6) 프로덕션 빌드/실행
```bash
npm run build
npm start
```

## Google Apps Script 연동 (피드백)
- `src/app/api/feedback/route.ts`가 `GAS_FEEDBACK_URL`로 JSON POST `{ email, feedback }`를 전송
- Apps Script를 Web App으로 배포 → “Anyone with the link” 허용 → 배포 URL을 `.env.local`에 설정

## 프로젝트 구조
```
src/
├── app/
│   ├── api/
│   │   ├── generate/route.ts    # OpenAI로 스타트업 팩 생성
│   │   └── feedback/route.ts    # GAS로 피드백 전달
│   ├── page.tsx                 # 메인 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   └── globals.css              # 글로벌 스타일
├── components/
│   ├── IdeaForm.tsx             # 입력 폼
│   ├── StartupPack.tsx          # 결과 카드 묶음
│   ├── BusinessModelChart.tsx   # 비즈니스 모델 캔버스 뷰
│   ├── MarketSizeChart.tsx      # 시장 규모 바 그래프 (TAM/SAM/SOM)
│   ├── XYZHypothesis.tsx        # XYZ 가설 카드
│   └── FeedbackForm.tsx         # 피드백 입력 폼
└── lib/
    └── openai.ts                # OpenAI 클라이언트 설정
```

## 동작 개요
- 프런트: 아이디어/설명 입력 → `/api/generate` 호출 → JSON을 받아 카드로 표시
- 시장 규모: 한국 시장 기준 TAM/SAM/SOM 값과 계산 근거 표시
- 경쟁사: 이름/URL/설명 리스트
- XYZ 가설: X/Y/Z 각각 수치·단위·기간을 한국어로 표시
- 피드백: `/api/feedback` → GAS Web App → 스프레드시트 기록 (사용자 코드 기준)

## Vercel 배포 예시
```bash
npm install -g vercel
vercel
vercel env add OPENAI_API_KEY
vercel env add GAS_FEEDBACK_URL
vercel --prod
```

## 라이선스
교육/실습 목적 예제입니다.
