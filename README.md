<img src="https://socialify.git.ci/mmelokuhlemaphisa/ShoppingList/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="ShoppingList" width="640" height="320" />
# React Native Shopping List App

## Overview

The Shopping List App is a mobile application built with **React Native and Redux Toolkit**. The app allows users to manage their shopping items by adding, editing, deleting, and marking items as purchased. The application uses **Redux** for state management and **AsyncStorage** to save data locally so that the shopping list remains available even after the app is closed.

This project demonstrates the use of **React Native components, Redux state management, and persistent storage** to build a simple but functional mobile application.

---

## Features

The application includes the following features:

* Add new shopping items with a name and quantity
* Edit existing items on the list
* Delete items from the shopping list
* Mark items as purchased using a toggle or tap action
* Persistent storage using AsyncStorage so items remain after restarting the app
* Clean and user-friendly interface for managing shopping items

---

## Technologies Used

The following technologies were used to develop the application:

* React Native
* Expo Router
* Redux Toolkit
* React Redux
* AsyncStorage
* TypeScript

---


## Installation and Setup

Follow these steps to run the project on your local machine.

1. Clone the repository

```
git clone https://github.com/mmelokuhlemaphisa/shoppingList.git
```

2. Navigate to the project folder

```
cd shopping-list-app
```

3. Install dependencies

```
npm install
```

4. Start the Expo development server

```
npx expo start
```

5. Run the application on:

* Android Emulator
* iOS Simulator
* Expo Go mobile application

---

## How to Use the Application

1. Enter the **item name** and **quantity** in the input fields.
2. Press the **Add** button to add the item to the shopping list.
3. Tap on an item to **mark it as purchased**.
4. Use the **Edit button** to update the item name or quantity.
5. Use the **Delete button** to remove the item from the list.

All items are automatically saved to local storage and will remain available when the application is reopened.

---

## State Management

The application uses **Redux Toolkit** to manage the state of the shopping list. Redux actions are used to:

* Add new items
* Edit existing items
* Delete items
* Toggle the purchased status of items

Reducers update the state accordingly, and the UI automatically reflects these changes.

---

## Data Persistence

The application uses **AsyncStorage** to store the shopping list locally on the device. This ensures that all items remain saved even after the application is closed or restarted.

---

## Testing

The application was manually tested to ensure that:

* Items can be added successfully
* Items can be edited correctly
* Items can be deleted from the list
* Purchased status toggles correctly
* Data persists after restarting the application

---


