'use strict'

const checkMedia = window.matchMedia('(max-width: 767.98px)')

const loginButton = document.querySelector('.login')

const guestHandler = () => {
    loginButton.addEventListener('click', () => {
        window.location = '/login'
    })
}

const customerHandler = (name) => {
    const dropdown = document.createElement('div')
    dropdown.classList.add('logindropdown')
    if (checkMedia.matches)
        loginButton.addEventListener('click', () => {
            dropdown.classList.toggle('loginclicked')
            dropdown.classList.toggle('loginclicked')
        })
    dropdown.innerHTML = `
        <p>${name.toUpperCase()}'s ACCOUNT </p>
        <hr>
        <a href = '/my_profile'>My account</a>
        <a href = '#'>Orders</a>
        <a href = '#'>Vouchers</a> 
        <hr>
        <button>Log out</button>
    `
    loginButton.appendChild(dropdown)
}

const url = 'http://localhost:3000/account/profile'

fetch(url, { method: 'GET' }).then((res) => {
    if (res.status == 404) guestHandler()
    else
        res.json().then((data) => {
            customerHandler(data['first name'])
        })
})
