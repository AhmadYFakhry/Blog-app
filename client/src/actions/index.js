import axios from 'axios'

import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from 'actions/types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitBlog = (values, file, history) => async dispatch => {
  const uploadConfig = await axios.get('/api/upload');
  if (file) {
    await axios.put(uploadConfig.data.url, file[0], {
      headers: {
        'Content-Type': file[0].type
      }
    })
    values.imageUrl = uploadConfig.data.fileName;
  }
  console.log(values);
  const res = await axios.post('/api/blogs', values)
  console.log(res.data);
  history.push('/blogs')
  dispatch({ type: FETCH_BLOG, payload: res.data })
}

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('/api/blogs')
  dispatch({ type: FETCH_BLOGS, payload: res.data })
}

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`/api/blogs/${id}`)
  dispatch({ type: FETCH_BLOG, payload: res.data })
}
