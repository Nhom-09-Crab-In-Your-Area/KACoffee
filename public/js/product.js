function Filter_coffee() {
    var all = document.getElementsByClassName('product-item-li')

    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    var coffee = document.getElementsByClassName('coffee')
    for (var i = 0; i < coffee.length; i++) {
        coffee[i].style.display = 'block'
    }
}
function Filter_tea() {
    var all = document.getElementsByClassName('product-item-li')
    var tea = document.getElementsByClassName('tea')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < tea.length; i++) {
        tea[i].style.display = 'block'
    }
}
function Filter_iceblended() {
    var all = document.getElementsByClassName('product-item-li')
    var iceblended = document.getElementsByClassName('iceblended')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    console.log(iceblended.length)
    for (var i = 0; i < iceblended.length; i++) {
        iceblended[i].style.display = 'block'
    }
}
function Filter_shippingonly() {
    var all = document.getElementsByClassName('product-item-li')
    var shippingonly = document.getElementsByClassName('shippingonly')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < shippingonly.length; i++) {
        shippingonly[i].style.display = 'block'
    }
}
function Filter_snack() {
    var all = document.getElementsByClassName('product-item-li')
    var snack = document.getElementsByClassName('snack')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < snack.length; i++) {
        snack[i].style.display = 'block'
    }
}
function Filter_gift() {
    var all = document.getElementsByClassName('product-item-li')
    var gift = document.getElementsByClassName('gift')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < gift.length; i++) {
        gift[i].style.display = 'block'
    }
}

function Add_info(product_info) {
    var a = document.getElementById('Sample')
    for (var i = 0; i < product_info.length - 1; i++) {
        var clone = document.querySelector('#Sample').cloneNode(true)
        a.insertAdjacentElement('afterend', clone)
    }
    var product_item = document.getElementsByClassName('product-item-li')
    var product_img = document.getElementsByClassName('product-img')
    var product_name = document.getElementsByClassName('product-name')
    var product_cost = document.getElementsByClassName('product-cost')
    var rateNumber = document.getElementsByClassName('rateNumber')
    var ratingStars = document.getElementsByClassName('ratingStars')

    for (var i = 0; i < product_info.length; i++) {
        var type = product_info[i].type
        product_item[i].classList.add(type)
        var src = product_info[i].image
        product_img[i].src = src
        product_name[i].innerHTML = product_info[i].name
        product_cost[i].innerHTML = product_info[i].price
        rateNumber[i].innerHTML = product_info[i].rateNumber

        var rateLevel = product_info[i].rateLevel
        rateLevel = 5
        for (var j = 0; j < rateLevel - 1; j++) {
            var SampleStar = document
                .querySelector('#SampleStar')
                .cloneNode(true)
            ratingStars[i].appendChild(SampleStar)
        }
    }
}

async function get_info_product(category) {
    var myJSON
    const data = await fetch('http://localhost:3000/product/view', {
        method: 'GET',
    })
        .then((data) => data.json())
        .then((data) => {
            myJSON = data
        })
    Add_info(myJSON)
}
