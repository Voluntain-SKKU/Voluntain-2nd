# Voluntain-2nd

<div align="center">
<img width="329" alt="image" src="https://user-images.githubusercontent.com/50205887/207568862-cdc9e2c0-b03c-43ff-bf46-3ba79a110d0c.png">

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FVoluntain-SKKU%2FVoluntain-2nd&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

</div>

# Voluntain Web Page v2.0
> **성균관대학교 소프트웨어학과 온라인 해외봉사 단체** <br/> **개발기간: 2022.03 ~ 2022.10**

## 배포 주소

> **개발 버전** : [http://voluntain.cs.skku.edu/](http://voluntain.cs.skku.edu/) <br>
> **프론트 서버** : [http://voluntain.cs.skku.edu:33307/](http://voluntain.cs.skku.edu:33307/)<br>
> **백엔드 서버** : [http://voluntain.cs.skku.edu:2223/](http://voluntain.cs.skku.edu:2223/)<br>

## 웹개발팀 소개

|      박지예       |          서채연         |       이현정         |                                                                                                               
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | 
|   <img width="160px" src="https://user-images.githubusercontent.com/50205887/205326013-af001243-a77d-4601-8bfc-aa713931cf95.png" />    |                      <img width="160px" src="https://user-images.githubusercontent.com/50205887/207570536-f5a82e48-99a1-4399-91d3-75fc5f8f3349.png" />    |                   <img width="160px" src="https://user-images.githubusercontent.com/50205887/207570634-247c3715-a54e-4f63-8c08-9b266f8a35f7.png"/>   |
|   [@parkjiye](https://github.com/parkjiye)   |    [@ChaeyeonSeo](https://github.com/ChaeyeonSeo)  | [@hyunjeong408](https://github.com/hyunjeong408)  |
| 성균관대학교 소프트웨어학과 4학년 | 성균관대학교 소프트웨어학과 4학년 | 성균관대학교 소프트웨어학과 4학년 |

## 프로젝트 소개

#### Voluntain will share the knowledge of programming.
You can take easy-to-understand lectures created by our team, including Scratch and Python. Also, improve your understanding and application skills of programming with exercise questions in the lecture videos.



#### Voluntain's website will give you a learning-friendly environment.

Our website supports the following component.
1. Various online lectures with detailed descriptions and exercise questions.
2. Q&A section to ask questions freely.
3. Function to check the lecture you watched recently.

<!--
---

## 시작 가이드
### Requirements
For building and running the application you need:

- [Java 11](https://www.oracle.com/kr/java/technologies/javase/jdk11-archive-downloads.html)
- [Gradle 7.4.1](https://gradle.org/)

### Installation
```bash
git clone https://github.com/thefarmersfront/kurly-account-management-backend.git
cd kurly-account-management-backend
```

---

## Stacks 🐈

### Environment
![IntelliJ](https://img.shields.io/badge/IntelliJ-000000?style=for-the-badge&logo=IntelliJ%20IDEA&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             

### Config
![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white)         

### Development
![Java](https://img.shields.io/badge/Java-ED7014?style=for-the-badge)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white)
![Keycloak](https://img.shields.io/badge/Keycloak-66D7EB?style=for-the-badge&logoColor=white)

### Test

![Jacoco](https://img.shields.io/badge/Jacoco-C21325?style=for-the-badge)

### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=Trello&logoColor=white)
![GoogleMeet](https://img.shields.io/badge/GoogleMeet-00897B?style=for-the-badge&logo=Google%20Meet&logoColor=white)

---


## 0. 사용 버전
- strapi 3.6.6
- npm 6.14.12
- node v12.22.1

## 1. 실행 방법
```
$ cd voluntain-app
$ npm install 
$ cd ..
$ npm run dev
```

## 2. 기술 스택
Server-side
- 백엔드 프레임워크: Strapi

Client-side
- 뷰 레이어 : React, next.js
- CSS 라이브러리 : Bootstrap, Material UI

## 3. 폴더 구조
```bash
├── README.md : 리드미 파일
│
├── strapi-backend/ : 백엔드
│   ├── api/ : db model, api 관련 정보 폴더
│   │   └── [table 이름] : database table 별로 분리되는 api 폴더 (table 구조, 해당 table 관련 api 정보 저장)
│   │       ├── Config/routes.json : api 설정 파일 (api request에 따른 handler 지정)
│   │       ├── Controllers/ [table 이름].js : api controller 커스텀 파일
│   │       ├── Models : db model 관련 정보 폴더
│   │       │   ├── [table 이름].js : (사용 X) api 커스텀 파일
│   │       │   └── [table 이름].settings.json : model 정보 파일 (field 정보)
│   │       └─── Services/ course.js : (사용 X) api 커스텀 파일
│   │ 
│   ├── config/ : 서버, 데이터베이스 관련 정보 폴더
│   │   ├── Env/production : 배포 환경(NODE_ENV = production) 일 때 설정 정보 폴더
│   │   │   └── database.js : production 환경에서 database 설정 파일
│   │   ├── Functions : 프로젝트에서 실행되는 함수 관련 정보 폴더
│   │   │   │   ├── responses : (사용 X) 커스텀한 응답 저장 폴더
│   │   │   │   ├── bootstrap.js : 어플리케이션 시작 시 실행되는 코드 파일
│   │   │   │   └── cron.js : (사용 X) cron task 관련 파일
│   │   ├── database.js : 기본 개발 환경(NODE_ENV = development)에서 database 설정 파일
│   │   └── server.js : 서버 설정 정보 파일
│   │  
│   ├── extensions/
│   │   └── users-permissions/config/ : 권한 정보
│   │ 
│   └── public/
│       └── uploads/ : 강의 별 사진
│
└── voluntain-app/ : 프론트엔드
    ├── components/
    │   ├── NavigationBar.js : 네비게이션 바 컴포넌트, _app.js에서 공통으로 전체 페이지에 포함됨.
    │   ├── MainBanner.js : 메인 페이지에 있는 남색 배너 컴포넌트, 커뮤니티 이름과 슬로건을 포함.
    │   ├── RecentLecture.js : 사용자가 시청 정보(쿠키)에 따라, 현재/다음 강의를 나타내는 컴포넌트 [호출: MainCookieCard]
    │   ├── MainCookieCard.js : 상위 RecentLecture 컴포넌트에서 전달받은 props를 나타내는 레이아웃 컴포넌트.
    │   ├── MainCard.js : 현재 등록된 course 정보를 백엔드에서 받아서 카드로 나타내는 컴포넌트 [호출: CourseCard]
    │   └── CourseCard.js : 상위 MainCard 컴포넌트에서 전달받은 props를 나타내는 레이아웃 컴포넌트
    │
    ├── config/
    │   └── next.config.js
    │
    ├── lib/
    │   └── ga/
    │   │   └── index.js
    │   └── context.js
    │
    ├── pages/
    │   ├── courses/
    │   │   └── [id].js : 강의 페이지
    │   ├── _app.js : Next.js에서 전체 컴포넌트 구조를 결정, 공통 컴포넌트(navbar, footer)가 선언되도록 customizing 됨.
    │   ├── _document.js : Next.js에서 전체 html 문서의 구조를 결정, lang 속성과 meta tag가 customizing 됨.
    │   ├── about.js : 단체 소개 페이지
    │   ├── index.js : 메인 페이지
    │   ├── question.js : Q&A 페이지
    │   └── setting.js : 쿠키, 구글 애널리틱스 정보 수집 정책 페이지
    │
    ├── public/
    │   ├── favicon.ico : 네비게이션바 이미지
    │   └── logo_about.png : about 페이지 로고 이미지
    │
    └── styles/
        └── Home.module.css

```

## 기타
1) 계정
- Strapi
- MySQL
 
2) notion: https://www.notion.so/Voluntain-Web-ab060e44e6ec4b69b966f5e774a4a8f0
- API
- Strapi content type
- 웹디자인 자료
- 운영 매뉴얼
- issue
-->
