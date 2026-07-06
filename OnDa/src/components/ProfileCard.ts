import { pets, getActivePet, setActivePetId } from '../store';

export const renderProfileCard = () => {
  const activePet = getActivePet();

  const dropdownHtml = pets.map(pet => `
    <div class="dropdown-item pet-select-item" data-id="${pet.id}">
      <img src="${pet.image}" alt="${pet.name}" class="dropdown-avatar" />
      <span class="dropdown-name">${pet.name}</span>
    </div>
  `).join('');

  return `
  <div class="global-profile-card">
    <div class="global-profile-content">
      <img src="${activePet.image}" alt="프로필 사진" class="global-profile-avatar" />
      <div class="global-profile-info">
        <h3>${activePet.name}</h3>
        <div class="global-profile-meta">
          <span>🐾 ${activePet.breed}</span>
          <span>🎂 ${activePet.birth}</span>
          <span>⚖️ ${activePet.weight}kg</span>
        </div>
      </div>
    </div>
    
    <button class="global-profile-switch-btn" id="global-profile-switch-btn">
      프로필 변경 ▾
    </button>
    
    <div class="global-profile-dropdown" id="global-profile-dropdown">
      ${dropdownHtml}
      <div class="dropdown-item dropdown-add-btn" id="dropdown-add-btn">
        + 새 프로필 추가
      </div>
    </div>
  </div>
  `;
};

export const setupProfileCardInteraction = () => {
  const switchBtn = document.getElementById('global-profile-switch-btn');
  const dropdown = document.getElementById('global-profile-dropdown');
  const petItems = document.querySelectorAll('.pet-select-item');
  const addBtn = document.getElementById('dropdown-add-btn');

  if (switchBtn && dropdown) {
    switchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
    });
  }

  petItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const petId = target.dataset.id;
      if (petId) {
        setActivePetId(petId);
        window.dispatchEvent(new Event('hashchange'));
      }
    });
  });

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      window.location.hash = 'profile';
    });
  }
};
