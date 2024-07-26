import { getKey } from "@/lib/actions/restapi.actions";
import {Code} from './code'
import AuthToken from '@/components/auth-token'
const HOSTNAME = process.env.HOSTNAME

const DocsPage = () => {

  const key = getKey()

  return (
    <main className="p-8 flex flex-col gap-8 flex-wrap w-[100vw] lg:w-full">
      <h1 className="text-3xl font-bold">API Documentation: Fetching Transactions</h1>
      <div className="flex flex-col gap-2">
        <p className="text-secondary-foreground">Welcome to the API documentation for fetching transactions. This guide will help you understand how to retrieve your transaction list using the GET request to the following endpoint:</p>
        <Code code={hostName}/>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">API Documentation: Fetching Transactions</h2>
        <p className="text-secondary-foreground">To access the transactions, you must provide your authentication token in the Authorization header of your request. Make sure to replace YOUR_AUTH_TOKEN with your actual authentication token.</p>
        <AuthToken token={key}/>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Request Example</h2>
        <h3 className="text-lg font-semibold">Using fetch()</h3>
        <p className="text-secondary-foreground">Here's how you can use the fetch() function in JavaScript to make a GET request to the transactions endpoint:</p>
        <Code code={fetchCode} />
        <h3 className="text-lg font-semibold">Using axios</h3>
        <p className="text-secondary-foreground">Here's how you can use the axios library in JavaScript to make a GET request to the transactions endpoint:</p>
        <Code code={axiosCode} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Limit parameter</h2>
        <p className="text-secondary-foreground">Specify the number of transactions to retrieve. The default is 10. Example: ?limit=6</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Response</h2>
        <p className="text-secondary-foreground">A successful request will return a JSON response containing your transaction list. Here is an example of what the response might look like:</p>
        <Code code={response} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Error Handling</h2>
        <p className="text-secondary-foreground">In case of an error, the response will contain an error message. Make sure to handle these errors appropriately in your code. Here’s an example of an error response:</p>
        <Code code={error} />
      </div>
    </main>
  )
}

export default DocsPage;

const hostName = ` 
\`\`\`html
${HOSTNAME}/api/transactions
\`\`\`
`
const fetchCode = `
\`\`\`js
const url = '${HOSTNAME}/api/transactions?limit=5';

fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': 'YOUR_AUTH_TOKEN',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
\`\`\`
`

const axiosCode = `
\`\`\`js
const axios = require('axios');

const url = '${HOSTNAME}/api/transactions?limit=5';
const config = {
  headers: {
    'Authorization': 'YOUR_AUTH_TOKEN',
    'Content-Type': 'application/json'
  }
};

axios.get(url, config)
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
\`\`\`
`

const response = `
\`\`\`json
{
    "transactions": [
        {
            "amount": 1203,
            "category": "Income",
            "createdAt": "2024-07-03T11:41:49.912Z",
            "description": "Got my salary"
        },
        {
            "amount": -69,
            "category": "Entertainment",
            "createdAt": "2024-07-03T11:39:22.027Z",
            "description": "A night out"
        },
        {
            "amount": -29,
            "category": "Other",
            "createdAt": "2024-07-03T11:37:44.126Z",
            "description": "Bought some shoes"
        },
    ]
}
\`\`\`
`

const error = `
\`\`\`json
{
    "error": "Error receiving your transactions. Make sure you use the correct Authorization value."
}
\`\`\`
`