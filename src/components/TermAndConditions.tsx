import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="p-6  border-[3px] border-white border-dashed rounded-2xl ">
            <div className="rounded-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-200 ">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Terms and Conditions</h1>
                <p className="text-lg text-center text-gray-600 mb-10">
                    Please read these Terms and Conditions carefully before using our website. By accessing or using our service, you agree to be bound by these terms. If you do not agree with any part of the terms, you may not access the service.
                </p>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 mt-2">
                            By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms apply to all visitors, users, and others who access the service.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700">2. Changes to Terms</h2>
                        <p className="text-gray-600 mt-2">
                            We reserve the right to modify or replace these Terms and Conditions at any time. Your continued use of the website after any changes signifies your acceptance of the new terms.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700">3. Use of Service</h2>
                        <p className="text-gray-600 mt-2">
                            You agree not to misuse our services or help anyone else to do so. Misuse includes using the services for any illegal or unauthorized purposes, disrupting the services, or violating {`other's`} rights.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700">4. Limitation of Liability</h2>
                        <p className="text-gray-600 mt-2">
                            To the extent permitted by law, we are not liable for any damages resulting from your use of our services. We provide the services as is without warranties of any kind, either express or implied.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700">5. Termination</h2>
                        <p className="text-gray-600 mt-2">
                            We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason, including if you breach the terms.
                        </p>
                    </div>
                    
                    <div className="text-center mt-8">
                        <p className="text-lg text-gray-700">
                            If you have any questions about these Terms and Conditions, feel free to <a href="/contact" className="text-blue-600 hover:text-blue-800">contact us</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
