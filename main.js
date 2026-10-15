document.addEventListener('DOMContentLoaded', () => {

    // ===== SMART ALT TEXT POOLS (SEO) =====
    const altPoolHero = [
        'Jia Lissa portrait photography',
        'Jia Lissa editorial fashion',
        'Jia Lissa model portrait',
        'Jia Lissa russian model',
        'Jia Lissa photoshoot'
    ];
    const altPoolFeatured = [
        'Jia Lissa photoshoot',
        'Jia Lissa portrait photography',
        'Jia Lissa editorial fashion',
        'Jia Lissa lifestyle photography',
        'Jia Lissa model portrait',
        'Jia Lissa russian model',
        'Jia Lissa redhead model'
    ];
    const altPoolFeed = [
        'Jia Lissa photoshoot',
        'Jia Lissa portrait photography',
        'Jia Lissa editorial fashion',
        'Jia Lissa lifestyle photography',
        'Jia Lissa model portrait',
        'Jia Lissa russian model',
        'Jia Lissa redhead photography',
        'Jia Lissa artistic portrait',
        'Jia Lissa natural light portrait'
    ];

    // ===== HERO SPLIT-SCREEN SLIDER =====
    const heroContainer = document.getElementById('heroSlideshow');
    if (heroContainer && typeof heroImages !== 'undefined' && heroImages.length > 0) {
        heroImages.forEach((url, i) => {
            const slide = document.createElement('div');
            slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
            slide.style.backgroundImage = `url('${url}')`;
            slide.setAttribute('role', 'img');
            slide.setAttribute('aria-label', altPoolHero[i % altPoolHero.length]);
            heroContainer.appendChild(slide);
        });
        const slides = heroContainer.querySelectorAll('.hero-slide');
        if (slides.length > 1) {
            let currentIndex = 0;
            setInterval(() => {
                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');
            }, 6000);
        }
    }

    // ===== INTRO IMAGE alt fix =====
    const introImg = document.querySelector('.intro-image-wrap img');
    if (introImg) {
        introImg.alt = 'Jia Lissa portrait photography — Russian model';
    }

    // ===== FEATURED HIGHLIGHTS =====
    const featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid && typeof featuredImages !== 'undefined') {
        featuredImages.forEach((url, i) => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = altPoolFeatured[i % altPoolFeatured.length];
            img.loading = 'lazy';
            img.addEventListener('click', () => openLightbox(url, img.alt));
            featuredGrid.appendChild(img);
        });
    }

    // ===== FEED — Full-screen vertical scroller =====
    const feedScroller = document.getElementById('feedScroller');
    const feedProgress = document.getElementById('feedProgress');
    if (feedScroller && typeof feedImages !== 'undefined' && feedImages.length > 0) {
        feedImages.forEach((url, i) => {
            const item = document.createElement('div');
            item.className = 'feed-item';
            if (i === 0) item.classList.add('visible');

            const img = document.createElement('img');
            img.src = url;
            img.alt = altPoolFeed[i % altPoolFeed.length];
            img.loading = i < 2 ? 'eager' : 'lazy';

            const counter = document.createElement('span');
            counter.className = 'feed-count';
            counter.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(feedImages.length).padStart(2, '0');

            item.appendChild(img);
            item.appendChild(counter);

            if (i === 0) {
                const hint = document.createElement('div');
                hint.className = 'feed-hint';
                hint.textContent = 'Scroll to explore';
                item.appendChild(hint);
            }

            feedScroller.appendChild(item);
        });

        const items = feedScroller.querySelectorAll('.feed-item');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const visible = entry.isIntersecting && entry.intersectionRatio > 0.5;
                entry.target.classList.toggle('visible', visible);
            });
        }, { threshold: [0, 0.5, 1], root: feedScroller });
        items.forEach(item => obs.observe(item));

        if (feedProgress) {
            feedScroller.addEventListener('scroll', () => {
                const scrollTop = feedScroller.scrollTop;
                const total = feedScroller.scrollHeight - feedScroller.clientHeight;
                const pct = total > 0 ? (scrollTop / total) * 100 : 0;
                feedProgress.style.width = pct + '%';
            }, { passive: true });
        }
    }

    // ===== LIGHTBOX =====
    function openLightbox(url, altText) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', (e) => { e.stopPropagation(); overlay.remove(); });
        const image = document.createElement('img');
        image.src = url;
        image.alt = altText || 'Jia Lissa';
        image.className = 'lightbox-image';
        overlay.addEventListener('click', () => overlay.remove());
        overlay.appendChild(closeBtn);
        overlay.appendChild(image);
        document.body.appendChild(overlay);
    }

    // ===== ABOUT PAGE — Bio image loader =====
    const bioWrap = document.getElementById('bioImageWrap');
    if (bioWrap) {
        if (typeof bioImage !== 'undefined' && bioImage && bioImage.trim() !== '') {
            const img = document.createElement('img');
            img.src = bioImage;
            img.alt = 'Jia Lissa biography portrait — Russian model';
            bioWrap.appendChild(img);
        } else {
            bioWrap.style.display = 'none';
            const bioGrid = bioWrap.closest('.bio-grid');
            if (bioGrid) {
                bioGrid.style.gridTemplateColumns = '1fr';
                bioGrid.style.textAlign = 'center';
                bioGrid.style.maxWidth = '760px';
            }
        }
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
