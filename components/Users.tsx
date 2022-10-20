import React from "react";

type DataType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const Users = () => {
  const [dadosFetch, setDadosFetch] = React.useState<[] | DataType[]>([]);

  React.useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      const data: DataType[] = await response.json();

      setDadosFetch(data);
    };

    fetcher();
  }, []);

  return (
    <ul>
      {dadosFetch?.map((item) => (
        <li key={item.id}>{item.username}</li>
      ))}
    </ul>
  );
};

export default Users;
