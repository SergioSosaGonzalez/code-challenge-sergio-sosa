import { User } from './User';

export interface GlobalState {
  appState: AppState;
  setAppState: (arg: AppState) => void;
}
interface AppState {
  logged: boolean;
  userData?: User;
}
