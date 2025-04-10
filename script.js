async function fetchRecommendations() {
    const customerId = document.getElementById("customer-id").value.trim();
    const apiUrl = `https://ai-product-recommendation-system-6gde.onrender.com/recommend/${customerId}`;
    const loader = document.getElementById("loader");
    const resultDiv = document.getElementById("result");
    const customerInfo = document.getElementById("customer-info");
    const recommendationsList = document.getElementById("recommendations");

    if (!customerId) {
        alert("Please enter a Customer ID!");
        return;
    }

    loader.style.display = "block";
    resultDiv.classList.add("hidden");

    setTimeout(async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            loader.style.display = "none";
            resultDiv.classList.remove("hidden");

            if (data.error) {
                customerInfo.innerHTML = `<p>❌ ${data.error}</p>`;
                recommendationsList.innerHTML = "";
                return;
            }

            const c = data.customer_info;
            customerInfo.innerHTML = `
                <h3>Customer Details</h3>
                <p><strong>ID:</strong> ${c.ID}</p>
                <p><strong>Age:</strong> ${c.Age}</p>
                <p><strong>Gender:</strong> ${c.Gender}</p>
                <p><strong>Location:</strong> ${c.Location}</p>
                <p><strong>Segment:</strong> ${c.Segment}</p>
                <p><strong>Season:</strong> ${c.Season}</p>
                <p><strong>Purchased Products:</strong> ${c.Purchased_Products}</p>
            `;

            recommendationsList.innerHTML = `<h3>Recommended Products</h3>` +
                data.recommended_products.map(p => `
                    <li>
                        <strong>Product ID:</strong> ${p.product_id}<br>
                        <strong>Category:</strong> ${p.category}<br>
                        <strong>Probability:</strong> ${p.probability}
                    </li>
                `).join('');

        } catch (error) {
            loader.style.display = "none";
            resultDiv.classList.remove("hidden");
            customerInfo.innerHTML = "❌ API connection failed!";
            recommendationsList.innerHTML = "";
            console.error("Failed to fetch recommendations!", error);
        }
    }, 3000);
}
