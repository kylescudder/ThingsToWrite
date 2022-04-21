<script>
	export let userName
</script>
<div class="col-span-2 bg-blue-500 h-full dark:bg-gray-300">
		<p class="text-lg text-white dark:text-gray-900">Welcome {userName}</p>
		<a href="/logout">
			<span class="absolute left-0 inset-y-0 flex items-center pl-3">
				<!-- Heroicon name: solid/lock-closed -->
				<i class="fa-solid fa-sign-out-alt text-indigo-500 group-hover:text-indigo-400" /></span
			>
			Logout
		</a>
	</div>