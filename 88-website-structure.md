# 대학연합 기획 동아리 "88" 웹사이트 파일 구조

## 프로젝트 개요
- **동아리명**: 88 (대학연합 기획 동아리)
- **테마**: "삶에 ( )을 더하다" 
- **첫 번째 프로젝트**: "삶에 쉼을 더하다" - 나만의 여행 디자인
- **웹사이트 특징**: 매치러브 사이트를 참고한 인터랙티브 멀티 프로젝트 사이트

## 전체 폴더 구조

```
88-club-website/
├── index.html                      # 메인 페이지
├── package.json                    # 프로젝트 설정
├── package-lock.json               # 의존성 잠금 파일
├── README.md                       # 프로젝트 설명서
├── .gitignore                      # Git 무시 파일
├── assets/                         # 정적 자원 폴더
│   ├── css/                        # CSS 파일들
│   │   ├── default.css             # 기본 스타일
│   │   ├── style.css               # 메인 스타일
│   │   ├── responsive.css          # 반응형 스타일
│   │   ├── animations.css          # 애니메이션 스타일
│   │   └── components/             # 컴포넌트별 CSS
│   │       ├── navigation.css      # 네비게이션 스타일
│   │       ├── hero.css            # 히어로 섹션 스타일
│   │       ├── project-cards.css   # 프로젝트 카드 스타일
│   │       ├── about.css           # 소개 섹션 스타일
│   │       └── footer.css          # 푸터 스타일
│   ├── js/                         # JavaScript 파일들
│   │   ├── main.js                 # 메인 스크립트
│   │   ├── navigation.js           # 네비게이션 로직
│   │   ├── animations.js           # 애니메이션 로직
│   │   ├── project-toggle.js       # 프로젝트 토글 기능
│   │   ├── scroll-effects.js       # 스크롤 효과
│   │   └── libs/                   # 외부 라이브러리
│   │       ├── jquery.min.js       # jQuery
│   │       ├── wow.min.js          # WOW 애니메이션
│   │       ├── slick.min.js        # 슬라이더
│   │       ├── anime.min.js        # Anime.js (고급 애니메이션)
│   │       └── particles.min.js    # 파티클 효과
│   ├── images/                     # 이미지 파일들
│   │   ├── logo/                   # 로고 이미지
│   │   │   ├── logo-88.png         # 메인 로고
│   │   │   ├── logo-88-white.png   # 흰색 로고
│   │   │   └── favicon.ico         # 파비콘
│   │   ├── hero/                   # 히어로 섹션 이미지
│   │   │   ├── hero-bg.jpg         # 배경 이미지
│   │   │   └── hero-pattern.svg    # 패턴 이미지
│   │   ├── projects/               # 프로젝트 이미지
│   │   │   ├── travel/             # 여행 프로젝트 이미지
│   │   │   │   ├── travel-thumb.jpg
│   │   │   │   ├── travel-hero.jpg
│   │   │   │   └── travel-gallery/
│   │   │   ├── music/              # 음악 프로젝트 이미지 (예정)
│   │   │   └── future-projects/    # 향후 프로젝트 이미지
│   │   ├── team/                   # 팀 멤버 이미지
│   │   │   ├── member-01.jpg
│   │   │   ├── member-02.jpg
│   │   │   └── placeholder.jpg     # 기본 프로필 이미지
│   │   ├── icons/                  # 아이콘 파일들
│   │   │   ├── social/             # 소셜 미디어 아이콘
│   │   │   ├── navigation/         # 네비게이션 아이콘
│   │   │   └── ui/                 # UI 아이콘들
│   │   └── backgrounds/            # 배경 이미지들
│   │       ├── section-bg-01.jpg
│   │       ├── section-bg-02.jpg
│   │       └── texture-pattern.png
│   └── fonts/                      # 웹폰트 파일들
│       ├── NotoSansKR/             # 노토산스 한글
│       └── Poppins/                # 영문 폰트
├── pages/                          # 개별 페이지들
│   ├── about.html                  # 동아리 소개 페이지
│   ├── projects/                   # 프로젝트 페이지들
│   │   ├── index.html              # 프로젝트 목록
│   │   ├── travel/                 # 여행 프로젝트
│   │   │   ├── index.html          # 여행 프로젝트 메인
│   │   │   ├── detail.html         # 상세 내용
│   │   │   └── app.html            # 여행 코스 짜기 앱
│   │   ├── music/                  # 음악 프로젝트 (예정)
│   │   │   └── index.html
│   │   └── templates/              # 프로젝트 템플릿
│   │       └── project-template.html
│   ├── team.html                   # 팀 소개 페이지
│   ├── contact.html                # 연락처 페이지
│   └── recruitment.html            # 모집 안내 페이지
├── components/                     # 재사용 가능한 컴포넌트들
│   ├── header.html                 # 헤더 컴포넌트
│   ├── footer.html                 # 푸터 컴포넌트
│   ├── navigation.html             # 네비게이션 컴포넌트
│   ├── project-card.html           # 프로젝트 카드 컴포넌트
│   └── modal.html                  # 모달 컴포넌트
├── data/                          # 데이터 파일들
│   ├── projects.json              # 프로젝트 데이터
│   ├── team-members.json          # 팀 멤버 데이터
│   └── config.json                # 사이트 설정
└── docs/                          # 문서 파일들
    ├── design-system.md           # 디자인 시스템 가이드
    ├── development-guide.md       # 개발 가이드
    └── content-guide.md           # 콘텐츠 가이드
```

