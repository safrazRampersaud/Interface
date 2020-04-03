<svelte:head>
    <title>Ventures - EMS</title>
</svelte:head>


<script>
   import Button, { Group } from '@smui/button/bare.js';
   import '@smui/button/bare.css';

   import Paper, {Title, Subtitle, Content} from '@smui/paper/bare.js';
   import '@smui/paper/bare.css';

    import { onMount, afterUpdate} from "svelte";

   import TopAppBar, {Row, Section} from '@smui/top-app-bar/bare.js';
   import '@smui/top-app-bar/bare.css';

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
</script>

<div class="flexy">
        <TopAppBar variant="static" color='secondary' align="center">
            <h3>VENTURES - ENGAGEMENT MANAGEMENT SYSTEM</h3>
        </TopAppBar>
    </div>
<br>

<div style="height:210px;">
    <div class = "row">
        <div class="column">
            <div class="minorTitlePortfolio">Portfolio</div>
            <br>
            <Button on:click={() => afterUpdate(stackedPortfolioIntros("void"))} color="secondary" variant="raised" dense> Introductions </Button>
            <Button on:click={() => afterUpdate(stackedPortfolioTimes("void"))} color="secondary" variant="raised" dense> Commitments</Button>
        </div>

        <div class="column">
            <div class="minorTitleEmail">Email</div>
            <br>

            <!--Stacked Count-->
            <Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Email"))} color="secondary" variant="raised" dense> Intros By Expertise </Button>

            <!--Stacked Time-->
            <Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Email"))} color="secondary" variant="raised" dense> Totals By Expertise </Button>

            <!--Averages-->
            <Button on:click={() => afterUpdate(averageResponseTimePerCompany("Email"))} color="secondary" variant="raised" dense> Average Response </Button>

            <!--Totals-->
            <Button on:click={() => afterUpdate(totalResponseTimePerCompany("Email"))} color="secondary" variant="raised" dense> Total Response </Button>

<!--            &lt;!&ndash;Distributions&ndash;&gt;-->
<!--            <Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Email"))} color="secondary" variant="raised" dense> Distribution </Button>-->
        </div>

        <div class="column">
                <div class="minorTitleCalendar">Calendar</div>
            <br>

            <!--Stacked Count-->
            <Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Calendar"))} color="secondary" variant="raised" dense> Intros By Expertise </Button>

            <!--Stacked Time-->
            <Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Calendar"))} color="secondary" variant="raised" dense> Totals By Expertise </Button>

            <!--Averages-->
            <Button on:click={() => afterUpdate(averageResponseTimePerCompany("Calendar"))} color="secondary" variant="raised" dense> Average Time </Button>

            <!--Totals-->
            <Button on:click={() => afterUpdate(totalResponseTimePerCompany("Calendar"))} color="secondary" variant="raised" dense> Total Time </Button>

<!--            &lt;!&ndash;Distributions&ndash;&gt;-->
<!--            <Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Calendar"))} color="secondary" variant="raised" dense>  Distribution </Button>-->
        </div>

        <div class="column">
            <div class="minorTitleCalls">Calls</div>
            <br>
            <!--Stacked Count-->
            <Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Call"))} color="secondary" variant="raised" dense> Intros By Expertise </Button>

            <!--Stacked Time-->
            <Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Call"))} color="secondary" variant="raised" dense> Totals By Expertise </Button>

            <!--Averages-->
            <Button on:click={() => afterUpdate(averageResponseTimePerCompany("Call"))} color="secondary" variant="raised" dense> Average Time </Button>

            <!--Totals-->
            <Button on:click={() => afterUpdate(totalResponseTimePerCompany("Call"))} color="secondary" variant="raised" dense> Total Time </Button>

        </div>
    </div>
</div>

<div>
    <Chart />
</div>

    <style>
        .flexy {
            display: flex;
            flex-wrap: wrap;
            border: 2px solid #03DAC6;
        }
    </style>

