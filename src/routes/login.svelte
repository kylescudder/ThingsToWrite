<script lang="ts">
import { onMount } from 'svelte'
import { isLoading, at_id } from '../lib/stores'

	let client_id = process.env.CLIENT_ID
	let redirect_uri = process.env.REDIRECT_URI
	let api_url = process.env.API_URL
  let isLoadingValue: boolean;

	onMount(async () => {
   	isLoading.subscribe(value => {
      isLoadingValue = value;
    });
		isLoading.set(true)
		// After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      const requestData = {
        code: newUrl[1],
      };
      const apiURL = `${api_url}/authenticate`;
      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
					console.log(data)
          at_id.update(data)
        })
        .catch((error) => {
					isLoading.set(false)
          //setData({
          //  isLoading: false,
          //  errorMessage: "Sorry! Login failed: " + error,
          //});
        });
    }
    isLoading.set(false)
  });

</script>

<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src={markdownLogo} alt="Markdown Logo">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">ThingsToWrite</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				A convenient place to store all of your markdown notes.
      </p>
    </div>
    <form class="mt-8 space-y-6" action="#" method="POST">
      <div>
				{#if isLoadingValue}
					<div class="loader-container">
						<div class="loader"></div>
					</div>
        {:else}
					<a
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						href={`https://github.com/login/oauth/authorize?scope=user%20repo&client_id=${client_id}&redirect_uri=${redirect_uri}`}
					>
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<!-- Heroicon name: solid/lock-closed -->
							<i class="fa-solid fa-sign-in-alt text-indigo-500 group-hover:text-indigo-400">
						</span>
						Login with GitHub
					</a>
				{/if}
      </div>
    </form>
  </div>
</div>