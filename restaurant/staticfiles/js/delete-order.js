document.addEventListener('DOMContentLoaded', () => {
    const deleteBtns = document.querySelectorAll('.pleat-btn-order.red')
    const warnMessage = document.querySelector('.order-warn-message')
    const successMessage = document.querySelector('.order-succeess-message')
    const errorPopup = document.getElementById('popup-sign-in-wrapper-warn-delete')
    const successPopup = document.getElementById('popup-sign-in-wrapper-success-delete')
    const container = document.querySelector('.orders-list-container')

    deleteBtns.forEach(el => {
        el.addEventListener('click', () => {
            const orderId = el.getAttribute('order-id')

            const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)[1];

            fetch('/order/delete/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your-token-here',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({
                    order: orderId
                })
            })
                .then(response => {
                    if (!response.ok) {
                        errorPopup.classList.add('active')
                        warnMessage.innerText = `Произошла ошибка ${response.status}`
                    } else {
                        successPopup.classList.add('active')
                        successMessage.innerHTML = 'Заказ успешно удален!'
                        document.getElementById(`pleat-container-order-list-${orderId}`).remove()
                        if (container.children.length == 0) {
                            const warnDiv = document.createElement('div')
                            warnDiv.classList.add('orders-empty-container')
                            warnDiv.innerHTML = `
                            <div class="orders-empty-warn">
                                Пока что у вас нет заказов
                            </div>
                            <a href="/orders/" class="orders-empty-btn">
                                К заказам
                            </a>
                            `
                            container.appendChild(warnDiv)
                        }
                    }
                })
        })
    })
})