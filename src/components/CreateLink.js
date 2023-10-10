import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: { description: values.description, url: values.url },
    onCompleted: () => navigate("/"),
  });

  return (
    <div className='w-full max-w-xs mx-auto my-10'>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='description'
          >
            Description
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='description'
            type='text'
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            placeholder='A description in a Link'
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='url'
          >
            Link
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='url'
            type='text'
            value={values.url}
            onChange={(e) => setValues({ ...values, url: e.target.value })}
            placeholder='The URL for the link'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLink;
