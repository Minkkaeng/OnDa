import heroImg from './assets/hero.png';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  birth: string;
  weight: number;
  image: string;
  hospitalName?: string;
  allergies?: string;
  medications?: string;
  notes?: string;
}

export let pets: Pet[] = [
  {
    id: 'choco-1',
    name: '초코',
    breed: '토이 푸들',
    birth: '2020-05-14',
    weight: 4.2,
    image: heroImg
  }
];

export let activePetId: string = 'choco-1';

export const setActivePetId = (id: string) => {
  activePetId = id;
};

export const getActivePet = (): Pet => {
  return pets.find(p => p.id === activePetId) || pets[0];
};

export const registerNewPet = (pet: Omit<Pet, 'id'>) => {
  const newPet = { ...pet, id: 'pet-' + Date.now() };
  pets = [newPet]; // 덮어쓰기 (초기 등록용)
  activePetId = newPet.id;
  return newPet;
};

export type EventType = 'diary' | 'hospital' | 'schedule';

export interface CalendarEvent {
  id: string;
  petId: string;
  date: string; // YYYY-MM-DD
  type: EventType;
  title: string;
  content: string;
  imageUrl?: string;
}

export let calendarEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    petId: 'choco-1',
    date: '2026-07-08',
    type: 'diary',
    title: '원반 캐치 성공!',
    content: '오늘 오후에는 드디어 넓은 잔디 공원으로 나가 원반 던지기 놀이를 했다. 눈을 반짝이며 날아가는 원반을 완벽하게 공중 캐치하는 데 성공!'
  },
  {
    id: 'evt-2',
    petId: 'choco-1',
    date: '2026-07-07',
    type: 'schedule',
    title: '만성 안구 건조증 안약 투여',
    content: '오전 10:00 / 정기 복용 완료 상태'
  }
];

export const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
  const newEvent = { ...event, id: 'evt-' + Date.now() };
  calendarEvents.push(newEvent);
  return newEvent;
};

export const getEventsByDate = (petId: string, date: string): CalendarEvent[] => {
  return calendarEvents.filter(e => e.petId === petId && e.date === date);
};

export const getAllEvents = (petId: string): CalendarEvent[] => {
  return calendarEvents.filter(e => e.petId === petId).sort((a, b) => b.date.localeCompare(a.date));
};
