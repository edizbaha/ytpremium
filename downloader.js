// ==UserScript==
// @name Youtube Video Downloader
// @description Youtube video indirmeyi sağlar.
// @namespace   https://ysenmanuel.github.io/Web/
// @version     6.0
// @date        2020-10-16
// @author      edizbaha
// @homepage    https://y2mate.com/
// @icon        https://www.youtube.com/s/desktop/592786db/img/favicon_96x96.png
// @include     https://www.youtube.com/*
// @include     https://www.youtube.com/*
// @run-at      document-end
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_openInTab
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_download
// @grant       GM.info
// @grant       GM.listValues
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.deleteValue
// @grant       GM.openInTab
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest
// @connect     youtube.com
// @connect     m.youtube.com
// @connect     www.youtube.com
// @connect     youtube-nocookie.com
// @connect     youtu.be
// @connect     y2mate.com
// @connect     self
// @connect     *
// @compatible chrome
// @compatible firefox
// @compatible opera
// @compatible safari
// @license CC BY-NC-ND 4.0 International. https://creativecommons.org/licenses/by-nc-nd/4.0/
// @antifeature referral-link
// @match *://*.youtube.com/*
// ==/UserScript==
var AKoiMain = {
    oXHttpReq: null,
    vid: null,
    oldUrl: null,
    DocOnLoad: function(o) {
        try {
            if (null != o && null != o.body && null != o.location && (AKoiMain.vid = AKoiMain.getVid(o), AKoiMain.vid)) {
                o.querySelector("#meta #notification-preference-button").setAttribute("style", "flex-wrap: wrap;");
                var t = o.querySelector("#notification-preference-button"),
                    e = o.querySelector("#y2mateconverter"),
                    n = AKoiMain.GetCommandButton();
                null == e && (null != t ? t.parentNode.insertBefore(n, t) : (t = o.querySelector("#eow-title")).parentNode.insertBefore(n, t)), AKoiMain.oldUrl = o.location.href, AKoiMain.checkChangeVid()
            }
            return !0
        } catch (o) {
            console.log("Ошибка в функции Y2mate.DocOnLoad. ", o)
        }
    },
    checkChangeVid: function() {
        setTimeout(function() {
            AKoiMain.oldUrl == window.location.href ? AKoiMain.checkChangeVid() : AKoiMain.WaitLoadDom(window.document)
        }, 1e3)
    },
    WaitLoadDom: function(o) {
        AKoiMain.vid = AKoiMain.getVid(o), AKoiMain.vid ? null != o.querySelector("#meta #notification-preference-button") ? AKoiMain.DocOnLoad(o) : setTimeout(function() {
            AKoiMain.WaitLoadDom(o)
        }, 1e3) : AKoiMain.checkChangeVid()
    },
    goToY2mate: function(o) {
        try {
            var t = "https://y2mate.com/tr/youtube/" + AKoiMain.vid;
            window.open(t, "_blank")
        } catch (o) {
            console.log("Ошибка в функции Y2mate.OnButtonClick. ", o)
        }
    },
    GetCommandButton: function() {
        try {
            var o = document.createElement("button");
            return o.id = "y2mateconverter", o.className = "yt-uix-tooltip", o.setAttribute("type", "button"), o.setAttribute("title", "İndir"), o.innerHTML = "İndir", o.addEventListener("click", function(o) {
                AKoiMain.goToY2mate(o)
            }, !0), o.setAttribute("style", "min-height:25px; position:relative; cursor: pointer; font: 13px Arial; background: #FC0A0A; color: #fff; text-transform: uppercase; display: block; padding: 10px 16px; margin:7px 7px; border: 1px solid #FC0A0A; border-radius: 2px; font-weight:bold"), o.setAttribute("onmouseover", "this.style.backgroundColor='#FC0A0A'"), o.setAttribute("onmouseout", "this.style.backgroundColor='#FC0A0A'"), o
        } catch (o) {
            console.log("Ошибка в функции Y2mate.GetCommandButton. ", o)
        }
    },
    getVid: function(o) {
        var t = o.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);
        return !(!t || !t[3]) && t[3]
    }
};
AKoiMain.WaitLoadDom(window.document);
