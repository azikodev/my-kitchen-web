//react + hooks
import React, { useEffect, useState } from "react";

//react apexchart
import ReactApexChart from "react-apexcharts";

//redux
import { useSelector } from "react-redux";

//rrd imports
import { Link } from "react-router-dom";

//custom hooks
import { useCollection } from "../hooks/useCollection";

//react icons
import { RiBarChartGroupedLine } from "react-icons/ri";


function PieChart() {
    const { user } = useSelector((state) => state.user);

    const { data } = useCollection(
        "todos",
        ["uid", "==", user.uid]
    );

    const [ColumnAbout, setColumnAbout] = useState({
        series: [
            {
                data: [
                    { x: "2019/01/01", y: 400 },
                    { x: "2019/04/01", y: 430 },
                    { x: "2019/07/01", y: 448 },
                    { x: "2019/10/01", y: 470 },
                    { x: "2020/01/01", y: 540 },
                    { x: "2020/04/01", y: 580 },
                ],
            },
        ],
        options: {
            chart: { type: "bar", height: 380 },
            xaxis: { type: "category" },
        },
    });

    const [PieChart, setPieChart] = useState({
        series: [44, 55, 13, 43, 22],
        options: {
            chart: { width: 380, type: "pie" },
            labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: { width: 200 },
                        legend: { position: "bottom" },
                    },
                },
            ],
        },
    });

    useEffect(() => {
        if (data) {
            // Update Pie Chart data
            const nationsCount = data.reduce((acc, item) => {
                if (item.nation) {
                    acc[item.nation] = (acc[item.nation] || 0) + 1;
                }
                return acc;
            }, {});
            const labels = Object.keys(nationsCount);
            const series = Object.values(nationsCount);

            setPieChart({
                series,
                options: {
                    chart: { width: 380, type: "pie" },
                    labels,
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: { width: 200 },
                                legend: { position: "bottom" },
                            },
                        },
                    ],
                },
            });

            // Update Column Chart data
            const TimeChart = data.map((time) => ({
                x: time.title,
                y: time.time,
            }));

            setColumnAbout({
                series: [{ data: TimeChart }],
                options: {
                    chart: { type: "bar", height: 380 },
                    xaxis: { type: "category" },
                },
            });
        }
    }, [data]);

    return (
        <div className="place-content-center flex text-center content-center mb-10">
            {data ? (
                data.length > 0 ? (
                    <div>
                        {/* <div className="mb-20 mt-10">
                            <h1 className="text-2xl mb-2">Nation</h1>
                            <div id="chart">
                                <ReactApexChart
                                    className="flex justify-center place-content-center"
                                    options={PieChart.options}
                                    series={PieChart.series}
                                    type="pie"
                                    width={600}
                                />
                            </div>
                        </div> */}
                        <div>
                            <h1 className="text-2xl mb-2 mt-20">Vaqt bo'yicha statistika</h1>
                            <div id="chart">
                                <ReactApexChart
                                    options={ColumnAbout.options}
                                    series={ColumnAbout.series}
                                    type="bar"
                                    height={350}
                                    width={1300}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="m-auto flex justify-center items-center h-[500px] max-w-[1220px]">
                        <div className="flex flex-col text-center justify-center items-center gap-[60px]">
                            <h1 className="font-semibold text-[34px]">
                                Ayni vaqtda hech qanday retsept yo'q :{`(`}
                            </h1>
                            <RiBarChartGroupedLine className="text-[190px]" />
                            <Link to="/">
                                <button className="mt-[20px] text-white btn btn-accent rounded-[8px]">
                                    Asosiy sahifaga qaytish
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            ) : (
                <span className="loading loading-ring w-20 my-60"></span>
            )}
        </div>
    );
}

export default PieChart;
