document.addEventListener('DOMContentLoaded', () => {

    let orderList = []
    let totalPrice = 0
    const btnsAdd = document.querySelectorAll('.pleat-btn-order.orders_page')
    const orderContainer = document.getElementById('orders-page-user-order')
    const orderTotalPrice = document.getElementById('total-price-order')
    const submitBtn = document.getElementById('orders-page-btn-submit-id')
    const warnMessage = document.querySelector('.order-warn-message')
    const errorPopup = document.getElementById('popup-sign-in-wrapper-warn')

    const setDisabledSubmit = () => {
        if (orderList.length == 0 || choisenTable == null) {
            submitBtn.disabled = true
            submitBtn.classList.remove('active')
        } else {
            submitBtn.disabled = false
            submitBtn.classList.add('active')
        }
    }

    btnsAdd.forEach(el => {
        el.addEventListener('click', () => {

            const pleatId = el.getAttribute('arg-pleat-id')
            const pleatName = el.getAttribute('arg-pleat-name')
            const pleatPrice = el.getAttribute('arg-pleat-price')

            totalPrice += +pleatPrice

            if (orderList.length == 0) {
                orderContainer.innerHTML = ""
            }

            orderList.push(pleatId)

            let pleatDiv = document.createElement('div')
            pleatDiv.id = `orders-page-pleat-container-${pleatId}`
            pleatDiv.classList.add('orders-page-pleat-container')


            pleatDiv.innerHTML = `
                <div class="orders-page-pleat-subcontainer">
                    <div class="orders-page-pleat-name">${pleatName}</div>
                    <div class="orders-page-pleat-price">${pleatPrice}</div>
                </div>

                <button arg-order-price="${pleatPrice}" arg-order-id="${pleatId}" class="orders-page-pleat-cross">
                    ⨯ 
                </button>
            `
            orderContainer.appendChild(pleatDiv)

            orderTotalPrice.innerHTML = `${totalPrice}&#8381;`
            setDisabledSubmit()
        })
    })

    orderContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('orders-page-pleat-cross')) {
            const idOrder = event.target.getAttribute("arg-order-id")
            const priceOrder = event.target.getAttribute("arg-order-price")

            const index = orderList.indexOf(idOrder)
            if (index !== -1) {
                orderList.splice(index, 1)
            }

            if (orderList.length == 0) {
                const divWarn = document.createElement('div')
                divWarn.classList.add('orders-page-user-order-empty')
                divWarn.innerText = 'Ваш заказ пока что пуст'

                orderContainer.appendChild(divWarn)
            }

            totalPrice -= +(priceOrder)

            document.getElementById(`orders-page-pleat-container-${idOrder}`).remove()

            orderTotalPrice.innerHTML = `${totalPrice}&#8381;`
            setDisabledSubmit()
        }
    })

    let choisenTable = null

    const tableButtons = document.querySelectorAll(".orders-table")
    const tableConfirmation = document.getElementById('confirm-choisen-table')

    tableButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.classList.contains("taken")) return

            tableButtons.forEach(btn => btn.classList.remove("active"))

            button.classList.add("active")

            choisenTable = button.getAttribute('state-taken-table')

            tableConfirmation.innerText = choisenTable
            tableConfirmation.classList.add('active')
            setDisabledSubmit()
        })
    })

    submitBtn.addEventListener('click', () => {
        const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)[1];

        if (!submitBtn.disabled) {
            fetch('/orders/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ table_id: choisenTable, order: orderList, total_price: totalPrice })
            })
                .then(response => {
                    if (!response.ok) {
                        errorPopup.classList.add('active')
                        warnMessage.innerText = `Произошла ошибка ${response.status}`
                    } else {
                        response.json()
                        window.location = '/'
                    }
                })
        }
    })
})