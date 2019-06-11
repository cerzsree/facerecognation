//Main App.js created by Osama Namur Facereco React App
//Sample React App


import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import Signinform from './Components/Signinform/Signinform';
import Registerform from './Components/Registerform/Registerform';
import ImageLinkForm from './Components/ImageLinkform/ImageLinkForm';
import Thetestimage from './Components/Thetestimage/Thetestimage';
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

const initState = {
      input : '',
      imageUrl:'',
      box: {},
      rout:'signin',
      issignedin:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:'',
        joined:''
      }
    } 




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
}


//Load the box face to state

displayFace = (boxes) => {
  this.setState({box:boxes});
}

//Calculating the face box and return the box

calculatingBoundringBox = (data) => {
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
  
}

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
  
  fetch('http://localhost:3001/imageurl',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      input: this.state.input
    })
  })
  .then(response => response.json())
  .then(response => {
    if (response){
      fetch('http://localhost:3001/image',{
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
     this.displayFace(this.calculatingBoundringBox(response));
   }).catch(err => console.warn(err));
}


  render() {
    return (
      <div className="App">
           <Particles className="particles"
                params={particlesOptions} />
        <Navigation onRoutChange={this.onRoutChange} issignedin={this.state.issignedin}/>
        {this.state.rout === 'home'
          ?<div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <Thetestimage imageUrl={this.state.imageUrl} box={this.state.box}/>
              </div>
          :(this.state.rout === 'signin'
            ?<Signinform onRoutChange={this.onRoutChange} loadUser={this.loadUser}/>
            :<Registerform registerUser={this.registerUser} onRoutChange={this.onRoutChange}/>
        )}
          
  </div>
  ); }
}

export default App;
