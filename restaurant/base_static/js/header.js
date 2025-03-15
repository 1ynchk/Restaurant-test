document.addEventListener('DOMContentLoaded', () => {

    let isActiveBtn = false

    const loginRequiredBtn = document.getElementById('header-nav-login-required')
    const popup = document.querySelector('.popup-sign-in-wrapper-login-required')
    const loginRequiredBtnMainPage = document.getElementById('main-page-nav-login-required')

    loginRequiredBtnMainPage.addEventListener('click', () => {
        isActiveBtn = !isActiveBtn

        if (isActiveBtn) {
            popup.classList.add('active')
        } else {
            popup.classList.remove('active')
        }
    })
    // if (loginRequiredBtn) {
    loginRequiredBtn.addEventListener('click', () => {
        isActiveBtn = !isActiveBtn

        if (isActiveBtn) {
            popup.classList.add('active')
        } else {
            popup.classList.remove('active')
        }
    })

    popup.addEventListener('click', () => {
        isActiveBtn = false

        popup.classList.remove('active')
    })
    // }

})