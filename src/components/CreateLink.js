import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      description
      url
      createdAt
    }
  }
`;

const CreateLink = () => {
  const [values, setValues] = useState({
    description: "",
    url: "",
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: { description: values.description, url: values.url },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            type='text'
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            placeholder='A description in a Link'
          />
          <input
            className='mb2'
            type='text'
            value={values.url}
            onChange={(e) => setValues({ ...values, url: e.target.value })}
            placeholder='The URL for the link'
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
