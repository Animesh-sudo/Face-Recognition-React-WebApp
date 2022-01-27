import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ( {imageUrl, box} ) => {
	return(
		<div className = 'center ma' >
			<div className = 'absolute mt2'>
				<img id = 'inputimage' alt = '' src = {imageUrl} width ='500px' height = 'auto' />
				<div className = 'bounding-box' style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} ></div>
			</div>
		</div>
	);
}
//we set width to 500px and height to auto so that the image won't get sequessed up. Height will be automatically adjusted 
export default FaceRecognition;