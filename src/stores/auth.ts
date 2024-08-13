import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import baseUrl from '@/utils/config';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(email: string, password: string) {
      const responseData = await fetchWrapper.post(`${baseUrl}/login`, { email, password });
      console.log(responseData?.data?.user);
      // update pinia state
      this.user = responseData?.data?.user;
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(responseData?.data?.user));
      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/dashboard');
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/auth/login');
    }
  }
});
