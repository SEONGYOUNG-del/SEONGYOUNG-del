$(document).ready(function () {
  $("#list01").on("click", function () {
    const img = $("#img01");
    const currentSrc = img.attr("src");

    // 이미지가 list01.png이면 image02.png로 변경하고 크기 키우기
    if (currentSrc === "img/list01.png") {
      img.attr("src", "img/newlist01.png");
      img.css({
        width: "120%", // 크기 키우기
        height: "120%",
        transformOrigin: "center center", // 중심을 기준으로 크기 증가

        transition: "all 0.3s ease", // 부드럽게 크기 변화
      });
    } else {
      img.attr("src", "img/list01.png");
      img.css({
        width: "100%", // 원래 크기로 되돌리기
        height: "100%",
        transformOrigin: "center center", // 중심을 기준으로 크기 증가

        transition: "all 0.3s ease", // 부드럽게 크기 변화
      });
    }
  });
  $("#list02").on("click", function () {
    const img = $("#img02");
    const currentSrc = img.attr("src");

    // 이미지가 list01.png이면 image02.png로 변경하고 크기 키우기
    if (currentSrc === "img/list02.png") {
      img.attr("src", "img/newlist02.png");
      img.css({
        width: "120%", // 크기 키우기
        height: "120%",
        transformOrigin: "center center", // 중심을 기준으로 크기 증가

        transition: "all 0.3s ease", // 부드럽게 크기 변화
      });
    } else {
      img.attr("src", "img/list02.png");
      img.css({
        width: "100%", // 원래 크기로 되돌리기
        height: "100%",
        transformOrigin: "center center", // 중심을 기준으로 크기 증가

        transition: "all 0.3s ease", // 부드럽게 크기 변화
      });
    }
  });
  Highcharts.chart("container2", {
    chart: {
      polar: true,
      width: 800,
      backgroundColor: null, // 배경색 없애기
    },

    title: {
      text: "",
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
    },

    xAxis: {
      tickInterval: 72, // 360°를 5등분하여 각 섹터에 맞춤
      min: 0,
      max: 360,
      color: "#2c4b72",
      labels: {
        formatter: function () {
          const categories = ["일자리", "주거", "교육", "복지문화", "참여권리"];
          return categories[this.pos / 72]; // 각도에 맞춰 카테고리를 배열에서 가져옴
        },
      },
    },

    yAxis: {
      min: 0,
    },

    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 72,
      },
      column: {
        pointPadding: 0,
        groupPadding: 0,
      },
    },

    series: [
      {
        type: "area",
        name: "1월",
        data: [8, 12, 0, 20, 5],
        pointPlacement: "between",
        color: "#D7E9FF",
      },
      {
        type: "area",
        name: "2월",
        data: [9, 12, 0, 24, 5],
        pointPlacement: "between",
        color: "#BFDBFF",
      },
      {
        type: "area",
        name: "3월",
        data: [8, 12, 1, 24, 6],
        pointPlacement: "between",
        color: "#9AC7FF",
      },
      {
        type: "area",
        name: "4월",
        data: [9, 13, 2, 24, 5],
        pointPlacement: "between",
        color: "#8ABEFF",
      },
      {
        type: "area",
        name: "5월",
        data: [11, 13, 2, 24, 5],
        pointPlacement: "between",
        color: "#76B3FF",
      },
      {
        type: "area",
        name: "6월",
        data: [9, 12, 2, 24, 4],
        pointPlacement: "between",
        color: "#6AACFF",
      },
      {
        type: "area",
        name: "7월",
        data: [9, 13, 2, 25, 4],
        pointPlacement: "between",
        color: "#4798FF",
      },
      {
        type: "area",
        name: "8월",
        data: [9, 13, 1, 26, 6],
        pointPlacement: "between",
        color: "#4A8FE5",
      },
      {
        type: "area",
        name: "9월",
        data: [9, 13, 2, 25, 4],
        pointPlacement: "between",
        color: "#2665B3",
      },
      {
        type: "area",
        name: "10월",
        data: [9, 13, 2, 24, 4],
        pointPlacement: "between",
        color: "#1C487E",
      },
      {
        type: "area",
        name: "11월",
        data: [9, 13, 3, 25, 4],
        pointPlacement: "between",
        color: "#153967",
      },
      {
        type: "area",
        name: "12월",
        data: [9, 12, 1, 21, 4],
        pointPlacement: "between",
        color: "#002655",
      },
    ],
    credits: {
      enabled: false, // 워터마크 제거
    },
    exporting: {
      enabled: false,
    },
  });

  Highcharts.chart("container", {
    chart: {
      type: "bar",
      backgroundColor: null,
      height: 700, // 그래프 높이 조정
      width: 800, // 그래프 너비 조정
      marginTop: 80, // 위쪽 여백 늘리기
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: ["2017년", "2018년", "2019년", "2020년", "2021년", "2022년"],
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      bar: {
        pointPadding: 0.1, // 막대 두께를 조정
        groupPadding: 0.1, // 막대 그룹 간 간격 조정
      },
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          align: "right", // 데이터 레이블을 오른쪽 정렬
          inside: false, // 막대 외부에 표시되도록 설정
          x: -5, // 약간의 여백 추가 (원하는 여백으로 조절 가능)
          formatter: function () {
            return this.y.toString(); // 띄어쓰기 없이 숫자 표시
          },
          style: {
            textOutline: "none", // 모든 레이블에 outline 제거
          },
        },
        color: "#C2D8F4",
        animation: {
          duration: 2000, // 막대가 나타나는 속도 (2초)
          easing: "easeOutBounce", // 속도 효과 설정
        },
      },
    },
    series: [
      {
        name: "⌜가구주 연령별 부채 증감 추이⌟",
        data: [
          2393,
          2591,
          3197,
          3479,
          3550,
          {
            y: 5014,
            color: "#33393F",
            dataLabels: {
              style: {
                fontSize: "30px",
                fontWeight: "200", // 강조 표시
              },
            },
            // 해당 막대의 pointWidth를 지정하여 두께 조정
            pointWidth: 70, // 기본 두께보다 크게 설정
          },
        ],
      },
    ],
    credits: {
      enabled: false, // 워터마크 제거
    },
    exporting: {
      enabled: false,
    },
  });
  // 탭 클릭 시 'active' 클래스 추가
  $(".tab").on("click", function () {
    // 모든 탭에서 'active' 클래스 제거
    $(".tab").removeClass("active");

    // 클릭된 탭에 'active' 클래스 추가
    $(this).addClass("active");
  });
});
