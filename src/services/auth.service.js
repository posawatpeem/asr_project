import axios from 'axios'

const client_data = {
    client_id: 'b6d7bafeb31a49f4b7cae4176f4d3cef',
    clinet_secret: 'c6fd4dc5d4ac4d89801fb9a586524102',
};

export const login = async (values) => {
    return await axios
    .post(`https://accounts.spotify.com/api/token`, values,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_data.client_id + ":" + client_data.clinet_secret)
          }
    })
    .then(response => {
        if (response.data.access_token !== undefined) localStorage.setItem("access_token", response.data.access_token);
        if (response.data.refresh_token !== undefined) localStorage.setItem("refresh_token", response.data.refresh_token);
        return response.data
    })
};

export const refreshToken= async () => {
    let refresh_token = localStorage.getItem("refresh_token");
    let payload = "grant_type=refresh_token"+
            "&refresh_token=" + refresh_token +
            "&client_id="+ client_data.client_id;
    return await login(payload);
};