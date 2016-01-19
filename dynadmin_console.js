// Console object name
var EXT_CONSOLE_DIV = "DynAdminExtentionConsole";
var EXT_CONSOLE_DIV_ID = "#" + EXT_CONSOLE_DIV;

initExtentionConsole();
addChangePropertyValueButton("loggingDebug", "loggingDebug");
addChangePropertyValueButton("loggingError", "loggingError");
addChangePropertyValueButton("loggingInfo", "loggingInfo");
addChangePropertyValueButton("loggingTrace", "loggingTrace");
addChangePropertyValueButton("loggingWarning", "loggingWarning");

function initExtentionConsole(){
	var hrTag = document.getElementsByTagName("hr")[0];
	var root = hrTag.parentNode;
	var divTag = document.createElement("div");
	divTag.setAttribute("id", EXT_CONSOLE_DIV);
	divTag.setAttribute("style", "position:fixed;background-color:#ffeecc;top:80px;left:69%;border: 2px solid #73AD21;");
	root.insertBefore(divTag, hrTag);
}

//TODO for now it forks only for boolean properties
function addChangePropertyValueButton(buttonName, propertyName){
	var buttonStyle = 'margin:2px;padding:2px;';
	var button = createButton(buttonName, function(){
			var propertyObject = $('a:contains("' + propertyName + '")').closest('td').next().find('span');
			var currentValue = $.parseJSON(propertyObject.text());
			$.ajax({
				type: 'POST',
				url: window.location.href,
				data: {'propertyName':propertyName,'newValue':!currentValue,'change':'Change Value'},
				success: function (data) {
					propertyObject.text(!currentValue);
					if (!currentValue === true){
						button.setAttribute('style', buttonStyle);	
					} else {
						button.setAttribute('style', buttonStyle + 'border: 2px solid red;');
					}
                }
			})
		}
	);
	if (!getBooleanPropertyValue(propertyName)){
		button.setAttribute('style', buttonStyle + 'border: 2px solid red;');
	}
	$(EXT_CONSOLE_DIV_ID).append(button);
}

function getBooleanPropertyValue(propertyName){
	return $.parseJSON(getPropertyValue(propertyName));
}

function getPropertyValue(propertyName){
	return $('a:contains("' + propertyName + '")').closest('td').next().find('span').text();
}