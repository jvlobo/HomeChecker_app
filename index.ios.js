'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,  
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

var HomeChecker = React.createClass({
  getInitialState: function() {
    return {
      borderColor: '#ef4a36',
      iconName: 'reply',
    };
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.personContainer, styles.miguelContainer]}>
          <Image source={require('./images/miguel.jpg')} style={[styles.picture, {borderColor: this.state.borderColor}]}/>
          <Text>20:30</Text>
          <Icon name={this.state.iconName} size={30} color="#900" />
          <Text>Two hours ago</Text>
        </View>
        <View style={styles.personContainer}>
          <Image source={require('./images/lobo.jpg')} style={[styles.picture, {borderColor: this.state.borderColor}]}/>
          <Text>20:30</Text>
          <Text>Two hours ago</Text>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },

  personContainer: {
    flex: 1,
    alignItems: 'center',
  },

  miguelContainer: {
    justifyContent: 'center',
  },

  picture: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 6,
    marginBottom: 15,
  },
});

AppRegistry.registerComponent('HomeChecker', () => HomeChecker);
