import { createRoute } from '@granite-js/react-native';
import PhoneInputScreen, { PhoneInputMode } from '@features/phoneInput/PhoneInputScreen';

export const Route = createRoute('/phone-input', {
  component: PhoneInputPage,
});

function PhoneInputPage() {
  const { mode } = Route.useParams<{ mode: PhoneInputMode }>();
  return <PhoneInputScreen mode={mode} />;
}
