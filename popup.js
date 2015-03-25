var tabId,
    clacks;

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
                list = bg.getList();
                // put text in popup.html
                document.getElementById("text").textContent = clacks;
                list_elem = document.getElementById("list")
                list_elem.innerHTML = ""
                for (var i in list){
                    list_elem.innerHTML += "<li>" + list[i] + "</li>"
                }
            }
        );
    }
);
