import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'

export const pb = new PocketBase('http://127.0.0.1:8090')

export const logout = () => {
    pb.authStore.clear()
}

export const isError = (err: unknown): err is Error => err instanceof Error

export const refresh = async () => {
    try {
        await pb.collection('users').authRefresh()
    } catch (error) {
        if (isError(error)) {
            logout()
            console.log(error)
        }
    }
}

export const user = writable(pb.authStore.model)

pb.authStore.onChange(() => {
    user.set(pb.authStore.model)
})

