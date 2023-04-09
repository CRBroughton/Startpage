<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import AuthForm from './lib/AuthForm.svelte'
  import { pb, user } from './lib/pocketbase'

  const logout = () => {
    pb.authStore.clear()
  }
</script>

<main>
  {#if $user}
    You are logged in
    <Button on:click={() => logout()}>LOGOUT</Button>
  {:else}
    <div class="flex justify-center items-center w-screen h-screen bg-slate-200">
      <AuthForm />
    </div>
  {/if}
</main>
