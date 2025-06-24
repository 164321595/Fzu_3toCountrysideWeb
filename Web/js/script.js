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
    // 文化遗产点分布图表
    const heritageCtx = document.getElementById("heritageChart").getContext("2d");
    const heritageChart = new Chart(heritageCtx, {
        type: "bar",
        data: {
            labels: ["丰泽区", "鲤城区", "南安市"],
            datasets: [{
                label: "文化遗产点数量",
                data: [5, 8, 3],
                backgroundColor: [
                    "rgba(15, 76, 129, 0.7)",
                    "rgba(230, 184, 0, 0.7)",
                    "rgba(230, 115, 0, 0.7)",
                ],
                borderColor: [
                    "rgba(15, 76, 129, 1)",
                    "rgba(230, 184, 0, 1)",
                    "rgba(230, 115, 0, 1)",
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
                },
            },
        },
    });

    // 活动类型占比图表
    const activityCtx = document.getElementById("activityChart").getContext("2d");
    const activityChart = new Chart(activityCtx, {
        type: "doughnut",
        data: {
            labels: ["文化遗产参观", "非遗体验", "历史调研", "志愿服务"],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: [
                    "rgba(15, 76, 129, 0.7)",
                    "rgba(230, 184, 0, 0.7)",
                    "rgba(230, 115, 0, 0.7)",
                    "rgba(102, 178, 255, 0.7)",
                ],
                borderColor: [
                    "rgba(15, 76, 129, 1)",
                    "rgba(230, 184, 0, 1)",
                    "rgba(230, 115, 0, 1)",
                    "rgba(102, 178, 255, 1)",
                ],
                borderWidth: 1,
            }, ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom", // Removed the duplicate legend property
                },
            },
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