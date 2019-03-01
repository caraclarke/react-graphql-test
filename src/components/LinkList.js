import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

/**
 * A more declarative way when using React however is to use new Apollo’s render prop API to manage your GraphQL data just using components.
 * With this approach, all you need to do when it comes to data fetching is pass the GraphQL query as prop and
 * <Query /> component will fetch the data for you under the hood, then it’ll make it available in the component’s render prop function.
 * In general, the process for you to add some data fetching logic will be very similar every time:
  1. write the query as a JavaScript constant using the gql parser function
  2. use the <Query /> component passing the GraphQL query as prop
  3. access the query results that gets injected into the component’s render prop function
 */
const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
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

class LinkList extends Component {
  /**
   * First, you create the JavaScript constant called FEED_QUERY that stores the query.
   * The gql function is used to parse the plain string that contains the GraphQL code
   * Finally, you wrap the returned code with <Query /> component passing FEED_QUERY as prop.
   */
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          // https://www.apollographql.com/docs/react/essentials/queries.html#render-prop
          //  Is true as long as the request is still ongoing and the response hasn’t been received.
          if (loading) return <div>Fetching</div>;
          // error: In case the request fails, this field will contain information about what exactly went wrong.
          if (error) return <div>Error</div>;

          //  This is the actual data that was received from the server.
          // It has the links property which represents a list of Link elements.
          const linksToRender = data.feed.links;

          return (
            <div>
              {linksToRender.map((link, index) => (
                <Link key={link.id} link={link} index={index} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default LinkList;
