# ChatVTFK
Dette er en Svelte frontend med Sveltekit.

## Hvordan begynne å utvikle og kjøre prosjektet lokalt 
1. Klon ned repoet.
2. Installer avhengigheter ved å kjøre kommandoen "npm i" i terminalen.
3. Lag en lokal .env fil som vist under.
4. Start prosjektet ved å kjøre "npm run dev" i terminalen.

## .ENV

|KEY|VALUE|
|:---:|:---:|
|PUBLIC_VITE_CLIENT_ISS|https://login.microsoftonline.com/|
|PUBLIC_VITE_CLIENT_ID|XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX|
|PUBLIC_VITE_REDIRECT_URI|http://localhost:5173/authenticated|
|PUBLIC_VITE_API_URL|http://localhost:7071/api|
|PUBLIC_VITE_API_SCOPE|api://XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX/user_impersonation|
|PUBLIC_VITE_WEB_URL|http://localhost:5173|

## Hosting
Siden er hostet på vercel, en versjon for test og en for prod.\
Test versjonen ligger under "preview"\
Du kan ikke pushe direkte på main branchen, den krever en pull request.\
Push til "prod-test" for å teste i et live miljø (https://chat-test.vtfk.no/)\
Merge en pull request til "main" for å publisere endrigene i prod (https://chat.vtfk.no/).