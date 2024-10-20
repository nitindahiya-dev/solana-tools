import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const Contact = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto border-[3px] border-white border-dashed rounded-2xl ">
            <div className="rounded-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-200 ">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
                <p className="text-lg text-center text-gray-600 mb-10">
                    Have any questions? {`We'd`} love to hear from you! Fill out the form below, and {`we'll`} get back to you as soon as possible.
                </p>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Your Name
                        </label>
                        <Input type="text" id="name" placeholder="Enter your name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <Input type="email" id="email" placeholder="you@example.com" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <Textarea id="message" rows={4} placeholder="Write your message..." className="mt-1 bg-transparent block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>

                    <div className="text-center">
                        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            Send Message
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
