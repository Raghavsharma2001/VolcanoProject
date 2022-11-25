import React, { useEffect, useState } from "react";

import { Table } from "../Component/VolcanoData/VolacanoData";
import SearchComponent from "../Component/SearchBox/SearchBox";

export default function Menu() {
  const [searchUrl, setSearchUrl] = useState("");

  const getSearchUrl = (resultUrl) => {
    console.log(resultUrl);
    setSearchUrl(() => resultUrl);
  };

  return (
    <div>
      <h2 id="volcano-heading">Search Volcano</h2>
      <div>
        <SearchComponent getSearchUrl={getSearchUrl} />
      </div>
      <div>
        {searchUrl ? (
          <div className="agGrid-table">
            <Table query={searchUrl} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
