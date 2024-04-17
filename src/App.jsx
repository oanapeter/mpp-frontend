import './App.css';
import { Details } from './pages/Details';
import Home from './pages/Home';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import CatChartPage from './pages/CatChartPage';
import { AddPage } from './pages/AddPage';
import { CatsContext } from './model/Context';
import { useEffect, useState } from 'react';
import { listCats } from './service/Service';
import {io} from "socket.io-client";

function App() {
  const [cats, setCats] = useState([]);
  const [serverIsUp, setServerIsUp] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);



  useEffect(() => {
    getAllCats();
  }, []);

  useEffect(() => {
    const socket = io('ws://localhost:9092/');
    socket.on('connect_error', (error) => {
      console.error('Error connecting to the server', error);
    });
    socket.on('connection_timeout', () => {
      console.error('Connection timeout');
    });
    socket.on('newCat', (cats) =>{
      setCats(cats);
      console.log(cats);
      console.log('New cat added');
      alert('New cat added');
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const getAllCats = () => {
    listCats().then((response) => {
      setCats(response.data);
    }).catch((error) => {
      console.error('Error fetching data', error);
    })}

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!navigator.onLine) {
          throw new Error('No internet connection');
        }

        const response = await fetch('http://localhost:8080/api/cats');
        if (!response.ok) {
          throw new Error('Server is not responding');
        }
        const data = await response.json();
        setCats(data);
      } catch (error) {
        console.error(error);
        setServerIsUp(false);
      }
    };

    fetchData();

    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  if (!serverIsUp) {
    return <h1>Server is not responding</h1>;
  }

  if (!isOnline) {
    return <h1>No internet connection</h1>;
  }

  return (
    <CatsContext.Provider value={{ cats, setCats }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cats" element={<Home />} />
          <Route path="/entity/:index" element={<Details />} />
          <Route path="/chart" element={<CatChartPage />} />
          <Route path="/add-cat" element={<AddPage />} />
          <Route path="/update-cat/:id" element={<AddPage />} />
        </Routes>
      </Router>
    </CatsContext.Provider>
  );
}

export default App;
