import axios from 'axios';

export const SEED_PASSWORD = 'SEED_PASSWORD'
export const ADD_PASSWORD = 'ADD_PASSWORD'
export const REMOVE_PASSWORD = 'REMOVE_PASSWORD'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const SEARCH_PASSWORD = 'SEARCH_PASSWORD'
export const SET_URL = 'SET_URL'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_PASSWORD = 'SET_PASSWORD'
export const SET_ID = 'SET_ID'
export const RESET = 'RESET'
export const SET_INDEX = 'SET_INDEX'
export const SET_CREATED = 'SET_CREATED'

export function setcreated(value) {
  return {
    type: SET_CREATED,
    value
  }
}
export function setindex(value) {
  return {
    type: SET_INDEX,
    value
  }
}
export function reset() {
  return {
    type: RESET
  }
}
export function setid(value) {
  return {
    type: SET_ID,
    value
  }
}
export function setpassword(value) {
  return {
    type: SET_PASSWORD,
    value
  }
}
export function setusername(value) {
  return {
    type: SET_USERNAME,
    value
  }
}
export function seturl(value) {
  return {
    type: SET_URL,
    value
  }
}

export function seedPasswordSuccess(value) {
  return {
    type: SEED_PASSWORD,
    value
  }
}

export function seedpassword() {
  return dispatch => {
    return axios.get('http://localhost:8000/listpassword')
      .then(function(response) {
        dispatch(seedPasswordSuccess(response.data))
      })
  }
}

export function addPasswordSuccess(value) {
  return {
    type: ADD_PASSWORD,
    value
  }
}

export function addpassword(data) {
  return dispatch => {
    return axios.post('http://localhost:8000/listpassword',{
      url:data.url,
      username:data.username,
      password:data.password,
      createdAt:new Date(),
      updatedAt:null
    }).then(function(response) {
        dispatch(addPasswordSuccess(response.data))
    })
  }
}

export function deletePasswordSuccess(index) {
  return {
    type: REMOVE_PASSWORD,
    index
  }
}

export function deletepassword(data) {
  return dispatch => {
    return axios.delete('http://localhost:8000/listpassword/'+data.id)
    .then(function(response) {
        dispatch(deletePasswordSuccess(data.index))
    })
  }
}

export function updatePasswordSuccess(data) {
  return {
    type: UPDATE_PASSWORD,
    password:data.password,
    index:data.index
  }
}

export function updatepassword(data) {
  return dispatch => {
    return axios.put('http://localhost:8000/listpassword/'+data.id,{
      url:data.url,
      username:data.username,
      password:data.password,
      createdAt:data.createdAt,
      updatedAt:new Date()
    })
    .then(function(response) {
        let obj={};
        obj.password=response.data;
        obj.index=data.index;
        console.log('axis',obj);
        dispatch(updatePasswordSuccess(obj))
    })
  }
}

export function searchpassword(key) {
  return {
    type: SEARCH_PASSWORD,
    key
  }
}
