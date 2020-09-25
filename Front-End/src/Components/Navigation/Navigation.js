import React from 'react';

const Navigation = ({onRoutChange,issignedin,vprof}) => {
	if(issignedin){
    return (
        <nav className='f2' style={{display:'flex',justifyContent:'flex-end',paddingRight:'64px'}}>
            <p className='f3 link dim black pa3 pointer' onClick={() => vprof('signin')}>Home</p>
            <p className='f3 link dim black pa3 pointer' onClick={() => onRoutChange('signin')}>Sign Out</p>
        </nav>
    )}
    else{
    	return(
    	<nav className='f2' style={{display:'flex',justifyContent:'flex-end',paddingRight:'64px'}}>
            <p className='f3 link dim black pa3 pointer' onClick={() => {onRoutChange('signin');console.log('click')}}>Sign in</p>
            <p className='f3 link dim black pa3 pointer' onClick={() => {onRoutChange('register')}}>Register</p>
        </nav>
        )
    }
}

export default Navigation;