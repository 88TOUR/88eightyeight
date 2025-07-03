class App {
  constructor() {
    this.modules = new Map();
    this.isInitialized = false;
    this.config = {
      debug: true,
      animationSpeed: 600,
      breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1200
      }
    };
  }

  async init() {
    if (this.isInitialized) return;
    try {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.bootstrap());
      } else {
        this.bootstrap();
      }
    } catch (error) {
      this.handleError('App initialization failed', error);
    }
  }

  bootstrap() {
    this.log('🚀 Initializing 88 Club Website...');

    // 핵심 모듈 초기화 순서
    const initOrder = [
      'ScrollEffects',
      'Navigation88', 
      'Animations',
      'ProjectToggle'
    ];

    initOrder.forEach(moduleName => {
      if (window[moduleName]) {
        const module = new window[moduleName]();
        this.modules.set(moduleName, module);
        module.init?.();
        this.log(`✅ ${moduleName} module loaded`);
      }
    });

    // 히어로 애니메이션 초기화
    this.initHeroAnimations();

    this.setupGlobalEvents();
    this.isInitialized = true;
    this.log('🎉 App initialized successfully');
  }

  /**
   * 히어로 섹션 등장 애니메이션 (타이틀, 서브타이틀, 버튼)
   */
  initHeroAnimations() {
    // DOMContentLoaded가 이미 보장됨
    const title = document.querySelector('.typing-title');
    const subtitle = document.querySelector('.sub-title');
    const btn = document.querySelector('.hero-cta');

    // 타이틀 등장
    if (title) {
      setTimeout(() => {
        title.classList.add('visible');
        // 서브타이틀 등장
        setTimeout(() => {
          if (subtitle) subtitle.classList.add('visible');
          // 버튼 등장
          setTimeout(() => {
            if (btn) {
              btn.style.opacity = '0';
              btn.style.transform = 'translateY(30px)';
              btn.style.transition = 'opacity 1s cubic-bezier(.77,0,.18,1), transform 1s cubic-bezier(.77,0,.18,1)';
              setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
              }, 50);
            }
          }, 400);
        }, 450);
      }, 350);
    }

    // particles.js 배경 초기화 (이미 적용되어 있다면 생략)
    if (window.particlesJS && document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        particles: {
          number: { value: 35, density: { enable: true, value_area: 800 } },
          color: { value: '#7f53ff' },
          line_linked: { enable: true, color: '#7f53ff' },
          move: { speed: 1.8 }
        },
        retina_detect: true
      });
    }
  }

  setupGlobalEvents() {
    // 성능 최적화된 리사이즈 핸들러
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.modules.forEach(module => {
          module.handleResize?.();
        });
      }, 250);
    });

    // 페이지 가시성 변경 처리
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.modules.forEach(module => module.pause?.());
      } else {
        this.modules.forEach(module => module.resume?.());
      }
    });

    // 키보드 접근성
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.modules.forEach(module => module.closeModal?.());
      }
    });
  }

  handleError(message, error) {
    console.error(`[88 Club] ${message}:`, error);
    if (this.config.debug) {
      document.body.insertAdjacentHTML('beforeend', 
        `<div class="error-toast">${message}</div>`);
    }
  }

  log(message) {
    if (this.config.debug) {
      console.log(`[88 Club] ${message}`);
    }
  }

  getModule(name) {
    return this.modules.get(name);
  }
}

// 전역 앱 인스턴스
window.App88 = new App();
window.App88.init();
