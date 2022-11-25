import React from "react";
import { useSearchParams } from "react-router-dom";
import Generator from "../Component/Map/generator";

const VolcanoInfo = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");

  return (
    <div>
      <Generator />
    </div>
  );
};

export default VolcanoInfo;
