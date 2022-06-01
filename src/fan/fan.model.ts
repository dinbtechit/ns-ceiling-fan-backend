export interface FanState {
  speed: number;
  direction: boolean;
}

export interface MessageEvent {
  data: string | FanState;
  id?: string;
  type?: string;
  retry?: number;
}
