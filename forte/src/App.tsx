import React, { useEffect, useState } from 'react';
import Core from './core/Core';
import LandingPage from './LandingPage';
import { getItem } from './core/utils/functions/localStorage';

function App() {
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    const token:any = getItem('token');
    token?.token?.length && setToken(token);
  }, [])

  return (
    <div className="App">
      {
        token?.token?.length ? 
        (<Core token={token}/>) :
        (<LandingPage setToken={(value:string) => setToken(value)} />)
      }
    </div>
  );
}

export default App;
