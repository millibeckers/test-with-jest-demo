import React from 'react';
import API from './api';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      annoyed: false,
    };
    this.data = 'Not yet...';
  }

  componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    this.data = await API.fetch();
  }

  _onPress = () => {
    this.setState({annoyed: true});
  }

  render() {
    return (
      <View style={[styles.main]}>
        <Text>Is it ready? Press the button to find out.</Text>
        <Text>{this.data}</Text>
        <Button
          onPress={this._onPress}
          title={this.state.annoyed ? 'That\'s enough.' : 'Press me!'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: 300,
    justifyContent: 'space-around',
    backgroundColor: '#ccff99',
  },
});
