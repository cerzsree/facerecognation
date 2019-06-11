import React from 'react';

const ImageLinkForm = ({onInputChange,onSubmit}) =>{
    return (
        <div>
            <p className='f3'>{'Hello There'}</p>
            <div style={{display:'flex',justifyContent:'center'}}>
                <div style={{display:'flex',justifyContent:'center',width:'700px'}}>
                    <input type="text" className='f4 pa4 w-70 center' onChange={onInputChange}/>
                    <button className='f4 ma2 grow w-30 bw0 bg-hot-pink dim ph3 pv2 mb2 dib white link' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;