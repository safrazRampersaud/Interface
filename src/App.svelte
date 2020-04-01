<script>
   import Button, { Group } from '@smui/button/bare.js';
   import '@smui/button/bare.css';

   import Paper, {Title, Subtitle, Content} from '@smui/paper/bare.js';
   import '@smui/paper/bare.css';

    import { onMount, afterUpdate} from "svelte";

    import Chart from './Chart.svelte'
    import {
                totalResponseTimePerCompany,
                averageResponseTimePerCompany,
                timeCommitmentDistributionPerCompany,
                stackedExpertiseTimeCommitmentPerCompany,
                stackedIntroductionsPerCompany,
                stackedPortfolioIntros,
                stackedPortfolioTimes,
                radarPorfolioSuccess,
                }  from './Chart.svelte'

var Time_to_death     = 32;
var logN              = Math.log(7e6);
var I0                = 1;
var N                 = Math.exp(logN);
var R0                = 2.2;
var D_incbation       = 5.2;
var D_infectious      = 2.9;
var D_recovery_mild   = (14 - 2.9);
var D_recovery_severe = (31.5 - 2.9);
var D_hospital_lag    = 5;
var D_death           = Time_to_death - D_infectious;
var CFR               = 0.02;
var InterventionTime  = 100;
var OMInterventionAmt = 2/3;
var InterventionAmt   = 1 - OMInterventionAmt;
var Time              = 220;
var Xmax              = 110000;
var dt                = 2;
var P_SEVERE          = 0.2;
var duration          = 7*12*1e10;

</script>

<!--&lt;!&ndash;Averages&ndash;&gt;-->
<!--<Button on:click={() => afterUpdate(averageResponseTimePerCompany("Email"))} color="secondary" variant="raised" dense> Average Email Response Times </Button>-->
<!--<Button on:click={() => afterUpdate(averageResponseTimePerCompany("Call"))} color="secondary" variant="raised" dense> Average Call Times </Button>-->
<!--<Button on:click={() => afterUpdate(averageResponseTimePerCompany("Calendar"))} color="secondary" variant="raised" dense> Average Calendar Times </Button>-->
<!--<br>-->
<!--&lt;!&ndash;Totals&ndash;&gt;-->
<!--<Button on:click={() => afterUpdate(totalResponseTimePerCompany("Email"))} color="secondary" variant="raised" dense> Total Email Response Times </Button>-->
<!--<Button on:click={() => afterUpdate(totalResponseTimePerCompany("Call"))} color="secondary" variant="raised" dense> Total Call Times </Button>-->
<!--<Button on:click={() => afterUpdate(totalResponseTimePerCompany("Calendar"))} color="secondary" variant="raised" dense> Total Calendar Times </Button>-->
<!--<br>-->
<!--&lt;!&ndash;Distributions&ndash;&gt;-->
<!--<Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Email"))} color="secondary" variant="raised" dense> Email Response Time Distribution </Button>-->
<!--<Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Call"))} color="secondary" variant="raised" dense> Call Time Distribution </Button>-->
<!--<Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Calendar"))} color="secondary" variant="raised" dense> Calendar Time Distribution </Button>-->
<!--<br>-->
<!--&lt;!&ndash;Stacked Time&ndash;&gt;-->
<!--<Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Email"))} color="secondary" variant="raised" dense> Email Response Time By Expertise </Button>-->
<!--<Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Call"))} color="secondary" variant="raised" dense> Call Time By Expertise </Button>-->
<!--<Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Calendar"))} color="secondary" variant="raised" dense> Calendar Time By Expertise </Button>-->
<!--<br>-->

<!--&lt;!&ndash;Stacked Count&ndash;&gt;-->
<!--<Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Email"))} color="secondary" variant="raised" dense> Email Introductions By Expertise </Button>-->
<!--<Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Call"))} color="secondary" variant="raised" dense> Call Introductions By Expertise </Button>-->
<!--<Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Calendar"))} color="secondary" variant="raised" dense> Calendar Introductions By Expertise </Button>-->
<!--<br>-->

<!--Success Ratio-->
<!--https://www.chartjs.org/samples/latest/charts/line/point-styles.html-->
<!--<Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Email"))} color="secondary" variant="raised" dense> Email Response Time By Expertise </Button>-->
<!--<Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Call"))} color="secondary" variant="raised" dense> Call Time By Expertise </Button>-->
<!--<Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Calendar"))} color="secondary" variant="raised" dense> Calendar Time By Expertise </Button>-->

