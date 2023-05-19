<script lang="ts">
    import { Button, Input } from 'flowbite-svelte'
    import { usePocketBase } from '../store/pocketbase'

    const { pb, getServices } = usePocketBase()

    export let serviceFormVisible: boolean = false
    let url: string = ''
    let description: string = ''

    $: canCreate = url.length > 0 && description.length > 0

    const create = async () => {
      await pb.collection('services').create({
        url,
        owner: pb.authStore.model.id,
        value: description
      })

      url = ''
      description = ''

      await getServices()
    }
  </script>

  {#if serviceFormVisible}
    <div class="fixed bottom-6">
      <div class="flex flex-col md:flex-row gap-2">
        <Input bind:value={url} placeholder="URL" required />
        <Input bind:value={description} placeholder="Description" required />
        <Button disabled={!canCreate} color="light" on:click={() => create()}>Create</Button>
      </div>
    </div>
  {/if}
