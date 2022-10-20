import React from "react";
import { GetStaticProps } from "next";

import { useRouter } from "next/router";
import { Posts } from "../../types/Posts";
import { ParsedUrlQuery } from "querystring";

type Props = {
  post: Posts;
};

const UserName = ({ post }: Props) => {
  const router = useRouter();

  console.log(post);
  return <div>Olá {post.id}</div>;
};

export const getStaticPaths = async () => {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let data: Posts[] = await response.json();

  const paths = data.map((item) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;

  let response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  let data: Posts[] = await response.json();

  return {
    props: {
      post: data,
    },
  };
};

export default UserName;
