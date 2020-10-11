import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import { ItemDescription } from "../components/ItemDescription";
import React from "react";

export default function Id(props) {
  const { asPath } = useRouter();
  const itemName = asPath.substring(1);
  return <ItemDescription itemName={itemName} />;
}

Id.layout = Layout;
