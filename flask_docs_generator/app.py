from flask import Flask, jsonify, request
from gen_docs import process_documentation
from dotenv import load_dotenv
import traceback
import os

load_dotenv()

app = Flask(__name__)

@app.route('/generate-docs', methods=['POST'])
def generate_docs():
    print("generate_docs function called in Flask")
    
    try:
        # Get the code and optional extraPrompt from the request body (JSON)
        data = request.get_json()

        if 'code' not in data:
            return jsonify({"error": "No code provided"}), 400

        code_text = data['code']
        extra_prompt = data.get('extraPrompt', None)  # Get extraPrompt if provided, otherwise None

        # Prepare module info to pass to the documentation processor
        module_info = {
            "name": "pasted_code",
            "raw_source_code": code_text,
        }

        # Include extraPrompt in module_info if it was provided
        if extra_prompt:
            module_info["extra_prompt"] = extra_prompt

        # Call the process_documentation function to generate docs
        print("Calling process_documentation...")
        documentation_content = process_documentation(module_info)

        # Check if the documentation content exists
        if documentation_content:
            return jsonify({"documentation": documentation_content})
        else:
            print("Failed to generate the documentation.")
            return jsonify({"error": "Failed to generate documentation"}), 500

    except Exception as e:
        print("Error in Flask app:", str(e))
        print(traceback.format_exc())  # Print full traceback for debugging
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)  # Enable debug mode