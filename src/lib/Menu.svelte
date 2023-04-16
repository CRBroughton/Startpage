<script lang="ts">
  import { get } from 'svelte/store'
  import { visible } from '../store/CreateBookmark'
  import { usePocketBase } from '../store/pocketbase'

  const { user, logout } = usePocketBase()

  let open: boolean = false
</script>

<div class="fixed bottom-3 right-3 group">
  <div id="speed-dial-menu-text-outside-button-square" class="flex flex-col items-center space-y-2">
    {#if !open}
      <button
        on:click={() => (open = !open)}
        type="button"
        class="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6 mx-auto mt-px"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    {/if}
    {#if open}
      <button
        on:click={() => visible.set(!$visible)}
        type="button"
        class="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6 mx-auto mt-px"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-14 top-1/2"
          >Create</span
        >
      </button>
      {#if get(user).canCreateServices}
        <button
          type="button"
          class="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
        >
          <svg
            aria-hidden="true"
            class="w-6 h-6 mx-auto mt-px"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span
            class="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-[104px] top-1/2"
            >Create service</span
          >
        </button>
      {/if}
      <button
        on:click={() => logout()}
        type="button"
        class="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
      >
        <svg
          class="w-6 h-6 mx-auto mt-px"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-14 top-1/2"
          >Logout</span
        >
      </button>
      <button
        on:click={() => (open = !open)}
        type="button"
        class="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
      >
        <svg
          class="w-6 h-6 mx-auto mt-px"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-12 top-1/2"
          >Close</span
        >
      </button>
    {/if}
  </div>
</div>
