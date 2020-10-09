import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  user_name: Scalars['String'];
  nickname: Scalars['String'];
  password: Scalars['String'];
  user_img?: Maybe<Scalars['String']>;
  created_at: Scalars['Time'];
  updated_at?: Maybe<Scalars['Time']>;
  deleted_at?: Maybe<Scalars['Time']>;
};

export type Tweet = {
  __typename?: 'Tweet';
  id: Scalars['Int'];
  tweet_name: Scalars['String'];
  text: Scalars['String'];
  user_id: Scalars['Int'];
  created_at: Scalars['Time'];
  updated_at?: Maybe<Scalars['Time']>;
  deleted_at?: Maybe<Scalars['Time']>;
};

export type Follow = {
  __typename?: 'Follow';
  following_id: Scalars['Int'];
  followed_id: Scalars['Int'];
  created_at: Scalars['Time'];
  deleted_at?: Maybe<Scalars['Time']>;
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String'];
  tweet_id: Scalars['Int'];
  user_id: Scalars['Int'];
  created_at: Scalars['Time'];
  updated_at?: Maybe<Scalars['Time']>;
};

export type Favorite = {
  __typename?: 'Favorite';
  tweet_id: Scalars['Int'];
  user_id: Scalars['Int'];
  created_at: Scalars['Time'];
};

export type Img = {
  __typename?: 'Img';
  img_url: Scalars['String'];
  tweet_id: Scalars['Int'];
  created_at: Scalars['Time'];
  updated_at?: Maybe<Scalars['Time']>;
  deleted_at?: Maybe<Scalars['Time']>;
};

export type TweetData = {
  __typename?: 'TweetData';
  id: Scalars['Int'];
  tweet_name: Scalars['String'];
  text: Scalars['String'];
  created_at: Scalars['Time'];
  updated_at?: Maybe<Scalars['Time']>;
  user_id: Scalars['Int'];
  user_name: Scalars['String'];
  nickname: Scalars['String'];
  user_img?: Maybe<Scalars['String']>;
  ImgCount: Scalars['Int'];
  CommentCount: Scalars['Int'];
  FavCount: Scalars['Int'];
  isFavorite: Scalars['Int'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
  iat: Scalars['Int'];
  exp: Scalars['Int'];
  user: User;
};

export type Message = {
  __typename?: 'Message';
  success: Scalars['Boolean'];
};

export type FollowCounts = {
  __typename?: 'FollowCounts';
  followings: Scalars['Int'];
  followers: Scalars['Int'];
};

export type FollowingInfo = {
  __typename?: 'followingInfo';
  isFollowing: Scalars['Int'];
  following: Array<User>;
  followed: Array<User>;
};

export type CommentInfo = {
  __typename?: 'CommentInfo';
  comment: Scalars['String'];
  tweet_id: Scalars['Int'];
  user_id: Scalars['Int'];
  user_name: Scalars['String'];
  nickname: Scalars['String'];
  user_img?: Maybe<Scalars['String']>;
  created_at: Scalars['Time'];
};

export type NewTweet = {
  text: Scalars['String'];
  imgs: Array<Scalars['String']>;
};

export type UpdateTweet = {
  text: Scalars['String'];
  tweet_id: Scalars['Int'];
};

export type AddComment = {
  tweet_id: Scalars['Int'];
  comment: Scalars['String'];
};

export type UpdateFavorite = {
  tweet_id: Scalars['Int'];
  isFavorite: Scalars['Boolean'];
};

export type UpdateFollow = {
  followed_id: Scalars['Int'];
  folowStatus: Scalars['Boolean'];
};

export type UpdateProfile = {
  user_name: Scalars['String'];
  nickname: Scalars['String'];
  img: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: Message;
  login: Token;
  createTweet: TweetData;
  updateTweet: TweetData;
  deleteTweet: Message;
  addComment: Comment;
  updateFavorite: Message;
  updateProfile: Token;
  followUser: Message;
};


export type MutationSignupArgs = {
  user_name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  user_name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateTweetArgs = {
  input: NewTweet;
};


export type MutationUpdateTweetArgs = {
  input: UpdateTweet;
};


export type MutationDeleteTweetArgs = {
  tweet_id: Scalars['Int'];
};


export type MutationAddCommentArgs = {
  input: AddComment;
};


export type MutationUpdateFavoriteArgs = {
  input: UpdateFavorite;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfile;
};


export type MutationFollowUserArgs = {
  input: UpdateFollow;
};

export type Query = {
  __typename?: 'Query';
  tweets: Array<TweetData>;
  tweetByID: TweetData;
  searchText: Array<TweetData>;
  imageByID: Array<Img>;
  comments: Array<CommentInfo>;
  tokenCheck: Message;
  editCheck: Message;
  userInfo: User;
  tweetByUser: Array<TweetData>;
  followCount: FollowCounts;
  followInfo: FollowingInfo;
};


export type QueryTweetsArgs = {
  token?: Maybe<Scalars['String']>;
  current: Scalars['Int'];
};


export type QueryTweetByIdArgs = {
  tweet_id: Scalars['Int'];
};


export type QuerySearchTextArgs = {
  text: Scalars['String'];
  current: Scalars['Int'];
};


export type QueryImageByIdArgs = {
  tweet_id: Scalars['Int'];
};


export type QueryCommentsArgs = {
  tweet_id: Scalars['Int'];
};


export type QueryTokenCheckArgs = {
  user_name: Scalars['String'];
};


export type QueryEditCheckArgs = {
  tweet_id: Scalars['Int'];
};


export type QueryUserInfoArgs = {
  user_name: Scalars['String'];
};


export type QueryTweetByUserArgs = {
  user_name: Scalars['String'];
  current: Scalars['Int'];
};


export type QueryFollowCountArgs = {
  user_id: Scalars['Int'];
};


export type QueryFollowInfoArgs = {
  user_name: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  addTweetChannel: TweetData;
};

export type AddCommentMutationVariables = Exact<{
  input: AddComment;
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & { addComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'comment' | 'tweet_id' | 'user_id' | 'created_at'>
  ) }
);

export type DeleteTweetMutationVariables = Exact<{
  tweet_id: Scalars['Int'];
}>;


export type DeleteTweetMutation = (
  { __typename?: 'Mutation' }
  & { deleteTweet: (
    { __typename?: 'Message' }
    & Pick<Message, 'success'>
  ) }
);

export type FollowUserMutationVariables = Exact<{
  input: UpdateFollow;
}>;


export type FollowUserMutation = (
  { __typename?: 'Mutation' }
  & { followUser: (
    { __typename?: 'Message' }
    & Pick<Message, 'success'>
  ) }
);

export type LoginMutationVariables = Exact<{
  user_name: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Token' }
    & Pick<Token, 'token' | 'iat' | 'exp'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'user_name' | 'nickname'>
    ) }
  ) }
);

