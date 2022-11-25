import { Map, Marker } from "pigeon-maps";
import "./map.style.css";
import Chart from "./Chart";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

export default function PegionMap(props) {
  const authCtx = useContext(AuthContext);
  const {
    latitude,
    longitude,
    country,
    name,
    subregion,
    region,
    summit,
    last_eruption,
    elevation,
  } = props.volcanoData;
  const center = [parseFloat(latitude), parseFloat(longitude)];
  console.log("render");
  console.log(props);
  return (
    <div className="pegion-map">
      <div class="fixed">
        <div className="card  container">
          <div className="card-title pt-5 px-4">
            <h2 className="text-light">Volcano: {name}</h2>
          </div>
          <hr className="container bg-light "></hr>
          <div className="row card-body text-light">
            <div className="data-container col-md-6">
              <p className="data-title">
                Country: <span className="data">{country}</span>
              </p>
            </div>
            <div className="data-container col-md-6">
              <p className="data-title">
                Region: <span className="data">{region}</span>
              </p>
            </div>
            <div className="data-container col-md-6">
              <p className="data-title">
                Subregion: <span className="data">{subregion}</span>
              </p>
            </div>
            <div className="data-container col-md-6">
              <p className="data-title">
                Last Eruption: <span className="data">{last_eruption}</span>
              </p>
            </div>
            <div className="data-container col-md-6">
              <p className="data-title">
                Summit: <span className="data">{summit}</span>m
              </p>
            </div>
            <div className="data-container col-md-6">
              <p className="data-title">
                Elevation: <span className="data">{elevation}</span>ft
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-item">
        <Map defaultCenter={[0, 0]} defaultZoom={2} mouseEvents={false}>
          <Marker width={50} anchor={center} />
        </Map>
      </div>
    </div>
  );
}
