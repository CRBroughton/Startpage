<script lang="ts">
  import { onMount } from 'svelte'
  import { bookmarks, categories, usePocketBase } from '../store/pocketbase'
  import { A, Button, P, Toast } from 'flowbite-svelte'
  import DeleteModal from './DeleteModal.svelte'
  import { deleteModalVisible } from '../store/DeleteModal'

  const { getBookmarks } = usePocketBase()

  $: filteredCategory = (category: string) =>
    $bookmarks.filter((bookmark) => bookmark.category === category)

  let bookmarkModalID: string = ''

  const showDeleteModal = (id: string) => {
    $deleteModalVisible = !$deleteModalVisible
    bookmarkModalID = id
  }

  onMount(async () => getBookmarks())
</script>

<div class="grid md:grid-cols-3 gap-2 w-screen md:max-w-7xl h-3/4 p-2 overflow-auto">
  <DeleteModal id={bookmarkModalID} />
  <div class="absolute top-1/2" />
  {#each $categories.sort() as category}
    <div class="flex flex-col gap-2 w-full">
      <p>{category}</p>
      {#each filteredCategory(category) as bookmark}
        <div>
          <Toast class="min-w-full" simple={true}>
            <div class="flex items-center">
              <A href={bookmark.url}>
                <P>{bookmark.value}</P>
              </A>
              <Button
                outline={true}
                color="light"
                class="!p-2 ml-auto"
                on:click={() => showDeleteModal(bookmark.id)}
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </Toast>
        </div>
      {/each}
    </div>
  {/each}
</div>
