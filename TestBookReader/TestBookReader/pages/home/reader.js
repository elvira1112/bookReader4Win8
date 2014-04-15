"use strict"
var reader; //GLOBAL File Reader object for demo purpose only
var el;

/**
 * Check for the various File API support.
 */
function checkFileAPI() {
    
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        el = document.getElementById('main');
        return true;
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

/**
 * read text input
 */
function readText(filePath) {
    var output = ""; //placeholder for text output
    if(filePath.files && filePath.files[0]) {
        //reader.onload = function (e) {
        //    output = e.target.result;
        //    displayContents(output);
        //};//end onload()
        reader.addEventListener("load", function (event) {
            var textFile = event.target.result;
            displayContents(textFile);
        });
        reader.readAsText(filePath.files[0]);
    }//end if html5 filelist support
    else { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }
    return true;
}

/**
 * display content using a basic HTML replacement
 */
function displayContents(txt) {
    el.innerHTML = txt; //display output in DOM
    var p = new Pager(el);
    p.init();
}
