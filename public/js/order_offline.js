async function get_info_product(category) {
    var myJSON
    const data = await fetch('/product/view', {
        method: 'GET',
    })
        .then((data) => data.json())
        .then((data) => {
            myJSON = data
        })
    Add_info(myJSON)
}

function Add_info(product_info) {
    var a = document.getElementById('Sample')
    for (var i = 0; i < 3 - 1; i++) {
        var clone = document.querySelector('#Sample').cloneNode(true)
        a.insertAdjacentElement('afterend', clone)
    }
    var product_item = document.getElementsByClassName('product-item-li')
    var product_img = document.getElementsByClassName('product-img')
    var product_name = document.getElementsByClassName('product-name')
    var product_cost = document.getElementsByClassName('product-cost')

    for (var i = 0; i < 3; i++) {
        var src = product_info[i].image
        product_img[i].src = src
        product_name[i].innerHTML = product_info[i].name
        product_cost[i].innerHTML = product_info[i].price
    }
    ReCalculate(); 
}

function ReCalculate() {
    var a = document.getElementById("total-bill")
    var b = document.getElementsByClassName("product-cost")
    var c = document.getElementsByClassName("number-product")
    var sum = 0
    for (var i = 0; i<b.length; i++) {
        sum = sum + c[i].value*b[i].innerHTML;
    }
    a.innerHTML = String(sum) + " VNĐ"

}

function admit() {
    alert("Đã hoàn thành đơn hàng");
}