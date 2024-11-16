# Scaffy - VS Code Extension

**Scaffy** is a VS Code extension designed to help developers quickly bootstrap Flutter projects with Melos structures, configurations, and the necessary setup files. This extension automates the process of creating and organizing the basic structure for Flutter apps, making it easier for developers to get started.

## Features

- **Folder Structure Creation**: Automatically generates essential folders like `apps`, `packages`, and a `melos.yaml` configuration file.
- **Flutter App Setup**: Creates a new Flutter app with a predefined structure.
- **Configuration Files**: Generates `pubspec.yaml` and `melos.yaml` files.
- **Terminal Commands**: Automatically runs Flutter and Melos setup commands in the terminal for package management.
- **Customizable**: The extension allows users to input their own project and app names.

## Installation

1. Open **VS Code**.
2. Navigate to the **Extensions** view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for **Scaffy**.
4. Click **Install**.

Alternatively, you can install it via the command line by running:
```bash
code --install-extension solam.scaffy
```

## Usage

1. Open VS Code and open the **Command Palette** (Ctrl+Shift+P).
2. Type and select the `Scaffy: Bootstrap Project` command.
3. Follow the prompts to:
    - Select the base folder where your project will be created.
    - Enter a project name (valid Dart name).
    - Enter a Flutter app name (valid Dart name).
4. The extension will create the project structure, configure necessary files, and execute required terminal commands such as `flutter pub get` and `melos bootstrap`.

## Commands

- **Scaffy: Bootstrap Project**: Starts the project setup process, prompting for project and app names and setting up the structure.
