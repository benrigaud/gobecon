document.addEventListener('DOMContentLoaded', () => {
  console.log('Gobecon loaded');

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href').slice(1);
      const target = id && document.getElementById(id);

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    });
  });

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const header = document.querySelector('.site-header');

  if (header) {
    const toggleScrolled = () => {
      header.classList.toggle('scrolled', window.scrollY > 0);
    };

    toggleScrolled();
    window.addEventListener('scroll', toggleScrolled);
  }

  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  const builtBy = document.querySelector('.built-by');
  const siteFooter = document.querySelector('.site-footer');

  if (builtBy && siteFooter) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        builtBy.classList.toggle('is-visible', entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(siteFooter);
  }

  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  });

  const projectTabs = document.querySelectorAll('.project-tab');
  const projectPanels = document.querySelectorAll('.project-panel');
  const projectGalleries = new Map();

  // Swiper needs the container to have real (non-zero) dimensions at init
  // time, so each gallery is only initialized once its panel is actually
  // visible — eagerly initializing hidden panels breaks their sizing.
  const initProjectGallery = (panel) => {
    const key = panel.dataset.projectPanel;
    if (projectGalleries.has(key)) return projectGalleries.get(key);

    const gallery = panel.querySelector('.project-gallery');
    if (!gallery) return null;

    const thumbsEl = gallery.querySelector('.gallery-thumbs');
    const mainEl = gallery.querySelector('.gallery-main');
    const slideCount = thumbsEl.querySelectorAll('.swiper-slide').length;

    const thumbsSwiper = new Swiper(thumbsEl, {
      direction: 'vertical',
      slidesPerView: slideCount,
      spaceBetween: 12,
      watchSlidesProgress: true,
    });

    const mainSwiper = new Swiper(mainEl, {
      spaceBetween: 0,
      navigation: {
        nextEl: mainEl.querySelector('.gallery-next'),
        prevEl: mainEl.querySelector('.gallery-prev'),
      },
      thumbs: { swiper: thumbsSwiper },
    });

    const galleries = { mainSwiper, thumbsSwiper };
    projectGalleries.set(key, galleries);
    return galleries;
  };

  const activePanel = document.querySelector('.project-panel.is-active');
  if (activePanel) initProjectGallery(activePanel);

  projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.project;

      projectTabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      projectPanels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.projectPanel === target);
      });

      const targetPanel = document.querySelector(`.project-panel[data-project-panel="${target}"]`);
      const galleries = targetPanel && initProjectGallery(targetPanel);

      if (galleries) {
        galleries.thumbsSwiper.update();
        galleries.mainSwiper.update();
      }
    });
  });

  const contactForm = document.querySelector('.contact-form');
  const contactThanks = document.querySelector('.contact-thanks');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      // Demo only: no real submission endpoint wired up.
      contactForm.hidden = true;

      if (contactThanks) {
        contactThanks.hidden = false;
      }
    });
  }
});
