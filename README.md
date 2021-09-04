# To do list app

A single page application (REST architectural style) where the user can signup/login and create todo lists as given in wireframe.

## Functional requirements

- When ‘NewList’ button is pressed, an empty list will be created at the beginning before other lists.
- The default title should be ‘List (n+1)’ where n is the current list count. The title should be editable.
  - Eg: In Wireframe there are 3 list, so the new list title should be ‘List 4’ 
- User should be able to add items to the list, check/uncheck the items and delete items.
- Checked items should have a grey color and strikethrough.
- Delete the list with a conformation popup when red 'X' button at the top right is pressed.
- Provide warning on signup/login (eg:if user already exists) without page refresh
- App should be responsive.
- Order the list by last updated and show the latest 20 notes.
- Autoload next 20 when scroll reaches at the end of the page.
- Auto save/update to server and db at logout.
  - Update only the list which are dirty.
- Choose suitable DB and frameworks.

## Nice To Have

- able to drag items from one list to another.
- Auto save/update when no interaction is there from the user for more than 10 seconds or 
- Service(s) should be containerized and deploy-able to Kubernetes

## Expected artifacts

- Architechture diagram and sequence diagram
- Code along with unit and integration test case
- RESTAPI documentation
