
import { renderProfileCard, setupProfileCardInteraction } from '../components/ProfileCard';

export const renderHome = () => {

  return `
  <!-- 1. Profile Info Card -->
  ${renderProfileCard()}

  <!-- 2. AD Zone -->
  <div class="ad-zone-top" style="margin-bottom: 24px;">
    <div style="flex-grow: 1;">
      <span class="ad-badge">AD ZONE</span>
      <div style="margin-top: 12px;">
        <p class="ad-text" style="font-weight: 700; font-size: 1.1rem;">내 손안의 반려동물 주치의, 프리미엄 온다 케어 멤버십 오픈!</p>
        <p class="ad-subtext" style="color: #555;">실시간 전문가 비대면 상담 및 맞춤형 케어 솔루션 정식 런칭</p>
      </div>
    </div>
  </div>

  <!-- 3. Care Task List -->
  <div>
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
};

export const setupHomeInteraction = () => {
  setupProfileCardInteraction();
};
