import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Newspaper, Users, Globe, Shield } from "lucide-react";
import Button from "../components/ui/Button";
import { RootState } from "@/reducers/rootReducer";
import { useSelector } from "react-redux";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const features = [
    {
      title: "Easy Content Creation",
      description:
        "Create beautiful blog posts with our intuitive rich text editor. Add images, format text, and publish with ease.",
      icon: <Newspaper className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "User-Friendly Dashboard",
      description:
        "Manage all your posts from a clean, organized dashboard. Edit, delete, and monitor your content in one place.",
      icon: <Users className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Share Your Ideas",
      description:
        "Reach a wider audience by sharing your posts. Your content, your voice, your platform.",
      icon: <Globe className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Secure Platform",
      description:
        "Your data is protected with industry-standard security practices. Focus on writing, we'll handle the rest.",
      icon: <Shield className="h-8 w-8 text-blue-500" />,
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <motion.div
              className="lg:w-1/2"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Share your ideas</span>
                <span className="block text-blue-600">with the world</span>
              </h1>
              <p className="mt-3 text-lg text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl max-w-xl">
                Create, manage, and publish your blog posts with our intuitive
                platform. Focus on your content, we'll handle the rest.
              </p>
              <div className="mt-8 sm:flex">
                {isAuthenticated ? (
                  <Button size="lg" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      onClick={() => navigate("/register")}
                      className="mr-4"
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate("/login")}
                    >
                      Sign In
                    </Button>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              className="mt-10 lg:mt-0 lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Blog writing"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to blog effectively
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Our platform provides all the tools you need to create and manage
              your blog content.
            </p>
          </div>

          <motion.div
            className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                variants={fadeIn}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to start your blogging journey?
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Join thousands of content creators who use our platform to share
            their ideas with the world.
          </p>
          <div className="mt-8">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate("/register")}
              >
                Get Started for Free
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
