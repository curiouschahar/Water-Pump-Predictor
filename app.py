
from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Load the trained model
model = joblib.load("model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    
    # Prepare input DataFrame
    input_df = pd.DataFrame([data])

    # Predict using the model
    prediction = model.predict(input_df)[0]

    return jsonify({"predicted_demand": round(prediction, 2)})

if __name__ == "__main__":
    app.run(debug=True)
