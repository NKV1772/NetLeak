import axios from "axios";
import { 
    Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

const Dashboard = () => {
    const [monthAndYear, setMonthAndYear] = useState([])
    const [selectedYear, setSelectedYear] = useState()
    const [yearArr, setYearArr] = useState([])
    const [dataForChart, setDataForChart] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(null)
    const data = {
        labels,
        datasets: [
          {
            label: 'Doanh thu',
            data: dataForChart,
            backgroundColor: 'rgb(11, 51, 121)',
          },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
                fontColor: 'white'
            }
          },
          title: {
            display: true,
            text: 'Biểu đồ doanh thu',
          },
        },
        scales: {
            y: {
                min: 0,
                max: totalRevenue ? totalRevenue : 10000,
                stepSize: 5,
                title: {
                    display: true,
                    text: 'Số tiền'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tháng'
                }
            }
        },
    };
    const handleChange = (event) => {
        setSelectedYear(event.target.value);
        const filteredData = monthAndYear.filter((item) => item.year === event.target.value);
        const monthlyRevenue = Array(12).fill(0);
        filteredData.map((item) => {
            const monthIndex = item.month - 1;
            monthlyRevenue[monthIndex] = item.total;
        });
        const getYearlyRevenue = yearArr.filter((item) => item.year === event.target.value)
        setTotalRevenue(getYearlyRevenue[0].total)
        setDataForChart(monthlyRevenue);
        console.log(selectedYear)
    };
    useEffect(() => {
        axios.get("http://localhost:8081/v1/api/admin/revenue")
            .then((res) => {
                const yearlyTotals = res.data.yearlyTotals;
                const yearlyArray = Object.keys(yearlyTotals).map(year => ({
                    year: year,
                    total: yearlyTotals[year]
                }));
                const monthlyTotals = res.data.monthlyTotals;
                const monthlyArray = Object.keys(monthlyTotals).map(date => ({
                    month: date.split('-')[0],
                    year: date.split('-')[1],
                    total: monthlyTotals[date]
                }));
                setMonthAndYear(monthlyArray)
                setYearArr(yearlyArray)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center px-5 pb-5 bg-white rounded pt-5">
            <form className=" max-w-sm mx-auto">
                <select id="countries" onChange={handleChange} className="  bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected>Năm</option>
                    {yearArr.length!=0 && yearArr.map((item, index)=> {
                        return <option key={index} value={item.year}>{item.year}</option>
                    })}
                </select>
            </form>
            <Bar options={options} data={data}/>
        </div>
    );
}

export default Dashboard;