<script lang="ts">
  import { Input } from 'flowbite-svelte'

  export let visible: boolean = false
</script>

{#if visible}
  <div class="absolute bottom-6">
    <div class="flex flex-col md:flex-row gap-2">
      <Input placeholder="URL" required />
      <Input placeholder="Description" required />
    </div>
  </div>
{/if}
