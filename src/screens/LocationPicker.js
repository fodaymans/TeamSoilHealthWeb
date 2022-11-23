import React, { useState, useEffect } from "react";
import MapPicker from "react-google-map-picker";


import axios from 'axios';


const DefaultLocation = { lat: 21.7679, lng: 78.8718 };
const DefaultZoom = 10;
export default function LocationPicker() {
  var jsonQuery = require("json-query");

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const Apikey = "AIzaSyD8eR9xHYhGQexaWcjrrgsZl4SC4jvmi30";

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [users, setUsers] = useState([]);
  const [SoilData, setFertilityDetails] = useState([]);
  const [CropData, setCropData] = useState([]);

  const [image, setImage] = useState('')
  const [imageData, setImageData] = useState([]);

  const [showImage, setShowImage] = useState('')


  const handleUploadImg = (e) => {
    setImage(e.target.files[0])
    setShowImage(URL.createObjectURL(e.target.files[0]));
    
    console.log("imgs",e.target.files)
  }


  const handleApi = () => {

    const url = 'https://soilnet.herokuapp.com/predict';

    const formData = new FormData();
    formData.append ('image', image)
    axios.post(url,formData).then((res)=>{
        console.log(res)
    })

  }


  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }


//   function handleSubmits() {

//     const formData = new FormData();
//     formData.append('image', imgfile);
//     // formData.append('fileName', imgfile.name);

//     fetch(
//         `https://soilnet.herokuapp.com/predict?image=${imgfile}`,
//         {
//           method: "POST",
//           mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit

//     headers: {
//         'Content-Type': 'multipart/form-data'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: {
//         formData

//       }
//         //   body: JSON.stringify(
//         //     {
//         //     image : imgfile,
           
//         // }
//         // )
//         }

        
        

//       )
//         .then((response) => {
//           return response.json();
//         })
  
//         .then((data) => {
//           console.log("image Data", data);
  
//         //   setImageData(data);
//           // setCropData(data.crop)
//         });



//   }


//   function handleSubmit(event) {
//     event.preventDefault()
//     const url = 'https://soilnet.herokuapp.com/predict';
   
//     const formData = new FormData();
//     formData.append('image', file);
//     formData.append('fileName', file.name);
//     const config = {
//       headers: {
//         'content-type': 'form-data',
        

//       },
//     };
//     axios.post(url, formData, config).then((response) => {
//       console.log(response.data);
//     });

//   }

//   const visit = (obj, fn) => {
//     const values = Object.values(obj);

//     values.forEach((val) =>
//       val && typeof val === "object" ? visit(val, fn) : fn(val)
//     );
//   };

//   const print = (val) => console.log(val);

//   const person = {
//     name: {
//       first: "John",
//       last: "Doe",
//     },
//     age: 15,
//     secret: {
//       secret2: {
//         secret3: {
//           val: "I ate your cookie",
//         },
//       },
//     },
//   };

//   visit(SoilData, print);

  // console.log(data)

  //   const data = this.state.myPosts;
  //   const display = Object.keys(SoilData).map((d, key) => {
  //   const {Fertility,crop} = SoilData;

  //   const {cec,clay,nitrogen,pH,sand} = Fertility;

  //   console.log("get",cec)

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
    fetchDatas();
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }







//   useEffect(() => {
//     fetchDatas();
//   }, []);

  const fetchData = async () => {
    let response = await (
      await fetch(
        `https://soil-health.herokuapp.com/post?Lat=19.704656&Long=74.248489&date=2022-07-01&end_dt=2022-07-30`,
        {
          // headers: {
          //   'X-RapidAPI-Key': '9064987f28msh1b2242452d7835dp16ee76jsndf25981e7a43',
          // },
          method: "POST",

          // body: JSON.stringify(
          //     {
          //     Lat : Location.Lat,
          //     Long : Location.Long,
          //     date : "2022-07-01",
          //     end_dt : "2022-07-30"
          // })
        }
      )
    ).json();
    setFertilityDetails(response);
    console.log("api response", response);
  };

 

  const fetchDatas = () => {
    fetch(
      `https://soil-health.herokuapp.com/post?Lat=19.704656&Long=74.248489&date=2022-07-01&end_dt=2022-07-30`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        console.log("api response", data);

        setFertilityDetails(data);
        // setCropData(data.crop)
      });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#f5f5f5 is",
          margin: 20,
          border: 5,
          borderRadius: 30,
          width: 900,
          borderWidth: 4,
          borderColor: "green",
          display: "flex",
        }}
      >
        <MapPicker
          defaultLocation={defaultLocation}
          zoom={zoom}
          mapTypeId="roadmap"
          style={{ height: "400px", width: "450px", margin: 30 }}
          onChangeLocation={handleChangeLocation}
          onChangeZoom={handleChangeZoom}
          apiKey={Apikey}
        />


        <div
          style={{
            marginLeft: 10,
            borderWidth: 5,
            width: 150,
            justifyContent: "center",
            backgroundColor: "#00176A",
            borderColor: "#7ED7E1",
            padding: 10,
            height: 400,
            marginTop: 20,
          }}
        >
          <button onClick={handleResetLocation}>Reset Location</button>
          <label style={{ color: "white" }}>Latitude:</label>
          <input
            style={{ color: "black", backgroundColor: "white" }}
            type="text"
            value={location.lat}
            disabled
          />
          <label style={{ color: "white" }}>Longitude:</label>
          <input
            style={{ color: "black", backgroundColor: "white" }}
            type="text"
            value={location.lng}
            disabled
          />
        
        </div>



        <div
          style={{
            marginLeft: 10,
            borderWidth: 5,
            width: 250,
            justifyContent: "center",
            backgroundColor: "#00176A",
            borderColor: "#7ED7E1",
            padding: 10,
            height: 400,
            marginTop: 20,
          }}
        >
          <label style={{ color: "white" }}>Upload Soil Image </label>
          {/* <form onSubmit={handleSubmits}> */}
             <input type="file"  onChange={handleUploadImg} />

          <button  onClick={handleApi}>Upload</button>
          {/* </form> */}

          <h2>Preview</h2>
          <img alt="img" src={showImage} style={{height: 150, width: 150}} />

          {/* <label style={{ color: "white" }}>{visit} </label> */}
        </div>







        {/* <div
          style={{
            marginLeft: 10,
            borderWidth: 5,
            width: 150,
            justifyContent: "center",
            backgroundColor: "#00176A",
            borderColor: "#7ED7E1",
            padding: 10,
            height: 400,
            marginTop: 20,
          }}
        >
          <label style={{ color: "white" }}>Soil Type </label>

          <label style={{ color: "white" }}>{visit} </label>
        </div> */}
      </div>
    </>
  );
}
