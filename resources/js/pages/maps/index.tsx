import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface CameraData {
    id: number;
    name: string;
    code: string;
    latitude: number;
    longitude: number;
    status: 'online' | 'offline' | 'maintenance';
    ip_address: string;
    hls_url: string | null;
    last_ping: string | null;
}

interface RoomData {
    id: number;
    name: string;
    code: string;
    latitude: number;
    longitude: number;
    status: string;
    cameras: CameraData[];
}

interface BuildingData {
    id: number;
    name: string;
    code: string;
    latitude: number;
    longitude: number;
    status: string;
    room_count: number;
    camera_count: number;
    rooms: RoomData[];
}

interface CameraStats {
    total: number;
    online: number;
    offline: number;
    maintenance: number;
}

interface Props {
    buildings: BuildingData[];
    camera_stats: CameraStats;
    [key: string]: unknown;
}

export default function MapsIndex({ buildings, camera_stats }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null);
    const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline' | 'maintenance'>('all');
    const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null);

    const filteredBuildings = buildings.filter(building =>
        building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        building.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBuildingClick = (building: BuildingData) => {
        setSelectedBuilding(building);
        setSelectedCamera(null);
    };

    const handleCameraClick = (camera: CameraData) => {
        setSelectedCamera(camera);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online':
                return 'bg-green-500';
            case 'offline':
                return 'bg-red-500';
            case 'maintenance':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

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

    const filterCamerasByStatus = (cameras: CameraData[]) => {
        if (statusFilter === 'all') return cameras;
        return cameras.filter(camera => camera.status === statusFilter);
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🗺️ Interactive Maps</h1>
                        <p className="text-gray-600 mt-2">
                            Navigate through buildings and access live CCTV feeds with interactive mapping
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="🔍 Search buildings..."
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
                            All ({camera_stats.total})
                        </Button>
                        <Button
                            variant={statusFilter === 'online' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('online')}
                            size="sm"
                            className="text-green-600 border-green-300"
                        >
                            🟢 Online ({camera_stats.online})
                        </Button>
                        <Button
                            variant={statusFilter === 'offline' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('offline')}
                            size="sm"
                            className="text-red-600 border-red-300"
                        >
                            🔴 Offline ({camera_stats.offline})
                        </Button>
                        <Button
                            variant={statusFilter === 'maintenance' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('maintenance')}
                            size="sm"
                            className="text-yellow-600 border-yellow-300"
                        >
                            🟡 Maintenance ({camera_stats.maintenance})
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Buildings List */}
                    <div className="lg:col-span-1">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>🏢</span>
                                    <span>Buildings ({filteredBuildings.length})</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {filteredBuildings.map((building) => (
                                        <div
                                            key={building.id}
                                            onClick={() => handleBuildingClick(building)}
                                            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                                                selectedBuilding?.id === building.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-sm">{building.name}</h3>
                                                <Badge variant="outline" className="text-xs">
                                                    {building.code}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-600">
                                                <span>📹 {building.camera_count} cameras</span>
                                                <span>🚪 {building.room_count} rooms</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Map Area & Camera Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Mock Map Interface */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span>🗺️</span>
                                        <span>
                                            {selectedBuilding 
                                                ? `${selectedBuilding.name} - Room View` 
                                                : 'Kilang Pertamina Internasional - Building Overview'
                                            }
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">📍 Satellite</Button>
                                        <Button variant="outline" size="sm">🗺️ Street</Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden border-2 border-dashed border-gray-300">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">🗺️</div>
                                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                                Interactive Map Interface
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {selectedBuilding
                                                    ? `Showing cameras in ${selectedBuilding.name}`
                                                    : 'Select a building to view detailed camera locations'
                                                }
                                            </p>
                                            
                                            {/* Mock Map Markers */}
                                            {selectedBuilding && (
                                                <div className="grid grid-cols-6 gap-4 max-w-md mx-auto">
                                                    {selectedBuilding.rooms.slice(0, 12).map((room) => (
                                                        filterCamerasByStatus(room.cameras).map((camera) => (
                                                            <div
                                                                key={camera.id}
                                                                onClick={() => handleCameraClick(camera)}
                                                                className="relative cursor-pointer transform hover:scale-110 transition-transform"
                                                                title={`${camera.name} - ${camera.status}`}
                                                            >
                                                                <div className={`w-6 h-6 rounded-full ${getStatusColor(camera.status)} border-2 border-white shadow-lg`}></div>
                                                                <div className="text-xs mt-1 text-gray-700">
                                                                    {getStatusIcon(camera.status)}
                                                                </div>
                                                            </div>
                                                        ))
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Selected Camera Details */}
                        {selectedCamera && (
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span>📹</span>
                                            <span>{selectedCamera.name}</span>
                                        </div>
                                        <Badge variant={selectedCamera.status === 'online' ? 'default' : 'secondary'}>
                                            {getStatusIcon(selectedCamera.status)} {selectedCamera.status.toUpperCase()}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Camera Info */}
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-sm text-gray-700 mb-2">Camera Details</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Code:</span>
                                                        <span className="font-mono">{selectedCamera.code}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">IP Address:</span>
                                                        <span className="font-mono">{selectedCamera.ip_address}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Status:</span>
                                                        <Badge variant="outline">{selectedCamera.status}</Badge>
                                                    </div>
                                                    {selectedCamera.last_ping && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Last Ping:</span>
                                                            <span>{new Date(selectedCamera.last_ping).toLocaleString()}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex space-x-2">
                                                <Button 
                                                    size="sm" 
                                                    disabled={selectedCamera.status !== 'online'}
                                                    className="flex items-center space-x-1"
                                                >
                                                    <span>📺</span>
                                                    <span>View Live Stream</span>
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    📊 Camera Stats
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Live Stream Placeholder */}
                                        <div className="space-y-4">
                                            <h4 className="font-semibold text-sm text-gray-700">Live Stream</h4>
                                            <div className="bg-gray-900 rounded-lg h-48 flex items-center justify-center">
                                                {selectedCamera.status === 'online' ? (
                                                    <div className="text-center text-white">
                                                        <div className="text-4xl mb-2">📹</div>
                                                        <p className="text-sm">Live Stream Active</p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            HLS: {selectedCamera.hls_url || 'Converting...'}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="text-center text-gray-400">
                                                        <div className="text-4xl mb-2">📵</div>
                                                        <p className="text-sm">Camera {selectedCamera.status}</p>
                                                        <p className="text-xs mt-1">Stream unavailable</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}