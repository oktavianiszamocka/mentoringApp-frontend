assets - folder where you store all assets related to your application such as fonts, icons and images
components - to delete, old components are stored in there
screens - contains sturucture of the project divided by roles, in each role folder we will find: 
    routes.js - place where we define routes for this role
    [ScreenName] - folder with all the files related to a particular screen
        components - components related to the screen (i.e Form)
utils - folder with different utils
    helpers - helper files
    storage - configuration of store and api endpoints 
        ducks - modular division for actions, reducers, types and selectors
            [moduleName] - usually similar to screenName where it will be applied
            root - combine reducersS
        api - axios endpoints 
        store - configured application store
index.js - configured routes

