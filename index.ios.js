'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicatorIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

var HomeChecker = React.createClass({
  getInitialState: function() {
    return {
      isRefreshing: false,
      isLoading: true,

      miguelBorderColor: styles.borderOut,
      miguelIconName: 'reply',
      miguelIconClass: styles.iconOut,
      miguelHour: null,
      miguelAgo: null,

      loboBorderColor: styles.borderOut,
      loboIconName: 'reply',
      loboIconClass: styles.iconOut,
      loboHour: null,
      loboAgo: null,
    };
  },

  componentDidMount: function(){
    this.checkStatus();
  },

  checkStatus: function(refreshing){
    fetch('http://192.168.1.130:3000/status')
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoading: false,

          miguelHour: res.miguel.time,
          miguelAgo: res.miguel.timeago,
          loboHour: res.lobo.time,
          loboAgo: res.lobo.timeago,
        });

        if(res.miguel.status == 0){
          this.setState({
            miguelBorderColor: styles.borderOut,
            miguelIconName: 'reply',
            miguelIconClass: styles.iconOut,
          });
        }

        if(res.lobo.status == 0){
          this.setState({
            loboBorderColor: styles.borderOut,
            loboIconName: 'reply',
            loboIconClass: styles.iconOut,
          });
        }

        if(res.miguel.status == 1){
          this.setState({
            miguelBorderColor: styles.borderIn,
            miguelIconName: 'share',
            miguelIconClass: styles.iconIn,
          });
        }

        if(res.lobo.status == 1){
          this.setState({
            loboBorderColor: styles.borderIn,
            loboIconName: 'share',
            loboIconClass: styles.iconIn,
          });
        }

        if(res.miguel.status == 2){
          this.setState({
            miguelBorderColor: styles.borderUnknown,
            miguelIconName: 'times',
            miguelIconClass: styles.iconUnknown,
          });
        }

        if(res.lobo.status == 2){
          this.setState({
            loboBorderColor: styles.borderUnknown,
            loboIconName: 'times',
            loboIconClass: styles.iconUnknown,
          });
        }

        if(refreshing)
          this.setState({isRefreshing: false});      
    });
  },

  _onRefresh() {
    this.setState({isRefreshing: true});
    this.checkStatus(true);    
  },

  render: function() {
    var contents;
    if (this.state.isLoading) {
      contents = (
        <View style={ styles.loading }>
          <Text style={ styles.loadingText }>Cargando</Text>
          <ActivityIndicatorIOS />
        </View>
      )
    } else {

      contents = (
        <View>
          <View style={[styles.personContainer, styles.miguelContainer]}>
            <Image source={require('./images/miguel.jpg')} style={[styles.picture, this.state.miguelBorderColor]}/>
            <View style={styles.hourContainer}>
              <Icon name={this.state.miguelIconName} style={[styles.icon, this.state.miguelIconClass]}/>
              <Text style={styles.hour}>{this.state.miguelHour}</Text>
            </View>
            <Text style={styles.timeAgo} >{this.state.miguelAgo}</Text>
          </View>
          <View style={styles.personContainer}>
            <Image source={require('./images/lobo.jpg')} style={[styles.picture, this.state.loboBorderColor]}/>
            <View style={styles.hourContainer}>
              <Icon name={this.state.loboIconName} style={[styles.icon, this.state.loboIconClass]}/>
              <Text style={styles.hour}>{this.state.loboHour}</Text>
            </View>
            <Text style={styles.timeAgo} >{this.state.loboAgo}</Text>
          </View>
        </View>
      )
    }

    return (
      <ScrollView
          contentContainerStyle={styles.container}
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                tintColor="#ffffff"
                colors={['#ffffff']}
                progressBackgroundColor="#cccccc" />}
            >
        { contents }
      </ScrollView>
      
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

  scrollView: {
    backgroundColor: '#cccccc',
  },

  loading: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center'
  },

  loadingText: {
    fontSize: 14,
    marginBottom: 20
  },

  personContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  miguelContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },

  borderOut: {
    borderColor: '#f24233',
  },

  borderIn: {
    borderColor: '#06918c',
  },

  borderUnknown: {
    borderColor: '#bbbbbb',
  },

  hourContainer: {
    flexDirection: 'row',
  },

  icon: {
    fontSize: 20,
    position: 'absolute',
    left: -15,
  },

  iconOut: {
    color: '#f24233',
  },

  iconIn: {
    color: '#06918c',
  },

  iconUnknown: {
    color: '#bbbbbb',
  },

  hour: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  timeAgo: {
    color: '#bbbbbb',
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
