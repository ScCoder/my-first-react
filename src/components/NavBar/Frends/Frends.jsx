import React from 'react';
import Frend from './Frend/Frend';

const Frends = (props) => {

    let frendsElements = props.frends.map(f => <Frend key={f.id} state={f} />);

    return (
        <div>
            {frendsElements}
        </div>
        )
}

export default Frends;