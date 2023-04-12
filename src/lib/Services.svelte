<script>
  import { onMount } from 'svelte'
  import { getServices, services } from '../store/pocketbase'
  import { A, Toast, P } from 'flowbite-svelte'

  onMount(async () => await getServices())
</script>

<div class="absolute top-2 left-2 flex gap-2">
  {#each $services as service}
    <A href={service.url}>
      <Toast class="min-w-full" simple={true}>
        <P>{service.value}</P>
      </Toast>
    </A>
  {/each}
</div>
