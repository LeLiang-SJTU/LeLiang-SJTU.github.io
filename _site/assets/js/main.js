document.addEventListener('DOMContentLoaded', () => {
    // 导航栏控制
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            nav.classList.remove('nav-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('nav-up')) {
            nav.classList.add('nav-up');
        } else if (currentScroll < lastScroll && nav.classList.contains('nav-up')) {
            nav.classList.remove('nav-up');
        }
        lastScroll = currentScroll;
    });

    // 侧边栏控制
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-hidden');
    });
});