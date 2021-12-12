'use strict'

const cartChangeAmount = async () => {}

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

const cartAddItem = async (
    id_user,
    id_product,
    size,
    sugar_level,
    ice_level,
    amount,
    storeID = 1
) => {
    try {
        data = {
            id_user,
            id_product,
            size,
            sugar_level,
            ice_level,
            amount,
            storeID,
        }
        await fetch('/cart/add_product', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        })

        return true
    } catch {
        return false
    }
}

const cartRender = async (id_user) => {
    const data = { id_user }
    let items = await fetch('/cart/view', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    }).then((data) => data.json())

    const productList = document.querySelector('.productList')
    console.log(productList)

    items = items.products

    let total = 0
    let qty = 0

    items.forEach((item) => {
        const itemContainer = document.createElement('div')
        qty += item.amount
        console.log(item)
        let price =
            Number(item.info.price) +
            (item.size == 'M' ? 5000 : 0) +
            (item.size == 'L' ? 10000 : 0)
        console.log(item.info.price)
        total += price * item.amount
        itemContainer.innerHTML = `
            <div class = "cart-item row">
                <div class = "col-8 col-md-7">
                    <div> ${item.info.name.toUpperCase()} </div>
                    <div> 
                        <span class="badge rounded-pill bg-secondary ">${
                            'Size: ' + item.size
                        }</span>
                        <span class="badge rounded-pill bg-secondary ">${
                            'Sugar: ' + item.sugar_level + '%'
                        }</span>
                        <span class="badge rounded-pill bg-secondary ">${
                            'Ice: ' + item.ice_level + '%'
                        }</span>
                    </div>
                </div>
                <div class = "col-1" style = "color:black">x${item.amount}</div>
                <div class = "col-3 col-md-4 secondary" style = "color:grey; font-weight:bold">${
                    price * item.amount
                } VND</div>
            </div>
        `
        productList.appendChild(itemContainer)
    })

    const mess = document.createElement('div')
    if (items.length > 0)
        mess.innerHTML = `<div style = "color:black; font-weight:bold; text-align: right" >TOTAL: ${total} VND</div>
        <div style = "text-align: center"><button>CHECK OUT</button> </div>`
    else mess.innerHTML = `YOUR CART IS EMPTY`

    productList.appendChild(mess)

    document.querySelector('.product-count').textContent = qty

    console.log(items)
}

if (localStorage.getItem('login')) {
    console.log(localStorage.getItem('login'))
    cartRender(localStorage.getItem('id'))
} else {
    const mess = document.createElement('div')
    mess.textContent = `* PLEASE LOGIN TO VIEW YOUR CART AND ORDER!`
    productList.appendChild(mess)
    productList.appendChild(document.createElement('hr'))
}
