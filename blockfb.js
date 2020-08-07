// ==UserScript==
// @name     block FB sponsored posts
// @version  2.0.0
// @grant    none
// @match    https://www.facebook.com/*
// ==/UserScript==

function hideAds() {
    var fullText;

    function loopNodes(node) {
        if (node.nodeName === "#text" && node.parentNode.offsetTop === 0) { 
            fullText += node.wholeText;
        } else {
            node.childNodes.forEach((child) => {
                loopNodes(child);
            });
        }     
    }
    
    document.querySelectorAll("div[id^=hyperfeed_story_id]").forEach((parent_div) =>{  
      if(parent_div != null){
        var title_el = parent_div.querySelector("div[id^='fbfeed_s_header']>span:nth-child(3)>span>a>span, div[id^='fbfeed_s_header']>span:nth-child(3)>span>span>a");
    
        fullText = "";

        if(title_el != null){
          loopNodes(title_el);
        }        
        
        console.log(fullText);
        console.log(parent_div);
        
        if (fullText == 'Sponsorowane') {          
          parent_div.innerHTML = "Hidden!";
        }
      }
    });   
}

function debounce(method, delay) {
    clearTimeout(method._tId);
    method._tId= setTimeout(function(){
        method();
    }, delay);
}

(function() {
    window.addEventListener('scroll', () => {   
      debounce(hideAds, 1000);
    });
})();

