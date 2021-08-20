import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "./Book.css";
import RoomIcon from "@material-ui/icons/Room";
import Modal from "../UI/Modal";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useRef } from "react";
import { useEffect } from "react";
import overlayImage from "../../images/book.jpg";

export default function Book() {
  const [userData, setUserData] = useState({
    name: "",
    regNo: "",
    phoneNum: "",
    destination: "",
    time: "",
  });
  const [loactionInformation, setLocationInformation] = useState();
  const [locationData, setLocationData] = useState();
  const url = "https://smart-5c464-default-rtdb.firebaseio.com/book/";
  const [location, setLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [items, setItems] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const postBookForm = async (e) => {
    const { name, regNo, phoneNum, destination, time } = userData;

    e.preventDefault();
    const response = await fetch(`${url}${location}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        regNo,
        phoneNum,
        destination: location,
        time,
      }),
    });
  };

  const getLocationInformation = async () => {
    const response = await fetch(
      `https://smart-5c464-default-rtdb.firebaseio.com/book.json`,
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    /* const { sinamangal, dillibazar, putalisadak, baneshor } = responseData; */
    setLocationInformation(responseData);
  };

  const iconHandler = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = async (id, label) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    iconHandler();
    setLocation(label);
    await getLocationInformation();
    await console.log(loactionInformation.sinamangal.length);
  };
  const markerpositons = [
    {
      position: {
        lat: 27.70535,
        lng: 85.32939,
      },
    },
    {
      position: {
        lat: 27.7,
        lng: 85.329,
      },
    },
    {
      position: {
        lat: 27.78,
        lng: 85.3295,
      },
    },
  ];
  const data = [
    { id: 1, label: "putalisadak" },
    { id: 2, label: "dillibazar" },
    { id: 3, label: "baneshor" },
    { id: 4, label: "sinamangal" },
  ];
  const [center, setCenter] = useState({
    lat: 27.70535,
    lng: 85.32939,
  });
  const [center2, setCenter2] = useState({
    lat: 27.7,
    lng: 85.329,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const zoomLevel = 100;
  const locationClikedHandler = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };
  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  /*   useEffect(async () => {
    const res = await fetch(url, {
      method: "GET",
    });
    const response = await res.json();
    console.log(response);
  }, []);
 */
  return (
    <div className="whole-book">
      <div className="book-inner">
        <img src={overlayImage} alt="" className="overlay" />
        {isModalOpen && (
          <Modal className="ModalMap" closeModal={modalCloseHandler}>
            <h2>Please mark the Location you want</h2>
            <MapContainer
              center={center}
              zoom={zoomLevel}
              className="leaflet"
              closePopupOnClick={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markerpositons.map((position, index) => {
                return (
                  <Marker position={position.position} key={index} onCl>
                    <Popup>This is the first marker </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </Modal>
        )}
        <div className="book-form">
          <h1>Fill the Form</h1>
          <form action="" onSubmit={postBookForm}>
            <label htmlFor="Name">Name:</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              required
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />

            <label htmlFor="Phone Number">Phone Number:</label>
            <input
              type="number"
              required
              placeholder="Enter your number"
              value={userData.phoneNum}
              onChange={(e) =>
                setUserData({ ...userData, phoneNum: e.target.value })
              }
            />
            <label htmlFor="Vehicle Registeration Number">
              Vehicle Registeration Number:
            </label>
            <input
              type="text"
              placeholder="Enter your Vehicle number"
              required
              value={userData.regNo}
              onChange={(e) =>
                setUserData({ ...userData, regNo: e.target.value })
              }
            />
            <label htmlFor="Time"> Arrival Time: </label>
            <input
              type="time"
              placeholder="Enter the time"
              required
              value={userData.time}
              onChange={(e) =>
                setUserData({ ...userData, time: e.target.value })
              }
            />
            <label htmlFor="Location"> Location : </label>
            <div className="location">
              <div className="drop-down">
                <div className="drop-down-header" onClick={iconHandler}>
                  <p>
                    {selectedItem
                      ? data.find((item) => item.id == selectedItem).label
                      : "please select the location"}
                  </p>

                  <KeyboardArrowRightIcon
                    className={`icon1 ${isDropdownOpen && "open"}`}
                  />
                </div>
                <div className={`drop-down-body ${isDropdownOpen && "open"}`}>
                  {data.map((item) => {
                    const { id, label } = item;
                    return (
                      <p key={id} onClick={() => handleItemClick(id, label)}>
                        <span
                          className={`dot ${id == selectedItem && "active"}`}
                        >
                          •
                        </span>
                        {label}
                      </p>
                    );
                  })}
                </div>
              </div>
              <button
                className="map-button"
                type="button"
                onClick={locationClikedHandler}
              >
                <RoomIcon />
              </button>
            </div>
            {location && (
              <p className="parking-space">
                5 parking slot is available in {location}
              </p>
            )}
            <button type="submit">Book</button>
          </form>
        </div>
      </div>
    </div>
  );
}
