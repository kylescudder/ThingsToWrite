<script>
	import WorkspaceList from './workspacelist.svelte';
	import Editor from './editor.svelte';
	export let userName
</script>

<div class="grid grid-cols-12 h-full w-full">
	<WorkspaceList userName={userName} />
	<div class="col-span-2" />
	<div class="col-span-8">
		<Editor />
	</div>
</div>
