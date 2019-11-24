

let initialState = {
    frends: [
        { id:1, name: 'Dima', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
        { id:2,name: 'Sasha', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" },
        { id:3,name: 'Vova', avatarImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6G1UmueShif1jc8Jc1pCqXJz6LEGV8b8OHXGs_eS9lyfMrrR4w" }
    ]

};

const navBarReducer = (state=initialState, action) => {

    return state;
}

export default navBarReducer;