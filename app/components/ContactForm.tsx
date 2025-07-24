import React, { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import TagManager from 'react-gtm-module';

interface ContactFormProps {
  className?: string;
  onSubmitSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = "", onSubmitSuccess }) => {
  const fetcher = useFetcher();
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
  
  const isSubmitting = fetcher.state === "submitting";

  // Handle fetcher response
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
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
      } else if (fetcher.data.error) {
        setErrors({ submit: fetcher.data.error });
      }
    }
  }, [fetcher.data, formData.service, formData.timeline, formData.budget, onSubmitSuccess]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Clear any previous submit errors
    if (errors.submit) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.submit;
        return newErrors;
      });
    }
    
    // Submit using fetcher
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    
    fetcher.submit(
      submitData,
      {
        method: "POST"
      }
    );
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