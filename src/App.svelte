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
  import UserMenu from './lib/UserMenu.svelte'
  import { userMenuVisible } from './store/UserMenu'
  import { Color, ColorInput } from 'color-picker-svelte'
  import { get } from 'svelte/store'
  import { Button } from 'flowbite-svelte'

  const { pb, user, refresh, setUserPreferences } = usePocketBase()

  let color = new Color(get(user).bgColour || '#ffffff')

  $: useBackgroundColour = color.toHex8String()

  onMount(() => {
    if (pb.authStore.token) {
      refresh()
    }
  })
</script>

<main class="w-screen h-screen" style="background-color: {useBackgroundColour}">
  {#if $user}
    {#if $userMenuVisible}
      <UserMenu>
        <ColorInput bind:color title="BG Colour" />
        <div slot="footer">
          <Button on:click={() => setUserPreferences(useBackgroundColour)}>Save</Button>
        </div>
      </UserMenu>
    {/if}
    <Services />

    <MenuButton />
    <div
      class="p-4 flex flex-col justify-center items-center w-full h-full"
      style="background-color: {useBackgroundColour}"
    >
      <Bookmarks />
      <CreateBookmark visible={$visible} />
    </div>
  {:else}
    <div
      class="p-4 flex flex-col justify-center items-center w-screen h-screen"
      style="background-color: {useBackgroundColour}"
    >
      <AuthHeading />
      <AuthForm />
    </div>
    <Toast error="Failed to login" />
  {/if}
  <Health />
</main>
