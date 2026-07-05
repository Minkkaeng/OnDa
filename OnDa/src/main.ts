import './style.css'
import heroImg from './assets/hero.png'

// --- View Renderers ---

const renderHome = () => `
  <div class="ad-zone-top">
    <div style="flex-grow: 1;">
      <span class="ad-badge">AD ZONE</span>
      <div style="margin-top: 12px;">
        <p class="ad-text">내 손안의 반려동물 주치의, 프리미엄 온다 케어 멤버십 오픈!</p>
        <p class="ad-subtext">실시간 전문가 비대면 상담 및 맞춤형 케어 솔루션 정식 런칭</p>
      </div>
    </div>
  </div>

  <div style="margin-top: 24px;">
    <h2 class="section-title">초코의 케어 상태 요약</h2>
    <div class="task-list">
      <div class="task-card">
        <div class="task-info">
          <h3>영양제 및 사료 급여</h3>
          <p>오전 루틴 정상 급여 완료</p>
        </div>
        <div class="task-status completed">완료 09:30</div>
      </div>
      <div class="task-card">
        <div class="task-info">
          <h3>위생 케어 및 브러싱</h3>
          <p>기본 피모 정돈 및 위생 케어 완료</p>
        </div>
        <div class="task-status completed">완료 14:00</div>
      </div>
      <div class="task-card pending">
        <div class="task-info">
          <h3>저녁 정기 산책 예정</h3>
          <p>보호자 동반 야외 활동 예정</p>
        </div>
        <div class="task-status pending">대기 18:00</div>
      </div>
    </div>
  </div>
`;

const renderCare = () => `
  <div class="care-layout">
    <!-- Left Form -->
    <div class="care-col">
      <h2 class="care-title">케어 정보 등록 및 수정</h2>
      
      <div class="form-group">
        <label class="form-label">보유 질병 및 주의 특이사항</label>
        <input type="text" class="form-input" value="만성 안구 건조증, 알레르기 피부염 주의" />
      </div>

      <div class="form-group">
        <label class="form-label">약 복용 및 투여 주기 설정</label>
        <div class="toggle-group" style="margin-bottom: 8px;">
          <button class="toggle-btn active">알약</button>
          <button class="toggle-btn">물약</button>
          <button class="toggle-btn">주사</button>
        </div>
        <input type="text" class="form-input" value="심장사상충 예방약 1개월 단위 반복 세팅" />
      </div>

      <div class="form-group">
        <label class="form-label">산책 시간 및 목표 타이머 설정</label>
        <div style="display: flex; gap: 8px;">
          <input type="text" class="form-input" value="오후 07:00 지정" />
          <input type="text" class="form-input" value="30분 정기 목표 설정" />
        </div>
      </div>

      <button class="btn-submit">저장 및 업데이트</button>
    </div>

    <!-- Right Scheduler -->
    <div class="care-col" style="background: transparent; border: none; padding: 0;">
      <h2 class="care-title" style="border-color: #FF4D4D; color: #FF4D4D;">연동 실시간 스케줄러</h2>
      <div class="task-list">
        <div class="task-card" style="border-color: var(--mint-green);">
          <div class="task-info">
            <h3>만성 안구 건조증 안약 투여</h3>
            <p>오전 10:00 / 정기 복용 완료 상태</p>
          </div>
          <div class="task-status completed">완료 10:05</div>
        </div>
        <div class="task-card pending" style="background: transparent;">
          <div class="task-info">
            <h3>저녁 정기 산책 (30분 목표)</h3>
            <p>오후 07:00 / 실시간 보호자 동반 산책</p>
          </div>
          <div class="task-status pending" style="border: 1px solid var(--error-red); padding: 4px 12px; border-radius: 20px;">대기중</div>
        </div>
      </div>
    </div>
  </div>
`;

const renderCalendar = () => `
  <div class="cal-layout">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 style="font-size: 1.5rem; font-weight: 800;">2026.07</h2>
      <span class="ad-badge" style="background: #3b82f6;">7열 대화면 캘린더 (View)</span>
    </div>

    <div class="cal-header-row">
      <div style="color: var(--error-red);">일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div style="color: #3b82f6;">토</div>
    </div>

    <div class="cal-grid">
      <div class="cal-day sun" style="opacity: 0.4;">28</div><div class="cal-day" style="opacity: 0.4;">29</div><div class="cal-day" style="opacity: 0.4;">30</div>
      <div class="cal-day">1</div><div class="cal-day">2</div><div class="cal-day">3</div><div class="cal-day sat">4</div>
      <div class="cal-day sun">5</div><div class="cal-day">6</div><div class="cal-day">7</div><div class="cal-day active">8</div><div class="cal-day">9</div><div class="cal-day">10</div><div class="cal-day sat">11</div>
      <div class="cal-day sun">12</div><div class="cal-day">13</div><div class="cal-day">14</div><div class="cal-day">15</div><div class="cal-day">16</div><div class="cal-day">17</div><div class="cal-day sat">18</div>
      <div class="cal-day sun">19</div><div class="cal-day">20</div><div class="cal-day">21</div><div class="cal-day">22</div><div class="cal-day">23</div><div class="cal-day">24</div><div class="cal-day sat">25</div>
      <div class="cal-day sun">26</div><div class="cal-day">27</div><div class="cal-day">28</div><div class="cal-day">29</div><div class="cal-day">30</div><div class="cal-day">31</div><div class="cal-day sat" style="opacity: 0.4;">1</div>
    </div>

    <div class="cal-editor">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2 style="font-size: 1.25rem;">7월 8일 일상: 초코의 원반 캐치!</h2>
        <span style="font-size: 0.875rem; color: var(--muted-gray);">날씨: 맑음 | 기분: 매우 좋음</span>
      </div>
      <textarea placeholder="오늘 오후에는 드디어 넓은 잔디 공원으로 나가 원반 던지기 놀이를 했다. 초코가 눈을 반짝이며 날아가는 원반을 완벽하게 공중 캐치하는 데 성공!">오늘 오후에는 드디어 넓은 잔디 공원으로 나가 원반 던지기 놀이를 했다. 초코가 눈을 반짝이며 날아가는 원반을 완벽하게 공중 캐치하는 데 성공!</textarea>
      <button class="btn-submit">저장 및 수정하기</button>
    </div>
  </div>
`;

