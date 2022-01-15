import request from "../utils/request";

// 获取公共的文章列表
export const getArticles = (params) => {
  return request({
    method: "GET",
    url: '/api/articles',
    params
  })
}


export const getFeedArticles = (data) => {
  return request({
    method: "POST",
    url: '/api/articles/feed',
    data
  })
}