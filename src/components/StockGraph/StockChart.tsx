import {FC, useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, Title, Tooltip } from 'chart.js/auto';
import 'chartjs-plugin-annotation';
Chart.register(CategoryScale, LinearScale, LineController, PointElement, Title, Tooltip);

interface StockChartProps {
  data: number[];
  previousDayStockPrice: null | number;
}

const StockChart: FC<StockChartProps> = ({ data, previousDayStockPrice }) => {
  const chartRef = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!data) return;
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const minPrice = Math.min(...data);
    const maxPrice = Math.max(...data);

    const minY = Math.floor(minPrice) - 5;
    const maxY = Math.ceil(maxPrice) + 5;

    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;

    const dataBefore = data.map((value) => (previousDayStockPrice !== null && value > previousDayStockPrice ? null : value));
    const dataAfter = data.map((value) => (previousDayStockPrice !== null && value <= previousDayStockPrice ? null : value));

    const connectingPoints: { index: number, value: number }[] = [];

    for (let i = 1; i < data.length; i++) {
      const currentValue = data[i];
      const previousValue = data[i - 1];
      const threshold = previousDayStockPrice;

      if (threshold !== null) {
        if (currentValue > threshold && previousValue <= threshold) {
          connectingPoints.push({ index: i, value: currentValue });
        } else if (currentValue <= threshold && previousValue > threshold) {
          connectingPoints.push({ index: i, value: currentValue });
        }
      }
    }

    connectingPoints.forEach((point) => {
      dataBefore[point.index] = point.value;
      dataAfter[point.index] = point.value;
    });

    const datasets = [];

    if (previousDayStockPrice === 0 || previousDayStockPrice === null) {
      datasets.push({
        label: 'Stock Graph',
        data: data,
        borderColor: 'rgba(0, 0, 255, 1)',
        borderWidth: 1,
        fill: false,
      });
    } else {

      datasets.push(
        {
          label: 'Price',
          data: dataBefore,
          borderColor: 'rgba(255, 0, 0, 1)', 
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Price ',
          data: dataAfter,
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 1,
          fill: false,
        }
      );
    }

    if (previousDayStockPrice !== null) {
      datasets.push({
        label: 'Previous Day Price',
        data: Array(data.length).fill(previousDayStockPrice),
        borderColor: 'rgba(0, 255, 251, 0.999)',
        borderWidth: 2,
        fill: false,
      });
    }

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: data.length }, (_, i) => i + 1),
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: minY,
            max: maxY,
            grid: {
              color: 'rgba(0, 255, 251, 0.2)',
            },
            ticks: {
              color: '#00DABC', 
            },
            title: {
              display: true,
              text: 'Price $', 
              color: '#00DABC',
              font: {
              size: 18, 
              },
            },
          },
          x: {
            grid: {
              color: 'rgba(0, 255, 251, 0.2)',
            },
            ticks: {
              color: '#00DABC', 
            },
            title: {
              display: true,
              text: 'Trading day', 
              color: '#00DABC',
              font: {
              size: 18, 
              },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Stock graph',
            color: '#00DABC',
          },
          legend: {
             display: false
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },
        },
      },
    });

    chartRef.current = newChart;
  }, [data, previousDayStockPrice]);

  return <canvas id="stockChart" width={400} height={200}></canvas>;
};

export default StockChart;