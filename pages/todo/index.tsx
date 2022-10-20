import { Todos } from "../../types/Todos";

type Props = {
  todo: Todos[];
};

const Todo = ({ todo }: Props) => {
  return (
    <div>
      <ul>
        {todo.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async () => {
  let response = await fetch("https://jsonplaceholder.typicode.com/todos");
  let data: Todos[] = await response.json();

  return {
    props: {
      todo: data,
    },
  };
};

export default Todo;
