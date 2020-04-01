<canvas id="SEV_Chart" width="3" height="1.5"></canvas>

<script context="module">
    import Chart from "chart.js";

    import {    SEV_Company_Per_TouchPoint,
                SEV_TimeCommitment_Per_Company,
                SEV_Companies_Per_TouchPoint_Event_Counter,
                SEV_ExtractPointsForTouchPointDistribution,
                SEV_ExtractTimeCommitmentsByExpertiseAndTouchPoint,
                SEV_ExtractIntroductionCountByExpertiseAndTouchPoint,
                SEV_ExtractIntroductionsByPortfolio,
                SEV_ExtractTimeCommitmentByPortfolio,
                SEV_ExtractSuccessRatiosByPortfolio,
                SEV_Companies,
                SEV_Internals
            } from './transformData.js';

    var ctx;
    var SEV_Chart;
    export const expertise = ["Engineering", "Sales", "Recruiting"];

    export function averageResponseTimePerCompany(touchPoint){
        if(SEV_Chart) SEV_Chart.destroy();
        let chartType = "bar";

        let chartLabel = "";
        if(touchPoint === "Email")
            chartLabel = "Average " + touchPoint.toString() + " Response Time Over Portfolio";
        else
            chartLabel = "Average " + touchPoint.toString() + " Time Over Portfolio";

        let yaxis = 'Time (hrs)';
        let xaxis = "Portfolio Companies";

        let SEV_COMPANIES = SEV_Company_Per_TouchPoint(touchPoint);
        let SEV_COMPANIES_EVENT_COUNTER_PER_TOUCHPOINT = SEV_Companies_Per_TouchPoint_Event_Counter(SEV_COMPANIES, touchPoint);
        let SEV_COMPANIES_PER_TOUCHPOINT_TIMECOMMITMENT = SEV_TimeCommitment_Per_Company(SEV_COMPANIES, touchPoint);
        let SEV_COMPANIES_AVERAGE_TIMECOMMITMENT_PER_COMPANY = new Array(SEV_COMPANIES.length).fill(0);
        for(let i = 0; i < SEV_COMPANIES.length; i++){
            SEV_COMPANIES_AVERAGE_TIMECOMMITMENT_PER_COMPANY[i] = SEV_COMPANIES_PER_TOUCHPOINT_TIMECOMMITMENT[i] / SEV_COMPANIES_EVENT_COUNTER_PER_TOUCHPOINT[i];
        }

        SEV_Chart = generateBarChart(chartType, SEV_COMPANIES, chartLabel, SEV_COMPANIES_AVERAGE_TIMECOMMITMENT_PER_COMPANY,yaxis,xaxis);
    }

    export function totalResponseTimePerCompany(touchPoint){
        if(SEV_Chart) SEV_Chart.destroy();
        let chartType = "polarArea";
        let chartLabel = "";
        if(touchPoint === "Email")
            chartLabel = "Total " + touchPoint.toString() + " Response Time (hrs) Over Portfolio";
        else
            chartLabel = "Total " + touchPoint.toString() + " Time (hrs) Over Portfolio";

        let yaxis = 'Time (hrs)';
        let xaxis = "Portfolio Companies";

        let SEV_COMPANIES = SEV_Company_Per_TouchPoint(touchPoint);
        let SEV_COMPANIES_PER_TOUCHPOINT_TIMECOMMITMENT = SEV_TimeCommitment_Per_Company(SEV_COMPANIES, touchPoint);

        SEV_Chart = generatePolarChart(chartType, SEV_COMPANIES, chartLabel, SEV_COMPANIES_PER_TOUCHPOINT_TIMECOMMITMENT,xaxis,yaxis);
    }

    export function timeCommitmentDistributionPerCompany(touchPoint){
        if(SEV_Chart) SEV_Chart.destroy();
        let chartType = "scatter";

        let chartLabel = "";
        if(touchPoint === "Email")
            chartLabel = touchPoint.toString() + " Distribution Response Time Per Company";
        else
            chartLabel = touchPoint.toString() + " Distribution Time Per Company";

        let SEV_COMPANIES = SEV_Company_Per_TouchPoint(touchPoint);
        let SEV_COMPANIES_PER_TOUCHPOINT_DISTRIBUTION = SEV_ExtractPointsForTouchPointDistribution(touchPoint);

        SEV_Chart = generateScatterChart(chartType, SEV_COMPANIES, chartLabel, SEV_COMPANIES_PER_TOUCHPOINT_DISTRIBUTION);
    }

    export function stackedExpertiseTimeCommitmentPerCompany(touchPoint){
        if(SEV_Chart) SEV_Chart.destroy();
        let chartType = "bar";
        let chartLabel = "";
        if(touchPoint === "Email")
            chartLabel = "Total " + touchPoint.toString() + " Response Time Over Portfolio";
        else
            chartLabel = "Total " + touchPoint.toString() + " Time Over Portfolio";

        let yaxis = 'Time (hrs)';
        let xaxis = "Portfolio Companies";


        let SEV_COMPANIES = SEV_Company_Per_TouchPoint(touchPoint);

        let engineeringExpertiseByTP = SEV_ExtractTimeCommitmentsByExpertiseAndTouchPoint(touchPoint, SEV_COMPANIES, expertise[0]);
        let salesExpertiseByTP = SEV_ExtractTimeCommitmentsByExpertiseAndTouchPoint(touchPoint, SEV_COMPANIES, expertise[1]);
        let recruitingExpertiseByTP = SEV_ExtractTimeCommitmentsByExpertiseAndTouchPoint(touchPoint, SEV_COMPANIES, expertise[2]);

        let expertiseByTP = [engineeringExpertiseByTP, salesExpertiseByTP, recruitingExpertiseByTP];
        SEV_Chart = generateStackedBarChart(chartType, SEV_COMPANIES, chartLabel, expertiseByTP, yaxis, xaxis);
    }

    export function radarPorfolioSuccess(noargs){
        if(SEV_Chart) SEV_Chart.destroy();
        let chartType = "radar";
        let chartLabel = "Success Ratios Per Partner Per Company";

        let SEV_INTERNALS = SEV_Internals(); // Get unique internal personnel from the dataset
        let SEV_COMPANIES = SEV_Companies(); // Get unique companies from the dataset

        let successRatios = [];
        for(let i = 0; i < SEV_INTERNALS.length; i++) {
            let someVar = SEV_ExtractSuccessRatiosByPortfolio(SEV_INTERNALS[i], SEV_COMPANIES);
            successRatios.push(someVar);
        }
        SEV_Chart = generateRadarChartPortfolio(chartType, chartLabel, SEV_COMPANIES, SEV_INTERNALS, successRatios);
    }

    //   https://travishorn.com/stacked-bar-chart-with-chart-js-846ebdf11c4e
    function generateRadarChartPortfolio(type, label, labels, data, internalIntroductionsByCompanies){
        ctx = document.getElementById('SEV_Chart');
        return new Chart(ctx, {
            type: type,
            data: {
                labels: data,
                datasets: [
                    {
                        label: labels[0],
                        data: internalIntroductionsByCompanies[0],
                        backgroundColor: 'rgba(54, 162, 235, .45)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2
                    },
                    // {
                    //     label: labels[1],
                    //     data: internalIntroductionsByCompanies[1],
                    //     backgroundColor: 'rgba(255, 99, 132, .45)',
                    //     borderColor: 'rgba(255, 99, 132, 1)',
                    //     borderWidth: 2
                    // },
                    // {
                    //     label: labels[2],
                    //     data: internalIntroductionsByCompanies[2],
                    //     backgroundColor: 'rgba(75, 192, 192, .45)',
                    //     borderColor: 'rgba(75, 192, 192,1)',
                    //     borderWidth: 2
                    // },
                    // {
                    //     label: labels[3],
                    //     data: internalIntroductionsByCompanies[3],
                    //     backgroundColor: 'rgba(255, 206, 86, .45)',
                    //     borderColor: 'rgba(255, 206, 86, 1)',
                    //     borderWidth: 2
                    // },
                    // {
                    //     label: labels[4],
                    //     data: internalIntroductionsByCompanies[4],
                    //     backgroundColor: 'rgba(153, 102, 255, .45)',
                    //     borderColor: 'rgba(153, 102, 255, 1)',
                    //     borderWidth: 2
                    // },
                    // {
                    //     label: labels[5],
                    //     data: internalIntroductionsByCompanies[5],
                    //     borderColor: 'rgba(255, 159, 64, 1)',
                    //     backgroundColor: 'rgba(255, 159, 64, .45)',
                    //     borderWidth: 2
                    // },
                    // {
                    //     label: labels[6],
                    //     data: internalIntroductionsByCompanies[6],
                    //     backgroundColor: 'rgba(123, 255, 24, .45)',
                    //     borderColor: 'rgba(123, 255, 24, 1)',
                    //     borderWidth: 2
                    // },
                    // {
                    //     label: labels[7],
                    //     data: internalIntroductionsByCompanies[7],
                    //     backgroundColor: 'rgba(215, 120, 42, .45)',
                    //     borderColor: 'rgba(215, 120, 42, 1)',
                    //     borderWidth: 2
                    // }
                ]
            },
            options: {
                // scales: {
                //     yAxes: [{
                //         ticks: {
                //             beginAtZero: true
                //         },
                //         // stacked: true,
                //         // scaleLabel: {
                //         //     display: true,
                //         //     labelString: "yiek"
                //         // }
                //     }],
                //     xAxes: [{ stacked: true }]
                // }
            }
        });
    }

    export function stackedPortfolioTimes(noargs){
        if(SEV_Chart) SEV_Chart.destroy();
        let chartType = "bar";
        let chartLabel = "Total Time Commitment Over Portfolio";
        let yaxis = 'Time (hrs)';
        let xaxis = "Portfolio Companies";


        let SEV_INTERNALS = SEV_Internals(); // Get unique internal personnel from the dataset
        let SEV_COMPANIES = SEV_Companies(); // Get unique companies from the dataset

        let internalTimeCommitmentByCompanies = [];

        for(let i = 0; i < SEV_INTERNALS.length; i++) {
            let someVar = SEV_ExtractTimeCommitmentByPortfolio(SEV_INTERNALS[i], SEV_COMPANIES);
            internalTimeCommitmentByCompanies.push(someVar);
        }
        SEV_Chart = generateStackedBarChartPortfolio(chartType, chartLabel, SEV_INTERNALS, SEV_COMPANIES, internalTimeCommitmentByCompanies, yaxis, xaxis);
    }

    export function stackedPortfolioIntros(noargs){
        if(SEV_Chart) SEV_Chart.destroy();
        let chartType = "bar";
        let chartLabel = "Total Introductions Over Portfolio";
        let yaxis = 'Number of Introductions';
        let xaxis = "Portfolio Companies";

        let SEV_INTERNALS = SEV_Internals(); // Get unique internal personnel from the dataset
        let SEV_COMPANIES = SEV_Companies(); // Get unique companies from the dataset

        let internalIntroductionsByCompanies = [];
        for(let i = 0; i < SEV_INTERNALS.length; i++) {
            let someVar = SEV_ExtractIntroductionsByPortfolio(SEV_INTERNALS[i], SEV_COMPANIES);
            internalIntroductionsByCompanies.push(someVar);
        }
        SEV_Chart = generateStackedBarChartPortfolio(chartType, chartLabel, SEV_INTERNALS, SEV_COMPANIES, internalIntroductionsByCompanies, yaxis, xaxis);
    }

    //   https://travishorn.com/stacked-bar-chart-with-chart-js-846ebdf11c4e
    function generateStackedBarChartPortfolio(type, label, labels, data, internalIntroductionsByCompanies, yaxis, xaxis){
        ctx = document.getElementById('SEV_Chart');
        return new Chart(ctx, {
            type: type,
            data: {
                labels: data,
                datasets: [
                    {
                        label: labels[0],
                        data: internalIntroductionsByCompanies[0],
                        backgroundColor: 'rgba(54, 162, 235, .45)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2
                    },
                    {
                        label: labels[1],
                        data: internalIntroductionsByCompanies[1],
                        backgroundColor: 'rgba(255, 99, 132, .45)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2
                    },
                    {
                        label: labels[2],
                        data: internalIntroductionsByCompanies[2],
                        backgroundColor: 'rgba(75, 192, 192, .45)',
                        borderColor: 'rgba(75, 192, 192,1)',
                        borderWidth: 2
                    },
                    {
                        label: labels[3],
                        data: internalIntroductionsByCompanies[3],
                        backgroundColor: 'rgba(255, 206, 86, .45)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2
                    },
                    {
                        label: labels[4],
                        data: internalIntroductionsByCompanies[4],
                        backgroundColor: 'rgba(153, 102, 255, .45)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 2
                    },
                    {
                        label: labels[5],
                        data: internalIntroductionsByCompanies[5],
                        backgroundColor: 'rgba(255, 159, 64, .45)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 2
                    },
                    {
                        label: labels[6],
                        data: internalIntroductionsByCompanies[6],
                        backgroundColor: 'rgba(123, 255, 24, .45)',
                        borderColor: 'rgba(123, 255, 24, 1)',
                        borderWidth: 2
                    },
                    {
                        label: labels[7],
                        data: internalIntroductionsByCompanies[7],
                        backgroundColor: 'rgba(217, 255, 0, .45)',
                        borderColor: 'rgba(217, 255, 0, 0.85)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 14
                    }
                },
                title: {
                    display: true,
                    text: label,
                    fontSize: 24,
                    fontColor: '#018786',
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 16
                        },
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: yaxis,
                            fontSize: 18,
                            fontColor: '#018786'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 16
                        },
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: xaxis,
                            fontSize: 18,
                            fontColor: '#018786'
                        }
                    }]
                }
            }
        });
    }

    export function stackedIntroductionsPerCompany(touchPoint){
        if(SEV_Chart) SEV_Chart.destroy();
        let chartType = "bar";
        let chartLabel = "Total " + touchPoint + " Introductions Over Portfolio";
        let yaxis = 'Number of Introductions';
        let xaxis = "Portfolio Companies";

        let SEV_COMPANIES = SEV_Company_Per_TouchPoint(touchPoint);

        let engineeringExpertiseByTP = SEV_ExtractIntroductionCountByExpertiseAndTouchPoint(touchPoint, SEV_COMPANIES, expertise[0]);
        let salesExpertiseByTP = SEV_ExtractIntroductionCountByExpertiseAndTouchPoint(touchPoint, SEV_COMPANIES, expertise[1]);
        let recruitingExpertiseByTP = SEV_ExtractIntroductionCountByExpertiseAndTouchPoint(touchPoint, SEV_COMPANIES, expertise[2]);

        let expertiseByTP = [engineeringExpertiseByTP, salesExpertiseByTP, recruitingExpertiseByTP];
        SEV_Chart = generateStackedBarChart(chartType, SEV_COMPANIES, chartLabel, expertiseByTP, yaxis, xaxis);
    }

    //   https://travishorn.com/stacked-bar-chart-with-chart-js-846ebdf11c4e
    function generateStackedBarChart(type, labels, label, data, yaxis, xaxis){
        ctx = document.getElementById('SEV_Chart');
        return new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [
                    {
                        label: expertise[0],
                        data: data[0],
                        backgroundColor: 'rgba(54, 162, 235, .45)',
                        borderColor: 'rgba(54, 162, 235,1)',
                        borderWidth: 2
                    },
                    {
                        label: expertise[1],
                        data: data[1],
                        backgroundColor: 'rgba(255, 99, 132, .45)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2
                    },
                    {
                        label: expertise[2],
                        data: data[2],
                        borderColor: 'rgba(75, 192, 192,1)',
                        backgroundColor: 'rgba(75, 192, 192, .45)',
                        borderWidth: 2
                    },
                ]
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 14
                    }
                },
                title: {
                    display: true,
                    text: label,
                    fontSize: 24,
                    fontColor: '#018786',
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 16
                        },
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: yaxis,
                            fontSize: 18,
                            fontColor: '#018786'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 16
                        },
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: xaxis,
                            fontSize: 18,
                            fontColor: '#018786'
                        }
                    }]
                }
            }
        });
    }

    function generatePolarChart(type, labels, label, data){
        ctx = document.getElementById('SEV_Chart');
        return new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(123, 255, 24, 0.2)',
                        'rgba(215, 120, 42, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(123, 255, 24, 1)',
                        'rgba(215, 120, 42, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 14
                    }
                },
                title: {
                    display: true,
                    text: label,
                    fontSize: 24,
                    fontColor: '#018786',
                },
