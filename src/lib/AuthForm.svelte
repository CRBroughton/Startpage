<script lang="ts">
  import { Input, Label, Button } from 'flowbite-svelte'
  import { isError, pb } from './pocketbase'
  import { counter, showErrorToast } from '../store/Toast'

  let create: boolean = false

  let username: string = ''
  let password: string = ''
  let passwordConfirm: string = ''

  const login = async () => {
    try {
      await pb.collection('users').authWithPassword(username, password)
    } catch (error) {
      if (isError(error)) {
        trigger()
      }
    }
  }

  const createUser = async () => {
    await pb.collection('users').create({
      username,
      password,
      passwordConfirm
    })
    await login()
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
        bind:value={username}
        type="text"
        id="first_name"
        placeholder="Your username..."
        required
      />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input bind:value={password} type="password" id="password" placeholder="•••••••••" required />
    </div>
    {#if create}
      <div class="mb-6">
        <Label for="confirm_password" class="mb-2">Confirm password</Label>
        <Input
          bind:value={passwordConfirm}
          type="password"
          id="confirm_password"
          placeholder="•••••••••"
          required
        />
      </div>
    {/if}
    {#if !create}
      <Button type="submit" on:click={() => login()}>Login</Button>
      <Button on:click={() => (create = true)}>Create new user</Button>
    {:else}
      <Button on:click={() => createUser()}>Create account</Button>
      <Button on:click={() => (create = false)}>Back</Button>
    {/if}
  </div>
</form>
