'use strict'

// INFORMATION
const container = document.querySelector('.account-info')
const title = document.querySelector('.title')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const phone = document.querySelector('#phone')
const email = document.querySelector('.email')
const saveInfoBtn = document.querySelector('.save-info-btn')
// PASSWORD
const password1 = document.querySelector('#password1')
const password2 = document.querySelector('#password2')
const savePassBtn = document.querySelector('.save-password-btn')
// SHIPPING ADDRESS
const curAddress = document.querySelector('.address')
const newAddress = document.querySelector('#new_address')

fetchState().then((User) => {
    if (User) {
        console.log(User)
        // INFORMATION
        title.textContent = `${User['first name'].toUpperCase()}'S ACCOUNT`
        firstName.value = User['first name']
        lastName.value = User['last name']
        phone.value = User['phone']
        email.textContent = User['email']

        saveInfoBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            if (firstName.value.trim() == '') {
                let p = document.createElement('p')
                p.textContent = '* Please enter your First Name'
            } else if (phone.value.trim() == '') {
                let p = document.createElement('p')
                p.textContent = '* Please enter your Phone Number'
            } else {
                const res = await fetch('/')
            }
        })

        // PASSWORD

        // ADDRESS
        if (User['address'].trim() == '')
            curAddress.textContent =
                'You have not updated your address. Please update!'
        else curAddress.textContent = User['address'].trim()
    } else {
        container.textContent = 'PLEASE LOG IN'
    }
})
