<script lang="ts">
  import { onMount } from 'svelte'
  import { bookmarks, categories, usePocketBase } from '../store/pocketbase'
  import { A, P, Toast } from 'flowbite-svelte'

  const { getBookmarks } = usePocketBase()

  $: filteredCategory = (category: string) =>
    $bookmarks.filter((bookmark) => bookmark.category === category)

  onMount(async () => getBookmarks())
</script>

<div class="grid md:grid-cols-3 gap-2 w-screen md:max-w-7xl h-3/4 p-2 overflow-auto">
  {#each $categories.sort() as category}
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
