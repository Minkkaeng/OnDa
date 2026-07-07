import { renderProfileCard, setupProfileCardInteraction } from '../components/ProfileCard';
import { addCalendarEvent, getActivePet } from '../store';

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

  <!-- 3. Quick Walk Form -->
  <div class="panel" style="margin-bottom: 24px;">
    <h3 style="margin-bottom: 16px; font-size: 1.25rem;">오늘의 산책 기록</h3>
    <div class="form-group" style="margin-bottom: 16px;">
      <label class="form-label">산책 시간 및 목표</label>
      <div style="display: flex; gap: 8px;">
        <button id="walk-time-btn" class="form-input" style="text-align: center; cursor: pointer;">19:00</button>
        <div id="walk-timer-display" class="form-input" style="display: flex; align-items: center; justify-content: center; font-variant-numeric: tabular-nums; font-weight: 700; background: var(--ice-white); color: var(--mint-green); font-size: 1.1rem;">
          00:00
        </div>
      </div>
    </div>
    <div id="walk-actions" style="display: flex; gap: 8px;">
      <button id="walk-start-btn" class="btn-submit" style="flex: 1;">시작하기</button>
      <button id="walk-finish-btn" class="btn-submit" style="flex: 1; display: none; background-color: var(--muted-gray); border-color: var(--muted-gray);">완료하기</button>
    </div>
  </div>

  <!-- 4. Care Task List -->
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

  <!-- Time Picker Modal -->
  <div id="time-picker-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
    <div class="modal-content" style="background: white; padding: 24px; border-radius: 12px; width: 90%; max-width: 320px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
      <h4 style="margin-bottom: 20px; color: var(--deep-navy); font-size: 1.1rem;">산책 목표 시간 입력</h4>
      <div style="display: flex; gap: 12px; justify-content: center; align-items: center; margin-bottom: 24px;">
        <input type="number" id="time-picker-hour" min="0" max="23" value="19" class="form-input" style="width: 80px; text-align: center; font-size: 1.2rem; font-weight: bold;">
        <span style="font-size: 1.5rem; font-weight: bold; color: var(--deep-navy);">:</span>
        <input type="number" id="time-picker-minute" min="0" max="59" value="00" class="form-input" style="width: 80px; text-align: center; font-size: 1.2rem; font-weight: bold;">
      </div>
      <div style="display: flex; gap: 8px;">
        <button id="time-picker-cancel" class="btn-submit" style="flex: 1; background-color: var(--muted-gray); border-color: var(--muted-gray);">취소</button>
        <button id="time-picker-confirm" class="btn-submit" style="flex: 1;">확인</button>
      </div>
    </div>
  </div>
  `;
};

export const setupHomeInteraction = () => {
  setupProfileCardInteraction();

  const walkBtn = document.getElementById('walk-start-btn') as HTMLButtonElement;
  let walkInterval: number | null = null;
  let walkStartTime: number = 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const timerDisplay = document.getElementById('walk-timer-display');
  const finishBtn = document.getElementById('walk-finish-btn') as HTMLButtonElement;
  let totalElapsedSec = 0;

  // Time Picker Logic
  const timeBtn = document.getElementById('walk-time-btn');
  const timeModal = document.getElementById('time-picker-modal');
  const timeCancel = document.getElementById('time-picker-cancel');
  const timeConfirm = document.getElementById('time-picker-confirm');
  const timeHour = document.getElementById('time-picker-hour') as HTMLInputElement;
  const timeMinute = document.getElementById('time-picker-minute') as HTMLInputElement;

  if (timeBtn && timeModal && timeCancel && timeConfirm && timeHour && timeMinute) {
    timeBtn.addEventListener('click', () => {
      timeModal.style.display = 'flex';
    });

    timeCancel.addEventListener('click', () => {
      timeModal.style.display = 'none';
    });

    timeModal.addEventListener('click', (e) => {
      if (e.target === timeModal) {
        timeModal.style.display = 'none';
      }
    });

    timeConfirm.addEventListener('click', () => {
      let h = timeHour.value;
      let m = timeMinute.value;
      if (!h) h = '00';
      if (!m) m = '00';
      timeBtn.textContent = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
      timeModal.style.display = 'none';
    });
  }

  if (walkBtn && finishBtn && timerDisplay) {
    walkBtn.addEventListener('click', () => {
      const text = walkBtn.textContent || '';

      if (text === '시작하기') {
        // Initial start
        totalElapsedSec = 0;
        walkStartTime = Date.now();
        walkBtn.textContent = '중단하기';
        walkBtn.style.backgroundColor = '#4CE0C4'; // Lighter mint green
        walkBtn.style.borderColor = '#4CE0C4';
        timerDisplay.style.color = 'var(--mint-green)';
        timerDisplay.textContent = '00:00';

        finishBtn.style.display = 'block';

        walkInterval = window.setInterval(() => {
          const currentElapsed = Math.floor((Date.now() - walkStartTime) / 1000);
          timerDisplay.textContent = formatTime(currentElapsed);
        }, 1000);

      } else if (text === '중단하기') {
        // Pause walk
        if (walkInterval) {
          clearInterval(walkInterval);
          walkInterval = null;
        }
        totalElapsedSec += Math.floor((Date.now() - walkStartTime) / 1000);
        walkBtn.textContent = '재시작';
        walkBtn.style.backgroundColor = 'var(--mint-green)';
        walkBtn.style.borderColor = 'var(--mint-green)';
        timerDisplay.style.color = 'var(--mint-green)';

      } else if (text === '재시작') {
        // Resume
        walkStartTime = Date.now() - (totalElapsedSec * 1000);
        walkBtn.textContent = '중단하기';
        walkBtn.style.backgroundColor = '#4CE0C4'; // Lighter mint green
        walkBtn.style.borderColor = '#4CE0C4';
        timerDisplay.style.color = 'var(--mint-green)';

        walkInterval = window.setInterval(() => {
          const currentElapsed = Math.floor((Date.now() - walkStartTime) / 1000);
          timerDisplay.textContent = formatTime(currentElapsed);
        }, 1000);
      }
    });

    finishBtn.addEventListener('click', () => {
      if (walkInterval) {
        clearInterval(walkInterval);
        walkInterval = null;
      }
      
      // Keep the current elapsed time on display
      timerDisplay.style.color = 'var(--mint-green)';
      
      // Save to calendar
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      addCalendarEvent({
        petId: getActivePet().id,
        date: dateStr,
        type: 'diary',
        title: '🐶 산책 완료!',
        content: `총 산책 시간: ${timerDisplay.textContent} / 목표 시간: ${timeBtn.textContent}`
      });
      
      alert('산책 기록이 캘린더에 성공적으로 저장되었습니다!');
      
      // Reset UI
      walkBtn.textContent = '시작하기';
      walkBtn.style.backgroundColor = '';
      walkBtn.style.borderColor = '';
      finishBtn.style.display = 'none';
    });
  }
};
