import axios from '@/utils/axios';
import { Pagination } from './base';

export interface AddRoomParams {
  roomId: number;
  toiletId: number;
  occupiedSensorSn?: string;
}

export interface UpdateRoomParams {
  roomDbId: number;
  occupied?: number;
  status?: number;
  occupiedSensorSn?: string;
}

export interface DeleteRoomParams {
  roomDbId: number;
}

export interface RoomHistoryParams extends Pagination {
  roomDbId: number;
}

// 新建坑位
export async function addRoom(params: AddRoomParams) {
  const url = '/api/room/add';

  const { data } = await axios.post(url, params);
  return data;
}

// 更新坑位数据
export async function updateRoom(params: UpdateRoomParams) {
  const url = '/api/room/update';

  const { data } = await axios.post(url, params);
  return data;
}

// 删除坑位
export async function deleteRoom(params: DeleteRoomParams) {
  const url = '/api/room/delete';

  const { data } = await axios.post(url, params);
  return data;
}

// 获取坑位历史数据
export async function getRoomHistory(params: RoomHistoryParams) {
  const url = '/api/room/history';

  const { data } = await axios.get(url, { params });
  return data;
}
