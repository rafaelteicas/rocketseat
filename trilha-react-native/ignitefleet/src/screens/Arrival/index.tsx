import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  AsyncMessage,
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { X } from 'phosphor-react-native'
import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { BSON } from 'realm'
import { Alert } from 'react-native'
import { getLastAsyncTimestamp } from '../../libs/asyncStorage/syncstorage'
import { stopLocationTask } from '../../tasks/BackgroundLocationTask'
import { getStorageLocation } from '../../libs/asyncStorage/locationStorage'
import { LatLng } from 'react-native-maps'
import { Map } from '../../components/Map'

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const [dataNotSync, setDataNotSync] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng[]>([])

  const { goBack } = useNavigation()
  const { params } = useRoute()
  const { id } = params as RouteParamsProps

  const realm = useRealm()
  const historic = useObject(Historic, new BSON.UUID(id).toString())

  const title = historic.status === 'arrival' ? 'Chegada' : 'Detalhes'

  function handleRemoveVehicleUsed() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo? ', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => removeVehicleUsage(),
      },
    ])
  }

  async function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })
    await stopLocationTask()
    goBack()
  }

  async function handleArriveRegister() {
    try {
      if (!historic) {
        Alert.alert('Erro')
      }

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
      })

      await stopLocationTask()

      Alert.alert('Chegada registrada com sucesso')
    } catch (err) {
      console.log(err)
      Alert.alert('Erro')
    }
  }

  async function getLocationsInfo() {
    if (!historic) {
      return
    }
    const lastSync = await getLastAsyncTimestamp()
    const updatedAt = historic.updated_at.getTime()
    setDataNotSync(updatedAt > lastSync)

    const locationStorage = await getStorageLocation()
    setCoordinates(locationStorage)
  }

  useEffect(() => {
    getLocationsInfo()
  }, [historic])

  return (
    <Container>
      <Header title={title} />
      {coordinates.length > 0 && <Map coordinates={coordinates} />}
      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic.license_plate}</LicensePlate>
        <Label>Finalidade</Label>
        <Description>{historic.description}</Description>
      </Content>
      {historic.status === 'departure' && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsed} />
          <Button title="Registrar chegada" onPress={handleArriveRegister} />
        </Footer>
      )}

      {dataNotSync && (
        <AsyncMessage>
          Sincronização da{' '}
          {historic.status === 'departure' ? 'partida' : 'chegada'} pendente.
        </AsyncMessage>
      )}
    </Container>
  )
}
