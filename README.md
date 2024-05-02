# software-co-
software co practical

Nodejs Version : 20.11.1
# Login & Register
 STEP 1: Create New Role
   - Pass roleName & accessModules array
 Step 2: Craete new Uesr
  - Need to pass name, email,password, role
 - Implement login API which generte user token
   - POST: `api/users/login`
 - Implement sign Up API where user can add name,email,password and role
   - POST `api/users/signup`
  
# Create a User module and Role module which includes CRUD operations and list api.
All Operation related users required authentication and authorization.
 - Implement 2 collections for both modules(role,users)
 -  Implemented following API for CRUD
    1. List User(Required User Login and Permission to access) 
      - GET : `/api/users`
    2. Update User (Required User Login and Permission to access)
      - PUT : `api/users/{userId}`
    3. Delete : (Required User Login and Permission to access)
      - DELETE :`api/users/{userId}`
  
# Role module include roleName[String] ,access modules (list of modules that can be accessed by particular role.), createdAt [Timestamp],active [Boolean].
 - Prepare mongodb schema for same 
 - Collection Name : `roles`

# User module include basic user details and role field which is reference to the Roles module.
 - Collection Name: `users`
 - Add refernce of Role 

➢ In userlist api populate only roleName and access modules from Role module.
 - Get data of access module for specific users
 - Populated only neccessary fileds
  GET : `api/users`

# Add a functionality to update list of access modules
 - Can add new unique module into access modules
 - will insert only unique value to access moduales
 - Remove one value from access modules
 - PUT: `api/roles/{roleId}`

# Add a functionality to check whether or not particular user has access to particular module
 - Implement auth middleware to check authorization

# Add a functionality to update many users with same data
 - Impelemnted API in users which perform updateMany

# Add a functionality to update many users with different data
 - Impelemnted API in users which perform bulk write

# list apis searching
 - Implement serach in users list by API
 - Will allow to serach by user name and email

  

