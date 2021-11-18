'use strict'

const cart = document.querySelector('.cart')

const dropdown = document.createElement('div')

dropdown.classList.add('cartdropdown')

if (checkMedia.matches) {
    dropdown.style.display = 'none'
    cart.addEventListener('click', () => {
        if (dropdown.style.display == 'none') dropdown.style.display = 'block'
        else dropdown.style.display = 'none'
    })
}

dropdown.innerHTML = `
        <div class = 'title'>CHECK YOUR CART</div>
        <div class = 'productList'></div>
    `
cart.appendChild(dropdown)

const productList = document.querySelector('.productList')

if (localStorage.getItem('login')) {
    console.log(localStorage.getItem('login'))
} else {
    const mess = document.createElement('div')
    mess.textContent = `* PLEASE LOGIN TO VIEW YOUR CART AND ORDER!`
    productList.appendChild(mess)
    productList.appendChild(document.createElement('hr'))
}
