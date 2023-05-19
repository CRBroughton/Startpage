import { Color } from "color-picker-svelte"
import { writable } from "svelte/store"

export const userMenuVisible = writable(false)
export const color = writable(new Color('#ffffff'))
