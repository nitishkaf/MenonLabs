import React, { useEffect, useState } from 'react';
import { 
	ActivityIndicator, 
	Button, 
	FlatList,
  ScrollView, 
	StatusBar, 
	Text, 
	View,
	StyleSheet, 
	TouchableOpacity,
 } from 'react-native';
import Header from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';

 export default App = () => {
  const [isLibraryLoading, setLibraryLoading] = useState(true);
  const [libraryData, setLibraryData] = useState([]);
  const [isBookLoading, setBookLoading] = useState(true);
  const [bookData, setBookData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const Stack = createNativeStackNavigator();

  const getLibrary = async () => {
     try {
      const token = '9759826c246d687a67328c4c81811bb108821e41af3c42ce41e6ff28ebf8bbba9737947232dd64e32df99a54a0add95c498001d917ca96258d50444af256a2dc';
      const response = await fetch('https://www.commonlit.org/api/v1/raw_content/lesson_templates?token='+token);
      const json = await response.json();
      setLibraryData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLibraryLoading(false);
    }
  }

  const getBook = async () => {
    try {  
      const token = '9759826c246d687a67328c4c81811bb108821e41af3c42ce41e6ff28ebf8bbba9737947232dd64e32df99a54a0add95c498001d917ca96258d50444af256a2dc';
      const bookResponse = await fetch('https://www.commonlit.org/api/v1/raw_content/lesson_templates/'+selectedId+'?token='+token);
      const bookJson = await bookResponse.json();
      setBookData(bookJson);
   } catch (error) {
      console.error(error);
   } finally {
      setBookLoading(false);
   }
 }

 
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style = {[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderLibrary = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id)
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, padding: 24 }}>
      <Header title="CommonLit" />
      <Button 
        title="Call API"
        onPress={
          () => {
            navigation.navigate('Library')
            getLibrary()
          }
        } 
      />
    </View>
    );
  }

  function LibraryScreen({ navigation }) {
    return (
      <View style={{ flex: 1, padding: 24 }}>
      <Header title="Book List" />
      <Button 
        title="Go To Book"
        onPress={
          () => {
            if (selectedId !== null) {
              navigation.navigate('Book')
            }
          }
        } 
      />
      {isLibraryLoading ? <ActivityIndicator/> : (
        <FlatList
          data={libraryData}
          renderItem={renderLibrary}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      )}
    </View>
    );
  }

  function BookScreen({ navigation }) {
    HTML = bookData.html;
    return (
      <View>
        <Button 
        title="Load Book"
        onPress={() => getBook()} 
        />
        {isBookLoading ? <ActivityIndicator/> : (
          <ScrollView>
          <Text style={styles.baseText}>
          <Text style={styles.titleText}>
            {bookData.name}
            {"\n"}
            By: {bookData.author}
            {"\n"}
            {"\n"}
          </Text>
          <Text>{bookData.html}</Text>
        </Text>
        </ScrollView>
        )}
      </View>
    )
  }

  useEffect(() => {
    getLibrary();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 15,
    },
    baseText: {
      fontFamily: "Cochin"
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Library" component={LibraryScreen} />
        <Stack.Screen name="Book" component={BookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};