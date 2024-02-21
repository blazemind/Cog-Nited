# ImageAnalyzer API

The ImageAnalyzer API is a serverless solution built on Azure Functions. It is designed to take binary image input, analyze it using Azure Vision AI to identify items within the image, and then use Azure OpenAI to generate recipes related to the identified food items. This API is intended to be called from a front-end Vite React JS application named CogNited.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (required for the Azure Functions Core Tools and the front-end Vite React JS application)
- [Python](https://www.python.org/downloads/) (version 3.7 or later)
- [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local#v2)
- [Visual Studio Code](https://code.visualstudio.com/) with the [Azure Functions extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- An Azure account with an active subscription. [Create one for free](https://azure.com/free).

## Local Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```
3. Set up your `local.settings.json` file in the root of the Azure Functions project with the necessary environment variables:
    ```json
    {
      "IsEncrypted": false,
      "Values": {
        "AzureWebJobsStorage": "<Your_Storage_Connection_String>",
        "FUNCTIONS_WORKER_RUNTIME": "python",
        "OPENAI_API_KEY": "<Your_Azure_OpenAI_API_Key>",
        "OPENAI_API_BASE": "<Your_Azure_OpenAI_Endpoint>",
        "VISION_KEY": "<Your_Azure_Vision_Service_Key>",
        "VISION_ENDPOINT": "<Your_Azure_Vision_Service_Endpoint>"
      }
    }
    ```
    Make sure to replace the placeholders with your actual Azure resources' details.

## Development in Visual Studio Code

1. Open the project folder in Visual Studio Code.
2. Press `F5` to start the function app locally. Visual Studio Code should automatically detect the function and suggest installing any missing extensions or dependencies.
3. Once the function is running, you can test it by sending requests from your local front-end application or using tools like Postman. Ensure your Vite React JS application (CogNited) is configured to call the local endpoint of the Azure Function during development.

## Deployment

1. In Visual Studio Code, log in to your Azure account by clicking on the Azure icon in the Activity Bar and then sign in to Azure.
2. Once logged in, navigate to the Azure Functions extension, right-click on your subscription, and select "Create Function App in Azure..."
3. Follow the prompts to set up your new Function App. Make sure to choose the same runtime stack as your local environment (Python 3.7 or later).
4. After the Function App is created, right-click on your project in the Azure Functions extension pane and select "Deploy to Function App..."
5. Choose the Function App you just created.
6. Once deployment is complete, configure the application settings in the Azure portal by adding the same environment variables as in your `local.settings.json` file but with the production values for your Azure resources.

## Additional Notes

- Ensure that your Azure Vision AI and Azure OpenAI services are properly set up and that you have the correct permissions to access these services.
- For security reasons, do not commit the `local.settings.json` file or any files containing sensitive keys to your source control.
- Refer to the Azure Functions documentation and Azure OpenAI documentation for more detailed information on working with these services.

