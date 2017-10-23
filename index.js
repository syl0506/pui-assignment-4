
/*-- This Javascript file enables change of mode which changes what is displayed
on the website. */
var focusedPanel;
var totalItems= 0;
var cartItems = [];
var itemName;
var currentColor = "Strawberry";
var currentSize = "Tiny"
var itemPrice = 0;
var totalPrice = 0;


function CurrentItem(itemName, color, size, price){
	this.itemName = itemName;
	this.color = color;
	this.size = size;
	this.price = price;
}


function addToCart(){
	totalItems++;

	document.getElementById("itemCount").innerHTML = totalItems;
	document.getElementById("itemCount").style.display = "block";

	cartItems.push(new CurrentItem(itemName, currentColor, currentSize, itemPrice));

}


function OnInit(){
	OnClickPannel("Details");
}

function HideAllPanel(){
	var panels = document.getElementsByClassName("panel");
	for(var i =0; i < panels.length; i++){
		panels[i].style.display = "none";
	}
}

function OnClickPannel(option){
	 window.scrollTo(0, 0);


	HideAllPanel();

	focusedPanel = option;

	if(option == "cat"){

		document.getElementById("forCats").style.display = "block";

	}else if(option == "dog"){
		document.getElementById("forDogs").style.display = "block";
	}
	else if(option == "Home"){
		document.getElementById("landing").style.display = "block";
	}
	else if(option == "Details"){
		document.getElementById("details").style.display = "block";
		itemName = "Body Harness";
		itemPrice = 12.99;


		/*-- change size and text of color button when selected */
		function changeColorSize (button, selectedButton, colorText) {
			for (var i = 0; i < selectedButton.length; i++){
				selectedButton[i].setAttribute('class', 'colorButton');
			}

    		button.setAttribute('class', 'colorButton_s');
    		colorText.innerHTML = button.id;
    		currentColor = colorText.innerHTML;


    		var productImg = document.getElementById("productImg");
    		productImg.src = "images/"+ button.id + ".png"

			}

		var colorButtons = document.getElementsByClassName('colorButton');
		var colorText = document.getElementById('colorText');
		var selectedButton = document.getElementsByClassName('colorButton_s');
		for (var i = 0; i < colorButtons.length; i++){
			colorButtons[i].onclick = function(){
				changeColorSize(this, selectedButton, colorText);
			}
		}
		document.getElementById("Strawberry").setAttribute("class", "colorButton_s")

		/*-- change color of size button when selected */
		function changeSizeButton(button, sizeButtons){
			for (var i = 0; i<sizeButtons.length; i++){
				sizeButtons[i].style.color = "#FF8D48";
				sizeButtons[i].style.backgroundColor = "white";
			}
			button.style.color = "white";
			button.style.backgroundColor = "#FF8D48";
			currentSize = button.innerHTML;

		}


		var sizeButtons = document.getElementsByClassName('sizeButton');
		sizeButtons[0].style.color = "white";
		sizeButtons[0].style.backgroundColor = "#FF8D48";
		for (var j = 0; j < sizeButtons.length; j++){
			sizeButtons[j].onclick = function(){
				changeSizeButton(this, sizeButtons);

			}
		}
	}
	else if (option =="location"){
		document.getElementById("location").style.display = "block";
	}

	else if (option == "myCart"){
		document.getElementById("myCart").style.display = "block";
		var emptyCart = document.getElementById("emptyCart");
		var cartTable = document.getElementById("cartTable");


		resetCart(cartTable);


	}
}

function deleteCart(cartTable){
	while(cartTable.rows.length>1){
		cartTable.deleteRow(1);
	}

}

function resetCart(cartTable){

	var continueBtn = document.getElementById("shoppingBtn");
	var checkoutBtn = document.getElementById("checkoutBtn");

	if (cartItems.length === 0){
		cartTable.style.display = "none";
		emptyCart.style.display = "block";
		continueBtn.style.display = "inline-block";
		checkoutBtn.style.display  = "none";


	}
	else{
		cartTable.style.display = "block";
		emptyCart.style.display = "none";
		continueBtn.style.display = "inline-block";
		checkoutBtn.style.display = "inline-block";
		deleteCart(cartTable);
		console.log("car")
		totalPrice = 0;
		for (var i = 0; i < cartItems.length; i++){
			createCart(i);
			totalPrice += cartItems[i].price;
		}
	addSubTotal(totalPrice);
	}


}

function createCart(index){
	var cartTable = document.getElementById("cartTable");
	var cartRow = cartTable.insertRow(index+1);
	var itemImage = document.createElement('img');
	var deleteButton = document.createElement('button');
	deleteButton.setAttribute('content', 'test content');
	deleteButton.setAttribute('class', 'btn');
	deleteButton.innerHTML = 'X';
	deleteButton.style.color = "#FF8D48";
	deleteButton.style.fontSize = "20px";
	deleteButton.style.border = "none";
	deleteButton.style.width = "100px";
	deleteButton.style.height = "100px";
	deleteButton.style.backgroundColor = "white";

	deleteButton.onclick = function(){deleteItems(index, cartTable)};

	itemImage.src = "images/"+ cartItems[index].color + ".png"
	itemImage.style.height = '150px';
	itemImage.style.width =  '150px';

	var itemI = cartRow.insertCell(0);
	var itemN = cartRow.insertCell(1);
	var itemS = cartRow.insertCell(2);
	var itemC = cartRow.insertCell(3);
	var itemQ = cartRow.insertCell(4);
	var itemP = cartRow.insertCell(5);
	var itemD = cartRow.insertCell(6);

	itemI.appendChild(itemImage);
	itemN.innerHTML = cartItems[index].itemName;
	itemS.innerHTML = cartItems[index].size;
	itemC.innerHTML = cartItems[index].color;
	itemP.innerHTML = "$" + itemPrice;
	itemD.appendChild(deleteButton);
	itemD.style.textAlign = "right";

}

function deleteItems(index, cartTable){
	cartItems.splice(index, 1);
	resetCart(cartTable);
	totalItems --;
	if (totalItems > 0){
		document.getElementById("itemCount").innerHTML = totalItems;
	}
	else {
		document.getElementById("itemCount").style.display = "none";
	}

}

function addSubTotal(totalPrice){
	var cartTable = document.getElementById("cartTable");
	var totalRow = cartTable.insertRow(-1);
	var subTotal = totalRow.insertCell(0);
	var totalAmount = totalRow.insertCell(-1);
	subTotal.colSpan = 6;
	subTotal.style.textAlign = "right";
	subTotal.innerHTML = "Total Price";
	totalAmount.innerHTML = "$" + totalPrice;
	totalAmount.style.textAlign = "right";
	subTotal.style.fontWeight = "900";
	subTotal.style.fontSize = "32px";
	totalAmount.style.fontWeight = "900";
	totalAmount.style.fontSize = "32px";


}




