import { api } from "../api/index";

const { naver } = window;

async function makePin(array) {
  for (let j of array) {
    naver.maps.Service.geocode(
      {
        query: j.location,
      },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("Something Wrong!");
        }

        if (response.v2.meta.totalCount === 0) {
          console.log(j.location);
          //return alert("검색결과가 없습니다");
          j.address = [0, 0];
          return;
        }

        const item = response.v2.addresses[0];
        const point = [Number(item.y), Number(item.x)];

        j.address = point;
      }
    );
  }
}

function deleteGu(array) {
  for (let i of array) {
    const arr = i.location.split(" ");
    arr.splice(2, 1);
    i.location = arr.join(" ");
  }
}

export const getBins = async (category) => {
  try {
    const res = await api.get(`/maps/bins/?category=${category}`);
    const arr = res.data.bins;
    if (category == "의류수거함" || category == "폐건전지, 폐형광등 수거함") {
      deleteGu(arr);
    }
    await makePin(arr);
    return arr;
  } catch (e) {
    console.log(e.message);
    alert("에러가 발생했습니다");
  }
};
