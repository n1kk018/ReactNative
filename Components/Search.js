import React from 'react'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchtext } from '../API/TMDBApi'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = '' // Initialisation de notre donnée searchedText en dehors du state
    this.page = 0
    this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    this.state = {
      films: [],
      isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true }) // Lancement du chargement
      getFilmsFromApiWithSearchtext(this.searchedText, this.page + 1).then(
        (data) => {
          this.page = data.page
          this.totalPages = data.totalPages
          this.setState({
            films: [...this.state.films, ...data.results], // ou this.state.films.concat(data.results)
            isLoading: false, // Arrêt du chargement
          })
        },
      )
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _searchFilms() {
    // On remet à zéro les films de notre state
    this.page = 0
    this.totalPages = 0
    this.setState(
      {
        films: [],
      },
      () => {
        this._loadFilms()
      },
    )
  }
  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title='Rechercher' onPress={() => this._searchFilms()} />
        <FlatList
          // data={this._films}
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FilmItem
              film={item}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            // console.log('onEndReached')
            // if (this.page < this.totalPages) {
            // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
            this._loadFilms()
            // }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Search
