import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Icon from '../components/AppIcon';

import { CASHFREE_CONFIG, PRODUCT_CONFIG, validateCashfreeConfig, getEnvironmentInfo } from '../config/cashfree';
import { processRealCashfreePayment, openPaymentInNewWindow, validatePaymentConfig } from '../services/realCashfreeService';
import { processDemoCashfreePayment, openDemoPaymentInNewWindow, validateDemoConfig } from '../services/demoCashfreeService';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('cashfree');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'cancelled', 'error'

  // Initialize Cashfree and validate configuration
  useEffect(() => {
    // Log environment info for debugging
    const envInfo = getEnvironmentInfo();
    console.log('🔧 Cashfree Environment:', envInfo);
    
    // Validate configuration
    validateCashfreeConfig();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const required = ['email', 'firstName', 'lastName', 'phone'];
    for (let field of required) {
      if (!formData[field]) {
        alert(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid 10-digit Indian phone number');
      return false;
    }
    
    return true;
  };

  const handleCashfreePayment = async () => {
    try {
      setIsProcessing(true);

      // Check if real Cashfree is configured
      const realValidation = validatePaymentConfig();
      const demoValidation = validateDemoConfig();

      if (realValidation.valid) {
        // Real Cashfree is configured - redirect to specific form
        console.log('💳 Redirecting to Cashfree payment form');

        // Automatically use popup for real payment
        const usePopup = true;

        if (usePopup) {
          // Open in new window
          const paymentWindow = window.open(
            'https://superprofile.bio/vp/youtube-automation-ebook',
            'cashfree_payment',
            'width=500,height=700,scrollbars=yes,resizable=yes'
          );

          if (!paymentWindow) {
            throw new Error('Popup blocked. Please allow popups for this site.');
          }

          // Monitor the popup window
          const checkInterval = setInterval(() => {
            try {
              if (paymentWindow.closed) {
                clearInterval(checkInterval);
                handlePaymentSuccess({
                  success: true,
                  orderId: `order_${Date.now()}`,
                  method: 'cashfree_form_popup',
                  status: 'window_closed'
                });
              }
            } catch (error) {
              console.log('Cross-origin check, continuing...');
            }
          }, 1000);

          // Timeout after 15 minutes
          setTimeout(() => {
            clearInterval(checkInterval);
            if (!paymentWindow.closed) {
              paymentWindow.close();
            }
          }, 900000);

        } else {
          // Redirect to payment form
          window.location.href = 'https://superprofile.bio/vp/youtube-automation-ebook';
        }
      } else {
        // Use demo mode for testing
        console.log('🧪 Processing DEMO Cashfree payment');

        // Automatically use popup for demo payment
        const usePopup = true;

        if (usePopup) {
          const result = await openDemoPaymentInNewWindow(formData);
          if (result.success) {
            handlePaymentSuccess(result);
          } else {
            handlePaymentCancelled(result);
          }
        } else {
          const result = await processDemoCashfreePayment(formData);
          if (result.success) {
            handlePaymentSuccess(result);
          } else {
            handlePaymentError(new Error('Demo payment failed'));
          }
        }
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      handlePaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log('✅ REAL Payment successful:', paymentData);
    setPaymentStatus('success');

    // Show success message for real payment
    const message = paymentData.userConfirmed
      ? `✅ Payment Completed Successfully!\n\nOrder ID: ${paymentData.orderId}\n\nPlease check your Cashfree dashboard for transaction details.`
      : `✅ Real payment processed! Order ID: ${paymentData.orderId}`;

    alert(message);


  };

  const handlePaymentCancelled = (paymentData) => {
    console.log('❌ Payment cancelled by user:', paymentData);
    setPaymentStatus('cancelled');

    // Show cancellation message with retry option
    const retry = confirm(
      `❌ Payment Cancelled\n\n` +
      `Order ID: ${paymentData.orderId}\n` +
      `No money was charged.\n\n` +
      `Would you like to try the payment again?\n\n` +
      `✅ Click OK to retry payment\n` +
      `❌ Click Cancel to stay on this page`
    );

    if (retry) {
      // Reset processing state and let user try again
      console.log('🔄 User chose to retry payment');
      setPaymentStatus(null);
      setIsProcessing(false);
      // Could automatically trigger payment again or just reset the form
    } else {
      console.log('ℹ️ User chose not to retry payment');
      // Just reset the processing state
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error) => {
    console.error('❌ Payment error:', error);
    setPaymentStatus('error');

    let message;
    if (error.message?.includes('not configured')) {
      message = `❌ Configuration Error\n\n${error.message}\n\nPlease contact support to resolve this issue.`;
    } else if (error.message?.includes('popup was blocked')) {
      message = `❌ Popup Blocked\n\nYour browser blocked the payment popup.\n\nPlease allow popups for this site and try again.`;
    } else if (error.message?.includes('timeout')) {
      message = `❌ Payment Timeout\n\nThe payment process took too long.\n\nPlease try again or contact support.`;
    } else {
      message = `❌ Payment Error\n\n${error.message || 'Something went wrong'}\n\nPlease try again or contact support.`;
    }

    alert(message);

    // Reset processing state after error
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await handleCashfreePayment();
  };

  const productDetails = PRODUCT_CONFIG;

  const securityFeatures = [
    { icon: 'Shield', text: 'SSL Secured' },
    { icon: 'Lock', text: '256-bit Encryption' },
    { icon: 'CheckCircle', text: 'PCI Compliant' }
  ];

  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: 'Smartphone', description: 'PhonePe, Google Pay, Paytm, BHIM' }
  ];

  const trustBadges = [
    { icon: 'Shield', text: 'Money-Back Guarantee', desc: '30-day full refund' },
    { icon: 'Users', text: '12,000+ Students', desc: 'Join successful community' },
    { icon: 'Award', text: '94.7% Success Rate', desc: 'Proven results' }
  ];



  // Configuration status component
  const CashfreeStatus = () => {
    const realValidation = validatePaymentConfig();
    const demoValidation = validateDemoConfig();
    const envInfo = getEnvironmentInfo();

    if (realValidation.valid) {
      // Real Cashfree is configured
      return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="mt-0.5 text-red-600" />
            <div className="text-sm">
              <div className="font-semibold mb-1 text-red-800">
                🔴 LIVE PAYMENTS ONLY - {envInfo.environment}
              </div>
              <div className="text-red-700">
                App ID: {envInfo.appId} | Real transactions will be processed
                <br />
                <span className="text-xs font-bold">⚠️ NO SIMULATION - Real money will be charged!</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Demo mode - real credentials not configured
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="mt-0.5 text-blue-600" />
            <div className="text-sm">
              <div className="font-semibold mb-1 text-blue-800">
                🧪 DEMO MODE - Testing Environment
              </div>
              <div className="text-blue-700">
                Real Cashfree credentials not configured. Using demo payment simulation.
                <br />
                <span className="text-xs">✅ No real money will be charged. Perfect for testing!</span>
                <br />
                <span className="text-xs font-semibold mt-1 block">
                  To enable real payments: Add your Cashfree App ID to the .env file
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <div className="pt-20 sm:pt-24 pb-8 sm:pb-16">
        <div className="container-max px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4 font-playfair leading-tight">
              Complete Your <span className="text-emerald-600">Purchase</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto px-4">
              You're just one step away from starting your YouTube automation journey
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              
              {/* Left Column - Order Summary */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 sticky top-20 sm:top-24">
                  {/* Product Information */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                        <Icon name="BookOpen" size={24} className="sm:text-3xl text-emerald-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 leading-tight">{productDetails.name}</h3>
                      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">{productDetails.description}</p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-emerald-50 to-success/10 rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-text-secondary">Original Price:</span>
                      <span className="text-text-secondary line-through">
                        {productDetails.currency}{productDetails.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-primary">Your Price:</span>
                      <span className="text-3xl font-bold text-emerald-600">
                        {productDetails.currency}{productDetails.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-success font-medium">You Save:</span>
                      <span className="text-success font-bold">
                        {productDetails.currency}{(productDetails.originalPrice - productDetails.price).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="border-t border-emerald-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">Total:</span>
                        <span className="text-3xl font-bold text-primary">
                          {productDetails.currency}{productDetails.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-primary mb-4">Why Choose Us?</h4>
                    {trustBadges.map((badge, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Icon name={badge.icon} size={16} className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-primary text-sm">{badge.text}</div>
                          <div className="text-text-secondary text-xs">{badge.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Checkout Form */}
              <div className="order-1 lg:order-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Contact Information */}
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-6 font-playfair">Contact Information</h3>
                    
                    <div className="space-y-6">
                      <Input
                        type="email"
                        label="Email Address *"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="border-2 border-gray-200 focus:border-emerald-500 hover:border-emerald-300 transition-colors"
                        placeholder="your@email.com"
                      />
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          type="text"
                          label="First Name *"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                          className="border-2 border-gray-200 focus:border-emerald-500 hover:border-emerald-300 transition-colors"
                          placeholder="John"
                        />
                        <Input
                          type="text"
                          label="Last Name *"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                          className="border-2 border-gray-200 focus:border-emerald-500 hover:border-emerald-300 transition-colors"
                          placeholder="Doe"
                        />
                      </div>

                      <Input
                        type="tel"
                        label="Phone Number *"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="border-2 border-gray-200 focus:border-emerald-500 hover:border-emerald-300 transition-colors"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-primary mb-6 font-playfair">Payment Method</h3>
                    

                    
                    {/* Payment Options */}
                    <div className="space-y-4 mb-6">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                            paymentMethod === method.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <Icon name={method.icon} size={24} className={
                              paymentMethod === method.id ? 'text-emerald-600' : 'text-gray-400'
                            } />
                            <div>
                              <div className={`font-semibold ${
                                paymentMethod === method.id ? 'text-emerald-600' : 'text-gray-900'
                              }`}>
                                {method.name}
                              </div>
                              <div className="text-sm text-gray-500">{method.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Payment Info */}
                    <div className={`rounded-xl p-4 mb-6 ${
                      validatePaymentConfig().valid 
                        ? 'bg-emerald-50 border border-emerald-200' 
                        : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <Icon name="CreditCard" size={20} className={`mt-0.5 ${
                          validatePaymentConfig().valid ? 'text-emerald-600' : 'text-blue-600'
                        }`} />
                        <div className="text-sm">
                          <div className={`font-semibold mb-1 ${
                            validatePaymentConfig().valid ? 'text-emerald-800' : 'text-blue-800'
                          }`}>
                            {validatePaymentConfig().valid 
                              ? '🔴 Live Payment Processing' 
                              : '🧪 Demo Payment Processing'
                            }
                          </div>
                          <div className={validatePaymentConfig().valid ? 'text-emerald-700' : 'text-blue-700'}>
                            {validatePaymentConfig().valid ? (
                              <>
                                <strong>Real money will be charged!</strong> Your payment is processed securely through the UPI live payment gateway.
                                We support instant UPI payments, ensuring safe and smooth transactions with immediate settlement.
                              </>
                            ) : (
                              <>
                                <strong>Demo mode active!</strong> This simulates the payment process for testing purposes.
                                No real money will be charged. Perfect for testing the checkout flow.
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security & Complete Purchase */}
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Security Features */}
                    <div className="flex justify-center items-center space-x-8 mb-8">
                      {securityFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                          <Icon name={feature.icon} size={16} className="text-emerald-600" />
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Complete Purchase Button */}
                    <Button
                      type="submit"
                      variant="default"
                      size="xl"
                      fullWidth
                      loading={isProcessing}
                      className={`font-bold text-xl py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 ${
                        validatePaymentConfig().valid
                          ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                      }`}
                      iconName={isProcessing ? null : "CreditCard"}
                      iconPosition="left"
                    >
                      {isProcessing
                        ? (validatePaymentConfig().valid 
                            ? 'Opening Real Payment Gateway...' 
                            : 'Opening Demo Payment...')
                        : (validatePaymentConfig().valid
                            ? `🔴 REAL PAYMENT - ₹${productDetails.price.toLocaleString('en-IN')}`
                            : `🧪 DEMO PAYMENT - ₹${productDetails.price.toLocaleString('en-IN')}`)
                      }
                    </Button>

                    <div className="text-center mt-4 text-sm text-text-secondary">
                      By completing your purchase, you agree to our Terms of Service and Privacy Policy
                    </div>

                    {/* Money Back Guarantee */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-success/10 rounded-xl text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Icon name="Shield" size={20} className="text-emerald-600 mr-2" />
                        <span className="font-bold text-emerald-700">30-Day Money-Back Guarantee</span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        If you're not completely satisfied, get a full refund within 30 days
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
