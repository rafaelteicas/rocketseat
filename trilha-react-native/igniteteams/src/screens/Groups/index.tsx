import { Header } from '@components/Header';
import { Container, Title } from './styles';
import { Highlight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListyEmpty';
import { Button } from '@components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';

type RootParamList = {
  groups: undefined;
  new: undefined;
  players: {
    group: string;
  }
}

export function Groups() {
  const [groups, setGroups] = useState([''])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()
  
  function handleNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group: string) { 
    navigation.navigate('players', {
      group
    })
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) { 
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
  },[]))


  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='Jogue com a sua turma' />
      {isLoading ? <Loading /> : (
        <FlatList
        showsVerticalScrollIndicator={false}
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma" />}
      />
      )}
      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}
