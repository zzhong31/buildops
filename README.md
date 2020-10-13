## To run

Please clone the respository to a directory and then run:

### npm install

After that, run

### amplify init

From there, you will need to place the aws-exports.js in the /src/ directory. I am not including it in the repository because of the API key.

If you need it, I will provide the file to you.

Once that is done, run:

### npm start

This will host it the app locally.


## To Deploy

In the root directory of the app, run:

### amplify hosting add

And select Amazon CloudFront and S3

Then select DEV

Enter a hosting bucket name

You can enter an option for the next two or accept the default.

Now run:

### amplify publish

And then accept the options.

After it is done, it will give you the address of the deployed app.

Afterwards, to publish new changes, run:

### amplify publish
