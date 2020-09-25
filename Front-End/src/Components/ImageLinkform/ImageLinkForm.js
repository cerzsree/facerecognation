import React from 'react';

const ImageLinkForm = ({onInputChange,onSubmit}) =>{
    return (
        <div>
            <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
            <fieldset id="" className="ba b--transparent ph0 mh0 w-70">
            <div className="mt3" width="400px">
                <input width="200px" type="text" className='f4 pa4' onChange={onInputChange}/>
            </div>
                    <button className='f4 ma2 grow bw0 bg-hot-pink dim ph3 pv2 mb2 white link' onClick={onSubmit}>Detect</button>
                
                
            </fieldset>
            </div>
        </div>
    );
}

export default ImageLinkForm;