export type CreateTweetMutationVariables = Exact<{
  newTweet: NewTweet;
}>;


export type CreateTweetMutation = (
  { __typename?: 'Mutation' }
  & { createTweet: (
    { __typename?: 'TweetData' }
    & Pick<TweetData, 'id' | 'tweet_name' | 'text' | 'created_at' | 'user_id' | 'user_name' | 'nickname' | 'user_img' | 'ImgCount' | 'CommentCount' | 'FavCount' | 'isFavorite'>
  ) }
);

export type SignupMutationVariables = Exact<{
  user_name: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'Message' }
    & Pick<Message, 'success'>
  ) }
);

export type UpdateFavoriteMutationVariables = Exact<{
  input: UpdateFavorite;
}>;


export type UpdateFavoriteMutation = (
  { __typename?: 'Mutation' }
  & { updateFavorite: (
    { __typename?: 'Message' }
    & Pick<Message, 'success'>
  ) }
);

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfile;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile: (
    { __typename?: 'Token' }
    & Pick<Token, 'token' | 'iat' | 'exp'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'user_name' | 'nickname'>
    ) }
  ) }
);

export type UpdateTweetMutationVariables = Exact<{
  input: UpdateTweet;
}>;


export type UpdateTweetMutation = (
  { __typename?: 'Mutation' }
  & { updateTweet: (
    { __typename?: 'TweetData' }
    & Pick<TweetData, 'id' | 'tweet_name' | 'text' | 'created_at' | 'user_id' | 'user_name' | 'nickname' | 'user_img' | 'ImgCount' | 'CommentCount' | 'FavCount' | 'isFavorite'>
  ) }
);

export type TweetsQueryVariables = Exact<{
  current: Scalars['Int'];
}>;


