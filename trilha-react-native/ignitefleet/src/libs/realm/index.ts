import { Realm, createRealmContext } from '@realm/react'
import { Historic } from './schemas/Historic'
import { Coords } from './schemas/Coords'

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
}

export const syncConfig: Partial<Realm.SyncConfiguration> = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
}

export const { RealmProvider, useObject, useQuery, useRealm } =
  createRealmContext({
    // @ts-ignore
    schema: [Historic, Coords],
  })
