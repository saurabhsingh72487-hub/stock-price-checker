document.addEventListener("DOMContentLoaded", () => {
  const stock1Input = document.getElementById("stock1");
  const stock2Input = document.getElementById("stock2");
  const like1Checkbox = document.getElementById("like1");
  const like2Checkbox = document.getElementById("like2");
  const checkBtn = document.getElementById("checkBtn");
  const resultsSection = document.getElementById("results");
  const stockResults = document.getElementById("stockResults");

  stock2Input.addEventListener("input", () => {
    like2Checkbox.disabled = stock2Input.value.trim() === "";
  });

  checkBtn.addEventListener("click", async () => {
    const stock1 = stock1Input.value.trim().toUpperCase();
    const stock2 = stock2Input.value.trim().toUpperCase();

    if (!stock1) {
      stockResults.innerHTML = "Enter stock symbol";
      resultsSection.classList.remove("hidden");
      return;
    }

    const params = new URLSearchParams();
    params.append("stock", stock1);

    if (stock2) {
      params.append("stock", stock2);
    }

    if (like1Checkbox.checked || like2Checkbox.checked) {
      params.append("like", "true");
    }

    const res = await fetch("/api/stock-prices?" + params.toString());
    const data = await res.json();

    console.log("DATA FROM BACKEND:", data);

    resultsSection.classList.remove("hidden");

    const stockData = data.stockData;

    if (Array.isArray(stockData)) {
      stockResults.innerHTML = stockData
        .map(
          (item) => `
          <div class="stock-result">
            <h3>${item.stock}</h3>
            <p>$${item.price}</p>
            <p>${item.rel_likes} relative likes</p>
          </div>
        `
        )
        .join("");
    } else {
      stockResults.innerHTML = `
        <div class="stock-result">
          <h3>${stockData.stock}</h3>
          <p>$${stockData.price}</p>
          <p>${stockData.likes} likes</p>
        </div>
      `;
    }
  });
});