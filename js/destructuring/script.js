const user = {
    id: "USER-123456",
    name: {
    first: "Alice",
    last: "Liddell"
    },
    email: "alice@example.com",
    address: {
    shipping: {
    street: "123 Rabbit Hole",
    city: "Wonderland",
    state: "Fantasy",
    postalCode: "12345",
    country: "WL"
    },
    billing: {
    street: "456 Mad Hatter Lane",
    city: "Tea Party",
    state: "Fantasy",
    postalCode: "67890",
    country: "WL"
    }
    },
    payment: {
    total: "100.00",
    currency: "USD",
    details: {
    subtotal: "75.00",
    tax: "15.00",
    shipping: "10.00"
    },
    transactions: [
    { 
    id: "TXN-123", 
    amount: "50.00",
    description: "Magic Potion"
    },
    { 
    id: "TXN-456",
    amount: "50.00",
    description: "EnchantedSword"
    }
    ]
    }
};

// 📌 Step 3: Destructure User Data
const {id, name: {first, last},
 email, 
 address: {
    shipping: {street: shippingStreet, city: shippingCity, state: shippingState, postalCode: shippingPostalCode, country: shippingCountry}, 
    billing: {street: billingStreet, city: billingCity, state: billingState, postalCode: billingPostalCode, country: billingCountry}}, 
    payment: {total, currency, details: {subtotal, tax, shipping}, 
    transactions
}} = user;
// Instructions:
// 1. Use destructuring to extract values from user in script.js:
const personalInfo = document.getElementById("personal-info");
const shippingInfo = document.getElementById("shipping-address");
const billingInfo = document.getElementById("billing-address");
const paymentInfo = document.getElementById("transactions");



// 📌 Step 5: Inject User Data into HTML
personalInfo.innerHTML = `<h2>Personal Information</h2>
<p>${first} ${last}</p>
<p>${email}</p>`;

shippingInfo.innerHTML = `<h2>Shipping Address</h2>
<p>${shippingStreet}</p>
<p>${shippingCity}, ${shippingState} ${shippingPostalCode}</p>
<p>${shippingCountry}</p>`;

billingInfo.innerHTML = `<h2>Billing Address</h2>
<p>${billingStreet}</p>
<p>${billingCity}, ${billingState} ${billingPostalCode}</p>
<p>${billingCountry}</p>`;
// Instructions:
// 1. Use document.getElementById to select sections in script.js.
// 2. Use template literals to inject destructured data into the UI.
// 📌 Step 6: Display Transactions Using map() Instructions:
paymentInfo.innerHTML = `<h2>Transactions</h2>
<ul>${transactions.map(transaction => `<li>${transaction.description} - $${transaction.amount}</li>`).join("")}
</ul>`;
// 1. Use .map() to loop over transactions and generate a transaction list.





// 2. Append the results to transactions section.

