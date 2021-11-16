'use strict'

// Get element from html
const loginbutton = document.querySelector('#submit_login')
const warning = document.querySelector('#warning')
const registerbutton = document.querySelector('#submit_register')
// Phan login
loginbutton.addEventListener('click', loginUser)
async function loginUser(e) {
    e.preventDefault()
    const email = document.querySelector('#email_login').value
    const password = document.querySelector('#password_login').value
    await fetch('/log_in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data != 'log in accepted') warning.classList.remove('d-none')
            else {
                window.location = '/'
            }
        })
}

// Phan dang ky tai khoan
registerbutton.addEventListener('click', registerUser)
function checkbefore(
    firstName,
    lastName,
    email,
    password_signup,
    password_signup_cf,
    phoneNumber
) {
    if (password_signup.value != password_signup_cf.value) {
        document
            .querySelector('#warn-password_confirm')
            .classList.remove('d-none')
        return false
    }
    if (firstName.length == 0) {
        document.querySelector('#firstName').style.backgroundColor = '#ff8080'
        document.querySelector('#warn-firstname').classList.toggle('d-none')
        return false
    }
    if (lastName.length == 0) {
        document.querySelector('#lastName').style.backgroundColor = '#ff8080'
        document.querySelector('#warn-lastname').classList.toggle('d-none')
    }
    if (!email.includes('@gmail.com')) {
        document.querySelector('#email').style.backgroundColor = '#ff8080'
        document.querySelector('#warn-email').classList.toggle('d-none')
        return false
    }
    if (password_signup_cf.length < 6) {
        document.querySelector('#password_signup').style.backgroundColor =
            '#ff6666'
        document.querySelector('#warn-password').classList.toggle('d-none')
        return false
    }
    if (password_signup_cf.length == 0) {
        document.querySelector('#password_signup_cf').style.backgroundColor =
            '#ff8080'
        document
            .querySelector('#warn-password_confirm')
            .classList.toggle('d-none')
        return false
    }
    if (phoneNumber.length < 10) {
        document.querySelector('#phoneNumber').style.backgroundColor = '#ff8080'
        document.querySelector('#warn-phonenumber').classList.toggle('d-none')
        return false
    }
    return true
}

async function registerUser(e) {
    e.preventDefault()
    const firstName = document.querySelector('#firstName').value
    const lastName = document.querySelector('#lastName').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password_signup').value
    const password_cf = document.querySelector('#password_signup_cf').value
    const phone = document.querySelector('#phoneNumber').value

    if (checkbefore(firstName, lastName, email, password, password_cf, phone)) {
        await fetch('/addCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                phone,
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data == 'account added') window.location = '/'
                if (data == 'email existed') {
                    document.querySelector('#warn-email').innerHTML =
                        'This email number has been used'
                    document.querySelector('#email').style.backgroundColor =
                        '#ff8080'
                    document
                        .querySelector('#warn-email')
                        .classList.remove('d-none')
                }
                if (data == 'phone existed') {
                    document.querySelector('#warn-phonenumber').innerHTML =
                        'This phone number has been used'
                    document.querySelector(
                        '#phoneNumber'
                    ).style.backgroundColor = '#ff8080'
                    document
                        .querySelector('#warn-phonenumber')
                        .classList.remove('d-none')
                    document
                        .querySelector('#warn-email')
                        .classList.add('d-none')
                }
            })
    }
}