// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "scaffy" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('scaffy.bootstrap', async function () {
		// The code you place here will be executed every time your command is executed
		const folderUri = await vscode.window.showOpenDialog({
			canSelectFiles: false,
			canSelectFolders: true,
			canSelectMany: false,
			openLabel: 'Select Base Folder',
		  });
	  
		  if (!folderUri || folderUri.length === 0) {
			vscode.window.showErrorMessage('No folder selected!');
			return;
		  }

		//   const basePath = folderUri[0].fsPath; // Get the selected folder path
		const selectedFolderPath = folderUri[0].fsPath; // Get the selected folder path


		// / get project name from the user
		// Prompt user for project name
		const projectName = await vscode.window.showInputBox({
		prompt: 'Enter the project name,dart acceptable name',
		placeHolder: 'my_project_name',
		});
		if (!projectName) {
			vscode.window.showErrorMessage('No project name provided!');
			return;
		  }


		  const basePath = path.join(selectedFolderPath, projectName);
 // Create the project folder
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    } else {
      vscode.window.showWarningMessage(`The folder '${projectName}' already exists. Files will be added inside it.`);
    }
		//   const  = await vscode.window.showInputBox({
		// 	prompt: 'Enter the folder/file structure (e.g., src,src/components/App.js,README.md)',
		//   });
		//   const structure = ''
		  // Predefined folder and file structure
		  // Predefined folder and file structure with content
		  const predefinedStructure = [
			{ path: 'apps', isFolder: true },
			{ path: 'packages', isFolder: true },
			{ 
				path: 'melos.yaml', 
				content: `name: ${projectName}\n\npackages:\n  - apps/**\n  - packages/**\n`
			},
			  {
				path: 'pubspec.yaml',
				content: `name: ${projectName}\n\nenvironment:\n  sdk: '>=3.0.0 <4.0.0'\n`,
			  },
			  		
		  ];
	    // Create folders and files with content
		predefinedStructure.forEach((item) => {
			const fullPath = path.join(basePath, item.path);
	  
			if (item.isFolder) {
			  // Create folder
			  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
			} else {
			  // Create file with content
			  const dir = path.dirname(fullPath);
			  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
			  fs.writeFileSync(fullPath, item.content || '', 'utf8'); // Write content or create an empty file
			}
		  });


		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello Vscode from Scaffy!');
		vscode.window.showInformationMessage(`Project '${projectName}' created successfully`);
		// const newProjectFolderUri = vscode.Uri.file(basePath);



		// const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : null;

		if (!basePath) {
		  vscode.window.showErrorMessage('No workspace folder found!');
		  return;
		}
	
		// Check if the workspace folder contains a valid Flutter project (pubspec.yaml file)
		const pubspecPath = path.join(basePath, 'pubspec.yaml');
		if (!fs.existsSync(pubspecPath)) {
		  vscode.window.showErrorMessage('No Flutter project found in the current directory (pubspec.yaml not found).');
		  return;
		}
	


		  // Prompt user for the Flutter app name
		  const appName = await vscode.window.showInputBox({
			prompt: 'Enter the Flutter app name,dart acceptable name !',
			placeHolder: 'my_flutter_app',
		  });
	  
		  if (!appName) {
			vscode.window.showErrorMessage('No app name provided!');
			return;
		  }

		    // Ensure the app does not already exist
			const appPath = path.join(selectedFolderPath, appName);
			if (fs.existsSync(appPath)) {
			  vscode.window.showErrorMessage(`The folder '${appName}' already exists. Choose another name or path.`);
			  return;
			}
		

   // Run the flutter create command in the selected directory
   const command = `flutter create ${appName}`;
   vscode.window.showInformationMessage(`Creating Flutter app '${appName}'...`);

   // Use exec to run the flutter create command
   exec(command, { cwd: selectedFolderPath }, (err, stdout, stderr) => {
	 if (err) {
	   vscode.window.showErrorMessage(`Error creating Flutter app: ${stderr}`);
	   return;
	 }

	 vscode.window.showInformationMessage(`Flutter app '${appName}' created successfully!`);

	 // Optionally, open the newly created Flutter app in a new VS Code window
	 const appUri = vscode.Uri.file(appPath);
	 vscode.commands.executeCommand('vscode.openFolder', appUri, true);
   });
 });



		// vscode.commands.executeCommand('vscode.openFolder', newProjectFolderUri, true);
		// const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : null;

    // Create a terminal and run the flutter pub get command
    const terminal = vscode.window.createTerminal({
		name: 'Flutter Terminal',
		cwd: basePath, // Set the current working directory to the project folder
	  });
  
	  terminal.sendText('flutter pub get'); // Run the flutter pub get command
	  terminal.show(); // Show the terminal
	 

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
