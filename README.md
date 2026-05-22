# 근무 스케줄 PWA 📱

교대근무자(데이/나이트/오프 8개 패턴) 전용 식단·수면·운동 스케줄러. 폰에 앱처럼 설치 가능.

## ✨ 기능

- **8개 근무 패턴** (DD / DN / NN / NO / DO / OO / OD / ON) 각각의 Day 1·Day 2 타임라인
- **목표 칼로리·단백질 자동 계산** — 나이/키/체중 입력하면 BMR·TDEE·deficit 자동
- **운동 강도 선택** — Light(45분) / Normal(75분)
- **OD 패턴 운전 방식** — 새벽 출발 / 전날 밤 출발 토글
- **수면 / 카페인 / 운전 안전 가이드** 카드형 표시
- **비타민 가이드** — D3, 오메가3, 마그네슘, B복합 등 복용 타이밍
- **체크리스트** — 타임라인 항목 탭하면 완료 체크
- **오프라인 작동** + **홈 화면 설치** (PWA)
- **데이터는 폰에 저장** (localStorage) — 서버 X, 외부 전송 X

---

## 🚀 GitHub Pages에 올리기 (5분)

### 1. GitHub 계정 만들기
[github.com](https://github.com) 가입 (이미 있으면 스킵)

### 2. 새 저장소 만들기
- 우상단 **`+`** → **New repository** 클릭
- Repository name: **`shift-schedule`** (원하는 이름)
- **Public** 선택 (Pages는 무료 플랜에서 public만 가능)
- **Create repository** 클릭

### 3. 파일 업로드
- 새로 만든 저장소 페이지에서 **`Add file`** → **`Upload files`** 클릭
- 아래 6개 파일을 **모두** 드래그앤드롭:
  ```
  index.html
  manifest.webmanifest
  sw.js
  icon-192.png
  icon-512.png
  icon-maskable-512.png
  favicon.png
  ```
- 하단 **`Commit changes`** 클릭

### 4. GitHub Pages 활성화
- 저장소 상단 **`Settings`** 탭 클릭
- 왼쪽 메뉴 **`Pages`** 클릭
- **Source**: `Deploy from a branch`
- **Branch**: `main` / `/ (root)` 선택 → **Save**
- 1~2분 기다리면 상단에 URL 표시됨:
  ```
  https://[내아이디].github.io/shift-schedule/
  ```

### 5. 폰에서 접속 + 앱 설치

**📱 iPhone (Safari)**
1. Safari로 위 URL 접속
2. 하단 **공유 버튼** (⬆️) 탭
3. **"홈 화면에 추가"** 선택 → 추가
4. 홈에 🌅 아이콘 생김 → 탭하면 앱처럼 풀스크린

**🤖 Android (Chrome)**
1. Chrome으로 위 URL 접속
2. 우상단 **메뉴** (⋮) 탭
3. **"홈 화면에 추가"** 또는 **"앱 설치"** 선택
4. 홈에 아이콘 생김 → 탭하면 풀스크린

---

## ⚙️ 사용법

- **메인 화면 우상단 ⚙️** → 프로필 편집 (나이/체중/목표/운동강도/OD운전방식)
- **8개 패턴 카드 탭** → 상세 타임라인 진입
- **타임라인 아이콘 탭** → 완료 체크 (✓ 줄긋기)
- **데이터는 폰에만 저장** — 다른 기기에서 보면 초기 상태

---

## 🛠️ 수정하고 싶을 때

`index.html` 안에 `SHIFTS` 배열에서 타임라인 항목, 시간, 식단을 바꿀 수 있어요. `FOOD` 객체에서 칼로리/단백질도 조정 가능.

GitHub 저장소에서 `index.html` 클릭 → 연필 아이콘(편집) → 수정 → Commit. 1분 뒤 자동 배포됩니다.

---

## 📁 파일 구조

```
shift-schedule/
├── index.html              ← 앱 본체 (React + 전체 로직)
├── manifest.webmanifest    ← PWA 설치 메타데이터
├── sw.js                   ← 서비스워커 (오프라인 캐시)
├── icon-192.png            ← 아이콘 (홈 화면)
├── icon-512.png            ← 아이콘 (스플래시)
├── icon-maskable-512.png   ← Android adaptive icon
├── favicon.png             ← 브라우저 탭 아이콘
└── README.md
```

---

## ❓ 트러블슈팅

**아이콘이 안 보여요**  
폰의 캐시 때문. PWA 삭제 후 재설치하거나 폰 재부팅.

**업데이트가 반영 안 돼요**  
서비스워커가 캐시함. iOS는 사파리 → 설정 → 사파리 → 기록 및 웹사이트 데이터 지우기. Android는 Chrome → 설정 → 사이트 설정 → 데이터 삭제.

**다른 기기에서도 데이터 동기화하고 싶어요**  
현재는 폰에만 저장 (localStorage). 클라우드 동기화는 Firebase 같은 백엔드 추가 필요.

---

Built with React + Tailwind via CDN. No build step.
