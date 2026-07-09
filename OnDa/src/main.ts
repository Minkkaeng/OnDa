// --- Import Styles ---
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages/landing.css';
import './styles/pages/onboarding.css';
import './styles/pages/home.css';
import './styles/pages/care.css';
import './styles/pages/calendar.css';
import './styles/pages/settings.css';
import './styles/pages/diary.css';
import './styles/responsive.css';

// --- Import Assets ---
import { renderLanding, setupLandingInteraction } from './views/landing';
import { renderOnboarding, setupOnboardingInteraction } from './views/onboarding';
import { renderHome, setupHomeInteraction } from './views/home';
import { renderCare, setupCareInteraction } from './views/care';
import { renderCalendar, setupCalendarInteraction } from './views/calendar';
import { renderSettings, setupSettingsInteraction } from './views/settings';
import { renderProfile, setupProfileInteraction } from './views/profile';
import { renderDiary, setupDiaryInteraction } from './views/diary';


// --- Layout Injection ---
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <!-- 0. Intro Splash Screen -->
  <div id="intro-splash" class="intro-splash">
    <div class="splash-content">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 130" style="height: 80px; margin-bottom: 24px;">
        <circle cx="60" cy="55" r="30" fill="none" stroke="#14C3A3" stroke-width="16"/>
        <path d="M 115 85 V 45" fill="none" stroke="#14C3A3" stroke-width="16" stroke-linecap="round"/>
        <path d="M 115 55 C 115 35, 155 35, 155 55 V 85" fill="none" stroke="#14C3A3" stroke-width="16" stroke-linecap="round"/>
        <path d="M 185 25 V 85" fill="none" stroke="#14C3A3" stroke-width="16" stroke-linecap="round"/>
        <path d="M 185 25 C 235 25, 235 85, 185 85" fill="none" stroke="#14C3A3" stroke-width="16" stroke-linecap="round"/>
        <path d="M 255 85 L 275 25 L 295 85" fill="none" stroke="#121B2A" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 275 68 C 275 68, 263 56, 263 48 A 8 8 0 0 1 275 44 A 8 8 0 0 1 287 48 C 287 56, 275 68, 275 68 Z" fill="#14C3A3"/>
      </svg>
      <h2 style="color: var(--deep-navy); margin: 0; font-size: 1.5rem;">OnDa Pet Care</h2>
    </div>
  </div>

  <div class="web-layout">
    
    <!-- 1. Global Web Header -->
    <header class="web-header">
      <div class="header-left">
        <!-- SVG Logo matching attached image -->
        <a href="#main" class="brand-logo-link" style="text-decoration: none; display: flex; align-items: center;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 130" style="height: 52px; margin-right: 12px;">
            <circle cx="60" cy="55" r="30" fill="none" stroke="#14C3A3" stroke-width="16"/>
            <path d="M 115 85 V 45" fill="none" stroke="#14C3A3" stroke-width="16" stroke-linecap="round"/>
            <path d="M 115 55 C 115 35, 155 35, 155 55 V 85" fill="none" stroke="#14C3A3" stroke-width="16" stroke-linecap="round"/>
            <path d="M 185 25 V 85" fill="none" stroke="#14C3A3" stroke-width="16" stroke-linecap="round"/>
            <path d="M 185 25 C 235 25, 235 85, 185 85" fill="none" stroke="#14C3A3" stroke-width="16" stroke-linecap="round"/>
            <path d="M 255 85 L 275 25 L 295 85" fill="none" stroke="#121B2A" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M 275 68 C 275 68, 263 56, 263 48 A 8 8 0 0 1 275 44 A 8 8 0 0 1 287 48 C 287 56, 275 68, 275 68 Z" fill="#14C3A3"/>
          </svg>
        </a>
        <nav class="header-nav">
          <a href="#main" class="gnb-item active" id="nav-main">메인 (Main)</a>
          <a href="#dashboard" class="gnb-item" id="nav-dashboard">대시보드 (Dashboard)</a>
          <a href="#care" class="gnb-item" id="nav-care">케어 (Care)</a>
          <a href="#cal" class="gnb-item" id="nav-cal">캘린더 (Cal)</a>
          <a href="#diary" class="gnb-item" id="nav-diary">기록일기 (Diary)</a>
          <a href="#set" class="gnb-item" id="nav-set">설정 (Set)</a>
          <div class="mobile-nav-footer" style="display: none;">
            <p>
              프로필 관리 | 고객센터 | <b>개인정보처리방침</b><br/><br/>
              © OnDa Pet Care Web-App.<br/>All Rights Reserved.
            </p>
          </div>
        </nav>
      </div>

      <div class="header-right">
        <button class="premium-btn">PREMIUM</button>
        <button class="hamburger-btn" style="display: none; background: none; border: none; cursor: pointer; color: var(--deep-navy);">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>

    <!-- 2. Center Content Area (Router View) -->
    <main class="content-center" id="router-view"></main>

    <!-- 3. Global Bottom Footer -->
    <footer class="web-footer">
      <p>
        프로필 수정 및 관리 | 고객센터 및 1:1 문의 채널 | 공지사항 및 업데이트 정보 | 자주 묻는 질문(FAQ) | 서비스 이용약관 | <b>개인정보처리방침</b><br/>
        © OnDa Pet Care Web-App. All Rights Reserved. Designed for Desktop Web Environments.
      </p>
    </footer>

  </div>
