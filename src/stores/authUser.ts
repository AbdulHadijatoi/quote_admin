import { defineStore } from 'pinia';

import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

import baseUrl from '@/utils/config';

export const useUsersStore = defineStore({
  id: 'Authuser',
  state: () => ({
    users: {}
  }),
  actions: {
    async getAll() {
      this.users = { loading: true };
      fetchWrapper
        .get(baseUrl)
        .then((users) => (this.users = users))
        .catch((error) => (this.users = { error }));
    }
  }
});
