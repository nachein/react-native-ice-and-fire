import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class HomeScreen extends React.Component {
	static navigationOptions = {
		title: 'Home'	
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1}}>
					<Text>Hello, Navigation</Text>
				</View>
				<View style={{flex: 3}}>
					<Button
						title='Characters'
						onPress={()=>
							navigate('Characters')
						}
					/>
				</View>
				<View style={{flex: 3}}>
					<Button
						title='Houses'
						onPress={()=>
							navigate('Houses')
						}
					/>
				</View>
				<View style={{flex: 2}}>
					<Button
						title='Books'
						onPress={()=>
							navigate('Books')
						}
					/>
				</View>
			</View>
		);
	}
}

class CharactersScreen extends React.Component {
	static navigationOptions = {
		title: 'Characters'
	};
	constructor(props){
		super(props);
		this.state = {
			isLoading: true,
			page: 1
		};
	}
	componentDidMount(){
		this.fetchCharacters();
	}
	fetchCharacters(){
		return fetch(`https://www.anapioficeandfire.com/api/characters?page=${this.state.page}`)
			.then((response) => response.json())
			.then((json) => {
				//let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
				this.setState({
					isLoading: false,
					dataSource: json//ds.cloneWithRows(json)
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	render() {
		if(this.state.isLoading) {
			return (
				<View style={{flex: 1, paddingTop: 20}}>
					<ActivityIndicator />
				</View>
			);
		}
 
		return (
			<View style={{flex: 1, paddingTop: 20}}>
				<View style={{flex: 1}}>
					<Text> All </Text>
				</View>
				<View style={{flex: 5}}>
					<CharacterList data={this.state.dataSource} />
				</View>
			</View>
		);
	}
}

class CharacterList extends React.Component {
	render() {
		const { data } = this.props;
		return (
			<FlatList
				data={data}
				renderItem={this.renderItem}
			/>
		);
	}

	renderItem(itemData){
		return <View><Text>lala</Text></View>;
	}
}

class HousesScreen extends React.Component {
	static navigationOptions = {
		title: 'Houses'
	};
	render() {
		return <Text>GOT Houses</Text>;
	}
}

class BooksScreen extends React.Component {
	static navigationOptions = {
		title: 'Books'
	};
	render() {
		return <Text>Books</Text>
	}
}

export default App = StackNavigator({
  Home: { screen: HomeScreen },
	Characters: { screen: CharactersScreen },
	Houses: { screen: HousesScreen },
	Books: { screen: BooksScreen }
});
