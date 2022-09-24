---
id: 682435596410987
title: Go fast serverless with Netlify CLI
published_at: 2022-09-24T20:20:42.138Z
tags: devops
excerpt: As developers, we must constantly face daily challenges in our lives and business. From creating new ideas to...
slug: go-fast-serverless-netlify-cli
crosspostedOn: ''
crosspostLink: ''
---

As developers, we must constantly face daily challenges in our lives and business. From creating new ideas to solving new or existing problems in the real world, we need to have feedback from our consumers, but how can share this solution and get instant feedback?

Fortunatelly we have plenty of options available today, I personally love using **Netlify** from adding a new app, maning and deploying from the UI it is quite straightforward.
But would be useful if we could all that in the command line tool? We can!

> Netlify is an all-in-one platform for automating deployment of modern web projects. It enables you to host, integrate and deploy in a single workflow. Integrate dynamic functionally with serverless functions and plugins.

You can use [Netlify’s command line](https://www.npmjs.com/package/netlify-cli) interface to deploy sites or configure continuous deployment. Netlify Dev brings the functionality of your Netlify production environment directly to your local machine.

For this demonstration I have this little web app I'm going to deploy from the terminal just using the Netlify CLI!

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/demo_app.png?alt=media&token=bd233c50-3a87-4dfc-851c-5be5c965a2e7" alt="fitness demo man doing shoulder stretch" fit="contain" width="870" height="700" />

First things first, Let's install it as global dependency:

```sh
npm i netlify-cli -g
```

You can check the version and run the available commands by running `netlify`

```sh
netlify
```

Once correctly installed, you need authenticate into your Netlify account by running the command below:

```sh
netlify login
```

This will open a authorization page to you to grant access and obtain an access token that allows CLI to get info and manage your sites through the terminal.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/cli-authorize-ui.png?alt=media&token=d3bc6a32-8f89-4ba4-9214-18f1c7c00961" alt="authorize netlify" height="320" width="870" />

If you're already logged in, you can check the current user by running:

```sh
netlify status
```

Then, create a brand new project/site:

```sh
netlify init
```

The Netlify CLI will prompt for setting your site and deploying manually from the command line,
but you can also connect to Github repository instead.

```sh
> This will allow for Netlify Continuous deployment to build branch & PR previews
? Do you want to create a Netlify site without a git repository? (Use arrow keys)
❯ Yes, create and deploy site manually
  No, I will connect this directory with GitHub first
```

Next it will ask for your team's name and site:

```sh
? Do you want to create a Netlify site without a git repository? Yes, create and deploy site manually
? Team: <YOUR_TEAM>
? Site name (you can change it later): <UNIQUE_SITE_NAME>
```

Before you deploy, you must build your application if it hasn't been done already.
In our case, we running a Vue app using Vite, so we just need to run `npm run build` to build it.

Once it is created and assets are build you can deploy the site with

```sh
netlify deploy
```

You'll be prompt to enter your publish directory which in most cases of web apps is either `dist` or `build`.
This will deploy a **preview** of your site, basically a draft, with a URL.

If you don't want to manually deploy using `netlify deploy` everytime you can connect it to github repository which you allow more features in CI/CD flow so whenever you push to your default branch Netlify automatically starts a new preview deploy.

Once everything is good to go, we deploy it to production:

```sh
netlify deploy --prod
```

Finally we open our new deployed app:

```sh
netlify open:site
```

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/fitness-deployed.png?alt=media&token=c905b519-3a28-45da-83dd-19028f3122e2" alt="fitness deployed" height="820" width="870" fit="contain" style="--radius-default: 20px" />

Wohooo! 🎉🥳 Our app has been successfully deployed into production!

## Running your site locally

[**Netlify Dev**](https://www.netlify.com/products/cli/) enables you to run and _utilize the full power of the netlify platform_ in your local machine.
You can add and manage headers, rewrites, run and debug serverless functions and more with **zero config**.

Start your local development server by running:

```bash
netlify dev
```

This is will open a development server at `8888` and your application client server in the available port, for example `3000`.

In order to share your current development server you can pass the `--live` flag to the same command as it is going to create
shared tunned in a public so your users can try out instantly.

## Environment variables

Managing your site's environment variables is fairly easy, once your existing project it is linked with `netlify link`, you can list, import or create new variables on Netlify
through the CLI as well:

```sh
netlify env:set SECRET mysecret123
```

## Netlify functions

Netlify functions are immutable serverless functions that can run server-side code on demand without having to deal with a dedicated server. They're version-controlled and the endpoint can deployed on Netlify in either Go, JavaScript or TypeScript.
They can be very useful if you want to run some backend code but without any sort of Node.js server of your own, or using external libraries and such.

Creating one is super easy and there are plenty of [real-word examples](https://github.com/netlify/edge-functions-examples) we can choose from:

```bash
netlify functions:create
```

Trigger a function with invoke, for this will need to start the development server with `netlify dev` first

```bash
netlift dev
netlify functions:invoke
```

This is call your function at the functions configured folder
usually at `/.netlify/functions/<FUNCTION_NAME>` in the development server, as you can also make the same call
inside your application logic, such as fetching or consuming an external API.

As you could see we can go beyond and speed up our productivity by just using the command line, those were the commands I found useful, you can check the full list [here](https://cli.netlify.com/commands/).

Alright that's all. Happy coding! 👨‍💻👩‍💻
