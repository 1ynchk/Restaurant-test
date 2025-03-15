document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector(".search-input")
    const menuContainer = document.querySelector(".menu-container")
    const searchBtn = document.getElementById('search-btn')

    searchBtn.addEventListener("click", () => {
        let query = searchInput.value.trim()

        fetch(`/search/?q=${query}`)
            .then(response => response.json())
            .then(data => {
                menuContainer.innerHTML = "" 

                data.results.forEach(pleat => {
                    let pleatDiv = document.createElement("div")
                    pleatDiv.classList.add("pleat-container")

                    pleatDiv.innerHTML = `
                        <div class="pleat-name">${pleat.name}</div>
                        <div class="pleat-category"><b>Категория:</b> <br><br> ${pleat.cat}</div>
                        <div class="pleat-desc">
                            <b>Состав:</b> <br><br> ${pleat.desc ? pleat.desc : "<div>Отсутствует</div>"}
                        </div>
                        <div class="pleat-price-container">
                            <div class="pleat-price"><b>Цена:</b> <span class="pleat-price-span">${pleat.price} ₽</span></div>
                            <a href="{% url 'orders-view' %}" class="pleat-btn-order">К заказу</a>
                        </div>
                    `

                    menuContainer.appendChild(pleatDiv)
                })
            })
    })
})