import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'

export const useStudyTrackerStore = defineStore('studyTrackerStore', () => {
  const trackingData = ref([])
  const db = getFirestore()
  const collectionRef = collection(db, 'tracker-collection')

  //queries
  const q = query(collectionRef, orderBy('topicName', 'asc'))

  //get data initially and listen to any changes (real time data)
  function fetchTrackingData() {
    onSnapshot(q, (snapshot) => {
      trackingData.value = []
      snapshot.docs.forEach((doc) => {
        trackingData.value.push({ ...doc.data(), id: doc.id })
      })
    })
  }

  const getTrackingData = computed(() => {
    return trackingData
  })

  function addTopicForTracking(topicNameVal) {
    const topicObj = {
      topicName: topicNameVal,
      topicAddedDate: serverTimestamp(),
      totalHoursSpent: 0,
      trackingHistory: []
    }

    addDoc(collectionRef, topicObj)
      .then((response) => {})
      .catch((err) => {
        console.log(err.message)
      })
  }

  function takeSnapshotInTracking(topicTracking, trackingObj) {
    const trackingHistory = topicTracking.trackingHistory
    trackingHistory.push(trackingObj)
    const docRef = doc(db, 'tracker-collection', topicTracking.id)
    updateDoc(docRef, {
      trackingHistory: trackingHistory
    })
      .then(() => {
        updateTotalHoursSpent(topicTracking, trackingHistory)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function updateTotalHoursSpent(topicTracking, trackingHistory) {
    let totalHrsSpent = 0
    trackingHistory.forEach((trackingData) => {
      totalHrsSpent = totalHrsSpent + trackingData.halfHoursSpent
    })
    totalHrsSpent = totalHrsSpent / 2
    const docRef = doc(db, 'tracker-collection', topicTracking.id)
    updateDoc(docRef, {
      topicName: topicTracking.topicName,
      totalHoursSpent: totalHrsSpent
    }).catch((err) => {
      console.log(err.message)
    })
  }

  function deleteATracking(topicTracking) {
    const docRef = doc(db, 'tracker - collection', topicTracking.id)
    deleteDoc(docRef)
      .then(() => {
        alert('delete successful')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  return {
    trackingData,
    getTrackingData,
    fetchTrackingData,
    addTopicForTracking,
    takeSnapshotInTracking,
    deleteATracking
  }
})
