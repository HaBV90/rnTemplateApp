# 1. App Readme

## 1.1. Prerequisites

- [1. App Asia](#1-app-readme)
  - [1.1. Prerequisites](#11-prerequisites)
  - [1.2. Base dependencies](#12-base-dependencies)
  - [1.3. Folder structure](#13-folder-structure)
  - [1.4. Splash screen customization](#14-splash-screen-customization)
  - [1.5. Setup environments](#15-setup-environments)
    - [1.5.1. Using scripts from console](#151-using-scripts-from-console)
      - [1.5.1.1. Android](#1511-android)
      - [1.5.1.2. iOS](#1512-ios)
  - [1.6. Generate production version](#16-generate-production-version)
    - [1.6.1. Android](#161-android)
    - [1.6.2. iOS](#162-ios)
  - [1.7. Styleguide](#17-styleguide)
- [2. How to use it](#2-how-to-use-it)
  - [2.1. Components](#21-components)
    - [2.1.1. Static resources:](#211-static-resources)
    - [2.1.2. We manage three main folders for that:](#212-we-manage-three-main-folders-for-that)
  - [2.2. Screens](#22-screens)
- [3. Style](#3-style)
  - [3.1. Render SVG files](#31-render-svg-files)

## 1.2. Base dependencies

<!-- - [axios](https://github.com/axios/axios) for networking. -->

- [react-native](https://www.npmjs.com/package/react-native) is React's declarative UI framework to iOS and Android, using version 0.68.2
- [react-redux](https://redux.js.org/) for state management.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.
- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) to ease boilerplate code while apply Redux
- [lottie-react-native](https://www.npmjs.com/package/lottie-react-native) to display lottie animation files
- [react-native-svg](https://www.npmjs.com/package/react-native-svg) and [react-native-svg-transformer](https://www.npmjs.com/package/react-native-svg-transformer) to display svg files as standalone React component

## 1.3. Folder structure

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  <!-- - `actions`: This folder contains all actions that can be dispatched to redux. -->
  - `assets`: Asset folder to store all images, vectors, etc.
    - `animations`: This folder contains json-based animation files.
    - `svg`: Folder to store svg icons, images.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
  <!-- - `constants`: Folder to store any kind of constant that you have. -->
  - `service`: Folder to store all your network logic (you should have one controller per resource).
    - `localization`: Folder to store the languages files.
      <!-- - `navigation`: Folder to store the navigators. -->
      <!-- - `reducers`: This folder should have all your reducers, and expose the combined result using its `index.js` -->
  - `models`: Folder that contains all screen slices and interfaces.
  - `screens`: Folder that contains all your application screens/features.
    - `Screen`: Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles and tests. - `Screen.js` - `Screen.styles.js` - `Screen.test.js`
      <!-- - `selectors`: Folder to store your selectors for each reducer. -->
      <!-- - `storage`: Folder that contains the application storage logic. -->
      <!-- - `store`: Folder to put all redux middlewares and the store. -->
      <!-- - `test-utils`: Folder to store tests-related utilities and components. -->
  - `theme`: Folder to store all the styling concerns related to the application theme.
  - `App.js`: Main component that starts your whole app.
  - `index.js`: Entry point of your application as per React-Native standards.

## 1.4. Splash screen customization

To customize the splash screen (logo and background color) use the CLI provided in the [official docs](https://github.com/zoontek/react-native-bootsplash#assets-generation).

## 1.5. Setup environments

### 1.5.1. Using scripts from console

The template already has scripts to execute the project calling a specific environment defined into the package.json file. Keep in mind that if you are going to create new `envs` you have to define the script to build the project properly.

To define which env you want to use, just keep the structure `yarn [platform]: [environment]`

DEV: `yarn ios` or `yarn android`

STG: `yarn ios:stgRelease` or `yarn android:stgRelease`

PROD: `yarn ios:prod` o `yarn android:prod`

Also, you can use npm following the same rule as before: `npm run ios:staging`

Modify the environment variables files in root folder (`.env.development`, `.env.production` and `.env.staging`)

#### 1.5.1.1. Android

A map associating builds with env files is already defined in `app/build.gradle` you can modify or add environments if needed.

For multiple enviroments to work you would need to change `-keep class [YOUR_PACKAGE_NAME].BuildConfig { *; }` on `proguard-rules.pro` file.

#### 1.5.1.2. iOS

The basic idea in iOS is to have one scheme per environment file, so you can easily alternate between them.

To create a new scheme:

- In the Xcode menu, go to Product > Scheme > Edit Scheme
- Click Duplicate Scheme on the bottom
- Give it a proper name on the top left. For instance: "qa"
- Then edit the newly created scheme to make it use a different env file. From the same "manage scheme" window:

  Expand the "Build" tab on the left menu

  - Click "Pre-actions", and under the plus sign select "New Run Script Action"
  - Where it says "Type a script or drag a script file", type: `echo ".env.qa" > /tmp/envfile` replacing `.env.qa` with your file.

- Also, you will need to select the executable for the new schema:

  Expand the "Run" tab on the left menu

  - Under the "Executable" dropdown select the ".app" you would like to use for that schema

## 1.6. Generate production version

These are the steps to generate `.apk`, `.aab` and `.ipa` files

### 1.6.1. Android

1. Generate an upload key
2. Setting up gradle variables
3. Go to the android folder
4. Execute `./gradlew assemble[Env][BuildType]`

Note: You have three options to execute the project
`assemble:` Generates an apk that you can share with others.
`install:` When you want to test a release build on a connected device.
`bundle:` When you are uploading the app to the Play Store.

For more info please go to https://reactnative.dev/docs/signed-apk-android

### 1.6.2. iOS

1. Go to the Xcode
2. Select the schema
3. Select 'Any iOS device' as target
4. Product -> Archive

For more info please go to https://reactnative.dev/docs/publishing-to-app-store

## 1.7. Styleguide

For coding styling, we decided to go with ESLint and [React Native community's styleguide](https://github.com/facebook/react-native/tree/master/packages/eslint-config-react-native-community#readme).

# 2. How to use it

The idea of this section is to explain how the template composition is the best and easiest to use when you try to use well-formed, architectures, especially using redux flow.

The template follows a simple and convenient exporting pattern. The folder index exposes the resources, allowing to import all from the same path.

With that in mind, we are going to look at each folder to explain how to use it.

## 2.1. Components

Components are the basic blocks of a react native application, but since we​​ aim to minimize development complexity, all the components are at the same nesting level.

Another important thing is the use of propTypes to check the kind of data that your components need to work properly. If the component receives some data from others, the type of these props must be defined, and in case you need it the default value of the property too.

### 2.1.1. Static resources:

To keep an application scalable and organized, the global static resources that are used in the application have to be created in a specific file.

### 2.1.2. We manage three main folders for that:

- Assets: Here you can store all the images and icons that you need through the app.
- Localization: This folder contains all the locale objects that you need to create a multilingual application. Create a file for each locale, inside define an object then maintain the nesting sorted by the screen that contains the text that you need and the text you want to show. As the last step, remember to create a reference inside the Localization.js file and add it to LocalizedStrings.
- Theme: Here you can define all the styles that you use on different screens. To make easier the interaction of the application with device options for example you can create here assets as light and dark color palette

<!-- ## Redux

Once the components are defined, they are tied to the management of information through the application. For this, Redux is implemented with the store-reducer-action structure as usual, however, not only the data is handled through the actions but the success and error responses are also defined by the same form.

### Controllers folder and API connection handler

To keep the networking layer simple, the template uses a single Axios instance in the `httpClient.js`. It uses interceptors to define common side effects for the responses.

When you need communication with a service you have to create a function to manage the operation and grouping according to the kind of transaction inside a controller file, please keep all of those inside the controllers' folder.

While the data transfer between the API and the app is working you must use the success and error actions that help you to catch the result of the operation. With this method, you can track the interaction through the redux store. This is useful because you can create behaviors based on those states in a quick and simple way

### Redux folders

4 folders divide the redux work

- Store: Here you define the store shape and you can configure the persistReducer and middlewares.
- Actions: Remember to create the file and the corresponding test for each action classification. Here you define actions for success and error scenarios.
- Reducers: You have the error and success reducers by default. Create the other classifications and try to keep simple each file. Here you modify the store.
- Selectors: Create one file for each action classification. Here you define what part of the store you need to see in your interface. -->

## 2.2. Screens

In this folder, you have the main objects to apply the composition architecture. Just create a folder for each screen you have in your application, call all the components and static resources you need to render the scene and finally use the corresponding hooks to interact with redux and create behaviors depending on the store.

To keep the structure, extract the styles from the main file and place it in a {namefile.styles.js} do the same for the set of tests needed for each screen with the file {namefile.test.js}

# 3. Style

## 3.1. Render SVG files

Edit your .svgrrc file and include a line for replaceAttrValues that matching a hex code to {props.fill}
And then make sure your `path tag inside the SVG file fill attribute is the hex code (in this case #000)`.
For example, to render a logo with red color filled, do as below:

```js
/* Import .svg file directly */
import HomeIconSvg from './HomeIconSvg.svg';

/* To render this icon directly  */
<HomeIconSvg fill={'red'} />;
```
