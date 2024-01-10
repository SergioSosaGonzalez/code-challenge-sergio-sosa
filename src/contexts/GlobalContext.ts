import { createContext } from 'react';
import { GlobalState } from '../interfaces/GlobalState';

export const GlobalContext = createContext<GlobalState | null>(null);
