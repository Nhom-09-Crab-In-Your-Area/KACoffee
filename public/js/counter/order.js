//Get element from html
var i = 0

// Filter
function Add_active(string) {
    var delete_active = document.getElementsByClassName('active')
    delete_active[0].classList.remove('active')
    var active = document.getElementById(string)
    active.classList.add('active')
}

function All() {
    var all = document.getElementsByClassName('accordion-item')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'block'
    }
    Add_active('all_filter')
}

function Filter_1() {
    var all = document.getElementsByClassName('accordion-item')
    var to_pay = document.getElementsByClassName('Verifying')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < to_pay.length; i++) {
        to_pay[i].style.display = 'block'
    }
    Add_active('verifying_filter')
}

function Filter_2() {
    var all = document.getElementsByClassName('accordion-item')
    var to_receive = document.getElementsByClassName('Processing')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < to_receive.length; i++) {
        to_receive[i].style.display = 'block'
    }
    Add_active('processing_filter')
}

function Filter_3() {
    var all = document.getElementsByClassName('accordion-item')
    var completed = document.getElementsByClassName('Shipping')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < completed.length; i++) {
        completed[i].style.display = 'block'
    }
    Add_active('shipping_filter')
}
function Filter_4() {
    var all = document.getElementsByClassName('accordion-item')
    var completed = document.getElementsByClassName('Completed')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < completed.length; i++) {
        completed[i].style.display = 'block'
    }
    Add_active('completed_filter')
}

//Gui request lien tuc de cap nhat
setTimeout(getorder, 1000)
setTimeout(getorderdata, 1000)
setTimeout(getpendingorder, 1500)
setTimeout(getpendingorderdata, 1500)

// setInterval(getorder, 60000)
// setInterval(getorderdata, 60000)
// setInterval(getpendingorder, 60001)
// setInterval(getpendingorderdata, 60001)
//Cac ham request

async function changestatus(id, status) {
    if (status == 'Verifying') a = 'Processing'
    else if (status == 'Processing') a = 'Shipping'
    else a = 'Completed'
    await fetch('/store/status_order', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_order: id,
            status_order: a,
        }),
    })
        .then((res) => res.json())
        .then((data) => {})
}

async function getorder(e) {
    const data = await fetch('/store/view_order', {
        method: 'GET',
    }).then((data) => data.json())

    console.log(data)
    const orderlists = document.querySelector('.order-list-section')
    orderlists.innerHTML = ''
    const bars = document.createElement('div')
    bars.innerHTML = `   <div class="fixed-container">
                <div class="order-list-header text-center">
                    <span class="order-name">Người mua</span>
                    <span class="order-status">Trạng thái</span>
                    <span class="order-phone">Số điện thoại</span>
                    <span class="order-address">Địa chỉ</span>
                    <span class="order-price">Giá tiền</span>
                </div>
            </div>`
    orderlists.appendChild(bars)
    data.forEach((order) => {
        const itemContainer = document.createElement('div')
        itemContainer.innerHTML = `
        <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item ${order.status}"> <!-- sua lai khi them database -->
          <h2 class="accordion-header" id="flush-heading${i}">
            <button class="accordion-button accordion-cus collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapseOne">
                <div class="order-list-data text-center">
                    <span class="order-name">Phan Đức Anh</span>
                    <span class="order-status">${order.status}</span>
                    <span class="order-phone">0364900193</span>
                    <span class="order-address">Tuyen Quang </span>
                    <span class="order-price">${order.price} VNĐ</span>
                </div>
            </button>
          </h2>
            <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
                <div class="item-infor-${i}">
                    <div class="row">
                        <div class="col-sm">Sản phẩm</div>
                        <div class="col-sm">Size</div>
                        <div class="col-sm">Đá</div>
                        <div class="col-sm">Đường</div>
                        <div class="col-sm">Số lượng</div>
                        <div class="col-sm">Thành tiền</div>
                    </div>  
                </div>
                <p class="button">
                <button onclick ="changestatus('${order._id}',"${order.status}")" class="d-block btn btn-warning mr-0 ml-auto" >Done</button>
                </p>
            </div>
          </div>
        </div>
      </div>
        `
        orderlists.appendChild(itemContainer)
        i++
    })
}
async function getorderdata(e) {
    const data = await fetch('/store/view_order', {
        method: 'GET',
    }).then((data) => data.json())

    console.log(data)
    var i = 0
    data.forEach((order) => {
        const itemInfo = document.createElement('div')
        const temp = document.querySelector(`.item-infor-${i}`)
        for (let j = 0; j < order.products.length; j++) {
            const item = document.createElement('div')
            item.innerHTML = `
                <div class="row">
                    <div class="col-sm">${order.products[j].info.name}</div>
                    <div class="col-sm">${order.products[j].size}</div>
                    <div class="col-sm">${order.products[j].ice_level}</div>
                    <div class="col-sm">${order.products[j].sugar_level}</div>
                    <div class="col-sm">${order.products[j].amount}</div>
                    <div class="col-sm">${
                        order.products[j].info.price * order.products[j].amount
                    }VNĐ</div>
                </div>    
            `
            itemInfo.appendChild(item)
        }
        temp.appendChild(itemInfo)
        i++
    })
}

