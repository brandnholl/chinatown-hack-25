import React from "react";
import Chart from "react-apexcharts";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------
// Legend Styles (from your snippet)
// ----------------------------------------------------------------------

const StyledLegend = styled(Box)(({ theme }) => ({
  gap: 6,
  alignItems: "center",
  display: "inline-flex",
  justifyContent: "flex-start",
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
}));

const StyledDot = styled(Box)(() => ({
  width: 12,
  height: 12,
  flexShrink: 0,
  display: "flex",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "currentColor",
}));

// ----------------------------------------------------------------------
// Custom Legend Component
// ----------------------------------------------------------------------

function ChartLegends({
  labels = [],
  colors = [],
  values,
  sublabels,
  icons,
  ...other
}) {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
      {labels?.map((series, index) => (
        <Stack key={series} spacing={1}>
          <StyledLegend>
            {icons?.length ? (
              <Box
                component="span"
                sx={{
                  color: colors[index],
                  "& svg, & img": { width: 20, height: 20 },
                }}
              >
                {icons?.[index]}
              </Box>
            ) : (
              <StyledDot component="span" sx={{ color: colors[index] }} />
            )}

            <Box component="span" sx={{ flexShrink: 0 }}>
              {series}
              {sublabels && <> {` (${sublabels[index]})`}</>}
            </Box>
          </StyledLegend>

          {values && <Box sx={{ typography: "h6" }}>{values[index]}</Box>}
        </Stack>
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------
// Main Chart Component
// ----------------------------------------------------------------------

function MyChart() {
  // Single-line chart data
  const chartSeries = [
    {
      name: "Total Income",
      data: [50, 80, 40, 90, 125, 148, 100, 148, 130, 90, 70, 60],
    },
  ];

  // ApexCharts configuration
  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent",
    },
    legend: {
      show: false, // Hide default ApexCharts legend in favor of our custom legend
    },
    theme: {
      mode: "dark", // Dark mode
    },
    colors: ["#2E93fA"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#fff" } },
    },
    yaxis: {
      labels: { style: { colors: "#fff" } },
    },
    grid: {
      borderColor: "#444",
      strokeDashArray: 3,
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "#161C24", // A dark background to match the chart
        maxWidth: 600,
        margin: "auto",
      }}
    >
      {/* ApexCharts */}
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={300}
      />

      {/* Custom Legend */}
      <Box sx={{ mt: 2 }}>
        <ChartLegends
          labels={["Total Income"]}
          colors={["#2E93fA"]}
          values={["$148k"]}
        />
      </Box>
    </Box>
  );
}

export default MyChart;
