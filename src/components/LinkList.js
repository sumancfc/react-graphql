import React from "react";
import { useQuery, gql } from "@apollo/client";
import LinkItem from "./LinkItem";

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link) => (
            <LinkItem key={link.id} link={link} />
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;
