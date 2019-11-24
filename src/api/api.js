import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers : {'API-KEY':'818dbe5b-9fc8-4519-ae88-b3cc5ada1808'}
});

// export const GetUsers = (currentPage,pageSize)=>{
//     return instance.get(`users?count=${pageSize}&page=${currentPage}`).then(response => { return response.data});

// }

export const GetUsers = async (currentPage,pageSize)=>{
    const response = await instance.get(`users?count=${pageSize}&page=${currentPage}`);
    return response.data;
}

export const Follow = (userId,follow) =>
{
    if (follow) {
        return instance.post(`follow/${userId}`).then(response => {return response.data.resultCode});
    }else{
        return instance.delete(`follow/${userId}`).then(response => {return response.data.resultCode});
    }
}

export const GetFollowed = (userId) =>
{
    return instance.get(`follow/${userId}`).then(response => {return response.data});
}

export const ProfileApi = {

    SaveStatus: (status) => {
        return instance.put(`profile/status`, { status: status }).then(response => { return response.data.resultCode });
    },

    GetStatus: (userId) => {
        return instance.get(`profile/status/${userId}`).then(response => { return response.data });
    },
    GetProfile: (userId) => {
        return instance.get(`profile/${userId}`).then(response => { return response.data });
    },
    SaveProfile: (profile) => {
        return instance.put(`profile`,profile).then(response => { return response.data });
    },

    SavePhoto: (photoFile) => {

        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => { return response.data.resultCode });
    }
}


export const Auth = {
    GetUserAuth: () => {
        return instance.get(`auth/me`).then(response => { return response.data });
    }
    ,

    Login: (email, password, rememberMe = false) => {
        return instance.post(`auth/login/`, { email, password, rememberMe }).then(response => { return response.data});
    }
    ,
    LogOut: () => {
        return instance.delete(`auth/login/`).then(response => { return response.data.resultCode });
    }
}
