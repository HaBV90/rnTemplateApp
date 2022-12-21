import SimpleStorage from '@app/utils/SimpleStorage';
import {LanguageDetectorAsyncModule} from 'i18next';

import {ASYNC_STORAGE_KEYS} from '../constants/DataKeys';

export const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async (callback: (lang: string) => void) => {
    await SimpleStorage.get(ASYNC_STORAGE_KEYS.appLanguage).then(
      (language: string) => {
        if (language) {
          return callback(language);
        } else {
          return callback('en');
        }
      },
    );
  },
  cacheUserLanguage: async (language: string) => {
    await SimpleStorage.set(ASYNC_STORAGE_KEYS.appLanguage, language);
  },
};
