import React, { useEffect, useState } from 'react'
import { HomeHeader } from '../../components/HomeHeader'
import { Container, Content, Label, Title } from './styles'
import { CarStatus } from '../../components/CarStatus'
import { useNavigation } from '@react-navigation/native'
import { useQuery, useUser } from '@realm/react'
import { Historic } from '../../libs/realm/schemas/Historic'
import { useRealm } from '../../libs/realm'
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard'
import dayjs from 'dayjs'
import { FlatList } from 'react-native'
import {
  getLastAsyncTimestamp,
  saveLastSyncTimestamp,
} from '../../libs/asyncStorage/syncstorage'
import Toast from 'react-native-toast-message'
import { TopMessage } from '../../components/TopMessage'
import { CloudArrowUp } from 'phosphor-react-native'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    [],
  )
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null)

  const { navigate } = useNavigation()

  const realm = useRealm()
  const historic = useQuery(Historic)
  const user = useUser()

  function handleRegisterMovement() {
    if (vehicleInUse._id) {
      navigate('Arrival', {
        id: vehicleInUse._id.toString(),
      })
    } else {
      navigate('Departure')
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (e) {
      console.log(e)
    }
  }

  async function fetchHistoric() {
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )

      const lastSync = await getLastAsyncTimestamp()

      const formattedHistoric = response.map((item) => {
        return {
          id: item._id!.toString(),
          licensePlate: item.license_plate,
          isSync: lastSync > item.updated_at.getTime(),
          created: dayjs(item.created_at).format(
            '[Saída em] DD/MM/YYY [às] HH:mm',
          ),
        }
      })
      setVehicleHistoric(formattedHistoric)
    } catch (error) {
      console.log(error)
    }
  }

  function handleHistoricDetails(id: string) {
    navigate('Arrival', {
      id,
    })
  }

  async function progressNotification(
    transferred: number,
    transferable: number,
  ) {
    const percentage = (transferred / transferable) * 100

    if (percentage === 100) {
      await saveLastSyncTimestamp()
      fetchHistoric()
      setPercentageToSync(null)
      Toast.show({
        text1: 'Histórico atualizado com sucesso',
        text2: '',
        type: 'success',
        position: 'bottom',
        autoHide: true,
      })
    }

    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado`)
    }
  }

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  useEffect(() => {
    fetchVehicleInUse()
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse)
      }
    }
  }, [])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects('Historic')
        .filtered(`user_id = ${user!.id}`)
      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' })
    })
  }, [realm])

  useEffect(() => {
    const syncSession = realm.syncSession
    if (!syncSession) {
      return
    }
    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification,
    )

    return () => syncSession.removeProgressNotification(progressNotification)
  }, [])

  return (
    <Container>
      {percentageToSync && (
        <TopMessage title={percentageToSync} icon={CloudArrowUp} />
      )}

      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse.license_plate}
          onPress={handleRegisterMovement}
        />

        <Title>Histórico</Title>
        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          ListEmptyComponent={<Label>Nenhum registro</Label>}
        />
      </Content>
    </Container>
  )
}
