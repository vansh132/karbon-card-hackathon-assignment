from flask import Flask, request, jsonify
from rules import latest_financial_index, iscr_flag, total_revenue_5cr_flag, borrowing_to_revenue_flag
from flask_cors import CORS
import json

app = Flask(__name__)
app.config["FRONTEND_URL"] = "http://localhost:3000"

# CORS configuration
CORS(
    app,
    origins=[app.config["FRONTEND_URL"], "http://localhost:5173"],
    supports_credentials=True,
)

def probe_model_5l_profit(data: dict):
    lastest_financial_index_value = latest_financial_index(data)

    total_revenue_5cr_flag_value = total_revenue_5cr_flag(
        data, lastest_financial_index_value
    )

    borrowing_to_revenue_flag_value = borrowing_to_revenue_flag(
        data, lastest_financial_index_value
    )

    iscr_flag_value = iscr_flag(data, lastest_financial_index_value)

    return {
        "flags": {
            "TOTAL_REVENUE_5CR_FLAG": total_revenue_5cr_flag_value,
            "BORROWING_TO_REVENUE_FLAG": borrowing_to_revenue_flag_value,
            "ISCR_FLAG": iscr_flag_value,
        }
    }

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to the financial evaluation API!"})

@app.route('/probe', methods=['POST'])
def probe():
    # Check if a file is part of the request
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    # Check if a valid file was uploaded
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Read the file content
        data = json.load(file)
    except Exception as e:
        return jsonify({"error": f"Invalid file format: {str(e)}"}), 400

    # Check if the necessary data is in the JSON
    if "data" not in data:
        return jsonify({"error": "Invalid input data"}), 400

    # Call the financial evaluation function
    result = probe_model_5l_profit(data["data"])
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
