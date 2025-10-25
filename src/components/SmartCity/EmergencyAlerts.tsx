import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Car, 
  Hand, 
  Users, 
  Clock,
  MapPin,
  Phone,
  Shield,
  Siren,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";

interface Alert {
  id: string;
  type: 'accident' | 'gesture' | 'suspicious' | 'fire' | 'medical';
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  coordinates: [number, number];
  description: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
  responders: number;
}

const AlertCard = ({ alert }: { alert: Alert }) => {
  const getIcon = () => {
    switch (alert.type) {
      case 'accident': return Car;
      case 'gesture': return Hand;
      case 'suspicious': return Users;
      case 'fire': return AlertTriangle;
      case 'medical': return Shield;
      default: return AlertTriangle;
    }
  };

  const Icon = getIcon();
  const severityColors = {
    critical: 'bg-red-500 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-yellow-500 text-black',
    low: 'bg-blue-500 text-white'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${severityColors[alert.severity]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold capitalize">{alert.type} Alert</h3>
            <Badge variant={alert.status === 'active' ? 'destructive' : alert.status === 'investigating' ? 'secondary' : 'default'}>
              {alert.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {alert.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {alert.timestamp}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {alert.responders} responders
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline" className="text-xs">
              <Phone className="h-3 w-3 mr-1" />
              Contact
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
              Track
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CityMap = () => (
  <div className="h-96 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg relative overflow-hidden">
    {/* Mock City Grid */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
      {/* Streets */}
      <g stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground/30">
        {/* Horizontal streets */}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 40 + 20} x2="400" y2={i * 40 + 20} />
        ))}
        {/* Vertical streets */}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`v-${i}`} x1={i * 40 + 20} y1="0" x2={i * 40 + 20} y2="300" />
        ))}
      </g>
      
      {/* Buildings */}
      <g fill="currentColor" className="text-muted-foreground/50">
        <rect x="40" y="40" width="30" height="25" />
        <rect x="80" y="30" width="35" height="35" />
        <rect x="130" y="50" width="25" height="20" />
        <rect x="200" y="25" width="40" height="45" />
        <rect x="260" y="40" width="30" height="30" />
        <rect x="320" y="35" width="35" height="35" />
        
        <rect x="50" y="120" width="25" height="30" />
        <rect x="100" y="110" width="40" height="40" />
        <rect x="170" y="130" width="30" height="25" />
        <rect x="230" y="115" width="35" height="35" />
        <rect x="290" y="125" width="25" height="25" />
        
        <rect x="60" y="200" width="35" height="30" />
        <rect x="120" y="190" width="30" height="40" />
        <rect x="180" y="210" width="40" height="25" />
        <rect x="250" y="195" width="25" height="35" />
        <rect x="310" y="205" width="30" height="25" />
      </g>
      
      {/* Active Alert Markers */}
      <g>
        <circle cx="150" cy="80" r="8" fill="red" className="animate-pulse" />
        <circle cx="250" cy="160" r="6" fill="orange" className="animate-pulse" />
        <circle cx="320" cy="220" r="5" fill="yellow" />
      </g>
      
      {/* Street Light Icons */}
      <g fill="currentColor" className="text-primary">
        {Array.from({ length: 15 }, (_, i) => (
          <circle 
            key={`light-${i}`} 
            cx={(i % 5) * 80 + 60} 
            cy={Math.floor(i / 5) * 80 + 60} 
            r="3"
            className="opacity-60"
          />
        ))}
      </g>
    </svg>
    
    {/* Legend */}
    <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 text-xs">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span>Critical Alert</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
        <span>High Priority</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-primary rounded-full"></div>
        <span>Street Lights</span>
      </div>
    </div>
  </div>
);

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'accident',
      severity: 'critical',
      location: 'Main St & 5th Ave',
      coordinates: [40.7128, -74.0060],
      description: 'Vehicle collision detected. Multiple vehicles involved. Emergency services dispatched.',
      timestamp: '2 min ago',
      status: 'active',
      responders: 3
    },
    {
      id: '2',
      type: 'gesture',
      severity: 'high',
      location: 'Central Park - East Side',
      coordinates: [40.7829, -73.9654],
      description: 'Emergency hand gesture detected by CCTV. Woman appears to be in distress.',
      timestamp: '5 min ago',
      status: 'investigating',
      responders: 2
    },
    {
      id: '3',
      type: 'suspicious',
      severity: 'medium',
      location: 'Shopping District - Block 7',
      coordinates: [40.7589, -73.9851],
      description: 'Unusual gathering detected after hours. Multiple individuals in restricted area.',
      timestamp: '12 min ago',
      status: 'investigating',
      responders: 1
    },
    {
      id: '4',
      type: 'medical',
      severity: 'high',
      location: 'University Campus - Building A',
      coordinates: [40.7295, -73.9965],
      description: 'Person collapsed detected by AI analysis. Medical assistance requested.',
      timestamp: '18 min ago',
      status: 'resolved',
      responders: 4
    }
  ]);

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: ['accident', 'gesture', 'suspicious', 'medical'][Math.floor(Math.random() * 4)] as Alert['type'],
          severity: ['critical', 'high', 'medium'][Math.floor(Math.random() * 3)] as Alert['severity'],
          location: ['Downtown Core', 'Residential Area', 'Industrial Zone', 'Shopping Center'][Math.floor(Math.random() * 4)],
          coordinates: [40.7128 + (Math.random() - 0.5) * 0.1, -74.0060 + (Math.random() - 0.5) * 0.1],
          description: 'AI-detected incident requiring immediate attention.',
          timestamp: 'Just now',
          status: 'active',
          responders: Math.floor(Math.random() * 3) + 1
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
  const activeAlerts = alerts.filter(a => a.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-primary">Emergency Alert Center</h1>
          <p className="text-muted-foreground">Real-time incident monitoring and emergency response</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Siren className="h-4 w-4 mr-2" />
            Emergency Broadcast
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Contact Control
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-500">{criticalAlerts}</p>
                <p className="text-xs text-muted-foreground">Critical Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-orange-500">{activeAlerts}</p>
                <p className="text-xs text-muted-foreground">Active Incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-500">12</p>
                <p className="text-xs text-muted-foreground">Responders Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-500">2.3</p>
                <p className="text-xs text-muted-foreground">Avg Response (min)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Alerts Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Live Alert Feed
            </CardTitle>
            <CardDescription>Real-time emergency notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* City Map with Incidents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Incident Map
            </CardTitle>
            <CardDescription>Live incident locations across the city</CardDescription>
          </CardHeader>
          <CardContent>
            <CityMap />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyAlerts;