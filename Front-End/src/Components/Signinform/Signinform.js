import React from 'react';

class Signinform extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail:'',
			signInPassword:''
		}
	}

	signingEmail = (event) => {
		this.setState({signInEmail: event.target.value});
	}

    signingPassword = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignin = () => {
		fetch('http://localhost:3001/signin',{
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
				    <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
			    </fieldset>
			    <div className="">
				    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmitSignin}/>
			    </div>
			    <div className="lh-copy mt3">
				    <p className="f6 link dim black db pointer">Sign up</p>
				    <a href="#0" className="f6 link dim black db">Forgot your password?</a>
			    </div>
			</div>
		</main>
		</div>
  )
}
}
export default Signinform;