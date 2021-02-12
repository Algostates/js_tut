document.getElementById('get_result').onclick = e => {
    e.preventDefault();
    e.stopPropagation();
    // doBasic(); // in basic.js file
    doAdvanced(); // in advanced.js file
}