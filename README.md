# DeskProject

### 💡 계기
나만의 책상을 만들어 방명록도 남기고 메모도 할 수 있게 만들면 좋지 않을까??


-------------                                                


### 📗 목차
1. [기획 및 설계](#기획-및-설계)
2. [기술 스택](#기술-스택)
3. [트러블 슈팅](#트러블-슈팅)
-------------                                                

### ✏️
### 기획 및 설계
#### < 화면 > 
    1. 메인 페이지
    1-1. 창문
    1-2. 물컵
    1-3. 옷
    1-4. 모니터
    2. 메시지 페이지
    3. 메모 페이지
    
    
#### < 상세 페이지 설명 > 
* 1.메인 페이지
  * ![image](https://user-images.githubusercontent.com/91399033/185357110-2c28c7ea-4464-417f-bd3f-77786910dd75.png)
 
  *  맨 처음으로 보여지는 페이지 
      
* 1-1. 창문
  * ![image](https://user-images.githubusercontent.com/91399033/185357809-e4c9f408-eb11-4194-8932-24c8826e80dc.png)

  * 날씨 api를 불러와 날씨에 따라 변화되는 창문 이미지
      
* 1-2. 물컵
  * ![image](https://user-images.githubusercontent.com/91399033/185358131-3cb961f3-4de2-4401-bb9f-1e1c61e4858a.png)

  * 시간에 따라 물컵 안에 있는 내용물 크기가 변경
       
* 1-3. 옷 
  //아직 미완성
  * ![image](https://user-images.githubusercontent.com/91399033/185358721-d51fd6fb-4f79-4f60-9fba-fac38a4e28c5.png)

  * 계절에 따라 옷 이미지가 변경
  
* 1-4. 모니터
  * ![image](https://user-images.githubusercontent.com/91399033/185358992-7044b968-2119-400e-8aa0-49ee2530a08d.png)
  
  * 날씨와 계절 api 출력
  * 랜덤으로 미리 입력한 명언을 출력
  
  
* 2.메시지 페이지
  *  ![image](https://user-images.githubusercontent.com/91399033/185359550-e165d997-ae03-4705-8654-8f1f2433894c.png)
  * 경로 :  메인페이지 > 모니터의 메시지 이미지 
  * 구글 로그인 시 가능
  * 구글 로그인 했을 때 계정의 사진 불러옴
  * firebase database에 저장 후 출력
  

* 3.메모 페이지
 
  * 경로 : 메인페이지 > 모니터 옆에 있는 메모 이미지
  * 메모 작성 가능
  * firebase database에 저장 후 출력

   

-------------    
### 💻
### 기술 스택
>#### API 
>       날씨 API 사용 : https://openweathermap.com/

>#### FE
>      언어 : Javascript
>      프레임워크 : React


>#### BE
>     배포 : Firebase 
>     DB : Cloud Firestore(DB of Firebase)
>       

-------------  
### 🔥
### 트러블 슈팅
..
-------------
