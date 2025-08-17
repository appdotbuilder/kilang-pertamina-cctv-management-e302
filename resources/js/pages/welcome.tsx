import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">📹</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">CCTV Monitoring System</h1>
                            <p className="text-sm text-gray-600">Kilang Pertamina Internasional</p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/login">
                            <Button variant="outline" size="sm">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button size="sm">Register</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 text-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            🏭 Advanced CCTV Monitoring & Management System
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Comprehensive security monitoring solution for Kilang Pertamina Internasional refinery 
                            with real-time surveillance, interactive maps, and advanced analytics.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link href="/login">
                                <Button size="lg" className="px-8 py-4">
                                    🔐 Access Control Panel
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="outline" size="lg" className="px-8 py-4">
                                    👤 Create Account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 bg-white/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        🚀 Powerful Features
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="text-2xl mr-3">📊</span>
                                    Real-time Dashboard
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Monitor all cameras, buildings, and rooms with live status updates. 
                                    Track online/offline cameras and user activity in real-time.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="text-2xl mr-3">🗺️</span>
                                    Interactive Maps
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Navigate through buildings and rooms with OpenStreetMaps integration. 
                                    Color-coded markers show camera status at a glance.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="text-2xl mr-3">📹</span>
                                    Live Streaming
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Watch live CCTV feeds with automatic RTSP to HLS conversion. 
                                    Access from both LAN and remote locations seamlessly.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="text-2xl mr-3">⚙️</span>
                                    Admin Panel
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Complete CRUD operations for users, cameras, locations, and contacts. 
                                    Export analytics to Excel for detailed reporting.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="text-2xl mr-3">💬</span>
                                    Real-time Messaging
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Instant communication between admin and users. 
                                    Receive notifications for login events and system alerts.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="text-2xl mr-3">🎨</span>
                                    Modern Interface
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Professional 3D-style design with light/dark themes. 
                                    Responsive layout that works perfectly on all devices.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Statistics Preview */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        📈 System Overview
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg">
                            <div className="text-3xl font-bold mb-2">18</div>
                            <div className="text-blue-100">Buildings</div>
                            <div className="text-4xl mt-4">🏢</div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg">
                            <div className="text-3xl font-bold mb-2">700+</div>
                            <div className="text-green-100">CCTV Cameras</div>
                            <div className="text-4xl mt-4">📹</div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg">
                            <div className="text-3xl font-bold mb-2">24/7</div>
                            <div className="text-purple-100">Monitoring</div>
                            <div className="text-4xl mt-4">🔍</div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg">
                            <div className="text-3xl font-bold mb-2">100%</div>
                            <div className="text-orange-100">Secure</div>
                            <div className="text-4xl mt-4">🔒</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Facility?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join the advanced monitoring system and take control of your security infrastructure
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link href="/login">
                            <Button size="lg" variant="secondary" className="px-8 py-4">
                                🚀 Get Started Now
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="lg" variant="outline" className="px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                                📝 Create Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">📹</span>
                        </div>
                        <span className="text-lg font-semibold">CCTV Monitoring System</span>
                    </div>
                    <p className="text-gray-400">
                        © 2024 Kilang Pertamina Internasional. Advanced Security Monitoring Solution.
                    </p>
                </div>
            </footer>
        </div>
    );
}