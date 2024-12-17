$(document).ready(function () {
  // 페이지 데이터를 정의
  const pages = [
    {
      id: "01_cover",
      content: `
      <div id="cover-background">
        <img src="img/cover_tarot.png" id="covertarot-img">
        <img src="img/coverbackgroundimg.png" id="coverbackground-img">
        <div id="cover-content">
          <p id="cover-text">
            바닷속 인어가 들려주는 단 한 장의 카드, <br> 오늘의 운세를 점치러 가볼까요?
          </p>
          <button id="start-btn">시작하기</button>
        </div>
      </div>
      `,
    },
    {
      id: "02_onboarding",
      content: `
      <div id="onboarding-background">
          <p id="onboarding-text">
            카드를 섞어보세요.
          </p>
          <img src="img/onboarding_motion.png" id="onboardingmotion-img">
          <p id="onboarding-explaintext">마우스를 움직이면 카드를 섞을 수 있어요. 움직여보세요!</p>
          <button id="onboarding-btn">확인했어요!</button>
      </div>
      `,
    },
    { id: "03_shuffle", content: `` },
    {
      id: "04_choice",
      content: `
      <div id="card-draw-container">
          <p id="choice-text">
            카드를 골라주세요.
          </p>
          <img src="img/Polygon.png" id="polygon-img">
        <img src="img/card99.png" id="single-card" alt="Card">
        <div id="fan-cards-container"></div>
      </div>`,
    },
    { id: "05_menu", content: `` },
    { id: "06_extra", content: `` },
  ];

  let currentPageIndex = 0; // 현재 페이지 인덱스

  // BGM 요소
  const bgm = document.getElementById("bgm");
  const bgmIcon = document.createElement("img");
  let isBgmPlaying = false; // BGM 초기 상태 (정지)

  // BGM 버튼 생성
  const bgmButton = document.createElement("button");
  bgmButton.id = "bgm-toggle";
  bgmIcon.id = "bgm-icon";
  bgmIcon.src = "img/soundoff.png"; // 초기 아이콘
  bgmButton.appendChild(bgmIcon);

  // BGM 재생 함수
  function playBgm() {
    bgm.play().catch((err) => {
      console.log("BGM 자동 재생이 차단되었습니다:", err);
    });
    isBgmPlaying = true;
    bgmIcon.src = "img/soundon.png"; // 아이콘 업데이트
  }

  // BGM 정지 함수
  function pauseBgm() {
    bgm.pause();
    isBgmPlaying = false;
    bgmIcon.src = "img/soundoff.png"; // 아이콘 업데이트
  }

  // BGM 토글 함수
  function toggleBgm() {
    if (isBgmPlaying) {
      pauseBgm();
    } else {
      playBgm();
    }
  }

  // BGM 버튼 클릭 이벤트
  bgmButton.addEventListener("click", toggleBgm);

  // 헤더 표시/숨기기 함수
  function toggleHeader() {
    if (currentPageIndex === 0) {
      $("#header").addClass("hidden"); // 첫 페이지에서는 헤더 숨김
    } else {
      $("#header").removeClass("hidden"); // 다른 페이지에서는 헤더 표시
    }
  }

  // Footer 숨기기/표시 함수
  function toggleFooter() {
    if (currentPageIndex <= 3) {
      $("footer").hide(); // 첫 페이지에서는 Footer 숨김
    } else {
      $("footer").show(); // 다른 페이지에서는 Footer 표시
    }
  }

  // 프로그레스 바 업데이트 함수
  function updateProgressBar() {
    // 02 Onboarding(두 번째 페이지)부터 진행률 계산
    const startPageIndex = 1; // 02 Onboarding의 인덱스
    const totalProgressPages = pages.length - startPageIndex; // 총 프로그레스 바에 반영할 페이지 수

    if (currentPageIndex < startPageIndex) {
      // 02 Onboarding 이전에는 프로그레스 바를 0%로 설정
      $("#progress-bar").css("width", "0%");
    } else {
      // 02 Onboarding부터 1/5씩 게이지 계산
      const progress =
        ((currentPageIndex - startPageIndex + 1) / totalProgressPages) * 100;
      $("#progress-bar").css("width", `${progress}%`);
    }
  }

  // 온보딩 페이지 전용 이벤트 처리
  function addOnboardingEvents() {
    let lastX = null; // 이전 마우스 위치
    let direction = null; // 현재 방향 ("left" 또는 "right")
    let moveCount = 0; // 양옆 이동 횟수
    const maxMoves = 6; // 양옆 3번 (좌우 합쳐서 6번)

    $(document).on("mousemove", function (event) {
      const currentX = event.clientX; // 현재 마우스의 X 좌표

      if (lastX !== null) {
        const newDirection = currentX > lastX ? "right" : "left";

        if (newDirection !== direction) {
          direction = newDirection; // 방향 갱신
          moveCount++; // 양옆 이동 횟수 증가
          console.log(`양옆 이동 횟수: ${moveCount}`);
        }

        // 최대 이동 횟수에 도달하면 버튼 활성화
        if (moveCount >= maxMoves) {
          const onboardingBtn = $("#onboarding-btn");
          if (onboardingBtn.length) {
            onboardingBtn.prop("disabled", false); // 버튼 활성화
            onboardingBtn.addClass("activated"); // 시각적 효과 추가
          }

          // 이벤트 제거 (추가적인 동작 방지)
          $(document).off("mousemove");
        }
      }

      lastX = currentX; // 현재 X 좌표 저장
    });
  }

  // 셔플 페이지 전용 이벤트 처리
  function addShuffleEvents() {
    let moveCount = 0; // 마우스 이동 횟수
    const maxMoves = 3; // 최대 이동 횟수
    let lastX = null; // 이전 X 좌표
    let lastY = null; // 이전 Y 좌표

    // Progress 박스 추가
    const progressBoxes = `
      <div id="progress-container">
        <div class="progress-box"></div>
        <div class="progress-box"></div>
        <div class="progress-box"></div>
      </div>
      <p id="shuffle-message">카드가 잘 섞이고 있어요...</p>
    `;
    $("#web").prepend(progressBoxes);

    // 카드 컨테이너 추가
    const cardsContainer = `<div id="cards-container"></div>`;
    $("#web").append(cardsContainer);

    // 카드 이미지 생성 및 배치
    for (let i = 0; i < 23; i++) {
      const x = Math.random() * 100; // X 좌표 (퍼센트)
      const y = Math.random() * 100; // Y 좌표 (퍼센트)
      const rotation = Math.random() * 360 - 180; // 회전 각도

      const cardElement = `
        <img src="img/card99.png" class="shuffle-card" 
             style="
               left: ${x}%; 
               top: ${y}%; 
               transform: rotate(${rotation}deg);
             " />
      `;
      $("#cards-container").append(cardElement);
    }

    // 카드 움직임 효과
    $(document).on("mousemove", function (e) {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (lastX === null || lastY === null) {
        lastX = currentX;
        lastY = currentY;
      }

      const deltaX = currentX - lastX; // X 방향 변화량
      const deltaY = currentY - lastY; // Y 방향 변화량

      // 카드 이동
      $(".shuffle-card").each(function (index) {
        const movementX = deltaX * (Math.random() * 0.05); // 카드마다 다른 이동량
        const movementY = deltaY * (Math.random() * 0.05);

        const currentTransform = $(this).css("transform"); // 현재 transform 가져오기
        $(this).css(
          "transform",
          `${currentTransform} translate(${movementX}px, ${movementY}px)`
        );
      });

      // 움직임 감지 및 Progress 업데이트
      if (Math.abs(deltaX) >= 10) {
        moveCount++;
        console.log(`움직임 감지: ${moveCount}`);

        $(".progress-box")
          .eq(moveCount - 1)
          .css("background-color", "#44374d");

        lastX = currentX;
        lastY = currentY;
      }
    });

    // 이미 버튼이 존재하는지 확인
    if ($("#next-btn-shuffle").length === 0) {
      const nextButton = `<button id="next-btn-shuffle">다음으로</button>`;
      $("#web").append(nextButton);

      // 클릭 이벤트 등록
      $("#next-btn-shuffle").on("click", function () {
        currentPageIndex++; // 다음 페이지로 인덱스 증가
        updatePage(); // 페이지 업데이트
      });
    }
  }

  // 선택 페이지 전용 이벤트 처리
  function addChoiceEvents() {
    const totalCards = 7; // 펼칠 카드의 개수
    let isCardFanned = false; // 카드가 펼쳐졌는지 여부

    // 단일 카드 클릭 이벤트
    $("#single-card").on("click", function () {
      if (!isCardFanned) {
        $("#single-card").hide(); // 기존 카드 숨기기
        fanOutCards();
        isCardFanned = true;
      }
    });

    // 카드를 부채꼴로 펼치는 함수
    function fanOutCards() {
      const container = $("#fan-cards-container");
      container.empty(); // 기존 카드 삭제
      container.show();

      const startAngle = -60; // 시작 각도 (더 넓게 펼치기 위해 -60도로 조정)
      const angleStep = 20; // 각 카드당 회전 각도 간격을 20도로 조정 (더 넓게 퍼짐)

      for (let i = 0; i < totalCards; i++) {
        const angle = startAngle + i * angleStep; // 각 카드의 회전 각도
        const delay = i * 0.1; // 각 카드의 애니메이션 딜레이 (0.1초씩 순차 적용)

        const card = `
          <img src="img/card99.png" class="fan-card" 
               style="
                 position: absolute;
                 top: 50%; /* 화면의 세로 중앙 */
                 left: 50%; /* 화면의 가로 중앙 */
                 transform-origin: bottom center; /* 회전 기준점 */
                 transform: translate(-50%, -50%) rotate(${angle}deg); /* 정확한 중앙 정렬 */
                 opacity: 0;
                 transition: transform 0.6s ease-out ${delay}s, opacity 0.6s ease-out ${delay}s;
               ">
        `;

        container.append(card);
      }

      // 부채꼴 카드 애니메이션 실행 (위로 올라오면서 보임)
      setTimeout(() => {
        $(".fan-card").each(function (index) {
          const angle = startAngle + index * angleStep; // 다시 angle 계산
          $(this).css({
            transform: `translate(-50%, -100px) rotate(${angle}deg)`, // 최종 위치
            opacity: 1,
          });
        });
      }, 100);
    }

    // 팝업 HTML 삽입
    const popupHtml = `
  <div id="popup-overlay">
    <div id="popup-container">
      <p>당신의 카드가 맞나요?</p>
      <div id=""popup-buttons>
          <button id="btn-reselect" class="popup-btn">다시 선택할래요</button>
          <button id="btn-confirm" class="popup-btn">네!</button>
      </div>
    </div>
  </div>
`;
    $("body").append(popupHtml);

    // 카드 클릭 이벤트
    $(document).on("click", ".fan-card", function () {
      $("#popup-overlay").fadeIn(); // 팝업 표시
    });

    // 팝업 버튼 이벤트
    $(document).on("click", "#btn-reselect", function () {
      $("#popup-overlay").fadeOut(); // 팝업 닫기
    });

    $(document).on("click", "#btn-confirm", function () {
      $("#popup-overlay").fadeOut(); // 팝업 닫기
      currentPageIndex = 4; // 메뉴 페이지 인덱스로 설정 (05_menu)
      updatePage();
    });
  }

  // 카드 데이터 배열
  const cards = [
    {
      id: 1,
      name: "The Fool",
      koreanName: "광대",
      item: "조개 껍질, 물방울 모양 귀걸이",
      keyword: "새로움, 용기, 첫걸음",
      fortune:
        "바닷속 첫 발을 내딛는 작은 물거품처럼, 용기 내어 당신만의 길을 시작해 보세요.",
    },
    {
      id: 2,
      name: "The Magician",
      koreanName: "마법사",
      item: "반짝이는 진주, 마법의 물병",
      keyword: "창조, 잠재력, 자신감",
      fortune:
        "물속에 숨겨진 보물처럼, 당신 안에는 이미 멋진 능력이 담겨 있어요. 믿어보세요.",
    },
    {
      id: 3,
      name: "The High Priestess",
      koreanName: "여사제",
      item: "달빛 거울, 신비로운 향초",
      keyword: "직관, 내면의 지혜, 신비로움",
      fortune:
        "잔잔한 바닷속에서 들려오는 작은 속삭임처럼, 당신의 직관이 오늘의 길잡이가 되어줄 거예요.",
    },
    {
      id: 4,
      name: "The Empress",
      koreanName: "여황제",
      item: "꽃 모양 헤어핀, 산호 목걸이",
      keyword: "풍요, 따뜻함, 자연의 에너지",
      fortune:
        "풍요로운 바다처럼, 따뜻한 마음으로 당신과 주변 모두를 감싸주세요.",
    },
    {
      id: 5,
      name: "The Emperor",
      koreanName: "황제",
      item: "황금 조개, 무게감 있는 반지",
      keyword: "리더십, 안정감, 책임",
      fortune:
        "깊고 안정된 바닷속 산호처럼, 당신의 결단력과 책임감이 빛을 발할 거예요.",
    },
    {
      id: 6,
      name: "The Hierophant",
      koreanName: "교황",
      item: "오래된 항해 지도, 바다의 조각상",
      keyword: "전통, 배움, 성찰",
      fortune:
        "바다의 오래된 이야기를 전하는 인어처럼, 전통 속에서 새로운 지혜를 찾아보세요.",
    },
    {
      id: 7,
      name: "The Lovers",
      koreanName: "연인",
      item: "하트 모양 조개, 물결 무늬 목걸이",
      keyword: "사랑, 선택, 관계",
      fortune:
        "물결이 서로를 감싸 안듯, 소중한 관계에 따뜻한 마음을 전해 보세요.",
    },
    {
      id: 8,
      name: "The Chariot",
      koreanName: "전차",
      item: "전차 모양 목걸이, 용기의 나침반",
      keyword: "결단력, 목표, 추진력",
      fortune:
        "힘차게 헤엄치는 인어처럼, 흔들림 없이 당신의 목표를 향해 나아가 보세요.",
    },
    {
      id: 9,
      name: "Strength",
      koreanName: "힘",
      item: "사자 꼬리 모양 브로치, 레드 진주",
      keyword: "용기, 인내, 내적 강인함",
      fortune:
        "폭풍 속에서도 부드럽게 헤엄치는 인어처럼, 오늘은 내면의 용기를 믿어보세요.",
    },
    {
      id: 10,
      name: "The Hermit",
      koreanName: "은둔자",
      item: "랜턴 모양 장식, 조용한 심해의 돌",
      keyword: "내면 탐구, 고독, 지혜",
      fortune:
        "조용한 바닷속 동굴에서 쉬어가는 인어처럼, 당신의 마음을 편히 들여다보세요.",
    },
    {
      id: 11,
      name: "Wheel of Fortune",
      koreanName: "운명의 수레바퀴",
      item: "소용돌이 반지, 회전 나침반",
      keyword: "변화, 기회, 전환점",
      fortune:
        "소용돌이 속에서도 물결을 따라 흘러가듯, 변화는 당신에게 새로운 기회를 줄 거예요.",
    },
    {
      id: 12,
      name: "Justice",
      koreanName: "정의",
      item: "저울 모양 목걸이, 푸른빛 조개",
      keyword: "균형, 공정성, 명확한 선택",
      fortune:
        "바닷속 저울을 들고 균형을 맞추는 인어처럼, 오늘은 신중하고 공정한 마음이 필요해요.",
    },
    {
      id: 13,
      name: "The Hanged Man",
      koreanName: "매달린 사람",
      item: "로프 팔찌, 거꾸로 선 물고기 장식",
      keyword: "새로운 관점, 희생, 멈춤",
      fortune:
        "물결에 몸을 맡긴 인어처럼, 새로운 시각에서 세상을 바라보는 여유를 가져보세요.",
    },
    {
      id: 14,
      name: "Death",
      koreanName: "죽음",
      item: "검은 산호, 새싹 모양 장식",
      keyword: "변화, 끝, 새로운 시작",
      fortune:
        "오래된 파도가 사라지고 새로운 물결이 찾아오듯, 끝은 새로운 시작이에요.",
    },
    {
      id: 15,
      name: "Temperance",
      koreanName: "절제",
      item: "투명한 물병, 파스텔 빛 조개",
      keyword: "조화, 인내, 균형",
      fortune:
        "맑은 물속에서 조화를 이루는 인어처럼, 서두르지 말고 천천히 균형을 맞춰 보세요.",
    },
    {
      id: 16,
      name: "The Devil",
      koreanName: "악마",
      item: "체인 목걸이, 붉은 보석",
      keyword: "유혹, 속박, 자기 탐닉",
      fortune:
        "어두운 바닷속 유혹을 이겨내는 인어처럼, 당신을 위한 올바른 선택을 해보세요.",
    },
    {
      id: 17,
      name: "The Tower",
      koreanName: "탑",
      item: "번개 모양 장식, 무너진 산호",
      keyword: "갑작스러운 변화, 혼란, 깨달음",
      fortune:
        "무너진 산호가 다시 자라나듯, 혼란 속에서도 새로운 희망이 피어날 거예요.",
    },
    {
      id: 18,
      name: "The Star",
      koreanName: "별",
      item: "별 모양 귀걸이, 반짝이는 크리스탈",
      keyword: "희망, 치유, 영감",
      fortune:
        "반짝이는 바닷속 별빛처럼, 오늘은 희망과 치유의 에너지가 당신 곁에 머물 거예요.",
    },
    {
      id: 19,
      name: "The Moon",
      koreanName: "달",
      item: "달빛 조개, 은빛 팔찌",
      keyword: "환상, 직감, 혼란",
      fortune:
        "바닷속 은은한 달빛처럼, 조용히 당신의 직감을 따라가면 길이 보일 거예요.",
    },
    {
      id: 20,
      name: "The Sun",
      koreanName: "태양",
      item: "태양 브로치, 노란 진주",
      keyword: "성공, 행복, 긍정의 에너지",
      fortune:
        "따뜻한 햇살이 물결을 비추듯, 오늘은 밝은 에너지가 당신의 하루를 채울 거예요.",
    },
    {
      id: 21,
      name: "Judgement",
      koreanName: "심판",
      item: "나팔 모양 펜던트, 새벽빛 조개",
      keyword: "부활, 결단, 성찰",
      fortune:
        "고요한 바닷속 울림처럼, 오늘은 스스로를 돌아보고 새로움을 준비할 시간이에요.",
    },
    {
      id: 22,
      name: "The World",
      koreanName: "세계",
      item: "작은 지구본 장식, 무지개 빛 진주",
      keyword: "완성, 성취, 통합",
      fortune:
        "끝없이 펼쳐진 바다처럼, 모든 것이 완벽히 어우러지는 하루가 될 거예요.",
    },
  ];

  // 메뉴 이벤트 처리
  function addMenuEvents() {
    const card = getRandomCard(); // 랜덤 카드 가져오기
    const cardImageSrc = `img/card-arcana/card${String(card.id).padStart(
      2,
      "0"
    )}.png`;

    // 메뉴 화면 렌더링
    const menuHTML = `
    <div id="card-display-container" style="text-align: center; padding: 20px;">
      <img src="${cardImageSrc}" alt="${card.name}" style="width: 150px; height: auto; margin-bottom: 20px;">
      <h2>${card.id}. ${card.name} (${card.koreanName})</h2>
      <div id="button-container" style="margin-top: 20px;">
        <button class="menu-popup-btn" data-title="오늘의 아이템" data-content="${card.item}">오늘의 아이템</button>
        <button class="menu-popup-btn" data-title="오늘의 키워드" data-content="${card.keyword}">오늘의 키워드</button>
        <button class="menu-popup-btn" data-title="오늘의 운세" data-content="${card.fortune}">오늘의 운세</button>
      </div>
    </div>

    <!-- 팝업 오버레이 -->
    <div id="menu-popup-overlay">
      <div id="menu-popup-container">
        <p id="menu-popup-content"></p>
        <button id="close-popup-btn">닫기</button>
      </div>
    </div>
  `;

    $("#web").html(menuHTML);

    // 팝업 버튼 클릭 이벤트
    $(".menu-popup-btn").on("click", function () {
      const title = $(this).data("title");
      const content = $(this).data("content");
      $("#menu-popup-content").html(`<strong>${title}</strong><br>${content}`);
      $("#menu-popup-overlay").fadeIn(200);
    });

    // 팝업 닫기 버튼 이벤트
    $("#close-popup-btn").on("click", function () {
      $("#menu-popup-overlay").fadeOut(200);
    });
  }

  // 랜덤 카드 선택 함수
  function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
  }

  // 페이지 업데이트 함수 (이미지와 콘텐츠 통합)
  function updatePage() {
    const currentPage = pages[currentPageIndex];

    // 이미지와 콘텐츠 렌더링
    const imgHtml = currentPage.img
      ? `<img src="${currentPage.img}" alt="Page Image" style="width: 100%; height: auto; object-fit: cover;">`
      : "";

    $("#web").html(`${imgHtml}${currentPage.content}`); // 이미지와 콘텐츠 추가

    if (currentPage.id === "02_onboarding") {
      addOnboardingEvents(); // 온보딩 페이지 이벤트 추가
    }

    if (currentPage.id === "03_shuffle") {
      addShuffleEvents(); // Shuffle 페이지 이벤트 추가
    }

    if (currentPage.id === "04_choice") {
      addChoiceEvents(); // 카드 선택 이벤트 실행
    }

    if (currentPage.id === "05_menu") {
      addMenuEvents(); // 카드 선택 이벤트 실행
    }

    // BGM 버튼 재삽입
    document.querySelector("#web").appendChild(bgmButton);

    toggleHeader(); // 헤더 상태 업데이트
    toggleFooter(); // Footer 상태 업데이트
    updateProgressBar(); // 프로그레스 바 업데이트

    // 이전 버튼 표시 여부
    if (currentPageIndex === 0) {
      $("#prev-btn").hide();
    } else {
      $("#prev-btn").show();
    }

    // 다음 버튼 텍스트 변경
    if (currentPageIndex === pages.length - 1) {
      $("#next-btn").text("다시 뽑아보기");
    } else {
      $("#next-btn").text("다음");
    }

    // 시작하기 버튼 이벤트 추가 (첫 페이지에서만 작동)
    $("#start-btn").on("click", function () {
      currentPageIndex++; // 다음 페이지로 이동
      playBgm(); // BGM 재생
      updatePage(); // 페이지 업데이트
    });
    // 온보딩 버튼 이벤트 추가 (두번째 페이지에서만 작동)
    $("#onboarding-btn").on("click", function () {
      currentPageIndex++; // 다음 페이지로 이동
      updatePage(); // 페이지 업데이트
    });
  }

  // 이전 버튼 클릭 이벤트
  $("#prev-btn").on("click", function () {
    if (currentPageIndex > 0) {
      currentPageIndex--; // 이전 페이지로 이동
      updatePage(); // 페이지 업데이트
    }
  });

  // 다음 버튼 클릭 이벤트
  $("#next-btn").on("click", function () {
    if (currentPageIndex < pages.length - 1) {
      currentPageIndex++; // 다음 페이지로 이동
      updatePage(); // 페이지 업데이트
    } else {
      // 알림창 출력 및 첫 페이지로 이동
      if (confirm("다시 한 번 오늘의 운세를 뽑아보시겠어요?")) {
        currentPageIndex = 0; // 첫 페이지로 이동
        updatePage(); // 페이지 업데이트
      }
    }
  });

  // 초기 페이지 로드
  updatePage();
});
