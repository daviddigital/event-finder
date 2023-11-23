import React from 'react';
import type { State, Action } from '../types';

interface EventsContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const EventsContext = React.createContext<EventsContextProps | undefined>(undefined);

export default EventsContext;
