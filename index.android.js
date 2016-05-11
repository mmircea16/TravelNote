import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    Dimensions,
    TextInput,
    ScrollView
} from 'react-native';

var {height, width} = Dimensions.get('window');

var travelNotesData = [
  {
    title: "Patagonia",
    url: "https://worldexpeditions.s3-ap-southeast-2.amazonaws.com/South-America/Patagonia/Remote-valleys-of-Patagonia-1845-5.jpg"
  }, {
    url: "http://www.travelwithpedro.com/wp-content/uploads/2012/02/what-to-do-in-Oman-06-EN2.jpg"
  }, {
    url: "http://moroccantimes.online/wp-content/uploads/2015/12/Morocco-1.jpg"
  }

];
var dataSource = new ListView.DataSource(
    {
      rowHasChanged: (row1, row2) => row1 !== row2
    }
);

class TravelNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: dataSource.cloneWithRows(travelNotesData)
    };
  }

  addNote(that, text) {
    travelNotesData = travelNotesData.concat({url: text});
    console.log(this);
    that.setState({
      dataSource: dataSource.cloneWithRows(travelNotesData)
    });
  }

  render() {
    return (
        <View>
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                     onChangeText={(text) => this.addNote(this, text)}
          />
          <ScrollView>

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderNote}
                style={styles.listView}
            >

            </ListView>
          </ScrollView>
        </View>

    );
  }

  renderNote(note) {
    return (
        <View style={styles.container}>
          <Image source={{uri: note.url}}
                 style={styles.thumbnail}
                 resizeMode="contain"/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    paddingTop: 1,
    backgroundColor: '#F5FCFF'
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative'
  },
  thumbnail: {
    width: width - 20,
    height: 300
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('TravelNote', () => TravelNote);
