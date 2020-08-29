export type Env = typeof process.env & {
  ANDROID_TEST: string;
  ANDROID_DEVICE: string;
  ANDROID_VERSION: string;
  IOS_TEST: string;
  IOS_DEVICE: string;
  IOS_VERSION: string;
  APP_DEMO_USER_PASSWORD: string;
  APP_DEMO_USER_EMAIL: string;
  APP_TEST_USER_EMAIL: string;
  APP_TEST_USER_PASSWORD: string;
  PUBLIC_API_URL: string;
  MAILTRAP_INBOX_ID: string;
  MAILTRAP_API_KEY: string;
};
