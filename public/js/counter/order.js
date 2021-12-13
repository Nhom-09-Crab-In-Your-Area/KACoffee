function All(){
    var all = document.getElementsByClassName("accordion-item");
    for(var i=0; i< all.length; i++){
        all[i].style.display = 'block';
    }
}

function Filter_1(){
    var all = document.getElementsByClassName("accordion-item");
    var to_pay = document.getElementsByClassName("to-pay");
    for(var i=0; i< all.length; i++){
        all[i].style.display = 'none';
    }
    for(var i=0; i< to_pay.length; i++){
        to_pay[i].style.display = 'block';
    }
}

function Filter_2(){
    var all = document.getElementsByClassName("accordion-item");
    var to_receive = document.getElementsByClassName("to-receive");
    for(var i=0; i< all.length; i++){
        all[i].style.display = 'none';
    }
    for(var i=0; i< to_receive.length; i++){
        to_receive[i].style.display = 'block';
    }
}

function Filter_3(){
    var all = document.getElementsByClassName("accordion-item");
    var completed = document.getElementsByClassName("completed");
    for(var i=0; i< all.length; i++){
        all[i].style.display = 'none';
    }
    for(var i=0; i< completed.length; i++){
        completed[i].style.display = 'block';
    }
}