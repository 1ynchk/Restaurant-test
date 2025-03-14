document.addEventListener('DOMContentLoaded', () => {



    let isActiveBtn = false
    let isSignIn = true

    const signInBtn = document.getElementById('sign-in-btn')
    const popup = document.querySelectorAll('.popup-sign-in-wrapper')
    const modal = document.querySelector('.popup-sign-in')
    const changeMode = document.getElementById('change-mode')
    const formLogin = document.getElementById('form-login')
    const formRegister = document.getElementById('form-register')
    const popupContainerInscription = document.getElementById('popup-container-incription')
    const submitBtn = document.querySelector('.popup-form-btn')
    const popupTitle = document.getElementById('popup-title')

    submitBtn.addEventListener('click', () => {
        isActiveBtn = false
    })

    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            isActiveBtn = !isActiveBtn

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
    }


    popup.forEach(el => {
        el.addEventListener('click', () => {
            isActiveBtn = false

            el.classList.remove('active')
        })
    })

    modal.addEventListener('click', (e) => {
        e.stopPropagation()
    })

    changeMode.addEventListener('click', () => {
        isSignIn = !isSignIn

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