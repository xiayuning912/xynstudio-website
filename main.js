// main.js — 全站共享脚本

// ── 汉堡菜单 ──────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
    // 点击链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

// ── 滚动淡入动画 ────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// ── 技能条动画 ────────────────────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-progress[data-width]');
            bars.forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bars').forEach(el => skillObserver.observe(el));

// ── 回到顶部按钮 ─────────────────────────────────────────
const topBtn = document.getElementById('back-to-top');
if (topBtn) {
    window.addEventListener('scroll', () => {
        topBtn.classList.toggle('visible', window.scrollY > 300);
    });
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── 打字机效果（首页 hero） ──────────────────────────────
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
    const texts = [
        '创意开发者 · 光影追逐者 · 山海收藏家',
        '用代码构建浪漫，用镜头记录世界',
        '保持热爱，奔赴山海',
    ];
    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const current = texts[textIndex];
        if (!deleting) {
            typewriterEl.textContent = current.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(type, 2000);
                return;
            }
        } else {
            typewriterEl.textContent = current.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        setTimeout(type, deleting ? 40 : 80);
    }
    type();
}
