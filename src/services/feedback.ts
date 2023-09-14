import axios from '@/utils/axios';

export interface AddFeedbackParams {
  toiletId: number;
  roomId: number;
  roomDbId: number;
  content: string;
}

export interface UpdateFeedbackParams {
  feedbackId: number;
  status: number;
}

// 反馈
export async function addFeedback(params: AddFeedbackParams) {
  const url = '/api/feedback/add';

  const { data } = await axios.post(url, params);
  return data;
}

// 修改反馈状态
export async function updateFeedback(params: UpdateFeedbackParams) {
  const url = '/api/feedback/update';

  const { data } = await axios.post(url, params);
  return data;
}
