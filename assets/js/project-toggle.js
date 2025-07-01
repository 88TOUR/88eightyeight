/**
 * Project Toggle Controller
 * 프로젝트 카드 인터랙션 및 모달 관리
 */

class ProjectToggle {
  constructor() {
    this.projectCards = document.querySelectorAll('.project-card');
    this.modal = null;
    this.currentProject = null;
    this.isModalOpen = false;
    
    // 프로젝트 데이터
    this.projectData = {
      '쉼': {
        title: '삶에 쉼을 더하다',
        subtitle: '나만의 여행을 디자인하라',
        description: 'AI 기반 맞춤형 여행 코스 추천 서비스로, 개인의 취향과 상황을 분석하여 최적의 여행 코스를 제안합니다.',
        features: [
          '개인 맞춤형 여행 코스 생성',
          'AI 기반 숨은 명소 추천', 
          '실시간 날씨 및 교통 정보 연동',
          '여행 일정 공유 및 협업'
        ],
        tech: ['AI/ML', 'React', 'Node.js', 'Google Maps API'],
        status: '개발 중',
        image: 'assets/images/projects/travel/travel-hero.jpg'
      },
      '음': {
        title: '삶에 음을 더하다',
        subtitle: '감정을 아는 음악 추천',
        description: '사용자의 감정 상태와 상황을 인식하여 개인화된 음악을 추천하는 지능형 음악 서비스입니다.',
        features: [
          '감정 기반 음악 추천',
          '상황별 플레이리스트 자동 생성',
          '음악 취향 학습 알고리즘',
          '친구와 음악 공유 기능'
        ],
        tech: ['Emotion AI', 'Spotify API', 'Python', 'TensorFlow'],
        status: '기획 중',
        image: 'assets/images/projects/music/music-hero.jpg'
      },
      '맛': {
        title: '삶에 맛을 더하다',
        subtitle: '나만의 맛을 찾아서',
        description: '개인의 건강 정보와 취향을 고려한 맞춤형 요리 레시피 및 식당 추천 서비스입니다.',
        features: [
          '건강 상태 기반 레시피 추천',
          '냉장고 재료 활용 요리법',
          '알레르기 정보 고려 메뉴',
          '근처 맛집 개인화 추천'
        ],
        tech: ['Nutrition API', 'Computer Vision', 'Vue.js', 'Firebase'],
        status: '구상 중',
        image: 'assets/images/projects/food/food-hero.jpg'
      }
    };
  }

  init() {
    this.bindEvents();
    this.createModal();
    this.add3DEffect();
  }

  /**
   * 이벤트 바인딩
   */
  bindEvents() {
    // 모달이 열려 있으면 카드 클릭 무시
    if (this.isModalOpen && !e.target.classList.contains('modal-close') && !e.target.classList.contains('modal-overlay')) {
      return;
    }
    const projectCard = e.target.closest('.project-card');
    if (projectCard) {
      e.preventDefault();
      this.handleCardClick(projectCard);
      return;
    }
    // 이벤트 위임 사용 (성능 최적화)
    document.addEventListener('click', (e) => {
      const projectCard = e.target.closest('.project-card');
      if (projectCard) {
        e.preventDefault();
        this.handleCardClick(projectCard);
        return;
      }

      // 모달 닫기 처리
      if (e.target.classList.contains('modal-overlay') || 
          e.target.classList.contains('modal-close')) {
        this.closeModal();
      }
    });

    // 키보드 접근성
    this.projectCards.forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleCardClick(card);
        }
      });
    });
  }

  /**
   * 카드 클릭 처리
   */
  handleCardClick(card) {
    const projectType = card.dataset.project;
    if (!projectType || !this.projectData[projectType]) return;

    this.currentProject = projectType;
    this.openModal();
  }

  /**
   * 모달 DOM 생성
   */
  createModal() {

    if (document.getElementById('project-modal')) {
    this.modal = document.getElementById('project-modal');
    return;
  }
    const modalHTML = `
      <div class="modal-overlay" id="project-modal">
        <div class="modal project-modal">
          <button class="modal-close" aria-label="모달 닫기">&times;</button>
          <div class="modal-content">
            <div class="project-hero">
              <img class="project-image" src="" alt="" />
              <div class="project-info">
                <h2 class="project-title"></h2>
                <p class="project-subtitle"></p>
                <span class="project-status"></span>
              </div>
            </div>
            <div class="project-details">
              <div class="project-description"></div>
              <div class="project-features">
                <h3>주요 기능</h3>
                <ul class="features-list"></ul>
              </div>
              <div class="project-tech">
                <h3>기술 스택</h3>
                <div class="tech-tags"></div>
              </div>
              <div class="project-actions">
                <button class="btn btn-primary project-demo">데모 보기</button>
                <button class="btn btn-secondary project-github">GitHub</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('project-modal');
  }

  /**
   * 모달 열기
   */
  async openModal() {
    if (!this.currentProject) return;

    const projectInfo = this.projectData[this.currentProject];
    this.updateModalContent(projectInfo);

    // 모달 표시
    this.modal.classList.add('modal-show');
    this.isModalOpen = true;

    // 바디 스크롤 방지
    document.body.style.overflow = 'hidden';

    // 포커스 관리
    const closeButton = this.modal.querySelector('.modal-close');
    closeButton?.focus();

    // 애니메이션 트리거
    requestAnimationFrame(() => {
      this.modal.classList.add('modal-active');
    });

    // 버튼 이벤트 바인딩 (여기서!)
  const demoBtn = this.modal.querySelector('.project-demo');
  const githubBtn = this.modal.querySelector('.project-github');
  if (demoBtn) demoBtn.onclick = () => alert('데모 페이지는 준비 중입니다.');
  if (githubBtn) githubBtn.onclick = () => window.open('https://github.com/', '_blank');

  }

  /**
   * 모달 내용 업데이트
   */
  updateModalContent(projectInfo) {
    const elements = {
      image: this.modal.querySelector('.project-image'),
      title: this.modal.querySelector('.project-title'),
      subtitle: this.modal.querySelector('.project-subtitle'),
      status: this.modal.querySelector('.project-status'),
      description: this.modal.querySelector('.project-description'),
      featuresList: this.modal.querySelector('.features-list'),
      techTags: this.modal.querySelector('.tech-tags')
    };

    // 내용 업데이트
    elements.image.src = projectInfo.image;
    elements.image.alt = projectInfo.title;
    elements.title.textContent = projectInfo.title;
    elements.subtitle.textContent = projectInfo.subtitle;
    elements.status.textContent = projectInfo.status;
    elements.status.className = `project-status status-${projectInfo.status.replace(' ', '-')}`;
    elements.description.textContent = projectInfo.description;

    // 기능 리스트
    elements.featuresList.innerHTML = projectInfo.features
      .map(feature => `<li>${feature}</li>`)
      .join('');

    // 기술 태그
    elements.techTags.innerHTML = projectInfo.tech
      .map(tech => `<span class="tech-tag">${tech}</span>`)
      .join('');
  }


  /**
   * 3D 카드 효과 (마우스 이벤트)
   */
  add3DEffect() {
    this.projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  /**
   * ESC 키 모달 닫기
   */
  closeModal() {
  if (!this.isModalOpen) return;

  this.modal.classList.remove('modal-active');
  
  // 애니메이션 완료 후 숨김
  setTimeout(() => {
    this.modal.classList.remove('modal-show');
    this.isModalOpen = false;
    this.currentProject = null;
    // 바디 스크롤 복원
    document.body.style.overflow = '';
  }, 300);
}

}

// 전역 등록
window.ProjectToggle = ProjectToggle;
