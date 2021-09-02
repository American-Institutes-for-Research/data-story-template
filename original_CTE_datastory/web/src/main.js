import Vue from 'vue'
import Table1ParticipantChart from './components/Table1ParticipantChart.vue'
import Table1ConcentratorChart from './components/Table1ConcentratorChart.vue'
import Table2ClusterMap from './components/Table2ClusterMap.vue'
import Table2ClusterToggleMap from './components/Table2ClusterToggleMap.vue'
import Table4CreditActivityChart from './components/Table4CreditActivityChart.vue'
import Table5LocationChart from './components/Table5LocationChart.vue'
import Table7GraduatedHS from './components/Table7GraduatedHS.vue'
import Table8EnrolledPS from './components/Table8EnrolledPS.vue'
import Table6aConcentrators from './components/Table6aConcentrators.vue'
import Table9StatusConcentrators from './components/Table9StatusConcentrators.vue'
import Table9EarningsConcentrators from './components/Table9EarningsConcentrators.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Table1ParticipantChart),
}).$mount('#table1_participant_chart')

new Vue({
  render: h => h(Table1ConcentratorChart),
}).$mount('#table1_concentrator_chart')

new Vue({
  render: h => h(Table2ClusterMap),
}).$mount('#table2_cluster_map')

new Vue({
  render: h => h(Table2ClusterToggleMap),
}).$mount('#table2_cluster_toggle_map')

new Vue({
  render: h => h(Table4CreditActivityChart),
}).$mount('#table4_credit_activity_chart')

new Vue({
  render: h => h(Table5LocationChart),
}).$mount('#table5_location_chart')

new Vue({
  render: h => h(Table7GraduatedHS),
}).$mount('#table7_graduated_hs')

new Vue({
  render: h => h(Table8EnrolledPS),
}).$mount('#table8_enrolled_ps')

new Vue({
  render: h => h(Table6aConcentrators),
}).$mount('#table6a_concentrators')

new Vue({
  render: h => h(Table9StatusConcentrators),
}).$mount('#table9_status_concentrators')

new Vue({
  render: h => h(Table9EarningsConcentrators),
}).$mount('#table9_earnings_concentrators')