export type TweetsQuery = (
  { __typename?: 'Query' }
  & { tweets: Array<(
    { __typename?: 'TweetData' }
    & Pick<TweetData, 'id' | 'tweet_name' | 'text' | 'created_at' | 'user_id' | 'user_name' | 'nickname' | 'user_img' | 'ImgCount' | 'CommentCount' | 'FavCount' | 'isFavorite'>
  )> }
);

export type CommentsQueryVariables = Exact<{
  tweet_id: Scalars['Int'];
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename?: 'CommentInfo' }
    & Pick<CommentInfo, 'comment' | 'tweet_id' | 'user_id' | 'user_name' | 'nickname' | 'user_img' | 'created_at'>
  )> }
);

export type EditCheckQueryVariables = Exact<{
  tweet_id: Scalars['Int'];
}>;


export type EditCheckQuery = (
  { __typename?: 'Query' }
  & { editCheck: (
    { __typename?: 'Message' }
    & Pick<Message, 'success'>
  ) }
);

export type FollowCountQueryVariables = Exact<{
  user_id: Scalars['Int'];
}>;


export type FollowCountQuery = (
  { __typename?: 'Query' }
  & { followCount: (
    { __typename?: 'FollowCounts' }
    & Pick<FollowCounts, 'followings' | 'followers'>
  ) }
);

export type FollowInfoQueryVariables = Exact<{
  user_name: Scalars['String'];
}>;


export type FollowInfoQuery = (
  { __typename?: 'Query' }
  & { followInfo: (
    { __typename?: 'followingInfo' }
    & Pick<FollowingInfo, 'isFollowing'>
    & { following: Array<(
      { __typename?: 'User' }
      & Pick<User, 'user_name' | 'nickname' | 'user_img'>
    )>, followed: Array<(
      { __typename?: 'User' }
      & Pick<User, 'user_name' | 'nickname' | 'user_img'>
    )> }
  ) }
);

export type ImageByIdQueryVariables = Exact<{
  tweet_id: Scalars['Int'];
}>;


export type ImageByIdQuery = (
  { __typename?: 'Query' }
  & { imageByID: Array<(
    { __typename?: 'Img' }
    & Pick<Img, 'img_url'>
  )> }
);

export type SearchTextQueryVariables = Exact<{
  text: Scalars['String'];
  current: Scalars['Int'];
}>;


export type SearchTextQuery = (
  { __typename?: 'Query' }
  & { tweets: Array<(
    { __typename?: 'TweetData' }
    & Pick<TweetData, 'id' | 'tweet_name' | 'text' | 'created_at' | 'user_id' | 'user_name' | 'nickname' | 'user_img' | 'ImgCount' | 'CommentCount' | 'FavCount' | 'isFavorite'>
  )> }
);

export type TokenCheckQueryVariables = Exact<{
  user_name: Scalars['String'];
}>;


export type TokenCheckQuery = (
  { __typename?: 'Query' }
  & { tokenCheck: (
    { __typename?: 'Message' }
    & Pick<Message, 'success'>
  ) }
);

export type TweetByUserQueryVariables = Exact<{
  user_name: Scalars['String'];
  current: Scalars['Int'];
}>;


export type TweetByUserQuery = (
  { __typename?: 'Query' }
  & { tweets: Array<(
    { __typename?: 'TweetData' }
    & Pick<TweetData, 'id' | 'tweet_name' | 'text' | 'created_at' | 'user_id' | 'user_name' | 'nickname' | 'user_img' | 'ImgCount' | 'CommentCount' | 'FavCount' | 'isFavorite'>
  )> }
);

export type UserInfoQueryVariables = Exact<{
  user_name: Scalars['String'];
}>;


export type UserInfoQuery = (
  { __typename?: 'Query' }
  & { userInfo: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'user_name' | 'nickname' | 'user_img' | 'created_at' | 'updated_at'>
  ) }
);

export type AddTweetChannelSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AddTweetChannelSubscription = (
  { __typename?: 'Subscription' }
  & { tweets: (
    { __typename?: 'TweetData' }
    & Pick<TweetData, 'id' | 'tweet_name' | 'text' | 'created_at' | 'user_id' | 'user_name' | 'nickname' | 'user_img' | 'ImgCount' | 'CommentCount' | 'FavCount' | 'isFavorite'>
  ) }
);


