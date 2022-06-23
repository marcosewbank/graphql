import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { GET_USER } from "../App";
import { client } from "../lib/apollo";

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export const NewUserForm = () => {
  const [name, setName] = useState("");
  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = async (event: FormEvent) => {
    event.preventDefault();

    if (!name) return;

    // Make a new query after createUser is finished.

    // await createUser({
    //   variables: { name: name },
    //   refetchQueries: [GET_USER],
    // });

    // AWESOME TIP
    // Manipulate the cache after createUser is finished to update the GET_USER response.

    await createUser({
      variables: { name: name },
      update: (cache, { data: { createUser } }) => {
        const { users } = client.readQuery({ query: GET_USER });

        cache.writeQuery({
          query: GET_USER,
          data: {
            users: [...users, createUser],
          },
        });
      },
    });
  };

  return (
    <form onSubmit={handleCreateUser}>
      <input
        type='text'
        name='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type='submit'>send</button>
    </form>
  );
};
