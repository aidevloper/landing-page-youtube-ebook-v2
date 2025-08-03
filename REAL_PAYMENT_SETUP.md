# 🔴 Real Payment Setup Guide

## 🎯 **Goal: Enable Real Cashfree Payments**

Now that demo mode is working perfectly, let's set up real payments with actual Cashfree credentials.

## 🔑 **Step 1: Get Your Cashfree Credentials**

### **1. Sign Up for Cashfree**
- **Go to:** [Cashfree Dashboard](https://merchant.cashfree.com)
- **Sign up** with your business email
- **Complete KYC verification** (upload business documents)
- **Wait for account activation** (24-48 hours)

### **2. Get Your API Keys**
- **Login** to your Cashfree dashboard
- **Go to:** Developers → API Keys
- **Generate** your API keys
- **Copy** your **App ID** and **Secret Key**

## 🔧 **Step 2: Configure Real Payments**

### **For Testing (Sandbox Mode) - RECOMMENDED FIRST**
```bash
# Update your .env file
VITE_CASHFREE_APP_ID=your_actual_sandbox_app_id_here
VITE_CASHFREE_MODE=SANDBOX
```

### **For Live Payments (Production Mode)**
```bash
# Update your .env file
VITE_CASHFREE_APP_ID=your_actual_production_app_id_here
VITE_CASHFREE_MODE=PRODUCTION
```

## 🧪 **Step 3: Test Sandbox Payments**

### **Sandbox Test Cards:**
- **Success Card:** `4111 1111 1111 1111`
- **Failure Card:** `4111 1111 1111 1112`
- **CVV:** Any 3 digits
- **Expiry:** Any future date

### **Sandbox UPI:**
- Use any valid UPI ID format
- No real money charged

## 🔄 **Step 4: Restart and Test**

### **1. Restart Development Server:**
```bash
# Stop current server (Ctrl+C)
npm start
```

### **2. Verify Real Mode:**
- Visit: `http://localhost:4028/checkout`
- You should see **RED indicators** instead of blue
- Button should show: **"🔴 REAL PAYMENT - ₹999"**

### **3. Test Real Payment Flow:**
- Fill in customer details
- Click **"🔴 REAL PAYMENT - ₹999"**
- Choose payment method (popup or redirect)
- Complete test payment with sandbox credentials

## 🎯 **Expected Changes:**

### **Real Mode Indicators:**
- 🔴 Red status box: "🔴 LIVE PAYMENTS ONLY - SANDBOX"
- 🟢 Green payment info: "Live Payment Processing"
- 🔴 Red button: "🔴 REAL PAYMENT - ₹999"

### **Real Payment Flow:**
- Redirects to actual Cashfree payment gateway
- Real payment processing (sandbox = no real money)
- Proper payment confirmation and webhooks

## 🚨 **Important Notes:**

### **Sandbox Mode (Safe Testing):**
- ✅ **No real money charged**
- ✅ **Full payment flow testing**
- ✅ **Real Cashfree gateway**
- ✅ **Perfect for development**

### **Production Mode (Live Payments):**
- ⚠️ **Real money will be charged**
- ⚠️ **Only use after thorough testing**
- ⚠️ **Ensure KYC is completed**
- ⚠️ **Test with small amounts first**

## 🔒 **Security Best Practices:**

1. **Never commit .env file** to version control
2. **Use different keys** for testing and production
3. **Regularly rotate** your API keys
4. **Monitor transactions** in Cashfree dashboard
5. **Set up webhooks** for payment confirmation

## 🛠 **Troubleshooting:**

### **"Invalid App ID" Error:**
- Check if App ID is correctly copied
- Ensure no extra spaces in .env file
- Restart development server

### **Payment Not Processing:**
- Verify account is activated
- Check if KYC is completed
- Ensure using correct test credentials

### **Still in Demo Mode:**
- Check .env file is in project root
- Verify variable names start with `VITE_`
- Restart server after changes

## 📞 **Cashfree Support:**

- **Documentation:** https://docs.cashfree.com/
- **Support Email:** support@cashfree.com
- **Phone:** Available in dashboard
- **Chat:** 24/7 live chat support

## 🎉 **Next Steps:**

1. **Get your Cashfree App ID** from the dashboard
2. **Update the .env file** with your credentials
3. **Test in sandbox mode** first
4. **Switch to production** when ready for live payments

**Your real payment system will be fully functional once you add your Cashfree credentials!** 🚀 