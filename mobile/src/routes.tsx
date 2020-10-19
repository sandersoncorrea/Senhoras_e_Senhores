import React from 'react';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Map from './pages/Map';
import AsiloDetails from './pages/AsiloDetails';
import AsiloData from './pages/CreateAsilo/AsiloData';
import SelectMapPosition from './pages/CreateAsilo/SelectMapPosition';
import Header from './components/Header';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5'}}}>
                <Screen name="Map" component={Map} />
                <Screen 
                    name="AsiloDetails" 
                    component={AsiloDetails} 
                    options={{ headerShown: true, header: () =>  <Header showCancel={false} title="Asilo" />}} 
                />

                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{ headerShown: true, header: () =>  <Header title="Selecione no mapa" />}} 
                 />
                <Screen 
                    name="AsiloData" 
                    component={AsiloData} 
                    options={{ headerShown: true, header: () =>  <Header title="Informe os dados" />}} 
                />
            </Navigator>
        </NavigationContainer>
    )
}