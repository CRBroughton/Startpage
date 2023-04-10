<script>
  import { Toast } from 'flowbite-svelte'
  import { fly } from 'svelte/transition'
  import { showErrorToast } from '../store/Toast'
</script>

<div class="absolute bottom-3 right-3 flex gap-10">
  <Toast color="red" simple transition={fly} params={{ x: 200 }} bind:open={$showErrorToast}>
    <svelte:fragment slot="icon">
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        /></svg
      >
      <span class="sr-only">Error icon</span>
    </svelte:fragment>
    Failed to login
  </Toast>
</div>
