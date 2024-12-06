# KOI-SERVER

## 소개
KOI-SERVER는 파티 게임 플랫폼의 백엔드 애플리케이션입니다. NestJS와 TypeScript를 기반으로 제작되었으며, MongoDB를 데이터베이스로 사용합니다.

## 기술 스택
- NestJS
- TypeScript
- MongoDB (Mongoose)
- AWS Lambda
- Serverless Framework

## 주요 기능

### 1. 파티 시스템
- 파티 생성/조회/수정/삭제
- 파티 참가/탈퇴
- 실시간 파티 상태 관리

### 2. 게임 기능
- 주식 게임 시스템
- 투표 시스템

### 3. 배포
- AWS Lambda를 통한 서버리스 배포
- Serverless Framework 사용

## 설치 및 실행

1. 의존성 설치
```bash
yarn install
```

2. 환경 변수 설정
`.env` 파일을 생성하고 다음 변수를 설정하세요:
```
MONGO_URI=your_mongodb_connection_string
```

3. 개발 서버 실행
```bash
yarn dev
```

4. 프로덕션 빌드
```bash
yarn build
```
