//Main App.js created by Osama Namur Facereco React App
//Sample React App


import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import Profile from './Components/Profile/Profile';
import Signinform from './Components/Signinform/Signinform';
import Registerform from './Components/Registerform/Registerform';
import ImageLinkForm from './Components/ImageLinkform/ImageLinkForm';
import Thetestimage from './Components/Thetestimage/Thetestimage';
import Tic from './Components/TicTacToe/Tic';
import tachyons from 'tachyons';
import './App.css';
import Particles from 'react-particles-js';

//Params for background particles

const particlesOptions = {
  particles:{
    line_linked:{
      shadow:{
        enables:true,
        color:"#3ca901",
        blur:5
      }
    }
  }
}

//Main State every time App.js open it restore state to main state

/*const initState = {
      input : '',
      imageUrl:'',
      box: {},
      rout:'signin',
      srout:'home',
      issignedin:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:'',
        joined:''
      }
    } */

    const initState = {
      input : '',
      imageUrl:'',
      box: [],
      boxs:[],
      rout:'signin',
      srout:'home',
      issignedin:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:'',
        joined:''
      }
    }

let num = 0;


class App extends Component {
  constructor(){
    super();   
    this.state = initState;
}

//Load User when signin

loadUser = (user) => {

  this.setState({user: {
    id: user.id,
    name: user.name,
    email: user.email,
    entries: user.entries,
    joined: user.joined
  }})
  num = user.entries;
}

//view profile page
viewProfile = (ide) => {
  this.setState({srout:ide})
}

//Load the box face to state

displayFace = (boxes) => {
  //this.setState({box:boxes});
  let prevBox = this.state.box.concat(boxes);
  this.setState({box:prevBox});
  console.log(this.state.box);
}

//Calculating the face box and return the box

calculatingBoundringBox = (data) => {
  const image = document.getElementById('facebox');
  const height = Number(image.height);
  const width = Number(image.width);
  return{
    leftCol: data.left_col * width,
    topRow: data.top_row * height,
    rightCol: width - (data.right_col * width),
    bottomRow: height - (data.bottom_row * height)
  }
  
}

/*calculatingBoundringBox = (data) => {
  console.log(data);
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('facebox');
  const height = Number(image.height);
  const width = Number(image.width);
  return{
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
  
}*/

//Register a new User 

registerUser= (data) => {
  this.setState({user:{
    name:data.name,
    email:data.email,
    password:data.password
  }})
}

//Open main page when register or sign in, or sign out

onRoutChange = (dir) => {
  if(dir === 'home'){
    this.setState({issignedin:true});
  }else{
    this.setState(initState);
  }
  this.setState({rout:dir});
}

//take the url from text input and put it in state
onInputChange = (event) =>{
    this.setState({input:event.target.value});
}

//Submit the pic to Clarifai

onSubmit = () => {
  this.setState({imageUrl: this.state.input});
  
  fetch('https://intense-depths-42987.herokuapp.com/imageurl',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      input: this.state.input
    })
  })
  .then(response => response.json())
  .then(response => {
    if (response){
      fetch('https://intense-depths-42987.herokuapp.com/image',{
        method:'put',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          id:this.state.user.id
      })
    }).then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user,{entries:count}))
    }).catch(console.log)
    }

    this.setState({box:[],boxes:[]})
    this.setState({boxs:response.outputs[0].data.regions});
    for (let i = 0; i < this.state.boxs.length; i++) {
      this.displayFace(this.calculatingBoundringBox(this.state.boxs[i].region_info.bounding_box));
    }
     
   }).catch(err => console.warn(err));
}

  render() {
    return (
      <div className="App">
           <Particles className="particles"
                params={particlesOptions} />
        <Navigation onRoutChange={this.onRoutChange} issignedin={this.state.issignedin} vprof={this.viewProfile}/>
        {this.state.rout === 'home'
          ?(this.state.srout === 'profile'?
          <div>
            <Logo vProfile={this.viewProfile}/>
            <Profile name={this.state.user.name} email={this.state.user.email} ent={this.state.user.entries}/>
          </div>
          :
            <div>
              <Logo vProfile={this.viewProfile}/>
              <Rank name={this.state.user.name} entries={num}/>
              <p style={{color:"white"}}>
                Past a URL of any image that you want to Detect the face inside the Box Below
              </p>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <Thetestimage imageUrl={this.state.imageUrl} box={this.state.box}/>
              <Tic/>
            </div>)
          :(this.state.rout === 'signin'
            ?<Signinform onRoutChange={this.onRoutChange} loadUser={this.loadUser}/>
            :<Registerform registerUser={this.registerUser} onRoutChange={this.onRoutChange}/>
        )}
          <footer className="pv4 ph3 ph5-m ph6-l mid-gray">
        <small className="f6 db tc">© 2017 <b className="ttu">Osama Namur</b>., All Rights Reserved</small>
        <div className="tc mt3">
          <a href="/language/" title="Language" className="f6 dib ph2 link mid-gray dim">Language</a>
          <a href="/terms/"    title="Terms" className="f6 dib ph2 link mid-gray dim">JS</a>
          <a href="/privacy/"  title="Privacy" className="f6 dib ph2 link mid-gray dim">DataBase</a>
  </div>
</footer>
  </div>
  ); }
}

export default App;
