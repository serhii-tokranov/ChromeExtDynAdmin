// Printing pretty pipeline structure
var PRETTY_DEFINITION_CONTAINER = "PRETTY_DEFINITION_CONTAINER";
var PRETTY_DEFINITION_CONTAINER_ID = "#" + PRETTY_DEFINITION_CONTAINER;

createContainer();

var definitionXMLDocument = getDefinitionXML();
console.log(definitionXMLDocument);
addToDefinitionContainer($(definitionXMLDocument).text());

function getDefinitionXML(){
    return $.parseXML($('pre').first().text());
}

function createContainer(){
    $('<div id="' + PRETTY_DEFINITION_CONTAINER + '"></div>').insertAfter('hr');
}

function addToDefinitionContainer(value){
    $(PRETTY_DEFINITION_CONTAINER_ID).append(JSON.stringify(value));
}

$(PRETTY_DEFINITION_CONTAINER_ID).html('');

var chainList = buildDataArrayFromXML(definitionXMLDocument, {});
//addToDefinitionContainer(chainList);

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

// Building presentation

//var updateOrderChain = chainList['validatePaymentGroupPreConfirmation'];
//createTableForChain(updateOrderChain, updateOrderChain.name);
/*$.each(chainList, function (ind, curChain){
    createTableForChain(curChain, curChain.name);
});*/

/*function createTableForChain(chain, chainName){
    // Creating table for a chain
    $(PRETTY_DEFINITION_CONTAINER_ID).append('<table id="chain-' + chainName + '" style="font-size: 12px;"><tr></tr></table>');
    var chainTableSelector = PRETTY_DEFINITION_CONTAINER_ID + ' #chain-' + chainName + ' tr';
    $(chainTableSelector).append('<td style="border: 1px solid black; text-align : center;">' + chainName + '</td>');
    addArrowColumn(chainTableSelector, '');

    var stop = false;
    var i = 0;
    var curLinkName = chain.headlink;
    var curLink = chain.links[chain.headlink];

    while(!stop || i < 10){
        i++;
        console.log(curLink);
        $(chainTableSelector).append('<td style="border: 1px solid black; text-align : center;">' + curLinkName + '<br>' + curLink.processor + '</td>');
        if (curLink.transitions != null && curLink.transitions.length > 0){
            $.each(curLink.transitions, function (index, element){
                addArrowColumn(chainTableSelector, element.returnValue);
                curLinkName = element.linkName;
                curLink = chain.links[element.linkName];
            });
        } else {
            stop = true;
        }

    }
}

function addArrowColumn(chainTableSelector, returnValue){
    $(chainTableSelector).append('<td>' + returnValue + '></td>');
}*/

console.log(chainList);
//var updateOrderChain = chainList['updateOrder'];
//var updateOrderChain = chainList['validatePaymentGroupPreConfirmation'];
//createTableForChainNew(updateOrderChain, updateOrderChain.name);
$.each(chainList, function (ind, curChain){
    createTableForChainNew(curChain, curChain.name);
});

function createTableForChainNew(chain, chainName){
    // Creating table for a chain
    $(PRETTY_DEFINITION_CONTAINER_ID).append('<table id="chain-' + chainName + '" style="font-size: 12px;"><tr></tr></table>');
    $(getChainTableSelector(chainName)).append('<td style="border: 1px solid black; text-align : center;">' + chainName + '</td>');
    //addArrowColumn(getChainTableSelector(chainName), '');
    var curLink = chain.links[chain.headlink];
    var curLinkName = chain.headlink;
    processPipeLink(chain, curLink, curLinkName, '', 2, 0, false);
}

function processPipeLink(chain, link, linkName, transitionVal, elemNum, rowNumber, appendRow){
    if(appendRow){
        appendRows(elemNum, rowNumber, chain.name);
    }
    console.log(link);
    console.log('rowNumber=' + rowNumber);
    $(getChainTableSelector(chain.name)).eq(rowNumber).append('<td>' + transitionVal + '></td>');
    console.log('tr=' + $(getChainTableSelector(chain.name)).eq(rowNumber));
    $(getChainTableSelector(chain.name)).eq(rowNumber).append('<td style="border: 1px solid black; text-align : center;">' + linkName + '<br>' + link.processor + '</td>');
    if (link.transitions != null && link.transitions.length > 0){
        $.each(link.transitions, function (index, element){
            if (index == 0){
                console.log('First transition');
                processPipeLink(chain, chain.links[element.linkName], element.linkName, element.returnValue, elemNum + 1, rowNumber, false);
            } else {
                console.log('Appending transition');
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

