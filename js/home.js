let testProduct = "test";
let productId = 0;

$(document).ready(function(){
    //alert("Ready to go!");
    //hideMakeChangeButton();
    loadProducts();
    initMoney();
    
});

function loadProducts(){

    //clearing previously loaded products.
    clearProducts();

    var itemNumber = 1;
    var productRows = $('#prodRows');

    var row="";
    var rowCounter = 1;

    $.ajax({

        type: 'GET',
        url: 'http://vending.us-east-1.elasticbeanstalk.com/items',
        success: function(productArray){
            $.each(productArray, function(index, product){
                var id = product.id;
                var name = product.name;
                var price = product.price;
                var quantity = product.quantity;

                // if(rowCounter == 1){
                //     row += '<tr>';
                // }
                

                row += '<div class="col-sm-4"><button class="button button1 w-100" onclick="setProduct(' + id + ')">' + itemNumber +'</button>' + 
                       '<button type="button" class="btn btn-default button2 w-100" onclick="setProduct(' + id + ')"><br>' +
                                                                                                                 name + '<br> $' + 
                                                                                                                 price.toFixed(2) + '<br><br> Quantity Left: ' +
                                                                                                                 quantity + '</button></div>';

                
                

                // if(rowCounter == 3){
                //     row += '</tr>'
                // }
                
                productRows.append(row);
                row = "";
                itemNumber++;
                rowCounter++;

                if(rowCounter > 3){
                    rowCounter = 1;
                }
            })

        }
    })
}

// Clearing the Products. 
function clearProducts(){
    $('#prodRows').empty();
}

// Hiding and Showing the Make Change Button.
function hideMakeChangeButton(){    
    $('#makeChangeButton').hide();
}
function showMakeChangeButton(){    
    $('#makeChangeButton').show();
}

// Setting Total $ In to 0.00
function initMoney(){
    $('#inputMoney').val('0.00');
}

// Adding Money to the Vending Machine
function addDollar(){
    var money = Number($('#inputMoney').val());
    var newMoney = money + 1.00;
    $('#inputMoney').val(newMoney.toFixed(2));

    showMakeChangeButton();
}

function addQuarter(){
    var money = Number($('#inputMoney').val());
    var newMoney = money + 0.25;
    $('#inputMoney').val(newMoney.toFixed(2));

    showMakeChangeButton();
}

function addDime(){
    var money = Number($('#inputMoney').val());
    var newMoney = money + 0.10;
    $('#inputMoney').val(newMoney.toFixed(2));

    showMakeChangeButton();
}

function addNickel(){
    var money = +$('#inputMoney').val();
    var newMoney = money + 0.05;
    $('#inputMoney').val(newMoney.toFixed(2));

    showMakeChangeButton();
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
                changeOutput += quarters + " Quarters ";
            }
            if(dimes > 0){
                changeOutput += dimes + " Dimes ";
            }
            if(nickels > 0){
                changeOutput += nickels +  " Nickels ";
            }
            if(pennies > 0){
                changeOutput += pennies + " Pennies ";
            }

            $('#messageReturn').val("Thank You!!!");
            $('#changeReturn').val(changeOutput);

            //Reseting the Money Input.
            initMoney();

            //Resetting Products.
            clearProducts();
            loadProducts();
            $('#itemDisplay').val('');

            hideMakeChangeButton();
        },
        error:function(response, responseStatus){
            var message = response.responseJSON.message;
            $('#messageReturn').val(message);

            hideMakeChangeButton();
            $('#itemDisplay').val('');
        }
    })

    //Resetting Products. 
    loadProducts();
}

// Making change from the money inputted into #inputMoney
function makeChange(){

    var changeOutput="";
    var money = Number($('#inputMoney').val());

    var quarterValue = Math.floor(money/0.25);
    money = money - (quarterValue * 0.25)
    money = money.toFixed(2);

    var dimeValue = Math.floor(money/0.10);
    money = money - (dimeValue * 0.10)
    money = money.toFixed(2);

    var nickelValue = Math.floor(money/0.05);
    money = money - (nickelValue * 0.05)
    money = money.toFixed(2);

    var pennyValue = Math.floor(money/0.01);
    // money = money - (pennyValue * 0.01)
    // money = money.toFixed(2);

    if(quarterValue > 0){
        changeOutput +=  quarterValue + " Quarters ";
    }
    if(dimeValue > 0){
        changeOutput +=  dimeValue + " Dimes ";
    }
    if(nickelValue > 0){
        changeOutput +=  nickelValue + " Nickels ";
    }
    if(pennyValue > 0){
        changeOutput +=  pennyValue + " Pennies";
    }
     
    $('#changeReturn').val(changeOutput);

    initMoney();
}