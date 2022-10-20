import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { DataType } from "../types/Users";
import styles from "../styles/Home.module.css";

type Props = {
  dadosFetch: DataType;
};

const User = ({ dadosFetch }: Props) => {
  const router = useRouter();

  if (router.pathname !== "/[id]") {
    return;
  }

  const user = dadosFetch;

  type LiteralType = {
    label: string;
    key: string;
  };

  const objLiteralArray: LiteralType[] = [
    {
      label: "Usuário",
      key: "username",
    },
    {
      label: "Nome",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Telefone",
      key: "phone",
    },
    {
      label: "Site",
      key: "website",
    },
    {
      label: "Empresa",
      key: "company",
    },
  ];

  if (!dadosFetch) return;

  return (
    <main className={styles.container_user}>
      <b className={styles.info_user}>Informações do Usuário:</b>
      <div className={styles.content_user}>
        <ul>
          {/* {objLiteralArray.map((item: LiteralType, index: number) => (
            <li key={index}>
              <div>
                <b>{item.label}:</b>
                <p>{dadosFetch[item.key]}</p>
              </div>
            </li>
          ))} */}
          <li>
            <span>
              <b>Usuário:</b> {user?.username}
            </span>
          </li>
          <li>
            <span>
              <b>Nome:</b> {user?.name}
            </span>
          </li>
          <li>
            <span>
              <b>Email:</b> {user?.email}
            </span>
          </li>
          <li>
            <span>
              <b>Telefone:</b> {user?.phone}
            </span>
          </li>
          <li>
            <span>
              <b>Site:</b> {user?.website}
            </span>
          </li>
          <li>
            <span>
              <b>Empresa:</b> {user?.company?.name}
            </span>
          </li>
        </ul>
      </div>
    </main>
  );
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IParams;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const Exception = (mensagem: string) => {
      return {
        error: mensagem,
      };
    };

    if (response.status === 500)
      throw Exception("Erro ao conectar com o server");
    const data: DataType = await response.json();

    return {
      props: {
        dadosFetch: data,
        error: null,
        fallback: true,
      },
    };
  } catch (e) {
    return {
      props: {
        dadosFetch: null,
        error: e,
      },
    };
  }
};

export default User;
