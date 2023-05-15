import React, { useState,useEffect } from "react";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


function DeviceSpeedometer() {
let [telemetryData, setTelemetryData] = useState([]);
let [gatewayiotdevices,setGatewayiotdevices] = useState([]);     
    
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    axios.get(`http://localhost:5000/gatewaydata/api/v1/name/getdevicenames/all`)
		.then(response =>{
		setDevices(response.data); 
		})
  }
  fetchData();
  },[]);
  
  
  const [selectdevice, setdevice] = React.useState('');

  const [selectiotdevice, setiotdevice] = React.useState('');  
  //Selct device Dropdown
  
  const gatewayhandleChange = (event) => {
    setdevice(event.target.value);
    const fetchData = async () => {
    setTelemetryData([]);
    axios.get(`http://localhost:5000/gatewaydata/api/v1/getiotdevices/${event.target.value}`)
    .then((response) => {
    setGatewayiotdevices(response.data);
    });
  }
  fetchData();
  };
   	



    return (
        <React.Fragment>
            <div className="firstwidgets">
            <div className="dropdownselect">
                <div className="selectdropdown">
                    <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                        <InputLabel id="demo-select-small">Select Gateway</InputLabel>
                        <Select labelId="demo-select-small" id="demo-select-small" value={selectdevice} label="Select Gateway" onChange={gatewayhandleChange}>
                            {devices.map(item =>(
              	<MenuItem key={item} value={item}>
              	{item}
              	</MenuItem>
              ))}
              </Select>
                    </FormControl>
                </div>
                <div className="selectdropdown">
                    <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                        <InputLabel id="demo-select-small">Select IoT Devices</InputLabel>
                        <Select labelId="demo-select-small" id="demo-select-small" value={selectiotdevice} label="Select IoT Devices" >
                            {gatewayiotdevices.map(item =>(
              	<MenuItem key={item} value={item}>
              	{item}
              	</MenuItem>
              ))}
              </Select>
                    </FormControl>
                </div>
            </div>
            <div className="speedmeter_wrapper">
               { telemetryData.map((telemetryData) => (
			<div key={telemetryData.device} >
			 <h2 className="text-center">{telemetryData.resourcename}</h2>
			 <div>
			 <span>{telemetryData.devvalue}</span>
			 <span style = {{margin: "0 10px" }}></span>
			 <span>{telemetryData.units}</span>
			 </div>
               		 <div className="dev_speed">
               		<ReactSpeedometer
               		minValue = {-50}
                        maxValue= {10000}
                        value = {parseFloat(telemetryData.devvalue)}
                        segments={10}
                        segmentColors={["#FF7D7D", "#FAEA48","#14C38E"]}
                        currentValueText={55 + "F"}
                        needleColor="black"
                        width={280}
                        height={150}
                        ringWidth={40}
                        needleHeightRatio={0.40}
                        valueTextFontSize={'12px'}
                        needleTransitionDuration={10000}
                        needleTransition="easeElastic"
                        labelFontSize={'11px'}
                        fluidWidth="true"
	                 />
			    </div> 
			</div>
	               ))}	
            	</div>
            </div>

            
        </React.Fragment>
    )
}
export default DeviceSpeedometer;
