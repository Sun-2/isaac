import { ItemGridLayout } from "../components/ItemGridLayout";
import { useRouter } from "next/router";
import { ItemDescription } from "../components/ItemGridLayout/components/ItemDescription";
import React from "react";

export default function ItemName(props) {
  const { asPath } = useRouter();
  const itemName = asPath.substring(1);
  return (
    <ItemGridLayout>
      <ItemDescription itemName={itemName} />
    </ItemGridLayout>
  );
}

export async function getStaticPaths() {
  //todo get item names
  return {
    paths: [{ params: { itemName: "undefined" } }],
    fallback: true,
  };
}

export async function getStaticProps({ itemName }) {
  //todo get item data
  console.log("static props");
  return {
    props: {
      asd: {},
    },
    revalidate: 10,
  };
}
