import './App.css';
import './Map.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

import { Icon, divIcon } from "leaflet";
import L from "leaflet";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { NotListedLocation, Settings } from '@mui/icons-material';
import MarkerClusterGroup from 'react-leaflet-cluster';

function App() {
  const { collapseSidebar } = useProSidebar();

  //Marker Icon
  const markerIcon = new Icon({
    iconUrl: "/location.png",
    iconSize: [38,38] // Size of the Icon
  })
  //IconGroup Icon
  const createMarkerClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    })
  }


  const markers = [
    {
      geocode: [50.9850201235267, 7.1300323420097],
      popUp: "Hello World!"
    },
    {
      geocode: [50.9940345366367, 7.1300332345300097],
      popUp: "Hello World2!"
    },
    {
      geocode: [50.994034536367, 7.14005343453097],
      popUp: "Hello World3!"
    },
    {
      geocode: [50.98402014466367, 7.120033487900097],
      popUp: "BIB International College.\nDas bib International College bietet praxisorientierte Ausbildungs- und Studienmöglichkeiten in den Bereichen Informatik, Wirtschaft, Mediendesign und Game an. Mit den staatlich anerkannten Ausbildungen begleiten wir Schüler auf ihrem Weg: vom Realschulabschluss, der Fachhochschulreife oder dem Abitur bis zum Berufsabschluss oder dem internationalen Bachelor. <br /> "
    }
  ]

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
              <h2>{<NotListedLocation/>}Geo Guru</h2>
            </MenuItem>
            <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
            <MenuItem icon={<PeopleOutlinedIcon />}>Friends</MenuItem>
            <MenuItem icon={<ContactsOutlinedIcon />}>Profile</MenuItem>
            <MenuItem icon={<ReceiptOutlinedIcon />}>Preferences</MenuItem>
            <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
            <MenuItem icon={<Settings/>}>Settings</MenuItem>
          </Menu>
        </Sidebar> 
      </div>
        <div id="map">
          <MapContainer center={[50.98402014466367, 7.120033487900097]} zoom ={15}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className='zooming'
            />
            <MarkerClusterGroup 
              chunkedLoading
              iconCreateFunction={createMarkerClusterIcon}
            >
              {markers.map(markers => (
                <Marker position={markers.geocode} icon={markerIcon} >
                  <Popup>{markers.popUp}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
    </div>
    
  );
}



export default App;
