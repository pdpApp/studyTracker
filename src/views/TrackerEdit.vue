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
          <div class="col">
            <input
              class="form-control text-secondary"
              type="text"
              placeholder="Enter topic name"
              v-model="topic.topicName"
              aria-label="default input example"
            />
          </div>
          <div class="col-2 text-success fw-medium">{{ topic.totalHoursSpent }} hrs spent</div>
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
              class="btn btn-outline-success"
              @click="takeSnapshot(topic, index)"
            >
              Take Snapshot
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStudyTrackerStore } from '../stores/studyTrackerStore.js'

const studyTrackerStore = useStudyTrackerStore()
const newTopicName = ref('')
const snapshotDateInputs = []
const halfHourInputs = []

// const topicList1 = ref([
//   {
//     topicId: 1,
//     topicName: 'Javascript Under The hood',
//     topicAddedDate: '2024-02-25',
//     snapshotDate: '',
//     totalHoursSpent: 15,
//     logHalfHrs: 0
//   },
//   {
//     topicId: 2,
//     topicName: 'DSA Udemy course',
//     topicAddedDate: '2024-02-25',
//     snapshotDate: new Date().toISOString().split('T')[0],
//     totalHoursSpent: 15,
//     logHalfHrs: 0
//   },
//   {
//     topicId: 3,
//     topicName: 'Grokking the system design interview',
//     topicAddedDate: '2024-02-25',
//     snapshotDate: '',
//     totalHoursSpent: 15,
//     logHalfHrs: 0
//   },
//   {
//     topicId: 4,
//     topicName: 'Head First OOAD',
//     topicAddedDate: '2024-02-25',
//     snapshotDate: '',
//     totalHoursSpent: 15,
//     logHalfHrs: 0
//   }
// ])
onMounted(() => {
  studyTrackerStore.fetchTrackingData()
})

const topicList = computed(() => {
  console.log(studyTrackerStore.getTrackingData.value)
  return studyTrackerStore.getTrackingData.value
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
    halfHoursSpent: halfHourInputs[index]
  })
  snapshotDateInputs[index] = ''
  halfHourInputs[index] = 0
}
</script>
<style scoped>
.modal-body {
  padding: 3rem 2rem;
}
</style>
