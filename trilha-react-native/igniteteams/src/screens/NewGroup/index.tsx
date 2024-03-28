import React, { useState } from 'react'
import { Container, Content, Icon } from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/HighLight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { Alert } from 'react-native'

export function NewGroup() {
  const navigation = useNavigation()
  const [group, setGroup] = useState('')

  async function handleNewGroup() {
    try {
      if (group.trim().length === 0) {
        return  Alert.alert('Novo grupo', 'Informe o grupo a ser cadastrado')
      }
      await groupCreate(group)
      navigation.navigate('players', {
        group
      })
    } catch (error) {
      if (error instanceof AppError) {
        console.log(error);
        
        Alert.alert(error.message)
      }
      console.log(error);
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title='Nova turma' subtitle='Crie a turma para adicionar as pessoas' />
        <Input onChangeText={setGroup} placeholder='Nome da turma' />
        <Button title='Criar' style={{marginTop: 20}} onPress={handleNewGroup} />
      </Content>
    </Container>
  )
}
