import React, { useState } from "react";
import LinkItem from "./LinkItem";
import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_FILTER_QUERY = gql`
  query searchFilter($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search = () => {
  const [searchFilter, setSearchFilter] = useState("");

  const [executeSearch, { data }] = useLazyQuery(SEARCH_FILTER_QUERY);

  return (
    <>
      <div className='container mt-24 mx-auto w-96'>
        <form>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='search'
              id='default-search'
              className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50'
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder='Search...'
              required
            />
            <button
              type='submit'
              className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2'
              onClick={(e) => {
                e.preventDefault();
                executeSearch({
                  variables: {
                    filter: searchFilter,
                  },
                });
              }}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div>
        {data && (
          <>
            {data.feed.links.map((link, index) => (
              <LinkItem key={link.id} link={link} index={index} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Search;
