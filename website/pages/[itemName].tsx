import { ItemGridLayout } from "../components/ItemGridLayout";
import { useRouter } from "next/router";
import { ItemDescription } from "../components/ItemGridLayout/components/ItemDescription";
import React from "react";
import firebase from "firebase";
import firestore from "../firestore";
import ts from "typescript/lib/tsserverlibrary";
import { GridSlot } from "../utils/GridSlot";
import { Topbar } from "../components/ItemGridLayout/components/Topbar";
import { ItemGrid } from "../components/ItemGridLayout/components/ItemGrid";
import styled from "styled-components";
import { media } from "../styles/media";
import stringHash from "string-hash";
import Head from "next/head";

export interface ItemPageProps {
  itemData: any;
}

export default function ItemPage(props: ItemPageProps) {
  return (
    <>
      <Head>
        <title>
          {props.itemData.displayName} - Isaac Item Browser - Wiki-synchronized,
          ad-free.
        </title>
      </Head>
      <ItemDescription itemData={props.itemData} />
    </>
  );
}

ItemPage.layout = ItemGridLayout;

export async function getStaticPaths() {
  const itemsDocs = await firestore.collection("items-batch").get();
  const itemIds = [] as any[];

  itemsDocs.forEach((qds) => {
    itemIds.push(...Object.keys(qds.data()));
  });

  return {
    paths: itemIds.map((itemId) => ({ params: { itemName: itemId } })),
    fallback: true,
  };
}

export async function getStaticProps(props) {
  const { itemName } = props.params;
  firestore.collection("items").doc();

  const itemData = (
    await firestore.collection("items").doc(itemName).get()
  ).data();

  return {
    props: {
      itemData,
    },
    revalidate: 3600 * 3,
  };
}
