import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {ItemGridLayout} from "../components/ItemGridLayout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/Undefined");
  }, []);
  return <div>Hi</div>;
}
