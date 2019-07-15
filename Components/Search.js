import React from 'react'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchtext } from '../API/TMDBApi'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = '' // Initialisation de notre donnée searchedText en dehors du state
    this.state = {
      films: [],
      isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
    // this._films = []
    // console.log(this._films);
  }

  //   _loadFilms() {
  //     getFilmsFromApiWithSearchtext('star').then(data => console.log(data));
  //   }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true }) // Lancement du chargement
      getFilmsFromApiWithSearchtext(this.searchedText).then((data) => {
        this.setState({
          films: data.results,
          isLoading: false // Arrêt du chargement
        })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  render() {
    // console.log(this.state.isLoading)
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._loadFilms()}
        />
        <Button title='Rechercher' onPress={() => this._loadFilms()} />
        <FlatList
          // data={this._films}
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