export const AddCommentDocument = gql`
    mutation addComment($input: addComment!) {
  addComment(input: $input) {
    comment
    tweet_id
    user_id
    created_at
  }
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const DeleteTweetDocument = gql`
    mutation deleteTweet($tweet_id: Int!) {
  deleteTweet(tweet_id: $tweet_id) {
    success
  }
}
    `;
export type DeleteTweetMutationFn = Apollo.MutationFunction<DeleteTweetMutation, DeleteTweetMutationVariables>;

/**
 * __useDeleteTweetMutation__
 *
 * To run a mutation, you first call `useDeleteTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTweetMutation, { data, loading, error }] = useDeleteTweetMutation({
 *   variables: {
 *      tweet_id: // value for 'tweet_id'
 *   },
 * });
 */
export function useDeleteTweetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTweetMutation, DeleteTweetMutationVariables>) {
        return Apollo.useMutation<DeleteTweetMutation, DeleteTweetMutationVariables>(DeleteTweetDocument, baseOptions);
      }
export type DeleteTweetMutationHookResult = ReturnType<typeof useDeleteTweetMutation>;
export type DeleteTweetMutationResult = Apollo.MutationResult<DeleteTweetMutation>;
export type DeleteTweetMutationOptions = Apollo.BaseMutationOptions<DeleteTweetMutation, DeleteTweetMutationVariables>;
export const FollowUserDocument = gql`
    mutation followUser($input: updateFollow!) {
  followUser(input: $input) {
    success
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, baseOptions);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const LoginDocument = gql`
    mutation login($user_name: String!, $password: String!) {
  login(user_name: $user_name, password: $password) {
    token
    iat
    exp
    user {
      id
      user_name
      nickname
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      user_name: // value for 'user_name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateTweetDocument = gql`
    mutation createTweet($newTweet: newTweet!) {
  createTweet(input: $newTweet) {
    id
    tweet_name
    text
    created_at
    user_id
    user_name
    nickname
    user_img
    ImgCount
    CommentCount
    FavCount
    isFavorite
  }
}
    `;
export type CreateTweetMutationFn = Apollo.MutationFunction<CreateTweetMutation, CreateTweetMutationVariables>;

/**
 * __useCreateTweetMutation__
 *
 * To run a mutation, you first call `useCreateTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTweetMutation, { data, loading, error }] = useCreateTweetMutation({
 *   variables: {
 *      newTweet: // value for 'newTweet'
 *   },
 * });
 */
export function useCreateTweetMutation(baseOptions?: Apollo.MutationHookOptions<CreateTweetMutation, CreateTweetMutationVariables>) {
        return Apollo.useMutation<CreateTweetMutation, CreateTweetMutationVariables>(CreateTweetDocument, baseOptions);
      }
export type CreateTweetMutationHookResult = ReturnType<typeof useCreateTweetMutation>;
export type CreateTweetMutationResult = Apollo.MutationResult<CreateTweetMutation>;
export type CreateTweetMutationOptions = Apollo.BaseMutationOptions<CreateTweetMutation, CreateTweetMutationVariables>;
export const SignupDocument = gql`
    mutation signup($user_name: String!, $password: String!) {
  signup(user_name: $user_name, password: $password) {
    success
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      user_name: // value for 'user_name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateFavoriteDocument = gql`
    mutation updateFavorite($input: updateFavorite!) {
  updateFavorite(input: $input) {
    success
  }
}
    `;
export type UpdateFavoriteMutationFn = Apollo.MutationFunction<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>;

/**
 * __useUpdateFavoriteMutation__
 *
 * To run a mutation, you first call `useUpdateFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFavoriteMutation, { data, loading, error }] = useUpdateFavoriteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>) {
        return Apollo.useMutation<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>(UpdateFavoriteDocument, baseOptions);
      }
