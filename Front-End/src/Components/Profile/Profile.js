import React from 'react';

const Profiler = ({name,email,num}) =>{
    return(
        <div>
            {name === 'Visitor'?
            <div>
                <p className="f4 mid-gray">You are not logged in/registered,Please log in/register to View your profile</p>
            </div>:
                <div>
                <div className='white' style={{display:'flex',justifyContent:'center',fontFamily:'source-code-pro,Menlo,monospace'}}>
                    <main className="pa4 black-80">
                    <div className="measure db fw6 lh-copy f6">
                    <h1>Name   :{name}</h1>
                    <h1>Email  :{email}</h1>
                    <h1>Faces detected:{num}</h1>
                    </div>
                    </main>
                </div>
            </div>
            }
        </div>
    )
}

export default Profiler;