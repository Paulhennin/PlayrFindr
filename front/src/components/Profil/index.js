import React from 'react'
import PropTypes from 'prop-types'
import Ludo from 'src/containers/Ludo';
import Content from 'src/containers/Content';

import './style.scss';

export default function Profil({ user }) {
  return(
    <main className="profil">
      <Content user={user} />
      <Ludo />
    </main>
  );
}

Profil.propTypes = {
  user: PropTypes.object.isRequired,
};
