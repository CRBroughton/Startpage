<script lang="ts">
  import { onMount } from 'svelte'
  import { bookmarks, categories, handleResponse } from '../store/pocketbase'
  import { A, P, Toast } from 'flowbite-svelte'

  $: filteredCategory = (category: string) =>
    $bookmarks.filter((bookmark) => bookmark.category === category)

  onMount(async () => handleResponse())
</script>

<div class="grid md:grid-cols-3 gap-2 w-full md:max-w-4xl">
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
