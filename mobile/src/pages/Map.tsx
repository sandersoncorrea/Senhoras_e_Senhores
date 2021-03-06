import React , {useEffect, useState } from 'react';

import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather} from '@expo/vector-icons'

import pin from "../images/pin.png";
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Asilo {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function Map(){
    const navigation = useNavigation();

    const [asilos, setAsilos] = useState<Asilo[]>([]);
    useFocusEffect(() => {
      api.get('/asilos').then(response => {
        setAsilos(response.data);
      });
    });

    function handleNavigateToDetails(id: number){
        navigation.navigate('AsiloDetails', { id });
    }
    function handleNavigateToCreateAsilo(){
      navigation.navigate('SelectMapPosition');
    }

    return (<View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -21.7482345,
            longitude: -41.3330914,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
          {asilos.map(asilo => {
            return (
              <Marker 
                key={asilo.id}
                icon={pin} 
                coordinate={{latitude: asilo.latitude, longitude: asilo.longitude,}}
                calloutAnchor={{x: 2.7, y: 0.8}}>
                  <Callout tooltip onPress={() =>handleNavigateToDetails(asilo.id)}>
                    <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{asilo.name}</Text>
                    </View>
                  </Callout>
                </Marker>
            );
          })}
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{asilos.length} asilos encontrados</Text>
  
          <RectButton style={styles.createAsiloButton} onPress={handleNavigateToCreateAsilo}>
            <Feather name="plus" size={20} color="#FFF" />
          </RectButton>
        </View>
      </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center'
    },
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
  
        backgroundColor: "#FFF",
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,
  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
  
        elevation: 3
    },
    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: "#8fa7b3"
    },
    createAsiloButton: {
        width: 56,
        height: 56,
        backgroundColor: "#15c3d6",
        borderRadius: 20,
  
        justifyContent: 'center',
        alignItems: 'center'
    }
  });