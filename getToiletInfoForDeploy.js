const fs = require("fs");
const axios = require("axios");
const API_KEY = "...";

async function getJSONDate() {
  console.time("Time : ");
  const items = [];

  try {
    for (let i = 0; i < 350; i++) {
      const { data } = await axios.get(
        `http://api.data.go.kr/openapi/tn_pubr_public_toilet_api?serviceKey=${API_KEY}&pageNo=${i}&numOfRows=100&type=json`
      );

      const toiletList = data.response.body.items;

      toiletList.forEach((toilet) => {
        if (
          toilet.longitude === null ||
          toilet.longitude === "null" ||
          !toilet.longitude
        ) {
          //longitude null, "null", 0 값제거.
          return;
        }

        if (
          toilet.latitude === null ||
          toilet.latitude === "null" ||
          !toilet.latitude
        ) {
          //latitude null, "null", 0 값제거.
          return;
        }

        if (toilet.longitude > 180 || toilet.longitude < -180) {
          // 공공데이터에 잘못 저장된 경도 제거.
          return;
        }

        if (toilet.latitude > 90 || toilet.latitude < -90) {
          // 공공데이터에 잘못 저장된 위도 제거.
          return;
        }

        const newInfo = {};

        if (toilet.longitude !== null || toilet.latitude !== null) {
          newInfo.toiletType = toilet.toiletType;
          newInfo.toiletName = toilet.toiletNm;
          newInfo.roadNameAddress = toilet.rdnmadr;
          newInfo.indexNameAddress = toilet.lnmadr;
          newInfo.isUnisexToilet = toilet.unisexToiletYn === "Y" ? true : false;
          newInfo.menToiletBowlNumber = Number(toilet.menToiletBowlNumber);
          newInfo.menUrinalNumber = Number(toilet.menUrineNumber);
          newInfo.menHandicapToiletBowlNumber = Number(
            toilet.menHandicapToiletBowlNumber
          );
          newInfo.menHandicapUrinalNumber = Number(
            toilet.menHandicapUrinalNumber
          );
          newInfo.menChildrenToiletBowlNumber = Number(
            toilet.menChildrenToiletBowlNumber
          );
          newInfo.menChildrenUrinalNumber = Number(
            toilet.menChildrenUrinalNumber
          );
          newInfo.ladiesToiletBowlNumber = Number(
            toilet.ladiesToiletBowlNumber
          );
          newInfo.ladiesHandicapToiletBowlNumber = Number(
            toilet.ladiesHandicapToiletBowlNumber
          );
          newInfo.ladiesChildrenToiletBowlNumber = Number(
            toilet.ladiesChildrenToiletBowlNumber
          );
          newInfo.institutionName = toilet.institutionNm;
          newInfo.phoneNumber = toilet.phoneNumber;
          newInfo.openTime = toilet.openTime;
          newInfo.installationYear = Number(toilet.installationYear);
          newInfo.referenceDate = toilet.referenceDate;
          newInfo.institutionCode = Number(toilet.insttCode);
          newInfo.latestToiletPaperInfo = {
            lastDate: "",
            hasToiletPaper: false,
          };
          newInfo.location = {
            type: "Point",
            coordinates: [Number(toilet.longitude), Number(toilet.latitude)],
          };
          newInfo.reviewList = [];
          newInfo.isSOS = false;

          items.push(newInfo);
        }
      });
      console.log(i);
    }
    fs.writeFileSync("./newKoreaToiletInfo.json", JSON.stringify(items));
    console.timeEnd("Time : ");
  } catch (error) {
    console.error();
  }
}

getJSONDate();
