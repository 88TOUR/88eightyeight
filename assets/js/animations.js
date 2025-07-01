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
    this.pauseTime = 2000;
    this.animations = new Map();
    this.rafCallbacks = new Set();

    // 커서(블링킹) 추가
    this.cursor = document.createElement('span');
    this.cursor.className = 'typing-cursor';
    this.cursor.textContent = '|';
    if (this.typingElement && !this.typingElement.nextSibling) {
      this.typingElement.parentNode.insertBefore(this.cursor, this.typingElement.nextSibling);
    }
  }

  init() {
    this.startTypingAnimation();
    this.initScrollAnimations();
    this.setupCounterAnimations();
    this.setupStaggerAnimations();
    this.setupHoverAnimations();
  }

  /**
   * 타이핑 애니메이션 시작
   */
  startTypingAnimation() {
    if (!this.typingElement) return;
    this.startCursorBlink();
    this.typeWord();
  }

  /**
   * 단어 타이핑 효과 (자연스러운 랜덤 속도)
   */
  async typeWord() {
    if (this.isTyping) return;
    this.isTyping = true;
    const currentWord = this.words[this.currentWordIndex];

    // 타이핑 애니메이션 (랜덤 속도)
    for (let i = 0; i <= currentWord.length; i++) {
      await this.delay(this.randomSpeed(90, 180));
      this.typingElement.textContent = currentWord.slice(0, i);
    }

    await this.delay(this.pauseTime);

    // 지우기 애니메이션 (랜덤 속도)
    for (let i = currentWord.length; i >= 0; i--) {
      await this.delay(this.randomSpeed(60, 120));
      this.typingElement.textContent = currentWord.slice(0, i);
    }

    this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
    this.isTyping = false;
    this.typeWord();
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  randomSpeed(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  startCursorBlink() {
    setInterval(() => {
      this.cursor.style.opacity = this.cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
  }

  /**
   * 스크롤 기반 애니메이션 초기화 (Intersection Observer 사용)
   */
  initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (animatedElements.length === 0) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerElementAnimation(entry.target);
          observer.unobserve(entry.target);
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
   * ⭐️ 스태거 애니메이션 (부모에 data-stagger)
   */
  setupStaggerAnimations() {
    document.querySelectorAll('[data-stagger]').forEach(parent => {
      const children = parent.querySelectorAll('[data-animate]');
      children.forEach((el, i) => {
        el.dataset.delay = i * 120 + (parseInt(el.dataset.delay) || 0);
      });
    });
  }

  /**
   * ⭐️ 카드/버튼 호버 애니메이션 강화
   */
  setupHoverAnimations() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hover-animate');
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hover-animate');
      });
    });
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.classList.add('hover-animate');
      });
      btn.addEventListener('mouseleave', () => {
        btn.classList.remove('hover-animate');
      });
    });
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

    // stat-number span 찾기
    const numberEl = element.querySelector('.stat-number');
    if (!numberEl) return;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(target * easeProgress);

      numberEl.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

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

  fadeOut(element, duration = 600) {
    return new Promise(resolve => {
      element.style.transition = `opacity ${duration}ms ease`;
      element.style.opacity = '0';
      setTimeout(resolve, duration);
    });
  }

  slideToggle(element, duration = 400) {
    if (element.style.maxHeight && element.style.maxHeight !== '0px') {
      element.style.maxHeight = '0px';
      element.style.overflow = 'hidden';
    } else {
      element.style.maxHeight = element.scrollHeight + 'px';
      setTimeout(() => {
        element.style.maxHeight = 'none';
        element.style.overflow = 'visible';
      }, duration);
    }
  }

  pause() {
    this.isTyping = false;
    this.rafCallbacks.clear();
  }

  resume() {
    if (!this.isTyping) {
      this.startTypingAnimation();
    }
  }

  addRAFCallback(callback) {
    this.rafCallbacks.add(callback);
  }

  removeRAFCallback(callback) {
    this.rafCallbacks.delete(callback);
  }
}

// 전역 등록
window.Animations = Animations;
