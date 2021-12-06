const square = document.getElementById('square-1')
const submitbtn = document.querySelector('#email-submit')
const codebtn = document.querySelector('#code-submit')
const submit = document.querySelector('#submit-success')
const email = document.querySelector('#email')

submitbtn.addEventListener('click', checkmail)
codebtn.addEventListener('click', checkcode)
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
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if ((data = 'email not exist')) {
                    warning.classList.add('d-none')
                    warning1.classList.remove('d-none')
                }
            })
        // square.style.transform = 'rotate3d(0, -1, 0, 90deg)'
        // document.title = 'Sign up page'
    } else {
        if (!warning1.classList.contains('d-none'))
            warning1.classList.add('d-none')
        warning.classList.remove('d-none')
    }
}
async function checkcode(e) {
    e.preventDefault()

    square.style.transform = 'rotate3d(0, 1, 0, 90deg)'
    document.title = 'Forgot password page'
}

async function changepassword(e) {
    e.preventDefault()
    window.location = '/login'
}
