import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
        width: 100%;
        height: 100%;
        object-contain: fit;
    }
    .details {
        margin: 3rem;
        font-size: 3rem;
    }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            largeImage
        }
    }
`;

class SingleItem extends Component {
    render() {
        return (
            <Query
                query={SINGLE_ITEM_QUERY}
                variables={{
                    id: this.props.id
                }}
            >
                {({ error, loading, data }) => {
                    if (error) return <Error error={error} />;
                    if (loading) return <p>Loading...</p>;
                    if (!data.item) return <p>No Item Found for {this.props.id}</p>;

                    const item = data.item;
                    return (
                        <SingleItemStyles>
                            {/*
                                This is how you handle side effects in Next.js.
                                Meaning how you update the <head> as a child
                                from further down the chain.
                            */}
                            <Head>
                                <title>React Store | {item.title}</title>
                            </Head>
                            <img src={item.largeImage} alt={item.title} />
                            <div className="details">
                                <h2>Viewing {item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        </SingleItemStyles>
                    );
                }}
            </Query>
        );
    }
}

export default SingleItem;
