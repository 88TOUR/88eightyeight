/**
 * 88 Club Website - Main Controller
 * 전역 초기화 및 모듈 통합 관리
 */

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

  /**
   * 애플리케이션 초기화
   */
  async init() {
    if (this.isInitialized) return;

    try {
      // DOM 준비 확인
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.bootstrap());
      } else {
        this.bootstrap();
      }
    } catch (error) {
      this.handleError('App initialization failed', error);
    }
  }

  /**
   * 모듈 부트스트랩
   */
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

    this.setupGlobalEvents();
    this.isInitialized = true;
    this.log('🎉 App initialized successfully');
  }

  

  /**
   * 전역 이벤트 설정
   */
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

  /**
   * 에러 핸들링
   */
  handleError(message, error) {
    console.error(`[88 Club] ${message}:`, error);
    
    // 프로덕션에서는 에러 리포팅 가능
    if (this.config.debug) {
      document.body.insertAdjacentHTML('beforeend', 
        `<div class="error-toast">${message}</div>`);
    }
  }

  /**
   * 디버그 로깅
   */
  log(message) {
    if (this.config.debug) {
      console.log(`[88 Club] ${message}`);
    }
  }

  /**
   * 모듈 가져오기
   */
  getModule(name) {
    return this.modules.get(name);
  }
}

// 전역 앱 인스턴스
window.App88 = new App();

// 자동 초기화
window.App88.init();
