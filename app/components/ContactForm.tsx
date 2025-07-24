import React, { useState } from "react";
import TagManager from 'react-gtm-module';

interface ContactFormProps {
  className?: string;
  onSubmitSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = "", onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    projectDetails: '',
    timeline: '',
    budget: '',
    otherService: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Web Development',
    'Development Assistance', 
    'Custom Solutions & Integrations',
    'Ongoing Maintenance & Support',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (formData.service === 'Other' && !formData.otherService.trim()) {
      newErrors.otherService = 'Please specify the service you need';
    }
    
    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Project details are required';
    } else if (formData.projectDetails.trim().length < 10) {
      newErrors.projectDetails = 'Please provide more details (minimum 10 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send notification email to company
      const notificationResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${process.env.SENDGRID}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [
                {
                  email: 'hello@augmentedwebcraft.com',
                  name: 'Augmented Webcraft'
                }
              ],
              subject: `New Consultation Request from ${formData.name}`
            }
          ],
          from: {
            email: 'no-reply@augmentedwebcraft.com',
            name: 'Augmented Webcraft'
          },
          content: [
            {
              type: 'text/html',
              value: `
                <h2>New Consultation Request</h2>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
                ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
                <p><strong>Service:</strong> ${formData.service === 'Other' ? formData.otherService : formData.service}</p>
                <p><strong>Project Details:</strong></p>
                <p>${formData.projectDetails.replace(/\n/g, '<br>')}</p>
                ${formData.timeline ? `<p><strong>Timeline:</strong> ${formData.timeline}</p>` : ''}
                ${formData.budget ? `<p><strong>Budget:</strong> ${formData.budget}</p>` : ''}
              `
            }
          ]
        })
      });

      if (!notificationResponse.ok) {
        throw new Error(`SendGrid API error: ${notificationResponse.status}`);
      }

      // Send confirmation email to customer
      const confirmationResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [
                {
                  email: formData.email,
                  name: formData.name
                }
              ],
              subject: 'Thank you for your consultation request - Augmented Webcraft'
            }
          ],
          from: {
            email: 'no-reply@augmentedwebcraft.com',
            name: 'Augmented Webcraft'
          },
          content: [
            {
              type: 'text/html',
              value: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Thank You for Your Interest!</h2>
                  
                  <p>Hi ${formData.name},</p>
                  
                  <p>Thank you for reaching out to Augmented Webcraft! We've received your consultation request and are excited to learn more about your project.</p>
                  
                  <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #2563eb;">What's Next?</h3>
                    <p style="margin-bottom: 0;">Our team will review your request and get back to you within <strong>24 hours</strong> with next steps and any follow-up questions.</p>
                  </div>
                  
                  <h3 style="color: #2563eb;">Your Request Summary:</h3>
                  <ul style="background-color: #f8fafc; padding: 15px 20px; border-radius: 5px;">
                    <li><strong>Service:</strong> ${formData.service === 'Other' ? formData.otherService : formData.service}</li>
                    ${formData.timeline ? `<li><strong>Timeline:</strong> ${formData.timeline}</li>` : ''}
                    ${formData.budget ? `<li><strong>Budget:</strong> ${formData.budget}</li>` : ''}
                  </ul>
                  
                  <p>In the meantime, feel free to check out our recent work and insights on our website.</p>
                  
                  <p>Looking forward to discussing your project!</p>
                  
                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <p style="margin-bottom: 5px;"><strong>The Augmented Webcraft Team</strong></p>
                    <p style="margin-bottom: 5px; color: #64748b;">hello@augmentedwebcraft.com</p>
                    <p style="margin-bottom: 0; color: #64748b;">augmentedwebcraft.com</p>
                  </div>
                </div>
              `
            }
          ]
        })
      });

      if (!confirmationResponse.ok) {
        throw new Error(`SendGrid confirmation email error: ${confirmationResponse.status}`);
      }
      
      console.log('Form submitted successfully via SendGrid');
      
      // Track form submission in GTM
      TagManager.dataLayer({
        dataLayer: {
          event: 'form_submit',
          form_name: 'consultation_request',
          form_data: {
            service: formData.service,
            timeline: formData.timeline,
            budget: formData.budget
          }
        }
      });
      
      setIsSubmitted(true);
      
      // Call success callback if provided
      onSubmitSuccess?.();
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          projectDetails: '',
          timeline: '',
          budget: '',
          otherService: ''
        });
        setErrors({});
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'There was an error submitting your request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`bg-gray-100 rounded-xl p-4 sm:p-6 lg:p-8 border border-slate-300 ${className}`} role="form" aria-labelledby="contact-form-heading">
      <h3 id="contact-form-heading" className="text-black text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Request a Consultation</h3>
      
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="text-green-600 text-4xl mb-3">✓</div>
          <h4 className="text-black text-xl mb-2">Thank you!</h4>
          <p className="text-slate-600">We'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate aria-describedby={errors.submit ? 'form-error' : undefined}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="name" className="block text-black text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border rounded-lg text-black placeholder-slate-500 focus:outline-none focus:ring-2 text-sm sm:text-base form-field ${
                  errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
                placeholder="Your full name"
              />
              {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border rounded-lg text-black placeholder-slate-500 focus:outline-none focus:ring-2 text-sm sm:text-base form-field ${
                  errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-black text-sm font-medium mb-2">
              Service Needed *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
              aria-invalid={errors.service ? 'true' : 'false'}
              aria-describedby={errors.service ? 'service-error' : undefined}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border rounded-lg text-black focus:outline-none focus:ring-2 text-sm sm:text-base form-field ${
                errors.service ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            >
              <option value="">Select a service...</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            {errors.service && <p id="service-error" className="mt-1 text-sm text-red-600" role="alert">{errors.service}</p>}
          </div>

          {formData.service === 'Other' && (
            <div>
              <label htmlFor="otherService" className="block text-black text-sm font-medium mb-2">
                Please specify
              </label>
              <input
                type="text"
                id="otherService"
                name="otherService"
                value={formData.otherService}
                onChange={handleInputChange}
                aria-invalid={errors.otherService ? 'true' : 'false'}
                aria-describedby={errors.otherService ? 'other-service-error' : undefined}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border rounded-lg text-black placeholder-slate-500 focus:outline-none focus:ring-2 text-sm sm:text-base form-field ${
                  errors.otherService ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
                placeholder="Describe the service you need"
              />
              {errors.otherService && <p id="other-service-error" className="mt-1 text-sm text-red-600" role="alert">{errors.otherService}</p>}
            </div>
          )}

          <div>
            <label htmlFor="projectDetails" className="block text-black text-sm font-medium mb-2">
              Project Details *
            </label>
            <textarea
              id="projectDetails"
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleInputChange}
              required
              rows={3}
              aria-invalid={errors.projectDetails ? 'true' : 'false'}
              aria-describedby={errors.projectDetails ? 'project-details-error' : undefined}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border rounded-lg text-black placeholder-slate-500 focus:outline-none focus:ring-2 resize-none text-sm sm:text-base form-field ${
                errors.projectDetails ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="Tell us about your project, goals, and requirements..."
            />
            {errors.projectDetails && <p id="project-details-error" className="mt-1 text-sm text-red-600" role="alert">{errors.projectDetails}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="timeline" className="block text-black text-sm font-medium mb-2">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border rounded-lg text-black focus:outline-none focus:ring-1 text-sm sm:text-base form-field ${
                errors.service ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              >
                <option value="">Select timeline...</option>
                <option value="ASAP">ASAP</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2-3 months">2-3 months</option>
                <option value="3+ months">3+ months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-black text-sm font-medium mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border rounded-lg text-black focus:outline-none focus:ring-1 text-sm sm:text-base form-field ${
                errors.service ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              >
                <option value="">Select budget...</option>
                <option value="Under $5k">Under $5k</option>
                <option value="$5k - $10k">$5k - $10k</option>
                <option value="$10k - $25k">$10k - $25k</option>
                <option value="$25k - $50k">$25k - $50k</option>
                <option value="$50k+">$50k+</option>
                <option value="Let's discuss">Let's discuss</option>
              </select>
            </div>
          </div>

          {errors.submit && (
            <div id="form-error" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            aria-describedby={isSubmitting ? 'submit-status' : undefined}
            className={`w-full font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white text-sm sm:text-base cursor-pointer hover:scale-105 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white button-glow-animation'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" aria-hidden="true"></div>
                <span id="submit-status">Sending...</span>
              </div>
            ) : (
              'Send Consultation Request'
            )}
          </button>
        </form>
      )}
    </section>
  );
};

export default ContactForm;