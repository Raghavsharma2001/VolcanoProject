import { useCallback, useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../SearchBox/search.css";

import { Form, FormGroup, Label, Input } from "reactstrap";
import { Button } from "reactstrap";

const API_Url = "http://sefdb02.qut.edu.au:3001";

export default function SearchComponent({ getSearchUrl }) {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [distance, setDistance] = useState();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const url = `${API_Url}/countries`;

    const fetchCountries = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCountries(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchCountries();
  }, []);

  const onSuggestionHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };
  const onchangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = countries.filter((countries) => {
        const regex = new RegExp(`${text}`, "gi");
        return countries.match(regex);
      });
    }

    setSuggestions(matches);
    setText(text);
  };

  const onOptionChange = (e) => {
    setDistance(e.target.value);
  };

  const resetDistance = () => {
    setDistance("All");
  };

  const searchParms = () => {
    let newtext = text.replace(/\s/g, "%20");
    newtext = newtext.toLowerCase();

    if (distance == "All" || distance === undefined) {
      let query = `${API_Url}/volcanoes?country=${newtext}`;
      getSearchUrl(query);
    } else {
      let query = `${API_Url}/volcanoes?country=${newtext}&populatedWithin=${distance}`;
      getSearchUrl(query);
    }
  };
  return (
    <div className="main-container">
      <div className="distance-box">
        <h3> Select Distance</h3>
        <input type="reset" name="distance" id="All" onClick={resetDistance} />
        <input
          type="radio"
          name="distance"
          value="5km"
          id="5km"
          checked={distance === "5km"}
          onChange={onOptionChange}
        />
        <label htmlFor="5km">5km</label>

        <input
          type="radio"
          name="distance"
          value="10km"
          id="10km"
          checked={distance === "10km"}
          onChange={onOptionChange}
        />
        <label htmlFor="10km">10km</label>

        <input
          type="radio"
          name="distance"
          value="30km"
          id="30km"
          checked={distance === "30km"}
          onChange={onOptionChange}
        />
        <label htmlFor="30km">30km</label>

        <input
          type="radio"
          name="distance"
          value="100km"
          id="100km"
          checked={distance === "100km"}
          onChange={onOptionChange}
        />
        <label htmlFor="100km">100km</label>
      </div>
      <div className="search-container">
        <Form>
          <FormGroup>
            <Label for="country">
              {" "}
              <h3>Select Country</h3>
            </Label>
            <Input
              id="country"
              name="country"
              placeholder="Type Country Name"
              type="search"
              onChange={(e) => onchangeHandler(e.target.value)}
              value={text}
              onBlur={() => {
                setTimeout(() => {
                  setSuggestions([]);
                }, 100);
              }}
            />
            <div className="suggestion-box">
              {suggestions &&
                suggestions.map((suggestions, i) => (
                  <div
                    key={i}
                    className="suggestions"
                    onClick={() => onSuggestionHandler(suggestions)}
                  >
                    {suggestions}
                  </div>
                ))}
            </div>
          </FormGroup>
        </Form>
      </div>

      <div>
        <Button className="submit-button" onClick={searchParms}>
          Search Volcanoes
        </Button>
      </div>
    </div>
  );
}

/*


        <div className ="container">
          <div>
            <input type="text" className = "SearchBox" placeholder="Country"
            onChange={e => onchangeHandler(e.target.value)}
            value= {text}
            onBlur={() =>  {setTimeout(() => {
                setSuggestions([])
            }, 100);
        }}
             />
             <div className="suggestion-box ">


           {suggestions && suggestions.map((suggestions, i) =>
           <div key= {i} className = "suggestions"
           onClick={() => onSuggestionHandler(suggestions)}
           >{suggestions}</div> )}
           </div>
           </div>

           <div>
           {dropdownbutton()}
           </div>
           <div>


           {radioButtons()}
           <button on onClick= { searchParms}>Get Volcano Data</button>

           </div>

        </div>



    // new variable the converts user input to valid query request.
    let userInput = text;
    let validatetext = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();
    validatetext.replace(/\s/g, '9')

    // converts the country name to lowercase which is required format for the query parameter.
    let newText = text;
    newText.toLowerCase();

    if (newText.containsWhitespace) {
      let newText1 = newText.replace((/ /g, "%20"));
      //console.log(newText1)

    }

    let query = `${API_Url}/volcanoes?country=${newText}&populatedWithin=${distance}`
    setQuery(query);




    if (!countries.includes(validatetext)) {
      setText(decodeURI(newText))
      

      console.log(newText)
      console.log("invalid country");
      console.log(query)
    }
    else if (distance === null || distance === undefined) {
      console.log("Select distance")
    }
    else {
      getSearchUrl(query);


    }


*/
