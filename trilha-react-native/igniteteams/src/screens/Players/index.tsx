import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/HighLight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { Alert, FlatList, TextInput } from 'react-native'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListyEmpty'
import { Button } from '@components/Button'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackProps } from '@routes/app.routes'
import { playersGetByGroup } from '@storage/players/playersGetByGroup'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { playerAddByGroup } from '@storage/players/playerAddByGroup'
import { AppError } from '@utils/AppError'
import { playersGetByGroupAndTeam } from '@storage/players/playersGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDto'
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'
import { Loading } from '@components/Loading'

type Params = {
  route: {
    params: {
      group: string
    }
  }
}

export function Players({route} : NativeStackScreenProps<AppStackProps, 'players'>) {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [playerName, setPlayerName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const newPlayerInputRef = useRef<TextInput>(null)

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam = await playersGetByGroupAndTeam(route.params.group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAddPlayer() {
    if (playerName.trim().length === 0) {
      return Alert.alert("Informe o nome");
    } 
    try {
      await playerAddByGroup({
        name: playerName,
        team
      }, route.params.group)
      newPlayerInputRef.current.blur()
      fetchPlayersByTeam()
      setPlayerName('')
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert(error.message)
      }
      console.log(error)
    }
  }

  async function playerHandleRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, route.params.group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error);
    }    
  }

  const navigation = useNavigation()

  async function groupRemove() {
    try {
      await groupRemoveByName(route.params.group)
      navigation.navigate('groups')
    }
    catch (error) {
      console.log(error);
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover", "Deseja remover", [{
      text: "Cancelar",
      onPress: () => console.log("Cancel Pressed"),
    },
    {
    text: "Sim",
    onPress: () => {
      groupRemove()
    }
    }])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={route.params.group}
        subtitle='Adicione a galera e separe os times'
      />
      <Form>
        <Input onSubmitEditing={handleAddPlayer} returnKeyType='done' inputRef={newPlayerInputRef} placeholder='Nome da pessoa' autoCorrect={false} value={playerName} onChangeText={setPlayerName} />
        <ButtonIcon icon='add' onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
      <FlatList
        horizontal
        data={['Time A', 'Time B']}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Filter
            title={item}
            isActive={item === team}
            onPress={() => setTeam(item)}
          />
        )}
        />
      <NumberOfPlayers>
          {players.length}
      </NumberOfPlayers>
      </HeaderList>

      {isLoading ? <Loading /> : (
        <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <PlayerCard
            name={item.name}
            onRemove={() => playerHandleRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message='Não há pessoas nesse time'
          />
        )}
        contentContainerStyle={{
          paddingBottom: 10,
          flex: players.length === 0 && 1
        }}
      />
      )}
      <Button title='Remover Turma' type='SECONDARY' onPress={handleGroupRemove} />
    </Container>
  )
}
