import { useSearchParams } from "react-router-dom";
import { Map, Marker } from "pigeon-maps";
import { useContext, useEffect, useState } from "react";
import { Alert } from "reactstrap";
import Chart from "./Chart";
import AuthContext from "../../store/auth-context";
import PegionMap from "./Map";

const Generator = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  //   console.log(id);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [volcanoData, setVolcanoData] = useState([]);

  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [render, setRender] = useState(false);
  const [color, setColor] = useState("");
  const authCtx = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const Api_URL = "http://sefdb02.qut.edu.au:3001/volcano/";
  const url = `${Api_URL}${id}`;
  useEffect(() => {
    // Init headers
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    if (token) {
      headers.append("Authorization", "Bearer " + token);
    }
    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setVolcanoData(data);
      })
      .then(() => {
        setRender(true);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  const ComponentRender = () => {
    return (
      <div>
        <PegionMap volcanoData={volcanoData} />
        <div>{authCtx.isLoggedIn && <Chart volcanoData={volcanoData} />}</div>
      </div>
    );
  };

  return (
    <div>
      {render ? (
        <div>
          <ComponentRender />{" "}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Generator;
