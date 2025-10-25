import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Lightbulb, 
  Users, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Shield,
  Activity,
  MapPin,
  Eye,
  Settings,
  Brain,
  Video,
  Wifi,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatusCard = ({ title, value, subtitle, icon: Icon, trend, color = "primary" }: any) => {
  const colorMap = {
    primary: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    secondary: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    accent: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30"
  };

  const iconColorMap = {
    primary: "text-blue-600",
    secondary: "text-purple-600",
    accent: "text-cyan-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="glass-card group overflow-hidden relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[color as keyof typeof colorMap]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">{value}</p>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
            <motion.div 
              className={`p-4 rounded-2xl bg-gradient-to-br ${colorMap[color as keyof typeof colorMap]} backdrop-blur-sm border`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon className={`h-7 w-7 ${iconColorMap[color as keyof typeof iconColorMap]}`} />
            </motion.div>
          </div>
          {trend && (
            <div className="mt-4 flex items-center text-sm">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              </motion.div>
              <span className="text-green-500 font-semibold">{trend}%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AlertItem = ({ type, location, time, severity }: any) => (
  <div className="flex items-center gap-3 p-3 border rounded-lg">
    <AlertTriangle className={`h-4 w-4 ${severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
    <div className="flex-1">
      <p className="text-sm font-medium">{type}</p>
      <p className="text-xs text-muted-foreground">{location}</p>
    </div>
    <Badge variant={severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
      {time}
    </Badge>
  </div>
);

const Dashboard = () => {
  const [energySavings, setEnergySavings] = useState(73);
  const [activeZones, setActiveZones] = useState(23);
  const [activeLights, setActiveLights] = useState(1247);
  const [energyData, setEnergyData] = useState<number[]>([45, 52, 48, 55, 49, 60, 58]);
  const [pedestrianData, setPedestrianData] = useState<number[]>([120, 145, 138, 165, 152, 178, 162]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergySavings(prev => Math.max(65, Math.min(85, prev + (Math.random() - 0.5) * 3)));
      setActiveZones(prev => Math.max(20, Math.min(30, prev + Math.floor((Math.random() - 0.5) * 3))));
      setActiveLights(prev => Math.max(1200, Math.min(1300, prev + Math.floor((Math.random() - 0.5) * 20))));
      
      // Update chart data
      setEnergyData(prev => [...prev.slice(1), Math.floor(Math.random() * 30) + 45]);
      setPedestrianData(prev => [...prev.slice(1), Math.floor(Math.random() * 60) + 120]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const alerts = [
    { type: "High Traffic Detected", location: "Sector 7 - Main St", time: "2m ago", severity: "high" },
    { type: "AI Model Updated", location: "Central System", time: "5m ago", severity: "medium" },
    { type: "Energy Optimization", location: "District A", time: "12m ago", severity: "low" },
  ];

  const energyChartData = {
    labels: ['6h ago', '5h ago', '4h ago', '3h ago', '2h ago', '1h ago', 'Now'],
    datasets: [
      {
        label: 'Energy Consumption (kWh)',
        data: energyData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const pedestrianChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Pedestrian Count',
        data: pedestrianData,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-primary">Smart City Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and control center</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Live View
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Controls
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Active Street Lights"
          value={activeLights.toLocaleString()}
          subtitle="Across all zones"
          icon={Lightbulb}
          trend={2.1}
          color="primary"
        />
        <StatusCard
          title="Energy Savings"
          value={`${Math.round(energySavings)}%`}
          subtitle="vs traditional lighting"
          icon={Zap}
          trend={5}
          color="secondary"
        />
        <StatusCard
          title="AI Model Status"
          value="Active"
          subtitle="Processing 24 feeds"
          icon={Brain}
          trend={0.5}
          color="accent"
        />
        <StatusCard
          title="System Uptime"
          value="99.9%"
          subtitle="Last 30 days"
          icon={Wifi}
          trend={0.2}
          color="primary"
        />
      </div>

      {/* AI System Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border-0 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(59, 130, 246, 0.5)",
                      "0 0 20px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="h-7 w-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">AI Analysis System</h3>
                  <p className="text-sm text-muted-foreground font-medium">Real-time video processing and pedestrian detection</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-blue-500/10">
                      <Video className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">24</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">Active Feeds</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-green-500/10">
                      <Clock className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-3xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">47ms</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">Avg Latency</div>
                </div>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Operational
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Consumption Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Real-time Energy Usage
            </CardTitle>
            <CardDescription>Last 7 hours consumption pattern</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '250px' }}>
              <Line data={energyChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Pedestrian Traffic Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Pedestrian Traffic Analysis
            </CardTitle>
            <CardDescription>Weekly movement patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '250px' }}>
              <Bar data={pedestrianChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Live Zone Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Zone Activity Monitor
            </CardTitle>
            <CardDescription>Real-time brightness levels across city zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { zone: "Downtown Core", brightness: 95, activity: "High", color: "bg-primary" },
                { zone: "Residential North", brightness: 60, activity: "Medium", color: "bg-secondary" },
                { zone: "Industrial South", brightness: 40, activity: "Low", color: "bg-accent" },
                { zone: "Park District", brightness: 75, activity: "Medium", color: "bg-primary" },
                { zone: "Shopping Center", brightness: 85, activity: "High", color: "bg-secondary" },
              ].map((zone, index) => (
                <motion.div
                  key={zone.zone}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-24 text-sm font-medium">{zone.zone}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Brightness</span>
                      <span className="text-xs font-medium">{zone.brightness}%</span>
                    </div>
                    <Progress value={zone.brightness} className="h-2" />
                  </div>
                  <Badge variant={zone.activity === 'High' ? 'default' : zone.activity === 'Medium' ? 'secondary' : 'outline'}>
                    {zone.activity}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Live Alerts
            </CardTitle>
            <CardDescription>Recent system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AlertItem {...alert} />
                </motion.div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button variant="outline" size="sm" className="w-full">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Energy Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Energy Analytics
            </CardTitle>
            <CardDescription>Today's consumption overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2.4 MWh</div>
                <div className="text-sm text-muted-foreground">Total consumption today</div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Peak Hours (6-9 PM)</span>
                  <span className="font-medium">1.2 MWh</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Off-Peak (10 PM-6 AM)</span>
                  <span className="font-medium">0.8 MWh</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Daytime (6 AM-6 PM)</span>
                  <span className="font-medium">0.4 MWh</span>
                </div>
              </div>
              <Separator />
              <div className="text-center">
                <div className="text-lg font-semibold text-green-500">$340 Saved</div>
                <div className="text-xs text-muted-foreground">vs traditional lighting</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Citizens Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Citizen Activity
            </CardTitle>
            <CardDescription>Current movement patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { area: "City Center", count: 324, trend: "up" },
                { area: "Shopping Mall", count: 198, trend: "up" },
                { area: "University", count: 156, trend: "down" },
                { area: "Park Area", count: 89, trend: "stable" },
              ].map((area, index) => (
                <motion.div
                  key={area.area}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-sm">{area.area}</div>
                    <div className="text-xs text-muted-foreground">Active pedestrians</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{area.count}</div>
                    <div className={`text-xs ${
                      area.trend === 'up' ? 'text-green-500' : 
                      area.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
                    }`}>
                      {area.trend === 'up' ? '↗' : area.trend === 'down' ? '↘' : '→'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;