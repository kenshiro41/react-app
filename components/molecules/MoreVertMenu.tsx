import React, { FC, useState } from 'react';
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import { Delete, Edit, MoreVert, Share } from '@material-ui/icons';

import { TweetData, useEditCheckLazyQuery } from '../../graphql/gen/apis';
import { MAIN_COLOR } from '../../util/theme';

import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

type Props = {
  tweet: { __typename?: 'TweetData' } & Pick<
    TweetData,
    | 'id'
    | 'tweet_name'
    | 'text'
    | 'created_at'
    | 'user_id'
    | 'user_name'
    | 'nickname'
    | 'user_img'
    | 'ImgCount'
    | 'CommentCount'
    | 'FavCount'
    | 'isFavorite'
  >;
};

const MoreVertMenu: FC<Props> = ({ tweet }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openEditModal, setopenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editCheckQuery, editCheck] = useEditCheckLazyQuery();

  const handleOpenVert = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(e.currentTarget);

    editCheckQuery({
      variables: { tweet_id: tweet.id },
    });
  };

  const MenuItems = () => (
    <>
      <Tooltip title={'Edit'}>
        <MenuItem onClick={() => setopenEditModal(true)}>
          <Edit />
        </MenuItem>
      </Tooltip>
      <Divider />
      <Tooltip title={'Delete'}>
        <MenuItem onClick={() => setOpenDeleteModal(true)}>
          <Delete />
        </MenuItem>
      </Tooltip>
    </>
  );

  return (
    <div>
      <IconButton onClick={handleOpenVert}>
        <MoreVert style={{ color: MAIN_COLOR }} />
      </IconButton>
      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <Tooltip title={'共有'}>
            <MenuItem onClick={() => console.log('FUTURE: twitter share')}>
              <Share />
            </MenuItem>
          </Tooltip>
          {editCheck.data?.editCheck.success && <MenuItems />}
          {openEditModal && (
            <EditModal
              open={openEditModal}
              onClose={() => setopenEditModal(false)}
              tweet={tweet}
            />
          )}
          {openDeleteModal && (
            <DeleteModal
              title='削除しても良いですか？'
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              tweet_id={tweet.id}
            />
          )}
        </Menu>
      )}
    </div>
  );
};

export default MoreVertMenu;
