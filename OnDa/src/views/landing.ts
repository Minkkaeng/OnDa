export const renderLanding = () => {
  return `
    <div class="landing-container">
      <section class="landing-hero">
        <h1 style="color: var(--mint-green);">내 손안의 반려동물 주치의<br><span style="color: var(--deep-navy);">OnDa Pet Care</span></h1>
        <p>전문적인 케어부터 일정 관리, 건강 기록까지.<br>우리 아이를 위한 완벽한 맞춤형 솔루션을 경험해보세요.</p>
        <a href="#dashboard" class="btn-primary" id="btn-start">대시보드 시작하기</a>
      </section>

      <section class="landing-features">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <h3>프리미엄 케어 솔루션</h3>
          <p>전문가의 맞춤형 조언과 실시간 비대면 상담으로 우리 아이의 건강을 빈틈없이 관리하세요.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3>스마트 일정 관리</h3>
          <p>사료 급여, 산책, 병원 방문 등 잊기 쉬운 일정들을 꼼꼼하게 알림으로 챙겨드립니다.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          <h3>소중한 기록 일기</h3>
          <p>하루하루 성장하는 모습과 특별한 순간들을 사진과 함께 다이어리로 간직해보세요.</p>
        </div>
      </section>
    </div>
  `;
};

export const setupLandingInteraction = () => {
  // Any specific interactions for the landing page can go here
};
