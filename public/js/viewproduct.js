var id_URL = window.location.search
var tmp = id_URL.split('=')
var id = tmp[tmp.length - 1]
// function a() {
//     alert(typeof(id))
// }

function add_info(product_info) {
    var product_type = document.getElementById('product-type')
    var product_name = document.getElementById('product-name')
    var product_cost = document.getElementById('product-cost')
    var product_rate_number = document.getElementById('rate-number')
    var product_rate_star = document.getElementById('rate-star')
    var product_image = document.getElementById('product-image')
    var product_description = document.getElementById('description')
    for (var i = 0; i < product_info.length; i++) {
        if (id == String(product_info[i]._id)) {
            product_type.innerHTML = product_info[i].type
            product_name.innerHTML = product_info[i].name
            product_cost.innerHTML = product_info[i].price
            product_rate_number.innerHTML = product_info[i].rateNumber
            product_image.src = product_info[i].image
            product_description.innerHTML = product_info[i].description
            for (var j = 1; j <= 5; j++) {
                // product_rate_star.appendChild(<span class="on"></span>)
                // product_info[i].rateLevel
                var node = document.createElement('span')
                node.className = 'on'
                product_rate_star.appendChild(node)
            }

            // console.log(product_info[i].type)
            break
        }
    }
    console.log(product_info)
}

async function get_info_product(category) {
    var myJSON
    const data = await fetch('/product/view', {
        method: 'GET',
    })
        .then((data) => data.json())
        .then((data) => {
            myJSON = data
        })
    add_info(myJSON)
}
