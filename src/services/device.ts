import axios from '@/utils/axios';

export interface UpdateDeviceParams {
  sn: string;
  value: string;
}

// 更新设备数据
export async function updateDevice(params: UpdateDeviceParams) {
  const url = '/api/device/update';

  const { data } = await axios.post(url, params);
  return data;
}
