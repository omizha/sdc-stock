# KOI-CLIENT

## 소개
KOI-CLIENT는 파티 게임 플랫폼의 프론트엔드 애플리케이션입니다. React와 TypeScript를 기반으로 제작되었으며, 실시간 주식 거래 게임을 포함한 다양한 파티 게임을 제공합니다.

## 기술 스택
- React 18
- TypeScript
- Vite
- Tanstack Query
- Supabase Auth

## 주요 기능
### 1. 인증 시스템
- Supabase를 활용한 소셜 로그인
- 프로필 관리 기능

### 2. 주식 게임
- 실시간 주가 변동 시스템
- 호스트/플레이어 화면 분리
- 실시간 순위 시스템
- 라운드 시스템

### 3. 레이아웃
- 반응형 모바일 레이아웃
- 커스텀 스크롤뷰
- 도트 폰트 적용

## 설치 및 실행
1. 의존성 설치
```bash
yarn install
```

2. 개발 서버 실행
```bash
yarn dev
```

## 스타일 가이드
- Emotion과 Linaria를 사용한 스타일링 (Deprecated Linaria)
- DungGeunMo 폰트 기본 적용
- 모바일 우선 반응형 디자인