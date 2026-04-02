// Central export point for all translations
export * from './types';
export { en } from './languages/en';
export { zh } from './languages/zh';
export { ms } from './languages/ms';
export { ta } from './languages/ta';
export { bn } from './languages/bn';
export { hi } from './languages/hi';
export { th } from './languages/th';
export { vi } from './languages/vi';
export { id } from './languages/id';
export { tl } from './languages/tl';
export { my } from './languages/my';

import { Translation, LanguageCode } from './types';
import { en } from './languages/en';
import { zh } from './languages/zh';
import { ms } from './languages/ms';
import { ta } from './languages/ta';
import { bn } from './languages/bn';
import { hi } from './languages/hi';
import { th } from './languages/th';
import { vi } from './languages/vi';
import { id } from './languages/id';
import { tl } from './languages/tl';
import { my } from './languages/my';

export const translations: Record<LanguageCode, Translation> = {
  en,
  zh,
  ms,
  ta,
  bn,
  hi,
  th,
  vi,
  id,
  tl,
  my
};

export const languages: Translation[] = [
  en,
  zh,
  ms,
  ta,
  bn,
  hi,
  th,
  vi,
  id,
  tl,
  my
];
