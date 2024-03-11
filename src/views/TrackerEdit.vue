<template>
  <div class="mt-4">
    <button
      type="button"
      class="btn btn-success"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      Add Topic
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <input
              class="form-control"
              type="text"
              placeholder="Enter topic name"
              v-model="newTopicName"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addTopic">
              Add Topic
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4" v-if="topicList.length > 0">
      <div v-for="(topic, index) in topicList" :key="topic.id" class="mt-3">
        <div class="row">
          <div class="col-4">
            <input
              class="form-control text-secondary"
              type="text"
              placeholder="Enter topic name"
              v-model="topic.topicName"
              aria-label="default input example"
            />
          </div>
          <div class="col-1 text-success fw-medium">{{ topic.totalHoursSpent }} hrs</div>
          <div class="col-2">
            <input
              class="form-control text-secondary"
              type="text"
              placeholder="Topics studied..."
              v-model="topicStudiedInputs[index]"
              aria-label="default input example"
            />
          </div>
          <div class="col-2">
            <input
              class="form-control"
              type="date"
              v-model="snapshotDateInputs[index]"
              aria-label="default input example"
            />
          </div>
          <div class="col-1">
            <input
              class="form-control"
              type="number"
              placeholder="0"
              v-model="halfHourInputs[index]"
              aria-label="default input example"
            />
          </div>
          <div class="col-2">
            <button
              type="button"
              class="btn btn-outline-success btn"
              @click="takeSnapshot(topic, index)"
            >
              Log Efforts
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4"><hr class="border border-success border-1 opacity-25" /></div>
      <div class="text-success fw-medium">Total {{ totalEffortHrs }} hrs of efforts</div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStudyTrackerStore } from '../stores/studyTrackerStore.js'
import { useUtility } from '@/composables/utility.js'

const studyTrackerStore = useStudyTrackerStore()
const utility = useUtility()

const newTopicName = ref('')
const topicStudiedInputs = []
const snapshotDateInputs = []
const halfHourInputs = []
const totalEffortHrs = ref(0)

onMounted(() => {
  studyTrackerStore.fetchTrackingData()
})

const topicList = computed(() => {
  return studyTrackerStore.getTrackingData.value
})

watch(topicList, (newVal) => {
  totalEffortHrs.value = 0
  newVal.forEach((topic) => {
    totalEffortHrs.value += topic.totalHoursSpent
  })
  console.log(totalEffortHrs.value)
})

function addTopic() {
  studyTrackerStore.addTopicForTracking(newTopicName.value)
  newTopicName.value = ''
}

function takeSnapshot(topic, index) {
  studyTrackerStore.takeSnapshotInTracking(topic, {
    snapshotDate: snapshotDateInputs[index]
      ? snapshotDateInputs[index]
      : new Date().toISOString().split('T')[0],
    halfHoursSpent: halfHourInputs[index],
    topicsStudied: utility.returnBlankStringIfNullOrUndefined(topicStudiedInputs[index])
  })
  snapshotDateInputs[index] = ''
  halfHourInputs[index] = 0
  topicStudiedInputs[index] = ''
}
</script>
<style scoped>
.modal-body {
  padding: 3rem 2rem;
}
</style>
