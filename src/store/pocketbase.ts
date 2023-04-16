import PocketBase from 'pocketbase'
import { get, writable } from 'svelte/store'
import type { BookmarksRecord, FlagsRecord, ServicesRecord } from '../pocketbase-types'

export const isError = (err: unknown): err is Error => err instanceof Error

interface healthCheckResponse {
    code: number
    message: string
}

export let bookmarks = writable<BookmarksRecord[]>([])
export let categories = writable<string[]>([])
export let services = writable<ServicesRecord[]>([])
export let username = writable<string>('')
export let password = writable<string>('')
export let passwordConfirm = writable<string>('')
export let health = writable<Partial<healthCheckResponse>>({})

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL)

const user = writable(pb.authStore.model)

export const usePocketBase = () => {

    pb.authStore.onChange(() => {
        user.set(pb.authStore.model)
    })

    const clearUserAuth = () => {
        username.set('')
        password.set('')
        passwordConfirm.set('')
    }

    const getHealth = async () => {
        try {
            const response = await pb.health.check()
            health.set(response)
        } catch (error) {
            throw new Error(error)
        }
    }

    const logout = () => {
        pb.authStore.clear()
        clearUserAuth()
    }

    const login = async (callback: () => void) => {
        try {
            await pb.collection('users').authWithPassword(get(username), get(password))
            clearUserAuth()
        } catch (error) {
            if (isError(error)) {
                callback()
            }
        }
    }

    const refresh = async () => {
        try {
            await pb.collection('users').authRefresh()
        } catch (error) {
            if (isError(error)) {
                logout()
                // eslint-disable-next-line no-console
                console.log(error)
            }
        }
    }

    const canCreateAccounts = async () => {
        try {
            const test = await pb.collection('flags').getFullList<FlagsRecord>()
            return test[0].canCreateAccounts
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    }

    const getBookmarks = async () => {
        try {
            const response = await pb.collection('bookmarks').getFullList<BookmarksRecord>()

            bookmarks.set(response.sort((a, b) => a.value.localeCompare(b.value)))

            response.forEach((bookmark) => {
                if (get(categories).includes(bookmark.category)) return
                categories.update((state) => [...state, bookmark.category])
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    }

    const getServices = async () => {
        try {
            const response = await pb.collection('services').getFullList<ServicesRecord>()

            services.set(response)

        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    }

    return {
        pb,
        user,
        getHealth,
        logout,
        login,
        refresh,
        canCreateAccounts,
        getBookmarks,
        getServices
    }
}
