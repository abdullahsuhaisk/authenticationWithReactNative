import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import Header from  './src/components/Header';
import LoginForm from './src/components/LoginForm';
import CardSection from './src/components/CardSection';
import Button from './src/components/Button';
import Spinner from './src/components/Spinner';

export default class App extends React.Component {
  state = { loggedIn: null };
  componentWillMount(){
    firebase.initializeApp({
        apiKey: 'AIzaSyD4Fy_y6zotIVz9_xxwvKCB4yN-jpMx9UM',
        authDomain: 'authenticationapp-8d1d6.firebaseapp.com',
        databaseURL: 'https://authenticationapp-8d1d6.firebaseio.com',
        projectId: 'authenticationapp-8d1d6',
        storageBucket: 'authenticationapp-8d1d6.appspot.com',
        messagingSenderId: '683421410698'
      });
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false})
      }
    });
  }
  clickLogout() {
    firebase.auth().signOut();
  }
  renderContent(){
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
          <Button onPress={this.clickLogout.bind(this)}> LOG OUT </Button>
          </CardSection>
        );
      case false :
        return (
          <LoginForm />
        )
      default:
        return (
          <View>
            <Spinner size="large" />
          </View>
        )
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText='Authentication Page'/>
        {this.renderContent()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
