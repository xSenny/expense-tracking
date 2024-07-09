# Expense Tracking Web Application: Project Overview
## Introduction
The Expense Tracking Application, currently available at [Expense Tracking](https://expense-tracking.xsenny.dev) is a comprehensive tool designed to help users manage their financial transactions efficiently. This application offers an user-friendly interface to record, monitor and analyze personal expenses and income.

## Key Features
1. **Transactions Management:**
- **Add Transactions:** Users can add new transactions, specify whether they are positive (income) or negative (expenses).
- **Edit Transactions:** Existing transactions can be modified to correct or update details.
- **Delete Transactions:** Users can remove transactions that are no longer needed.

2. **Filtering Transactions**
- **Date Filtering:** Users can filter transactions by specific dates or date ranges.
- **Category Filtering:** Transactions can be filtered based on predefined categories, allowing users to organize their finances by types.

3. **Analytics**
- **Charts:** The application provides visual analytics in the form of charts. These visual tools help users understand their spending habits.

4. **API access**
- **/api/transactions Endpoint:** The application uses an `/api/transaction` Endpoint where users can access their transactions in JSON format. This feature is particularly useful for integrations with other applications. More info on the [docs page](https://expense-tracking.xsenny.dev/docs).


# Setup and running instructions
- Before starting, make sure you have installed atleast next.js v14.2.4, install if needed. Use this command: `npx next --version` to check nextjs's version.

1. Fork this project, then clone it locally;
2. Run `npm install` to install all of the dependencies;
3. Create an `.env.local` file in the root folder to store all the enviroment variables. Here is how it should look for start.
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
WEBHOOK_SECRET=

MONGODB_URI=

SECRET_KEY=

HOSTNAME=http://localhost:3000
```
4. Create and setup a clerk project:
- Create an account [here](https://dashboard.clerk.com/sign-up?redirect_url=https%3A%2F%2Fdashboard.clerk.com%2F).
- Create a new application [here](https://dashboard.clerk.com/apps/new) by setting up a name. I would suggest to use just Email as an option.
- Next, select Next.js and take the environment variables to use in yout `.env.local` file.

5. Create and setup a mongodb cluster
- Follow this [tutorial](https://www.youtube.com/watch?v=jXgJyuBeb_o) to create your first cluster.
- Take your connection string and put in in your `MONGODB_URI` file of the `.env.local` file. A connection string should look like this: `mongodb+srv://{your user username}:{your user password}@cluster0.aux8sof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`. Make sure you replace the username and password with your user and also make sure you allowed your ip address to access the database, you can use `0.0.0.0/0` ip address to allow it from anywhere.

6. Expose this application's routes online: 
- Install ngrok.
- Run this project locally with `npm run dev`.
- Open ngrok's terminal, and run `ngrok http 3000` or the port your application is running.
- Copy the link where the ngrok application is running over the internet.

7. Create a clerk webhook endpoint:
- Go to the webhooks page from your current clerk project and click `Add Endpoint`. 
- As an endpoint url, use the link where your ngrok application is running + `/api/webhooks/clerk`, for example: `https://c7f1-86-105-84-84.ngrok-free.app/api/webhooks/clerk`.
- Subscribe to the following events: `user.created, user.updated, user.deleted`.
- Create the webhook endpoint, and then copy the Signing Secret from the right sidebar.
- Paste the Signing Secret as the `WEBHOOK_SECRET` in your `.env.local` file.

8. For the `SECRET_KEY` you can create a random string with random characters, for example: `asduas8da0jhguasd9ioaksdoasd`

9. Instead of `HOSTNAME`, you can use the url where your app is hosted. This is just used for the `/docs` page.

10. Now you should kill the process, and rerun `npm run dev` so you can finally visit your application, by default it is going to run on `localhost:3000`.

# Completed Features and known issues

## Features:
- Create / Update / Delete Transactions;
- Analyse your spending habbits with a special page;
- Filter your transactions by date range and categories;
- Use /api/transactions to get a set of your recent transactions;
- Light & Dark & System mode;
- A good and responsive UI/UX design;

## Known issues:
- Users can access the api endpoint without any restrictions;
- There are only a predefined set of categories, users can't customize them;
- People can't sort their transactions by created date;

# Explanation of key design decisions and any assumptions made

## Key Design Decisions
1. **User-Friendly Interface**
- I designed the interface to be simple and easy to use. This helps everyone, including users who are not very good with technology, to add, edit, and delete transactions without any trouble.

2. **Filtering Options**
- I included options to filter transactions by date range and category. This allows users to quickly find specific transactions and understnad their spending patterns.

3. **Visual Analytics**
- I added charts from `shadcn/charts` to show financial data visually. Those reprezentations make it easier for users to see trends and understand their financial situation.

4. **API Endpoint**
- I created an API endpoint to provide transactions in JSON format. This feature is useful for users who want to integrate their transaction data with other application or analyze it using different tools.

## Assumptions
1. **Need for Financial Management** 
- Users want to track their income and expenses, so the main purpose of the application is to help users manage their finances.

2. **Variety of Devices**
- Users will access the application from different devices (e.g. computers, tablets, smartphones), so the application is designed to work well on various screen sizes and types of devices.

3. **Interest in Visual Data**
- Users find visual data (charts) helpful, so those are included to make it easiers for users to understand their financial information.

4. **Need for Data Integration**
- Some users may want to use their financial data in other applications, so the API endpoint allows users to access their data in a flexible format for other uses.


### Api documentation can be found [here](https://expends-tracking.xsenny.dev/docs).