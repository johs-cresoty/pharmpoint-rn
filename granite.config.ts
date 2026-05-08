import { appsInToss } from '@apps-in-toss/framework/plugins';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  appName: 'pharmpoint', // 콘솔 등록 후 실제 이름으로 교체
  scheme: 'intoss',
  entryFile: './_app.tsx',
  plugins: [
    appsInToss({
      brand: {
        displayName: '팜포인트',
        primaryColor: '#3182F6',
        icon: '',
      },
      permissions: [],
    }),
  ],
});
