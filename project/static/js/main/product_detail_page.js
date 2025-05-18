document.addEventListener("DOMContentLoaded", function () {
    const minusBtn = document.querySelector(".minus");
    const plusBtn = document.querySelector(".plus");
    const quantityElem = document.querySelector(".quantity");
    const totalPriceElem = document.querySelector(".product-total-price-value");

    const unitPrice = parseInt(
        totalPriceElem.textContent.replace(/[^\d]/g, ""),
        10
    );

    let quantity = parseInt(quantityElem.textContent, 10);

    function updateDisplay() {
        quantityElem.textContent = quantity;
        const totalPrice = unitPrice * quantity;
        totalPriceElem.textContent = totalPrice.toLocaleString() + " 원";
    }

    minusBtn.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--;
            updateDisplay();
        }
    });

    plusBtn.addEventListener("click", function () {
        quantity++;
        updateDisplay();
    });

});