'use strict'

const checkout = document.querySelector('.checkout')

const checkoutBox = document.createElement('div')

// if (checkMedia.matches) {
//     dropdown.style.display = 'none'
//     cart.addEventListener('click', () => {
//         if (dropdown.style.display == 'none') dropdown.style.display = 'block'
//         else dropdown.style.display = 'none'
//     })
// }

checkoutBox.innerHTML = `
        <div class = 'title'>YOUR ORDER</div>
        <div class = 'productList1 row justify-content-center'></div>
    `
checkout.appendChild(checkoutBox)

const productList1 = document.querySelector('.productList1')

const adjustAmountHandler1 = async (id_cart, id_item, amount, id_user) => {
    let data = {id_cart, id_item, amount}
    if (amount == 0) {
        console.log(id_cart, id_item)
        await fetch('/cart/delete_product', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({id_cart, id_item}),
        })
        await cartRender1(id_user)
        return false
    }
    await fetch('/cart/change_amount', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    })

    console.log('hello')

    await cartRender1(id_user)
    await cartRender(id_user)
}

const cartRender1 = async (id_user) => {
    const data = {id_user}
    let items = await fetch('/cart/view', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    }).then((data) => data.json())

    console.log(data)

    const productList1 = document.querySelector('.productList1')

    console.log('hello', productList1)

    productList1.innerHTML = ''

    console.log(productList1)

    const id_cart = items._id

    items = items.products

    let total = 0
    let qty = 0

    items.forEach((item) => {
        const itemContainer = document.createElement('div')
        qty += item.amount
        //console.log(item)
        let price =
            Number(item.info.price) +
            (item.size == 'M' ? 5000 : 0) +
            (item.size == 'L' ? 10000 : 0)
        //console.log(item.info.price)
        total += price * item.amount
        itemContainer.innerHTML = `
            <div class = "cart-item row">
                <div class = "col-6 col-md-6">
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
                <div class = "col-3 col-md-2" style = "color:black">
                    <i class="fas fa-minus change-amount" onClick="adjustAmountHandler1('${id_cart}','${
            item._id
        }', '${item.amount - 1}','${id_user}')"></i>
                    <span> ${item.amount} </span>
                    <i class="fas fa-plus change-amount" onClick="adjustAmountHandler1('${id_cart}','${
            item._id
        }', '${item.amount + 1}','${id_user}')"></i>
                </div>
                <div class = "col-2 col-md-3 secondary" style = "color:grey; font-weight:bold">${
                    price * item.amount
                } VND</div>
                <div class = "col-1" style = "color:black">
                <i class="fas fa-trash-alt" onClick="adjustAmountHandler1('${id_cart}','${
            item._id
        }', '${0}','${id_user}')"></i>
                </div>
            </div>
        `
        productList1.appendChild(itemContainer)
    })

    const mess = document.createElement('div')
    if (items.length > 0)
        mess.innerHTML = `<div style = "color:black; font-weight:bold; text-align: right" >TOTAL: ${total} VND</div>
        <div class = "place-order-box" style = "text-align: center"><button class="place-order-btn">PLACE YOUR ORDER</button> </div>`
    else mess.innerHTML = `YOUR CART IS EMPTY`

    productList1.appendChild(mess)

    document.querySelector('.product-count').textContent = qty

    console.log(items)
}

if (localStorage.getItem('login')) {
    cartRender1(localStorage.getItem('id'))
} else {
    const mess = document.createElement('div')
    mess.textContent = `* PLEASE LOGIN TO VIEW YOUR CART AND ORDER!`
    productList1.appendChild(mess)
    productList1.appendChild(document.createElement('hr'))
}
