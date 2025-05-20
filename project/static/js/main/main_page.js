document.addEventListener("DOMContentLoaded", function () {
    const categoryLabel = document.querySelectorAll(".filter-category-label label");
    const selectedContainer = document.querySelector(".filter-category-selected");
    const selectedTitleArea = selectedContainer.querySelector(".filter-category-selected-title");
    const productCount = document.querySelector(".product-count");
    const resetButton = document.querySelector(".filter-close");

    let selectedCategories = [];

    function updateSelectedView() {
        selectedTitleArea.innerHTML = "";
        let totalCount = 0;

        selectedCategories.forEach((item) => {
            const tag = document.createElement("div");
            tag.classList.add("selected-tag");

            tag.textContent = item.name;

            const close = document.createElement("span");
            close.textContent = " ✕";
            close.style.cursor = "pointer";
            close.style.marginLeft = "4px";
            close.style.color = "#ddd";
            close.addEventListener("click", function () {
                selectedCategories = selectedCategories.filter(category => category.name !== item.name);
                updateSelectedView();
            });

            tag.appendChild(close);
            selectedTitleArea.appendChild(tag);
            totalCount += item.count;
        });

        productCount.textContent = `총 ${totalCount}건`;

        

        categoryLabel.forEach(label => {
            const labelText = label.querySelector("p").textContent;
            const checkbox = label.querySelector(".checkbox");

            if (selectedCategories.some(category => category.name === labelText)) {
                checkbox.classList.add("checked");
            } else {
                checkbox.classList.remove("checked");
            }

            const filterBox = document.querySelector(".filter-category-selected");
            if (selectedCategories.length > 0) {
                filterBox.classList.add("active");
            } else {
                filterBox.classList.remove("active");
            }
        });

        const filterBox = document.querySelector(".filter-category-selected");
        if (selectedCategories.length > 0) {
            filterBox.classList.add("active");
        } else {
            filterBox.classList.remove("active");
        }
    }

    categoryLabel.forEach(label => {
        const name = label.querySelector("p").textContent;
        const countText = label.querySelector(".count").textContent;
        const count = parseInt(countText, 10);

        label.addEventListener("click", function () {
            const exists = selectedCategories.find(category => category.name === name);
            if (exists) {
                selectedCategories = selectedCategories.filter(category => category.name !== name);
            } else {
                selectedCategories.unshift({ name, count });
            }
            updateSelectedView();
        });
    });

    resetButton.addEventListener("click", function () {
        selectedCategories = [];

        categoryLabel.forEach(label => {
            const checkbox = label.querySelector(".checkbox");
            checkbox.classList.remove("checked");
        });
        selectedTitleArea.innerHTML = "";
        productCount.textContent = "총 0건";
        selectedContainer.classList.remove("active");
    });

    updateSelectedView();
});
