import axios from '@/utils/axios';
import { Pagination } from './base';

export type FeedbackListParams = Pagination;
export type DeviceListParams = Pagination;
export type UserListParam = Pagination;
export interface UpdatePermissionParams {
  userId: number;
  permission: number;
}

// 获取用户反馈列表
export async function getFeedbackList(params: FeedbackListParams) {
  const url = '/api/admin/feedback';

  const { data } = await axios.get(url, { params });
  return data;
}

// 获取设备数据列表
export async function getDeviceList(params: DeviceListParams) {
  const url = '/api/admin/device';

  const { data } = await axios.get(url, { params });
  return data;
}

// 获取用户列表
export async function getUserList(params: UserListParam) {
  const url = '/api/admin/user';

  const { data } = await axios.get(url, { params });
  return data;
}

// 更新用户权限
export async function updatePermission(params: UpdatePermissionParams) {
  const url = '/api/admin/permission';

  const { data } = await axios.post(url, params);
  return data;
}
