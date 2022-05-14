import React from "react";
import Navbar from "../components/Navbar";
import LineChart from "../components/Charts/LineChart";
import BarChart from "../components/Charts/BarChart";



function Home() {
  return (
    <div className="home">
        <Navbar/>
        
      <div class="container">
            <h1 class="font-weight-light">Home</h1>
            <p>
              This graph is only for testing 
            </p>
            <BarChart/>
            <LineChart></LineChart>
            <button>Upload</button>
            <button>Zone</button>
        </div>
    </div>
  );
}

export default Home;