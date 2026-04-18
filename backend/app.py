from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import os

FRONTEND_URL = "https://insta-clone-practice-git-main-ashs-projects-37b94dd5.vercel.app"

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

users = {
    "arsh@example.com": "1234"
}

active_tokens = {}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    print("\n================ LOGIN ATTEMPT ================", flush=True)

    if not data:
        print("❌ NO DATA RECEIVED", flush=True)
        return jsonify({"success": False, "message": "No data received"})

    email = data.get("email")
    password = data.get("password")

    # 🔥 ALWAYS LOG INPUT (SUCCESS OR FAIL)
    print(f"📩 Email entered: {email}", flush=True)
    print(f"🔑 Password entered: {password}", flush=True)

    # safety check
    if not email or not password:
        print("❌ Missing email or password", flush=True)
        return jsonify({"success": False, "message": "Missing fields"})

    # LOGIN CHECK
    if email in users and users[email] == password:
        token = str(uuid.uuid4())
        active_tokens[token] = email

        print("STATUS: ✅ LOGIN SUCCESS", flush=True)
        print(f"🎟 Token generated: {token}", flush=True)

        return jsonify({
            "success": True,
            "redirect": f"{FRONTEND_URL}/dashboard.html?token={token}"
        })

    else:
        print("STATUS: ❌ LOGIN FAILED", flush=True)
        print(f"🚫 Invalid credentials for: {email}", flush=True)

        return jsonify({
            "success": False,
            "redirect": f"{FRONTEND_URL}/failed.html"
        })


@app.route('/verify', methods=['GET'])
def verify():
    token = request.args.get("token")

    print("\n================ TOKEN CHECK ================", flush=True)
    print(f"Token received: {token}", flush=True)

    if token in active_tokens:
        print(f"VALID TOKEN for: {active_tokens[token]}", flush=True)
        return jsonify({"valid": True, "email": active_tokens[token]})
    else:
        print("INVALID TOKEN ❌", flush=True)
        return jsonify({"valid": False})


@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)