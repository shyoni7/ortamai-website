// Mocked base44 client to remove dependency on @base44/sdk
export const base44 = {
  entities: new Proxy({}, {
    get: () => ({
      list: async () => [],
      create: async () => ({ id: 'mock-id' }),
      update: async () => ({ id: 'mock-id' }),
      delete: async () => ({ success: true }),
      get: async () => null,
    })
  }),
  auth: {
    me: async () => null,
    logout: async () => {},
    redirectToLogin: () => { console.log('Redirecting to login (mocked)'); },
  },
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: '/mock-file-url' }),
    }
  },
  appLogs: {
    logUserInApp: async () => {},
  }
};
