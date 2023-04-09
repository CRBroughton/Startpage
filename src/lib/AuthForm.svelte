<script lang="ts">
  import { Input, Label, Button } from 'flowbite-svelte'

  let create: boolean = false
</script>

<form class="m-4 p-6 w-full md:w-96 bg-white rounded-xl">
  <div class="grid gap-6 mb-6 grid-cols-1">
    <div>
      <Label for="first_name" class="mb-2">Username</Label>
      <Input type="text" id="first_name" placeholder="Your username..." required />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input type="password" id="password" placeholder="•••••••••" required />
    </div>
    {#if create}
      <div class="mb-6">
        <Label for="confirm_password" class="mb-2">Confirm password</Label>
        <Input type="password" id="confirm_password" placeholder="•••••••••" required />
      </div>
    {/if}
    <Button type="submit">Login</Button>
    {#if create}
      <Button type="submit" on:click={() => (create = false)}>Back</Button>
    {:else}
      <Button type="submit" on:click={() => (create = true)}>Create account</Button>
    {/if}
  </div>
</form>
