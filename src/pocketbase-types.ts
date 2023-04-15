/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Bookmarks = "bookmarks",
	Flags = "flags",
	Services = "services",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type BookmarksRecord = {
	url?: string
	owner?: RecordIdString
	category?: string
	value?: string
}

export type FlagsRecord = {
	canCreateAccounts?: boolean
}

export type ServicesRecord = {
	url?: string
	value?: string
	field?: RecordIdString[]
}

export type UsersRecord = {
	name?: string
	avatar?: string
	canCreateServices?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type BookmarksResponse<Texpand = unknown> = BookmarksRecord & BaseSystemFields<Texpand>
export type FlagsResponse = FlagsRecord & BaseSystemFields
export type ServicesResponse<Texpand = unknown> = ServicesRecord & BaseSystemFields<Texpand>
export type UsersResponse = UsersRecord & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	bookmarks: BookmarksRecord
	flags: FlagsRecord
	services: ServicesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	bookmarks: BookmarksResponse
	flags: FlagsResponse
	services: ServicesResponse
	users: UsersResponse
}