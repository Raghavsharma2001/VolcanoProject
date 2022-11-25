import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart(props) {
  console.log(props);
  console.log("this is a tst in chart", props.volcanoData.population_5km);
  const {
    population_5km,
    population_10km,
    population_30km,
    population_100km,
    name,
  } = props.volcanoData;
  const labels = ["5km", "10km", "30km", "100km"];

  const array = [
    population_5km,
    population_10km,
    population_30km,
    population_100km,
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distance vs Population ",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: name.toUpperCase(),
        data: array,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="bar-chart" style={{ width: "500px, " }}>
      <Bar options={options} data={data} />
    </div>
  );
}
export default Chart;
