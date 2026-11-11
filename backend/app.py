
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
from google.genai import types


# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Gemini
API_KEY = os.getenv("GEMINI_API_KEY")

client = (
    genai.Client(
        api_key=API_KEY,
        http_options=types.HttpOptions(timeout=30000)
    )
    if API_KEY else None
)

SYSTEM_INSTRUCTION = """
You are FinBuddy, a friendly AI-powered financial education assistant.

Your responsibilities:
1. Explain budgeting, savings, loans, EMIs and investments.
2. Use simple language that beginners can understand.
3. Use Indian Rupees (INR) for examples when appropriate.
4. Give practical financial education and budgeting suggestions.
5. Explain financial risks clearly.
6. Never guarantee investment returns.
7. Never pretend to be a certified financial advisor.
8. Never ask users for passwords, OTPs, bank PINs or sensitive account details.
9. Keep answers organized, helpful and conversational.

You are an educational assistant, not a substitute for professional financial advice.
"""

# Sample responses for demo mode
DEMO_RESPONSES = {
    "save": "Here is a simple savings strategy! First, calculate your monthly income and necessary expenses. Try saving a fixed amount as soon as you receive your income. For example, saving ₹5,000 every month gives you ₹60,000 in one year.",
    
    "sip": "SIP stands for Systematic Investment Plan. It allows you to invest a fixed amount regularly in a mutual fund. SIP investments are subject to market risks, and returns are not guaranteed.",
    
    "emi": "EMI stands for Equated Monthly Instalment. It is the fixed amount you pay regularly towards a loan. EMI generally includes both principal and interest.",
    
    "budget": "A simple budgeting method is the 50-30-20 rule: 50% for needs, 30% for wants and 20% for savings. You can adjust these percentages based on your income and expenses.",
    
    "default": "Hi! I'm FinBuddy, your financial education assistant. I can help you understand budgeting, savings, loans, EMIs and investments. What would you like to learn today?"
}


def get_demo_response(message):
    message = message.lower()

    for keyword, response in DEMO_RESPONSES.items():
        if keyword != "default" and keyword in message:
            return response

    return DEMO_RESPONSES["default"]


# Home route
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Welcome to FinBuddy API!",
        "status": "running"
    })


# Health check
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "ai_mode": "Gemini AI" if client else "Demo Mode"
    })


# AI chatbot route

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json(silent=True) or {}
        message = data.get("message", "").strip()

        if not message:
            return jsonify({"error": "Please enter a message."}), 400

        if len(message) > 4000:
            return jsonify({"error": "Message is too long."}), 400

        if client is None:
            return jsonify({
                "reply": get_demo_response(message),
                "mode": "demo"
            }), 200

        prompt = f"""
{SYSTEM_INSTRUCTION}

User's financial question:
{message}

Answer helpfully, clearly and in simple language.
"""

        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=prompt
        )

        reply = response.text

        if not reply:
            raise Exception("Gemini returned an empty response.")

        return jsonify({
            "reply": reply,
            "mode": "gemini"
        }), 200

    except Exception as error:
        print("Chat API error:", str(error))

        return jsonify({
            "reply": get_demo_response(message),
            "mode": "demo"
        }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
