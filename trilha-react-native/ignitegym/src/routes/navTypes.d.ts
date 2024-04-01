import { AppRoutesProps } from './app.routes';
import { AuthRoutesProps } from './auth.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutesProps, AppRoutesProps {}
  }
}
