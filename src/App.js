import './App.css';
import './Map.css';
import { MapContainer, TileLayer, useMap,ZoomControl, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useState } from 'react';
import { Icon, divIcon } from "leaflet";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Settings } from '@mui/icons-material';
import MarkerClusterGroup from 'react-leaflet-cluster';
import ReactPlayer from 'react-player';
import LocationMarker from './LocationMarker';
import VoteButtons from './VoteButtons';
import './VoteButtons.css';

function App() {
  const { collapseSidebar } = useProSidebar();

  //Marker Icon
  const markerIcon = new Icon({
    iconUrl: "/location.png",
    iconSize: [38, 38] // Size of the Icon
  });
  //IconGroup Icon
  const createMarkerClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    });
  }
  //Podcast 
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);

  const handlePodcastPlayback = (podcast) => {
    setIsPodcastPlaying(!isPodcastPlaying);
  };

  //Position Update goes in here 
  const [currentPosition, setCurrentPosition] = useState(null);

  const handlePositionUpdate = (position) => {
    setCurrentPosition(position);
  };

  //TODO: Get Markers from MongoDB
  ///Summary -> 
  //
  const markers = [
    {
      geocode: [50.9850201235267, 7.1300323420097],
      markerName: "Hello World!",
      description: "Test",
      podcast: {"Moritz" : ""},
    },
    {
      geocode: [50.9940345366367, 7.1300332345300097],
      markerName: "Hello World2!",
      description: "Test",
      podcast: {"Help" : "Test"},
    },
    {
      geocode: [50.994034536367, 7.14005343453097],
      markerName: `<h2>Wallo</h2>`,
      description: "Test",
      podcast: {"Test": " "}
    },
    {
      geocode: [50.98402014466367, 7.120033487900097],
      markerName: "BIB International College",
      description: "Das bib International College bietet praxisorientierte Ausbildungs- und Studienmöglichkeiten in den Bereichen Informatik, Wirtschaft, Mediendesign und Game an. Mit den staatlich anerkannten Ausbildungen begleiten wir Schüler auf ihrem Weg: vom Realschulabschluss, der Fachhochschulreife oder dem Abitur bis zum Berufsabschluss oder dem internationalen Bachelor.",
      podcast: {"How To BIB" : "", "Test" : ""},
    }
  ];
  //TODO: Sidebar -> Make a second sidebar for the different points like google.
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <div id="sidebar">
        <Sidebar style={{ height: "100vh" }}>
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "center" }}
            >
              {" "}
              <div class="appLogoDiv">
                <img src="/smartphone.png" class="appLogo" alt="logo" />
                <h2>Geo Guru</h2>
              </div>
            </MenuItem>
            <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
            <MenuItem icon={<PeopleOutlinedIcon />}>Friends</MenuItem>
            <MenuItem icon={<ContactsOutlinedIcon />}>Profile</MenuItem>
            <MenuItem icon={<ReceiptOutlinedIcon />}>Preferences</MenuItem>
            <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
            <MenuItem icon={<Settings />}>Settings</MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div id="map">
        <MapContainer center={[50.98402014466367, 7.120033487900097]} zoom={15} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className='zooming'
          />
          <ZoomControl position="bottomright" />
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createMarkerClusterIcon}
          >
            {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={markerIcon}>
              <Popup>
                <div className="marker-header">
                  <h2 style={{ marginBottom: '0.6rem', marginTop: '0.5rem' }}>{marker.markerName}</h2>
                  <VoteButtons></VoteButtons>
                </div>
                <p>{marker.description}</p>
                {marker.podcast && (
                  <div>
                    {Object.entries(marker.podcast).map(([podcastName, songUrl], index) => (
                      <div key={index}>
                        <h4 style={{margin: 0}}>{podcastName}</h4>
                        <ReactPlayer
                          className='audio-player'
                          url={"https://github.com/prof3ssorSt3v3/media-sample-files/blob/master/fight-club.mp3"}
                          playing={isPodcastPlaying}
                          controls
                          config={{
                            file: {
                              attributes: {
                                controlsList: 'nodownload', // Disable download option
                              },
                            },
                          }}
                          onPause={() => setIsPodcastPlaying(false)}
                          onPlay={() => setIsPodcastPlaying(true)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Popup>
            </Marker>
          ))}

          </MarkerClusterGroup>
          <LocationMarker onPositionUpdate={handlePositionUpdate}></LocationMarker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
