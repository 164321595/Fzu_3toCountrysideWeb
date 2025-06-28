// 导航栏滚动效果
const navbar = document.getElementById("navbar");
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
        navbar.classList.add("bg-primary/95");
        navbar.classList.remove("bg-transparent");

        // 显示返回顶部按钮
        backToTopBtn.classList.remove("opacity-0", "invisible");
        backToTopBtn.classList.add("opacity-100", "visible");
    } else {
        navbar.classList.remove("scrolled");
        navbar.classList.remove("bg-primary/95");
        navbar.classList.add("bg-transparent");

        // 隐藏返回顶部按钮
        backToTopBtn.classList.add("opacity-0", "invisible");
        backToTopBtn.classList.remove("opacity-100", "visible");
    }
});

// 移动端菜单切换
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", function() {
    mobileMenu.classList.toggle("hidden");
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        // 关闭移动端菜单
        if (!mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
        }

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth",
            });
        }
    });
});

// 返回顶部按钮
backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// 初始化图表
window.addEventListener("DOMContentLoaded", (event) => {
    // 红色遗址分布图表
    const heritageCtx = document.getElementById("heritageChart").getContext("2d");
    const heritageChart = new Chart(heritageCtx, {
        type: "bar",
        data: {
            labels: [
                "福州文林山革命陵园",
                "军门社区",
                "林觉民故居/中共福州市委旧址",
                "福建省革命历史纪念馆",
                "宏琳厝",
                "吉巷乡坂中村主题馆",
                "双溪镇革命老区相关旧址",
                "屏南县革命烈士陵园",
                "陈祥榕烈士故里",
                "下党村相关地点",
            ],
            datasets: [{
                label: "红色遗址数量（按行程涉及）",
                data: [1, 1, 1, 3, 1, 1, 3, 1, 1, 2],
                backgroundColor: [
                    "rgba(192, 57, 43, 0.7)",
                    "rgba(41, 128, 185, 0.7)",
                    "rgba(46, 204, 113, 0.7)",
                    "rgba(243, 156, 18, 0.7)",
                    "rgba(155, 89, 182, 0.7)",
                    "rgba(26, 188, 156, 0.7)",
                    "rgba(149, 165, 166, 0.7)",
                    "rgba(231, 76, 60, 0.7)",
                    "rgba(52, 152, 219, 0.7)",
                    "rgba(189, 195, 199, 0.7)",
                ],
                borderColor: [
                    "rgba(192, 57, 43, 1)",
                    "rgba(41, 128, 185, 1)",
                    "rgba(46, 204, 113, 1)",
                    "rgba(243, 156, 18, 1)",
                    "rgba(155, 89, 182, 1)",
                    "rgba(26, 188, 156, 1)",
                    "rgba(149, 165, 166, 1)",
                    "rgba(231, 76, 60, 1)",
                    "rgba(52, 152, 219, 1)",
                    "rgba(189, 195, 199, 1)",
                ],
                borderWidth: 1,
            }, ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "遗址数量",
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "红色遗址名称",
                    },
                    maxBarThickness: 40, // 调整柱状图宽度
                },
            },
        },
    });

    // 活动类型占比图表
    const activityCtx = document.getElementById("activityChart").getContext("2d");
    const activityChart = new Chart(activityCtx, {
        type: "doughnut",
        data: {
            labels: ["红色遗址参观", "走访调研", "纪念缅怀", "主题学习"],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                    "rgba(41, 128, 185, 0.7)",
                    "rgba(46, 204, 113, 0.7)",
                    "rgba(231, 76, 60, 0.7)",
                    "rgba(155, 89, 182, 0.7)",
                ],
                borderColor: [
                    "rgba(41, 128, 185, 1)",
                    "rgba(46, 204, 113, 1)",
                    "rgba(231, 76, 60, 1)",
                    "rgba(155, 89, 182, 1)",
                ],
                borderWidth: 1,
            }, ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || "";
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce(
                                (acc, val) => acc + val,
                                0
                            );
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${percentage}%`;
                        },
                    },
                },
            },
            cutout: "65%",
        },
    });
    // 滚动动画
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".animate-on-scroll");

        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add("fade-in-up");
            }
        });
    };

    // 初始加载动画
    window.addEventListener("load", () => {
        animateOnScroll();
    });

    // 滚动时加载动画
    window.addEventListener("scroll", () => {
        animateOnScroll();
    });

    // 表单提交处理
    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // 显示加载动画
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<div class="loader"></div>';
            submitButton.disabled = true;

            // 模拟表单提交
            setTimeout(() => {
                // 显示成功消息
                alert("留言提交成功！我们会尽快回复您。");

                // 重置表单
                this.reset();

                // 恢复按钮状态
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
});