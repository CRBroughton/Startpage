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
  let categories: string[] = []

  const handleResponse = async () => {
    const response = await pb.collection('bookmarks').getFullList<Bookmark>()

    bookmarks = response
    bookmarks = response.sort((a, b) => a.value.localeCompare(b.value))

    response.forEach((bookmark) => {
      if (categories.includes(bookmark.category)) return
      categories = [...categories, bookmark.category]
    })
  }

  const filteredCategory = (category: string) =>
    bookmarks.filter((bookmark) => bookmark.category === category)

  onMount(async () => handleResponse())
</script>

<div class="flex flex-col gap-2">
  {#each categories.sort() as category}
    <p>{category}</p>
    {#each filteredCategory(category) as bookmark}
      <Card href={bookmark.url}>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {bookmark.value}
        </h5>
      </Card>
    {/each}
  {/each}
</div>
