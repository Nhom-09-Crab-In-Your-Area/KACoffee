const square = document.getElementById('square-1')
const sendmail = document.querySelector('#email-submit')
const submitbtn = document.querySelector('#submit')
const email = document.querySelector('#email')

const password1 = document.querySelector('#password')
const password2 = document.querySelector('#confirm_password')
const mesPassword = document.querySelector('#mes-password')
const mesPassword1 = document.querySelector('#mes-password1')
const mesPassword2 = document.querySelector('#mes-password2')

submitbtn.addEventListener('click', async (e) => {
    e.preventDefault()
    if (password1.value == '') {
        mesPassword1.classList.remove('mes-none')
        mesPassword1.classList.add('mes-display')
    } else if (password2.value == '') {
        mesPassword1.classList.add('mes-none')
        mesPassword1.classList.remove('mes-display')
        mesPassword2.classList.remove('mes-none')
        mesPassword2.classList.add('mes-display')
    } else if (password1.value !== password2.value) {
        mesPassword1.classList.add('mes-none')
        mesPassword1.classList.remove('mes-display')
        mesPassword2.classList.add('mes-none')
        mesPassword2.classList.remove('mes-display')
        mesPassword.classList.remove('mes-none')
        mesPassword.classList.add('mes-display')
    } else {
        const data = {
            password: password1.value,
        }
        const res = await fetch('/edit_self_profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        location.reload()
    }
})

sendmail.addEventListener('click', checkmail)
async function checkmail(e) {
    e.preventDefault()

    if (email.value != '') {
        await fetch('/send_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                emailType: 'password_change',
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data == 'email not exist') {
                    warning.classList.add('d-none')
                    warning1.classList.remove('d-none')
                } else if (data == 'email sent') {
                    window.location = '/login'
                }
            })
    } else {
        if (!warning1.classList.contains('d-none'))
            warning1.classList.add('d-none')
        warning.classList.remove('d-none')
    }
}
