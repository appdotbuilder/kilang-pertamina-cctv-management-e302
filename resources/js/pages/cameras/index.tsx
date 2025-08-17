import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function CamerasIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline' | 'maintenance'>('all');
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

    // Mock camera data - in real implementation, this would come from props
    const mockCameras = Array.from({ length: 24 }, (_, index) => ({
        id: index + 1,
        name: `Camera ${String(index + 1).padStart(3, '0')}`,
        code: `CAM-${String(index + 1).padStart(3, '0')}`,
        building: `Building ${Math.floor(index / 6) + 1}`,
        room: `Room ${(index % 6) + 1}`,
        status: ['online', 'offline', 'maintenance'][Math.floor(Math.random() * 3)] as 'online' | 'offline' | 'maintenance',
        ip_address: `192.168.1.${100 + index}`,
        last_ping: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 3600000).toISOString() : null,
    }));

    const filteredCameras = mockCameras.filter(camera => {
        const matchesSearch = camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            camera.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            camera.building.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || camera.status === statusFilter;
        return matchesSearch && matchesStatus;
    });



    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'online':
                return '🟢';
            case 'offline':
                return '🔴';
            case 'maintenance':
                return '🟡';
            default:
                return '⚪';
        }
    };

    const statusCounts = {
        total: mockCameras.length,
        online: mockCameras.filter(c => c.status === 'online').length,
        offline: mockCameras.filter(c => c.status === 'offline').length,
        maintenance: mockCameras.filter(c => c.status === 'maintenance').length,
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📹 Live Camera Feeds</h1>
                        <p className="text-gray-600 mt-2">
                            Monitor all CCTV cameras with real-time streaming and status updates
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline">🔄 Refresh All</Button>
                        <Button variant="outline">📊 Full Screen Grid</Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">{statusCounts.total}</div>
                        <div className="text-blue-100">Total Cameras</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">{statusCounts.online}</div>
                        <div className="text-green-100">Online</div>
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">{statusCounts.offline}</div>
                        <div className="text-red-100">Offline</div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">{statusCounts.maintenance}</div>
                        <div className="text-yellow-100">Maintenance</div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="🔍 Search cameras..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant={statusFilter === 'all' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('all')}
                            size="sm"
                        >
                            All ({statusCounts.total})
                        </Button>
                        <Button
                            variant={statusFilter === 'online' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('online')}
                            size="sm"
                            className="text-green-600 border-green-300"
                        >
                            🟢 Online ({statusCounts.online})
                        </Button>
                        <Button
                            variant={statusFilter === 'offline' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('offline')}
                            size="sm"
                            className="text-red-600 border-red-300"
                        >
                            🔴 Offline ({statusCounts.offline})
                        </Button>
                        <Button
                            variant={statusFilter === 'maintenance' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('maintenance')}
                            size="sm"
                            className="text-yellow-600 border-yellow-300"
                        >
                            🟡 Maintenance ({statusCounts.maintenance})
                        </Button>
                    </div>
                </div>

                {/* Camera Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCameras.map((camera) => (
                        <Card key={camera.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-semibold">{camera.name}</CardTitle>
                                    <Badge 
                                        variant={camera.status === 'online' ? 'default' : 'secondary'}
                                        className="text-xs"
                                    >
                                        {getStatusIcon(camera.status)} {camera.status.toUpperCase()}
                                    </Badge>
                                </div>
                                <div className="text-xs text-gray-600">
                                    {camera.building} - {camera.room}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Video Stream Area */}
                                <div className="relative">
                                    <div className="bg-gray-900 rounded-lg h-40 flex items-center justify-center relative overflow-hidden">
                                        {camera.status === 'online' ? (
                                            <>
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900"></div>
                                                <div className="relative text-center text-white z-10">
                                                    <div className="text-3xl mb-2">📹</div>
                                                    <p className="text-sm">Live Stream</p>
                                                    <div className="mt-2 flex items-center justify-center space-x-1">
                                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                        <span className="text-xs">REC</span>
                                                    </div>
                                                </div>
                                                {/* Mock video overlay */}
                                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                    {new Date().toLocaleTimeString()}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center text-gray-400">
                                                <div className="text-3xl mb-2">
                                                    {camera.status === 'offline' ? '📵' : '🔧'}
                                                </div>
                                                <p className="text-sm capitalize">{camera.status}</p>
                                                <p className="text-xs mt-1">Stream unavailable</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Stream Controls */}
                                    <div className="absolute top-2 right-2 flex space-x-1">
                                        <button className="bg-black bg-opacity-50 text-white p-1 rounded text-xs hover:bg-opacity-70 transition-colors">
                                            🔍
                                        </button>
                                        <button className="bg-black bg-opacity-50 text-white p-1 rounded text-xs hover:bg-opacity-70 transition-colors">
                                            ⚙️
                                        </button>
                                    </div>
                                </div>

                                {/* Camera Info */}
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Code:</span>
                                        <span className="font-mono">{camera.code}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">IP:</span>
                                        <span className="font-mono">{camera.ip_address}</span>
                                    </div>
                                    {camera.last_ping && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Last Ping:</span>
                                            <span>{new Date(camera.last_ping).toLocaleTimeString()}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2">
                                    <Button 
                                        size="sm" 
                                        disabled={camera.status !== 'online'}
                                        className="flex-1 text-xs"
                                        onClick={() => setSelectedCamera(selectedCamera === camera.code ? null : camera.code)}
                                    >
                                        {selectedCamera === camera.code ? '📺 Exit Full' : '🔍 Full View'}
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-xs">
                                        📊
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Full Screen View Modal */}
                {selectedCamera && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg max-w-6xl w-full max-h-full overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="text-lg font-semibold">
                                    📹 Camera {selectedCamera} - Full Screen View
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedCamera(null)}
                                >
                                    ✕ Close
                                </Button>
                            </div>
                            <div className="p-4">
                                <div className="bg-gray-900 rounded-lg h-96 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900"></div>
                                    <div className="relative text-center text-white z-10">
                                        <div className="text-6xl mb-4">📹</div>
                                        <h3 className="text-2xl font-semibold mb-2">Live Stream - Camera {selectedCamera}</h3>
                                        <p className="text-lg mb-4">Full Screen CCTV Feed</p>
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                            <span>RECORDING LIVE</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                                        {new Date().toLocaleString()}
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                                        1920x1080 • 30 FPS
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* No Results */}
                {filteredCameras.length === 0 && (
                    <Card className="border-0 shadow-lg">
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No cameras found</h3>
                            <p className="text-gray-600 mb-4">
                                Try adjusting your search criteria or filter settings
                            </p>
                            <Button variant="outline" onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}>
                                Clear Filters
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}