export interface ToiletInfo {
  id: number;
  name: string;
  temperture: number;
  humidity: number;
  airStatus: number;
  updateTime: string;
  rooms: RoomInfo[];
}

export interface RoomInfo {
  id: number;
  roomId: number;
  toiletId: number;
  occupied: number;
  status: number;
  updateTime: string;
}

export interface UserInfo {
  id: number;
  username: string;
  permission: number;
}

export interface FeedbackItem {
  id: number;
  toiletId: number;
  roomId: number;
  content: string;
  updateTime: string;
}

export interface Device {
  id: number;
  sn: string;
}

export interface ToiletHistory {
  id: number;
  name: string;
  temperature: number;
  humidity: number;
  airStatus: number;
  updateTime: string;
}

export interface RoomHistory {
  id: number;
  roomId: number;
  toiletId: number;
  occupied: number;
  status: number;
  updateTime: string;
}
