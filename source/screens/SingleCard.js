import React from 'react';
import { connect } from 'react-redux';
import { CardItem, ICardItem } from '../components';

const SingleCard = (props: ICardItem) => {
  const params = props.navigation.state.params;
  return <CardItem data={params} />;
};

const stateToProps = state => ({
  cardData: state.cardData,
});

export default connect(stateToProps, null)(SingleCard);
