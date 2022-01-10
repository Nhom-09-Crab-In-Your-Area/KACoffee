'use strict'

const reload = async () => {
    console.log('Hello')
    container.style.display = 'block'
    if (document.querySelector('.orderHA'))
        document.querySelector('.orderHA').style.display = 'none'
    console.log(document.querySelector('.order-online'))
    if (document.querySelector('.order-online'))
        document.querySelector('.order-online').style.display = 'none'
    const User = await fetch('/check_self_profile', {
        method: 'GET',
    }).then((res) => res.json())

    if (User) {
    } else {
        container.textContent = 'PLEASE LOG IN'
    }
}

fetchState().then((User) => {
    document
        .querySelector('.profile-display')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            //console.log('Hello')
            container.style.display = 'block'
            const User = await fetch('/check_self_profile', {
                method: 'GET',
            }).then((res) => res.json())

            if (User) {
            } else {
                container.textContent = 'PLEASE LOG IN'
            }
        })
})

// fetchState().then((User) => {
//     if (User) {
//         // INFORMATION
//         //console.log(title)
//         title.textContent = `${User['first name'].toUpperCase()} ${User[
//             'last name'
//         ].toUpperCase()}`
//         firstName.value = User['first name']
//         lastName.value = User['last name']
//         phone.value = User['phone']
//         email.textContent = User['email']

//         saveInfoBtn.addEventListener('click', async (e) => {
//             e.preventDefault()
//             if (firstName.value.trim() == '') {
//                 mesFirstName.classList.remove('mes-none27')
//                 mesFirstName.classList.add('mes-display27')
//             } else if (phone.value.trim() == '') {
//                 mesFirstName.classList.add('mes-none27')
//                 mesFirstName.classList.remove('mes-display27')
//                 mesPhone.classList.remove('mes-none27')
//                 mesPhone.classList.add('mes-display27')
//             } else {
//                 const data = {
//                     'first name': firstName.value,
//                     'last name': lastName.value,
//                     phone: phone.value,
//                 }
//                 const res = await fetch('/edit_self_profile', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(data),
//                 })

//                 location.reload()
//             }
//         })

//         // PASSWORD

//         savePassBtn.addEventListener('click', async (e) => {
//             e.preventDefault()
//             if (password1.value == '') {
//                 mesPassword1.classList.remove('mes-none27')
//                 mesPassword1.classList.add('mes-display27')
//             } else if (password2.value == '') {
//                 mesPassword1.classList.add('mes-none27')
//                 mesPassword1.classList.remove('mes-display27')
//                 mesPassword2.classList.remove('mes-none27')
//                 mesPassword2.classList.add('mes-display27')
//             } else if (password1.value !== password2.value) {
//                 mesPassword1.classList.add('mes-none27')
//                 mesPassword1.classList.remove('mes-display27')
//                 mesPassword2.classList.add('mes-none27')
//                 mesPassword2.classList.remove('mes-display27')
//                 mesPassword.classList.remove('mes-none27')
//                 mesPassword.classList.add('mes-display27')
//             } else {
//                 const data = {
//                     password: password1.value,
//                 }
//                 const res = await fetch('/edit_self_profile', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(data),
//                 })

//                 location.reload()
//             }
//         })

//         // ADDRESS
//         if (User['address'].trim() == '')
//             curAddress.textContent =
//                 'You have not updated your address. Please update!'
//         else curAddress.textContent = User['address'].trim()

//         saveAddBtn.addEventListener('click', async (e) => {
//             e.preventDefault()
//             if (newAddress.value.trim() == '') {
//                 mesAddress.classList.remove('mes-none27')
//                 mesAddress.classList.add('mes-display27')
//             } else {
//                 const data = {
//                     address: newAddress.value,
//                 }
//                 const res = await fetch('/edit_self_profile', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(data),
//                 })

//                 location.reload()
//             }
//         })
//     } else {
//         container.textContent = 'PLEASE LOG IN'
//     }
// })
