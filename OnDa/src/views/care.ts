import { getActivePet } from '../store';
import { renderProfileCard, setupProfileCardInteraction } from '../components/ProfileCard';

export const renderCare = () => {
  const activePet = getActivePet();
  return `
  ${renderProfileCard()}
  <div class="care-layout">
    <!-- Left Form -->
    <div class="care-col">
      <h2 class="care-title">${activePet.name}의 케어 정보 등록 및 수정</h2>
      
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
};

export const setupCareInteraction = () => {
  setupProfileCardInteraction();
};
