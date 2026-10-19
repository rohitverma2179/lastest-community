import api from "../utils/axios";

export const updatePostApi = async (postId, data) => {
  const payload = typeof data === "string" ? { content: data } : data;
  const response = await api.put(`/posts/${postId}`, payload);
  return response.data;
};

export const deletePostApi = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};