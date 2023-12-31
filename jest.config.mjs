const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // ... outras configurações

  // Adicione ou modifique outras opções conforme necessário
  // Por exemplo:
  // moduleNameMapper: {
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  // },

  // testMatch: [
  //   '**/__tests__/**/*.js',
  //   '**/?(*.)+(spec|test).[jt]s?(x)',
  // ],
}

export default config
