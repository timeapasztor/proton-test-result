Readme

# Password Storage Application Coding Challenge

This repository contains a codebase of a password storage application. Your goal will be to identify and fix broken functionality as well as improve or enhance the codebase and/or application in any way you see fit.

## Contents

-   [Requirements](#requirements)
-   [Password Storage Application Overview](#password-storage-application-overview)
-   [Issues](#issues)
-   [Enhancement Ideas](#enhancement-ideas)

## Requirements

Down below you'll find a list of [issues](#issues) describing reproduction cases of features in the application that are either missing or not behaving as intended.

There is also a list of [enhancement ideas](#enhancement-ideas) in this doc. Think of that list as inspiration for the kind of enhancements you could be implementing. However, we would like you to be creative here; go for anything you think would be good to add! Please document / describe your custom enhancements with short comments on what you changed and why (for example, as an appendix at the end of this README).

Please spend a maximum of 4 hours on this coding challenge. You’re free to spend more time on it if you wish to tie up loose ends, but please save two versions of the code base: one that leaves the project as is at the 4-hour mark and one that represents your final product. If you choose to spend more time, please indicate how much extra time you worked on the project.

It is neither expected nor necessary that you find and fix everything that's not working. Based on your own judgement, prioritise and find a good balance between either fixing as many issues as you are able to and/or enhancing the application with changes that would in your opinion add value to it.

## Password Storage Application Overview

This section describes the functionality of the application if it were working as intended.

-   Your passwords are hidden behind a login with a 'master password' which grants you access to view all your other passwords.
-   The master password is '123456789'.
-   You can view, create, edit and delete passwords.
-   Your passwords are persisted locally in an encrypted format, only decryptable via the master password.

## Issues

-   Currently, the application does not compile when running `npm start`. It should compile and run in development mode when running `npm start`.

-   When I add a password and save it, then refresh my browser, I can't see the password that I just created any more. Passwords and modifications to them should be persisted so that I can still see my passwords after refreshing or revisiting after having closed my browser.

-   In the passwords list view, when I select a password, then go and edit the name of the password, then click on save, the password is not highlighted in the list anymore even though it is still the selected one (indicated by the fact that I can still see it in the password view area). A password should remain selected in the list when I edit its name.

-   In the passwords list view, when I have a password already selected and I select another one, both passwords are now highlighted indicating selection. Only the most recently selected password should be highlighted.

-   There should be no errors showing up in the console.

-   When adding the same url to different passwords, the user should be alerted as to the fact that they might have an outdated password inside their password storage since different passwords are now stored for the same url.

-   In the password edit view, when I add new url items they don't appear in the list of urls while editing. After saving and clicking on edit again they do appear. They should appear while I'm adding them inside the password edit view.

-   In the password edit view, when trying to delete one of the urls for a given password by clicking the 'x' icon on one of the url list items, nothing happens. The url for which the 'x' icon was clicked should be deleted.

## Enhancement Ideas

-   PasswordEdit is not typed. Convert the file to typescript.

-   Consider keyboard navigation throughout the application, as well as other accessibility concerns.

-   Improve the aesthetic aspect of the UI.

-   PasswordEdit and PasswordView seem to have some code duplication, especially in terms of layout and css. Find a way to abstract that into some shared code.

-   Implement encryption for the locally stored passwords based on the master password. (crypto related)

-   Implement 'change password' feature. (crypto related)

##Timea Pasztor

ISSUES:

1.can't resolve 'clsx' - needed to be downloaded

2.a.nullChecks and typeErrors: PasswordEdit, PasswordView 2.b.console.log -> Passwords render should have unique key prop -> given to PasswordListItem key={`${password.name}-${password.id}`}

3.save to localStorage the newly created password, and on component load get the passwords from storage 4.in PasswordMainContainer -> get the passwords from local storage (and merge them with the newly created ones)

5.edit password name looses highlight

-   handleSelectPassword remove async
-   when an item is selected -> a state (selectedPasswordId) is set in PasswordMainContainer
-   PasswordMainContainer -> Passwords -> PasswordListItem -> ListItem passing down in props and add selected in the rootClassName
-   (Adding above in the types everywhere)
-   this solves the issue when navigating between the password items and the highlight changes accordingly

    6.when adding an existing url to other password

-   for checking in all passwords/values/urls I need to access the whole password’s list (so I pass it through props in PasswordMainContainer to PasswordEdit component)
-   In PasswordEdit I wrote this function = checkUrlInputInPasswords to iterate through the list of passwords and search for a match
-   If there is a match, then I alert the user, also saying which password has that already existing url in the message

    7.adding new urls didn’t appear while addition

-   because urls should be a state, as dynamically as the list of urls is updated -> then the UI is updated as well
-   creating urls state, and useEffect -> to load the already set urls from the values
-   in handleUrlAdd -> is the updated list of urls set, and passed to the change function
-   when rendering the url list -> we use the “urls” state (and in this was we will show the latest changes)

    8.deleting an added url from the list

-   Connected to the previous issue -> in handleUrlDelete function the “urls” state need to be involved

ENHANCEMENTS:

-   PasswordEdit is typed
-   PasswordEdit and PasswordView has no duplicated styling -> it has been moved to reusable file