<!--    <div class="paper-container">-->
<!--        <Paper color="rgba(75, 192, 192, 1)" class="paper-demo">-->
<!--            <Title>Total Response Times </Title>-->
<!--            <Button on:click={() => afterUpdate(totalResponseTimePerCompany("Email"))} color="secondary" variant="raised" dense> Email Responses </Button>-->
<!--            <Button on:click={() => afterUpdate(totalResponseTimePerCompany("Call"))} color="secondary" variant="raised" dense> Calls </Button>-->
<!--            <Button on:click={() => afterUpdate(totalResponseTimePerCompany("Calendar"))} color="secondary" variant="raised" dense> Calendars </Button>-->
<!--        </Paper>-->
<!--    </div>-->


    <!--    <div>-->
    <!--        <Button on:click={() => clicked++}>  Default </Button>-->
    <!--        <Button on:click={() => clicked++} disabled>  Disabled </Button>-->
    <!--        <Button on:click={() => clicked++} ripple={false}>  No Ripple </Button>-->
    <!--        <Button on:click={() => clicked++} variant="raised">  Raised </Button>-->
    <!--        <Button on:click={() => clicked++} variant="unelevated">  Unelevated </Button>-->
    <!--        <Button on:click={() => clicked++} variant="outlined">  Outlined </Button>-->
    <!--        <Button on:click={() => clicked++} dense>  Dense </Button>-->
    <!--        <Button on:click={() => clicked++} class="myClass">  With a Class </Button>-->

    <!--    </div>-->

<div style="height:210px;">
<!--    <div class="minorTitle">-->
<!--        <div style="margin: 0px 0px 5px 4px" class="minorTitleColumn">Transmission Dynamics</div>-->
<!--        <div style="flex: 0 0 20; width:20px"></div>-->
<!--        <div style="margin: 0px 4px 5px 0px" class="minorTitleColumn">Clinical Dynamics</div>-->
<!--    </div>-->
    <div class = "row">

        <div class="column">
            <div class="minorTitleEmail">Email</div>
<!--            <div class="paneldesc" style="height:30px">Size of population.<br></div>-->
<!--            <div class="slidertext">{(Math.round(N))}</div>-->
<!--            <input class="range" style="margin-bottom: 8px"type=range bind:value={logN} min={5} max=25 step=0.01>-->
<!--            <div class="paneldesc" style="height:29px; border-top: 1px solid #EEE; padding-top: 10px">Number of initial infections.<br></div>-->
<!--            <div class="slidertext">{I0}</div>-->
<!--            <input class="range" type=range bind:value={I0} min={1} max=10000 step=1>-->
            <br>
            <Button on:click={() => afterUpdate(averageResponseTimePerCompany("Email"))} color="secondary" variant="raised" dense> Averages </Button>
            <!--Totals-->
            <Button on:click={() => afterUpdate(totalResponseTimePerCompany("Email"))} color="secondary" variant="raised" dense> Totals </Button>
            <!--Distributions-->
            <Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Email"))} color="secondary" variant="raised" dense> Distribution </Button>
            <!--Stacked Time-->
            <Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Email"))} color="secondary" variant="raised" dense> Totals By Expertise </Button>
            <!--Stacked Count-->
            <Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Email"))} color="secondary" variant="raised" dense> Intros By Expertise </Button>
        </div>

        <div class="column">
<!--            <div class="paneltext">-->
                <div class="minorTitleCalendar">Calendar</div>
<!--                <div class="paneldesc">Measure of contagiousness: the number of secondary infections each infected individual produces. <br></div>-->
<!--            </div>-->
<!--            <div class="slidertext">{R0}</div>-->
<!--            <input class="range" type=range bind:value={R0} min=0.01 max=10 step=0.01>-->
            <br>
            <Button on:click={() => afterUpdate(averageResponseTimePerCompany("Calendar"))} color="secondary" variant="raised" dense> Averages </Button>
            <!--Totals-->
            <Button on:click={() => afterUpdate(totalResponseTimePerCompany("Calendar"))} color="secondary" variant="raised" dense> Totals </Button>
            <!--Distributions-->
            <Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Calendar"))} color="secondary" variant="raised" dense>  Distribution </Button>
            <!--Stacked Time-->
            <Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Calendar"))} color="secondary" variant="raised" dense> Totals By Expertise </Button>
            <!--Stacked Count-->
            <Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Calendar"))} color="secondary" variant="raised" dense> Intros By Expertise </Button>
        </div>

        <div class="column">
            <div class="minorTitleCalls">Calls</div>
