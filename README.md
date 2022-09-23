# Launching a Headless Craft Commerce Site Workshop

## Installation

You will need Docker Desktop and DDEV in order to run this project.

Take a look at this blog post for a quick guide for installing Docker and DDEV. https://blog.fortrabbit.com/local-craft-dev-site-ddev-development-tool. You only need follow the part titled "Install DDEV to power your local Craft CMS dev sites".

### Installation with DDEV

This workshop repo includes DDEV config files so if you have Docker Desktop and DDEV installed on your machine, you can
get this project up and running quickly by doing the following:

1. Save the .env.example file as .env, and add values for CRAFT_APP_ID and CRAFT_SECURITY_KEY :

        // Craft App Settings
        CRAFT_APP_ID=
        CRAFT_SECURITY_KEY=
        
   The APP_ID and CRAFT_SECURITY_KEY can be any random strings. Use something like https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx or just mash that keyboard.

2. Open your terminal and go to the projects root directory :

        cd <path-to-project>/dot-all-2022

3. Start up Docker Desktop and after it loads, start DDEV in your terminal :

        ddev start
        
   If you have problems starting ddev because ports are in use then make sure you shut down other servers that may be using the same ports (such as Nitro) and try starting ddev again.

4. Once DDEV has finished downloading and configuring its Docker containers and starts to run, install the project's composer dependencies :

        ddev composer install
            
5. Import the projects seed database into DDEV :

        ddev import-db --src=project_db.sql.tar.gz
        
   Alternatively if you are on a Mac and have TablePlus, SequelPro or SequelAce installed, you can open these
   apps directly from DDEV and import the same database SQL dump seed file (project_db.sql.tar.gz):
   
        // Using TablePlus
        ddev tableplus
        
        // Using SequelPro
        ddev sequelpro
        
        // Using SequelAce
        ddev sequelace
        
6. Get Craft up and running and apply any changes to the config:

        ddev exec php craft up
        
*Note You should run the above command whenever you pull down an update from the repository in order to apply any config changes that have been made since you last pulled down the repo.*
    
8. Next we need to install Nuxt and the other dependencies for the front end build. In your terminal
run the following command :

        ddev yarn install

*Note This process can take a few minutes to download and install the necessary packages.
        
1. To run the front end of the project in dev mode, you then use the following command :

        ddev yarn dev

2.  In your browser you can now access the site running locally in DDEV :
    
    * **Craft Admin**

            https://dot-all-2022.fostercommerce.test/admin
        
        * Username : admin
        * Password : password
        
    * **Front End** (on port 3000)
    
            https://dot-all-2022.fostercommerce.test:3000

---
# Add the site to your own repository
For the next steps we are going to be deploying the site to The Cloud using Vercel. In order to do this, you will need to host the code in your own repository using GitHub, GitLab, or Bitbucket.


## Changing the origin
Fire up a terminal and navigate to the root directory of the project. Type the following;

`git remote set-url <url of your repo>`

---


# Deploying the site to Vercel

## What is Vercel?
According to a quick Google search&hellip;

>"Vercel is a cloud platform that enables developers to host websites and web services that deploy instantly, scale automatically, and require no supervision"

Basically, it's a quick and easy way to get a site up and running in the cloud for showing to your friends, family, and clients.

We are going to use Vercel to get your new Headless Commerce site online.

### Create a Vercel account

_If you already have a Vercel account then you can skip this part._

Vercel offers a free tier which will be great for what we are doing.

First off, head over to https://vercel.com/signup

Vercel will be pulling code from your repository. It works with GitHub, GitLab, and Bitbucket. So sign in using one of those options or alternatively, sign up using an email address.

For our purposes, we are going to assume you already have an account with one of the providers listed and have logged in using that.

You should now see a list of your repositories and you can select the project to deploy to Vercel.

Vercel is only hosting the Front-end of the site, the pages that your users will interact with. The Back-end, the Craft installation itself and the database, is running on Foster Commerce's server hosted on Forge.




