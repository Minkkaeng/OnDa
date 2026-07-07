import { getActivePet, addCalendarEvent, getAllEvents } from '../store';
import { openDatePicker } from './calendar';

export const renderDiary = () => {
  return `
  <div class="diary-wrapper">
    <div class="diary-header">
      <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--deep-navy);">기록일기</h2>
      <button class="btn-submit" id="toggle-diary-form-btn" style="width: auto; padding: 10px 24px;">새 기록 작성</button>
    </div>
    <!-- Upload Modal -->
    <div id="diary-form-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
      <div class="cal-modal-content" style="width: 90%; max-width: 500px; background: white; padding: 32px; border-radius: 12px; position: relative;">
        <button id="close-diary-modal-btn" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
        <h3 style="margin-bottom: 20px; font-size: 1.25rem;">오늘의 사진과 메모 남기기</h3>
        
        <input type="file" id="diary-image-input" accept="image/*" style="display: none;" />
        
        <div class="diary-image-upload" id="diary-upload-trigger">
          <div style="font-size: 2rem; color: var(--mint-green); margin-bottom: 8px;">📷</div>
          <p style="color: var(--muted-gray); font-weight: 700;">클릭하여 사진 추가하기</p>
        </div>

        <div class="diary-preview-container" id="diary-preview-container">
          <img src="" id="diary-preview-image" class="diary-preview-image" />
          <button class="diary-remove-image" id="diary-remove-image">&times;</button>
        </div>

        <div class="form-group">
          <label class="form-label">날짜</label>
          <input type="text" id="diary-date" class="form-input" readonly placeholder="날짜를 선택하려면 클릭하세요" style="cursor: pointer; background-color: var(--ice-white);" />
        </div>

        <div class="form-group">
          <label class="form-label">제목</label>
          <input type="text" id="diary-title" class="form-input" placeholder="일기 제목을 입력해주세요" />
        </div>

        <div class="form-group">
          <label class="form-label">내용</label>
          <textarea id="diary-content" class="form-input" style="min-height: 120px; resize: none;" placeholder="오늘 어떤 일이 있었나요?"></textarea>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <button class="btn-submit" id="cancel-diary-btn" style="flex: 1; background: var(--ice-white); color: var(--muted-gray); border-color: var(--steel-gray);">취소</button>
          <button class="btn-submit" id="save-diary-btn" style="flex: 2;">기록 저장하기</button>
        </div>
      </div>
    </div>

    <!-- Feed -->
    <div class="diary-feed" id="diary-feed-container">
      <!-- Generated via JS -->
    </div>
  </div>
  `;
};

export const setupDiaryInteraction = () => {
  const toggleBtn = document.getElementById('toggle-diary-form-btn');
  const formModal = document.getElementById('diary-form-modal');
  const cancelBtn = document.getElementById('cancel-diary-btn');
  const closeBtn = document.getElementById('close-diary-modal-btn');
  
  const closeModal = () => {
    if (formModal) formModal.style.display = 'none';
  };

  if (toggleBtn && formModal) {
    toggleBtn.addEventListener('click', () => {
      const dateInput = document.getElementById('diary-date') as HTMLInputElement;
      if (dateInput && !dateInput.value) {
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        dateInput.value = dateStr;
      }
      formModal.style.display = 'flex';
    });
  }

  const diaryDateInput = document.getElementById('diary-date');
  if (diaryDateInput) {
    diaryDateInput.addEventListener('click', () => {
      openDatePicker('diary-date');
    });
  }
  
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Image Upload Logic (Mock/Preview)
  const imageInput = document.getElementById('diary-image-input') as HTMLInputElement;
  const uploadTrigger = document.getElementById('diary-upload-trigger');
  const previewContainer = document.getElementById('diary-preview-container');
  const previewImage = document.getElementById('diary-preview-image') as HTMLImageElement;
  const removeImageBtn = document.getElementById('diary-remove-image');
  let currentImageUrl = '';

  if (uploadTrigger && imageInput) {
    uploadTrigger.addEventListener('click', () => {
      imageInput.click();
    });
  }

  if (imageInput && previewContainer && previewImage && uploadTrigger) {
    imageInput.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          currentImageUrl = e.target?.result as string;
          previewImage.src = currentImageUrl;
          previewContainer.style.display = 'block';
          uploadTrigger.style.display = 'none';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removeImageBtn && previewContainer && uploadTrigger && imageInput) {
    removeImageBtn.addEventListener('click', () => {
      currentImageUrl = '';
      imageInput.value = '';
      previewContainer.style.display = 'none';
      uploadTrigger.style.display = 'block';
    });
  }

  // Save Diary Logic
  const saveBtn = document.getElementById('save-diary-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const title = (document.getElementById('diary-title') as HTMLInputElement).value;
      const content = (document.getElementById('diary-content') as HTMLTextAreaElement).value;
      const dateInput = (document.getElementById('diary-date') as HTMLInputElement).value;

      if (!title) {
        alert('제목을 입력해주세요.');
        return;
      }
      if (!dateInput) {
        alert('날짜를 지정해주세요.');
        return;
      }

      addCalendarEvent({
        petId: getActivePet().id,
        date: dateInput,
        type: 'diary',
        title,
        content,
        imageUrl: currentImageUrl || undefined
      });

      alert('기록일기가 저장되었습니다!');
      
      // Reset Form
      (document.getElementById('diary-date') as HTMLInputElement).value = '';
      (document.getElementById('diary-title') as HTMLInputElement).value = '';
      (document.getElementById('diary-content') as HTMLTextAreaElement).value = '';
      currentImageUrl = '';
      if (imageInput) imageInput.value = '';
      if (previewContainer) previewContainer.style.display = 'none';
      if (uploadTrigger) uploadTrigger.style.display = 'block';
      if (formModal) formModal.style.display = 'none';

      renderFeed();
    });
  }

  renderFeed();
};

const renderFeed = () => {
  const container = document.getElementById('diary-feed-container');
  if (!container) return;

  const allEvents = getAllEvents(getActivePet().id);
  const diaryEvents = allEvents.filter(e => e.type === 'diary' || e.imageUrl);

  if (diaryEvents.length === 0) {
    container.innerHTML = '<div style="text-align: center; color: var(--muted-gray); padding: 40px 0;">작성된 기록일기가 없습니다. 첫 기록을 남겨보세요!</div>';
    return;
  }

  let html = '';
  diaryEvents.forEach(ev => {
    const dObj = new Date(ev.date);
    const formattedDate = `${dObj.getFullYear()}년 ${dObj.getMonth() + 1}월 ${dObj.getDate()}일`;

    html += `
      <div class="diary-card">
        <div class="diary-card-header">
          <div class="diary-date">${formattedDate}</div>
          <div style="font-size: 0.85rem; color: var(--muted-gray); font-weight: 700;">일기 기록</div>
        </div>
        ${ev.imageUrl ? `
        <div class="diary-image-container">
          <img src="${ev.imageUrl}" class="diary-image" />
        </div>
        ` : ''}
        <div class="diary-content">
          <div class="diary-title">${ev.title}</div>
          <div class="diary-text">${ev.content.replace(/\\n/g, '<br/>')}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
};
