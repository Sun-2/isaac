import * as firebase from "firebase";
import "firebase/firestore";
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};


export default !firebase.apps.length
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();

if (
  typeof module !== "undefined" ||
  window.location.host.startsWith("localhost")
) {
  firebase.firestore().settings({
    host: "localhost:8080",
    ssl: false,
  });
}
