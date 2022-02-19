## POODADAK-DB GUIDE
- 현재 Repository에서는 POODADAK local 구동 시 필요한 화장실 DB를 다운로드 및 제작할 수 있습니다.
## script 이용 DB 만들기

- 현재 Repository에 있는 script파일로 API를 이용하여 공공데이터 포털에 있는 전국공중화장실표준데이터를 JSON파일로 저장할 수 있습니다.

1. git clone 받기

```
git clone https://github.com/POODADAK/poodadak-database.git
```

2. 해당 폴더로 이동

```
cd poodadak-database
```

3. module 설치

```
 npm install
```

4. 코드 에디터 실행

```
code .
```

5. [전국공중화장실표준데이터](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15012892) API키 발급.

6. `getToiletInfoForDeploy.js` 파일에 API_KEY 해당 키 입력.

7. script 실행

```
node getToiletInfoForDeploy.js
```

8. 동일 폴더에 newKoreaToiletInfo.json 파일 생성.

---

## DB 이용하기

- 다운받은 DB 또는 새로 만든 DB JSON 파일을 mongoDB compass를 이용해 local에 import 하여 사용할 수 있습니다.
