import Cropper from 'cropperjs';
import '../styles/cropper.css';
import { renderProfileCard, setupProfileCardInteraction } from '../components/ProfileCard';
import { pets, activePetId, setActivePetId } from '../store';

let localSelectedPetId: string | null = activePetId;

export const renderProfile = () => `
  ${renderProfileCard()}
  <div class="profile-cards-wrapper" style="max-width: 1000px; margin: 0 auto; width: 100%;">
    <h2 class="section-title" style="margin-bottom: 24px;">프로필 설정</h2>
    
    <div class="pet-list-scroll" id="pet-tabs-container">
      ${pets.map(pet => `
    <img src="${pet.image}" class="pet-tab ${pet.id === localSelectedPetId ? 'active' : ''}" data-id="${pet.id}" alt="${pet.name}" />
  `).join('')}
      <div class="pet-tab-add ${localSelectedPetId === null ? 'active' : ''}" id="add-pet-tab">+</div>
    </div>

    <div class="profile-form-grid">
      <div class="panel profile-left">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; margin-bottom: 40px;">
          <input type="file" id="profile-upload" accept="image/*" style="display: none;" />
          <div style="position: relative; width: 120px; height: 120px;">
            <img src="${localSelectedPetId ? pets.find(p => p.id === localSelectedPetId)?.image : 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ccc"><path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/></svg>')}" id="profile-img-preview" alt="Profile" style="width: 100%; height: 100%; border-radius: 50%; border: 4px solid var(--mint-green); object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer;" title="클릭하여 프로필 이미지 변경" />
            <button id="profile-edit-badge" style="position: absolute; bottom: 0; right: 0; background-color: var(--mint-green); color: white; width: 36px; height: 36px; border-radius: 50%; border: 3px solid var(--white); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.15); padding: 0;">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 2px; margin-bottom: 2px;">
                <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">반려동물 이름</label>
          <input type="text" id="pet-name" class="form-input" value="${localSelectedPetId ? pets.find(p => p.id === localSelectedPetId)?.name : ''}" placeholder="이름을 입력하세요" />
        </div>
        
        <div class="form-group">
          <label class="form-label">품종</label>
          <input type="text" id="pet-breed" class="form-input" value="${localSelectedPetId ? pets.find(p => p.id === localSelectedPetId)?.breed : ''}" placeholder="예: 토이 푸들" />
        </div>
        
        <div class="form-group">
          <label class="form-label">생일 (입양일)</label>
          <input type="date" id="pet-birth" class="form-input" value="${localSelectedPetId ? pets.find(p => p.id === localSelectedPetId)?.birth : ''}" />
        </div>

        <div class="form-group">
          <label class="form-label">체중 (kg)</label>
          <input type="number" id="pet-weight" class="form-input" value="${localSelectedPetId ? pets.find(p => p.id === localSelectedPetId)?.weight : ''}" step="0.1" placeholder="예: 4.2" />
        </div>
      </div>
      
      <div class="panel profile-right">
        <h3 style="font-size: 1.1rem; margin-bottom: 16px; color: var(--mint-green);">의료 및 추가 정보</h3>
        
        <div class="form-group">
          <label class="form-label">자주 가는 병원</label>
          <input type="text" id="pet-hospital" class="form-input" value="${localSelectedPetId ? (pets.find(p => p.id === localSelectedPetId)?.hospitalName || '') : ''}" placeholder="예: 튼튼동물병원" />
        </div>
        
        <div class="form-group">
          <label class="form-label">알레르기 정보</label>
          <input type="text" id="pet-allergies" class="form-input" value="${localSelectedPetId ? (pets.find(p => p.id === localSelectedPetId)?.allergies || '') : ''}" placeholder="예: 닭고기, 먼지" />
        </div>
        
        <div class="form-group">
          <label class="form-label">투약 중인 약</label>
          <input type="text" id="pet-medications" class="form-input" value="${localSelectedPetId ? (pets.find(p => p.id === localSelectedPetId)?.medications || '') : ''}" placeholder="예: 심장사상충 예방약" />
        </div>

        <div class="form-group" style="flex-grow: 1; display: flex; flex-direction: column;">
          <label class="form-label">기타 특이사항</label>
          <textarea id="pet-notes" class="form-input" style="flex-grow: 1; resize: none; min-height: 120px;" placeholder="기타 특이사항, 성격 등을 자유롭게 작성해주세요.">${localSelectedPetId ? (pets.find(p => p.id === localSelectedPetId)?.notes || '') : ''}</textarea>
        </div>
      </div>
    </div>
    
    <button class="btn-submit" id="pet-save-btn" style="margin-top: 32px;">프로필 저장</button>
  </div>

  <!-- Image Crop Modal -->
  <div id="crop-modal" class="modal-overlay hidden">
    <div class="modal-content">
      <div class="modal-header">
        <h3>프로필 이미지 자르기</h3>
        <button id="crop-close-btn" class="modal-close-btn">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="crop-container">
        <img id="crop-image" src="" alt="Crop Area" />
      </div>
      <button id="crop-apply-btn" class="btn-submit" style="margin-top: 0;">적용하기</button>
    </div>
  </div>
  `;

