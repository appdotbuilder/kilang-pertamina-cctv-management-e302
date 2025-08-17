import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Contact {
    id: number;
    name: string;
    title: string;
    email: string;
    phone: string;
    whatsapp?: string;
    address: string;
    status: string;
}

interface ContactsData {
    data: Contact[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    contacts: ContactsData;
    [key: string]: unknown;
}

export default function ContactsIndex({ contacts }: Props) {
    const handleEmailClick = (email: string) => {
        window.open(`mailto:${email}`, '_blank');
    };

    const handlePhoneClick = (phone: string) => {
        window.open(`tel:${phone}`, '_blank');
    };

    const handleWhatsAppClick = (whatsapp: string) => {
        const cleanNumber = whatsapp.replace(/[^\d]/g, '');
        window.open(`https://wa.me/${cleanNumber}`, '_blank');
    };

    const handleAddressClick = (address: string) => {
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📞 Emergency Contacts</h1>
                        <p className="text-gray-600 mt-2">
                            Quick access to important contacts and emergency services
                        </p>
                    </div>
                </div>

                {/* Emergency Contacts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contacts.data.map((contact) => (
                        <Card key={contact.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl">
                                            👤
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{contact.name}</CardTitle>
                                            <p className="text-sm text-gray-600 mt-1">{contact.title}</p>
                                        </div>
                                    </div>
                                    <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                                        {contact.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Email */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                        <span className="text-lg">📧</span>
                                        <span className="text-sm text-gray-600 truncate">{contact.email}</span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEmailClick(contact.email)}
                                        className="ml-2"
                                    >
                                        Send
                                    </Button>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                        <span className="text-lg">📱</span>
                                        <span className="text-sm text-gray-600 truncate">{contact.phone}</span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePhoneClick(contact.phone)}
                                        className="ml-2"
                                    >
                                        Call
                                    </Button>
                                </div>

                                {/* WhatsApp */}
                                {contact.whatsapp && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                                            <span className="text-lg">💬</span>
                                            <span className="text-sm text-gray-600 truncate">{contact.whatsapp}</span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleWhatsAppClick(contact.whatsapp!)}
                                            className="ml-2 text-green-600 border-green-300 hover:bg-green-50"
                                        >
                                            WhatsApp
                                        </Button>
                                    </div>
                                )}

                                {/* Address */}
                                <div className="space-y-2">
                                    <div className="flex items-start space-x-2">
                                        <span className="text-lg mt-0.5">📍</span>
                                        <p className="text-sm text-gray-600 leading-relaxed">{contact.address}</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAddressClick(contact.address)}
                                        className="w-full mt-2"
                                    >
                                        🗺️ View on Map
                                    </Button>
                                </div>

                                {/* Quick Actions */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handlePhoneClick(contact.phone)}
                                            className="flex-1"
                                        >
                                            🚨 Emergency Call
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEmailClick(contact.email)}
                                            className="flex-1"
                                        >
                                            📬 Quick Email
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Emergency Information */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-red-700">
                                <span className="text-2xl">🚨</span>
                                <span>Emergency Procedures</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span>Fire Emergency: Evacuate immediately and call Fire Station</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    <span>Security Incident: Contact Security Manager directly</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                    <span>Technical Issues: Reach out to IT Infrastructure Manager</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span>CCTV Problems: Contact CCTV Operations Supervisor</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-blue-700">
                                <span className="text-2xl">ℹ️</span>
                                <span>Quick Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Main Gate:</span>
                                    <span className="font-semibold">+62-21-1234-5000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Control Room:</span>
                                    <span className="font-semibold">+62-21-1234-5001</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Emergency Line:</span>
                                    <span className="font-semibold text-red-600">911</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">IT Helpdesk:</span>
                                    <span className="font-semibold">+62-21-1234-5555</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-blue-200">
                                <p className="text-xs text-blue-600">
                                    🌐 All contacts are available 24/7 for emergency situations
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Statistics */}
                {contacts.total > 0 && (
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>📊</span>
                                <span>Contact Directory Summary</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">{contacts.total}</div>
                                    <div className="text-sm text-blue-700">Total Contacts</div>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {contacts.data.filter(c => c.status === 'active').length}
                                    </div>
                                    <div className="text-sm text-green-700">Active Contacts</div>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {contacts.data.filter(c => c.whatsapp).length}
                                    </div>
                                    <div className="text-sm text-purple-700">WhatsApp Available</div>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-600">24/7</div>
                                    <div className="text-sm text-orange-700">Emergency Support</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}