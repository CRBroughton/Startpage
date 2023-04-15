<script lang="ts">
  import { Button, Input } from 'flowbite-svelte'
  import { usePocketBase } from '../store/pocketbase'

  const { pb, getBookmarks } = usePocketBase()

  export let visible: boolean = false
  let url: string = ''
  let description: string = ''
  let category: string = ''

  $: canCreate = url.length > 0 && description.length > 0 && category.length > 0

  const create = async () => {
    await pb.collection('bookmarks').create({
      url,
      owner: pb.authStore.model.id,
      category,
      value: description
    })

    url = ''
    description = ''
    category = ''

    await getBookmarks()
  }
</script>

{#if visible}
  <div class="absolute bottom-6">
    <div class="flex flex-col md:flex-row gap-2">
      <Input bind:value={url} placeholder="URL" required />
      <Input bind:value={description} placeholder="Description" required />
      <Input bind:value={category} placeholder="Category" required />
      <Button disabled={!canCreate} color="light" on:click={() => create()}>Create</Button>
    </div>
  </div>
{/if}
