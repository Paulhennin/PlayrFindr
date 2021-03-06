import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FindGoodGameByName, FindGoodGame } from 'src/selectors/find';
import Flash from 'src/components/Flash';
import './style.scss';

export default function Ludo({
  game,
  games,
  deleteGameFromLib,
  message,
  isOk,
  showMessage,
  setShowMessage,
  onChangeInputValue,
  search,
  paramsId,
  idCurrent,
}) {
  const [currentUser, setCurrentUser] = useState(false);
  const [profilGames, setProfilGames] = useState([]);

  const handleOnClick = (event) => {
    const gameName = FindGoodGame(games, event.target.id);
    deleteGameFromLib(event.target.id, gameName.label);
  };

  const filterGames = () => {
    if (game) {
      const filteredGames = game.filter((game) => {
        const loweredGameLabel = game.toLowerCase();
        const loweredSearch = search.toLowerCase();

        return loweredGameLabel.includes(loweredSearch);
      });

      return filteredGames;
    }
  };
  useEffect(() => {
    if (idCurrent === paramsId) {
      setCurrentUser(true);
    }
    else {
      setCurrentUser(false);
    }
  }, [paramsId]);

  const filters = filterGames();
  useEffect(() => {
    setProfilGames([]);
    if (game) {
      const gameList = filters.map((obj) => {
        const oneGame = FindGoodGameByName(games, obj);

        const path = `/jeu/${oneGame.id}`;
        return (
          <div className="profil__ludo__games__content" key={oneGame.id}>
            <Link to={path}>
              <img className="profil__ludo__games__pic" src={oneGame.picture} alt="Game" />
            </Link>
            <div className="profil__ludo__games__name">
              <button type="button" id={oneGame.id} onClick={handleOnClick} className="profil__delete-btn">
                {currentUser && <FontAwesomeIcon className="profil__delete no-pointer" icon={faTimes} />}
              </button>
              <p className="profil__ludo__games__name-title">{oneGame.label}</p>
            </div>
          </div>
        );
      });
      setProfilGames(gameList);
    }
  }, [game, search, paramsId]);

  const handleOnChange = (event) => {
    onChangeInputValue(event.target.value);
  };

  return (
    <>
      <Flash
        message={message}
        isOk={isOk}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
      <div className="profil__section2">
        <div className="profil__ludo__title">
          <h3 className="profil__ludo__title__content">Jeux dans sa ludoth??que</h3>
          <input 
            type="text" 
            className="profil__ludo__title__search" 
            placeholder="rechercher..."
            value={search}
            onChange={handleOnChange}
          />
        </div>
        <div className="profil__ludo__games">
          {profilGames}
        </div>
      </div>
    </>
  );
}

Ludo.propTypes = {
  game: PropTypes.object.isRequired,
  games: PropTypes.object.isRequired,
  deleteGameFromLib: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  isOk: PropTypes.bool.isRequired,
  showMessage: PropTypes.bool.isRequired,
  setShowMessage: PropTypes.func.isRequired,
};
