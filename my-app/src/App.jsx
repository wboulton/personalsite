import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// About Page Component
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
    { name: 'dacube', link: '/writeups/dacube' },
    
  ];

  return (
    <div style={{ margin: '20px', marginTop: '30px' }}>
      <h1>Writeups</h1>
      <ul>
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

// Main App Component
function App() {
  const [marginX, setMarginX] = useState(20);

  return (
    <Router>
      {/* Top bar with buttons */}
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
          <button style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: '#7f6b00', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Other
          </button>
        </div>

        {/* Bottom-right corner logos and title */}
        <div style={{ position: 'fixed', bottom: '10px', right: '10px', textAlign: 'right' }}>
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" style={{ marginRight: '10px' }} />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <h1 style={{ fontSize: '10px', margin: '5px 0' }}>Vite + React</h1>
        </div>

        {/* Content Padding to Avoid Overlap */}
      <div style={{ marginTop: '60px' }}>
        {/* Routes */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Navigate to="/about" />} />
          <Route path="/writeups" element={<Writeups />} />
          <Route path="/writeups/:id" element={<WriteupDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
