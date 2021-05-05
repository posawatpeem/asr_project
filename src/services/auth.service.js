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