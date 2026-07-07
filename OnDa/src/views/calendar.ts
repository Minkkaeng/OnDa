import { getActivePet, addCalendarEvent, getEventsByDate, getAllEvents } from '../store';
import type { CalendarEvent, EventType } from '../store';
import { renderProfileCard, setupProfileCardInteraction } from '../components/ProfileCard';

let currentMonth = new Date();
let selectedDateStr = (() => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
})();

const formatDateStr = (year: number, month: number, day: number) => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const renderCalendar = () => {
  return `
  <div class="hide-in-select-mode">
    ${renderProfileCard()}
  </div>

  <div id="view-calendar" class="cal-wrapper" style="margin-top: 24px;">
    <div class="cal-panel">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;" class="hide-in-select-mode">
        <div class="cal-top-badge" style="margin-bottom: 0;">일정 및 일상 기록 캘린더</div>
        <div class="cal-tabs">
          <button class="cal-tab-btn active" data-view="calendar">달력</button>
          <button class="cal-tab-btn" data-view="list">목록</button>
        </div>
      </div>
      <div class="cal-month-title" id="cal-month-display"></div>

      <div class="cal-header-row">
        <div style="color: var(--error-red);">일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div style="color: #3b82f6;">토</div>
      </div>

      <div class="cal-grid" id="cal-grid-container">
        <!-- Generated via JS -->
      </div>

      <div class="cal-ad-zone hide-in-select-mode">
        <span class="ad-badge">AD ZONE</span>
        <div class="cal-ad-text">우리 아이를 위한 안심 가습기전<br/><span style="font-size: 0.85rem; color: #666;">최대 35% 단독 할인 혜택</span></div>
      </div>
    </div>
  </div>

        <!-- Date Details Modal -->
        <div id="date-details-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
          <div class="cal-modal-content">
            <button id="close-details-btn" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            <div id="date-details-content" style="min-height: 200px; padding-bottom: 40px;"></div>
            <button class="cal-fab" id="add-event-fab">+</button>
          </div>
        </div>

        <!-- Add Event Modal -->
        <div id="add-event-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1100; align-items: center; justify-content: center;">
          <div class="cal-modal-content">
            <button id="close-add-btn" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            <div id="add-event-content"></div>
          </div>
        </div>

  <div id="view-list" style="display: none; flex-direction: column; gap: 24px; margin-top: 24px;">
    <div style="display: flex; justify-content: flex-end;" class="hide-in-select-mode">
      <div class="cal-tabs">
        <button class="cal-tab-btn" data-view="calendar">달력</button>
        <button class="cal-tab-btn active" data-view="list">목록</button>
      </div>
    </div>
    <div id="list-container">
      <!-- Generated via JS -->
    </div>
  </div>
  `;
};

const renderGrid = () => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-based
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  
  const gridContainer = document.getElementById('cal-grid-container');
  if (!gridContainer) return;
  
  let html = '';
  const activePet = getActivePet();
  
  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const dateStr = formatDateStr(month === 0 ? year - 1 : year, month === 0 ? 12 : month, d);
    html += `<div class="cal-day prev-month" data-date="${dateStr}" style="opacity: 0.4;">${d}</div>`;
  }
  
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatDateStr(year, month + 1, d);
    const dayOfWeek = new Date(year, month, d).getDay();
    const isSun = dayOfWeek === 0 ? 'sun' : '';
    const isSat = dayOfWeek === 6 ? 'sat' : '';
    const isActive = dateStr === selectedDateStr ? 'active' : '';
    
    // Check if there are events
    const events = getEventsByDate(activePet.id, dateStr);
    const indicator = events.length > 0 ? `<div class="cal-day-dot"></div>` : '';
    
    html += `<div class="cal-day ${isSun} ${isSat} ${isActive}" data-date="${dateStr}">${d}${indicator}</div>`;
  }
  
  // Next month days to fill grid (42 total slots)
  let nextDays = 1;
  while (html.split('<div class="cal-day').length - 1 < 42) {
    const dateStr = formatDateStr(month === 11 ? year + 1 : year, month === 11 ? 1 : month + 2, nextDays);
    const dayOfWeek = new Date(year, month + 1, nextDays).getDay();
    const isSat = dayOfWeek === 6 ? 'sat' : '';
    html += `<div class="cal-day next-month ${isSat}" data-date="${dateStr}" style="opacity: 0.4;">${nextDays}</div>`;
    nextDays++;
  }
  
  gridContainer.innerHTML = html;
  
  document.getElementById('cal-month-display')!.textContent = `${year}.${String(month + 1).padStart(2, '0')}`;
  
  // Bind click
  document.querySelectorAll('.cal-day').forEach(el => {
    const dayEl = el as HTMLElement;
    const dateStr = dayEl.dataset.date || '';
    
    dayEl.addEventListener('click', () => {
      const globalModal = document.getElementById('global-calendar-modal');
      if (globalModal && globalModal.getAttribute('data-select-mode') === 'true') {
        const targetInputId = globalModal.getAttribute('data-target-input');
        if (targetInputId) {
          const targetInput = document.getElementById(targetInputId) as HTMLInputElement;
          if (targetInput) targetInput.value = dateStr;
        }
        globalModal.remove();
        return;
      }

      selectedDateStr = dateStr;
      
      // Update month if clicked outside current month
      const clickedDate = new Date(selectedDateStr);
      if (clickedDate.getMonth() !== currentMonth.getMonth() || clickedDate.getFullYear() !== currentMonth.getFullYear()) {
        currentMonth = clickedDate;
        renderGrid();
      }
      
      renderDateDetailsModal();
      const dateDetailsModal = document.getElementById('date-details-modal');
      if (dateDetailsModal) dateDetailsModal.style.display = 'flex';
    });
  });
};

