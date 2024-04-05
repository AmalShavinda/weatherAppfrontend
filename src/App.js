import React from "react";
import WeatherMap from "./WeatherMap";

function App() {
  
  return (
    <div className="App" style={{ backgroundColor: '#43a5be', padding: '20px 0' }}>
      <header className="App-header">
        <h1 style={{ textAlign: 'center', color: 'White' }}>Department of Meteorology</h1>
        <h2 style={{ textAlign: 'center', color: 'White' }}>Sri Lanka Weather Map</h2>
      </header>
      <WeatherMap/>
    </div>
  );
}

export default App;
