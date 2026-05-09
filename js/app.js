/* Circuit Intuition — main app */

document.addEventListener('DOMContentLoaded', () => {

  /* === HAMBURGER MENU === */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* === SCROLL REVEAL === */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  /* === ARTICLE TAG FILTERING === */
  const filterTags = document.querySelectorAll('.filter-tag');
  const articlePreviews = document.querySelectorAll('.article-preview');

  if (filterTags.length && articlePreviews.length) {
    // Skip the homepage — only on /articles/ page with filter tags
    const isArticlesPage = window.location.pathname.includes('/articles/');

    filterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        // Update active state
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        const filter = tag.dataset.filter;

        articlePreviews.forEach(article => {
          if (filter === 'all') {
            article.style.display = '';
            article.classList.add('reveal');
            article.classList.add('visible');
          } else if (filter === 'published' || filter === 'coming-soon') {
            const matches = article.dataset.status === filter;
            article.style.display = matches ? '' : 'none';
            if (matches) {
              article.classList.add('reveal');
              article.classList.add('visible');
            }
          } else {
            // Filter by category tag
            const categories = (article.dataset.tags || '').split(' ');
            const matches = categories.includes(filter);
            article.style.display = matches ? '' : 'none';
            if (matches) {
              article.classList.add('reveal');
              article.classList.add('visible');
            }
          }
        });
      });
    });
  }

  /* === READING PROGRESS BAR (article pages) === */
  const isArticlePage = document.querySelector('.article-body');
  if (isArticlePage) {
    const bar = document.createElement('div');
    bar.id = 'reading-progress';
    bar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent, #7c3aed), var(--accent-2, #06b6d4));
      z-index: 200;
      width: 0%;
      transition: width 0.1s linear;
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = Math.min(progress, 100) + '%';
    });
  }

  /* === ACTIVE NAV LINK === */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href) ||
        (href === '.' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
      link.classList.add('active');
    }
  });
});
