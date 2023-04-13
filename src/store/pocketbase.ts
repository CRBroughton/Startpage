import PocketBase from 'pocketbase'
import { get, writable } from 'svelte/store'

export const pb = new PocketBase('http://127.0.0.1:8090')

export const logout = () => {
    pb.authStore.clear()
}

export const isError = (err: unknown): err is Error => err instanceof Error

export const canCreateAccounts = async () => {
    try {
        const test = await pb.collection('flags').getFullList()
        return test[0].canCreateAccounts
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
    }
}

export const refresh = async () => {
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

interface Bookmark {
    category: string
    collectionId: string
    collectionName: string
    created: string | Date
    id: string
    owner: string
    updated: string | Date
    url: string
    value: string
}

interface Service {
    url: string
    value: string
}

export let bookmarks = writable<Bookmark[]>([])
export let categories = writable<string[]>([])
export let services = writable<Service[]>([])

export const handleResponse = async () => {
    const response = await pb.collection('bookmarks').getFullList<Bookmark>()

    bookmarks.set(response.sort((a, b) => a.value.localeCompare(b.value)))

    response.forEach((bookmark) => {
        if (get(categories).includes(bookmark.category)) return
        categories.update((state) => [...state, bookmark.category])
    })

}

export const user = writable(pb.authStore.model)

pb.authStore.onChange(() => {
    user.set(pb.authStore.model)
})

export const getServices = async () => {
    const response = await pb.collection('services').getFullList<Service>()

    services.set(response)

}