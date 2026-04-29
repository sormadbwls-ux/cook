document.addEventListener("DOMContentLoaded", function () {
  /* ==========================================
     1. [공통/메인/쇼핑몰] 버튼 클릭 및 페이지 이동
     ========================================== */

  // 테라피 레시피 버튼 (메인)
  const therapyButtons = document.querySelectorAll(".t-unit");
  therapyButtons.forEach((btn) => {
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => {
      location.href = "recipe_search.html";
    });
  });

  // 구매 버튼 (상세페이지)
  const buyBtns = document.querySelectorAll(".buy-btn");
  buyBtns.forEach((button) => {
    button.addEventListener("click", () => {
      location.href = "shop_detail.html";
    });
  });

  // 상품 카드 클릭 (쇼핑몰)
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      location.href = "shop_detail.html";
    });
  });

  /* ==========================================
     2. [레시피 검색] 인기순/최신순 정렬 기능
     ========================================== */
  const sortOptions = document.querySelectorAll(".sort-options p");
  const recipeGrid = document.querySelector(".recipe-grid");
  if (sortOptions.length > 0 && recipeGrid) {
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
          const cardsToSort = Array.from(
            document.querySelectorAll(".recipe-grid > a"),
          );
          cardsToSort.sort((a, b) => {
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
        } else if (selectedText === "최신순") {
          recipeGrid.innerHTML = "";
          originalCards.forEach((card) => recipeGrid.appendChild(card));
        }
      });
    });
  }

  /* ==========================================
     3. [레시피 상세] 타임라인 클릭 효과
     ========================================== */
  const timelineItems = document.querySelectorAll(".timeline-list li");
  timelineItems.forEach((item) => {
    item.addEventListener("click", function () {
      timelineItems.forEach((li) => li.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  /* ==========================================
     4. [장바구니] 수량 조절 및 가격 계산
     ========================================== */
  const plusBtn = document.getElementById("plus-btn");
  const minusBtn = document.getElementById("minus-btn");
  const quantityInput = document.getElementById("quantity-input");
  const totalPrice = document.getElementById("total-price");

  if (plusBtn && minusBtn && quantityInput && totalPrice) {
    const unitPrice = 8000;
    const updatePrice = () => {
      let quantity = parseInt(quantityInput.value) || 1;
      totalPrice.textContent = (quantity * unitPrice).toLocaleString() + "원";
    };

    plusBtn.addEventListener("click", () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
      updatePrice();
    });

    minusBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantityInput.value = quantity - 1;
        updatePrice();
      }
    });

    quantityInput.addEventListener("input", () => {
      if (isNaN(quantityInput.value) || quantityInput.value < 1)
        quantityInput.value = 1;
      updatePrice();
    });
  }

  /* ==========================================
     5. [재료 편집] 태그 추가 및 삭제 기능 (중점 수정)
     ========================================== */

  // 태그를 화면에 생성하는 함수
  function createTag(text, container) {
    // 중복 체크: 이미 있는 태그는 추가 안 함
    const currentTags = Array.from(container.querySelectorAll(".tag")).map(
      (t) => t.innerText.replace("✖", "").trim(),
    );
    if (currentTags.includes(text)) return;

    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerHTML = `${text} <span class="remove-btn">✖</span>`;
    container.appendChild(tag);
  }

  // 섹션별 초기화 함수
  function initIngredientInput(sectionId, containerId) {
    const section = document.getElementById(sectionId);
    if (!section) return; // 해당 ID가 페이지에 없으면 실행 안함

    const input = section.querySelector(".ingredient-input");
    const container = document.getElementById(containerId);
    const clearBtn = section.querySelector(".clear-input-btn");

    if (input && container) {
      // (1) 엔터 입력 시 태그 추가
      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          const value = this.value.trim();
          if (value) {
            // 띄어쓰기로 여러 개 입력 시 처리
            const items = value.split(/\s+/);
            items.forEach((item) => createTag(item, container));
            this.value = "";
          }
        }
      });

      // (2) X 버튼 클릭 시 입력창 지우기
      if (clearBtn) {
        clearBtn.addEventListener("click", function () {
          input.value = "";
          input.focus();
        });
      }

      // (3) 태그 삭제 기능 (이벤트 위임: 새로 만든 태그도 삭제 가능)
      container.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-btn")) {
          e.target.parentElement.remove();
        }
      });
    }
  }

  // 재료 입력 섹션들 실행
  initIngredientInput("include-section", "include-tags");
  initIngredientInput("exclude-section", "exclude-tags");
}); // DOMContentLoaded 끝
