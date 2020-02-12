// ==UserScript==
// @name     block FB sponsored posts and propositions
// @version  1.1.0
// @grant    none
// @match    https://www.facebook.com/*
// ==/UserScript==

function hideAds() {
    var fullText;

    function loopNodes(node) {
        if (node.dataset != undefined && node.dataset.content != undefined && !isHidden(node)) {
            fullText += node.dataset.content;
        } else {
            node.childNodes.forEach((child) => {
                loopNodes(child);
            });
        }

    }

    function isHidden(el) {
        return (el.offsetParent === null)
    }

    document.querySelectorAll("[id^='fbfeed_sub__header_id']").forEach((el) => {
        fullText = "";
        loopNodes(el);
        if (fullText == 'Sponsorowane') {
            console.log(el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
            el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML = "Hidden sponsored"
        }
    });
  
    document.querySelectorAll(".x_9y3d1sxtq").forEach((el) => {
        if(el.textContent == "Propozycje dla Ciebie"){
          el.parentNode.parentNode.parentNode.parentNode.innerHTML = "Hidden proposition";
        }
    });
}

setTimeout(hideAds, 1000);
(function() {
    window.addEventListener('scroll', () => {
        hideAds();
        setTimeout(hideAds, 1000);
    });
})();
