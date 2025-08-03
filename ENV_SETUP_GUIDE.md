# 🔧 Environment Variables Setup Guide

## 🚨 **IMPORTANT: Cashfree API Keys Not Configured**

Your Cashfree integration is currently using a hardcoded fallback App ID, which may not work for real payments. You need to set up proper environment variables.

## 📝 **Step 1: Create .env File**

Create a new file called `.env` in your project root directory (same level as `package.json`) with the following content:

```bash
# Cashfree Payment Gateway Configuration
# Get these values from your Cashfree Dashboard: https://merchant.cashfree.com

# Cashfree App ID (Required)
# Replace with your actual App ID from Cashfree dashboard
VITE_CASHFREE_APP_ID=your_cashfree_app_id_here

# Environment Mode
# SANDBOX for testing, PRODUCTION for live payments
VITE_CASHFREE_MODE=SANDBOX

# Business Details
VITE_BUSINESS_NAME=YouTube Automation Ebook
VITE_PRODUCT_PRICE=999

# Optional: Cashfree Secret Key (for backend verification)
# CASHFREE_SECRET_KEY=your_secret_key_here
```

## 🔑 **Step 2: Get Your Cashfree Credentials**

### 1. Sign Up for Cashfree
- Go to: [Cashfree Dashboard](https://merchant.cashfree.com)
- Sign up with your business email
- Complete KYC verification (upload business documents)
- Wait for account activation (24-48 hours)

### 2. Get API Keys
- Login to your Cashfree dashboard
- Go to: **Developers → API Keys**
- Generate your API keys
- Copy your **App ID** and **Secret Key**

## 🧪 **Step 3: Configure for Testing (Sandbox)**

For testing, use these settings in your `.env` file:

```bash
VITE_CASHFREE_APP_ID=your_sandbox_app_id
VITE_CASHFREE_MODE=SANDBOX
```

### Test Payment Details:
- **Success Card**: 4111 1111 1111 1111
- **Failure Card**: 4111 1111 1111 1112
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## 🔴 **Step 4: Configure for Live Payments (Production)**

When ready for live payments, update your `.env` file:

```bash
VITE_CASHFREE_APP_ID=your_production_app_id
VITE_CASHFREE_MODE=PRODUCTION
```

## 🔄 **Step 5: Restart Development Server**

After creating/updating the `.env` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm start
```

## ✅ **Step 6: Verify Configuration**

Visit your checkout page (`/checkout`) and check:

### ✅ If Configured Correctly:
- No warning messages
- Console shows: "🔴 Cashfree configured in PRODUCTION mode" or "🧪 Cashfree configured in SANDBOX mode"
- Payment button works without errors

### ⚠️ If Still Not Configured:
- Yellow warning box on checkout page
- Console shows: "⚠️ Cashfree not configured with actual credentials"
- Payment button may not work properly

## 🛠 **Troubleshooting**

### Common Issues:

**"Invalid App ID" Error**
- Check if App ID is correctly copied from Cashfree dashboard
- Ensure no extra spaces in the `.env` file
- Restart development server after changes

**Environment Variables Not Loading**
- Make sure `.env` file is in the project root (same level as `package.json`)
- Check that variable names start with `VITE_`
- Restart the development server

**Payment Not Processing**
- Verify your Cashfree account is activated
- Check if KYC is completed
- Ensure using correct test credentials for sandbox mode

## 🔒 **Security Notes**

- **Never commit `.env` file to version control**
- **Keep your Secret Key secure** (only needed for backend verification)
- **Use different keys for testing and production**
- **Regularly rotate your API keys**

## 📞 **Support**

### Cashfree Support
- **Documentation**: https://docs.cashfree.com/
- **Support Email**: support@cashfree.com
- **Phone**: Available in dashboard
- **Chat**: 24/7 live chat support

## 🎯 **Next Steps**

1. **Create the `.env` file** with your Cashfree credentials
2. **Test in sandbox mode** first
3. **Verify payment flow** works correctly
4. **Switch to production** when ready for live payments

Your Cashfree integration will be fully functional once you add the proper API keys! 🚀 