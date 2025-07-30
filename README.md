# ARBlackjackApp

Welcome to ARBlackjackApp! This is an Augmented Reality Blackjack game built with React Native.

# Getting Started

Follow these instructions to get the project set up and running on your local machine for development and testing purposes.

## Prerequisites

Before you begin, ensure you have your development environment set up for React Native. This includes:
- **Node.js (LTS version recommended):** Download and install from [nodejs.org](https://nodejs.org/). npm (Node Package Manager) is included with Node.js.
- **Watchman (for macOS users):** A file watching service. Install via Homebrew: `brew install watchman`. For other systems, see the Watchman installation guide.
- **A Java Development Kit (JDK):** Required for Android development. You can download it from Oracle (JDK 11 is often recommended for React Native) or use an alternative like OpenJDK.
- **Android Studio:** The official IDE for Android development. Download from the Android Studio website.
    - During setup, make sure to install the Android SDK, Android SDK Platform, and Android Virtual Device.
- **Xcode (for iOS development):** The official IDE for iOS development. Install from the Mac App Store.
    - After installation, open Xcode, go to `Preferences > Locations` and ensure the `Command Line Tools` are set.
    - You will also need to install the iOS Simulator.
- **CocoaPods (for iOS development):** A dependency manager for Swift and Objective-C Cocoa projects. Install using RubyGems:
  ```sh
  sudo gem install cocoapods
  ```
- **Ruby and Bundler (for managing CocoaPods version on iOS):**
    - Ruby typically comes pre-installed on macOS.
    - Install Bundler: `gem install bundler`

> **Important**: While these instructions provide guidance, it's highly recommended to follow the official React Native Environment Setup guide for your specific OS and target platform (iOS/Android), as it provides the most comprehensive and up-to-date information.


## Installation and Running

**1. Clone the Repository**

```sh
git clone <your-repository-url>
cd ARBlackjackApp
```
Replace `<your-repository-url>` with the actual URL of your GitHub repository (e.g., `https://github.com/your-username/ARBlackjackApp.git`).

**2. Install Project Dependencies**

Navigate to the project root directory and install the necessary JavaScript dependencies:

```sh
# Using npm
npm install

# OR using Yarn
yarn
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
