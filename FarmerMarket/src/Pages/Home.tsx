"use client";

import {
  Leaf,
  ShoppingCart,
  Users,
  MapPin,
  Clock,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">
              FarmMarket
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => (location.href = "/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              onClick={() => (location.href = "/register")}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 mb-4">
            🌱 Connecting Local Communities
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Fresh from Farm
            <span className="text-green-600"> to Your Table</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect directly with local farmers and discover the freshest
            produce in your area. Support sustainable agriculture while enjoying
            farm-fresh quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-3 bg-green-600 text-white text-lg rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
              onClick={() => (location.href = "/login")}
            >
              Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              className="px-8 py-3 border border-green-600 text-green-600 text-lg rounded-md hover:bg-green-50 transition-colors"
              onClick={() => (location.href = "/register")}
            >
              Sell Your Produce
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-gray-600">Local Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-gray-600">Cities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FarmMarket?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy for farmers to sell and buyers to find the
              freshest local produce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-200 transition-colors">
              <Leaf className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Farm Fresh Quality</h3>
              <p className="text-gray-600">
                Get produce picked at peak freshness, often harvested the same
                day you order
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-200 transition-colors">
              <MapPin className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Local & Sustainable
              </h3>
              <p className="text-gray-600">
                Support local farmers and reduce environmental impact with
                shorter supply chains
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-200 transition-colors">
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted & Verified</h3>
              <p className="text-gray-600">
                All farmers are verified and follow sustainable farming
                practices
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-200 transition-colors">
              <Clock className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Delivery</h3>
              <p className="text-gray-600">
                Choose from pickup, delivery, or visit the farm directly for the
                full experience
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-200 transition-colors">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Focused</h3>
              <p className="text-gray-600">
                Build relationships with local farmers and connect with your
                community
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-200 transition-colors">
              <ShoppingCart className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
              <p className="text-gray-600">
                Simple, intuitive platform makes ordering fresh produce quick
                and convenient
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Getting fresh produce has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Browse Local Farms</h3>
              <p className="text-gray-600">
                Discover farms in your area and see what fresh produce is
                available
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Place Your Order</h3>
              <p className="text-gray-600">
                Select your favorite produce and choose pickup or delivery
                options
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Enjoy Fresh Food</h3>
              <p className="text-gray-600">
                Receive your farm-fresh produce and enjoy the difference quality
                makes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The quality is incredible! I can taste the difference in every
                bite. Supporting local farmers has never been easier."
              </p>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-gray-500">Regular Customer</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "As a farmer, this platform has helped me reach more customers
                and grow my business sustainably."
              </p>
              <div className="font-semibold">Mike Thompson</div>
              <div className="text-sm text-gray-500">Local Farmer</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Love knowing exactly where my food comes from. The farmers are
                so passionate about what they do!"
              </p>
              <div className="font-semibold">Emily Chen</div>
              <div className="text-sm text-gray-500">Food Enthusiast</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Experience Farm Fresh?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of customers who choose quality, sustainability, and
            community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-3 bg-white text-green-600 text-lg rounded-md hover:bg-gray-100 transition-colors font-semibold"
              onClick={() => (location.href = "/register")}
            >
              Start Shopping Today
            </button>
            <button className="px-8 py-3 border-2 border-white text-white text-lg rounded-md hover:bg-white hover:text-green-600 transition-colors font-semibold">
              Become a Seller
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">FarmMarket</span>
              </div>
              <p className="text-gray-400">
                Connecting communities through fresh, local produce and
                sustainable farming.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Buyers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Browse Farms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Delivery Info
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Farmers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Sell Your Produce
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Farmer Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="my-8 h-px bg-gray-700"></div>

          <div className="text-center text-gray-400">
            <p>&copy; 2024 FarmMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
