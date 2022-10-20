import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.css";
import { navLinks } from "../../utils/Header/util";
import Head from "next/head";

// CSS Imports

const Header = () => {
  const router = useRouter();

  console.log(router);

  return (
    <header>
      <Head>
        <title>NextJS</title>
      </Head>

      <h1 className={styles.title}>Usuários</h1>
      <hr />
    </header>
  );
};

export default Header;
