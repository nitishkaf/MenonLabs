import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StatusBar, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const getTexts = async () => {
     try {
      const response = await fetch('https://www.commonlit.org/api/v1/raw_content/lesson_templates?token=9759826c246d687a67328c4c81811bb108821e41af3c42ce41e6ff28ebf8bbba9737947232dd64e32df99a54a0add95c498001d917ca96258d50444af256a2dc');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style = {[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  useEffect(() => {
    getTexts();
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
  });

  function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyCOntent: 'center'}}>
        <Text>Home Screen</Text>
      </View>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Header title="Text List" />
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      )}
    </View>
  );
};


