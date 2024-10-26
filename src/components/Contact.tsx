"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate fields
        if (!name) {
            toast.error("Please fill in your name!");
            return;
        }

        if (!email) {
            toast.error("Please fill in your email address!");
            return;
        }

        if (!message) {
            toast.error("Please fill in your message!");
            return;
        }

        // All fields are filled, show success toast
        toast.success("Message sent successfully!");

        // Optionally reset the form
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto border-[3px] border-white border-dashed rounded-2xl">
            <div className="rounded-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-200">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
                <p className="text-lg text-center text-gray-600 mb-10">
                    Have any questions? {`We'd`} love to hear from you! Fill out the form below, and {`we'll`} get back to you as soon as possible.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                            Your Name
                        </label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            className="mt-1 block text-black w-full border-gray-300 rounded-md shadow-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update state on change
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                            Email Address
                        </label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="mt-1 block text-black w-full border-gray-300 rounded-md shadow-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update state on change
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-bold text-gray-700">
                            Message
                        </label>
                        <Textarea
                            id="message"
                            rows={4}
                            placeholder="Write your message..."
                            className="text-black mt-1 bg-transparent block w-full border-gray-300 rounded-md shadow-sm"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} // Update state on change
                        />
                    </div>

                    <div className="text-center">
                        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            Send Message
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer /> {/* Add ToastContainer to render toasts */}
        </div>
    );
};

export default Contact;
