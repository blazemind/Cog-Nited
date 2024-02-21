## Overview

CogNited is an innovative application designed to recognize food items in images uploaded from an IoT Raspberry Pi device or through a web-based frontend application. Utilizing advanced AI capabilities, CogNited identifies various food items in the uploaded pictures and generates corresponding recipes for the user. This application leverages Azure OpenAI and Azure Vision APIs to accurately process and analyze images, providing users with instant culinary inspiration based on the ingredients they have on hand.

### Components

- **Frontend**: A Vite React.js application that provides an intuitive user interface for uploading images and displaying the recognized food items and suggested recipes.
- **Backend**: Azure Function API that handles image processing, communication with Azure OpenAI and Azure Vision APIs, and recipe generation logic.
- **IoT Client**: Raspberry Pi setup that captures images and uploads them to the CogNited application for analysis.

## Structure

- `/Frontend`: Contains the source code for the Vite React.js frontend application.
- `/Backend`: Contains the Azure Function API code responsible for backend processing.

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- Azure account with access to Azure OpenAI and Azure Vision APIs
- Raspberry Pi setup for IoT image uploads (optional)

### Setup and Installation

1. **Frontend Setup:**
    - Navigate to the `/Frontend` directory.
    - Install dependencies by running `npm install`.
    - Start the development server with `npm run dev`.
    - The frontend application will be available at `http://localhost:3000`.

2. **Backend Setup:**
    - Navigate to the `/Backend` directory.
    - Ensure you have the Azure Functions Core Tools installed.
    - Configure the `local.settings.json` file with your Azure OpenAI and Azure Vision API keys and endpoints.
    - Start the function app using `func start`.
    - The backend API will be available for local testing and can be deployed to Azure Functions for production use.

3. **Raspberry Pi Client (Optional):**
    - Set up your Raspberry Pi to capture images and upload them to the CogNited backend.
    - Ensure the Raspberry Pi is configured to communicate with the backend API endpoint for image uploads.

### Configuration

- **Azure Services Configuration:**
    - Create Azure OpenAI and Azure Vision services in your Azure portal.
    - Obtain and configure the necessary API keys and endpoints in the backend application settings.

## Usage

- **Uploading Images via Frontend:**
    - Access the frontend application through your web browser.
    - Use the upload interface to select and upload images of food items.
    - View the recognized food items and suggested recipes displayed on the screen.

- **Uploading Images via Raspberry Pi:**
    - Configure your Raspberry Pi to periodically capture and upload images to the CogNited backend.
    - The application will automatically process these images and make recipe suggestions available through the frontend interface.