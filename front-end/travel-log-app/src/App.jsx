import {getData, postData} from './api/api'
import { useEffect, useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import Form from './utils/form'
import "./App.css"
import 'mapbox-gl/dist/mapbox-gl.css';


function App() {
  const [logEntries, setLogEntries] = useState([])  
  const [addEntry, setAddEntry] = useState({longitude: null, latitude: null})
  const [showPopup, setShowPopup] = useState({})
  
  //get log enteries
  const getEnteries = async () => {
    const data = await getData()
    setLogEntries(data.logs)
  }
  // load initial enteries
  useEffect(() => {
    getEnteries()
  }, [])

  //popup when clicking on marker
  const clicked = (log) => {
    setShowPopup({ [log._id]: true})
  }

  
  const addMarker = (e) => {
    setAddEntry( {
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    })
    console.log(addEntry);
    
  }
  
  return (
    <>
    <Map
      onDblClick={(e) => addMarker(e)}
      className="main map"
      mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
      initialViewState={{
        longitude: 14.995463,
        latitude: 46.151241,
        zoom: 6,
      }}
      style={{width:"100vw",height:"100vh"} }
      mapStyle="mapbox://styles/mapbox/streets-v9"
      >
      {logEntries && logEntries.map((log) => {
        return(
          <>
          <Marker  
            key={log._id} 
            longitude={log.longitude} 
            latitude={log.latitude} 
            anchor="bottom" >
            <div onClick={() => clicked(log)} >
              <svg 
                className='map-pin' 
                style={{width:"50px",height: "50px",}} 
                viewBox="0 0 24 24"  
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {showPopup[log._id] &&
            <Popup 
            longitude={log.longitude} 
            latitude={log.latitude}
            closeOnClick={false}
            dynamicPosition={true}
            anchor="top"
            className='popup'>
            <div className="popup-text"> 
            {/* add  the update and delete btn and and functio */}
              <h2>{log.title}</h2>
              {log.image && <img src={log.image} alt="image" className="popup-image" /> }
              {log.description && <p>{log.description}</p>}
              {log.dateVisited && <p>{log.dateVisited}</p>}
            </div>
            </Popup>}
          </>
          )
        }
      )}
      {addEntry.longitude ? 
      <>
      <Marker className="marker" 
        key={addEntry.latitude + addEntry.longitude} 
        longitude={addEntry.longitude} 
        latitude={addEntry.latitude} 
        anchor="bottom" >
        <div onClick={() => setShowPopup({[_id] : true})}>
          <svg 
            className='map-pin' 
            style={{width:"50px",height: "50px",}} 
            viewBox="0 0 24 24"  
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      </Marker>
      <Popup 
        longitude={addEntry.longitude} 
        latitude={addEntry.latitude}
        closeOnClick={false}
        dynamicPosition={true}
        anchor="top"
        className='popup'>
        <Form  onClose={() => {
          getEnteries()
          setAddEntry({longitude: null, latitude: null})
          setShowPopup(false)
        }
        
          } 
          longitude={addEntry.longitude} latitude={addEntry.latitude}/>
      </Popup>
      </>
      : null}

      
      </Map>
      </>
  );
}

  export default App
