export type CoordsSchemaProps = {
  latitude: number
  longitude: number
  timestamp: number
}

// eslint-disable-next-line no-use-before-define
export class Coords extends Realm.Object<Coords> {
  latitude: number
  longitude: number
  timestamp: number

  static generate({ latitude, longitude, timestamp }: CoordsSchemaProps) {
    return {
      latitude,
      longitude,
      timestamp,
    }
  }

  static schema = {
    name: 'Coords',
    embedded: true,
    properties: {
      latitude: 'float',
      longitude: 'float',
      timestamp: 'float',
    },
  }
}
