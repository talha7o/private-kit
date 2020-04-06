import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Linking,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

import languages from '../../locales/languages';
import i18next from 'i18next';
import { getLanguages } from 'react-native-i18n';
import colors from '../../constants/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import locationIcon from '../../assets/images/newspaper.png';

const width = Dimensions.get('window').width;

class SelectLanguage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogging: '',
      isLoading: false,
      lang: 'en',
    };
  }

  handleBackPress = () => {
    BackHandler.exitApp(); // works best when the goBack is async
    return true;
  };

  changeLang(l) {
    this.setState({ lang: l });
    this.setState({ isLoading: true });
    getLanguages().then(languages => {
      i18next.changeLanguage(this.state.lang);
      setTimeout(() => {
        this.setState({ isLoading: false });
        this.props.swipe(1);
      }, 1500);
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.infoCard}>
          <Image
            source={locationIcon}
            style={{
              alignSelf: 'center',
              marginTop: '25%',
            }}
          />

          <ActivityIndicator
            animating={this.state.isLoading}
            color='#bc2b78'
            size='large'
            style={styles.activityIndicator}
          />

          <Text style={styles.infoCardHeadText}>
            {languages.t('label.private_kit')}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.changeLang('en')}
            style={styles.primaryButtonTouchable}>
            <Text style={styles.primaryButtonText}>{'English'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.changeLang('ur')}
            style={styles.primaryButtonTouchable}>
            <Text style={styles.primaryButtonText}>{'اردو'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Container covers the entire screen
  mainContainer: {
    flex: 1,
    backgroundColor: '#008000',
  },
  infoCard: {
    width: width * 0.7866,
    backgroundColor: '#008000',
    height: '80%',
    borderRadius: 12,
    alignSelf: 'center',
  },
  infoCardImage: {
    alignSelf: 'center',
    width: width * 0.2,
    height: width * 0.2,
    marginTop: '16%',
  },
  infoCardHeadText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 57,
    lineHeight: 67,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#EEE2DC',
    marginTop: 50,
  },
  infoCardBodyText: {
    opacity: 0.8,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#EEE2DC',

    alignSelf: 'center',
    marginTop: 10,
  },
  navigationDotsView: {
    flexDirection: 'row',
    left: width * 0.445,
    marginTop: 30,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 13,
    backgroundColor: '#9368ff',
    opacity: 1,
    marginRight: 8,
  },
  inactiveIndicator: {
    width: 8,
    height: 8,
    opacity: 0.32,
    borderRadius: 13,
    backgroundColor: '#78849e',
    marginRight: 8,
  },
  primaryButtonTouchable: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    height: 50,
    alignSelf: 'center',
    width: width * 0.43,
    marginTop: 30,
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#008000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    alignSelf: 'center',
  },
  infoCardImage: {
    alignSelf: 'center',
    width: width * 0.5,
    height: width * 0.5,
    marginTop: '16%',
  },
});

export default SelectLanguage;
