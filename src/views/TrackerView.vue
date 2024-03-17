<template>
  <div class="row gap-2">
    <div class="col-5 mt-4">
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
    <div v-if="isHeatMapVisisble" id="chart" class="col-5 mt-5">
      <h4>
        {{ chartHeading }}
      </h4>
      <div class="row heatmap-container mt-4">
        <div class="col-4">
          <div class="row align-items-baseline">
            <div class="col-2"><h5>March</h5></div>
            <div class="col-1">
              <span id="dayToolTip">{{ hoursSpentPerDay }}</span>
            </div>
          </div>
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
              :class="{ highlight: studyDateAndEffortsHashMap.has(dateObj.dateString) }"
              @mouseenter="displayHoursSpent(dateObj.dateString)"
              @mouseleave="hideHoursSpent()"
            >
              {{ dateObj.date.getDate() }}
            </div>
          </div>
        </div>
        <div class="col-4">
          <h5>April</h5>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
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
  newVal.forEach((topic) => {
    topic.trackingHistory.forEach((snapshotRecord) => {
      studyDateHashSet.add(snapshotRecord.snapshotDate)
      let date = new Date(snapshotRecord.snapshotDate)
    })
  })
})

const studyDateAndEffortsHashMap = new Map()
watch(topicList, (newVal) => {
  newVal.forEach((topic) => {
    topic.trackingHistory.forEach((snapshotRecord) => {
      if (studyDateAndEffortsHashMap.has(snapshotRecord.snapshotDate)) {
        let hoursSpent = studyDateAndEffortsHashMap.get(snapshotRecord.snapshotDate)
        if (snapshotRecord.snapshotDate === '2024-03-09') {
        }
        studyDateAndEffortsHashMap.set(
          snapshotRecord.snapshotDate,
          hoursSpent + snapshotRecord.halfHoursSpent / 2
        )
      } else {
        if (snapshotRecord.snapshotDate === '2024-03-09') {
        }
        studyDateAndEffortsHashMap.set(
          snapshotRecord.snapshotDate,
          snapshotRecord.halfHoursSpent / 2
        )
      }
    })
  })

  calculateMinAndMaxHoursSpent()
})

let min = 0
let max = 0
function calculateMinAndMaxHoursSpent() {
  const valueIterator = studyDateAndEffortsHashMap.values()
  min = valueIterator.next().value
  max = min
  for (const entry of studyDateAndEffortsHashMap) {
    if (entry[1] < min) {
      min = entry[1]
    }
    if (entry[1] > max) {
      max = entry[1]
    }
  }
}

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
}
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
function showHeatMap(topic) {
  chartHeading.value = topic.topicName
  isHeatMapVisisble.value = true
}

let hoursSpentPerDay = 0
function displayHoursSpent(dateString) {
  hoursSpentPerDay = studyDateAndEffortsHashMap.has(dateString)
    ? studyDateAndEffortsHashMap.get(dateString)
    : 0
  const elem = document.getElementById('dayToolTip')
  elem.textContent = hoursSpentPerDay + ' hrs'
  elem.style.display = 'block'
}

function hideHoursSpent() {
  const elem = document.getElementById('dayToolTip')
  elem.style.display = 'none'
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
.heatmap-container {
  width: 1200px;
  overflow-x: auto;
}
.topicName {
  font-size: 1.5rem;
}
.days {
  padding: 0px;
  text-align: center;
}
#dayToolTip {
  display: none;
  font-size: 0.8rem;
  width: 50px;
  height: 30px;
  left: 20px;
  bottom: 50px;
  background-color: #b5dac9;
  padding: 6px 5px;
  color: #2c2c2c;
  border-radius: 5px;
}
.day {
  width: 40px;
  height: 40px;
  //border: 1px solid rgb(100, 87, 85);
  background-color: #eee;
  padding: 3px 7px;
  color: #3d3d3d;
  border-radius: 6px;
  :hover .dayToolTip {
    display: block;
  }
}
.highlight {
  background-color: #3ac282;
  color: #fff;
}
.calendarContainer {
  width: 310px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 3px 3px;
}
</style>