## 주요 파일 설명

### 1. 메인 HTML 파일 (index.html)
- **헤더**: 로고, 네비게이션, 토글 메뉴
- **히어로 섹션**: "삶에 ( )을 더하다" 메인 메시지와 인터랙티브 요소
- **프로젝트 섹션**: 각 프로젝트를 카드 형태로 표시하며 클릭 시 해당 프로젝트로 이동
- **동아리 소개**: 88 동아리의 비전과 목표
- **팀 소개**: 핵심 멤버들 소개
- **연락처**: 가입 문의 및 연락 정보

### 2. CSS 구조
- **default.css**: 전역 스타일, 리셋 CSS, 기본 변수 정의
- **style.css**: 메인 레이아웃 및 컴포넌트 스타일
- **responsive.css**: 모바일, 태블릿, 데스크톱 반응형 스타일
- **animations.css**: 페이드인, 슬라이드, 회전 등 각종 애니메이션
- **components/**: 각 컴포넌트별로 분리된 CSS 파일들

### 3. JavaScript 구조
- **main.js**: 전역 설정, 초기화 함수
- **navigation.js**: 스무스 스크롤, 모바일 메뉴 토글
- **animations.js**: 스크롤 기반 애니메이션, 인터랙션 효과
- **project-toggle.js**: 프로젝트 카드 호버/클릭 이벤트
- **scroll-effects.js**: 패럴랙스, 스크롤 진행률 표시

### 4. 프로젝트별 구조
각 프로젝트는 독립적인 폴더를 가지며:
- **index.html**: 프로젝트 개요 및 소개
- **detail.html**: 프로젝트 상세 설명 및 과정
- **app.html**: 실제 기능하는 애플리케이션 (여행 코스 짜기 등)

## 인터랙티브 요소

### 1. 네비게이션
- 고정 헤더에서 스크롤 시 배경 변화
- 모바일에서 햄버거 메뉴로 변환
- 현재 섹션 하이라이트

### 2. 프로젝트 카드
- 호버 시 3D 변형 효과
- 클릭 시 모달 또는 새 페이지로 전환
- 로딩 애니메이션

### 3. 스크롤 효과
- 패럴랙스 배경 이미지
- 섹션별 페이드인 애니메이션
- 스크롤 진행률 표시바

### 4. 인터랙티브 타이틀
- "삶에 ( )을 더하다"에서 괄호 안 단어가 타이핑 효과로 변경
- 각 프로젝트를 대표하는 키워드들이 순환

## 반응형 디자인

### 데스크톱 (1200px+)
- 3단 그리드 레이아웃
- 큰 히어로 섹션
- 사이드바 네비게이션 옵션

### 태블릿 (768px-1199px)
- 2단 그리드 레이아웃
- 중간 크기 히어로 섹션
- 탭 네비게이션

### 모바일 (767px 이하)
- 1단 세로 레이아웃
- 햄버거 메뉴
- 터치 최적화된 버튼 크기

## 애니메이션 라이브러리 활용

### 1. WOW.js + Animate.css
- 스크롤 기반 진입 애니메이션
- fadeIn, slideIn, bounce 등 다양한 효과

### 2. Anime.js
- 복잡한 SVG 애니메이션
- 타임라인 기반 시퀀스 애니메이션

### 3. Particles.js
- 히어로 섹션 배경 파티클 효과
- 인터랙티브 마우스 따라가기

## 성능 최적화

### 1. 이미지 최적화
- WebP 포맷 사용 (fallback으로 JPG/PNG)
- 레이지 로딩 적용
- 반응형 이미지 (srcset 활용)

### 2. CSS/JS 최적화
- CSS/JS 압축 및 번들링
- 크리티컬 CSS 인라인
- 비동기 스크립트 로딩

### 3. 캐싱 전략
- 정적 자원 브라우저 캐싱
- CDN 활용 고려