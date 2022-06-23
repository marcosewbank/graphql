import { gql, useQuery } from "@apollo/client";
import { NewUserForm } from "./components/NewUserForm";

type User = {
  id: string;
  name: string;
};

export const GET_USER = gql`
  query {
    users {
      id
      name
    }
  }
`;

function App() {
  const { data, loading } = useQuery(GET_USER);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='App'>
      <NewUserForm />
      <ul>
        {data.users.map((user: User) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
