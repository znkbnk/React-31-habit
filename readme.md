Step 1: Install react-toastify

- Make sure you have the react-toastify
library installed in your project. 

Step 2: Import toast from react-toastify

- In the file where you want to show toast
messages, import toast from react-toastify 
at the beginning of your component file.
- The react-toastify library provides CSS 
classes that you can import in HabitList.js file.
- In you App.js file include the ToastContainer
component in return statement.
Make sure to import it. 


Step 3: Create handleCheckClick Function

- Create a button with an onClick event handler
that calls the handleCheckClick function when
the button is clicked.
- Include the disabled attribute to disable the
button when goalDays is less than or equal to
0 to prevent multiple clicks.
- In your HabitList.js file define the
handleCheckClick function. This function 
should take a habit as a parameter.
- Inside the handleCheckClick function, calculate
the updated goalDays by subtracting 1 from the
current goalDays of the habit.
- Create a copy of your habits state by spreading
it into a new array. (This allows you to make
modifications without directly mutating the state.)

- Find the index of the habit you want to update
in the updatedHabits array. You can use the
findIndex method to locate the habit based on
a unique identifier, such as key.
- Update the goalDays of the habit at the found
index in the updatedHabits array to the
calculated updatedGoalDays.
- Set the state of habits using the setHabits
function with the updated updatedHabits array.
- Check if the updatedGoalDays is equal to 0,
which means the habit's goal is achieved.
If updatedGoalDays is 0, add the updated habit
to the completedHabits state. You can use the
setCompletedHabits function to update the state.
- Save the updated completedHabits to local
storage.
- Use the toast object from the react-toastify 
library to show a toast message to the user.
- If updatedGoalDays is 0, display a message
indicating that the habit is completed.
Otherwise, display a message with the 
number of days left for the habit.



