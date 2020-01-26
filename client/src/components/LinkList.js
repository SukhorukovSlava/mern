import React from 'react';
import {Link} from 'react-router-dom';

export const LinkList = ({links}) => {

  const jsxLinks = links.map((link, index) => {
    return (
      <tr key={link._id}>
        <td>{index + 1}</td>
        <td>{link.from}</td>
        <td>{link.to}</td>
        <td>{link.cnt_click}</td>
        <td>
          <Link to={`/detail/${link._id}`}>
            Open link
          </Link>
        </td>
      </tr>
    );
  });

  if (links.length === 0) {
    return <p className="center">No links yet!</p>;
  }

  return (
    <table className="highlight">
      <thead>
      <tr>
        <th>#</th>
        <th>Original link</th>
        <th>Short link</th>
        <th>Count clicks</th>
        <th>Open link</th>
      </tr>
      </thead>

      <tbody>
      {jsxLinks}
      </tbody>
    </table>
  );
};