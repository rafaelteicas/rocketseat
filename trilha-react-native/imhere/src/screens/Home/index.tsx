import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Particpant";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante já existe!", "Já existe um participante na lista com esse nome!")
    }
    setParticipants(prev => [...prev, participantName])
    setParticipantName("")
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: 'Cancelar',
        style: 'destructive'
      },
      {
        text: 'Confirmar',
        style: 'default',
        onPress: () => setParticipants(prev => prev.filter(participantName => participantName !== name))
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>

      <Text style={styles.eventDate}>
        Segunda feira
      </Text>

      <View style={styles.form}>
        <TextInput
          value={participantName}
          onChangeText={setParticipantName}
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={participants}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item}
        ListEmptyComponent={() => <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda, adicione participantes a sua lista de presença!</Text>}
        renderItem={({item}) => (
          <Participant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
            key={item}
          />
        )}
      />
    </View>
  )
}