let testProduct = "test";
let productId = 0;

$(document).ready(function(){
    //alert("Ready to go!");
    //hideMakeChangeButton();
    loadProducts();
    
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

                var row = '<td><button type="button" class="btn btn-default" onclick="setProduct(' + id + ')">' + itemNumber + '<br>' +
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

// Setting the item to be vended
function setProduct(id){

    productId = id;
    $('#itemDisplay').val(id);
    //$('#messageReturn').val(id);
}

// Vending Product
function vendProduct(){

    var prodId = $('#itemDisplay').val();
    var money = $('#inputMoney').val();

    $.ajax({
        type: 'POST',
        url: 'http://vending.us-east-1.elasticbeanstalk.com/money/' + money + '/item/' + prodId,
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        'dataType':'json',
        success:function(change, changeData){
            var changeOutput="";

            var quarters = change.quarters;
            var dimes = change.dimes;
            var nickels = change.nickels;
            var pennies = change.pennies;

            if(quarters > 0){
                changeOutput += "Quarters: " + quarters;
            }
            if(dimes > 0){
                changeOutput += "Dimes: " + dimes;
            }
            if(nickels > 0){
                changeOutput += "Nickels: " + nickels;
            }
            if(pennies > 0){
                changeOutput += "Pennies: " + pennies;
            }

            $('#messageReturn').val("Thank You!!!");
            $('#changeReturn').val(changeOutput);
        },
        error:function(response, responseStatus){
            var message = response.responseJSON.message;
            $('#messageReturn').val(message);
        }
    })
}