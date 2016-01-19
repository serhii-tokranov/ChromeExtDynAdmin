//**************************
//	add some functionality	
//**************************

//create and add buttons for common atg xml tags
addButton(createButton("query items", addQueryItems));
addButton(createButton("add item", addItem));
addButton(createButton("remove item", removeItem));
addButton(createButton("print item", printItem));

//get textarea
function getTextarea(){
	var textarea = document.getElementsByName("xmltext")[0];
	return textarea;
}

/**
	This function create button and add it to element.
*/
function createButton(name, action){
	var button = document.createElement("input");
	button.type = "button";
	button.value = name;
	button.onclick = action;
	button.setAttribute('id', 'custom_' + name);
	return button;
}

function addButton(button){
	var root = getTextarea().parentNode;
	var div = root.getElementsByTagName("div");
	if(div.length>0){
		div[0].appendChild(button);
	}else{
		div = document.createElement("div");
		root.insertBefore(div, getTextarea());
		div.appendChild(button);
	}
}

function addQueryItems(){
	//console.log("addQueryItems");
	var oldData = getTextarea().value;
	getTextarea().value = oldData+"<query-items item-descriptor=\"\"></query-items>";
	setCursor(getTextarea(), oldData.length+30, oldData.length+30);
}

function addItem(){
	//console.log("addItem");
	var oldData = getTextarea().value;
	getTextarea().value = oldData+"<add-item item-descriptor=\"\"></add-item>";	
	setCursor(getTextarea(), oldData.length+27, oldData.length+27);
}
function removeItem(){
	//console.log("removeItem");
	var oldData = getTextarea().value;
	getTextarea().value = oldData+"<remove-item item-descriptor=\"\" id=\"\" />";
	setCursor(getTextarea(), oldData.length+30, oldData.length+30);	
}

function printItem(){
	//console.log("printItem");
	var oldData = getTextarea().value;
	getTextarea().value = oldData+"<print-item item-descriptor=\"\" id=\"\" />";
	setCursor(getTextarea(), oldData.length+29, oldData.length+29);	
}

function setCursor(el, startPos, EndPos){
	el.focus();
	el.setSelectionRange(startPos,EndPos);
}
