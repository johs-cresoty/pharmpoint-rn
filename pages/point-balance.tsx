import { createRoute } from '@granite-js/react-native';
import PointBalanceScreen from '@features/pointBalance/PointBalanceScreen';

export const Route = createRoute('/point-balance', {
  component: PointBalanceScreen,
});
