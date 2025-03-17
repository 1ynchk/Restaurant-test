document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input")
    const ordersListContainer = document.getElementById("orders-list-container")
    const searchBtn = document.getElementById('search-btn')

    searchInput.addEventListener('input', () => {
        let query = searchInput.value.trim()

        if (query.length == 0) {
            fetch(`/order/search/?q=${query}`)
                .then(response => response.json())
                .then(data => {
                    ordersListContainer.innerHTML = ""

                    if (data.results.length === 0) {
                        ordersListContainer.innerHTML = "<p>Нет заказов, соответствующих запросу.</p>"
                        return
                    }

                    data.results.forEach(order => {
                        let orderDiv = document.createElement("div")
                        orderDiv.id = `pleat-container-order-list-${order.id}`
                        orderDiv.classList.add("pleat-container", "order-list")

                        orderDiv.innerHTML = `
                        <div class="pleat-name">
                            <b>ID заказа:</b> ${order.id}
                        </div>
                        <div class="pleat-category">
                            <b>Номер столика:</b> ${order.table_number}
                        </div>
                        <div class="pleat-desc">
                            <ul class="order-info">
                                <div>
                                    <b>Содержимое заказа:</b>
                                    <br><br>
                                    ${order.items.length > 0 ? order.items.map(item => `
                                        <li class="orders-check-container">
                                            <div class="orders-list-name">${item.name}</div>
                                            <div class="orders-price-price"><i>${item.price}</i></div>
                                            <div class="orders-amount"><i>${item.amount}</i></div>
                                        </li>
                                    `).join('') : '<li>Нет товаров</li>'}
                                    <div class="orders-list-total-sum"><b>${order.total_price} ₽</b></div>
                                </div>

                                <div>
                                    <div><b>Статус заказа:</b></div>
                                    <div class="order-status-container">
                                        <select class="orders-status" id="status-${order.id}">
                                            <option class="orders-status-el" value="В ожидании" ${order.status === 'В ожидании' ? 'selected' : ''}>В ожидании</option> 
                                            <option class="orders-status-el" value="Готов" ${order.status === 'Готов' ? 'selected' : ''}>Готов</option>
                                            <option class="orders-status-el" value="Оплачено" ${order.status === 'Оплачено' ? 'selected' : ''}>Оплачено</option> 
                                        </select>
                                        <button class="pleat-btn-order order-save" data-order-id="${order.id}">
                                            Сохранить
                                        </button>
                                    </div> 
                                </div>
                            </ul>
                        </div>
                        <div class="pleat-price-container orders-list-btns">
                            <button order-id="${order.id}" class="pleat-btn-order red delete-btn">
                                Удалить
                            </button>
                        </div>
                    `
                        ordersListContainer.appendChild(orderDiv)
                    })

                })
        }
    })

    searchBtn.addEventListener("click", () => {
        let query = searchInput.value.trim()

        fetch(`/order/search/?q=${query}`)
            .then(response => response.json())
            .then(data => {
                ordersListContainer.innerHTML = ""

                if (data.results.length === 0) {
                    ordersListContainer.innerHTML = "<p>Нет заказов, соответствующих запросу.</p>"
                    return
                }

                data.results.forEach(order => {
                    let orderDiv = document.createElement("div")
                    orderDiv.id = `pleat-container-order-list-${order.id}`
                    orderDiv.classList.add("pleat-container", "order-list")

                    orderDiv.innerHTML = `
                        <div class="pleat-name">
                            <b>ID заказа:</b> ${order.id}
                        </div>
                        <div class="pleat-category">
                            <b>Номер столика:</b> ${order.table_number}
                        </div>
                        <div class="pleat-desc">
                            <ul class="order-info">
                                <div>
                                    <b>Содержимое заказа:</b>
                                    <br><br>
                                    ${order.items.length > 0 ? order.items.map(item => `
                                        <li class="orders-check-container">
                                            <div class="orders-list-name">${item.name}</div>
                                            <div class="orders-price-price"><i>${item.price}</i></div>
                                            <div class="orders-amount"><i>${item.amount}</i></div>
                                        </li>
                                    `).join('') : '<li>Нет товаров</li>'}
                                    <div class="orders-list-total-sum"><b>${order.total_price} ₽</b></div>
                                </div>

                                <div>
                                    <div><b>Статус заказа:</b></div>
                                    <div class="order-status-container">
                                        <select class="orders-status" id="status-${order.id}">
                                            <option class="orders-status-el" value="В ожидании" ${order.status === 'В ожидании' ? 'selected' : ''}>В ожидании</option> 
                                            <option class="orders-status-el" value="Готов" ${order.status === 'Готов' ? 'selected' : ''}>Готов</option>
                                            <option class="orders-status-el" value="Оплачено" ${order.status === 'Оплачено' ? 'selected' : ''}>Оплачено</option> 
                                        </select>
                                        <button class="pleat-btn-order order-save" data-order-id="${order.id}">
                                            Сохранить
                                        </button>
                                    </div> 
                                </div>
                            </ul>
                        </div>
                        <div class="pleat-price-container orders-list-btns">
                            <button order-id="${order.id}" class="pleat-btn-order red delete-btn">
                                Удалить
                            </button>
                        </div>
                    `
                    ordersListContainer.appendChild(orderDiv)
                })

            })
    })
})