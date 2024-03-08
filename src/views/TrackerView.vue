<template>
  <div class="about">
    <div>
      <div v-for="topic in topicList" :key="topic.id" class="mt-3">
        <a
          class="topicName"
          @click="showHeatMap(topic)"
          target="_blank"
          rel="noopener noreferrer"
          >{{ topic.topicName }}</a
        >
      </div>
    </div>
    <div v-if="isHeatMapVisisble" id="chart" class="ms-5">
      {{ chartHeading }}
      <div class="row daysRow"></div>
      <div class="calendarContainer">
        <div class="col days">Mon</div>
        <div class="col days">Tue</div>
        <div class="col days">Wed</div>
        <div class="col days">Thu</div>
        <div class="col days">Fri</div>
        <div class="col days">Sat</div>
        <div class="col days">Sun</div>
        <div
          v-for="(number, index) in totalDays"
          :key="index"
          class="day"
          :style="{ 'grid-column': index === 0 ? utility.dayMap[firstdate.getDay()] : 'auto' }"
        >
          {{ number }}
        </div>
      </div>
      <!-- <apexchart
        type="heatmap"
        width="400"
        height="450"
        :options="chartOptions"
        :series="series"
      ></apexchart> -->
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useStudyTrackerStore } from '../stores/studyTrackerStore.js'
import { useUtility } from '@/composables/utility.js'

const studyTrackerStore = useStudyTrackerStore()
const utility = useUtility()

onMounted(() => {
  studyTrackerStore.fetchTrackingData()
})

const topicList = computed(() => {
  console.log(studyTrackerStore.getTrackingData.value)
  return studyTrackerStore.getTrackingData.value
})

const chartHeading = ref('')
const isHeatMapVisisble = ref(false)
let firstdate = ref(new Date())
const totalDays = ref(0)
function showHeatMap(topic) {
  chartHeading.value = topic.topicName
  isHeatMapVisisble.value = true
  let today = new Date('Apr 19 2024')
  firstdate.value = new Date(utility.monthMap[today.getMonth()] + ' 01 ' + today.getFullYear())
  totalDays.value = utility.monthDaysCountMap[today.getMonth()]
}
</script>
<style lang="scss" scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.topicName {
  font-size: 1.5rem;
}
.days {
  padding: 0px;
  text-align: center;
}
.day {
  width: 40px;
  height: 40px;
  border: 1px solid salmon;
}
.calendarContainer {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 3px 3px;
}
</style>
