const square = document.getElementById('square-1')
const sendmail = document.querySelector('#email-submit')
const submit = document.querySelector('#submit-success')
const email = document.querySelector('#email')

sendmail.addEventListener('click', checkmail)
submit.addEventListener('click', changepassword)

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

async function changepassword(e) {
    e.preventDefault()
    window.location = '/login'
}
