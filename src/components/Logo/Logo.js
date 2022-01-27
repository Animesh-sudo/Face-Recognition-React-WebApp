import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
	return(
		<div className = 'ma4 mt0'>
			<Tilt className = ' Prop br2 shadow-2 parallax-effect' scale = {1.1} perspective={500} style={{ height: '100px', width: '100px'}}>
      			<div className = 'pa3'>
        			<img style = {{paddingTop: '4px'}} alt = 'logo' src = {brain} />
      			</div>
    		</Tilt>
		</div>
	);
}

export default Logo;