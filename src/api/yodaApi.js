import axios from 'axios';

const instance = axios.create({
  //  withCredentials: true,
    baseURL: 'http://localhost:5000/',
});

export const Yoda = {
 GetServerName : () =>{

    return instance.get('servername?test=first').then(response => {return response.data} );
}

}
