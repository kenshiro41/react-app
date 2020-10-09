import React, { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { ExpandLess, Image } from '@material-ui/icons';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Carousel,
  Image as GrommetImage,
} from 'grommet';

import { TweetData, useImageByIdLazyQuery } from '../../graphql/gen/apis';
import { MAIN_COLOR, TEXT_COLOR } from '../../util/theme';
import { parseTime } from '../../util/parseTime';
import { s3Url } from '../../util/config';

import UserIcon from './UserIcon';
import Favorite from './Favorite';
import Comment from './comment/Comment';
import MoreVertMenu from './MoreVertMenu';
import { Text } from '../atoms/Widgets';
import Readmore from '../atoms/Readmore';

const CardHeader = styled.div`
  margin: 3%;
  display: flex;
  justify-content: space-between;
`;
const FooterContent = styled.div`
  box-sizing: border-box;
`;

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

const TweetCard: FC<Props> = ({ tweet }) => {
  const [expandImage, setExpandImage] = useState(false);

  const router = useRouter();

  const [getImages, imgsRes] = useImageByIdLazyQuery();

  const handleOpenImages = () => {
    if (!expandImage) {
      getImages({
        variables: {
          tweet_id: tweet.id,
        },
      });
    }
    setExpandImage(!expandImage);
  };

  return (
    <Card
      id='tweet-card'
      style={{ boxShadow: '5px 5px 5px 5px rgb(30, 30, 30)' }}
      border
    >
      <CardHeader>
        <div
          className='tweet-card-left-content'
          onClick={() => router.push(`/user/${tweet.user_name}`)}
        >
          <UserIcon user_img={tweet.user_img} size={'40px'} />
          <div className='tweet-card-user-info'>
            <div>
              <Link href={'/user/[user]'} as={`/user/${tweet.user_name}`}>
                <a className='tweet-card-user-link'>{tweet.nickname}</a>
              </Link>
            </div>
            <time>{parseTime(tweet.created_at)}</time>
          </div>
        </div>
        <MoreVertMenu tweet={tweet} />
      </CardHeader>
      <CardBody pad='medium'>
        <Text>
          <Readmore text={tweet.text} />
        </Text>
      </CardBody>

      <CardFooter pad={{ horizontal: 'small' }}>
        <FooterContent>
          <Favorite
            isFavorite={tweet.isFavorite}
            favCount={tweet.FavCount}
            tweet_id={tweet.id}
          />
        </FooterContent>
        <FooterContent>
          <Comment
            count={tweet.CommentCount}
            user_name={tweet.user_name}
            tweet_id={tweet.id}
            user_id={tweet.user_id}
          />
        </FooterContent>
        <FooterContent>
          {tweet.ImgCount > 0 ? (
            <IconButton onClick={handleOpenImages}>
              <div>
                {expandImage ? (
                  <ExpandLess style={{ color: MAIN_COLOR }} />
                ) : (
                  <div style={{ display: 'flex', color: TEXT_COLOR }}>
                    <Image />
                    <div style={{ fontSize: '18px' }}>{tweet.ImgCount}</div>
                  </div>
                )}
              </div>
            </IconButton>
          ) : (
            <IconButton>
              <div style={{ display: 'flex', color: TEXT_COLOR }}>
                <Image />
                <div style={{ fontSize: '18px' }}>0</div>
              </div>
            </IconButton>
          )}
        </FooterContent>
      </CardFooter>
      {expandImage && imgsRes.data && (
        <Box height='medium' width='max' overflow='hidden'>
          <Carousel fill>
            {imgsRes.data.imageByID.map(({ img_url }, key) => (
              <GrommetImage key={key} fit='cover' src={s3Url + img_url} />
            ))}
          </Carousel>
        </Box>
      )}
    </Card>
  );
};

export default TweetCard;
