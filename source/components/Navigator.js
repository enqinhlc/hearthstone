import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
  LoadingScreen,
  MechanicsScreen,
  CardsScreen,
  SearchScreen,
  SingleCardScreen,
} from '../screens';

const CardStackNav = createStackNavigator(
  {
    Loading: {
      screen: LoadingScreen,
      navigationOptions: {
        title: 'Loading',
      },
    },
    Mechanics: {
      screen: MechanicsScreen,
      navigationOptions: {
        title: 'Mechanics',
      },
    },
    Cards: {
      screen: CardsScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.name,
      }),
    },
  },
  {
    initialRouteName: 'Loading',
  },
);

const SearchStackNav = createStackNavigator({
  Search: {
    screen: SearchScreen,
  },
  Single: {
    screen: SingleCardScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
    }),
  },
});

const AppNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      CardStack: {
        screen: CardStackNav,
        navigationOptions: {
          tabBarLabel: 'Mechanics',
        },
      },
      SearchStack: {
        screen: SearchStackNav,
        navigationOptions: {
          tabBarLabel: 'Search',
        },
      },
    },
    {
      tabBarOptions: {
        showIcon: false,
        labelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
      },
    },
  ),
);

export default AppNavigator;
