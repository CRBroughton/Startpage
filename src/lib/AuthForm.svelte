<script lang="ts">
  import { Input, Label, Button } from 'flowbite-svelte'
  import { usePocketBase, password, username, passwordConfirm } from '../store/pocketbase'
  import { counter, showErrorToast } from '../store/Toast'
  import { onMount } from 'svelte'

  const { pb, login, canCreateAccounts } = usePocketBase()

  let create: boolean = false
  let canCreateAccount: boolean = false

  onMount(async () => (canCreateAccount = await canCreateAccounts()))

  const createUser = async () => {
    if (!canCreateAccount) return
    await pb.collection('users').create({
      username: $username,
      password: $password,
      passwordConfirm: $passwordConfirm
    })
    await login(() => trigger())
  }

  function trigger() {
    showErrorToast.set(true)
    if ($counter >= 6) timeout()
  }

  function timeout() {
    if (--$counter > 0) return setTimeout(timeout, 1000)
    showErrorToast.set(false)
    counter.set(6)
  }
</script>

<form class="p-6 w-full md:w-96 bg-white rounded-xl" on:submit|preventDefault>
  <div class="grid gap-6 mb-6 grid-cols-1">
    <div>
      <Label for="first_name" class="mb-2">Username</Label>
      <Input
        bind:value={$username}
        type="text"
        id="first_name"
        placeholder="Your username..."
        required
      />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input
        bind:value={$password}
        type="password"
        id="password"
        placeholder="•••••••••"
        required
      />
    </div>
    {#if create}
      <div class="mb-6">
        <Label for="confirm_password" class="mb-2">Confirm password</Label>
        <Input
          bind:value={$passwordConfirm}
          type="password"
          id="confirm_password"
          placeholder="•••••••••"
          required
        />
      </div>
    {/if}
    {#if !create}
      <Button type="submit" on:click={() => login(() => trigger())}>Login</Button>
      {#if canCreateAccount}
        <Button on:click={() => (create = true)}>Create new user</Button>
      {/if}
    {:else}
      <Button on:click={() => createUser()}>Create account</Button>
      <Button on:click={() => (create = false)}>Back</Button>
    {/if}
  </div>
</form>
