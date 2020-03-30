import { proxyData } from './sourceData'

export function SEV_Company_Per_TouchPoint(touchPoint){
    let capturePortfolioCompanies = Array();
    for (let i = 0; i < proxyData.length; i++){
        if(proxyData[i].introduction.touchPoint === touchPoint){
            capturePortfolioCompanies.push(proxyData[i].portfolio.company);
        }
    }
    //Remove duplicates : https://wsvincent.com/javascript-remove-duplicates-array/
    let uniqueCapturePortfolioCompanies = (capturePortfolioCompanies) => capturePortfolioCompanies.filter((v,i) => capturePortfolioCompanies.indexOf(v) === i);
    return uniqueCapturePortfolioCompanies(capturePortfolioCompanies);
}

export function SEV_TimeCommitment_Per_Company(uniqueCompanies, touchPoint){
    let countTimeCommitments = new Array(uniqueCompanies.length).fill(0);
    for (let i = 0; i < proxyData.length; i++){
        if(proxyData[i].introduction.touchPoint === touchPoint) {
            let index = uniqueCompanies.indexOf(proxyData[i].portfolio.company);
            countTimeCommitments[index] = countTimeCommitments[index] + proxyData[i].timeCommitment;
        }
    }
    return countTimeCommitments;
}

export function SEV_Companies_Per_TouchPoint_Event_Counter(uniqueCompanies, touchPoint){
    let timeCommitmentsCompanyCounter = new Array(uniqueCompanies.length).fill(0);
    for (let i = 0; i < proxyData.length; i++){
        if(proxyData[i].introduction.touchPoint === touchPoint) {
            let index = uniqueCompanies.indexOf(proxyData[i].portfolio.company);
            timeCommitmentsCompanyCounter[index] = timeCommitmentsCompanyCounter[index] + 1;
        }
    }
    return timeCommitmentsCompanyCounter;
}

// https://stackoverflow.com/questions/16507222/create-json-object-dynamically-via-javascript-without-concate-strings
export function SEV_ExtractPointsForTouchPointDistribution(touchPoint){
    let points = [];
    for (let i = 0; i < proxyData.length; i++) {
        if (proxyData[i].introduction.touchPoint === touchPoint) {
            points.push({"x": proxyData[i].portfolio.company, "y": proxyData[i].timeCommitment});
        }
    }
    return points;
}

export function SEV_ExtractIntroductionCountByExpertiseAndTouchPoint(touchPoint, uniqueCompanies, expertiseID){
    let introCounterOnExpertiseAndTouchPoint = new Array(uniqueCompanies.length).fill(0);
    for (let i = 0; i < proxyData.length; i++) {
        if (proxyData[i].introduction.touchPoint === touchPoint) {
            if(proxyData[i].internal.expertise === expertiseID){
                let indexDiscoveryOnCompany = uniqueCompanies.indexOf(proxyData[i].portfolio.company);
                introCounterOnExpertiseAndTouchPoint[indexDiscoveryOnCompany] += 1;
            }
        }
    }
    return introCounterOnExpertiseAndTouchPoint;
}

// https://stackoverflow.com/questions/16507222/create-json-object-dynamically-via-javascript-without-concate-strings
export function SEV_ExtractTimeCommitmentsByExpertiseAndTouchPoint(touchPoint, uniqueCompanies, expertiseID){
    let timeCommitmentsCompanyCounter = new Array(uniqueCompanies.length).fill(0);
    for (let i = 0; i < proxyData.length; i++) {
        if (proxyData[i].introduction.touchPoint === touchPoint) {
            if(proxyData[i].internal.expertise === expertiseID){
                let indexDiscoveryOnCompany = uniqueCompanies.indexOf(proxyData[i].portfolio.company);
                timeCommitmentsCompanyCounter[indexDiscoveryOnCompany] += proxyData[i].timeCommitment;
            }
        }
    }
    return timeCommitmentsCompanyCounter;
}

function extractBackgroundColorOnExpertiseLabel(expertise){
    let backgroundColor;
    switch(expertise) {
        case "Engineering":
            backgroundColor = 'rgba(75, 192, 192,.45)';
            break;
        case "Sales":
            backgroundColor = 'rgba(54, 162, 235,.45)';
            break;
        case "Recruiting":
            backgroundColor = 'rgba(255, 99, 132,.45)';
            break;
        default:
            backgroundColor = 'rgba(153, 102, 255, 0.2)';
    }
    return backgroundColor;
}

function extractBorderColorOnExpertiseLabel(expertise){
    let borderColor;
    switch(expertise) {
        case "Engineering":
            borderColor = 'rgba(75, 192, 192, 1)';
            break;
        case "Sales":
            borderColor = 'rgba(54, 162, 235, 1)';
            break;
        case "Recruiting":
            borderColor = 'rgba(255, 99, 132, 1)';
            break;
        default:
            borderColor = 'rgba(153, 102, 255, 1)';
    }
    return borderColor;
}