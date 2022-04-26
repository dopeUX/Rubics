import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Layout from "../components/Layout";
import factory from "../Ethereum/factory";
import web3 from "../Ethereum/web3";

const Home = function(props) {
  useEffect(() => {});
  return <Layout>{console.log(props.sellers)}</Layout>;
};

Home.getInitialProps = async () => {
  const sellers = await factory.methods.getSellers().call();
  return { sellers };
};

export default Home;
