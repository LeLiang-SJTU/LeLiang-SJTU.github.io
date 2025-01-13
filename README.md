---
layout: myhome
title : Blog
---

# LeLiang-SJTU.github.io
我的个人主页
第一个主页是否成功2025-01-10
2025年1月10日15:10:16


``` html
x-data="{ 
        isNavOpen: true,
        isSidebarOpen: true,
        currentSlide: 0,
        slides: [
            { 
                title: '探索编程世界', 
                desc: '分享技术见解与经验',
                bg: 'bg-gradient-to-r from-blue-600 to-purple-600'
            },
            { 
                title: '生活随笔', 
                desc: '记录精彩瞬间',
                bg: 'bg-gradient-to-r from-green-600 to-blue-600'
            },
            { 
                title: '学习心得', 
                desc: '知识分享与成长',
                bg: 'bg-gradient-to-r from-purple-600 to-pink-600'
            }
        ],
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        }
    }"
    x-init="setInterval(() => nextSlide(), 5000)"