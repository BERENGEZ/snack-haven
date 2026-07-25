from flask import flask, request, jsonify
from slask_cors import CORS

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
    print(f"Total Amount: {order_data.get('total_amount')}")

    #Send the response back to frontend javascript
    return jsonify({
        "status": "success",
        "message": "Order received successfully!"
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
#Run the app on port 5000
