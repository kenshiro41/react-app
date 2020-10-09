import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { CommentInfo } from '../../../graphql/gen/apis';
import { BG_COLOR, MAIN_COLOR, TEXT_COLOR } from '../../../util/theme';
import { parseTime } from '../../../util/parseTime';
import { Text } from '../../atoms/Widgets';
import UserIcon from '../UserIcon';
import Readmore from '../../atoms/Readmore';

const Wrapper = styled.div`
  justify-content: space-between;
  color: ${TEXT_COLOR};
  @media screen and (min-width: 700px) {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 150px 1fr;
  }
`;
const LeftContent = styled.span`
  margin: 2%;
`;
const RightContent = styled.span`
  margin: 2%;
  padding: 1%;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
`;

type Props = {
  comment: CommentInfo;
};

const CommentCard: FC<Props> = ({ comment }) => {
  const router = useRouter();

  return (
    <Paper
      style={{
        backgroundColor: BG_COLOR,
        maxWidth: '700px',
        boxShadow: '10px 10px 10px 10px rgba(30, 30, 30, 0.5)',
      }}
    >
      <Wrapper>
        <LeftContent>
          <div>
            <UserIcon
              onClick={() => router.push(`/user/${comment.user_name}`)}
              user_img={comment.user_img}
              size={'30px'}
            />
          </div>
          <div>
            <div>
              <Link href={'/user/[user]'} as={`/user/${comment.user_name}`}>
                <a style={{ color: MAIN_COLOR }}>{comment.nickname}</a>
              </Link>
            </div>
            <span>{parseTime(comment.created_at)}</span>
          </div>
        </LeftContent>
        <RightContent>
          <Text>
            <Readmore text={comment.comment} />
          </Text>
        </RightContent>
      </Wrapper>
    </Paper>
  );
};

export default CommentCard;
