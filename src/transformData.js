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
            countTimeCommitments[index] = countTimeCommitments[index] + proxyData[i].timeCommitment/60;
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
                timeCommitmentsCompanyCounter[indexDiscoveryOnCompany] += proxyData[i].timeCommitment/60;
            }
        }
    }
    return timeCommitmentsCompanyCounter;
}

export function SEV_ExtractSuccessRatiosByPortfolio(internal, companies){
    let internalCompanyCounter = Array(companies.length).fill(0);
    let successVector = Array(companies.length).fill(0);

    let ratioVector = Array(companies.length).fill(0);

    for (let i = 0; i < proxyData.length; i++){
        if(proxyData[i].internal.first + " " + proxyData[i].internal.last === internal){
            let indexDiscoveryOnCompanies = companies.indexOf(proxyData[i].portfolio.company);
            internalCompanyCounter[indexDiscoveryOnCompanies] += 1;
            if(proxyData[i].introduction.result === "SUCCESS"){
                successVector[indexDiscoveryOnCompanies] += 1;
            }
        }
    }

    for(let j = 0; j < companies.length; j++){
        let res;
        if(internalCompanyCounter[j] === 0)
            res = 0.0;
        else
            res = successVector[j]/internalCompanyCounter[j];
        console.log(res);
        ratioVector.push(res);
    }
    console.log("S: " + successVector.length);
    console.log("I: " + internalCompanyCounter.length);
    console.log("R: " + ratioVector.length);

    return ratioVector;
}

export function SEV_ExtractIntroductionsByPortfolio(SEV_Internal, SEV_Companies){
    let internalCompanyCounter = Array(SEV_Companies.length).fill(0);
    for (let i = 0; i < proxyData.length; i++){
        if(proxyData[i].internal.first + " " + proxyData[i].internal.last === SEV_Internal){
            let indexDiscoveryOnCompanies = SEV_Companies.indexOf(proxyData[i].portfolio.company);
            internalCompanyCounter[indexDiscoveryOnCompanies] += 1;
        }
    }
    return internalCompanyCounter;
}

export function SEV_ExtractTimeCommitmentByPortfolio(SEV_Internal, SEV_Companies){
    let internalCompanyTimeAggregate = Array(SEV_Companies.length).fill(0);
    for (let i = 0; i < proxyData.length; i++){
        if(proxyData[i].internal.first + " " + proxyData[i].internal.last === SEV_Internal){
            let indexDiscoveryOnCompanies = SEV_Companies.indexOf(proxyData[i].portfolio.company);
            internalCompanyTimeAggregate[indexDiscoveryOnCompanies] += proxyData[i].timeCommitment/60;
        }
    }
    return internalCompanyTimeAggregate;
}

export function SEV_Internals(){
    let internalIDs = Array();
    for (let i = 0; i < proxyData.length; i++){
        internalIDs.push(proxyData[i].internal.first + " " + proxyData[i].internal.last);
    }
    //Remove duplicates : https://wsvincent.com/javascript-remove-duplicates-array/
    let captureInternalIDs = (internalIDs) => internalIDs.filter((v,i) => internalIDs.indexOf(v) === i);
    return captureInternalIDs(internalIDs);
}

export function SEV_Companies(){
    let portfolioCompanies = Array();
    for (let i = 0; i < proxyData.length; i++){
        portfolioCompanies.push(proxyData[i].portfolio.company);
    }
    //Remove duplicates : https://wsvincent.com/javascript-remove-duplicates-array/
    let capturePortfolioCompanies = (portfolioCompanies) => portfolioCompanies.filter((v,i) => portfolioCompanies.indexOf(v) === i);
    return capturePortfolioCompanies(portfolioCompanies);
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