import React from "react";
import { Link } from "react-router-dom";

const LinkItem = (props) => {
  const { link } = props;
  return (
    <ul className='w-full'>
      <li className='w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50'>
        {link.description}
        <Link
          to={`${link.url}`}
          className='text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600'
        >
          {link.url}
        </Link>
      </li>
    </ul>
  );
};

export default LinkItem;
