# ediblerecipes
A place where you can get wonderful recipes based on ingredients in your house. 


Important to Know: 
************* API Link *************
https://spoonacular.com/food-api
************************************
- API for Spoonacular needs an API key. You'll need to request one and insert it into string on line 59 at the end of it. Our current api request is hitting Spoonacular's "Search by Ingredients" API endpoint. 

- We are relying cookies being set (req.cookies.user_id) to determine who is on the webpage so we can store ingredients for them when they submit our ingredients form. We did not get to deleting/updating functionality due to time constraints. 

- Had lots of issues with CORS request being blocked when fetching data from our backend to our frontend. After doing some research, we found that the axios request was being blocked, so we used fetch instead, and were required to add additional information in our headers in order to make the request successfully. An example of a fetch request to mimick is below. 

fetch("http://localhost:3000/ingredients", {
      method: "POST",
      body: JSON.stringify(ingredientsList),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

Additional Features
- Our first request to the API just gives us the title, unique_id, and image of the recipe. We left off on making trying to make a second request to API so now that we have a recipe unique_id so that we can show a list of links people can click on to get redirected to the recipes instructions. We needed the recipe unique_id from the first api request so that for our second request we can get actual recipe instruction urls. When making the second request, make sure to set the 'instructionsRequired=true' so that the necessary info will be included. 

    * 1) Spoonacular's "Search by Ingredients" API endpoint to get recipe name, image, and recipe_id
    * 2) Spoonacular's "Search Recipes" API endpoint to get recipe instruction urls. 
