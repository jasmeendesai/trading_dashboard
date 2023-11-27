import { useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function CandleStick({ sym, interval }) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 960px)");

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "candlestick",
        height: "100%", // Set the height to 100%
      },
      xaxis: {
        type: "datetime",
      },
      plotOptions: {
        candlestick: {
          barWidth: 15, // Adjust the bar width as needed
        },
      },
      yaxis: {
        type: "price",
      },
    },
    series: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    const apikey = process.env.REACT_APP_API_KEY;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${sym}&resolution=${interval}&from=1693493346&to=1693752546&token=${apikey}`
        );

        const data = await response.json();
        // let formattedData = [];
        console.log(data);

        const { c, h, l, o, t } = data;
        const formattedData = t.map((timestamp, index) => ({
          x: timestamp,
          y: [o[index], h[index], l[index], c[index]],
        }));

        // set data in localstorage
        localStorage.setItem("chartData", data);

        // Update the chart data
        const newChartData = {
          ...chartData,
          series: [{ data: formattedData }],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: t.map((timestamp) =>
                new Date(timestamp * 1000).toLocaleTimeString()
              ),
            },
          },
        };

        setChartData(newChartData);

      } catch (error) {
        if (error === "API limit reached. Please try again later. Remaining Limit: 0") {
          const data = JSON.parse(localStorage.getItem("chartData"));
          const { c, h, l, o, t } = data;
          const formattedData = t.map((timestamp, index) => ({
            x: timestamp,
            y: [o[index], h[index], l[index], c[index]],
          }));

          // Update the chart data
          const newChartData = {
            ...chartData,
            series: [{ data: formattedData }],
            options: {
              ...chartData.options,
              xaxis: {
                ...chartData.options.xaxis,
                categories: t.map((timestamp) =>
                  new Date(timestamp * 1000).toLocaleTimeString()
                ),
              },
            },
          };
          setChartData(newChartData);
        }
      }
    };

    fetchData();
  }, [sym, interval, chartData]);

  return (
    // <Box display="flex" justifyContent="start" alignItems="center" >
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="candlestick"
      width="100%"
      height={isMobile ? "400%" : isTablet ? "450%" : "250%"}
    />
    // </Box>
  );
}

export default CandleStick;
