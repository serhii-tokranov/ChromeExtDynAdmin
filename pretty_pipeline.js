// Printing pretty pipeline structure

// --------------------- Statics ----------------------------

var PRETTY_DEFINITION_CONTAINER = "PRETTY_DEFINITION_CONTAINER";
var PRETTY_DEFINITION_CONTAINER_ID = "#" + PRETTY_DEFINITION_CONTAINER;

// -------------------- Processing code ---------------------

createContainer();

var definitionXMLDocument = getDefinitionXML();
console.log(definitionXMLDocument);
addToDefinitionContainer($(definitionXMLDocument).text());
$(PRETTY_DEFINITION_CONTAINER_ID).html('');

var chainList = buildDataArrayFromXML(definitionXMLDocument, {});

$.each(chainList, function (ind, curChain){
    createTableForChainNew(curChain, curChain.name);
});

// --------------------- Functions ---------------------------

function getDefinitionXML(){
    return $.parseXML($('pre').first().text());
}

function createContainer(){
    $('<div id="' + PRETTY_DEFINITION_CONTAINER + '"></div>').insertAfter('hr');
}

function addToDefinitionContainer(value){
    $(PRETTY_DEFINITION_CONTAINER_ID).append(JSON.stringify(value));
}

function buildDataArrayFromXML(definitionXMLDocument, chainList){
    // searching for all pipeline chains
    $(definitionXMLDocument).find('pipelinechain').each(function (index, element ){
        var name = $(element).attr('name');
        chainList[name] = buildChainObject(element);
    })
    return chainList;
}

function buildChainObject(chain){
    var chainObj = {};
    var name = $(chain).attr('name');
    var headlink = $(chain).attr('headlink');
    var links = {};
    $(chain).find('pipelinelink').each(function (index, element ){
        var curLink = {};
        var linkName = $(element).attr('name');;
        curLink['processor'] = $(element).find('processor').attr('jndi');
        var transitions = [];
        $(element).find('transition').each(function (ind, trans){
            var curTransition = {};
            var returnValue = $(trans).attr('returnvalue');
            var linkName = $(trans).attr('link');
            curTransition.returnValue = returnValue;
            curTransition.linkName = linkName;
            transitions.push(curTransition);
        });
        curLink['transitions'] = transitions;
        links[linkName] = curLink;
    });
    chainObj.name = name;
    chainObj.headlink = headlink;
    chainObj.links = links;
    return chainObj;
}

function linkPathToComponent(componentPath){
    return document.location.origin + '/dyn/admin/nucleus/' + componentPath;
}

function htmlLinkToComponent(componentPath){
    var plainLink = linkPathToComponent(componentPath);
    return '<a href="' + plainLink + '">' + componentPath + '</a>';
}

function createTableForChainNew(chain, chainName){
    // Creating table for a chain
    $(PRETTY_DEFINITION_CONTAINER_ID).append('<table id="chain-' + chainName + '" style="font-size: 12px;"><tr></tr></table>');
    $(getChainTableSelector(chainName)).append('<td style="border: 1px solid black; text-align : center;">' + chainName + '</td>');
    var curLink = chain.links[chain.headlink];
    var curLinkName = chain.headlink;
    processPipeLink(chain, curLink, curLinkName, '', 2, 0, false);
}

function processPipeLink(chain, link, linkName, transitionVal, elemNum, rowNumber, appendRow){
    if(appendRow){
        appendRows(elemNum, rowNumber, chain.name);
    }
    $(getChainTableSelector(chain.name)).eq(rowNumber).append('<td>' + transitionVal + '></td>');
    $(getChainTableSelector(chain.name)).eq(rowNumber).append('<td style="border: 1px solid black; text-align : center;">' + linkName + '<br>' + htmlLinkToComponent(link.processor) + '</td>');
    if (link.transitions != null && link.transitions.length > 0){
        $.each(link.transitions, function (index, element){
            if (index == 0){
                processPipeLink(chain, chain.links[element.linkName], element.linkName, element.returnValue, elemNum + 1, rowNumber, false);
            } else {
                processPipeLink(chain, chain.links[element.linkName], element.linkName, element.returnValue, elemNum + 1, ++rowNumber, true);
            }
        });
    }
}

function appendRows(elemNum, rowNumber, chainName){
    var chainTableSelector = PRETTY_DEFINITION_CONTAINER_ID + ' #chain-' + chainName;
    $(chainTableSelector).append('<tr></tr>');
    for (var i = 0; i < (elemNum + elemNum - 3); i++){
        $(chainTableSelector + ' tr').eq(rowNumber).append('<td></td>');
    }
}

function getChainTableSelector(chainName){
    return PRETTY_DEFINITION_CONTAINER_ID + ' #chain-' + chainName + ' tr';
}

