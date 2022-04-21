<script lang="ts">
	import WorkspaceList from '../components/workspacelist.svelte';
	import Editor from '../components/editor.svelte';
	export let userName: string
	import Loading from './Loading.svelte'
	export let isLoading = false

	isLoading = true
	setTimeout(() => {
		isLoading = false
	}, 300);
</script>
{#if isLoading}
 <Loading/>
{:else}
	<div class="grid grid-cols-12 h-full w-full">
		<WorkspaceList userName={userName} />
		<div class="col-span-2" />
		<div class="col-span-8">
			<Editor />
		</div>
	</div>
{/if}