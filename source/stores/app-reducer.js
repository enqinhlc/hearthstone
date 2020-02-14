import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  ACTION_SET_CARD_LIST,
  ACTION_SET_CARD_LIST_STATUS,
  ACTION_SET_MERGE_STATE,
  ACTION_SET_MECHANIC,
  ACTION_SET_ACTIVITY_INDICATOR,
} from '../utils/Constants';

export interface IState {
  cardList: array;
  cardListStatus: boolean;
  networkStatus: boolean;
  mechanicListCards: array;
  cardListMechanic: object;
  activityIndicatorVisible: boolean;
  activityIndicatorMessage: string;
}

const initState: IState = {
  cardList: [],
  cardSets: [],
  cardData: {},
  cardListStatus: false,
  networkStatus: false,
  mechanicListCards: [],
  cardListMechanic: null,
  activityIndicatorVisible: false,
  activityIndicatorMessage: 'Lütfen bekleyiniz.',
};

const reducer = (state: IState = initState, { type, payload }) => {
  let newState = { ...state };

  if (type === ACTION_SET_CARD_LIST) {
    const { cardList, cardListStatus, cardData, cardSets } = payload;
    newState.cardList = cardList;
    newState.cardListStatus = cardListStatus;
    newState.cardSets = cardSets;
    newState.cardData = cardData;
    return newState;
  }

  if (type === ACTION_SET_CARD_LIST_STATUS) {
    const { cardListStatus } = payload;
    newState.cardListStatus = cardListStatus;
    return newState;
  }

  if (type === ACTION_SET_MERGE_STATE) {
    newState = { ...newState, ...payload };

    return newState;
  }

  if (type === ACTION_SET_MECHANIC) {
    const { cardListMechanic, mechanicListCards } = payload;
    newState.mechanicListCards = mechanicListCards;
    newState.cardListMechanic = cardListMechanic;

    return newState;
  }

  if (type === ACTION_SET_ACTIVITY_INDICATOR) {
    const { message, visible } = payload;
    newState.activityIndicatorMessage = message;
    newState.activityIndicatorVisible = visible;

    return newState;
  }

  return state;
};

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
