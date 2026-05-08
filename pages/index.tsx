import { createRoute } from '@granite-js/react-native';
import IdleScreen from '@features/idle/IdleScreen';

export const Route = createRoute('/', {
  component: IdleScreen,
});
