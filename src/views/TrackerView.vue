<template>
  <div class="row gap-2">
    <div class="col-5">
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
    <div v-if="isHeatMapVisisble" id="chart" class="col-3">
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
          v-for="(dateObj, index) in wholeYearMonthWise['03']"
          :key="index"
          class="day"
          :style="{
            'grid-column':
              index === 0 ? utility.dayMap[wholeYearMonthWise['03'][0].date.getDay()] : 'auto'
          }"
          :class="{ highlight: studyDateHashSet.has(dateObj.dateString) }"
        >
          {{ dateObj.date.getDate() }}
        </div>
      </div>
      <div class="calendarContainer">
        <div class="col days">Mon</div>
        <div class="col days">Tue</div>
        <div class="col days">Wed</div>
        <div class="col days">Thu</div>
        <div class="col days">Fri</div>
        <div class="col days">Sat</div>
        <div class="col days">Sun</div>
        <div
          v-for="(dateObj, index) in wholeYearMonthWise['04']"
          :key="index"
          class="day"
          :style="{
            'grid-column':
              index === 0 ? utility.dayMap[wholeYearMonthWise['04'][0].date.getDay()] : 'auto'
          }"
        >
          {{ dateObj.date.getDate() }}
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
    <div class="col">details</div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStudyTrackerStore } from '../stores/studyTrackerStore.js'
import { useUtility } from '@/composables/utility.js'

const studyTrackerStore = useStudyTrackerStore()
const utility = useUtility()

onMounted(() => {
  studyTrackerStore.fetchTrackingData()
})

const topicList = computed(() => {
  return studyTrackerStore.getTrackingData.value
})

const studyDateHashSet = new Set()
watch(topicList, (newVal) => {
  console.log(newVal)
  newVal.forEach((topic) => {
    console.log(topic.trackingHistory)
    topic.trackingHistory.forEach((snapshotRecord) => {
      console.log(snapshotRecord.snapshotDate)
      studyDateHashSet.add(snapshotRecord.snapshotDate)
      let date = new Date(snapshotRecord.snapshotDate)
      console.log(date)
    })
  })
  console.log(studyDateHashSet)
  console.log(studyDateHashSet.has('2024-04-06'))
})

console.log('----------------------------')
const wholeYear = []
const wholeYearMonthWise = {}
let firstJan2024 = new Date('2024 01 Jan')
let nextDate = new Date(firstJan2024)
for (let i = 0; i < 366; i++) {
  let date = new Date(nextDate)
  if (wholeYearMonthWise[utility.monthDblDigitMap[date.getMonth()]]) {
    wholeYearMonthWise[utility.monthDblDigitMap[date.getMonth()]].push(
      createDateRepresentationObject(date)
    )
  } else {
    wholeYearMonthWise[utility.monthDblDigitMap[date.getMonth()]] = [
      createDateRepresentationObject(date)
    ]
  }
  wholeYear.push(createDateRepresentationObject(date))
  nextDate.setDate(nextDate.getDate() + 1)
  //console.log(nextDate)
}
console.log(wholeYear)
console.log(wholeYearMonthWise)
console.log('----------------------------')
function createDateRepresentationObject(dateVal) {
  return {
    date: dateVal,
    dateString:
      dateVal.getFullYear() +
      '-' +
      utility.monthDblDigitMap[dateVal.getMonth()] +
      '-' +
      (dateVal.getDate().toString().length === 1 ? '0' + dateVal.getDate() : dateVal.getDate())
  }
}

const chartHeading = ref('')
const isHeatMapVisisble = ref(false)
let firstdate = ref(new Date())
const totalDays = ref(0)
function showHeatMap(topic) {
  chartHeading.value = topic.topicName
  isHeatMapVisisble.value = true
  let today = new Date()
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
  border: 1px solid rgb(100, 87, 85);
  padding: 3px 5px;
}
.highlight {
  background-color: #3ac282;
}
.calendarContainer {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 3px 3px;
}
</style>
