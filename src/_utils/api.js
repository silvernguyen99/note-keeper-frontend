/**
 * @param {object} data data which will be sent as JSON
 * @return {Response} the returned value of fetch()
 */


const baseUrl = `${process.env.REACT_APP_NOTE_KEEPER_API}`;

let token;
export const API = {
  setToken: function (_token){
    token = _token
  },

  loginUsingSocialAccessToken: function (data) {
      // pages/index.js
      return fetch(`${baseUrl}/login_using_social_access_token`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },

  logoutAPI: function (){
    return fetch(`${baseUrl}/logout`, {
      method: 'POST',
      headers: {
        "Authorization": `${token}`,
      },
    })
  },

  getAllNotesAPI: function () {
    // pages/experiment/[id].js
    return fetch(`${baseUrl}/me/get_all_notes`, {
      method: 'POST',
      headers: {
        "Authorization": `${token}`,
      },
    })
  },

  createNoteAPI: function (data) {
    // pages/experiment/[id].js
    return fetch(`${baseUrl}/me/create_note`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Authorization": `${token}`,
      },
    })
  },

  deleteNoteAPI: function (data) {
    // pages/experiment/[id].js
    return fetch(`${baseUrl}/me/delete_note`, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
    })
  },

  editNoteAPI: function (data) {
    // pages/experiment/[id].js
    return fetch(`${baseUrl}/me/edit_note`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `${token}`,
      },
    })
  },

  getNoteAPI: function (data) {
    // pages/experiment/[id].js
    return fetch(`${baseUrl}/me/get_note`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `${token}`,
      },
    })
  }, 

}