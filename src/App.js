import './App.css';
import './Map.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Icon } from "leaflet";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { NotListedLocation, Settings } from '@mui/icons-material';

function App() {
  const { collapseSidebar } = useProSidebar();
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
            <Marker position={[50.98402014466367, 7.120033487900097]}>
              <Popup>
                BIB International Collage <br />
              </Popup>
            </Marker>
          </MapContainer>
        </div>
    </div>
    
  );
}

export default App;
