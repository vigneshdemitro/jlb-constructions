'use client';

import { useState } from 'react';
import { getCompanyInfo } from '@/lib/metadata.service';
import { useEffect } from 'react';

interface CompanyData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [companyInfo, setCompanyInfo] = useState<CompanyData | null>(null);

  useEffect(() => {
    const loadCompanyInfo = async () => {
      try {
        const info = await getCompanyInfo();
        setCompanyInfo(info as any);
      } catch (error) {
        console.error('Error loading company info:', error);
      }
    };

    loadCompanyInfo();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'phone' && !/^\+?\d*$/.test(value)) {

      return; // Only allow digits and optional leading +
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // In a real application, you would send this to your backend
      // For now, we'll just log it and show a success message
      console.log('Form submitted:', formData);

      setSubmitMessage('Thank you! We will contact you soon.');
      setFormData({ name: '', email: '', countryCode: '+91', phone: '', message: '' });

      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-neutral-900 font-playfair">
            Get In Touch
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? We'd love to hear about it. Contact us today for a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-neutral-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6 font-playfair">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  placeholder="Name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  placeholder="name@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  minLength={10}
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  placeholder="+91 9999999999"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:bg-neutral-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Success Message */}
              {submitMessage && (
                <div className={`p-4 rounded-lg text-center font-semibold ${
                  submitMessage.includes('Thank') 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 font-playfair">
                Contact Information
              </h3>

              {/* Company Name */}
              {companyInfo && (
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                      Company Name
                    </p>
                    <p className="text-lg font-semibold text-neutral-900">
                      {companyInfo.name}
                    </p>
                  </div>

                  {/* Address */}
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                      Address
                    </p>
                    <p className="text-neutral-600">
                      {companyInfo.address}<br />
                      {companyInfo.city}, {companyInfo.state}, {companyInfo.zipCode}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                      Phone
                    </p>
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="text-lg font-semibold text-red-600 hover:text-red-700 transition"
                    >
                      {companyInfo.phone}
                    </a>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="text-lg font-semibold text-red-600 hover:text-red-700 transition"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${companyInfo?.phone}`}
                className="inline-flex items-center gap-3 px-6 py-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-semibold"
              >
                <span>📞</span>
                Call Us Now
              </a>
              <a
                href={`mailto:${companyInfo?.email}`}
                className="inline-flex items-center gap-3 px-6 py-4 bg-neutral-100 text-neutral-900 rounded-lg hover:bg-neutral-200 transition font-semibold"
              >
                <span>✉️</span>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}