import { TTranslations } from '$utils/i18n/translations'

declare global {
  interface Window {
    __translations: TTranslations
  }

  interface Document {
    mozHidden?: boolean;
    msHidden?: boolean;
    webkitHidden?: boolean;
  }
}