const renderSettings = () => `
  <div class="set-warning">
    ⚠ 주의: 브라우저 캐시 청소 및 로컬 저장소 비우기 수행 시 기존 데이터가 완전 소멸될 수 있습니다.
  </div>

  <div class="care-layout">
    <div class="care-col" style="flex: 2;">
      <h2 class="care-title">시스템 데이터 관리</h2>
      <div class="set-list">
        <div class="set-item">
          <div class="set-info">
            <h4>백업 파일 내보내기</h4>
            <p>현재까지 기록된 모든 데이터를 JSON 파일로 다운로드합니다.</p>
          </div>
          <button class="set-btn">Export / 내보내기</button>
        </div>
        <div class="set-item">
          <div class="set-info">
            <h4>데이터 복원 가져오기</h4>
            <p>이전에 백업 완료한 JSON 파일을 로드하여 동기화합니다.</p>
          </div>
          <button class="set-btn secondary">Import / 가져오기</button>
        </div>
        <div class="set-item" style="border: none;">
          <div class="set-info">
            <h4>로컬 실시간 푸시 알림</h4>
            <p>예약된 케어 투약 시간 및 스케줄 브라우저 알림 토글</p>
          </div>
          <div style="width: 48px; height: 24px; background: var(--mint-green); border-radius: 12px; position: relative;">
            <div style="width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; right: 2px; top: 2px;"></div>
          </div>
        </div>
      </div>

      <div class="set-footer">
        프로필 수정 및 관리 | 고객센터 및 1:1 문의 채널 | 공지사항 및 업데이트 정보 | 자주 묻는 질문(FAQ) | 서비스 이용약관 | <b>개인정보처리방침</b><br/><br/>
        © OnDa Pet Care Web-App. All Rights Reserved. Designed for Desktop Environments.
      </div>
    </div>

    <div class="care-col" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fafafa;">
      <span class="ad-badge" style="background: var(--error-red); margin-bottom: 16px;">SPONSOR AD</span>
      <h3 style="margin-bottom: 8px;">OnDa 안심 유기농 샴푸</h3>
      <p style="text-align: center; color: var(--muted-gray); font-size: 0.875rem;">화학 성분 0%, 천연 보습 인자로 민감성 피부 케어 전용 스펙 출시!</p>
    </div>
  </div>
`;

// --- Layout Injection ---

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="desktop-layout">
    <!-- 1. Left Vertical GNB -->
    <nav class="gnb-left">
      <div class="brand-logo">ONDA<span>•</span></div>
      <ul class="gnb-menu">
        <a href="#home" class="gnb-item" id="nav-home">홈 (Home)</a>
        <a href="#care" class="gnb-item" id="nav-care">케어 (Care)</a>
        <a href="#cal" class="gnb-item" id="nav-cal">캘린더 (Cal)</a>
        <a href="#set" class="gnb-item" id="nav-set">설정 (Set)</a>
      </ul>
      <button class="premium-btn">PREMIUM</button>
    </nav>

    <!-- 2. Center Content Area (Router View) -->
    <main class="content-center" id="router-view"></main>

    <!-- 3. Right Vertical Profile -->
    <aside class="profile-right">
      <div class="profile-header">
        <span class="my-pet-badge">MY PET</span>
        <img src="${heroImg}" alt="초코 프로필 사진" class="profile-img" />
        <h2 class="profile-name">초코 <span>(토이푸들)</span></h2>
        <p class="profile-desc">올해 2세 • 남아 • 3.2kg</p>
      </div>
      <div class="sync-status">
        <div class="sync-title">실시간 동기화 상태</div>
        <div class="sync-item success">디바이스 연결: 정상</div>
        <div class="sync-item success">센서 측정: 송신 중</div>
        <div class="sync-item success">정기 업데이트: 완료</div>
      </div>
    </aside>
  </div>
`;

// --- Router Logic ---

const routerView = document.getElementById('router-view')!;

const updateNavUI = (hash: string) => {
  document.querySelectorAll('.gnb-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.getElementById('nav-' + hash);
  if (activeNav) activeNav.classList.add('active');
};

const navigate = () => {
  let hash = window.location.hash.replace('#', '');
  if (!hash) hash = 'home'; // Default route

  updateNavUI(hash);

  switch (hash) {
    case 'home':
      routerView.innerHTML = renderHome();
      break;
    case 'care':
      routerView.innerHTML = renderCare();
      break;
    case 'cal':
      routerView.innerHTML = renderCalendar();
      break;
    case 'set':
      routerView.innerHTML = renderSettings();
      break;
    default:
      routerView.innerHTML = renderHome();
      updateNavUI('home');
      break;
  }
};

window.addEventListener('hashchange', navigate);
// Initial load
navigate();
