<script lang="ts">
  import { onMount } from 'svelte'
  import { pb } from './pocketbase'
  import { Card } from 'flowbite-svelte'

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

  let bookmarks: Bookmark[] = []

  const handleResponse = async () => {
    const response = await pb.collection('bookmarks').getFullList<Bookmark>()

    bookmarks = response
  }

  onMount(async () => handleResponse())
</script>

<div class="flex flex-col gap-2">
  {#each bookmarks as bookmark}
    <Card href={bookmark.url}>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {bookmark.value}
      </h5>
    </Card>
  {/each}
</div>
