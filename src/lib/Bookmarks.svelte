<script lang="ts">
  import { onMount } from 'svelte'
  import { pb } from './pocketbase'
  import { A, P, Toast } from 'flowbite-svelte'

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

<div class="grid md:grid-cols-3 gap-2 w-full md:max-w-4xl">
  {#each categories.sort() as category}
    <div class="flex flex-col gap-2 w-full">
      <p>{category}</p>
      {#each filteredCategory(category) as bookmark}
        <A href={bookmark.url}>
          <Toast class="min-w-full" simple={true}>
            <P>{bookmark.value}</P>
          </Toast>
        </A>
      {/each}
    </div>
  {/each}
</div>
