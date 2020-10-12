import { ItemGridLayout } from "../components/ItemGridLayout";
import { useRouter } from "next/router";
import { ItemDescription } from "../components/ItemGridLayout/components/ItemDescription";
import React from "react";
import firebase from "firebase";
import firestore from "../firestore";
import ts from "typescript/lib/tsserverlibrary";

export default function ItemName(props) {
  const { asPath } = useRouter();
  const itemName = asPath.substring(1);
  return (
    <ItemGridLayout>
      <ItemDescription itemName={JSON.stringify(props.itemData, null, 2)} />
    </ItemGridLayout>
  );
}

export async function getStaticPaths() {
  //todo get item names

  console.log("app length paths", firebase.app.length);

  const itemsDocs = await firestore.collection("items").get();
  const itemIds = [] as any[];

  itemsDocs.forEach((qds) => {
    console.log(qds.id);
    itemIds.push(qds.id);
  });

  return {
    paths: itemIds.map((itemId) => ({ params: { itemName: itemId } })),
    fallback: true,
  };
}

export async function getStaticProps(props) {
  console.log("app length props", firebase.app.length);
  console.log(props);
  if (firebase.app.length === 0) {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  const item = (
    await firestore
      .collection("items")
      .doc(props.params.itemName.replace(/_/g, " "))
      .get()
  ).data();

  console.log("item is", item);

  return {
    props: {
      itemData: item,
    },
    revalidate: 10,
  };
}
