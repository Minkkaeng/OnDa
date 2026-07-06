export const renderSettings = () => `
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
          <div id="push-toggle" style="width: 48px; height: 24px; background: var(--mint-green); border-radius: 12px; position: relative; cursor: pointer; transition: background 0.3s;">
            <div id="push-knob" style="width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; left: 2px; top: 2px; transform: translateX(24px); transition: transform 0.3s;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="care-col" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fafafa;">
      <span class="ad-badge" style="background: var(--error-red); margin-bottom: 16px;">SPONSOR AD</span>
      <h3 style="margin-bottom: 8px;">OnDa 안심 유기농 샴푸</h3>
      <p style="text-align: center; color: var(--muted-gray); font-size: 0.9rem;">화학 성분 0%, 천연 보습 인자로 민감성 피부 케어 전용 스펙 출시!</p>
    </div>
  </div>
`;

export const setupSettingsInteraction = () => {
  const pushToggle = document.getElementById('push-toggle');
  const pushKnob = document.getElementById('push-knob');
  if (pushToggle && pushKnob) {
    let isPushActive = true;
    pushToggle.addEventListener('click', () => {
      isPushActive = !isPushActive;
      if (isPushActive) {
        pushToggle.style.background = 'var(--mint-green)';
        pushKnob.style.transform = 'translateX(24px)';
      } else {
        pushToggle.style.background = 'var(--steel-gray)';
        pushKnob.style.transform = 'translateX(0px)';
      }
    });
  }
};
