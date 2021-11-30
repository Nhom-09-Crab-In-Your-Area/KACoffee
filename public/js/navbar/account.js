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

    const hello = async (e) => {
        e.preventDefault()
        const res = await fetch('/log_out', { method: 'GET' })
        window.location = '/'
    }

    dropdown.innerHTML = `
        <p>${name.toUpperCase()}'s ACCOUNT </p>
        <hr>
        <a href = '/my_profile'>My account</a>
        <a href = '#'>Orders</a>
        <a href = '#'>Vouchers</a> 
        <hr>
        <button class = "logout-btn" >Log out</button>
    `
    loginButton.appendChild(dropdown)
    const logoutBtn = document.querySelector('.logout-btn')
    logoutBtn.addEventListener('click', async () => {
        localStorage.removeItem('login')
        const res = await fetch('/log_out', { method: 'GET' })
        window.location = '/'
    })
}

const fetchState = async (url = '/check_self_profile') => {
    const data = await fetch(url, { method: 'GET' }).then((res) => {
        if (res.status == 401) {
            guestHandler()
            return null
        } else return res.json()
    })

    if (data) {
        //localStorage.setItem('login', 'true')
        customerHandler(data['first name'])
    }

    return data
}
