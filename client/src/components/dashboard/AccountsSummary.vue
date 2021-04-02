<template>
  <section>
    <h2 class="is-size-3 mb-5" auto-id="header-panel">Accounts Summary</h2>
    <div class="columns is-multiline is-center is-vcentered has-text-centered">
      <div class="column is-12">
        <div v-if="this.$store.getters.accounts !== null">
          <canvas id="accountsChart"></canvas>
        </div>
        <div v-else>
          <h2 class="is-size-4" auto-id="header-panel">
            No Accounts are Available
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "AccountsSummary",
  data: () => {
    return {
      School: 0,
      Work: 0,
      Finance: 0,
      Social: 0,
      Tech: 0,
      Gaming: 0,
      Automotive: 0,
      Family: 0
    };
  },
  computed:{
    accounts(){
      return this.$store.getters.accounts;
    }
  },
  watch:{
    accounts(){
      this.loadAccountsSummary();
    }
  },
  methods:{
    loadAccountsSummary(){
      const accounts = this.$store.getters.accounts;

      if (accounts) {
        for (const [key, value] of Object.entries(accounts)) {
          this[value.category] += 1;
        }

        let ctx = document.getElementById('accountsChart').getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['School', 'Work', 'Social', 'Finance', 'Tech', 'Gaming', 'Automotive', 'Family'],
            datasets: [{
              data: [this.School, this.Work, this.Social, this.Finance, this.Tech, this.Gaming, this.Automotive, this.Family],
              backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)',
                'rgba(135,205,800, 0.4)',
                'rgba(179,25,169, 0.4)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgb(135,205,800, 1)',
                'rgba(179,25,169, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            legend: {
              labels: {
                responsive: true,
                maintainAspectRatio: true,
                fontColor: 'white',
                fontSize: 18
              }
            }
          }
        });
      }
    }
  },
  mounted() {
    this.loadAccountsSummary();
  }
}
</script>
