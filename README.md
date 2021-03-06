<p align='middle'>
  <a href='https://www.moduparking.com/'>
    <img src='https://user-images.githubusercontent.com/51367622/130882614-fdfde471-f2c6-4be5-b4e2-afd6181e310c.png' width="300px;" alt="모두 컴퍼니" />
  </a></p>
<p align='middle'>
<h1 align='middle'><a href='https://oneted-moducompany-todolist.netlify.app/'>👀 배포링크</a></h1>

<br/>

## 📌 원티드 프론트엔드 프리온보딩 코스 - 모두컴퍼니 기업과제


❕To-Do List App 만들기❗

<br/>

<details>
    <summary><STRONG>
       📚 과제 요구사항
        </STRONG></summary>
- [필수] 적절한 Header를 만든다.   <br/>
- [필수] 스크롤시 Header가 사라지지 않고 화면 상단에 고정되도록 한다. <br/>
- [필수] 필수적으로 추가해야할 기능: Task 목록 조회, 새로운 Task 추가, Task 삭제 <br/>
- [필수] Drag and Drop으로 Task의 순서를 변경한다. <br/>
- [필수] 최소 두가지 이상의 조건으로 Task를 필터링 (ex. 상태, 생성일, 생성자, 중요도)  <br/>
- [필수] Task의 상태 변경 (ex. 진행중 → 완료) <br/>
</details>

<br/>



## 😀 팀원

- 김준영
- 이지열
- 정태웅
- 조성상

<br/>



## 이미지 및 시연 영상


<img src="https://user-images.githubusercontent.com/52653720/131139681-d9701b39-368a-4610-9afd-a6e705c80bd2.JPG" width="800" height="400">

<img src="https://user-images.githubusercontent.com/55486644/131142351-b4cda206-d302-4e2c-8774-f947296802c1.gif" width="800" height="400">
<br/>



<br/>
<br/>







## 📑 기능분담 

- [x] === 과제 필수 요구사항

#### ✅ 헤더 - 정태웅

- [x] 적절한 Header를 만든다. Task 목록 조회, 새로운 Task 추가,
- [x] 스크롤시 Header가 사라지지 않고 화면 상단에 고정되도록 한다.
- 중앙에 현재 날짜 표시
- Todo 내용 입력하고 완료 목표일 설정하여 Todo 추가 
- Todo Item를 빈 상태로 입력 시도 시 Toast 메시지 출력



#### ✅ 메인 섹션 - 이지열

- [x]  Task 삭제
- 같은 완료 목표일로 묶인 날짜 카드 출력
- 카드 내부에 Todo 완성도 및 각 상태별 Todo Item 갯수 표시
- 최신, 오래된 날짜순으로 정렬 기능
- 카드 삭제 클릭시 같은 완료일로 묶인 전체 Todo Items 삭제 기능



#### ✅ Todo List  - 김준영, 조성상

- [x] Drag and Drop으로 Task의 순서를 변경한다.
- [x] Task의 상태 변경 (ex. 진행중 → 완료)
- [x] 최소 두가지 이상의 조건으로 Task를 필터링 (상태, 생성일조건으로 필터링 진행)

- 날짜별 Todo List card 클릭 시 모달 출력
- 3개의 상태에 따라 Todo Item 필터링 (전체 클릭 시 전체 아이템 출력)
- 개별 Todo Item 삭제
- 일괄 선택하여 한 번에 전체 Todo Item 삭제
- Todo Item Drag and Drop 기능, 애니메이션 추가
- Todo의 상태를 클릭시 상태 변경 가능

<br/>  
<br/>

## 🛠 기술스택

- Language: TypeScript
- Library: React, styled-components, react-datepicker
- Linter: Eslint & Prettier
- State management: Context API

<br/>
<br/>

## 👨‍💻 실행 방법

### git clone, directory change

`git clone https://github.com/ONE-TED/5_moduCompany_team2.git`
`cd 5_moduCompany_team2`

### 설치

`npm install`

### 실행

`npm start`
