import React from 'react';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { CView, CButton, CText } from '../components';
import { COLORS, CARD_SHOW_PER_SCREEN } from '../utils/Constants';
import { SearchCard } from '../utils/Api';

import { handleDataByIndex } from '../utils/Helper';

let LAST_CARD_INDEX = 0;

export interface ISearch {
  cardData: object;
}

class Search extends React.Component<ISearch> {
  state = {
    text: '',
    allCards: [],
    cards: [],
    error: false,
    errorMsg: '',
    searching: false,
    flipped: false,
    cardData: null,
    handleMore: false,
  };

  componentDidMount() {}

  searchCard = async (force = false) => {
    if (!this.state.searching || force || this.state.text.length > 0) {
      this.setState({ searching: true, cards: [], allCards: [] });
      const cards = await SearchCard(this.state.text.trim());
      if (!cards.error) {
        const listCards = handleDataByIndex(cards, 0, CARD_SHOW_PER_SCREEN);
        this.setState({
          cards: listCards,
          allCards: cards,
          searching: false,
          error: false,
          errorMsg: '',
        });
      } else {
        this.setState({
          allCards: [],
          cards: [],
          searching: false,
          error: true,
          errorMsg: cards.message,
        });
      }
    }
  };

  showCard = item => {
    if (item !== null) {
      this.props.navigation.navigate('Single', item);
    } else {
      Alert.alert('Error', 'Please try again later.');
    }
  };

  renderItem = ({ item, index }) => {
    LAST_CARD_INDEX = index;

    const { cardData } = this.props;
    let showCardData = cardData[item.cardId] || null;

    return (
      <CButton
        key={index}
        onPress={() => this.showCard(showCardData)}
        title={item.name}
      />
    );
  };

  getMore = () => {
    if (!this.state.handleMore) {
      this.setState({ handleMore: true });
      const { allCards } = this.state;
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

  render() {
    const { error, errorMsg, text, cards } = this.state;
    return (
      <CView flex>
        <CView row middle>
          <TextInput
            style={styles.input}
            value={text}
            clearButtonMode="while-editing"
            onChangeText={text => {
              this.setState({ text }, () => {
                if (text.length > 0) {
                  setTimeout(() => {
                    this.searchCard();
                  }, 1000);
                }
              });
            }}
          />
          <CButton
            style={{ margin: 3 }}
            onPress={() => this.searchCard(true)}
            title="Search"
          />
        </CView>

        {error && <CText>{errorMsg}</CText>}

        {this.state.searching && (
          <CView center flex middle>
            <ActivityIndicator size="small" color={COLORS.blue} />
          </CView>
        )}

        {!this.state.searching && (
          <FlatList
            style={{ flex: 1 }}
            data={cards}
            onEndReachedThreshold={0.4}
            onEndReached={this.getMore}
            renderItem={this.renderItem}
            keyExtractor={item => item.index}
          />
        )}
      </CView>
    );
  }
}

const stateToProps = state => ({
  cardData: state.cardData,
});

export default connect(stateToProps, null)(Search);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    margin: 3,
    padding: 5,
    borderColor: 'rgba(0,0,0,.3)',
    color: COLORS.dark,
  },
});
