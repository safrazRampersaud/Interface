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
                stackedIntroductionsPerCompany
            }  from './Chart.svelte'
</script>

<!--Averages-->
<Button on:click={() => afterUpdate(averageResponseTimePerCompany("Email"))} color="secondary" variant="raised" dense> Average Email Response Times </Button>
<Button on:click={() => afterUpdate(averageResponseTimePerCompany("Call"))} color="secondary" variant="raised" dense> Average Call Times </Button>
<Button on:click={() => afterUpdate(averageResponseTimePerCompany("Calendar"))} color="secondary" variant="raised" dense> Average Calendar Times </Button>
<br>
<!--Totals-->
<Button on:click={() => afterUpdate(totalResponseTimePerCompany("Email"))} color="secondary" variant="raised" dense> Total Email Response Times </Button>
<Button on:click={() => afterUpdate(totalResponseTimePerCompany("Call"))} color="secondary" variant="raised" dense> Total Call Times </Button>
<Button on:click={() => afterUpdate(totalResponseTimePerCompany("Calendar"))} color="secondary" variant="raised" dense> Total Calendar Times </Button>
<br>
<!--Distributions-->
<Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Email"))} color="secondary" variant="raised" dense> Email Response Time Distribution </Button>
<Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Call"))} color="secondary" variant="raised" dense> Call Time Distribution </Button>
<Button on:click={() => afterUpdate(timeCommitmentDistributionPerCompany("Calendar"))} color="secondary" variant="raised" dense> Calendar Time Distribution </Button>
<br>
<!--Stacked Time-->
<Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Email"))} color="secondary" variant="raised" dense> Email Response Time By Expertise </Button>
<Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Call"))} color="secondary" variant="raised" dense> Call Time By Expertise </Button>
<Button on:click={() => afterUpdate(stackedExpertiseTimeCommitmentPerCompany("Calendar"))} color="secondary" variant="raised" dense> Calendar Time By Expertise </Button>
<br>

<!--Stacked Count-->
<Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Email"))} color="secondary" variant="raised" dense> Email Introductions By Expertise </Button>
<Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Call"))} color="secondary" variant="raised" dense> Call Introductions By Expertise </Button>
<Button on:click={() => afterUpdate(stackedIntroductionsPerCompany("Calendar"))} color="secondary" variant="raised" dense> Calendar Introductions By Expertise </Button>
<br>

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

<div>
    <Chart />
</div>
