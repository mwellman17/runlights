import React from 'react';

const SignIn = props => {

  return(
		<div>
      <div className="text-center">
        <h1>Welcome to RunLights</h1>
        <h3>A mobile toolkit for lighting professionals.</h3>
      </div>
      <div className="row">
        <div className="landing columns medium-12 large-6">
          <img className="home-image" src="/images/fixture-image.png" />
          <h3 className="text-center"><a href='/fixtures'>Create Fixtures</a></h3>
        </div>
        <div className="landing columns medium-12 large-6">
          <img className="home-image" src="/images/show-image.png" />
          <h3 className="text-center"><a href='/users/sign_in'>Build a Show</a></h3>
        </div>
        <div className="landing columns medium-12 large-6">
          <img className="home-image rectangle" src="/images/pdf-image.png" />
          <h3 className="text-center"><a href='/users/sign_in'>Export and Share</a></h3>
        </div>
        <div className="landing columns medium-12 large-6">
          <img src="/images/runlights.png" />
          <h3 className="text-center"><a href='/users/sign_in'>Sign In to Get Started</a></h3>
        </div>
      </div>
		</div>
  )
}

export default SignIn;
