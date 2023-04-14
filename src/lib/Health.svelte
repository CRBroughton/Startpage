<script lang="ts">
  import { onMount } from 'svelte'
  import { usePocketBase } from '../store/pocketbase'
  import { Indicator } from 'flowbite-svelte'
  import { writable } from 'svelte/store'

  const { pb } = usePocketBase()

  interface healthCheckResponse {
    code: number
    message: string
  }

  let health = writable<Partial<healthCheckResponse>>({})

  onMount(() => {
    getHealth()
  })

  const getHealth = async () => {
    try {
      const response = await pb.health.check()
      health.set(response)
    } catch (error) {
      throw new Error(error)
    }
  }
</script>

<div class="absolute bottom-2 left-2 p-2 rounded-3xl bg-slate-100 text-gray-500">
  {#if $health.code === 200}
    <span class="flex flex-row items-center gap-2 text-sm"
      ><Indicator color="green" />Server running</span
    >
  {:else}
    <span class="flex flex-row items-center gap-2 text-sm"
      ><Indicator color="red" />Server not responding</span
    >
  {/if}
</div>
