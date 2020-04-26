import { registerAs } from '@nestjs/config';

export const apisConfig = registerAs('apis', () => ({
  credentials: {
    apiKey: {
      google: {
        youtube: process.env.CREDENTIALS_API_KEY_GOOGLE_YOUTUBE,
      },
    },
  },
}));
