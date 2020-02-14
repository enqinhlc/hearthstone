import React from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Easing,
  AsyncStorage,
  Platform,
} from 'react-native';
import CText from './CText';
import { SingleCard } from '../utils/Api';
import { COLORS } from '../utils/Constants';

export interface ICardItem {
  data: object;
  style: object;
}
const CARD_ASPECT = 465 / 307;
const SCREEN_W = Dimensions.get('window').width;

export default class CardItem extends React.Component {
  state = {
    flipped: false,
    cardData: null,
    imgErr: false,
  };

  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.front = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    this.back = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });

    this.opacity = Platform.select({
      android: this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: [1, 0],
      }),
      ios: 1,
    });
  }
  componentDidMount() {
    this.getSingleCardData();
  }

  getSingleCardData = async () => {
    const { data } = this.props;
    const getCardData = await SingleCard(data.cardId);
    await AsyncStorage.setItem(data.cardId, JSON.stringify(getCardData[0]));
    this.setState({ cardData: getCardData });
  };

  showDetails = data => {
    Animated.timing(this.animatedValue, {
      toValue: this.state.flipped ? 0 : 180,
      duration: 800,
      easing: Easing.ease,
    }).start(() => {
      this.setState(prevState => ({ flipped: !prevState.flipped }));
    });
  };

  getSpec = (field, index, options = {}) => {
    const { cardData } = this.state;
    let data = cardData[0][index];
    if (options.hasOwnProperty('mechanics')) {
      data = data || [];
      data = data.map(d => d.name);
    }

    if (options.hasOwnProperty('html')) {
      data = (data || '').split('\\n').join(' ');
      data = data.replace(/<\/?[^>]+(>|$)/g, '');
    }

    return (
      <CText color="white">
        <CText bold>{field}:</CText> {data || '-'}
      </CText>
    );
  };

  renderCard() {
    const { data } = this.props;
    const { cardData, imgErr } = this.state;

    const frontStyle = {
      transform: [{ rotateY: this.front }],
      opacity: this.opacity,
    };
    const backStyle = { transform: [{ rotateY: this.back }] };
    return (
      <View style={styles.cardItemWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.cardItem}
          onPress={() => this.showDetails(data)}>
          <Animated.Image
            source={{
              uri:
                imgErr || !data.img
                  ? 'https://via.placeholder.com/307x465'
                  : data.img,
            }}
            onError={() => this.setState({ imgErr: true })}
            style={[frontStyle, styles.cardItem, styles.image]}
          />
          <Animated.View style={[backStyle, styles.cardItem, styles.cardStyle]}>
            {this.getSpec('ID', 'cardId')}
            {this.getSpec('DBFID', 'dbfId')}
            {this.getSpec('Name', 'name')}
            {this.getSpec('Set', 'cardSet')}
            {this.getSpec('Type', 'type')}
            {this.getSpec('Faction', 'faction')}
            {this.getSpec('Rarity', 'rarity')}
            {this.getSpec('Attack', 'attack')}
            {this.getSpec('Healty', 'health')}
            {this.getSpec('Text', 'text', { html: true })}
            {this.getSpec('Race', 'race')}
            {this.getSpec('Player Class', 'playerClass')}
            {this.getSpec('Mechanics', 'mechanics', { mechanics: true })}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return this.state.cardData === null ? (
      <View style={styles.cardItemWrapper}>
        <ActivityIndicator size={'large'} color={COLORS.primary} />
      </View>
    ) : (
      this.renderCard()
    );
  }
}

const styles = StyleSheet.create({
  cardItemWrapper: {
    width: SCREEN_W,
    height: SCREEN_W * CARD_ASPECT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backfaceVisibility: 'hidden',
  },
  cardStyle: {
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    margin: 20,
    alignItems: 'flex-start',
    paddingHorizontal: 30,
  },
  image: {
    width: SCREEN_W,
    height: SCREEN_W * CARD_ASPECT,
  },
});
