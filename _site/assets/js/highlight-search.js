document.addEventListener('DOMContentLoaded', () => {
    // 获取搜索参数和锚点
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    const hash = window.location.hash.slice(1);

    if (!searchTerm) return;

    const content = document.querySelector('[class^="markdown-theme"]');
    if (!content) return;

    function highlightAndCreateAnchors() {
        const regex = new RegExp(searchTerm, 'gi');
        const walk = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let node;
        let position = 0;
        
        while (node = walk.nextNode()) {
            const matches = node.textContent.match(regex);
            if (matches) {
                const originalText = node.textContent;
                const span = document.createElement('span');
                let lastIndex = 0;
                let result = '';
                
                regex.lastIndex = 0;
                let match;
                while ((match = regex.exec(originalText)) !== null) {
                    const anchorId = `highlight-${position}`;
                    result += originalText.slice(lastIndex, match.index);
                    result += `<span id="${anchorId}"><mark class="search-highlight">${match[0]}</mark></span>`;
                    lastIndex = regex.lastIndex;
                    position += 1;
                }
                result += originalText.slice(lastIndex);
                span.innerHTML = result;
                node.parentNode.replaceChild(span, node);
            }
        }

        // 如果有锚点，滚动到对应位置
        if (hash) {
            setTimeout(() => {
                const target = document.getElementById(hash);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    target.querySelector('.search-highlight').classList.add('current-highlight');
                }
            }, 500);
        }
    }

    highlightAndCreateAnchors();
});