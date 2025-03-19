const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ratingapp.net.ar:18000';

export const API_URLS = {
  login: `${BACKEND_URL}/subscriptors/login`,
  register: `${BACKEND_URL}/subscriptors/add`,
  loginEnterprise: `${BACKEND_URL}/users/login`,
  dashboard: `${BACKEND_URL}/dashboard/get`,
}; 