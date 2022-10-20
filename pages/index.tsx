import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Users from "../components/Users";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { DataType } from "../types/Users";

type Props = {
  dadosFetch: DataType[];
};

const Home = ({ dadosFetch }: Props) => {
  const [nameUsernameInput, setNameUsernameInput] = React.useState<string>("");

  const filterUser2 = (): DataType[] => {
    const filteredArray = dadosFetch.filter((user) => {
      return (
        user.name.includes(nameUsernameInput) ||
        user.username.includes(nameUsernameInput)
      );
    });

    return filteredArray;
  };

  const filtedArray = filterUser2();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <label id={styles.label_pesquisar} htmlFor="pesquisa_pessoa">
          Pesquisar por nome/usuário
        </label>
        <div className={styles.inputArea}>
          <input
            id="pesquisa_pessoa"
            name="pesquisa_pessoa"
            placeholder="Digite o nome/usuário da pessoa"
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              setNameUsernameInput(target.value)
            }
          />
        </div>
        <div className={styles.gridArea_users}>
          {filtedArray.map((user) => (
            <div key={user.id} className={styles.user}>
              <div className={styles.wrapper_descs}>
                <b>Name: </b> <span>{user.name}</span>
              </div>
              <div className={styles.wrapper_descs}>
                <b>Username: </b> <span>{user.username}</span>
              </div>
              <Link href={`/${user.id}`}>
                <button className={styles.button}>Saiba mais</button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const Exception = (mensagem: string) => {
      return {
        error: mensagem,
      };
    };

    if (response.status === 500)
      throw Exception("Erro ao conectar com o server");

    const data: DataType[] = await response.json();

    return {
      props: {
        dadosFetch: data,
        error: null,
        revalidate: 300,
      },
    };
  } catch (e) {
    return {
      props: {
        dadosFetch: null,
        error: e,
        revalidate: 5,
      },
    };
  }
};

export default Home;
