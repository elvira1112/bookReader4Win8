
    var reader; //GLOBAL File Reader object for demo purpose only
    var pageSize = 76;
    /**
     * Check for the various File API support.
     */
    function checkFileAPI() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            reader = new FileReader();
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
        if (filePath.files && filePath.files[0]) {
            reader.addEventListener("load", function (event) {
                var textFile = event.target.result;
                displayContents(event.name, textFile);
            });
            reader.readAsText(filePath.files[0]);
        }//end if html5 filelist support
        else if (ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
                output = file.ReadAll(); //text contents of file
                file.Close(); //close file "input stream"
                displayContents(output);
            } catch (e) {
                if (e.number == -2146827859) {
                    alert('Unable to access local files due to browser security settings. ' +
                        'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                        'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
                }
            }
        }
        else { //this is where you could fallback to Java Applet, Flash or similar
            return false;
        }
        return true;
    }

    /**
     * display content using a basic HTML replacement
     */
    function displayContents(title, txt) {
        var len = txt.length;
        var count = 0;
        var item = $('#mybook').children('.b-load');
        while (count < len) {
            var div = document.createElement('div');
            //        div.className = 'bgColor';
            div.innerHTML = createPage(txt.substr(count, pageSize));
            count += pageSize;
            item.prepend(div);
        }
        zh_init();
        var $bttn_next = $('#next_page_button');
        var $bttn_prev = $('#prev_page_button');
        $('#next_page_button').show();
        $('#prev_page_button').show();
        $('#mybook').show().booklet({
            name: null,                            // name of the booklet to display in the document title bar
            width: 800,                             // container width
            height: 500,                             // container height
            speed: 600,                             // speed of the transition between pages
            direction: 'LTR',                           // direction of the overall content organization, default LTR, left to right, can be RTL for languages which read right to left
            startingPage: Math.ceil(len / pageSize),                               // index of the first page to be displayed
            easing: 'easeInOutQuad',                 // easing method for complete transition
            easeIn: 'easeInQuad',                    // easing method for first half of transition
            easeOut: 'easeOutQuad',                   // easing method for second half of transition

            closed: true,                           // start with the book "closed", will add empty pages to beginning and end of book
            closedFrontTitle: null,                            // used with "closed", "menu" and "pageSelector", determines title of blank starting page
            closedFrontChapter: null,                            // used with "closed", "menu" and "chapterSelector", determines chapter name of blank starting page
            closedBackTitle: title,                            // used with "closed", "menu" and "pageSelector", determines chapter name of blank ending page
            closedBackChapter: null,                            // used with "closed", "menu" and "chapterSelector", determines chapter name of blank ending page
            covers: false,                           // used with  "closed", makes first and last pages into covers, without page numbers (if enabled)

            pagePadding: 10,                              // padding for each page wrapper
            pageNumbers: true,                            // display page numbers on each page

            hovers: false,                            // enables preview pageturn hover animation, shows a small preview of previous or next page on hover
            overlays: false,                            // enables navigation using a page sized overlay, when enabled links inside the content will not be clickable
            tabs: false,                           // adds tabs along the top of the pages
            tabWidth: 60,                              // set the width of the tabs
            tabHeight: 20,                              // set the height of the tabs
            arrows: false,                           // adds arrows overlayed over the book edges
            cursor: 'pointer',                       // cursor css setting for side bar areas

            hash: false,                           // enables navigation using a hash string, ex: #/page/1 for page 1, will affect all booklets with 'hash' enabled
            keyboard: true,                            // enables navigation with arrow keys (left: previous, right: next)
            next: $bttn_next,          			// selector for element to use as click trigger for next page
            prev: $bttn_prev,          			// selector for element to use as click trigger for previous page

            menu: null,                            // selector for element to use as the menu area, required for 'pageSelector'
            pageSelector: false,                           // enables navigation with a dropdown menu of pages, requires 'menu'
            chapterSelector: false,                           // enables navigation with a dropdown menu of chapters, determined by the "rel" attribute, requires 'menu'

            shadows: true,                            // display shadows on page animations
            shadowTopFwdWidth: 166,                             // shadow width for top forward anim
            shadowTopBackWidth: 166,                             // shadow width for top back anim
            shadowBtmWidth: 50,                              // shadow width for bottom shadow

            before: function () { },                    // callback invoked before each page turn animation
            after: function () { }                     // callback invoked after each page turn animation
        });
    }

    function createPage(content) {
        return '<div class="hie">' + content + '</div>';
    }