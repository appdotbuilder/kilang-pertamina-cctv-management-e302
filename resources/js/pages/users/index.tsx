import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function UsersIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    
    // Mock user data - in real implementation, this would come from props
    const mockUsers = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        email: `user${index + 1}@pertamina.com`,
        role: index === 0 ? 'admin' : 'user',
        status: Math.random() > 0.1 ? 'active' : 'inactive',
        last_login_at: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 86400000 * 7).toISOString() : null,
        created_at: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
    }));

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        total: mockUsers.length,
        active: mockUsers.filter(u => u.status === 'active').length,
        admins: mockUsers.filter(u => u.role === 'admin').length,
        online: mockUsers.filter(u => u.last_login_at && new Date(u.last_login_at) > new Date(Date.now() - 30 * 60 * 1000)).length,
    };

    const getRoleColor = (role: string) => {
        return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
    };

    const getStatusColor = (status: string) => {
        return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const isOnline = (lastLogin: string | null) => {
        if (!lastLogin) return false;
        return new Date(lastLogin) > new Date(Date.now() - 30 * 60 * 1000);
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">👥 User Management</h1>
                        <p className="text-gray-600 mt-2">
                            Manage system users, roles, and access permissions for the CCTV monitoring system
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button>➕ Add New User</Button>
                        <Button variant="outline">📊 Export Users</Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <div className="text-blue-100">Total Users</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">{stats.active}</div>
                        <div className="text-green-100">Active Users</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">{stats.admins}</div>
                        <div className="text-purple-100">Administrators</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">{stats.online}</div>
                        <div className="text-orange-100">Currently Online</div>
                    </div>
                </div>

                {/* Search */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="🔍 Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">All Users</Button>
                        <Button variant="outline" size="sm">👑 Admins Only</Button>
                        <Button variant="outline" size="sm">🟢 Active Only</Button>
                        <Button variant="outline" size="sm">⏰ Recently Active</Button>
                    </div>
                </div>

                {/* Users Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <Card key={user.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl relative">
                                            👤
                                            {isOnline(user.last_login_at) && (
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                            )}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{user.name}</CardTitle>
                                            <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Role and Status Badges */}
                                <div className="flex justify-between items-center">
                                    <Badge className={getRoleColor(user.role)}>
                                        {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                                    </Badge>
                                    <Badge className={getStatusColor(user.status)}>
                                        {user.status === 'active' ? '✅ Active' : '❌ Inactive'}
                                    </Badge>
                                </div>

                                {/* User Details */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">User ID:</span>
                                        <span className="font-mono">#{user.id.toString().padStart(4, '0')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className="flex items-center space-x-1">
                                            {isOnline(user.last_login_at) ? (
                                                <>
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-green-600">Online</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                    <span className="text-gray-600">Offline</span>
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Last Login:</span>
                                        <span>
                                            {user.last_login_at 
                                                ? new Date(user.last_login_at).toLocaleDateString()
                                                : 'Never'
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Member Since:</span>
                                        <span>{new Date(user.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Permissions Summary */}
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm text-gray-700">Access Permissions</h4>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center space-x-1">
                                            <span className={user.role === 'admin' ? 'text-green-600' : 'text-blue-600'}>✓</span>
                                            <span>Dashboard</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span className={user.role === 'admin' ? 'text-green-600' : 'text-blue-600'}>✓</span>
                                            <span>Live Cameras</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span className={user.role === 'admin' ? 'text-green-600' : 'text-blue-600'}>✓</span>
                                            <span>Maps</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span className={user.role === 'admin' ? 'text-green-600' : 'text-blue-600'}>✓</span>
                                            <span>Contacts</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span className={user.role === 'admin' ? 'text-green-600' : 'text-gray-400'}>
                                                {user.role === 'admin' ? '✓' : '✗'}
                                            </span>
                                            <span className={user.role === 'admin' ? '' : 'text-gray-400'}>User Management</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span className={user.role === 'admin' ? 'text-green-600' : 'text-gray-400'}>
                                                {user.role === 'admin' ? '✓' : '✗'}
                                            </span>
                                            <span className={user.role === 'admin' ? '' : 'text-gray-400'}>System Settings</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2 pt-2 border-t border-gray-100">
                                    <Button size="sm" variant="outline" className="flex-1">
                                        ✏️ Edit
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1">
                                        💬 Message
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className={user.status === 'active' ? 'text-red-600' : 'text-green-600'}
                                    >
                                        {user.status === 'active' ? '🔒 Suspend' : '🔓 Activate'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Activity Log */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span>📋</span>
                            <span>Recent User Activity</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {Array.from({ length: 5 }, (_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm">
                                            User {i + 1} {['logged in', 'accessed camera feeds', 'viewed maps', 'updated profile', 'logged out'][i]}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(Date.now() - i * 1000000).toLocaleTimeString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* No Results */}
                {filteredUsers.length === 0 && (
                    <Card className="border-0 shadow-lg">
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
                            <p className="text-gray-600 mb-4">
                                Try adjusting your search query
                            </p>
                            <Button variant="outline" onClick={() => setSearchQuery('')}>
                                Clear Search
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}