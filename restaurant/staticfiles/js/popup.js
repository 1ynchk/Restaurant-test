document.addEventListener('DOMContentLoaded', () => {
    let isActiveBtn = false
    let isSignIn = true

    const signInBtn = document.querySelectorAll('.sign-in-btn')
    const popup = document.querySelectorAll('.popup-sign-in-wrapper')
    const modal = document.querySelectorAll('.popup-sign-in')
    const changeMode = document.getElementById('change-mode')
    const formLogin = document.getElementById('form-login')
    const formRegister = document.getElementById('form-register')
    const popupContainerInscription = document.getElementById('popup-container-incription')
    const submitBtn = document.querySelector('.popup-form-btn')
    const popupTitle = document.getElementById('popup-title')
    const toRegisterbtn = document.querySelectorAll('.popup-form-btn.to-register')
    const sidebar = document.querySelector('.sidebar')
    const sidebarWrapper = document.querySelector('.sidebar-wrapper')

    toRegisterbtn.forEach(el => {
        el.addEventListener('click', () => {
            isActiveBtn = false

            sidebarWrapper.classList.remove('active')
            sidebar.classList.remove('active')
            popup.forEach(el => {
                el.classList.remove('active')
            })
        })
    })

    submitBtn.addEventListener('click', () => {
        isActiveBtn = false
        sidebarWrapper.classList.remove('active')
        sidebar.classList.remove('active')
    })

    if (signInBtn) {
        signInBtn.forEach(el => {
            el.addEventListener('click', () => {
                isActiveBtn = !isActiveBtn
                sidebarWrapper.classList.remove('active')
                sidebar.classList.remove('active')
                if (isActiveBtn) {
                    popup.forEach(el => {
                        if (el.id != 'popup-sign-in-wrapper-warn') {
                            el.classList.add('active')
                        }
                    })
                } else {
                    popup.forEach(el => {
                        el.classList.add('active')
                    })
                }
            })
        })

    }


    popup.forEach(el => {
        el.addEventListener('click', () => {
            isActiveBtn = false
            sidebarWrapper.classList.remove('active')
            sidebar.classList.remove('active')
            el.classList.remove('active')
        })
    })

    modal.forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation()
        })
    })


    changeMode.addEventListener('click', () => {
        isSignIn = !isSignIn
        sidebarWrapper.classList.remove('active')
        sidebar.classList.remove('active')
        if (isSignIn) {
            formLogin.classList.remove('display-none')
            popupContainerInscription.innerText = 'Нет аккаунта?'
            changeMode.innerText = 'Зарегистрироваться'
            formRegister.classList.add('concealed')
            formRegister.classList.add('display-none')
            formLogin.classList.remove('concealed')
            popupTitle.innerText = 'Авторизация'
        } else {
            formLogin.classList.add('concealed')
            popupContainerInscription.innerText = 'Есть аккаунт?'
            changeMode.innerText = 'Войти'
            formLogin.classList.add('display-none')
            formRegister.classList.remove('display-none')
            formRegister.classList.remove('concealed')
            popupTitle.innerText = 'Регистрация'
        }
    })
})