document.addEventListener("DOMContentLoaded", function () {
  const sortOptions = document.querySelectorAll(".sort-options p");
  const recipeGrid = document.querySelector(".recipe-grid");

  // 수정 포인트 1: 선택자를 .recipe-card-horizontal의 부모인 a 태그로 변경
  // 만약 모든 카드에 <a>를 감쌌다면 아래처럼 가져오면 됩니다.
  const originalCards = Array.from(
    document.querySelectorAll(".recipe-grid > a"),
  );

  sortOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedText = this.innerText.trim();

      sortOptions.forEach((opt) => {
        opt.style.fontWeight = "normal";
        opt.style.color = "#888";
      });
      this.style.fontWeight = "bold";
      this.style.color = "#000";

      if (selectedText === "인기순") {
        // 수정 포인트 2: 정렬할 때도 a 태그 리스트를 가져옵니다.
        const cardsToSort = Array.from(
          document.querySelectorAll(".recipe-grid > a"),
        );

        cardsToSort.sort((a, b) => {
          // a 태그 안에서 .heart-count를 찾습니다.
          const heartA = parseInt(
            a.querySelector(".heart-count")?.innerText || 0,
          );
          const heartB = parseInt(
            b.querySelector(".heart-count")?.innerText || 0,
          );
          return heartB - heartA;
        });

        recipeGrid.innerHTML = "";
        cardsToSort.forEach((card) => recipeGrid.appendChild(card));
        console.log("인기순 정렬 완료");
      } else if (selectedText === "최신순") {
        recipeGrid.innerHTML = "";
        originalCards.forEach((card) => recipeGrid.appendChild(card));
        console.log("최신순(원본) 복구 완료");
      }
    });
  });
});

// 타임라인 쪽 클릭시 회색박스가 비활성화 활성하하는 구간//
const timelineItems = document.querySelectorAll(".timeline-list li");

timelineItems.forEach((item) => {
  item.addEventListener("click", function () {
    // 1. 일단 모든 항목에서 'selected' 클래스를 제거 (초기화)
    timelineItems.forEach((li) => li.classList.remove("selected"));

    // 2. 내가 방금 클릭한 이 항목(this)에만 'selected' 클래스를 추가
    this.classList.add("selected");

    // 3. 기존에 만드신 영상 이동 함수(seekTo)도 여기서 같이 실행하면 깔끔합니다!
  });
});
