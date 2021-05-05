import axios from 'axios'

export const login = async (values, auth) => {
    return await axios
    .post(`https://accounts.spotify.com/api/token`, values,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(auth.client_id + ":" + auth.clinet_secret)
          }
    })
    .then(response => {
        console.log(response.data);
        return response.data
    })
};

export const  saveToken= (data) => {
    if (data.access_token !== undefined) localStorage.setItem("access_token", data.access_token);
    if (data.refresh_token !== undefined) localStorage.setItem("refresh_token", data.refresh_token);
};