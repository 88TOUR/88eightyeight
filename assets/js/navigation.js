/**
 * Navigation Controller
 * 반응형 네비게이션 및 헤더 동작 관리
 */

class Navigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.nav = document.querySelector('.nav');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    this.isMenuOpen = false;
    this.lastScrollY = window.scrollY;
    this.scrollDirection = 'up';
    
    // 스로틀링을 위한 RAF ID
    this.rafId = null;
  }

  init() {
    this.bindEvents();
    this.setupSmoothScroll();
    this.updateActiveLink();
  }

  /**
   * 이벤트 바인딩
   */
  bindEvents() {
    // 햄버거 메뉴 토글
    this.menuToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // 메뉴 외부 클릭시 닫기
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && !this.nav.contains(e.target)) {
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
  }

  /**
   * 메뉴 토글
   */
  toggleMenu() {
    this.isMenuOpen ? this.closeMenu() : this.openMenu();
  }

  /**
   * 메뉴 열기
   */
  openMenu() {
    this.isMenuOpen = true;
    this.nav.classList.add('nav-open');
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

  /**
   * 메뉴 닫기
   */
  closeMenu() {
    this.isMenuOpen = false;
    this.nav.classList.remove('nav-open');
    this.menuToggle.classList.remove('active');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    
    // 바디 스크롤 복원
    document.body.style.overflow = '';
  }

  /**
   * 스크롤 헤더 처리
   */
  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // 스크롤 방향 감지
    if (currentScrollY > this.lastScrollY) {
      this.scrollDirection = 'down';
    } else if (currentScrollY < this.lastScrollY) {
      this.scrollDirection = 'up';
    }

    // 헤더 숨김/표시 (스크롤 다운시 숨김)
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

  /**
   * 부드러운 스크롤 설정
   */
  setupSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = this.header.offsetHeight;
          const targetOffset = targetSection.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
          });

          // 모바일에서 메뉴 닫기
          if (window.innerWidth <= 768) {
            this.closeMenu();
          }
        }
      });
    });
  }

  /**
   * 현재 섹션에 따른 활성 링크 업데이트
   */
  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav a[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // 모든 링크에서 active 클래스 제거
        this.navLinks.forEach(link => link.classList.remove('active'));
        // 현재 섹션 링크에 active 클래스 추가
        correspondingLink?.classList.add('active');
      }
    });
  }

  /**
   * 리사이즈 핸들러
   */
  handleResize() {
    // 데스크톱에서 모바일 메뉴 닫기
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  /**
   * 모달 닫기 (전역 ESC 핸들러용)
   */
  closeModal() {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }
}

// 전역 등록
window.Navigation = Navigation;
