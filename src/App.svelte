<script lang="ts">
  import AuthForm from './lib/AuthForm.svelte'
  import { pb, refresh, user } from './lib/pocketbase'
  import AuthHeading from './lib/AuthHeading.svelte'
  import MenuButton from './lib/Menu.svelte'
  import Health from './lib/Health.svelte'
  import { onMount } from 'svelte'
  import Toast from './lib/Toast.svelte'

  onMount(() => {
    if (pb.authStore.token) {
      refresh()
    }
  })
</script>

<main>
  {#if $user}
    <MenuButton />
    <div class="p-4 flex flex-col justify-center items-center w-screen h-screen bg-slate-200" />
  {:else}
    <div class="p-4 flex flex-col justify-center items-center w-screen h-screen bg-slate-200">
      <AuthHeading />
      <AuthForm />
    </div>
    <Toast error="Failed to login" />
  {/if}
  <Health />
</main>
