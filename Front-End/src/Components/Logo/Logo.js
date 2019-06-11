import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png';

const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt" options={{ max : 35 }} style={{ height: 250, width: 250,'backgroundColor':'white','marginLeft':'64px' }} >
                <div className="Tilt-inner pa3">
                <img style={{paddingTop: '5px'}} alt='logo' src={logo}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;