import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import 'tachyons';
import Particles from "react-tsparticles";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

componentDidMount(){
  fetch('https://detectfacebackend.onrender.com/')
    .then(response => response.json())
    .then(data => console.log(data))
}

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://detectfacebackend.onrender.com/imageurl', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://detectfacebackend.onrender.com/image', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  calculateFaceLocation = (data) => {
    //console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    const calarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    return {
      leftCol: calarifaiFace.left_col * width,
      topRow: calarifaiFace.top_row * height,
      rightCol: width - (calarifaiFace.right_col * width),
      bottomRow: height - (calarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    //console.log(box);
    this.setState({box: box});
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route})
  }

  render() {
    return (
    <div className="App">
    <Particles
      id="tsparticles"
      className = 'particles'
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 0,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 4,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 40,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />
      <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
      { this.state.route === 'home'
      ? <div>
          <Logo />
          <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
          <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl} />
        </div>
      : (
          this.state.route === 'signin'
          ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
          : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
        ) 
      }      
      {/* JavaScript way of writing documentation */}
    </div>
  );
  }
}

export default App;
