document.addEventListener('DOMContentLoaded', () => {
    const email = document.getElementById('email-copy')

    document.getElementById('copy-email-button').addEventListener('click', () => {
        navigator.clipboard.writeText(email.innerText).then(function() {
            let warn = document.querySelector('.footer-text-copied')        
            warn.classList.add('active')
            setTimeout(() => {
                warn.classList.remove('active')
            }, 2000)
        })
        
    })
})