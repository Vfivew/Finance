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

    // Разделяем данные на два набора: до 107 и после 107
    const dataBefore = data.map((value) => (previousDayStockPrice !== null && value > previousDayStockPrice ? null : value));
    const dataAfter = data.map((value) => (previousDayStockPrice !== null && value <= previousDayStockPrice ? null : value));

    // Найденные точки, которые должны быть соединены
    const connectingPoints: { index: number, value: number }[] = [];

    // Обходим массив данных и проверяем пересечение с границей 107
    for (let i = 1; i < data.length; i++) {
      const currentValue = data[i];
      const previousValue = data[i - 1];
      const threshold = previousDayStockPrice;

      if (threshold !== null) {
        if (currentValue > threshold && previousValue <= threshold) {
          // Текущее значение пересекло границу 107 сверху
          connectingPoints.push({ index: i, value: currentValue });
        } else if (currentValue <= threshold && previousValue > threshold) {
          // Текущее значение пересекло границу 107 снизу
          connectingPoints.push({ index: i, value: currentValue });
        }
      }
    }
    // Добавляем найденные точки в оба набора данных
    connectingPoints.forEach((point) => {
      dataBefore[point.index] = point.value;
      dataAfter[point.index] = point.value;
    });

    const datasets = [];

    // Если previousDayStockPrice равен нулю или null, добавляем только один график
    if (previousDayStockPrice === 0 || previousDayStockPrice === null) {
      datasets.push({
        label: 'График акций',
        data: data,
        borderColor: 'rgba(0, 0, 255, 1)', // Синий цвет
        borderWidth: 1,
        fill: false,
      });
    } else {
      // В противном случае добавляем два набора данных
      datasets.push(
        {
          label: 'Цены акций (до 107)',
          data: dataBefore,
          borderColor: 'rgba(255, 0, 0, 1)', // Красный для значений до 107
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Цены акций (после 107)',
          data: dataAfter,
          borderColor: 'rgba(0, 255, 0, 1)', // Зеленый для значений после 107
          borderWidth: 1,
          fill: false,
        }
      );
    }

    // Если previousDayStockPrice не равен null, добавляем горизонтальную линию
    if (previousDayStockPrice !== null) {
      datasets.push({
        label: 'Previous Day Price',
        data: Array(data.length).fill(previousDayStockPrice),
        borderColor: 'rgba(0, 255, 251, 0.999)',
        borderWidth: 6,
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
              color: 'blue', // Цвет цифр по вертикали
            },
          },
          x: {
            grid: {
              color: 'rgba(0, 255, 251, 0.2)',
            },
            ticks: {
              color: 'blue', // Цвет цифр по горизонтали
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'График акций',
            color: 'blue',
          },
          legend: {
            labels: {
              color: 'blue',
            },
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