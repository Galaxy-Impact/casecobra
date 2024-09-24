export const PORT = process.env.PORT || 8080;

export const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;

export const EMAIL_ACTIVATION_TOKEN_EXPIRES_IN =
  process.env.EMAIL_ACTIVATION_TOKEN_EXPIRES_IN;

export const COOKIE_EXPIRES_IN = process.env.COOKIE_EXPIRES_IN;
export const EDGE_STORE_ACCESS_KEY = process.env.EDGE_STORE_ACCESS_KEY;
export const EDGE_STORE_SECRET_KEY = process.env.EDGE_STORE_SECRET_KEY;

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;

export const CLIENT_URL = process.env.CLIENT_URL;

export const STRIPE_WEBHOOKS_SECRET = process.env.STRIPE_WEBHOOKS_SECRET;

export const PRODUCT_PRICES = {
  material: {
    silicone: 0,
    polycarbonate: 5_00,
  },
  finish: {
    smooth: 0,
    textured: 3_00,
  },
} as const;

export const BASE_PRICE = 14_00;

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_OAUTH_REDIRECT_URL = process.env.GOOGLE_OATUTH_REDIRECT_URL;

export const NODE_ENV = process.env.NODE_ENV;
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;
