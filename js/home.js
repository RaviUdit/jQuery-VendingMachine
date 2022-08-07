$(document).ready(function(){
    //alert("Ready to go!");
    loadProducts();
    hideMakeChangeButton();
});

function loadProducts(){

    var itemNumber = 1;
    var productRows = $('#productRows');

    $.ajax({

        type: 'GET',
        url: 'http://vending.us-east-1.elasticbeanstalk.com/items',
        success: function(productArray){
            $.each(productArray, function(index, product){
                var id = product.id;
                var name = product.name;
                var price = product.price;
                var quantity = product.quantity;

                var row = '<td><button type="button" class="btn btn-default">' + itemNumber + '<br>' +
                                                                                 name + '<br> $' + 
                                                                                 price.toFixed(2) + '<br>' +
                                                                                 quantity + '</button>';
                
                productRows.append(row);
                itemNumber++;
            })

        }
    })
}

function hideMakeChangeButton(){    
    $('#makeChangeButton').hide();
}


// Adding Money to the Vending Machine
function addDollar(){
    var money = Number($('#inputMoney').val());
    var newMoney = money + 1.00;
    $('#inputMoney').val(newMoney.toFixed(2));
}

function addQuarter(){
    var money = Number($('#inputMoney').val());
    var newMoney = money + 0.25;
    $('#inputMoney').val(newMoney.toFixed(2));
}

function addDime(){
    var money = Number($('#inputMoney').val());
    var newMoney = money + 0.10;
    $('#inputMoney').val(newMoney.toFixed(2));
}

function addNickel(){
    var money = +$('#inputMoney').val();
    var newMoney = money + 0.05;
    $('#inputMoney').val(newMoney.toFixed(2));
}