{
    /* <span class="order-name">$${order.user._id}</span>
<span class="order-status">${order.status}</span>
<span class="order-phone">${order.user.phone}</span>
<span class="order-address">${order.user.address} </span>
<span class="order-price">${order.price} VNĐ</span> */
}
async function getpendingorder(e) {
    const data = await fetch('/store/view_pending_order', {
        method: 'GET',
    }).then((data) => data.json())

    console.log(data)

    const orderlists = document.querySelector('.order-list-section')
    data.forEach((order) => {
        const itemContainer = document.createElement('div')
        itemContainer.innerHTML = `
        <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item ${order.status}"> <!-- sua lai khi them database -->
          <h2 class="accordion-header" id="flush-heading${i}">
            <button class="accordion-button accordion-cus collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapseOne">
                <div class="order-list-data text-center">
                <span class="order-name">Phan Đức Anh</span>
                <span class="order-status">${order.status}</span>
                <span class="order-phone">0364900193</span>
                <span class="order-address">Tuyen Quang </span>
                <span class="order-price">${order.price} VNĐ</span>
                </div>
            </button>
          </h2>
            <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
                <div class="item-infor-${i}">
                    <div class="row">
                        <div class="col-sm">Sản phẩm</div>
                        <div class="col-sm">Size</div>
                        <div class="col-sm">Đá</div>
                        <div class="col-sm">Đường</div>
                        <div class="col-sm">Số lượng</div>
                        <div class="col-sm">Thành tiền</div>
                    </div>  
                </div>
                <p class="button">
                <button onclick ="changestatus('${order._id}',"${order.status}")" class="d-block btn btn-warning mr-0 ml-auto" >Done</button>
                </p>
            </div>
          </div>
        </div>
      </div>
        `
        orderlists.appendChild(itemContainer)
        i++
    })
}
async function getpendingorderdata(e) {
    const data = await fetch('/store/view_pending_order', {
        method: 'GET',
    }).then((data) => data.json())

    console.log(data)
    var i = 0
    data.forEach((order) => {
        const itemInfo = document.createElement('div')
        const temp = document.querySelector(`.item-infor-${i}`)
        for (let j = 0; j < order.products.length; j++) {
            const item = document.createElement('div')
            item.innerHTML = `
                <div class="row">
                    <div class="col-sm">${order.products[j].info.name}</div>
                    <div class="col-sm">${order.products[j].size}</div>
                    <div class="col-sm">${order.products[j].ice_level}</div>
                    <div class="col-sm">${order.products[j].sugar_level}</div>
                    <div class="col-sm">${order.products[j].amount}</div>
                    <div class="col-sm">${
                        order.products[j].info.price * order.products[j].amount
                    }VNĐ</div>
                </div>    
            `
            itemInfo.appendChild(item)
        }
        temp.appendChild(itemInfo)
        i++
    })
}
