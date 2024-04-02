// ==UserScript==
// @name         Remove Translate Attribute For Temu
// @namespace    https://github.com/KPI0/tampermonkey
// @version      0.1
// @description  Remove translate attribute from HTML tag
// @author       KPI0
// @match        https://www.temu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 获取 HTML 标签
    var htmlTag = document.querySelector('html');

    // 检查是否存在 translate 属性并且值为 "no"
    if (htmlTag && htmlTag.hasAttribute('translate') && htmlTag.getAttribute('translate') === 'no') {
        // 移除 translate 属性
        htmlTag.removeAttribute('translate');
    }
})();
