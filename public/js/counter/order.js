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

async function myTimer(e) {
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
        <div class="accordion-item to-pay"> <!-- sua lai khi them database -->
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                <div class="order-list-data text-center">
                    <span class="order-name">Phan Đức Anh</span>
                    <span class="order-status">Chưa hoàn thành</span>
                    <span class="order-phone">0399272702</span>
                    <span class="order-address">Tuyen Quang </span>
                    <span class="order-price">100.000đ</span>
                </div>
            </button>
          </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
                <div class="item-infor">
                    <div class="row">
                        <div class="col-sm">CÀ PHÊ SỮA ĐÁ</div>
                        <div class="col-sm">M</div>
                        <div class="col-sm">100%</div>
                        <div class="col-sm">100%</div>
                        <div class="col-sm">2</div>
                        <div class="col-sm">68.000đ</div>
                    </div>    
                </div>
               <div class="col-md-12 bg-light text-right">
                    <button type="button" class="btn btn-warning">Submit</button>
                </div>
            </div>
          </div>
        </div>
      </div>
        
        `
    })
}
