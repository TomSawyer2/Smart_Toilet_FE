export interface ToiletInfo {
  id: number;
  name: string;
  temperture: number;
  humidity: number;
  air_status: number;
  update_time: string;
  rooms: RoomInfo[];
}

export interface RoomInfo {
  id: number;
  room_id: number;
  toilet_id: number;
  occupied: number;
  status: number;
  update_time: string;
}

export interface UserInfo {
  id: number;
  username: string;
  permission: number;
}
