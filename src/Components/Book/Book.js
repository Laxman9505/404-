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

export default function Book() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const iconHandler = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log(isDropdownOpen);
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

  return (
    <div>
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
        <h2>Fill the Form</h2>
        <form action="">
          <label htmlFor="Name">Name:</label>
          <input type="text" placeholder="Enter Your Name" required />
          <label htmlFor="Vehicle Registeration Number">
            Vehicle Registeration Number:
          </label>
          <input type="text" placeholder="Enter your Vehicle number" required />
          <label htmlFor="Time"> Arrival Time: </label>
          <input type="time" placeholder="Enter the time" required />
          <label htmlFor="Location"> Location : </label>
          <div className="drop-down" onClick={iconHandler}>
            <p>Please Select the location</p>

            <KeyboardArrowRightIcon
              className={`icon1 ${isDropdownOpen && "open"}`}
            />
          </div>
          <label htmlFor="Phone Number">Phone Number: </label>
          <input type="number" required placeholder="Enter your number" />
          <button type="submit">Book</button>
        </form>
      </div>
    </div>
  );
}
