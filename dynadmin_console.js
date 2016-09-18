initExtentionConsole();
fillConsole();

function fillConsole(){
	addChangePropertyValueButton("loggingDebug", "loggingDebug");
	addChangePropertyValueButton("loggingError", "loggingError");
	addChangePropertyValueButton("loggingInfo", "loggingInfo");
	addChangePropertyValueButton("loggingTrace", "loggingTrace");
	addChangePropertyValueButton("loggingWarning", "loggingWarning");
	addCacheInvalidationButton('atg.adapter.gsa.GSARepository', 'invalidateCaches');
	addCacheInvalidationButton('atg.service.cache.Cache', 'flush');
	addCacheInvalidationButton('atg.droplet.Cache', 'flushCache');
	$(EXT_CONSOLE_DIV_ID).append('<b id="' + EXT_CONSOLE_STATUS_DIV + '"></b>');
}

function initExtentionConsole(){
	var hrTag = document.getElementsByTagName("hr")[0];
	var root = hrTag.parentNode;
	var divTag = document.createElement("div");
	divTag.setAttribute("id", EXT_CONSOLE_DIV);
	divTag.setAttribute("style", "position:fixed;background-color:#ffeecc;top:80px;left:69%;border: 2px solid #73AD21;");
	root.insertBefore(divTag, hrTag);
}
