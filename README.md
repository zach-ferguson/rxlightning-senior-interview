# rxlightning-senior-interview

frontend:

&nbsp;&nbsp;cd frontend<br/>
&nbsp;&nbsp;npm i<br/>
&nbsp;&nbsp;npm start<br/>
<br/>
backend:<br/>
<br/>
&nbsp;&nbsp;cd backend/starter-api/src/Api<br/>
&nbsp;&nbsp;dotnet run<br/>

_________________________________________________________________

The routes are auth restricted via a hardcoded token.<br/>
In production we would use jwt or another token tool to generate and compare tokens.<br/>
There we could adjust settings like token duration.<br/>
We could store the jwt token in an http-only cookie to allow persistence over tabs and refreshing the window.<br/>
<br/><br/>
For protecting the patient ids, I decided to use aes encryption to obfuscate the ids to the client.<br/>
Without access to a database where I could generate & store unique, non-sensitive ids, this is the solution I came up with.<br/>
The server has the encryption key stored in appsettings.<br/>
In production it would need to be stored in more secure way, like an environemtn variable or in an encrypted json file.<br/>
Its not a perfect solution, but it would give an attacker much more work to access the ids.<br/>
