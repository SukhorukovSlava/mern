import React from 'react';

export const LinkCard = ({link}) => {
  return (
    <>
      <h2>Link</h2>
      <p>
        Short link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
      </p>
      <p>
        Original link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
      </p>
      <p>
        Count clicks: <strong>{link.cnt_click}</strong>
      </p>
      <p>
        Date created: <strong>{new Date().toLocaleDateString(link.data)}</strong>
      </p>
    </>
  );
};