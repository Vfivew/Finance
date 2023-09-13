import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, Title, Tooltip } from 'chart.js/auto';
import 'chartjs-plugin-annotation'
Chart.register(CategoryScale, LinearScale, LineController, PointElement, Title, Tooltip);

interface StockChartProps {
    data: number[];
    previousDayStockPrice: null|number
}

const StockChart: React.FC<StockChartProps> = ({ data,previousDayStockPrice }) => {
  console.log(previousDayStockPrice)
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
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: data.length }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Цены акций',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
            scales: {
            y: {
                beginAtZero: true,
                min: minY,
                max: maxY,
            },
            },
        },
    });

    chartRef.current = newChart;
  }, [data]);

  return <canvas id="stockChart" width={400} height={200}></canvas>;
};

export default StockChart;