const renderDateDetailsModal = () => {
  const container = document.getElementById('date-details-content');
  if (!container) return;
  
  const activePet = getActivePet();
  const events = getEventsByDate(activePet.id, selectedDateStr);
  const selectedDateObj = new Date(selectedDateStr);
  const formattedDate = `${selectedDateObj.getMonth() + 1}월 ${selectedDateObj.getDate()}일`;
  
  let html = `<h3 style="font-size: 1.25rem; margin-bottom: 24px;">${formattedDate} 기록</h3>`;
  
  if (events.length > 0) {
    events.forEach(ev => {
      let typeText = ev.type === 'diary' ? '일기' : (ev.type === 'hospital' ? '병원' : '일정');
      html += `
        <div style="background: var(--ice-white); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <div style="font-size: 0.8rem; color: var(--muted-gray); font-weight: 700; margin-bottom: 4px;">[${typeText}]</div>
          <h3 style="font-size: 1.05rem; margin-bottom: 8px; color: var(--deep-navy);">${ev.title}</h3>
          <p style="font-size: 0.95rem; line-height: 1.5;">${ev.content.replace(/\n/g, '<br/>')}</p>
        </div>
      `;
    });
  } else {
    html += `<div style="text-align: center; color: var(--muted-gray); padding: 40px 0;">등록된 내역이 없습니다.</div>`;
  }
  
  container.innerHTML = html;
};

const renderAddEventForm = () => {
  const container = document.getElementById('add-event-content');
  if (!container) return;
  
  const selectedDateObj = new Date(selectedDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isFuture = selectedDateObj > today;
  const formattedDate = `${selectedDateObj.getMonth() + 1}월 ${selectedDateObj.getDate()}일`;
  
  const html = `
    <h3 style="font-size: 1.25rem; margin-bottom: 24px;">${formattedDate} 새로운 기록 추가</h3>
    
    <div class="form-group">
      <label class="form-label">기록 유형</label>
      <select id="new-event-type" class="form-input" style="padding: 10px;">
        ${!isFuture ? '<option value="diary">일상 기록 (일기)</option>' : ''}
        <option value="hospital" ${isFuture ? 'selected' : ''}>병원 예약 / 방문</option>
        <option value="schedule">기타 일정</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">제목</label>
      <input type="text" id="new-event-title" class="form-input" placeholder="예: 심장사상충 예방접종" />
    </div>

    <div class="form-group">
      <label class="form-label">상세 내용</label>
      <textarea id="new-event-content" class="cal-editor-textarea" style="min-height: 120px;" placeholder="상세 내용을 입력해주세요..."></textarea>
    </div>
    
    <button class="editor-submit-btn" id="add-event-btn">기록 저장하기</button>
  `;
  
  container.innerHTML = html;
  
  // Bind save action
  const addBtn = document.getElementById('add-event-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const type = (document.getElementById('new-event-type') as HTMLSelectElement).value as EventType;
      const title = (document.getElementById('new-event-title') as HTMLInputElement).value;
      const content = (document.getElementById('new-event-content') as HTMLTextAreaElement).value;
      
      if (!title) {
        alert('제목을 입력해주세요.');
        return;
      }
      
      addCalendarEvent({
        petId: getActivePet().id,
        date: selectedDateStr,
        type,
        title,
        content
      });
      
      document.getElementById('add-event-modal')!.style.display = 'none';
      
      // re-render everything
      renderGrid();
      renderDateDetailsModal(); // update underlying modal
      renderListView();
      alert('기록이 추가되었습니다!');
    });
  }
};

