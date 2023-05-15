<script lang="ts">
  import { onMount } from 'svelte'
  import { usePocketBase, services } from '../store/pocketbase'
  import { A, Toast, P } from 'flowbite-svelte'

  export let bgColour: string = ''
  export let textColour: string = ''

  const { getServices } = usePocketBase()

  onMount(async () => await getServices())
</script>

<div class="fixed top-2 px-2 w-full flex gap-2 overflow-auto">
  {#each $services.sort((a, b) => a.value.localeCompare(b.value)) as service}
    <A class="w-full" href={service.url}>
      <Toast class="min-w-full" style="background-color: {bgColour}" simple={true}>
        <P style="color: {textColour}">{service.value}</P>
      </Toast>
    </A>
  {/each}
</div>
