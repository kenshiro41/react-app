import React, { FC, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { useUpdateFavoriteMutation } from '../../graphql/gen/apis';
import { token } from '../../util/common';
import Star from '../atoms/Star';

type Props = {
  isFavorite: number;
  favCount: number;
  tweet_id: number;
};

const Favorite: FC<Props> = ({ isFavorite, favCount, tweet_id }) => {
  const [isFav, setIsFav] = useState(Boolean(isFavorite));
  const [favs, setFavs] = useState(favCount);

  const [updateFavoriteMutation] = useUpdateFavoriteMutation();

  const handleFavorite = () => {
    if (token) {
      updateFavoriteMutation({
        variables: {
          input: { tweet_id, isFavorite: !isFav },
        },
      });
    }

    setIsFav(!isFav);
    isFav ? setFavs(favs - 1) : setFavs(favs + 1);
  };

  return (
    <div>
      <IconButton className='icon-button' onClick={handleFavorite}>
        <Star isFav={isFav} />
      </IconButton>
      <span style={{ cursor: 'pointer' }} onClick={() => console.log('users')}>
        {favs}
      </span>
    </div>
  );
};

export default Favorite;
