function All() {
    var all = document.getElementsByClassName('accordion-item')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'block'
    }
}

function Filter_1() {
    var all = document.getElementsByClassName('accordion-item')
    var to_pay = document.getElementsByClassName('to-pay')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < to_pay.length; i++) {
        to_pay[i].style.display = 'block'
    }
}

function Filter_2() {
    var all = document.getElementsByClassName('accordion-item')
    var to_receive = document.getElementsByClassName('to-receive')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < to_receive.length; i++) {
        to_receive[i].style.display = 'block'
    }
}

function Filter_3() {
    var all = document.getElementsByClassName('accordion-item')
    var completed = document.getElementsByClassName('completed')
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none'
    }
    for (var i = 0; i < completed.length; i++) {
        completed[i].style.display = 'block'
    }
}
var myVar = setTimeout(myTimer, 1000)
var myVar = setTimeout(myTimer1, 1000)
async function myTimer(e) {
    const data = await fetch('/store/view_order', {
        method: 'GET',
    }).then((data) => data.json())

    console.log(data)
    var i = 0
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
        <div class="accordion-item to-pay"> <!-- sua lai khi them database -->
          <h2 class="accordion-header" id="flush-heading${i}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapseOne">
                <div class="order-list-data text-center">
                    <span class="order-name">Phan Đức Anh</span>
                    <span class="order-status">Chưa hoàn thành</span>
                    <span class="order-phone">0399272702</span>
                    <span class="order-address">Tuyen Quang </span>
                    <span class="order-price">100.000đ</span>
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
                <input type="button" class="d-block mr-0 ml-auto" value="Done">
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
async function myTimer1(e) {
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
