import json
import openai
import os
import azure.functions as func
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential

from pydantic import BaseModel

# Get environment variables
vision_api_key = os.environ.get('VISION_KEY')
vision_api_base = os.environ.get('VISION_ENDPOINT')
openai_api_key = os.environ.get('OPENAI_API_KEY')
openai_api_base = os.environ.get('OPENAI_API_BASE')


def main(req: func.HttpRequest) -> func.HttpResponse:
    
    headers = {
        "Content-Type": "application/json"
    }

    system_message = """Assistant helps the users by suggesting the most popular food recipes based on the food items and quantity mentioned in the user text. 
                Ignore words except the food items and their quantity in the user text. The main food items are those ones mentioned in the user input, however, you can include few other food items of your choice to complete the recipe.
                Mention the recipe title, ingredients, cooking instructions and time in the recipe. Suggest 3 recipes. The recipe titles must be markdown h1 headers. The ingredients must be markdown unordered list.
                The cooking instructions must be markdown ordered list. The time must be markdown h4 header.
                """
    
    model = 'gpt-35'
    temperature = 0.7
    max_tokens = 4096
    openai.api_key = openai_api_key
    openai.api_base = openai_api_base
    openai.api_type = 'azure'
    openai.api_version = "2023-03-15-preview"
    
    try:
        # Create an Image Analysis client for synchronous operations
        client = ImageAnalysisClient(
            endpoint=vision_api_base,
            credential=AzureKeyCredential(vision_api_key)
        )

        response = client.analyze(
            image_data=req.get_body(),
            visual_features=[VisualFeatures.DENSE_CAPTIONS, ],
            language="en"
        )
        
        if response.dense_captions is not None and len(response.dense_captions) > 0:
            result_content = ", ".join([caption.text for caption in response.dense_captions.list])

        messages = [
                {"role": "system", "content": system_message},
                {"role": "user", "content": result_content},
            ]

        
        response = openai.ChatCompletion.create(
            engine=model,
            temperature=temperature,
            max_tokens=max_tokens,
            n=1,
            stop=None,
            messages=messages,
            request_timeout=30
        )
        
        if response.choices:
            result = {
                "content": response.choices[0].message.content,
                "type": "text",
                "finish_reason": response.choices[0].finish_reason
            }

            response_body = json.dumps(result)
            
            return func.HttpResponse(body=response_body, status_code=200, headers=headers)
        else:
            return func.HttpResponse(body="No text generated", status_code=200)
    except Exception as e:
        error_message = json.dumps({"content": str(e)})
        print(f'Error: {error_message}')
        return func.HttpResponse(body=error_message, status_code=500, headers=headers)
