import React, { Component } from 'react';
import { Alert, TextInput } from  'react-native';
import firebase from 'firebase';

import Button from './Button';
import Card from './Card';
import CardSection from './CardSection';
import Spinner from './Spinner';


class LoginForm extends Component {
  state = { email:'', password:'', loading:false };

  clickLogin(){
    const { email, password } = this.state;

    if(email===''||password===''){
        console.log('Eksik alan');
    this.setState({ loading: false });
        Alert.alert(
            'Mesag',
            'Empty email or passport area',
            [
                {text:'Tamam', onPress: () => null}
            ]
        )
    } else {
    this.setState({ loading: true });
 
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.loginSucces.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.loginSucces.bind(this))
          .catch(this.loginFail.bind(this));
      });
    }
  }
  loginSucces() {
    console.log('başarılı');
    this.setState({ loading: false });
  }

  loginFail() {
    console.log('Hatalı');
    this.setState({ loading: false });
    Alert.alert(
        'Mesage',
        'Kullanıcı adı ve ya şifre hatalı',
        [
            {text:'Tamam', onPress: () => null}
        ]
    )
  }
  renderButton () { 
    if(!this.state.loading) {
    return <Button onPress={this.clickLogin.bind(this)}> LOGIN </Button> }
        else {
            return <Spinner size="small" />;
        }

  }
  render(){
    const { inputStyle } = styles;

    return(

        <Card>

            <CardSection >
                <TextInput
                    placeholder='Email'
                    style={inputStyle}
                    value={this.state.email}
                    onChangeText={email => this.setState ( {email} )} //Her harfe basıldığında onun statedeki emailin içinde atacak
                />
            </CardSection>

             <CardSection >
                <TextInput
                    secureTextEntry
                    placeholder='password'
                    style={inputStyle}
                    value={this.state.password}
                    onChangeText={password => this.setState ( {password} )} 
                />
            </CardSection>

            <CardSection>
                {this.renderButton()}
            </CardSection>

        </Card>
    )
         }
         //Stateleri içine ulaşabilmek için bind methodunu kullandık
         //TextInput alanlarında güncelleme olduğu an içindeki veriler state set edilir
 }
const styles = {
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        flex: 1
    } ,

};
export default LoginForm;