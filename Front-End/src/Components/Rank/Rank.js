import React from 'react';

const Rank =({name,entries}) => {
	return(
		<div className='ma4' >
			<div className='white f2' style={{fontFamily:'ubuntu'}} >
				{name+',Your Rank'}
			</div>
			<div className='f1 '>
				{entries}
			</div>
		</div>
		)

}

export default Rank;