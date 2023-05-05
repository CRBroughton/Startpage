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
  import { Button, P } from 'flowbite-svelte'

  const { pb, user, refresh, setUserPreferences } = usePocketBase()

  let color = new Color(get(user) ? get(user).bgColour : '#e2e8f0')
  let bookmarkColour = new Color(get(user) ? get(user).buttonColour : '#f2f0f0')
  let textColour = new Color(get(user) ? get(user).textColour : '#3b3b3b')

  $: useBackgroundColour = color.toHex8String()
  $: useBookmarkBgColour = bookmarkColour.toHex8String()
  $: useTextColour = textColour.toHex8String()

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
        <div class="grid grid-flow-row md:grid-cols-2 gap-2 items-center">
          <P>Background Colour:</P>
          <ColorInput bind:color title="BG Colour" />
          <P>Bookmark Colour:</P>
          <ColorInput bind:color={bookmarkColour} title="BG Colour" />
          <P>Text Colour:</P>
          <ColorInput bind:color={textColour} title="Text Colour" />
        </div>
        <div slot="footer">
          <Button
            on:click={() =>
              setUserPreferences({
                bg: useBackgroundColour,
                buttonBg: useBookmarkBgColour,
                textColour: useTextColour,
              })}>Save</Button
          >
        </div>
      </UserMenu>
    {/if}
    <Services />

    <MenuButton />
    <div
      class="p-4 flex flex-col justify-center items-center w-full h-full"
      style="background-color: {useBackgroundColour}"
    >
      <Bookmarks bgColour={useBookmarkBgColour} textColour={useTextColour} />
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
