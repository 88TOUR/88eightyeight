/**
 * Animations Controller
 * 타이핑 효과, 페이드 인 등 인터랙티브 애니메이션 관리
 */

class Animations {
  constructor() {
    this.typingElement = document.getElementById('typed-word');
    this.words = ['쉼', '음', '맛', '향', '빛', '꿈'];
    this.currentWordIndex = 0;
    this.isTyping = false;
    this.typingSpeed = 150;
    this.deletingSpeed = 100;
    this.pauseTime = 2000;
    
    // 애니메이션 상태 관리
    this.animations = new Map();
    this.rafCallbacks = new Set();
  }

  init() {
    this.startTypingAnimation();
    this.initScrollAnimations();
    this.setupCounterAnimations();
  }

  /**
   * 타이핑 애니메이션 시작
   */
  startTypingAnimation() {
    if (!this.typingElement) return;
    
    this.typeWord();
  }

  /**
   * 단어 타이핑 효과
   */
  async typeWord() {
    if (this.isTyping) return;
    
    this.isTyping = true;
    const currentWord = this.words[this.currentWordIndex];
    
    // 타이핑 애니메이션
    for (let i = 0; i <= currentWord.length; i++) {
      await this.delay(this.typingSpeed);
      this.typingElement.textContent = currentWord.slice(0, i);
    }

    // 잠시 멈춤
    await this.delay(this.pauseTime);

    // 지우기 애니메이션
    for (let i = currentWord.length; i >= 0; i--) {
      await this.delay(this.deletingSpeed);
      this.typingElement.textContent = currentWord.slice(0, i);
    }

    // 다음 단어로 이동
    this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
    this.isTyping = false;
    
    // 재귀 호출로 무한 반복
    this.typeWord();
  }

  /**
   * 지연 함수 (Promise 기반)
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 스크롤 기반 애니메이션 초기화 (Intersection Observer 사용)
   */
  initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length === 0) return;

    // Intersection Observer 설정 (성능 최적화)
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerElementAnimation(entry.target);
          observer.unobserve(entry.target); // 한 번만 실행
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * 요소 애니메이션 트리거
   */
  triggerElementAnimation(element) {
    const animationType = element.dataset.animate || 'fadeInUp';
    const delay = parseInt(element.dataset.delay) || 0;
    
    setTimeout(() => {
      element.classList.add('animate-in', `animate-${animationType}`);
    }, delay);
  }

  /**
   * 카운터 애니메이션 설정
   */
  setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  }

  /**
   * 카운터 애니메이션 실행
   */
  animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = parseInt(element.dataset.duration) || 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuart 이징 함수
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(target * easeProgress);
      
      element.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * 페이드 인 애니메이션 (수동 트리거용)
   */
  fadeIn(element, duration = 600) {
    return new Promise(resolve => {
      element.style.opacity = '0';
      element.style.transition = `opacity ${duration}ms ease`;
      
      requestAnimationFrame(() => {
        element.style.opacity = '1';
        setTimeout(resolve, duration);
      });
    });
  }

  /**
   * 페이드 아웃 애니메이션
   */
  fadeOut(element, duration = 600) {
    return new Promise(resolve => {
      element.style.transition = `opacity ${duration}ms ease`;
      element.style.opacity = '0';
      setTimeout(resolve, duration);
    });
  }

  /**
   * 슬라이드 애니메이션
   */
  slideToggle(element, duration = 400) {
    if (element.style.maxHeight && element.style.maxHeight !== '0px') {
      // 슬라이드 업
      element.style.maxHeight = '0px';
      element.style.overflow = 'hidden';
    } else {
      // 슬라이드 다운
      element.style.maxHeight = element.scrollHeight + 'px';  
      setTimeout(() => {
        element.style.maxHeight = 'none';
        element.style.overflow = 'visible';
      }, duration);
    }
  }

  /**
   * 애니메이션 일시정지 (페이지 숨김시)
   */
  pause() {
    this.isTyping = false;
    this.rafCallbacks.clear();
  }

  /**
   * 애니메이션 재시작
   */
  resume() {
    if (!this.isTyping) {
      this.startTypingAnimation();
    }
  }

  /**
   * requestAnimationFrame 관리
   */
  addRAFCallback(callback) {
    this.rafCallbacks.add(callback);
  }

  removeRAFCallback(callback) {
    this.rafCallbacks.delete(callback);
  }
}

// 전역 등록
window.Animations = Animations;
