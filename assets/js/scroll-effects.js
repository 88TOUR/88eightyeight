/**
 * Scroll Effects Controller  
 * Intersection Observer 기반 스크롤 애니메이션
 */

class ScrollEffects {
  constructor() {
    this.observers = new Map();
    this.scrollElements = new Set();
    this.parallaxElements = new Set();
    this.isScrolling = false;
    
    // 성능 최적화 설정
    this.throttleTime = 16; // ~60fps
    this.lastScrollTime = 0;
  }

  init() {
    this.setupIntersectionObservers();
    this.initParallaxEffects();
    this.setupScrollProgressBar();
    this.bindScrollEvents();
  }

  /**
   * Intersection Observer 설정 (성능 최적화)
   */
  setupIntersectionObservers() {
    // 기본 페이드 인 관찰자
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerFadeIn(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    // 슬라이드 인 관찰자
    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerSlideIn(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -5% 0px'
    });

    // 요소 등록
    document.querySelectorAll('[data-scroll="fade"]').forEach(el => {
      fadeObserver.observe(el);
      this.scrollElements.add(el);
    });

    document.querySelectorAll('[data-scroll="slide"]').forEach(el => {
      slideObserver.observe(el);
      this.scrollElements.add(el);
    });

    // Observer 저장
    this.observers.set('fade', fadeObserver);
    this.observers.set('slide', slideObserver);
  }

  /**
   * 페이드 인 애니메이션 트리거
   */
  triggerFadeIn(element) {
    const delay = parseInt(element.dataset.delay) || 0;
    const duration = parseInt(element.dataset.duration) || 800;

    setTimeout(() => {
      element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.classList.add('scrolled-in');
    }, delay);

    // 한 번만 실행하도록 관찰 중단
    this.observers.get('fade')?.unobserve(element);
  }

  /**
   * 슬라이드 인 애니메이션 트리거
   */
  triggerSlideIn(element) {
    const direction = element.dataset.direction || 'up';
    const delay = parseInt(element.dataset.delay) || 0;
    const duration = parseInt(element.dataset.duration) || 600;

    const transforms = {
      up: 'translateY(0)',
      down: 'translateY(0)', 
      left: 'translateX(0)',
      right: 'translateX(0)'
    };

    setTimeout(() => {
      element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      element.style.opacity = '1';
      element.style.transform = transforms[direction];
      element.classList.add('scrolled-in');
    }, delay);

    this.observers.get('slide')?.unobserve(element);
  }

  /**
   * 패럴랙스 효과 초기화
   */
  initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      element.dataset.parallaxSpeed = speed;
      this.parallaxElements.add(element);
    });
  }

  /**
   * 스크롤 이벤트 바인딩 (최적화)
   */
  bindScrollEvents() {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        this.updateParallax();
        this.updateScrollProgress();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * 패럴랙스 업데이트
   */
  updateParallax() {
    const scrollTop = window.pageYOffset;
    
    this.parallaxElements.forEach(element => {
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      const speed = parseFloat(element.dataset.parallaxSpeed);

      // 요소가 뷰포트 근처에 있을 때만 계산
      if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
        const yPos = -(scrollTop - elementTop) * speed;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });
  }

  /**
   * 스크롤 진행률 바 설정
   */
  setupScrollProgressBar() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
      // 동적으로 진행률 바 생성
      const bar = document.createElement('div');
      bar.className = 'scroll-progress';
      bar.innerHTML = '<div class="scroll-progress-fill"></div>';
      document.body.appendChild(bar);
    }
  }

  /**
   * 스크롤 진행률 업데이트
   */
  updateScrollProgress() {
    const scrollProgressFill = document.querySelector('.scroll-progress-fill');
    if (!scrollProgressFill) return;

    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    scrollProgressFill.style.width = `${Math.min(scrollPercent, 100)}%`;
  }

  /**
   * 섹션별 스크롤 스파이
   */
  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav a[href="#${id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          navLink?.classList.add('active');
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    sections.forEach(section => spyObserver.observe(section));
    this.observers.set('spy', spyObserver);
  }

  /**
   * 스크롤 투 탑 버튼
   */
  setupScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top') || this.createScrollToTopBtn();

    const toggleBtn = () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    };

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleBtn, { passive: true });
  }

  /**
   * 스크롤 투 탑 버튼 생성
   */
  createScrollToTopBtn() {
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', '맨 위로 스크롤');
    document.body.appendChild(btn);
    return btn;
  }

  /**
   * 리사이즈 핸들러
   */
  handleResize() {
    // 패럴랙스 요소 위치 재계산
    this.parallaxElements.forEach(element => {
      element.style.transform = 'translate3d(0, 0, 0)';
    });

    // 디바운스된 업데이트
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.updateParallax();
    }, 250);
  }

  /**
   * 정리 함수
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.scrollElements.clear();
    this.parallaxElements.clear();
  }
}

// 전역 등록
window.ScrollEffects = ScrollEffects;
