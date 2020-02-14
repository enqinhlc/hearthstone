import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { CView, CText, CButton } from '../components';
import { COLORS, ACTION_SET_MECHANIC } from '../utils/Constants';
import { sortCardsByMechanics } from '../utils/Helper';

export interface IMechanicsScreen {
  cards: array;
}

class MechanicsScreen extends React.Component<IMechanicsScreen> {
  showCards = mechanic => {
    const cardListMechanic = this.props.cardList[mechanic.name];
    this.props.setMechanic({
      mechanicListCards: mechanic,
      cardListMechanic,
    });
    this.props.navigation.navigate('Cards', mechanic);
  };

  renderMechanics = ({ item, index }) => {
    return (
      <CView key={index} style={styles.listItem}>
        <CButton
          activeOpacity={0.5}
          bgColor="orange"
          onPress={() => this.showCards(item)}
          title={item.name}
          textStyle={{
            center: true,
          }}
        />
      </CView>
    );
  };

  render = () => {
    return (
      <CView middle flex>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.mechanics}
          renderItem={this.renderMechanics}
          keyExtractor={item => item.name}
        />
      </CView>
    );
  };
}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 5,
    marginHorizontal: 10,
  },
});

const stateToProps = state => ({
  mechanics: state.cardList.mechanicList,
  cardList: state.cardList.cardList,
});

const dispatchToProps = dispatch => ({
  setMechanic: ({ mechanicListCards, cardListMechanic }) =>
    dispatch({
      type: ACTION_SET_MECHANIC,
      payload: { mechanicListCards, cardListMechanic },
    }),
});

export default connect(stateToProps, dispatchToProps)(MechanicsScreen);
