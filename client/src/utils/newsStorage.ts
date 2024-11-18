import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { resultValueType, singleResultValueType } from '../common/types';

export const newsObject = atom<Record<string, resultValueType>>({});

export const newsObjectLS = atomWithStorage<Record<string, resultValueType>>(
  'newsObjectLS',
  {}
);

export const newsSingleObject = atom<Record<string, singleResultValueType>>({});

export const newsSingleObjectLS = atomWithStorage<
  Record<string, singleResultValueType>
>('newsSingleObjectLS', {});
