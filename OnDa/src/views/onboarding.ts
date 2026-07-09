import { registerNewPet } from '../store';
import heroImg from '../assets/hero.png'; // 기본 이미지 사용 가능

export const renderOnboarding = () => {
  return `
    <div class="onboarding-container panel">
      <div class="onboarding-header">
        <h1>반려견 프로필 등록</h1>
        <p>OnDa Pet Care와 함께할 우리 아이를 소개해주세요.</p>
      </div>

      <div class="avatar-upload">
        <div class="avatar-preview" id="ob-avatar-btn">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </div>
      </div>

      <div class="onboarding-form">
        <div class="form-group">
          <label class="form-label">이름</label>
          <input type="text" id="ob-name" class="form-input" placeholder="예) 초코" required>
        </div>
        <div class="form-group">
          <label class="form-label">견종</label>
          <input type="text" id="ob-breed" class="form-input" placeholder="예) 토이 푸들" required>
        </div>
        <div class="form-group">
          <label class="form-label">생년월일</label>
          <input type="date" id="ob-birth" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">몸무게 (kg)</label>
          <input type="number" id="ob-weight" class="form-input" placeholder="예) 4.2" step="0.1" required>
        </div>
      </div>

      <div class="onboarding-footer">
        <button id="ob-submit-btn" class="btn-submit">등록 완료 및 시작하기</button>
      </div>
    </div>
  `;
};

export const setupOnboardingInteraction = () => {
  const submitBtn = document.getElementById('ob-submit-btn');
  const nameInput = document.getElementById('ob-name') as HTMLInputElement;
  const breedInput = document.getElementById('ob-breed') as HTMLInputElement;
  const birthInput = document.getElementById('ob-birth') as HTMLInputElement;
  const weightInput = document.getElementById('ob-weight') as HTMLInputElement;

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const breed = breedInput.value.trim();
      const birth = birthInput.value;
      const weight = parseFloat(weightInput.value);

      if (!name || !breed || !birth || isNaN(weight)) {
        alert('모든 필수 정보를 입력해주세요.');
        return;
      }

      // 프로필 저장 로직 (store 연동)
      registerNewPet({
        name,
        breed,
        birth,
        weight,
        image: heroImg // 일단 기본 이미지 사용
      });

      alert('프로필 등록이 완료되었습니다!');
      
      // 상태 변경 및 대시보드로 강제 이동
      localStorage.setItem('isFirstRun', 'false');
      window.location.hash = 'main'; // 랜딩페이지 또는 대시보드로 이동
    });
  }

  const avatarBtn = document.getElementById('ob-avatar-btn');
  if (avatarBtn) {
    avatarBtn.addEventListener('click', () => {
      alert('이미지 업로드 기능은 준비 중입니다. 기본 이미지가 사용됩니다.');
    });
  }
};