export type UpdateFavoriteMutationHookResult = ReturnType<typeof useUpdateFavoriteMutation>;
export type UpdateFavoriteMutationResult = Apollo.MutationResult<UpdateFavoriteMutation>;
export type UpdateFavoriteMutationOptions = Apollo.BaseMutationOptions<UpdateFavoriteMutation, UpdateFavoriteMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($input: updateProfile!) {
  updateProfile(input: $input) {
    token
    iat
    exp
    user {
      id
      user_name
      nickname
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateTweetDocument = gql`
    mutation updateTweet($input: updateTweet!) {
  updateTweet(input: $input) {
    id
    tweet_name
    text
    created_at
    user_id
    user_name
    nickname
    user_img
    ImgCount
    CommentCount
    FavCount
    isFavorite
  }
}
    `;
export type UpdateTweetMutationFn = Apollo.MutationFunction<UpdateTweetMutation, UpdateTweetMutationVariables>;

/**
 * __useUpdateTweetMutation__
 *
 * To run a mutation, you first call `useUpdateTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTweetMutation, { data, loading, error }] = useUpdateTweetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTweetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTweetMutation, UpdateTweetMutationVariables>) {
        return Apollo.useMutation<UpdateTweetMutation, UpdateTweetMutationVariables>(UpdateTweetDocument, baseOptions);
      }
export type UpdateTweetMutationHookResult = ReturnType<typeof useUpdateTweetMutation>;
export type UpdateTweetMutationResult = Apollo.MutationResult<UpdateTweetMutation>;
export type UpdateTweetMutationOptions = Apollo.BaseMutationOptions<UpdateTweetMutation, UpdateTweetMutationVariables>;
export const TweetsDocument = gql`
    query tweets($current: Int!) {
  tweets(current: $current) {
    id
    tweet_name
    text
    created_at
    user_id
    user_name
    nickname
    user_img
    ImgCount
    CommentCount
    FavCount
    isFavorite
  }
}
    `;

/**
 * __useTweetsQuery__
 *
 * To run a query within a React component, call `useTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTweetsQuery({
 *   variables: {
 *      current: // value for 'current'
 *   },
 * });
 */
export function useTweetsQuery(baseOptions?: Apollo.QueryHookOptions<TweetsQuery, TweetsQueryVariables>) {
        return Apollo.useQuery<TweetsQuery, TweetsQueryVariables>(TweetsDocument, baseOptions);
      }
export function useTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TweetsQuery, TweetsQueryVariables>) {
          return Apollo.useLazyQuery<TweetsQuery, TweetsQueryVariables>(TweetsDocument, baseOptions);
        }
export type TweetsQueryHookResult = ReturnType<typeof useTweetsQuery>;
export type TweetsLazyQueryHookResult = ReturnType<typeof useTweetsLazyQuery>;
export type TweetsQueryResult = Apollo.QueryResult<TweetsQuery, TweetsQueryVariables>;
export const CommentsDocument = gql`
    query comments($tweet_id: Int!) {
  comments(tweet_id: $tweet_id) {
    comment
    tweet_id
    user_id
    user_name
    nickname
    user_img
    created_at
  }
}
    `;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      tweet_id: // value for 'tweet_id'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions?: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const EditCheckDocument = gql`
    query editCheck($tweet_id: Int!) {
  editCheck(tweet_id: $tweet_id) {
    success
  }
}
    `;

/**
 * __useEditCheckQuery__
 *
 * To run a query within a React component, call `useEditCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditCheckQuery({
 *   variables: {
 *      tweet_id: // value for 'tweet_id'
 *   },
 * });
 */
export function useEditCheckQuery(baseOptions?: Apollo.QueryHookOptions<EditCheckQuery, EditCheckQueryVariables>) {
        return Apollo.useQuery<EditCheckQuery, EditCheckQueryVariables>(EditCheckDocument, baseOptions);
      }
export function useEditCheckLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditCheckQuery, EditCheckQueryVariables>) {
          return Apollo.useLazyQuery<EditCheckQuery, EditCheckQueryVariables>(EditCheckDocument, baseOptions);
        }
export type EditCheckQueryHookResult = ReturnType<typeof useEditCheckQuery>;
export type EditCheckLazyQueryHookResult = ReturnType<typeof useEditCheckLazyQuery>;
export type EditCheckQueryResult = Apollo.QueryResult<EditCheckQuery, EditCheckQueryVariables>;
export const FollowCountDocument = gql`
    query followCount($user_id: Int!) {
  followCount(user_id: $user_id) {
    followings
    followers
  }
}
    `;

/**
 * __useFollowCountQuery__
 *
 * To run a query within a React component, call `useFollowCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowCountQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useFollowCountQuery(baseOptions?: Apollo.QueryHookOptions<FollowCountQuery, FollowCountQueryVariables>) {
        return Apollo.useQuery<FollowCountQuery, FollowCountQueryVariables>(FollowCountDocument, baseOptions);
      }
export function useFollowCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowCountQuery, FollowCountQueryVariables>) {
          return Apollo.useLazyQuery<FollowCountQuery, FollowCountQueryVariables>(FollowCountDocument, baseOptions);
        }
export type FollowCountQueryHookResult = ReturnType<typeof useFollowCountQuery>;
export type FollowCountLazyQueryHookResult = ReturnType<typeof useFollowCountLazyQuery>;
export type FollowCountQueryResult = Apollo.QueryResult<FollowCountQuery, FollowCountQueryVariables>;
export const FollowInfoDocument = gql`
    query followInfo($user_name: String!) {
  followInfo(user_name: $user_name) {
    isFollowing
    following {
      user_name
      nickname
      user_img
    }
    followed {
      user_name
      nickname
      user_img
    }
  }
}
    `;

/**
 * __useFollowInfoQuery__
 *
 * To run a query within a React component, call `useFollowInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowInfoQuery({
 *   variables: {
 *      user_name: // value for 'user_name'
 *   },
 * });
 */
export function useFollowInfoQuery(baseOptions?: Apollo.QueryHookOptions<FollowInfoQuery, FollowInfoQueryVariables>) {
        return Apollo.useQuery<FollowInfoQuery, FollowInfoQueryVariables>(FollowInfoDocument, baseOptions);
      }
export function useFollowInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowInfoQuery, FollowInfoQueryVariables>) {
          return Apollo.useLazyQuery<FollowInfoQuery, FollowInfoQueryVariables>(FollowInfoDocument, baseOptions);
        }
