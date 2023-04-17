<script lang="ts">
  import { get } from 'svelte/store'
  import { visible } from '../store/CreateBookmark'
  import { usePocketBase } from '../store/pocketbase'
  import { userMenuVisible } from '../store/UserMenu'

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
        on:click={() => ($userMenuVisible = !$userMenuVisible)}
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
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span
          class="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-[5.3rem] top-1/2"
          >User menu</span
        >
      </button>
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
