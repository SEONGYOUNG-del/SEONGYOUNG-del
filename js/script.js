$(document).ready(function () {
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
});
