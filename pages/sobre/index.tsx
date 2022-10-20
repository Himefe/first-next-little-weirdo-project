import { Posts } from "../../types/Posts";

type DadosPlaceHolder = {
  response: object;
  data: Posts[];
};

type Props = {
  nome: string;
  dadosPlaceHolder: DadosPlaceHolder;
};

const Sobre = ({ dadosPlaceHolder }: Props) => {
  console.log(dadosPlaceHolder);
  return (
    <ul>
      {dadosPlaceHolder.data.map((item) => (
        <li data-id-post={item.id} key={item.id}>
          <a href={`/sobre/${item.id}`}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const JsonPlaceHolderFetch = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data: Posts[] = await response.json();

    return {
      response: {
        status: response.status,
        ok: response.ok,
      },
      data,
    };
  };

  const initJsonPlaceHolderFetch = await JsonPlaceHolderFetch();

  return {
    props: {
      nome: "A",
      dadosPlaceHolder: initJsonPlaceHolderFetch,
    },
    revalidate: 10,
  };
};

export default Sobre;
