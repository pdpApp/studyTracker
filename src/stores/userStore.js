import { defineStore } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('userStore', () => {
  const router = useRouter()
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyAob8UnkeDAbsYRpRVtsyzApqub28k0DCA',
    authDomain: 'study-tracker-6a580.firebaseapp.com',
    projectId: 'study-tracker-6a580',
    storageBucket: 'study-tracker-6a580.appspot.com',
    messagingSenderId: '648258497576',
    appId: '1:648258497576:web:66e6647f9394191d30991d'
  }

  // Initialize Firebase
  initializeApp(firebaseConfig)

  const auth = getAuth()
  const isAuthenticated = ref(false)

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password).then((cred) => {
      console.log('user logged in: ' + cred.user)
      router.push('/edit')
    })
  }

  function logout() {
    signOut(auth)
      .then(() => {
        console.log('user logged out')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  onAuthStateChanged(auth, (user) => {
    console.log('login status changed:', user)
    if (user === null) {
      isAuthenticated.value = false
    } else {
      isAuthenticated.value = true
    }
  })

  const getIsAuthenticated = computed(() => {
    return isAuthenticated.value
  })

  return { isAuthenticated, getIsAuthenticated, login, logout }
})