const renderListView = () => {
  const container = document.getElementById('list-container');
  if (!container) return;
  
  const activePet = getActivePet();
  const allEvents = getAllEvents(activePet.id);
  
  if (allEvents.length === 0) {
    container.innerHTML = '<div style="text-align: center; color: var(--muted-gray); padding: 40px 0;">등록된 내역이 없습니다.</div>';
    return;
  }
  
  // Group by date
  const grouped = allEvents.reduce((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);
  
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  
  let html = '';
  dates.forEach(dateStr => {
    const dObj = new Date(dateStr);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const titleStr = `${dObj.getMonth() + 1}월 ${dObj.getDate()}일 ${dayNames[dObj.getDay()]}요일`;
    
    html += `<div class="panel" style="margin-bottom: 24px;">
      <h3 style="margin-bottom: 20px; font-size: 1.25rem;">${titleStr}</h3>
      <div class="task-list">`;
      
    grouped[dateStr].forEach(ev => {
      let typeText = ev.type === 'diary' ? '일기' : (ev.type === 'hospital' ? '병원' : '일정');
      let typeColor = ev.type === 'hospital' ? 'var(--error-red)' : 'var(--mint-green)';
      
      html += `
        <div class="task-card">
          <div class="task-info">
            <h3 style="margin-bottom: 8px;">${ev.title}</h3>
            <p>${ev.content.replace(/\n/g, '<br/>')}</p>
          </div>
          <div class="task-status" style="color: ${typeColor}; font-weight: 700;">${typeText}</div>
        </div>
      `;
    });
    
    html += `</div></div>`;
  });
  
  container.innerHTML = html;
};

export const setupCalendarInteraction = () => {
  setupProfileCardInteraction();
  
  // Initial Renders
  renderGrid();
  renderListView();

  // Modal Interactions
  const dateDetailsModal = document.getElementById('date-details-modal');
  const addEventModal = document.getElementById('add-event-modal');
  
  document.getElementById('close-details-btn')?.addEventListener('click', () => {
    if (dateDetailsModal) dateDetailsModal.style.display = 'none';
  });
  
  dateDetailsModal?.addEventListener('click', (e) => {
    if (e.target === dateDetailsModal) {
      dateDetailsModal.style.display = 'none';
    }
  });
  
  document.getElementById('close-add-btn')?.addEventListener('click', () => {
    if (addEventModal) addEventModal.style.display = 'none';
  });
  
  addEventModal?.addEventListener('click', (e) => {
    if (e.target === addEventModal) {
      addEventModal.style.display = 'none';
    }
  });
  
  document.getElementById('add-event-fab')?.addEventListener('click', () => {
    renderAddEventForm();
    if (addEventModal) addEventModal.style.display = 'flex';
  });

  // Tab Selection
  const calTabs = document.querySelectorAll('.cal-tab-btn');
  calTabs.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const viewType = target.dataset.view;
      
      document.querySelectorAll('.cal-tab-btn').forEach(b => {
        if ((b as HTMLElement).dataset.view === viewType) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      
      if (viewType === 'calendar') {
        document.getElementById('view-calendar')!.style.display = 'flex';
        document.getElementById('view-list')!.style.display = 'none';
      } else {
        document.getElementById('view-calendar')!.style.display = 'none';
        document.getElementById('view-list')!.style.display = 'flex';
      }
    });
  });
};

export const openDatePicker = (targetInputId: string) => {
  const existing = document.getElementById('global-calendar-modal');
  if (existing) existing.remove();

  const modalHtml = `
  <div id="global-calendar-modal" class="modal-overlay" style="display: flex; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;" data-select-mode="true" data-target-input="${targetInputId}">
    <div class="cal-wrapper" style="width: 95%; max-width: 400px; max-height: 85vh; height: auto; background: white; border-radius: 12px; position: relative; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); padding: 16px; overflow-y: auto;">
      <button id="close-global-calendar-btn" style="position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--deep-navy); z-index: 10;">&times;</button>
      ${renderCalendar()}
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  setupCalendarInteraction();
  
  document.getElementById('close-global-calendar-btn')?.addEventListener('click', () => {
    document.getElementById('global-calendar-modal')?.remove();
  });
  
  const modalEl = document.getElementById('global-calendar-modal');
  modalEl?.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      modalEl.remove();
    }
  });
};
