import React from 'react';

//Component to handle and contain search results

export default function SearchResults(props) {
    {/* If there are search results, display them. else, display a message indicating that no results were found. */}
    if (props.searchResults.length > 0) {
        return (
            <div>
                {props.searchResults.map((result, index) => (
                    <p key={index}>
                        {result.Title} : {result.Year}
                    </p>
                ))}
            </div>
        );
    } else {
        return <p>No results found. Try a different search term!</p>;
    }
}