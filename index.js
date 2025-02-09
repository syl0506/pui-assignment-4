
/*-- This Javascript file enables change of mode which changes what is displayed
on the website. */
var focusedPanel;
var totalItems= 0;
var wishItemsNum = 0;
var cartItems = [];
var wishItems =[];
var itemName = "Body Harness";
var currentColor = "Strawberry";
var currentSize = "Tiny"
var itemPrice = 12.99;
var totalPrice = 0;
var quantity = 1;


/* Loading Landing Page and Modal*/
function OnInit(){
	OnClickPannel("Home");
	loadModal();


}

/* Hide all display*/
function HideAllPanel(){
	var panels = document.getElementsByClassName("panel");
	for(var i =0; i < panels.length; i++){
		panels[i].style.display = "none";
	}
}

/* Display certain div depending on what the user clicks on the nav*/
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
		currentColor = "Strawberry";
		currentSize = "Tiny"
		itemPrice = 12.99;
		quantity = 1;
		document.getElementById("quantityNum").innerHTML = quantity;
		document.getElementById("productImg").src = "images/"+ currentColor+ ".png"





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
		for (var i = 0; i < selectedButton.length; i++){
				selectedButton[i].setAttribute('class', 'colorButton');
			}
		for (var i = 0; i < colorButtons.length; i++){
			colorButtons[i].onclick = function(){
				changeColorSize(this, selectedButton, colorText);
			}
		}
		/*-- set first button selected as default */
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

		/*-- reset all size buttons */
		for (var i = 0; i<sizeButtons.length; i++){
				sizeButtons[i].style.color = "#FF8D48";
				sizeButtons[i].style.backgroundColor = "white";
			}
		/*-- set first button selected as default */
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
/* If there is no Item in the cart display empty screen, if not
display cart table */
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
		/* Delete all cart table */
		deleteCart(cartTable);
		totalPrice = 0;
		/* Create items in the table based on what is in the cart list */
		for (var i = 0; i < cartItems.length; i++){
			createCart(i);
			totalPrice += cartItems[i].price * cartItems[i].quantity ;
		}
	addSubTotal(totalPrice);
	}
}

/* Delete all cart except title row */
function deleteCart(cartTable){
	while(cartTable.rows.length>1){
		cartTable.deleteRow(1);
	}
}
/* Create cart table based on what is in the cart list */
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

	/* Add delete button for each item */

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
	itemQ.innerHTML = cartItems[index].quantity;
	itemD.appendChild(deleteButton);
	itemD.style.textAlign = "right";

}

/* Delete Item from list if user deletes it in the cart. */
function deleteItems(index, cartTable){
	cartItems.splice(index, 1);

	/* Reset to recreate new table based on modified list of items */
	resetCart(cartTable);
	totalItems --;
	if (totalItems > 0){
		document.getElementById("itemCount").innerHTML = totalItems;
	}
	else {
		document.getElementById("itemCount").style.display = "none";
	}

}

/* Add subTotal row to the cart table */
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
/* Create Wishlist Modal */
function loadModal(){

	var modal = document.getElementById('wishListModal');
	var wishTable = document.getElementById('wishTable');

	// Get the button that opens the modal
	var wishBtn1 = document.getElementById("wishIcon");
	var wishBtn2 = document.getElementById("wishListCount");


	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal
	wishBtn1.onclick = function() {
		modal.style.display = "block";
		resetWishList(wishTable);


	};

	wishBtn2.onclick = function() {
		modal.style.display = "block";
		resetWishList(wishTable);


	};

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	};
}

/* Delete the wish list table and update based on new wish list */
function resetWishList(wishTable){

	deleteWishCart(wishTable);

    for(var i = 0; i<wishItems.length; i++){
    	createWishList(i);
	}
}

/* Delete the wish list table */
function deleteWishCart(wishTable){
	while(wishTable.rows.length>1){
		wishTable.deleteRow(1);
	}
}

/* Create wish table based on all the items in the wish list */
function createWishList(index){
	var wishTable = document.getElementById("wishTable");
	var wishRow = wishTable.insertRow(index+1);
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

	deleteButton.onclick = function(){deleteWishItems(index, wishTable)};

	itemImage.src = "images/"+ wishItems[index].color + ".png"
	itemImage.style.height = '150px';
	itemImage.style.width =  '150px';

	var itemI = wishRow.insertCell(0);
	var itemN = wishRow.insertCell(1);
	var itemS = wishRow.insertCell(2);
	var itemC = wishRow.insertCell(3);
	var itemP = wishRow.insertCell(4);
	var itemD = wishRow.insertCell(5);

	itemI.appendChild(itemImage);
	itemN.innerHTML = wishItems[index].itemName;
	itemS.innerHTML = wishItems[index].size;
	itemC.innerHTML = wishItems[index].color;
	itemP.innerHTML = "$" + itemPrice;
	itemD.appendChild(deleteButton);
	itemD.style.textAlign = "right";

}

//Delete wishList items from list if user clicks delete in the wishlist
//If there is no items in the wishlist, do not display number

function deleteWishItems(index, wishTable){
	wishItems.splice(index, 1);
	resetWishList(wishTable);
	wishItemsNum --;
	if (wishItemsNum > 0){
		document.getElementById("wishListCount").innerHTML = wishItemsNum;
	}
	//If there is no items in the wishlist, do not display number
	else {
		document.getElementById("wishListCount").style.display = "none";
	}

}

//Change Quantity if user clicks increase/decrese. Number set between 1 - 10

function changeQuantity(element){
	if (element.id === "decrease" && document.getElementById("quantityNum").innerHTML>1){
		quantity--;
	}
	if (element.id === "increase" && document.getElementById("quantityNum").innerHTML<10){
		quantity++;
	}

	document.getElementById("quantityNum").innerHTML = quantity;
}

//Moves the carousel upon clicking on the left/right button
function moveCarousel(){
	var carousel1 = document.getElementById("carousel1");
	var carousel2 = document.getElementById("carousel2");
	if (carousel1.style.display === "none"){
		carousel1.style.display = "block";
		carousel2.style.display = "none";
	}
	else {
		carousel1.style.display = "none";
		carousel2.style.display = "block";

	}
}


//Creates a current items that is added to cart
function CurrentItem(itemName, color, size, price, quantity){
	this.itemName = itemName;
	this.color = color;
	this.size = size;
	this.price = price;
	this.quantity = quantity;
}

//Push new Current Items to cartlist
function addToCart(){
	totalItems++;

	document.getElementById("itemCount").innerHTML = totalItems;
	document.getElementById("itemCount").style.display = "block";

	cartItems.push(new CurrentItem(itemName, currentColor, currentSize, itemPrice, quantity));

}


//Push new Current Items to wishList
function addToWishList(){
	wishItemsNum++;

	document.getElementById("wishListCount").innerHTML = wishItemsNum;
	document.getElementById("wishListCount").style.display = "block";

	wishItems.push(new CurrentItem(itemName, currentColor, currentSize, itemPrice));
}







