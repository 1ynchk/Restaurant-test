document.addEventListener('DOMContentLoaded', () => {

    let isActiveBtn = false

    const loginRequiredBtn = document.querySelectorAll('.header-nav-btn.header-nav-login-required')
    const popup = document.querySelector('.popup-sign-in-wrapper-login-required')
    const loginRequiredBtnMainPage = document.getElementById('main-page-nav-login-required')
    const toRegisterbtn = document.querySelectorAll('.popup-form-btn.to-register')
    const burger = document.querySelector('.burger-container')
    const sidebarWrapper = document.querySelector('.sidebar-wrapper')
    const sidebar = document.querySelector('.sidebar')
    const sidebarClose = document.querySelector('.close-sidebar')

    let screenWidth = window.innerWidth

    function updateScreenWidth() {
        screenWidth = window.innerWidth;
        if (screenWidth > 760) {
            sidebar.classList.remove('active')
            sidebarWrapper.classList.remove('active')
        }
    }

    const debounce = () => {
        let timeout

        return function () {
            clearTimeout(timeout)

            timeout = setTimeout(() => {
                updateScreenWidth()
            }, 500)
        }
    }

    window.addEventListener('resize', debounce())

    sidebarClose.addEventListener('click', () => {
        sidebarWrapper.classList.toggle('active')
        sidebar.classList.toggle('active')
    })

    sidebar.addEventListener('click', (e) => {
        e.stopPropagation()
    })

    sidebarWrapper.addEventListener('click', () => {
        sidebarWrapper.classList.toggle('active')
        sidebar.classList.toggle('active')
    })

    burger.addEventListener('click', () => {
        sidebarWrapper.classList.toggle('active')
        sidebar.classList.toggle('active')
    })

    toRegisterbtn.forEach(el => {
        el.addEventListener('click', () => {
            isActiveBtn = false
            sidebarWrapper.classList.remove('active')
            sidebar.classList.remove('active')
            popup.classList.remove('active')
        })
    })

    if (loginRequiredBtnMainPage) {
        loginRequiredBtnMainPage.addEventListener('click', () => {
            isActiveBtn = !isActiveBtn
            sidebarWrapper.classList.remove('active')
            sidebar.classList.remove('active')
            if (isActiveBtn) {
                popup.classList.add('active')
            } else {
                popup.classList.remove('active')
            }
        })
    }

    if (loginRequiredBtn) {
        loginRequiredBtn.forEach(el => {
            el.addEventListener('click', () => {
                isActiveBtn = !isActiveBtn
                sidebarWrapper.classList.remove('active')
                sidebar.classList.remove('active')
                if (isActiveBtn) {
                    popup.classList.add('active')
                } else {
                    popup.classList.remove('active')
                }
            })
        })

    }

    popup.addEventListener('click', () => {
        isActiveBtn = false
        sidebarWrapper.classList.remove('active')
        sidebar.classList.remove('active')
        popup.classList.remove('active')
    })

})