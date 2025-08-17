import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
    buildings: {
        total: number;
        active: number;
        inactive: number;
    };
    rooms: {
        total: number;
        active: number;
        inactive: number;
    };
    cameras: {
        total: number;
        online: number;
        offline: number;
        maintenance: number;
    };
    users?: {
        total: number;
        active: number;
        online: number;
        offline: number;
    };
    signal_analytics?: {
        strong_signal: number;
        medium_signal: number;
        weak_signal: number;
        no_signal: number;
    };
}

interface Notification {
    id: number;
    title: string;
    message: string;
    type: string;
    created_at: string;
    read_at: string | null;
}

interface Props {
    stats: DashboardStats;
    notifications: Notification[];
    user_role: string;
    [key: string]: unknown;
}

export default function Dashboard({ stats, notifications, user_role }: Props) {
    const isAdmin = user_role === 'admin';

    const exportToExcel = () => {
        // Prepare data for Excel export
        const data = {
            buildings: stats.buildings,
            rooms: stats.rooms,
            cameras: stats.cameras,
            users: stats.users,
            signal_analytics: stats.signal_analytics,
            generated_at: new Date().toISOString(),
        };

        // Create and download Excel file (simplified version)
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cctv-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isAdmin ? '⚙️ Admin Dashboard' : '📊 Monitoring Dashboard'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {isAdmin 
                                ? 'Complete system overview and management controls'
                                : 'Real-time CCTV monitoring and facility status'
                            }
                        </p>
                    </div>
                    {isAdmin && (
                        <Button onClick={exportToExcel} className="flex items-center space-x-2">
                            <span>📊</span>
                            <span>Export Analytics</span>
                        </Button>
                    )}
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Buildings Card */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">🏢 Buildings</CardTitle>
                            <div className="text-2xl">🏭</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.buildings.total}</div>
                            <div className="flex space-x-4 mt-3">
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-gray-600">Active: {stats.buildings.active}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span className="text-xs text-gray-600">Inactive: {stats.buildings.inactive}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rooms Card */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">🚪 Rooms</CardTitle>
                            <div className="text-2xl">🏠</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{stats.rooms.total}</div>
                            <div className="flex space-x-4 mt-3">
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-gray-600">Active: {stats.rooms.active}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span className="text-xs text-gray-600">Inactive: {stats.rooms.inactive}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CCTV Cameras Card */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">📹 CCTV Cameras</CardTitle>
                            <div className="text-2xl">🔍</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.cameras.total}</div>
                            <div className="grid grid-cols-3 gap-2 mt-3">
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-gray-600">{stats.cameras.online}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span className="text-xs text-gray-600">{stats.cameras.offline}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span className="text-xs text-gray-600">{stats.cameras.maintenance}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Admin-specific sections */}
                {isAdmin && stats.users && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Users Card */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">👥 Users Status</CardTitle>
                                <div className="text-2xl">👤</div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-indigo-600 mb-4">{stats.users.total} Total Users</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div>
                                            <div className="text-sm font-medium text-gray-600">Online</div>
                                            <div className="text-xl font-bold text-green-600">{stats.users.online}</div>
                                        </div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <div className="text-sm font-medium text-gray-600">Offline</div>
                                            <div className="text-xl font-bold text-gray-600">{stats.users.offline}</div>
                                        </div>
                                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Signal Analytics Card */}
                        {stats.signal_analytics && (
                            <Card className="border-0 shadow-lg">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">📡 Signal Analytics</CardTitle>
                                    <div className="text-2xl">📊</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                <span className="text-sm">Strong Signal</span>
                                            </div>
                                            <span className="font-semibold">{stats.signal_analytics.strong_signal}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                <span className="text-sm">Medium Signal</span>
                                            </div>
                                            <span className="font-semibold">{stats.signal_analytics.medium_signal}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                                <span className="text-sm">Weak Signal</span>
                                            </div>
                                            <span className="font-semibold">{stats.signal_analytics.weak_signal}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                <span className="text-sm">No Signal</span>
                                            </div>
                                            <span className="font-semibold">{stats.signal_analytics.no_signal}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Recent Notifications */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span>🔔</span>
                            <span>Recent Notifications</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {notifications.length > 0 ? (
                            <div className="space-y-3">
                                {notifications.map((notification) => (
                                    <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-shrink-0">
                                            {notification.type === 'login' && <span className="text-blue-500">🔐</span>}
                                            {notification.type === 'message' && <span className="text-green-500">💬</span>}
                                            {notification.type === 'system' && <span className="text-orange-500">⚙️</span>}
                                            {notification.type === 'camera_status' && <span className="text-red-500">📹</span>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {notification.title}
                                                </p>
                                                {!notification.read_at && (
                                                    <Badge variant="secondary" className="ml-2">New</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(notification.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <span className="text-4xl mb-4 block">📭</span>
                                <p>No recent notifications</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span>🚀</span>
                            <span>Quick Actions</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button variant="outline" className="h-20 flex-col space-y-2">
                                <span className="text-2xl">🗺️</span>
                                <span className="text-sm">View Maps</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col space-y-2">
                                <span className="text-2xl">📹</span>
                                <span className="text-sm">Live Streams</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col space-y-2">
                                <span className="text-2xl">📞</span>
                                <span className="text-sm">Contacts</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col space-y-2">
                                <span className="text-2xl">⚙️</span>
                                <span className="text-sm">Settings</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}