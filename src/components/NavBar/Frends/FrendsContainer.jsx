import React from 'react';
import Frends from './Frends';
import { connect } from 'react-redux';

let mstp = (state) => {
    return {
        frends:state.navBar.frends
    }
}
let mdtp = (dispatch) => {
    return {
    }
}

const FrendsContainer = connect(mstp,mdtp)(Frends);

export default FrendsContainer;