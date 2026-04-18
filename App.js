import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    cargarContador();
  }, []);

  useEffect(() => {
    guardarContador(contador);
  }, [contador]);

  const incrementar = () => {
    setContador(contador + 1);
  };

  const guardarContador = async (valor) => {
    try {
      await AsyncStorage.setItem("contador", JSON.stringify(valor));
    } catch (e) {
      console.log("Error guardando");
    }
  };

  const cargarContador = async () => {
    try {
      const data = await AsyncStorage.getItem("contador");
      if (data !== null) {
        setContador(JSON.parse(data));
      }
    } catch (e) {
      console.log("Error cargando");
    }
  };

  const pedirPermiso = async () => {
    await Notifications.requestPermissionsAsync();
  };

  const enviarNotificacion = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hola, mundo 🌍",
        body: "Esta es tu primera notificación",
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Notificaciones</Text>
      <Button title="Pedir permiso" onPress={pedirPermiso} />
      <View style={{ marginTop: 10 }}>
        <Button title="Enviar notificación" onPress={enviarNotificacion} />
      </View>

      <View style={{ marginTop: 50, alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          Contador: {contador}
        </Text>
        <Button title="Incrementar" onPress={incrementar} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});