import React from 'react';
import {
  StatusBar,
  Platform,
  Alert,
  AsyncStorage,
  YellowBox,
} from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
// import AsyncStorage from '@react-native-community/async-storage';

YellowBox.ignoreWarnings(['AsyncStorage has been extracted']);

import { CView, CText } from '../components';
import { AllCards, AllDataSets } from '../utils/Api';
import { sortCardsByMechanics, sortCardSets, delay } from '../utils/Helper';
import {
  ACTION_SET_CARD_LIST_STATUS,
  ACTION_SET_CARD_LIST,
  STORAGE_CARDS,
  STORAGE_SET_DATA,
  ACTION_SET_ACTIVITY_INDICATOR,
} from '../utils/Constants';

export interface ILoadingScreen {
  text: string;
}

class LoadingScreen extends React.Component<ILoadingScreen> {
  state = { logs: [] };
  async componentDidMount() {
    if (Platform.OS === 'ios')
      StatusBar.setNetworkActivityIndicatorVisible(true);
    await this.prepareDataFromStorage();
    // await this.props.fetchAllCards();
    // this.resetStack();
    if (Platform.OS === 'ios')
      StatusBar.setNetworkActivityIndicatorVisible(false);
  }

  prepareDataFromStorage = async fetchData => {
    this.props.setIndicator({
      visible: true,
      message: 'It may take minutes, please wait..',
      cardListStatus: true,
    });

    const cards = await AsyncStorage.getItem(STORAGE_CARDS);
    if (cards) {
      const storageAllKeys = await AsyncStorage.getAllKeys();
      const multiKeys = storageAllKeys.filter(v =>
        new RegExp(STORAGE_SET_DATA).test(v),
      );

      let cardData = {};
      for (const storageKey of multiKeys) {
        const setDataFromStorage = await AsyncStorage.getItem(storageKey);
        cardData = { ...cardData, ...JSON.parse(setDataFromStorage) };
      }

      this.props.setCards({
        cardData,
        cardList: sortCardsByMechanics(JSON.parse(cards)),
        cardSets: sortCardSets(JSON.parse(cards)),
        cardListStatus: false,
      });

      this.props.setIndicator({
        visible: false,
        message: 'It may take minutes, please wait..',
        cardListStatus: false,
      });

      this.resetStack();
    } else {
      await this.props.fetchAllCards();
      this.resetStack();
    }
  };

  resetStack = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Mechanics' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <CView center middle flex>
        {this.state.logs.map(d => (
          <CText size={15}>{d}</CText>
        ))}
        {this.state.logs.length === 0 && (
          <>
            <CText size={25}>Please wait</CText>
            <CText color="red" size={20}>
              This may take few minutes
            </CText>
          </>
        )}
      </CView>
    );
  }
}

const dispatchToProps = dispatch => ({
  fetchAllCards: async onLoad => {
    // Data Fetch Status;
    dispatch({
      type: ACTION_SET_CARD_LIST_STATUS,
      payload: { cardListStatus: true },
    });

    dispatch({
      type: ACTION_SET_ACTIVITY_INDICATOR,
      payload: { visible: true, message: 'It may take minutes, please wait..' },
    });

    try {
      const cards = await AllCards();
      //Data will be stored in local device
      const storageCardData = JSON.stringify(cards);

      await AsyncStorage.setItem(STORAGE_CARDS, storageCardData);

      const dataSets = sortCardSets(cards);
      let cardData = {};

      for (const set of dataSets) {
        const cardDatas = await AllDataSets(set);
        if (!cardDatas.error) {
          const cardDataForStorage = cardDatas.reduce((prev, card) => {
            prev[card.cardId] = card;
            return prev;
          }, {});
          cardData = { ...cardData, ...cardDataForStorage };

          const storageKey = `${STORAGE_SET_DATA}/${set}`;
          AsyncStorage.setItem(
            storageKey,
            JSON.stringify(cardDataForStorage),
          ).then(() => console.log(`${storageKey} sync...`));
        }
      }

      await delay(0.5);

      dispatch({
        type: ACTION_SET_ACTIVITY_INDICATOR,
        payload: { visible: false, message: '' },
      });

      dispatch({
        type: ACTION_SET_CARD_LIST,
        payload: {
          cardData,
          cardList: sortCardsByMechanics(cards),
          cardSets: sortCardSets(cards),
          cardListStatus: false,
        },
      });
    } catch (e) {
      Alert.alert('Error!', 'Data is not available');
    }

    if (onLoad instanceof Function) onLoad();
  },
  setIndicator: ({ cardListStatus, visible, message }) => {
    dispatch({
      type: ACTION_SET_CARD_LIST_STATUS,
      payload: { cardListStatus },
    });

    dispatch({
      type: ACTION_SET_ACTIVITY_INDICATOR,
      payload: { visible, message },
    });
  },
  setCards: ({ cardListStatus, cardList, cardSets, cardData }) =>
    dispatch({
      type: ACTION_SET_CARD_LIST,
      payload: { cardList, cardListStatus, cardSets, cardData },
    }),
});

export default connect(null, dispatchToProps)(LoadingScreen);
