function checkConsoleExists(){
    return $(EXT_CONSOLE_DIV_ID) != null;
}

if (checkConsoleExists()){
    console.log(getPropertyObject("definitionFile").attr('href'));
    addPropertyRedirectButton('Go to definition', 'definitionFile');
}