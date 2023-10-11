import React from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";
import { FEED_QUERY } from "./LinkList";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const LinkItem = (props) => {
  const { link, index } = props;

  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data: { vote } }) => {
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
      });

      const updatedLinks = feed.links.map((feedLink) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
      });
    },
  });

  return (
    <div className='container mx-auto'>
      <ul>
        <li className='w-full border-b-2 border-neutral-100 border-opacity-100 py-4'>
          <div className='flex'>
            {props && <span className='gray'>{index + 1}.</span>}
            {authToken && (
              <div
                className='pr-3'
                style={{ cursor: "pointer" }}
                onClick={vote}
              >
                ▲
              </div>
            )}

            {link.description}
            <Link
              to={`${link.url}`}
              className='text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600'
            >
              {link.url}
            </Link>
          </div>

          <div>
            {
              <div>
                {link.votes.length} votes | by{" "}
                {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
                {timeDifferenceForDate(link.createdAt)}
              </div>
            }
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LinkItem;
