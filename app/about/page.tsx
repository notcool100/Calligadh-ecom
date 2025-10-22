"use client";

import React from 'react';
import { FaHeart, FaStar, FaShippingFast, FaUsers, FaAward, FaGlobe, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              About CalliGadh
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Where fashion meets passion. We&apos;re more than just a clothing store – we&apos;re your style companion,
              bringing you the latest trends and timeless pieces that make you feel confident and beautiful.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="animate-bounce">
                <FaHeart className="text-red-400 text-3xl" />
              </div>
              <div className="animate-bounce" style={{ animationDelay: '0.1s' }}>
                <FaStar className="text-yellow-400 text-3xl" />
              </div>
              <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                <FaShippingFast className="text-green-400 text-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a small boutique to a fashion destination – discover the journey that shaped CalliGadh
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <FaGlobe className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Founded in 2020</h3>
              <p className="text-gray-600 leading-relaxed">
                CalliGadh was born from a vision to make high-quality fashion accessible to everyone.
                Starting with a small collection of carefully curated pieces, we quickly became known
                for our commitment to quality and style.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Growing Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Our community of fashion enthusiasts has grown exponentially. We listen to your feedback,
                adapt to trends, and continuously expand our collection to meet your evolving style needs.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <FaAward className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Award-Winning Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Recognized for our exceptional customer service and innovative approach to online fashion retail,
                we&apos;re proud to be a trusted name in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower individuals to express their unique style through accessible, high-quality fashion
                that celebrates diversity and boosts confidence.
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaStar className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading online fashion destination where every customer finds their perfect style,
                fostering a community of confident, fashionable individuals.
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Quality, inclusivity, sustainability, and customer satisfaction drive everything we do.
                We believe fashion should be for everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose CalliGadh?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes us the preferred choice for fashion enthusiasts worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                <FaShippingFast className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on all orders over $50</p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce" style={{ animationDelay: '0.1s' }}>
                <FaCheckCircle className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">100% satisfaction or money back</p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce" style={{ animationDelay: '0.2s' }}>
                <FaUsers className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you</p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce" style={{ animationDelay: '0.3s' }}>
                <FaAward className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Brands</h3>
              <p className="text-gray-600">Curated selection of top brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl lg:text-5xl font-bold mb-2">50K+</div>
              <p className="text-blue-100">Happy Customers</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl lg:text-5xl font-bold mb-2">10K+</div>
              <p className="text-blue-100">Products Sold</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl lg:text-5xl font-bold mb-2">100+</div>
              <p className="text-blue-100">Fashion Brands</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl lg:text-5xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-screen-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Fashion Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust CalliGadh for their fashion needs.
            Discover your perfect style today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center group"
            >
              Shop Now
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/register"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-4 px-8 rounded-lg transition-all duration-300"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
