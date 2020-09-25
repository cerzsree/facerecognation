import React from 'react';
import './Thetestimage.css';

const Thetestimage = ({imageUrl,box}) => {
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='facebox' alt='' src={imageUrl} width='500' height='auto'/>
				{
				box.map((b,i) => (
					<div className='bounding-box' style={{top:b.topRow,right:b.rightCol,bottom: b.bottomRow,left: b.leftCol}} key={i}></div>
				))}
			</div>
        </div>
		);
}

export default Thetestimage;

//				<div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom: box.bottomRow,left: box.leftCol}}></div>
