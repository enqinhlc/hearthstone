import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { CView, CardItem } from '../components';
import { handleDataByIndex } from '../utils/Helper';
import { CARD_SHOW_PER_SCREEN } from '../utils/Constants';

let LAST_CARD_INDEX = 0;

export interface ICards {
  allCards: array;
  mechanic: array;
  cardData: object;
}

class Cards extends React.Component<ICards> {
  state = {
    cards: [],
    handleMore: false,
  };

  componentDidMount() {
    LAST_CARD_INDEX = 0;
    this.getMore();
  }

  getMore = () => {
    if (!this.state.handleMore) {
      this.setState({ handleMore: true });
      const { allCards } = this.props;
      const newCards = handleDataByIndex(
        allCards,
        LAST_CARD_INDEX,
        CARD_SHOW_PER_SCREEN,
      );

      this.setState(prevState => ({
        cards: [...prevState.cards, ...newCards],
        handleMore: false,
      }));
    }
  };

  renderCards = ({ item, index }) => {
    LAST_CARD_INDEX = index;
    const card = this.props.cardData[item.cardId];
    return <CardItem data={card} />;
  };

  render() {
    return (
      <CView middle flex>
        <FlatList
          onEndReachedThreshold={0.4}
          onEndReached={this.getMore}
          data={this.state.cards}
          renderItem={this.renderCards}
          keyExtractor={(item, index) => index.toString()}
        />
      </CView>
    );
  }
}

const stateToProps = state => ({
  allCards: state.cardListMechanic.data,
  mechanic: state.mechanicCardList,
  cardData: state.cardData,
});

export default connect(stateToProps, null)(Cards);