<!--            <div class="paneldesc" style="height:30px">Length of incubation period, }.<br></div>-->
<!--            <div class="slidertext">{(D_incbation).toFixed(2)} days</div>-->
<!--            <input class="range" style="margin-bottom: 8px"type=range bind:value={D_incbation} min={0.15} max=24 step=0.0001>-->
<!--            <div class="paneldesc" style="height:29px; border-top: 1px solid #EEE; padding-top: 10px">Duration patient is infectious, }.<br></div>-->
<!--            <div class="slidertext">{D_infectious} Days</div>-->
<!--            <input class="range" type=range bind:value={D_infectious} min={0} max=24 step=0.01>-->
            <br>
            <Button on:click={() => afterUpdate(averageResponseTimePerCompany("Call"))} color="secondary" variant="raised" dense> Averages </Button>
            <!--Totals-->
            <Button on:click={() => afterUpdate(totalResponseTimePerCompany("Call"))} color="secondary" variant="raised" dense> Totals </Button>
            <!--Distributions-->
            <Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Call"))} color="secondary" variant="raised" dense>  Distribution </Button>
            <!--Stacked Time-->
            <Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Call"))} color="secondary" variant="raised" dense> Totals By Expertise </Button>
            <!--Stacked Count-->
            <Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Call"))} color="secondary" variant="raised" dense> Intros By Expertise </Button>
        </div>

        <div class="column">
            <div class="minorTitlePortfolio">Portfolio</div>
            <!--            <div class="paneldesc" style="height:30px">Length of incubation period, }.<br></div>-->
            <!--            <div class="slidertext">{(D_incbation).toFixed(2)} days</div>-->
            <!--            <input class="range" style="margin-bottom: 8px"type=range bind:value={D_incbation} min={0.15} max=24 step=0.0001>-->
            <!--            <div class="paneldesc" style="height:29px; border-top: 1px solid #EEE; padding-top: 10px">Duration patient is infectious, }.<br></div>-->
            <!--            <div class="slidertext">{D_infectious} Days</div>-->
            <!--            <input class="range" type=range bind:value={D_infectious} min={0} max=24 step=0.01>-->
            <br>
<!--            <Button on:click={() => afterUpdate(radarPorfolioSuccess("void"))} color="secondary" variant="raised" dense> Success Ratios</Button>-->
            <Button on:click={() => afterUpdate(stackedPortfolioIntros("void"))} color="secondary" variant="raised" dense> Intros</Button>
            <Button on:click={() => afterUpdate(stackedPortfolioTimes("void"))} color="secondary" variant="raised" dense> Time Commitments</Button>
        </div>

        <!--        <div style="flex: 0 0 20; width:20px"></div>-->

<!--        <div class="column">-->
<!--            <div class="paneltitle">Mortality Statistics</div>-->
<!--            <div class="paneldesc" style="height:30px">Case fatality rate.<br></div>-->
<!--            <div class="slidertext">{(CFR*100).toFixed(2)} %</div>-->
<!--            <input class="range" style="margin-bottom: 8px" type=range bind:value={CFR} min={0} max=1 step=0.0001>-->
<!--            <div class="paneldesc" style="height:29px; border-top: 1px solid #EEE; padding-top: 10px">Time from end of incubation to death.<br></div>-->
<!--            <div class="slidertext">{Time_to_death} Days</div>-->
<!--            <input class="range" type=range bind:value={Time_to_death} min={(D_infectious)+0.1} max=100 step=0.01>-->
<!--        </div>-->

<!--        <div class="column">-->
<!--            <div class="paneltitle">Recovery Times</div>-->
<!--            <div class="paneldesc" style="height:30px">Length of hospital stay<br></div>-->
<!--            <div class="slidertext">{D_recovery_severe} Days</div>-->
<!--            <input class="range" style="margin-bottom: 8px" type=range bind:value={D_recovery_severe} min={0.1} max=100 step=0.01>-->
<!--            <div class="paneldesc" style="height:29px; border-top: 1px solid #EEE; padding-top: 10px">Recovery time for mild cases<br></div>-->
<!--            <div class="slidertext">{D_recovery_mild} Days</div>-->
<!--            <input class="range" type=range bind:value={D_recovery_mild} min={0.5} max=100 step=0.01>-->
<!--        </div>-->

<!--        <div class="column">-->
<!--            <div class="paneltitle">Care statistics</div>-->
<!--            <div class="paneldesc" style="height:30px">Hospitalization rate.<br></div>-->
<!--            <div class="slidertext">{(P_SEVERE*100).toFixed(2)} %</div>-->
<!--            <input class="range" style="margin-bottom: 8px"type=range bind:value={P_SEVERE} min={0} max=1 step=0.0001>-->
<!--            <div class="paneldesc" style="height:29px; border-top: 1px solid #EEE; padding-top: 10px">Time to hospitalization.<br></div>-->
<!--            <div class="slidertext">{D_hospital_lag} Days</div>-->
<!--            <input class="range" type=range bind:value={D_hospital_lag} min={0.5} max=100 step=0.01>-->
<!--        </div>-->
    </div>
</div>
<div>
    <Chart />
</div>
