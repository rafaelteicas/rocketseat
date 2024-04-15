import React, { useRef } from 'react'
import MapView, {
  LatLng,
  Marker,
  Polyline,
  MapViewProps,
  PROVIDER_GOOGLE,
} from 'react-native-maps'
import { IconBox } from '../IconBox'
import { Car, FlagCheckered } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

type Props = MapViewProps & {
  coordinates: LatLng[]
}

export function Map({ coordinates, ...rest }: Props) {
  const mapRef = useRef<MapView>()
  const theme = useTheme()

  const lastCoordinates = coordinates[coordinates.length - 1]

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      mapRef.current.fitToSuppliedMarkers(['departure', 'arrival'], {
        edgePadding: { bottom: 50, left: 50, right: 50, top: 50 },
      })
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: 200 }}
      region={{
        latitude: lastCoordinates.latitude,
        longitude: lastCoordinates.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox size="SMALL" icon={Car} />
      </Marker>
      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinates}>
            <IconBox size="SMALL" icon={FlagCheckered} />
          </Marker>
          <Polyline
            coordinates={[...coordinates]}
            strokeColor={theme.COLORS.GRAY_700}
            strokeWidth={7}
          />
        </>
      )}
    </MapView>
  )
}
