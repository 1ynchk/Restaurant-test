document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.querySelectorAll('.pleat-btn-order.order-save')
    const warnMessage = document.querySelector('.order-warn-message')
    const successMessage = document.querySelector('.order-succeess-message')
    const errorPopup = document.getElementById('popup-sign-in-wrapper-warn-delete')
    const successPopup = document.getElementById('popup-sign-in-wrapper-success-delete')

    saveButton.forEach(el => (
        el.addEventListener('click', () => {
            const orderId = el.getAttribute('data-order-id')
            const statusSelect = document.getElementById(`status-${orderId}`)
            const selectedStatus = statusSelect.value

            const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/)[1]

            fetch(`/order/update/${orderId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({
                    status: selectedStatus,
                })
            })
                .then(response => {
                    if (!response.ok) {
                        errorPopup.classList.add('active')
                        warnMessage.innerText = `Произошла ошибка ${response.status}`
                    } else {
                        successPopup.classList.add('active')
                        successMessage.innerHTML = 'Статус успешно изменен!'
                    }
                })

        })
    ))

})