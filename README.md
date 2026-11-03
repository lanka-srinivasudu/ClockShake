# ClockShake ⏰

ClockShake is a React Native and Expo mobile demo that lets users dismiss a playing alarm by physically shaking their phone.

## Features

- 🔊 Alarm sound playback
- 📱 Shake detection using the device accelerometer
- 📊 Progress bar that increases as the phone is shaken
- ✅ Automatically stops the alarm at 100% progress
- ⏳ Alternative "Terminate Task" button available after 30 seconds
- 📳 Haptic feedback during interaction

## Tech Stack

- React Native
- Expo SDK 58
- JavaScript
- Expo Sensors
- Expo Audio
- Expo Haptics
- React Navigation

## Getting Started

### Prerequisites

- Node.js and npm
- Expo Go on a compatible Android or iOS device

### Installation

Clone the repository:

git clone https://github.com/lanka-srinivasudu/ClockShake.git

Navigate to the project:

cd ClockShake

Install dependencies:

npm ci

Start the Expo development server:

npx expo start

Scan the QR code using Expo Go.

A physical device is recommended because shake detection requires an accelerometer.

## How It Works

1. Open ClockShake on your phone.
2. Start the alarm demo.
3. Shake your phone to increase the progress bar.
4. Reach 100% to stop the alarm.
5. Alternatively, wait 30 seconds to unlock the termination button.

## Current Limitations

ClockShake is a shake-to-dismiss alarm demonstration, not a complete alarm clock application.

It does not currently support scheduling alarms, background alarm notifications, or triggering alarms when the application is closed.

## Development Status

The core shake-to-dismiss functionality has been tested on a physical device.

This project is maintained as a demonstration of React Native, Expo, motion sensor integration, and audio interaction.
