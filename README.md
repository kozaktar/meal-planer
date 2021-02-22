# Recipe Box

**Project deployed on AWS:** http://ec2-34-211-195-126.us-west-2.compute.amazonaws.com/ 

Recipe Box is a recipe managment app that lets you save your recipes and share them with others as well as maintain shopping lists.

- [Technical Information](#technical-information)
- [User Login](#user-login)
- [Public Recipes](#public-recipes)
- [Recipe Cards and Recipe Page](#recipe-cards-and-recipe-page)
- [Users Recipe Box](#users-recipe-box)
- [Shipping List](#shipping-list)
- 
### Technical Information
This app was developed using React and Material UI for fronend and Express.js and MongoDB for backend.  Google login was implemented using Firebase auth.

### User Login

User can sign in using email and password or sign-in using their google account.

**Login Screen:**
![login](https://user-images.githubusercontent.com/20387499/108727067-2535ed00-74f6-11eb-9b63-501a5446098b.JPG)

**Signup Screen:**
![CreateAccount](https://user-images.githubusercontent.com/20387499/108728112-42b78680-74f7-11eb-88e2-61a2c4c5f5fe.JPG)

### Public Recipes

Public recipes are displayed on the main page. Users can search through all the public recipes using the search bar.

**Recipe Search:**
![search](https://user-images.githubusercontent.com/20387499/108730124-359b9700-74f9-11eb-9658-920c8672d654.gif)

### Recipe Cards and Recipe Page

Recipe cards are used to display basic recipe information.  Logged in users can save a recipe to their recipe box by clicking 

**Recipe card:**

![Capture](https://user-images.githubusercontent.com/20387499/108741187-70ef9300-7504-11eb-81d9-18aefaeb8862.JPG)

Recipe page displays full recipe information and enables logged in user to add ingredients their shoping list as well as edit the recipe if they are the author/owner of that recipe.

**Recipe page:**

![recipe_page](https://user-images.githubusercontent.com/20387499/108744017-73072100-7507-11eb-8df0-fedc4e82afbf.gif)

### Users Recipe Box

Logged in user can access their recipe box where all their saved recipes are kept. They can search their saved recipes using the search bar and create new recipes. Users can also access their shopping list on this page.

**User's Recipe Box:
![recipe_box](https://user-images.githubusercontent.com/20387499/108746891-e2324480-750a-11eb-91ca-068e2d6a5ea9.gif)

User can create a new recipe using the "Add Recipe" dialog.
The user can add the following information:
-Recipe Title
-Recipe Image
-Recipe description
-Number of portions
-Preperation time
-Ingredients
-Preperation instructions (steps)
-Mark recipe as public (visible to everyone through public recipe page) or private (only visible to the author)

**Add Recipe Dialog:
![add_recipe](https://user-images.githubusercontent.com/20387499/108749116-6980b780-750d-11eb-890d-4c85066a40eb.gif)

### Shipping List

Logged in users can save ingredients from a recipe to a shopping list.  They can also remove ingredients from the shopping list.
![shoping_list](https://user-images.githubusercontent.com/20387499/108748896-1eff3b00-750d-11eb-812f-4063b8ca1286.gif)