export type FollowInfoQueryHookResult = ReturnType<typeof useFollowInfoQuery>;
export type FollowInfoLazyQueryHookResult = ReturnType<typeof useFollowInfoLazyQuery>;
export type FollowInfoQueryResult = Apollo.QueryResult<FollowInfoQuery, FollowInfoQueryVariables>;
export const ImageByIdDocument = gql`
    query imageByID($tweet_id: Int!) {
  imageByID(tweet_id: $tweet_id) {
    img_url
  }
}
    `;

/**
 * __useImageByIdQuery__
 *
 * To run a query within a React component, call `useImageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageByIdQuery({
 *   variables: {
 *      tweet_id: // value for 'tweet_id'
 *   },
 * });
 */
export function useImageByIdQuery(baseOptions?: Apollo.QueryHookOptions<ImageByIdQuery, ImageByIdQueryVariables>) {
        return Apollo.useQuery<ImageByIdQuery, ImageByIdQueryVariables>(ImageByIdDocument, baseOptions);
      }
export function useImageByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageByIdQuery, ImageByIdQueryVariables>) {
          return Apollo.useLazyQuery<ImageByIdQuery, ImageByIdQueryVariables>(ImageByIdDocument, baseOptions);
        }
export type ImageByIdQueryHookResult = ReturnType<typeof useImageByIdQuery>;
export type ImageByIdLazyQueryHookResult = ReturnType<typeof useImageByIdLazyQuery>;
export type ImageByIdQueryResult = Apollo.QueryResult<ImageByIdQuery, ImageByIdQueryVariables>;
export const SearchTextDocument = gql`
    query searchText($text: String!, $current: Int!) {
  tweets: searchText(text: $text, current: $current) {
    id
    tweet_name
    text
    created_at
    user_id
    user_name
    nickname
    user_img
    ImgCount
    CommentCount
    FavCount
    isFavorite
  }
}
    `;

/**
 * __useSearchTextQuery__
 *
 * To run a query within a React component, call `useSearchTextQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTextQuery({
 *   variables: {
 *      text: // value for 'text'
 *      current: // value for 'current'
 *   },
 * });
 */
export function useSearchTextQuery(baseOptions?: Apollo.QueryHookOptions<SearchTextQuery, SearchTextQueryVariables>) {
        return Apollo.useQuery<SearchTextQuery, SearchTextQueryVariables>(SearchTextDocument, baseOptions);
      }
export function useSearchTextLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTextQuery, SearchTextQueryVariables>) {
          return Apollo.useLazyQuery<SearchTextQuery, SearchTextQueryVariables>(SearchTextDocument, baseOptions);
        }
export type SearchTextQueryHookResult = ReturnType<typeof useSearchTextQuery>;
export type SearchTextLazyQueryHookResult = ReturnType<typeof useSearchTextLazyQuery>;
export type SearchTextQueryResult = Apollo.QueryResult<SearchTextQuery, SearchTextQueryVariables>;
export const TokenCheckDocument = gql`
    query tokenCheck($user_name: String!) {
  tokenCheck(user_name: $user_name) {
    success
  }
}
    `;

