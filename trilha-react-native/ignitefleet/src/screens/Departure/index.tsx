import React, { useEffect, useRef, useState } from 'react'
import { Container, Content, Message } from './styles'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import { Button } from '../../components/Button'
import { Alert, ScrollView, TextInput } from 'react-native'
import { licensePlateValidate } from '../../utils/licensePlateValidate'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { useUser } from '@realm/react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  LocationAccuracy,
  LocationObjectCoords,
  LocationSubscription,
  useForegroundPermissions,
  watchPositionAsync,
  requestBackgroundPermissionsAsync,
} from 'expo-location'
import { getAddressLocation } from '../../utils/getAddressLocation'
import Loading from '../../components/Loading'
import { LocationInfo } from '../../components/LocationInfo'
import { Car } from 'phosphor-react-native'
import { Map } from '../../components/Map'
import { startLocationTask } from '../../tasks/BackgroundLocationTask'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [currentCoords, setCurrentCoords] =
    useState<LocationObjectCoords | null>(null)

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions()

  const { goBack } = useNavigation()

  const realm = useRealm()
  const user = useUser()

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  async function handleDepartureRegister() {
    try {
      setIsRegistering(true)
      const backgroundPermissions = await requestBackgroundPermissionsAsync()

      if (!backgroundPermissions.granted) {
        setIsRegistering(false)
        return Alert.alert(
          'Localização',
          'É necessário que o app tenha acesso a localização',
        )
      }

      await startLocationTask()

      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current.focus()
        return Alert.alert(
          'Placa inválida',
          'A placa é inválida, por favor informe a placa correta do veículo',
        )
      }

      if (description.trim().length === 0) {
        descriptionRef.current.focus()
        return Alert.alert(
          'Finalidade',
          'Por favor informe a finalidade da utilização do veículo',
        )
      }
      if (!currentCoords.latitude || !currentCoords.longitude) {
        return Alert.alert('Localização')
      }

      realm.write(() =>
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user.id,
            description,
            coords: [
              {
                latitude: currentCoords.latitude,
                longitude: currentCoords.longitude,
                timestamp: new Date().getTime(),
              },
            ],
            license_plate: licensePlate.toUpperCase(),
          }),
        ),
      )

      Alert.alert('Saída', 'Saída com sucesso')

      goBack()
    } catch (e) {
      console.log(e)
      Alert.alert('Erro', 'Não foi possível')
      setIsRegistering(false)
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission()
  }, [])

  useEffect(() => {
    if (!locationForegroundPermission.granted) {
      return
    }

    let subscription: LocationSubscription

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      (location) => {
        setCurrentCoords(location.coords)
        getAddressLocation(location.coords)
          .then((address) => {
            if (address) {
              setCurrentAddress(address)
            }
          })
          .finally(() => setIsLoadingLocation(false))
      },
    ).then((response) => {
      subscription = response
    })

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [locationForegroundPermission.granted])

  if (isLoadingLocation) {
    return <Loading />
  }

  if (!locationForegroundPermission.granted) {
    return (
      <Container>
        <Header title="Saída" />
        <Message>
          Você precisa permitir que o aplicativo tenha acesso a localização
        </Message>
      </Container>
    )
  }

  return (
    <Container>
      <Header title="Departure" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          {currentCoords && <Map coordinates={[currentCoords]} />}
          <Content>
            {currentAddress && (
              <LocationInfo
                icon={Car}
                label="Localização atual"
                description={currentAddress}
              />
            )}
            <LicensePlateInput
              value={licensePlate}
              onChangeText={setLicensePlate}
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current.focus()}
              returnKeyType="next"
            />

            <TextAreaInput
              value={description}
              onChangeText={setDescription}
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
            />

            <Button
              isLoading={isRegistering}
              title="Registrar saída"
              onPress={handleDepartureRegister}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  )
}
