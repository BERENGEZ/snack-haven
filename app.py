from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #In this case I allow the coss origin requests to communicate with the HTML and PYTHON

@app.route('/api/checkout', methods=['POST'])
def checkout():
    order_data = request.get_json()
    # I capture the json data sen from the checkout cart

#Currently, will just print to the server console
    print("\n New Order Received!!")
    print(f"Customer Name: {order_data.get('customer_name')}")
    print(f"Customer Email: {order_data.get('customer_email')}")
    print(f"Customer Address: {order_data.get('customer_address')}")
    print(f"Payment Method: {order_data.get('payment_method')}")
    print(f"Cart Items: {order_data.get('cart_items')}")
    print(f"Total Amount: {order_data.get('total_amount')})")

    #Send the response back to frontend javascript
    return jsonify({
        "status": "success",
        "message": "Order received successfully!"
    }), 200

@app.route('/api/contactUs', methods=['POST'])
def contact_us():
    contact_data = request.get_json()
    # Process the contact form data
    print(f"Name: {contact_data.get('name')}")
    print(f"Email: {contact_data.get('email')}")
    print(f"Message: {contact_data.get('message')}")

    return jsonify({
        "status": "success",
        "message": "Message received successfully!"
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
#Run the app on port 5001