export const setupProfileInteraction = () => {
  setupProfileCardInteraction();
  
  // Sync localSelectedPetId to global if it was null but we want to render first time
  if (localSelectedPetId && !pets.find(p => p.id === localSelectedPetId)) {
    localSelectedPetId = activePetId;
  }

  const uploadInput = document.getElementById('profile-upload') as HTMLInputElement;
  const imgPreview = document.getElementById('profile-img-preview') as HTMLImageElement;
  const editBadge = document.getElementById('profile-edit-badge');
  const headerAvatar = document.querySelector('.header-avatar') as HTMLImageElement;
  const headerName = document.querySelector('.header-name') as HTMLElement;

  const cropModal = document.getElementById('crop-modal');
  const cropImage = document.getElementById('crop-image') as HTMLImageElement;
  const cropCloseBtn = document.getElementById('crop-close-btn');
  const cropApplyBtn = document.getElementById('crop-apply-btn');

  const saveBtn = document.getElementById('pet-save-btn');
  
  const tabs = document.querySelectorAll('.pet-tab');
  const addTab = document.getElementById('add-pet-tab');
  const routerView = document.getElementById('router-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      localSelectedPetId = target.dataset.id || null;
      if (localSelectedPetId) {
        setActivePetId(localSelectedPetId);
        // Update header immediately
        const pet = pets.find(p => p.id === localSelectedPetId);
        if (pet && headerAvatar && headerName) {
          headerAvatar.src = pet.image;
          headerName.textContent = pet.name;
        }
      }
      if (routerView) {
        routerView.innerHTML = renderProfile();
        setupProfileInteraction();
      }
    });
  });

  if (addTab) {
    addTab.addEventListener('click', () => {
      localSelectedPetId = null;
      if (routerView) {
        routerView.innerHTML = renderProfile();
        setupProfileInteraction();
      }
    });
  }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const name = (document.getElementById('pet-name') as HTMLInputElement).value;
        const breed = (document.getElementById('pet-breed') as HTMLInputElement).value;
        const birth = (document.getElementById('pet-birth') as HTMLInputElement).value;
        const weight = parseFloat((document.getElementById('pet-weight') as HTMLInputElement).value) || 0;
        const hospitalName = (document.getElementById('pet-hospital') as HTMLInputElement).value;
        const allergies = (document.getElementById('pet-allergies') as HTMLInputElement).value;
        const medications = (document.getElementById('pet-medications') as HTMLInputElement).value;
        const notes = (document.getElementById('pet-notes') as HTMLTextAreaElement).value;
        const image = imgPreview.src;
  
        if (!name) {
          alert('이름을 입력해주세요.');
          return;
        }
  
        if (localSelectedPetId) {
          const petIndex = pets.findIndex(p => p.id === localSelectedPetId);
          if (petIndex > -1) {
            pets[petIndex] = { ...pets[petIndex], name, breed, birth, weight, hospitalName, allergies, medications, notes, image };
          }
        } else {
          const newId = 'pet-' + Date.now();
          localSelectedPetId = newId;
          pets.push({ id: newId, name, breed, birth, weight, hospitalName, allergies, medications, notes, image });
        }
  
        // Update global active pet
        setActivePetId(localSelectedPetId!);
  
        // Sync header
        if (headerAvatar && headerName) {
          headerAvatar.src = image;
          headerName.textContent = name;
        }

      alert('프로필이 저장되었습니다!');
      
      if (routerView) {
        routerView.innerHTML = renderProfile();
        setupProfileInteraction();
      }
    });
  }

  // Cropper logic
  let cropper: Cropper | null = null;

  if (uploadInput && imgPreview && editBadge) {
    const triggerUpload = () => uploadInput.click();
    
    imgPreview.addEventListener('click', triggerUpload);
    editBadge.addEventListener('click', triggerUpload);

    uploadInput.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result && cropModal && cropImage) {
            cropImage.src = result;
            cropModal.classList.remove('hidden');

            if (cropper) cropper.destroy();
            cropper = new Cropper(cropImage, {
              aspectRatio: 1,
              viewMode: 1,
              dragMode: 'move',
              autoCropArea: 0.8,
              restore: false,
              guides: false,
              center: false,
              highlight: false,
              cropBoxMovable: true,
              cropBoxResizable: true,
              toggleDragModeOnDblclick: false,
            });
          }
        };
        reader.readAsDataURL(file);
      }
      uploadInput.value = ''; 
    });
  }

  if (cropCloseBtn && cropModal) {
    cropCloseBtn.addEventListener('click', () => {
      cropModal.classList.add('hidden');
      if (cropper) {
        cropper.destroy();
        cropper = null;
      }
    });
  }

  if (cropApplyBtn && cropModal && imgPreview) {
    cropApplyBtn.addEventListener('click', () => {
      if (cropper) {
        const canvas = cropper.getCroppedCanvas({
          width: 256,
          height: 256,
        });
        const croppedDataUrl = canvas.toDataURL('image/jpeg');
        imgPreview.src = croppedDataUrl;
        
        cropModal.classList.add('hidden');
        cropper.destroy();
        cropper = null;
      }
    });
  }
};
