document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    let searchData;

    // 获取搜索数据
    fetch('/assets/search.json')
        .then(response => response.json())
        .then(data => {
            searchData = data;
        });

    // 高亮文本
    function highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // 修改获取上下文的函数
    function getContext(content, searchTerm, position, contextLength = 20) {
        const index = position >= 0 ? position : content.toLowerCase().indexOf(searchTerm.toLowerCase());
        if (index === -1) return '';

        const start = Math.max(0, index - contextLength);
        const end = Math.min(content.length, index + searchTerm.length + contextLength);
        let context = content.slice(start, end);

        // 添加省略号表示截断
        if (start > 0) context = '...' + context;
        if (end < content.length) context += '...';

        return context;
    }

    // 查找最近的标题
    function findNearestHeading(content, position) {
        const headingRegex = /(?:^|\n)(#{1,6}\s+[^\n]+)/g;
        let lastHeading = '';
        let lastPosition = 0;

        let match;
        while ((match = headingRegex.exec(content)) !== null) {
            if (match.index > position) break;
            lastHeading = match[1].replace(/^#+\s+/, '');
            lastPosition = match.index;
        }

        return {
            title: lastHeading,
            position: lastPosition
        };
    }

    // 搜索功能
    function performSearch(searchTerm) {
        if (!searchTerm) {
            searchResults.style.display = 'none';
            return;
        }

        const results = searchData.filter(item => {
            const searchContent = (item.title + item.content + item.date).toLowerCase();
            return searchContent.includes(searchTerm.toLowerCase());
        });

        displayResults(results, searchTerm);
    }

    // 修改搜索结果显示函数
    function displayResults(results, searchTerm) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">没有找到相关结果</div>';
            return;
        }

        const html = results.map(item => {
            const highlightedTitle = highlightText(item.title, searchTerm);
            const matches = [];
            const lowerContent = item.content.toLowerCase();
            const lowerSearchTerm = searchTerm.toLowerCase();
            let pos = 0;

            // 查找所有匹配位置
            while ((pos = lowerContent.indexOf(lowerSearchTerm, pos)) !== -1) {
                const context = getContext(item.content, searchTerm, pos);
                const nearestHeading = findNearestHeading(item.content, pos);
                
                const anchorId = `highlight-${pos}`;
                
                matches.push({
                    context: context,
                    position: pos,
                    heading: nearestHeading.title,
                    anchorId: anchorId
                });
                pos += lowerSearchTerm.length;
            }

            // 生成匹配结果HTML
            const matchesHtml = matches.map((match, index) => `
                <div class="search-match ${index > 0 ? 'hidden' : ''}" data-match-index="${index}">
                    <a href="${item.url}?search=${encodeURIComponent(searchTerm)}#${match.anchorId}" 
                       class="search-result-item">
                        <p class="match-heading">${match.heading || ''}</p>
                        <p class="excerpt">${highlightText(match.context, searchTerm)}</p>
                    </a>
                </div>
            `).join('');

            const showMoreButton = matches.length > 1 ? `
                <button class="show-more-matches" data-expanded="false">
                    显示更多 (${matches.length - 1})
                </button>
            ` : '';

            return `
                <div class="search-result-group">
                    <h3>${highlightedTitle}</h3>
                    ${item.date ? `<p class="date">${item.date}</p>` : ''}
                    <p class="match-count">找到 ${matches.length} 处匹配</p>
                    ${matchesHtml}
                    ${showMoreButton}
                </div>
            `;
        }).join('');

        searchResults.innerHTML = html;
        searchResults.style.display = 'block';

        // 添加显示更多按钮的点击事件
        const showMoreButtons = searchResults.querySelectorAll('.show-more-matches');
        showMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const resultGroup = this.closest('.search-result-group');
                const hiddenMatches = resultGroup.querySelectorAll('.search-match.hidden');
                const isExpanded = this.getAttribute('data-expanded') === 'true';
                
                hiddenMatches.forEach(match => {
                    match.style.display = isExpanded ? 'none' : 'block';
                });
                
                this.setAttribute('data-expanded', !isExpanded);
                this.textContent = isExpanded ? 
                    `显示更多 (${hiddenMatches.length})` : 
                    '收起';
            });
        });
    }

    // 防抖
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // 监听搜索输入
    searchInput.addEventListener('input', debounce((e) => {
        performSearch(e.target.value);
    }, 300));

    // 点击外部关闭搜索结果
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
});