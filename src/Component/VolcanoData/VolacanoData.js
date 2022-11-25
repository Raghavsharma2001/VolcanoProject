import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { Alert } from "reactstrap";

import { useNavigate } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "../../App.css";

export function Table({ query }) {
  const navigate = useNavigate();

  const onSearchCompleted = (volcanoData) => {
    console.log(volcanoData);
  };

  const columnsheader = [
    {
      headerName: "Name",
      field: "Name",
      sortable: true,
      suppressSizeToFit: true,
      maxWidth: 300,
      autoSizeColumn: true,
    },

    {
      headerName: "Region",
      field: "Region",
      sortable: true,
      maxWidth: 350,
    },
    {
      headerName: "Subregion",
      field: "Subregion",
      sortable: true,
      maxWidth: 350,
    },

    {
      headerName: "More Info",
      field: "Action",
      flex: 1,
      maxWidth: 300,
      cellRendererFramework: (params) => <div>Click to find out more</div>,
    },
  ];

  <AgGridReact columnDefs={columnsheader}></AgGridReact>;
  const [rowData, setRowData] = useState();
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    fetch(query)
      .then((res) => res.json())
      .then((res) =>
        res.map((data) => {
          return {
            Name: data.name,
            Region: data.region,
            Subregion: data.subregion,
            id: data.id,
          };
        })
      )
      .then((data) => {
        if ("error" in data) {
          console.log(data.name);
          console.log("fail");
          setError(data.message);
          setColor("danger");
          setIsOpen(true);
        } else {
          setRowData(data);
          console.log(data);
        }
      });
  }, [query]);

  return (
    <div className="ag-theme-alpine">
      <div>
        {" "}
        <Alert color={color} isOpen={isOpen}>
          {error}
        </Alert>
      </div>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          pagination={true}
          paginationPageSize={9}
          columnDefs={columnsheader}
          onRowClicked={(row) =>
            navigate(`/map?name=${row.data.Name}&id=${row.data.id}`)
          }
        ></AgGridReact>
      </div>
    </div>
  );
}

/*
 React.useEffect(() => {

        fetch(query)
            .then(result => result.json())
            .then((result)=>
            
                result.map((data) => {
                    
                    return {
                        Name: data.name,
                        Region:data.region,
                        Subregion:data.subregion,
                        
                    };
                })  
            )
            .then((data) => {
                console.log(data)
                if("error" in data )
                {
                    console.log(data.message)
                    setError(data.message); 
                    setColor("danger");
					setIsOpen(true);

                }
                else 
                {
         
                    setRowData(data)
                }
            })   
        
  
    }
    , [query]);

*/
