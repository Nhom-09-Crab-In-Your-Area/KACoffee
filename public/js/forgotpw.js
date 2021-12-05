const square = document.getElementById('square-1')
const submitbtn = document.querySelector('#email-submit')
const codebtn = document.querySelector('#code-submit')
const submit = document.querySelector('#submit-success')
submitbtn.addEventListener('click', (e) => {
    e.preventDefault()
    square.style.transform = 'rotate3d(0, -1, 0, 90deg)'
    document.title = 'Sign up page'
})
codebtn.addEventListener('click', (e) => {
    e.preventDefault()
    square.style.transform = 'rotate3d(0, 1, 0, 90deg)'
    document.title = 'Forgot password page'
})
submit.addEventListener('click', (e) => {
    e.preventDefault()
    window.location = '/'
})
