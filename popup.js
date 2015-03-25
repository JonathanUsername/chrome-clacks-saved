var tabId,
    clacks;

clear_btn = document.getElementById("clearbtn");
list_btn = document.getElementById("listbtn");
list_elem = document.getElementById("list");
count_elem = document.getElementById("count");

document.getElementById("listbtn").addEventListener("click", function(){
    chrome.runtime.getBackgroundPage(
        function(bg) {
            list_elem.innerHTML = ""
            list = bg.getList();
            counter = 0
            for (var i in list){
                counter++
                list_elem.innerHTML += "<li>" + list[i] + "</li>"
            }
            count_elem.innerHTML = "Clacks towers visited: " + counter
            list_btn.style.display = "none"
            clear_btn.style.display = "block"
            count_elem.style.display = "block"
        }
    );
});

document.getElementById("clearbtn").addEventListener("click", function(){
    chrome.runtime.getBackgroundPage(
        function(bg) {
            bg.clearList();
            list_elem.style.display = "none"
            clear_btn.style.display = "none"
        }
    );
})

// Get the currently active tab in the focused window.
chrome.tabs.query(
    {active: true, lastFocusedWindow: true},
    function(tabs) {
        // get the tab ID of that current tab
        tabId = tabs[0].id;
        // get clacks headers from background script
        chrome.runtime.getBackgroundPage(
            function(bg) {
                clacks = bg.getClacks(tabId);
                // put text in popup.html
                document.getElementById("text").textContent = clacks;
            }
        );
    }
);
