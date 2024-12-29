import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Mail, Clock, FileText } from 'lucide-react';
import AuthContext from '../../context/authContext';

export const EmailSchedulingForm = () => {
    const [formData, setFormData] = useState({
        subject: '',
        body: '',
        scheduledTime: ''
    });
    const [status, setStatus] = useState({ message: '', isError: false });
    const { token, logout } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/v1/emails/schedule-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setStatus({ message: 'Email scheduled successfully!', isError: false });
                setFormData({ subject: '', body: '', scheduledTime: '' });
            } else {
                if (response.status === 401) {
                    logout();
                    navigate('/login');
                }
                setStatus({ message: data.message, isError: true });
            }
        } catch (error) {
            console.error('Email scheduling error:', error);
            setStatus({ message: 'Failed to schedule email. Please try again.', isError: true });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Schedule Email
                    </h2>
                </div>

                <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    {status.message && (
                        <div className={`p-4 rounded ${status.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {status.message}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                <Mail className="inline-block w-4 h-4 mr-2" />
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                                <FileText className="inline-block w-4 h-4 mr-2" />
                                Email Body
                            </label>
                            <textarea
                                id="body"
                                required
                                rows={4}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.body}
                                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700">
                                <Clock className="inline-block w-4 h-4 mr-2" />
                                Schedule Time
                            </label>
                            <input
                                type="datetime-local"
                                id="scheduledTime"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.scheduledTime}
                                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <CalendarIcon className="w-5 h-5 mr-2" />
                            Schedule Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
