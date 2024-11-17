import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { resultValueType } from '../common/types';

export const newsObject = atom<Record<string, resultValueType>>({});

export const newsObjectLS = atomWithStorage<Record<string, resultValueType>>(
  'newsObjectLS',
  {}
);
