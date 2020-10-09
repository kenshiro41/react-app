import { atom } from 'recoil';

export const searchText = atom<string>({
  key: 'searchText',
  default: '',
});

export const currentIndex = atom<number>({
  key: 'currentIndex',
  default: 0,
});
