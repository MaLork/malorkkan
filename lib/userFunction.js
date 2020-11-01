import { apiEndPoint, firebase } from './constant'

async function loginUser(email, password) {
  const res = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      return 200
    })
    .catch((error) => {
      return error
    })
  return res
}

export { loginUser }
