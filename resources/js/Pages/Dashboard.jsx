import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';

// Chart.js রেজিস্টার
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

const Dashboard = ({
    invoices,
    products,
    categories,
    brands,
    customers,
    totalPaidAmount,
    totalDueAmount,
    totalVat,
}) => {
    const chartData = {
        invoices,
        products,
        categories,
        brands,
        customers,
        totalPaidAmount,
        totalDueAmount,
        totalVat,
    };

    // Pie Chart Data
    const pieData = {
        labels: ['Paid', 'Due', 'VAT'],
        datasets: [
            {
                label: 'Amount',
                data: [chartData.totalPaidAmount, chartData.totalDueAmount, chartData.totalVat],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    // Bar Chart Data
    const barData = {
        labels: ['Invoices', 'Products', 'Categories', 'Brands', 'Customers'],
        datasets: [
            {
                label: 'Entity Counts',
                data: [
                    chartData.invoices,
                    chartData.products,
                    chartData.categories,
                    chartData.brands,
                    chartData.customers,
                ],
                backgroundColor: '#4BC0C0',
            },
        ],
    };

   // Line Chart Data for Paid, Due, and VAT
   const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // মাসের নাম
    datasets: [
        {
            label: 'Paid Amount',
            // এখানে totalPaidAmount এর মান দিন। যেমন প্রতিটি মাসের জন্য ডাইনামিক ডেটা।
            data: [1000, 1500, 1200, 1800, 2200, chartData.totalPaidAmount],
            fill: false,
            borderColor: '#4BC0C0',
            tension: 0.1,
        },
        {
            label: 'Due Amount',
            // এখানে totalDueAmount এর মান দিন। যেমন প্রতিটি মাসের জন্য ডাইনামিক ডেটা।
            data: [500, 800, 600, 900, 1000, chartData.totalDueAmount],
            fill: false,
            borderColor: '#FF5733',
            tension: 0.1,
        },
        {
            label: 'VAT Amount',
            // এখানে totalVat এর মান দিন। যেমন প্রতিটি মাসের জন্য ডাইনামিক ডেটা।
            data: [50, 80, 60, 100, 120, chartData.totalVat],
            fill: false,
            borderColor: '#FFCE56',
            tension: 0.1,
        },
    ],
};

    // Tooltip & Animation Options
    const optionsWithPercentage = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${value} (${percentage}%)`;
                    },
                },
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeOutBounce',
        },
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <div className="container mx-auto">
                <div className="text-2xl font-bold mb-4">Dashboard</div>

                {/* কাউন্ট কার্ড */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-white shadow rounded">
                        <h4 className="text-gray-500">Total Invoices</h4>
                        <h2 className="text-3xl">{chartData.invoices}</h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <h4 className="text-gray-500">Total Products</h4>
                        <h2 className="text-3xl">{chartData.products}</h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <h4 className="text-gray-500">Total Categories</h4>
                        <h2 className="text-3xl">{chartData.categories}</h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <h4 className="text-gray-500">Total Brands</h4>
                        <h2 className="text-3xl">{chartData.brands}</h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <h4 className="text-gray-500">Total Customers</h4>
                        <h2 className="text-3xl">{chartData.customers}</h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <h4 className="text-gray-500">Total Paid Amount</h4>
                        <h2 className="text-3xl">${chartData.totalPaidAmount.toFixed(2)}</h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <h4 className="text-gray-500">Total Due Amount</h4>
                        <h2 className="text-3xl">${chartData.totalDueAmount.toFixed(2)}</h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <h4 className="text-gray-500">Total VAT</h4>
                        <h2 className="text-3xl">${chartData.totalVat.toFixed(2)}</h2>
                    </div>
                </div>

                {/* চার্ট */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Pie Chart */}
                    <div className="p-4 bg-white shadow rounded">
                        <h4 className="text-xl font-semibold mb-4">Amount Distribution</h4>
                        <Pie data={pieData} options={optionsWithPercentage} />
                    </div>

                    {/* Bar Chart */}
                    <div className="p-4 bg-white shadow rounded">
                        <h4 className="text-xl font-semibold mb-4">Entity Counts</h4>
                        <Bar data={barData} options={optionsWithPercentage} />
                    </div>

                    {/* Line Chart */}
            <div className="p-4 bg-white shadow rounded">
                <h4 className="text-xl font-semibold mb-4">Paid, Due, and VAT Trends</h4>
                <Line data={lineData} />
            </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;


