# Adi Goldstein's MyLocations

If you wish to run this project locally please run `npm install` and then `npm start`. 
Open locahost:8080 in your browser and you're ready to go
### Some notes about it:

1. All app data uses unique ID with uuid library.
1. I used redux-localstore library to save to local storage.
1. Added Multiple delete option for categories and locations.  
1. Multiple categories to a single location done. 



#### Known bugs:

1. When deleting a category it will still appear in the data of existing locations.
2. When saving store to local storage, after deleting data (both locations and categories), state returns to initial state. 

Thanks you very much. 