`;

// --- Router Logic ---

const routerView = document.getElementById('router-view')!;

const updateNavUI = (hash: string) => {
  document.querySelectorAll('.gnb-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.getElementById('nav-' + hash);
  if (activeNav) activeNav.classList.add('active');
};

const setupCommonInteractions = () => {
  const toggleGroup = document.querySelector('.toggle-group');
  if (toggleGroup) {
    toggleGroup.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('toggle-btn')) {
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
      }
    });
  }


  document.querySelectorAll('.set-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = (e.target as HTMLElement).textContent;
      if (text?.includes('Export')) {
        alert('데이터 백업 파일(JSON) 내보내기가 완료되었습니다.');
      } else if (text?.includes('Import')) {
        alert('데이터 복원이 성공적으로 완료되었습니다.');
      }
    });
  });
};

const navigate = () => {
  let hash = window.location.hash.replace('#', '');
  if (!['main', 'dashboard', 'care', 'cal', 'diary', 'set', 'profile', 'onboarding'].includes(hash)) {
    hash = 'main';
  }

  updateNavUI(hash);

  const headerNav = document.querySelector('.header-nav');
  if (headerNav) {
    headerNav.classList.remove('menu-open');
  }

  const header = document.querySelector('.web-header') as HTMLElement;
  const footer = document.querySelector('.web-footer') as HTMLElement;
  if (hash === 'onboarding') {
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
  } else {
    if (header) header.style.display = 'flex';
    if (footer) footer.style.display = 'block';
  }

  switch (hash) {
    case 'onboarding':
      routerView.innerHTML = renderOnboarding();
      setupOnboardingInteraction();
      break;
    case 'main':
      routerView.innerHTML = renderLanding();
      setupLandingInteraction();
      break;
    case 'dashboard':
      routerView.innerHTML = renderHome();
      setupHomeInteraction();
      break;
    case 'care':
      routerView.innerHTML = renderCare();
      setupCareInteraction();
      break;
    case 'cal':
      routerView.innerHTML = renderCalendar();
      setupCalendarInteraction();
      break;
    case 'diary':
      routerView.innerHTML = renderDiary();
      setupDiaryInteraction();
      break;
    case 'set':
      routerView.innerHTML = renderSettings();
      setupSettingsInteraction();
      break;
    case 'profile':
      routerView.innerHTML = renderProfile();
      setupProfileInteraction();
      break;
  }

  setupCommonInteractions();
};

window.addEventListener('hashchange', navigate);

// Initial load and Intro Logic
const checkFirstRunAndNavigate = () => {
  const isFirstRun = localStorage.getItem('isFirstRun');
  const splash = document.getElementById('intro-splash');
  
  if (!isFirstRun) {
    // First time running the app, keep it false until they finish onboarding
    window.location.hash = 'onboarding';
  } else {
    // Not the first run, proceed with normal navigation
    navigate();
  }

  // Handle splash screen fade out
  if (splash) {
    setTimeout(() => {
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.style.display = 'none';
      }, 500); // wait for CSS transition
    }, 2000); // Show splash for 2 seconds
  }
};

checkFirstRunAndNavigate();

// Premium Button Interaction (Outside router as it's in header)
const premiumBtn = document.querySelector('.premium-btn');
if (premiumBtn) {
  premiumBtn.addEventListener('click', () => {
    alert('프리미엄 멤버십 안내 페이지로 이동합니다.');
  });
}

// Hamburger Menu Logic
const hamburgerBtn = document.querySelector('.hamburger-btn');
const headerNav = document.querySelector('.header-nav');
if (hamburgerBtn && headerNav) {
  hamburgerBtn.addEventListener('click', () => {
    headerNav.classList.toggle('menu-open');
  });
}
