import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,SafeAreaView, Alert,Image,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

//Currently useless data

//<Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>



export default function App() {
   
    let [data,setData]=useState({});
    let [silverdata,setsilverdata]=useState({});
    let [tab,setTab]=useState({
      tableHead: ['Product', 'Sell'],
      tableGold: ['Gold','goldPrice'],
      tableSilver: ['Silver','silverPrice']
    });
    let [com,setCom]=useState({
      tableHead: ['Symbol','Bid','Ask','High','Low'],
      tableGold: ['Gold Comex','a','b','c','d'],
      tableSilver: ['Silver Comex','a','b','c','d']
    })

    var myHeaders = new Headers();
  myHeaders.append("x-access-token", "goldapi-pnlotkwtgqz45-io");
  myHeaders.append("Content-Type", "application/json");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  useEffect(() => {
    setInterval(() => {
      fetch("https://www.goldapi.io/api/XAU/INR", requestOptions)
      .then(response => response.json())
      .then(result => {setData(result);})
      .catch(error => console.log('error', error));
    }, 5000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      fetch("https://www.goldapi.io/api/XAG/INR", requestOptions)
      .then(response => response.json())
      .then(result => {setsilverdata(result);})
      .catch(error => console.log('error', error));
    }, 5000);
  }, []);
 



  function HomeScreen() {
    const live = tab;
    const comex = com;
    return (
      <View style={styles.container} >
        <Text style={{padding:10,fontSize:30}}>Live Rate</Text>
        <Table borderStyle={{borderWidth: 0}} >
          <Row data={live.tableHead} style={{backgroundColor: 'black',height:30,borderWidth:0.5}} textStyle={{paddingLeft: 60,fontSize:20,color:"white"}}/>
          <Row data={live.tableGold} style={{borderWidth:0.7}} textStyle={styles.text}/>
          <Row data={live.tableSilver} style={{borderWidth:0.7}} textStyle={styles.text}/>
        </Table>
        <Text style={{padding:10,fontSize:30}}>Comex Rate</Text>
        <Table borderStyle={{borderWidth: 0}} >
          <Row data={comex.tableHead} textStyle={{fontSize:20,textAlign:"center",color:"white"}} style={{borderWidth:0.7,backgroundColor:"black"}}/>
          <Row data={comex.tableGold} textStyle={{textAlign:"center"}} style={{borderWidth:0.7}}/>
          <Row data={comex.tableSilver} textStyle={{textAlign:"center"}} style={{borderWidth:0.7}}/>
        </Table>
      </View>
    )
  }
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
  
  const Tab = createBottomTabNavigator();



  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  
      backgroundColor: 'black',
      height:30,
      borderWidth:0.5
      },
  wrapper: { flexDirection: 'row' },
  row: {  height: 50  },
  text: { paddingLeft: 60,
        fontSize:15
  }
});
