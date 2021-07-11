# 코로나 통계 사이트

### npm start 로 실행
> $ npm start

### axios.get,fetch 를 이용하여 코로나 API 데이터 불러오기 및 그래프로 표현하기

### 당일과 전날의 데이터를 비교하여 확진자 증가 값 구현
![국내 코로나 누적 확진자 차이](https://user-images.githubusercontent.com/58499038/121525421-4b46b500-ca33-11eb-8cd0-42857f70c8f3.png)

### 국내 코로나 누적 확진자 월별 누적,월별 확진자,총 누적확진자 도넛 그래프 표시
![월별 누적 확진자](https://user-images.githubusercontent.com/58499038/121525641-8e088d00-ca33-11eb-8d40-bf9714b529ee.png)

### SelectBox의 Value 값에 맞게 데이터 보여주기 구현
![영국 코로나](https://user-images.githubusercontent.com/58499038/121525979-eb044300-ca33-11eb-9352-97d3eebc1162.png)

### DarkMode 구현
<Light 버전>

![다크모드(라이트)](https://user-images.githubusercontent.com/58499038/121526226-243cb300-ca34-11eb-970c-2a7010df57cf.png)

<Dark버전>

![다크모드(다크)](https://user-images.githubusercontent.com/58499038/121526283-30287500-ca34-11eb-9cab-1458e58cf784.png)

### 국내 거리두기 구현(모달창)

거리두기 데이터 json 파일로 작성 후 리스트로 적용

![거리두기 구현](https://user-images.githubusercontent.com/58499038/121526625-85648680-ca34-11eb-96de-6fd4b31e7258.png)

![거리두기 구현2](https://user-images.githubusercontent.com/58499038/121526679-931a0c00-ca34-11eb-8868-d88842373090.png)

### 아쉬웠던 점
1.국내,해외,영국,미국,전체 만 현재 코로나 정보를 뿌려주는데 다른 나라들도 한꺼번에 받아서 하나의 컴포넌트에서 처리했으면 좋았을거 같다.
2.현재 사용하고 있는 API는 하루에 한번씩 데이터를 추가시키는데 실시간으로 데이터를 추가 시켜 알람 팝업 형식으로 나타냈으면 좋았을거 같다.
3.CSS으로 구현하는것이 아닌 Style Component(인라인 방식)으로 구현을 해보지 못해서 아쉽다.





