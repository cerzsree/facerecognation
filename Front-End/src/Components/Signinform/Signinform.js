import React from 'react';

//Ceated by Osama Namur

class Signinform extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail:'',
			signInPassword:'',
			error:false
		}
	}

	signingEmail = (event) => {
		this.setState({signInEmail: event.target.value});
	}

    signingPassword = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignin = () => {
		fetch('https://intense-depths-42987.herokuapp.com/signin',{
			method:'post',
			headers:{'Content-type':'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		}).then(response => response.json())
			.then(user => {
				if (user.id){
					this.props.loadUser(user);
					console.log(user);
					this.props.onRoutChange('home');
				}else{
					this.setState({error:true});
				}
			})
	}

	render(){
	return(
		<div style={{display:'flex',justifyContent:'center'}}>
		<main className="pa4 black-80">
			<div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				{this.state.error === true?<div style={{'backgroundColor':'red'}}>Wrong password/email</div>:null}
				    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
				    <div className="mt3">
					    <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
					    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
					    onChange={this.signingEmail}/>
					</div>
				    <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.signingPassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
				    </div>
			    </fieldset>
			    <div className="">
				    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmitSignin}/>
			    </div>
			    <div className="lh-copy mt3">
				    <p className="f6 link dim black db pointer" onClick={()=>{this.props.onRoutChange('rigister')}}>Sign up</p>
					<p className="f6 link dim black db pointer" onClick={() =>{this.props.loadUser({
																									id: 55,
																									name: "Visitor",
																									email: "None",
																									entries: 0,
																									joined:"2019-07-18T22:23:04.299Z"
																									})
																									this.props.onRoutChange('home');}}>
	  Skip Signing</p>
			    </div>
			</div>
		</main>
		</div>
  )
}
}
export default Signinform;