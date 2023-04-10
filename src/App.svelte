<script lang="ts">
  import AuthForm from './lib/AuthForm.svelte'
  import { user } from './lib/pocketbase'
  import AuthHeading from './lib/AuthHeading.svelte'
  import MenuButton from './lib/Menu.svelte'
  import Health from './lib/Health.svelte'
</script>

<main>
  {#if $user}
    <Health />
    <MenuButton />
    <div class="p-4 flex flex-col justify-center items-center w-screen h-screen bg-slate-200" />
  {:else}
    <div class="p-4 flex flex-col justify-center items-center w-screen h-screen bg-slate-200">
      <AuthHeading />
      <AuthForm />
    </div>
  {/if}
</main>
