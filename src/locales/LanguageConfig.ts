import SimpleStorage from '@app/utils/SimpleStorage';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {ASYNC_STORAGE_KEYS} from '../constants/DataKeys';
import commonEN from './en/common.json';
import screensEN from './en/screens.json';
import commonIN from './in/common.json';
import screensIN from './in/screens.json';
import commonKM from './km/common.json';
import screensKM from './km/screens.json';
import commonLO from './lo/common.json';
import screensLO from './lo/screens.json';
import commonMS from './ms/common.json';
import screensMS from './ms/screens.json';
import {languageDetectorPlugin} from './plugins';
import commonTH from './th/common.json';
import screensTH from './th/screens.json';
import commonVI from './vi/common.json';
import screensVI from './vi/screens.json';
import commonZH from './zh/common.json';
import screensZH from './zh/screens.json';

const resources = {
  EN: {
    common: commonEN,
    screens: screensEN,
  },
  IN: {
    common: commonIN,
    screens: screensIN,
  },
  KM: {
    common: commonKM,
    screens: screensKM,
  },
  LO: {
    common: commonLO,
    screens: screensLO,
  },
  MS: {
    common: commonMS,
    screens: screensMS,
  },
  TH: {
    common: commonTH,
    screens: screensTH,
  },
  VI: {
    common: commonVI,
    screens: screensVI,
  },
  ZH: {
    common: commonZH,
    screens: screensZH,
  },
};

i18n
  .use(languageDetectorPlugin)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    ns: ['common', 'screens'],
    defaultNS: 'common',
    resources,
    fallbackLng: 'EN',
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    react: {
      useSuspense: false,
    },
  });

(async () => {
  i18n.changeLanguage(
    await (SimpleStorage.get(ASYNC_STORAGE_KEYS.appLanguage) ?? 'EN'),
  );
})();

export default i18n;
