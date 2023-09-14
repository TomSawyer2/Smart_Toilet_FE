import axios from '@/utils/axios';
import { Pagination } from './base';

export interface AddToiletParams {
  name: string;
  tempSensorSn?: string;
  airSensorSn?: string;
  fanSn?: string;
  loraSn?: string;
}

export interface DeleteToiletParams {
  toiletId: number;
}

export interface UpdateToiletParams {
  id: number;
  name: string;
  temperature?: number;
  humidity?: number;
  airStatus?: number;
  tempSensorSn?: string;
  airSensorSn?: string;
  fanSn?: string;
  loraSn?: string;
}

export interface ToiletHistoryParams extends Pagination {
  toiletId: number;
}

export interface RefreshAirParams {
  toiletId: number;
}

// 获取厕所列表
export async function getToiletList() {
  const url = '/api/toilet/list';

  const { data } = await axios.get(url);
  return data;
}

// 新建厕所
export async function addToilet(params: AddToiletParams) {
  const url = '/api/toilet/add';

  const { data } = await axios.post(url, params);
  return data;
}

// 删除厕所
export async function deleteToilet(params: DeleteToiletParams) {
  const url = '/api/toilet/delete';

  const { data } = await axios.post(url, params);
  return data;
}

// 更新厕所信息
export async function updateToilet(params: UpdateToiletParams) {
  const url = '/api/toilet/update';

  const { data } = await axios.post(url, params);
  return data;
}

// 获取厕所历史数据
export async function getToiletHistory(params: ToiletHistoryParams) {
  const url = '/api/toilet/history';

  const { data } = await axios.get(url, { params });
  return data;
}

// 换气
export async function refreshAir(params: RefreshAirParams) {
  const url = '/api/toilet/refreshAir';

  const { data } = await axios.post(url, params);
  return data;
}
