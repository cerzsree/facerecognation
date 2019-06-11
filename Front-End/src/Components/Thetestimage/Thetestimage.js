import React from 'react';
import './Thetestimage.css';

const Thetestimage = ({imageUrl,box}) => {
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='facebox' alt='' src={imageUrl} width='500' height='auto'/>
				<div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom: box.bottomRow,left: box.leftCol}}></div>
			</div>
        </div>
		);
}

export default Thetestimage;