<script lang="ts">
  import { userMenuVisible } from '../store/UserMenu'
  import { Modal } from 'flowbite-svelte'
</script>

<Modal class="w-full h-[42rem]" title="Options" size="lg" padding="lg" bind:open={$userMenuVisible}>
  <div class="flex flex-col">
    <slot />
  </div>
  <svelte:fragment slot="footer">
    <slot name="footer" />
  </svelte:fragment>
</Modal>
