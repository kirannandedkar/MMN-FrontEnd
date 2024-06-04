This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is how to deploy this application with nginx.

1. install nginx on your server
Go to replace ./nginx.conf file with /conf/nginx.conf file in nginx root folder.
Then, Nginx will forward 
    maharashtramandalnorway.no:80 ===> to localhost:3000

2. pull frontend source from your git repository
- git clone [repository url]
3. Move to repository root directory and run those command
- npm install
- npm run start

then your frontend will be running on localhost:3000

4. allow this nginx.exe app on firewall

fyi : when you setup backend on IIS or other platform, you must not use port 80 or 3000
you should use other port for backend api. eg: 4000

That's it.


TesT Next Card Number : 4268 2700 8737 4847
