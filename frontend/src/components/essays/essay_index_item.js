import React from 'react';
import { Link } from 'react-router-dom';

const EssayIndexItem = ({ essay }) => {
  return (
    <li>
      <Link to={ `/essays/${essay._id}` }>{ essay.theme }</Link>
    </li>
  );
}

export default EssayIndexItem;