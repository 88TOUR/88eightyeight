/**
 * Navigation88 Controller
 * 반응형 네비게이션 및 헤더 동작 관리
 */
class Navigation88 {
  constructor() {
    this.header = document.querySelector('.header');
    this.nav = document.querySelector('.nav');
    this.menuToggle = document.querySelector('.menu-toggle, .hamburger');
    this.navLinks = document.querySelectorAll('.nav a');
    this.isMenuOpen = false;
    this.lastScrollY = window.scrollY;
    this.scrollDirection = 'up';
    this.rafId = null;
  }

  init() {
    if (!this.nav || !this.menuToggle) return;
    this.bindEvents();
    this.setupSmoothScroll();
    this.updateActiveLink();
  }

  bindEvents() {
    // 햄버거 메뉴 토글
    this.menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // 메뉴 외부 클릭시 닫기
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && this.nav && !this.nav.contains(e.target)) {
        this.closeMenu();
      }
    });

    // 스크롤 헤더 동작 (성능 최적화)
    let isScrolling = false;
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        requestAnimationFrame(() => {
          this.handleScroll();
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, { passive: true });

    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // 윈도우 리사이즈 시 메뉴 닫기
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  toggleMenu() {
    this.isMenuOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu() {
    if (!this.nav || !this.menuToggle) return;
    this.isMenuOpen = true;
    this.nav.classList.add('nav-open');
    const navUl = this.nav.querySelector('ul');
    navUl && navUl.classList.add('open');
    this.menuToggle.classList.add('active');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    // 포커스 트래핑
    const firstLink = this.nav.querySelector('a');
    firstLink?.focus();
    // 바디 스크롤 방지 (모바일)
    if (window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeMenu() {
    if (!this.nav || !this.menuToggle) return;
    this.isMenuOpen = false;
    this.nav.classList.remove('nav-open');
    const navUl = this.nav.querySelector('ul');
    navUl && navUl.classList.remove('open');
    this.menuToggle.classList.remove('active');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  handleScroll() {
    if (!this.header) return;
    const currentScrollY = window.scrollY;
    if (currentScrollY > this.lastScrollY) {
      this.scrollDirection = 'down';
    } else if (currentScrollY < this.lastScrollY) {
      this.scrollDirection = 'up';
    }
    if (currentScrollY > 100) {
      if (this.scrollDirection === 'down') {
        this.header.classList.add('header--hidden');
      } else {
        this.header.classList.remove('header--hidden');
      }
      this.header.classList.add('header--scrolled');
    } else {
      this.header.classList.remove('header--hidden', 'header--scrolled');
    }
    this.lastScrollY = currentScrollY;
    this.updateActiveLink();
  }

  setupSmoothScroll() {
    if (!this.navLinks || this.navLinks.length === 0) return;
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // 내비게이션 내 anchor만 부드러운 스크롤
        if (link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          if (targetSection && this.header) {
            const headerHeight = this.header.offsetHeight;
            const targetOffset = targetSection.offsetTop - headerHeight - 20;
            window.scrollTo({
              top: targetOffset,
              behavior: 'smooth'
            });
            if (window.innerWidth <= 768) {
              this.closeMenu();
            }
          }
        }
      });
    });
  }

  updateActiveLink() {
    if (!this.navLinks || this.navLinks.length === 0) return;
    const path = location.pathname.replace(/\/$/, '');
    this.navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname.replace(/\/$/, '');
      if (linkPath === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  handleResize() {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  closeModal() {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }
}

window.Navigation88 = Navigation88;