/**
 * __useTokenCheckQuery__
 *
 * To run a query within a React component, call `useTokenCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useTokenCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTokenCheckQuery({
 *   variables: {
 *      user_name: // value for 'user_name'
 *   },
 * });
 */
export function useTokenCheckQuery(baseOptions?: Apollo.QueryHookOptions<TokenCheckQuery, TokenCheckQueryVariables>) {
        return Apollo.useQuery<TokenCheckQuery, TokenCheckQueryVariables>(TokenCheckDocument, baseOptions);
      }
export function useTokenCheckLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TokenCheckQuery, TokenCheckQueryVariables>) {
          return Apollo.useLazyQuery<TokenCheckQuery, TokenCheckQueryVariables>(TokenCheckDocument, baseOptions);
        }
export type TokenCheckQueryHookResult = ReturnType<typeof useTokenCheckQuery>;
export type TokenCheckLazyQueryHookResult = ReturnType<typeof useTokenCheckLazyQuery>;
export type TokenCheckQueryResult = Apollo.QueryResult<TokenCheckQuery, TokenCheckQueryVariables>;
export const TweetByUserDocument = gql`
    query tweetByUser($user_name: String!, $current: Int!) {
  tweets: tweetByUser(user_name: $user_name, current: $current) {
    id
    tweet_name
    text
    created_at
    user_id
    user_name
    nickname
    user_img
    ImgCount
    CommentCount
    FavCount
    isFavorite
  }
}
    `;

/**
 * __useTweetByUserQuery__
 *
 * To run a query within a React component, call `useTweetByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useTweetByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTweetByUserQuery({
 *   variables: {
 *      user_name: // value for 'user_name'
 *      current: // value for 'current'
 *   },
 * });
 */
export function useTweetByUserQuery(baseOptions?: Apollo.QueryHookOptions<TweetByUserQuery, TweetByUserQueryVariables>) {
        return Apollo.useQuery<TweetByUserQuery, TweetByUserQueryVariables>(TweetByUserDocument, baseOptions);
      }
export function useTweetByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TweetByUserQuery, TweetByUserQueryVariables>) {
          return Apollo.useLazyQuery<TweetByUserQuery, TweetByUserQueryVariables>(TweetByUserDocument, baseOptions);
        }
export type TweetByUserQueryHookResult = ReturnType<typeof useTweetByUserQuery>;
export type TweetByUserLazyQueryHookResult = ReturnType<typeof useTweetByUserLazyQuery>;
export type TweetByUserQueryResult = Apollo.QueryResult<TweetByUserQuery, TweetByUserQueryVariables>;
export const UserInfoDocument = gql`
    query userInfo($user_name: String!) {
  userInfo(user_name: $user_name) {
    id
    user_name
    nickname
    user_img
    created_at
    updated_at
  }
}
    `;

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *      user_name: // value for 'user_name'
 *   },
 * });
 */
export function useUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
        return Apollo.useQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, baseOptions);
      }
export function useUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfoQuery, UserInfoQueryVariables>) {
          return Apollo.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(UserInfoDocument, baseOptions);
        }
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<typeof useUserInfoLazyQuery>;
export type UserInfoQueryResult = Apollo.QueryResult<UserInfoQuery, UserInfoQueryVariables>;
export const AddTweetChannelDocument = gql`
    subscription addTweetChannel {
  tweets: addTweetChannel {
    id
    tweet_name
    text
    created_at
    user_id
    user_name
    nickname
    user_img
    ImgCount
    CommentCount
    FavCount
    isFavorite
  }
}
    `;

/**
 * __useAddTweetChannelSubscription__
 *
 * To run a query within a React component, call `useAddTweetChannelSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddTweetChannelSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddTweetChannelSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAddTweetChannelSubscription(baseOptions?: Apollo.SubscriptionHookOptions<AddTweetChannelSubscription, AddTweetChannelSubscriptionVariables>) {
        return Apollo.useSubscription<AddTweetChannelSubscription, AddTweetChannelSubscriptionVariables>(AddTweetChannelDocument, baseOptions);
      }
export type AddTweetChannelSubscriptionHookResult = ReturnType<typeof useAddTweetChannelSubscription>;
export type AddTweetChannelSubscriptionResult = Apollo.SubscriptionResult<AddTweetChannelSubscription>;