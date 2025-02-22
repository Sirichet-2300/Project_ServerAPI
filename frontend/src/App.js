import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    axios.post('http://localhost:5000/register', { username, password })
      .then(res => {
        if (res.data.success) navigate('/login');
        else alert('Registration failed');
      });
  };

  return (
    <div className='container mt-4'>
      <h2>Register</h2>
      <input className='form-control' placeholder='Username' onChange={e => setUsername(e.target.value)} />
      <input className='form-control mt-2' type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
      <button className='btn btn-primary mt-3' onClick={handleRegister}>Register</button>
    </div>
  );
}


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('http://localhost:5000/login', { username, password })
    .then(res => {
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    });
  };

  return (
    <div className='container mt-4'>
      <h2>Login</h2>
      <input className='form-control' placeholder='Username' onChange={e => setUsername(e.target.value)} />
      <input className='form-control mt-2' type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
      <button className='btn btn-primary mt-3' onClick={handleLogin}>Login</button>
    </div>
  );
}


function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:5000/logout').then(() => {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    });
  };

  return (
    <div className='container mt-4 text-center'>
      <h2>Inventory Management</h2>
      
      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <button className='btn btn-danger m-2' onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button className='btn btn-primary m-2' onClick={() => navigate('/login')}>Login</button>
          <button className='btn btn-secondary m-2' onClick={() => navigate('/register')}>Register</button>
        </>
      )}

      <div className="mt-4">
        <Link className='btn btn-success m-2' to='/insert'>Insert Product</Link>
        <Link className='btn btn-info m-2' to='/search'>Go to Search</Link>
      </div>
    </div>
  );
}



function Search() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = () => {
    axios.get(`http://localhost:5000/search?query=${query}`).then(res => setProducts(res.data));
  };

  return (
    <div className='container mt-4'>
      <h2>Search Products</h2>
      <input className='form-control' placeholder='Enter product name' onChange={e => setQuery(e.target.value)} />
      <button className='btn btn-primary mt-3' onClick={handleSearch}>Search</button>
      <ul className='list-group mt-3'>
        {products.map(p => (
          <li key={p.id} className='list-group-item'>{p.name} - {p.quantity}</li>
        ))}
      </ul>
    </div>
  );
}


function Insert() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleInsert = () => {
    axios.post('http://localhost:5000/insert', { name, quantity })
      .then(res => alert(res.data.success ? 'Inserted successfully' : 'Insert failed'));
  };

  return (
    <div className='container mt-4'>
      <h2>Insert Product</h2>
      <input className='form-control' placeholder='Product Name' onChange={e => setName(e.target.value)} />
      <input className='form-control mt-2' type='number' placeholder='Quantity' onChange={e => setQuantity(e.target.value)} />
      <button className='btn btn-success mt-3' onClick={handleInsert}>Insert</button>
    </div>
  );
}


function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:5000/logout').then(() => {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    });
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to='/'>Inventory System</Link>
      <div className='navbar-nav'>
        {user ? (
          <>
            <span className='nav-item nav-link'>Welcome, {user.username}</span>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className='nav-item nav-link' to='/home'>Home</Link>
            <Link className='nav-item nav-link' to='/login'>Login</Link>
            <Link className='nav-item nav-link' to='/register'>Register</Link>
            
          </>
        )}
        <Link className='nav-item nav-link' to='/search'>Search</Link>
        <Link className='nav-item nav-link' to='/insert'>Insert</Link>
      </div>
    </nav>
  );
}


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/insert' element={<Insert />} />
      </Routes>
    </Router>
  );
}

export default App;
