import React from 'react';
import './Tic.css';

class Tic extends React.Component {
    constructor(){
        super();
        this.state = {
            tex:'',
            role:['','','','','','','','',''],
            wincombs:[[0,1,2],[3,4,5],[6,7,8]],
            huPlayer:'O',
            aiPlayer:'X'
        }
    }

    findAvailablePosition = () => {
        let list = this.state.role.map((a,i) => {
            if(a === ''){
                return a;
            }else{
                return;
            }
        })
        console.log(list);
    }

    takeRole = (e) => {
        const i = e.target.id;

        if(this.state.role[i] === ''){
            console.log('role here');
        }else{
            return;
        }

            const list = this.state.role.map((item,j) => {
                if( j == i){
                    return 'D';
                }else{
                    return item;
                }
            });
        
            this.setState({role:list});
            this.findAvailablePosition();
    }

    render(){
        return(
            <div className="tic">
                <h1>Lets Play Tic Tac Toe</h1>
                <table className="table">
                    <tbody>
                        <tr className="t">
                            <td className="cell" id="0" onClick={this.takeRole}>{this.state.role[0]}</td>
                            <td className="cell" id="1" onClick={this.takeRole}>{this.state.role[1]}</td>
                            <td className="cell" id="2" onClick={this.takeRole}>{this.state.role[2]}</td>
                        </tr>
                        <tr className="t">
                            <td className="cell" id="3" onClick={this.takeRole}>{this.state.role[3]}</td>
                            <td className="cell" id="4" onClick={this.takeRole}>{this.state.role[4]}</td>
                            <td className="cell" id="5" onClick={this.takeRole}>{this.state.role[5]}</td>
                        </tr>
                        <tr className="t">
                            <td className="cell" id="6" onClick={this.takeRole}>{this.state.role[6]}</td>
                            <td className="cell" id="7" onClick={this.takeRole}>{this.state.role[7]}</td>
                            <td className="cell" id="8" onClick={this.takeRole}>{this.state.role[8]}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="endgame">
                    <div className="text"></div>
                </div>
                <button className=" f4 ma2 grow bw0 bg-hot-pink dim ph3 pv2 mb2 white link">Replay</button>
            </div>
        )
    }
    
}

export default Tic;