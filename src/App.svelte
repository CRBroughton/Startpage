<script lang="ts">
  import AuthForm from './lib/AuthForm.svelte'
  import { usePocketBase } from './store/pocketbase'
  import AuthHeading from './lib/AuthHeading.svelte'
  import MenuButton from './lib/Menu.svelte'
  import Health from './lib/Health.svelte'
  import { onMount } from 'svelte'
  import Toast from './lib/Toast.svelte'
  import Bookmarks from './lib/Bookmarks.svelte'
  import CreateBookmark from './lib/CreateBookmark.svelte'
  import { visible } from './store/CreateBookmark'
  import Services from './lib/Services.svelte'

  const { pb, user, refresh } = usePocketBase()

  onMount(() => {
    if (pb.authStore.token) {
      refresh()
    }
  })
</script>

<main class="w-screen h-screen bg-slate-200">
  {#if $user}
    <Services />
    <MenuButton />
    <div class="p-4 flex flex-col justify-center items-center w-full h-full bg-slate-200">
      <Bookmarks />
      <CreateBookmark visible={$visible} />
    </div>
  {:else}
    <div class="p-4 flex flex-col justify-center items-center w-screen h-screen bg-slate-200">
      <AuthHeading />
      <AuthForm />
    </div>
    <Toast error="Failed to login" />
  {/if}
  <Health />
</main>
