'use strict'

const logged = localStorage.getItem('check_login') == 'true'

const checkMedia = window.matchMedia('(max-width: 767.98px)')

const loginButton = document.querySelector('.login')

if (!logged) {
    loginButton.addEventListener('click', () => {
        window.location = '/login'
    })
} else {
    const dropdown = document.createElement('div')
    dropdown.classList.add('logindropdown')
    if (checkMedia.matches)
        loginButton.addEventListener('click', () => {
            dropdown.classList.toggle('loginclicked')
            dropdown.classList.toggle('loginclicked')
        })
    dropdown.innerHTML = `
        <p>ANH's ACCOUNT </p>
        <hr>
        <a href = '#'>My account</a>
        <a href = '#'>Orders</a>
        <a href = '#'>Vouchers</a> 
        <hr>
        <button>Log out</button>
    `
    loginButton.appendChild(dropdown)
}
