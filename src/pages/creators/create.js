"use client";

import dynamic from "next/dynamic";

const Root = dynamic(() => import("../../components/ProjectCreate"), { ssr: false });

// import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
// import { MetaHeader } from "~~/components/MetaHeader";
// import Inventories from "~~/components/inventories";

const Home = () => {
  return <Root />;
};

export default Home;
