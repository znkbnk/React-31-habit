import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HabitList = ({
  habits,
  favoriteHabits,
  updateHabit,
  deleteHabit,
  makeFavoriteHabit,
  setHabits,
  selectedCategory,
  setCompletedHabits,
  completedHabits,
}) => {
  const [editableHabitIndex, setEditableHabitIndex] = useState(-1);

  const handleEditClick = (index) => {
    setEditableHabitIndex(index);
  };

  const handleEditChange = (event, index) => {
    const updatedHabit = { ...habits[index], name: event.target.value };
    updateHabit(index, updatedHabit);
  };

  const handleEditSave = () => {
    setEditableHabitIndex(-1);
  };

  const handleCompleteClick = (index) => {
    const filteredHabits =
      selectedCategory === "All"
        ? habits
        : habits.filter(
            (habit) => habit.category.trim() === selectedCategory.trim()
          );

    const completedHabit = filteredHabits[index];
    if (completedHabit.goalDays > 0) {
      // Decrease the goal days by 1
      const updatedGoalDays = completedHabit.goalDays - 1;
      const updatedHabit = { ...completedHabit, goalDays: updatedGoalDays };

      // Update the habit in the habits array
      const updatedHabits = [...habits];
      updatedHabits[habits.indexOf(completedHabit)] = updatedHabit;
      setHabits(updatedHabits);

      if (updatedGoalDays === 0) {
        // Move the habit to completedHabits when the goal is achieved
        setCompletedHabits((prevCompletedHabits) => [
          ...prevCompletedHabits,
          updatedHabit,
        ]);
        // Save completed habits to localStorage

        saveCompletedHabitsToStorage([...completedHabits, updatedHabit]);

        // Display a toast message when the habit is achieved
        toast.success(`You achieved the habit "${updatedHabit.name}" today!`);
      }
    }
  };

const handleCheckClick = (habit) => {
  const updatedGoalDays = habit.goalDays - 1;
  const updatedHabit = { ...habit, goalDays: updatedGoalDays };

  const updatedHabits = [...habits];
  const habitIndex = updatedHabits.findIndex((h) => h.key === habit.key);
  updatedHabits[habitIndex] = updatedHabit;
  setHabits(updatedHabits);

  if (updatedGoalDays === 0) {
    setCompletedHabits((prevCompletedHabits) => [
      ...prevCompletedHabits,
      updatedHabit,
    ]);

    saveCompletedHabitsToStorage([...completedHabits, updatedHabit]);
  }

  // Show a toast message with days left
  if (updatedGoalDays === 0) {
    toast.success(`You've completed the habit "${updatedHabit.name}"!`);
  } else {
    const daysLeftMessage =
      updatedGoalDays === 1 ? "1 day left" : `${updatedGoalDays} days left`;
    toast.success(
      `You've checked off a day for the habit "${updatedHabit.name}" (${daysLeftMessage}).`
    );
  }
};

  const saveCompletedHabitsToStorage = (completedHabits) => {
    localStorage.setItem("completedHabits", JSON.stringify(completedHabits));
  };

  const filteredHabits =
    selectedCategory === "All"
      ? habits
      : habits.filter(
          (habit) => habit.category.trim() === selectedCategory.trim()
        );

  return (
    <ul className='habitlist-buttons'>
      {filteredHabits.map((habit, index) => (
        <li key={index}>
          {habit?.category ? (
            <>
              {editableHabitIndex === index ? (
                <div>
                  <input
                    type='text'
                    value={habit.name}
                    onChange={(e) => handleEditChange(e, index)}
                  />
                  <button onClick={handleEditSave}>Save</button>
                </div>
              ) : (
                <div id='completed-habits-modal'>
                  <div className='completed-habits-content'>
                    <h2>Category: {habit.category}</h2>
                    <div>
                      <span>Habit Name: {habit.name}</span>
                      <br />
                      <span>
                        Date:{" "}
                        {habit.date instanceof Date
                          ? habit.date.toDateString()
                          : "Invalid Date"}
                      </span>
                      {habit.goalDays > 0 ? (
                        <p>
                          Goal: {habit.goalDays}{" "}
                          {habit.goalDays === 1 ? "day" : "days"} left
                          {habit?.notes && <p>Notes: {habit.notes}</p>}
                        </p>
                      ) : (
                        <></>
                      )}
                      {habit.goalDays === 0 ? (
                        <p>Goal achieved in {habit.initialGoalDays}</p>
                      ) : (
                        <div className='habitlist-button'>
                          <button onClick={() => handleEditClick(index)}>
                            Edit
                          </button>
                          <button onClick={() => deleteHabit(index)}>
                            Delete
                          </button>
                          <button
                            className={
                              favoriteHabits.includes(habit)
                                ? "favorite-button favorite"
                                : "favorite-button"
                            }
                            onClick={() => makeFavoriteHabit(index)}
                          >
                            Favorite
                          </button>
                          <button onClick={() => handleCompleteClick(index)}>
                            Complete
                          </button>
                          <button
                            onClick={() => handleCheckClick(habit)}
                            disabled={habit.goalDays <= 0}
                          >
                            CHECK
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
