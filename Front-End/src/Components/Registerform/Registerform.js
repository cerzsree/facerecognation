import React from 'react';

//Created by Osama Namur

class Registerform extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name:'',
			email:'',
			password:''
		}
	}

	registerName = (event) =>{
		this.setState({name:event.target.value});
	}

	registerEmail = (event) => {
		this.setState({email: event.target.value});
	}

    registerPassword = (event) => {
		this.setState({password: event.target.value});
	}

	onSubmitRegister = () => {
		console.log('register');
		fetch('https://intense-depths-42987.herokuapp.com/register',{
			method:'post',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({
				name:this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		}).then(response => response.json())
			.then(user => {
				if (user.id){
					this.props.registerUser(user)
					this.props.onRoutChange('home');
				}
			})
	}

	render(){
		return(
			<div style={{display:'flex',justifyContent:'center'}}>
			<main className="pa4 black-80">
				<div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					    <legend className="f4 fw6 ph0 mh0">Register</legend>
					    <div className="mt3">
						    <label className="db fw6 lh-copy f6" htmlFor="first_name">First Name</label>
						    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						    type="text" 
						    name="second_name"  
						    id="firstName"
						    onChange={this.registerName}/>
						</div>
						<div className="mt3">
						    <label className="db fw6 lh-copy f6" htmlFor="second_name">Email</label>
						    <input onChange={this.registerEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="seconf_name"  id="secondName"/>
						</div>
					    <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password"
					        onChange={this.registerPassword}/>
					    </div>
				    </fieldset>
				    <div className="">
					    <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
				    </div>
				    <div className="lh-copy mt3">
					    <p className="f6 link dim black db pointer" onClick={()=>{this.props.onRoutChange('signin')}}>Already have an account?Sign in</p>
				    </div>
				</div>
			</main>
			</div>
		)
	}
}

export default Registerform;