/* main page - JS */
document.addEventListener("DOMContentLoaded", function () {
    const categoryLabels = document.querySelectorAll(".filter-category-label label");
    const selectedContainer = document.querySelector(".filter-category-selected");
    const selectedTitleArea = selectedContainer.querySelector(".filter-category-selected-title");
    const productCount = document.querySelector(".product-count");
    const deleteButton = selectedContainer.querySelector(".delete-btn");

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
            close.addEventListener("click", function () {
                selectedCategories = selectedCategories.filter(el => el.name !== item.name);
                updateSelectedView();
            });

            tag.appendChild(close);
            selectedTitleArea.appendChild(tag);

            totalCount += item.count;
        });

        productCount.textContent = `총 ${totalCount}건`;

        categoryLabels.forEach(label => {
            const labelText = label.querySelector("p").textContent;
            const checkbox = label.querySelector(".checkbox");

            if (selectedCategories.some(cat => cat.name === labelText)) {
                checkbox.style.backgroundColor = "#5f0080";
            } else {
                checkbox.style.backgroundColor = "transparent";
            }
        });
    }

    categoryLabels.forEach(label => {
        const name = label.querySelector("p").textContent;
        const countText = label.querySelector(".count").textContent;
        const count = parseInt(countText, 10);

        label.addEventListener("click", function () {
            const exists = selectedCategories.find(cat => cat.name === name);
            if (exists) {
                selectedCategories = selectedCategories.filter(cat => cat.name !== name);
            } else {
                selectedCategories.push({ name, count });
            }
            updateSelectedView();
        });
    });

    resetButton.addEventListener("click", function () {
        selectedCategories = [];
        updateSelectedView();
    });

    updateSelectedView();
});
