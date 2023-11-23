export interface EventDetails {
  name: string;
  id: string;
  url: string;
  images: {
    url: string;
  }[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
    };
  };
}

export interface State {
  events: EventDetails[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
}

export type Action =
  | { type: 'LOAD_EVENTS' }
  | { type: 'SET_EVENTS'; payload: { events: EventDetails[]; totalPages: number } }
  | { type: 'RESET_EVENTS' };
