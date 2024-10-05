// ==UserScript==
// @name                Convert Text to Hyperlink
// @name:zh-CN          文本识别为超链接
// @namespace           https://github.com/KPI0/tampermonkey
// @version             1.0
// @description         Convert URLs in text nodes to hyperlinks using regular expressions
// @description:zh-cn   通过正则表达式将文本中的链接转换为超链接
// @author              KPI0
// @match               *://*/*
// @icon                data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzI4MTE3NTk1Mjc5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MjAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTU3My40NCA2NDBhMTg3LjY4IDE4Ny42OCAwIDAgMS0xMzIuOC01NS4zNkw0MTYgNTYwbDQ1LjI4LTQ1LjI4IDI0LjY0IDI0LjY0YTEyNC4zMiAxMjQuMzIgMCAwIDAgMTcwLjA4IDUuNzZsMS40NC0xLjI4YTQ5LjQ0IDQ5LjQ0IDAgMCAwIDQtMy44NGwxMDEuMjgtMTAxLjI4YTEyNC4xNiAxMjQuMTYgMCAwIDAgMC0xNzZsLTEuOTItMS45MmExMjQuMTYgMTI0LjE2IDAgMCAwLTE3NiAwbC01MS42OCA1MS42OGE0OS40NCA0OS40NCAwIDAgMC0zLjg0IDRsLTIwIDI0Ljk2LTQ5LjkyLTQwTDQ4MCAyNzYuMzJhMTA4LjE2IDEwOC4xNiAwIDAgMSA4LjY0LTkuMjhsNTEuNjgtNTEuNjhhMTg4LjE2IDE4OC4xNiAwIDAgMSAyNjYuNzIgMGwxLjkyIDEuOTJhMTg4LjE2IDE4OC4xNiAwIDAgMSAwIDI2Ni43MmwtMTAxLjI4IDEwMS4yOGExMTIgMTEyIDAgMCAxLTguNDggNy44NCAxOTAuMjQgMTkwLjI0IDAgMCAxLTEyNS4yOCA0OHoiIGZpbGw9IiMzMzMzMzMiIHAtaWQ9IjE2MjEiPjwvcGF0aD48cGF0aCBkPSJNMzUwLjcyIDg2NGExODcuMzYgMTg3LjM2IDAgMCAxLTEzMy4yOC01NS4zNmwtMS45Mi0xLjkyYTE4OC4xNiAxODguMTYgMCAwIDEgMC0yNjYuNzJsMTAxLjI4LTEwMS4yOGExMTIgMTEyIDAgMCAxIDguNDgtNy44NCAxODguMzIgMTg4LjMyIDAgMCAxIDI1OC4wOCA3Ljg0TDYwOCA0NjRsLTQ1LjI4IDQ1LjI4LTI0LjY0LTI0LjY0QTEyNC4zMiAxMjQuMzIgMCAwIDAgMzY4IDQ3OC44OGwtMS40NCAxLjI4YTQ5LjQ0IDQ5LjQ0IDAgMCAwLTQgMy44NGwtMTAxLjI4IDEwMS4yOGExMjQuMTYgMTI0LjE2IDAgMCAwIDAgMTc2bDEuOTIgMS45MmExMjQuMTYgMTI0LjE2IDAgMCAwIDE3NiAwbDUxLjY4LTUxLjY4YTQ5LjQ0IDQ5LjQ0IDAgMCAwIDMuODQtNGwyMC0yNC45NiA1MC4wOCA0MC0yMC44IDI1LjEyYTEwOC4xNiAxMDguMTYgMCAwIDEtOC42NCA5LjI4bC01MS42OCA1MS42OEExODcuMzYgMTg3LjM2IDAgMCAxIDM1MC43MiA4NjR6IiBmaWxsPSIjMzMzMzMzIiBwLWlkPSIxNjIyIj48L3BhdGg+PC9zdmc+
// @grant               none
// @license             MIT
// @updateURL           https://raw.githubusercontent.com/KPI0/Tampermonkey/main/Remove%20Translate%20Attribute%20For%20Temu.js
// @downloadURL         https://raw.githubusercontent.com/KPI0/Tampermonkey/main/Remove%20Translate%20Attribute%20For%20Temu.js
// ==/UserScript==

(function () {
    'use strict';

    // 正则表达式用于匹配以 http 或 https 开头的 URL
    const urlRegex = /(http:\/\/[^\s]+|https:\/\/[^\s]+)/g;

    function convertTextLinksToHyperlinks(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue;
            const matches = text.match(urlRegex);

            if (matches) {
                const span = document.createElement('span');
                let lastIndex = 0;

                matches.forEach((match) => {
                    const matchIndex = text.indexOf(match, lastIndex);

                    // 添加普通文本
                    if (matchIndex > lastIndex) {
                        span.appendChild(document.createTextNode(text.substring(lastIndex, matchIndex)));
                    }

                    // 创建超链接元素
                    const link = document.createElement('a');
                    link.href = match;
                    link.target = '_blank'; // 新标签打开
                    link.textContent = match;
                    span.appendChild(link);

                    lastIndex = matchIndex + match.length;
                });

                // 添加剩余的普通文本
                if (lastIndex < text.length) {
                    span.appendChild(document.createTextNode(text.substring(lastIndex)));
                }

                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'A') {
            // 递归处理子节点，但不处理已经是链接的节点
            for (let child of Array.from(node.childNodes)) {
                convertTextLinksToHyperlinks(child);
            }
        }
    }

    // 等待页面加载完成后执行
    window.addEventListener('load', function () {
        convertTextLinksToHyperlinks(document.body);
    });

})();