//                 scales: {
//                     yAxes: [{
//                         ticks: {
// //                            beginAtZero: true,
//                             fontSize: 16
//                         },
//                         stacked: true,
//                         scaleLabel: {
//                             display: false,
//  //                           labelString: yaxis,
//                             fontSize: 18,
//                             fontColor: '#018786'
//                         }
//                     }],
//                     xAxes: [{
//                         ticks: {
//                             fontSize: 16
//                         },
//                         stacked: true,
//                         scaleLabel: {
//                             display: false,
//    //                         labelString: xaxis,
//                             fontSize: 18,
//                             fontColor: '#018786'
//                         }
//                     }]
//                 }
            }
        });
    }

    function generateBarChart(type, labels, label, data, yaxis, xaxis){
        ctx = document.getElementById('SEV_Chart');
        return new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(123, 255, 24, 0.2)',
                        'rgba(215, 120, 42, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(123, 255, 24, 1)',
                        'rgba(215, 120, 42, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: label,
                    fontSize: 24,
                    fontColor: '#018786',
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 16
                        },
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: yaxis,
                            fontSize: 18,
                            fontColor: '#018786'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 16
                        },
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: xaxis,
                            fontSize: 18,
                            fontColor: '#018786'
                        }
                    }]
                }
           }
        });
    }

    function generateScatterChart(type, labels, label, data) {
         ctx = document.getElementById('SEV_Chart');
         return new Chart(ctx, {
             type: type,
             data: {
                 datasets: [{
                    // label: 'Scatter Dataset',
                     radius: 7,
                     borderColor: chartColors.grey,
                     backgroundColor: 'rgb(54, 162, 235,.70)',
                     data: data,
                 }]
             },
             options: {
                 scales: {
                     yAxes: [{
                         ticks: {
                             beginAtZero: true
                         },
                         scaleLabel: {
                             display: true,
                             labelString: 'minutes'
                         }
                     }],
                     xAxes: [{
                         type: 'category',
                         labels: labels,
                     }],
                 },
                 legend: {
                     display: false,
                     },
             }
         });
    }

    var chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(231,233,237)'
    };
</script>

