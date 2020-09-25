import React from 'react';
import Tilt from 'react-tilt';
import logo from './faced.png';

const Logo = ({vProfile}) => {
    return (
        <div>
            <Tilt className="Tilt" options={{ max : 35 }} style={{ height: 250, width: 250,'marginLeft':'64px' }} >
                <div className="Tilt-inner pa3">
                <img style={{paddingTop: '5px'}} alt='logo' src={logo}/>
                <p className='pointer' onClick={() => vProfile('profile')} style={{color:'darkcyan'}}>Profile</p>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;