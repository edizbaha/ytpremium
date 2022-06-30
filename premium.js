// ==UserScript==
// @name          Premium - YouTube Logo
// @namespace     http://edizbaha.github.io
// @description	  Replace the YouTube Logo with Premium.
// @author        edizbaha
// @homepage      https://userstyles.org/styles/222948
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// @run-at        document-start
// @version       0.20211220005237
// ==/UserScript==
(function() {var css = [
	"    ",
	"    ",
	"    ",
	"    #logo-red-icon,",
	"    #logo-icon {",
	"        content: url(\"https://raw.githubusercontent.com/edizbaha/ytpremium/main/ytpremium.svg\") !important;",
	"        background-image: none !important;",
    "        height: fit-content;",
	"    }",
	"    ",
	"    html[dark] #logo-icon,",
	"    html[dark] #logo-red-icon {",
	"        content: url(\"https://raw.githubusercontent.com/edizbaha/ytpremium/main/ytpremiumdark.svg\") !important;",
	"        background-image: none !important;",
    "        height: fit-content;",
	"    }"
].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
