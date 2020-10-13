import admin from "firebase-admin";
import * as fs from "fs";
import { serviceKeyPath } from "../const";

const key = JSON.parse(fs.readFileSync(serviceKeyPath, { encoding: "utf8" }));

const app = admin.initializeApp({
  credential: admin.credential.cert(key),
  databaseURL: "https://isaac-item-browser.firebaseio.com",
});

export const firestore = app.firestore();
