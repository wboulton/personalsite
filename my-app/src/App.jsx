import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CryptoJS from 'crypto-js';

//other files
import Newaccount from './Newaccount';

function About() {
  return (
    <div style={{ margin: '20px', marginTop: '30px' }}>
      <h1>About Me</h1>
      <p style={{width: '800px'}}>
        My name is William Boulton. I am a freshman at Purdue University in West Lafayette, Indiana studying computer science with
        a focus on cybersecurity. I am interested in CTFs and offensive security, particularly the reverse engineering category.
      </p>
      <p>Contact me using williamdboulton@yahoo.com.</p>

      <h2>Links</h2>
      <p>
        LinkedIn: <a href="https://www.linkedin.com/in/william-boulton-a958832ba/" target="_blank" rel="noopener noreferrer">William Boulton</a>
      </p>
      <p>
        Github: <a href="https://github.com/wboulton" target="_blank" rel="noopener noreferrer">wboulton</a>
      </p>
    </div>
  );
}

// Writeups List Component
function Writeups() {
  const writeups = [
    { name: 'DeadFace 2024 DaCube', link: '/writeups/DeadFace 2024 DaCube' },
    
  ];

  return (
    <div style={{ margin: '20px', marginTop: '30px' }}>
      <h1>Writeups</h1>
      <ul style={{ listStyleType: 'none', padding: 0, fontSize: '25px' }}>
        {writeups.map((writeup, index) => (
          <li key={index}>
            <Link to={writeup.link}>{writeup.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Writeup Detail Component
function WriteupDetail() {
  const { id } = useParams(); // Retrieve the writeup ID from the URL
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch the markdown file dynamically
    fetch(`/writeups/${id}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Markdown file not found');
        }
        return response.text();
      })
      .then((text) => setContent(text))
      .catch((error) => setContent(`# Error\n\n${error.message}`));
  }, [id]);

  return (
    <div style={{ margin: '20px', marginTop: '30px', textAlign: 'left' }}>
      <h1>{id.replace(/-/g, ' ')}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

function Other() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/Dog/images.json')
      .then((response) => response.json())
      .then((data) => {console.log(data); setImages(data);})
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  return (
    <div>
      <h1>Doggo</h1>
      <p>just some pictures of my dog for now</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={`/Dog/${image}`}
            alt={`Dog ${index}`}
            style={{ width: '200px', height: '200px', objectFit: 'cover', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
}

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div style={{ margin: '20px', marginTop: '30px' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '350px' }}>
        <label>
          Username: 
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ margin: '10px 0 10px 10px', padding: '10px', fontSize: '16px' }}
          />
        </label>
        <label>
          Password: 
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: '10px 0 10px 10px', padding: '10px', fontSize: '16px' }}
          />
        </label>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#7f6b00', border: 'none', borderRadius: '5px', cursor: 'pointer', color: 'white' }}>
          Sign In
        </button>
        <Link to="/newaccount" style={{textDecoration: 'none'}}>
          <button type="button" style={{ padding: '10px', marginTop: '10px', backgroundColor: '#7f6b00', border: 'none', borderRadius: '5px', cursor: 'pointer', color: 'white', width: '350px' }}>
            Create Account
          </button>
        </Link>
      </form>
    </div>
  );
}

const Home = () => (
  <div>
    <h1>Welcome to the Home Page</h1>
  </div>
);

const App = () => {
  const [serverPublicKey, setServerPublicKey] = useState(null);

  useEffect(() => {
    // Fetch the server's public key on component mount
    fetch('http://localhost:5000/api/public-key')
      .then(response => response.json())
      .then(data => {
        setServerPublicKey(data.publicKey);
      })
      .catch(error => {
        console.error('Error fetching server public key:', error);
      });
  }, []);

  return (
    <Router>
      <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '10px', color: 'white', position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1', backgroundColor: '#333' }}>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <button style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: '#7f6b00', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          About
            </button>
          </Link>
          <Link to="/writeups" style={{textDecoration: 'none'}}>
            <button style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: '#7f6b00', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Writeups
            </button>
          </Link>
          <Link to="/other" style={{textDecoration: 'none'}}>
            <button style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: '#7f6b00', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Other
            </button>
          </Link>
          <Link to="/signin" style={{textDecoration: 'none'}}>
            <button style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: '#7f6b00', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Sign In
            </button>
          </Link>
        </div>
        <div style={{ marginTop: '60px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/writeups" element={<Writeups />} />
            <Route path="/writeups/:id" element={<WriteupDetail />} />
            <Route path="/other" element={<Other />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/newaccount" element={<Newaccount serverPublicKey={serverPublicKey} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;