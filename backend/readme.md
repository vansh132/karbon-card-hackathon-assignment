# Financial Analysis Model

This is a Flask-based API for evaluating financial data uploaded in JSON format. The API provides endpoints to analyze various financial flags based on the uploaded data.

## Prerequisites

- Python 3.6 or higher
- pip (Python package installer)

## Installation

1. Clone the repository:

   ````bash
   git clone https://github.com/vansh132/karbon-hackathon.git
   cd repo ```

   ````

2. Create a virtual environment (optional but recommended):

   ````bash
   python -m venv venv
   source venv/bin/activate  ```


   ````

3. Install the required packages:

   ````bash
   pip install -r requirements.txt ```
   ````

### endpoints

### GET /

This endpoint returns a welcome message.

**Response:**

```json
{
  "message": "Welcome to the financial evaluation API!"
}
```

### POST /probe

This endpoint accepts a JSON file for evaluation.

Request:

Form Data:
file: JSON file containing financial data.
Response:

On success:

```json
{
  "flags": {
    "TOTAL_REVENUE_5CR_FLAG": <value>,
    "BORROWING_TO_REVENUE_FLAG": <value>,
    "ISCR_FLAG": <value>
  }
}
```
