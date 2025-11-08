'use client';

import { useState } from 'react';
import { 
  LineChart, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Zap, 
  Users, 
  DollarSign, 
  Battery,
  MapPin,
  Clock,
  Star,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Calendar
} from 'lucide-react';

type TimeRange = '7d' | '30d' | '90d' | '1y';
type MetricType = 'usage' | 'revenue' | 'efficiency' | 'coverage';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('usage');

  // Mock data for KPI cards
  const kpiData = [
    {
      title: 'Total Energy Delivered',
      value: '2,847',
      unit: 'MWh',
      change: '+12.5%',
      trend: 'up' as const,
      icon: Zap,
      color: 'from-[#276FB0] to-[#134474]',
    },
    {
      title: 'Active Users',
      value: '18,542',
      unit: 'users',
      change: '+8.3%',
      trend: 'up' as const,
      icon: Users,
      color: 'from-[#276FB0] to-[#134474]',
    },
    {
      title: 'Revenue Generated',
      value: '4.2M',
      unit: 'SAR',
      change: '+15.7%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'from-[#276FB0] to-[#134474]',
    },
    {
      title: 'Station Utilization',
      value: '78.4',
      unit: '%',
      change: '-2.1%',
      trend: 'down' as const,
      icon: Battery,
      color: 'from-[#276FB0] to-[#134474]',
    },
  ];

  // Mock data for hourly usage chart
  const hourlyUsageData = [
    { hour: '00:00', usage: 45, peak: false },
    { hour: '02:00', usage: 32, peak: false },
    { hour: '04:00', usage: 28, peak: false },
    { hour: '06:00', usage: 65, peak: false },
    { hour: '08:00', usage: 92, peak: true },
    { hour: '10:00', usage: 78, peak: false },
    { hour: '12:00', usage: 88, peak: true },
    { hour: '14:00', usage: 82, peak: false },
    { hour: '16:00', usage: 95, peak: true },
    { hour: '18:00', usage: 98, peak: true },
    { hour: '20:00', usage: 85, peak: false },
    { hour: '22:00', usage: 62, peak: false },
  ];

  // Mock data for station performance
  const stationPerformance = [
    { name: 'Prince Mohammed Road', efficiency: 94, sessions: 456, revenue: 85400, status: 'excellent' },
    { name: 'Quba District', efficiency: 89, sessions: 389, revenue: 72800, status: 'good' },
    { name: 'King Fahd Road', efficiency: 91, sessions: 512, revenue: 96200, status: 'excellent' },
    { name: 'Al-Hijra Station', efficiency: 76, sessions: 234, revenue: 45600, status: 'fair' },
    { name: 'Masjid Nabawi Area', efficiency: 88, sessions: 398, revenue: 78900, status: 'good' },
  ];

  // Mock data for charging types distribution
  const chargingTypes = [
    { type: 'Level 2 (AC)', percentage: 35, color: '#276FB0' },
    { type: 'DC Fast', percentage: 45, color: '#134474' },
    { type: 'Ultra-Fast', percentage: 15, color: '#0D263F' },
    { type: 'Solar', percentage: 5, color: '#10b981' },
  ];

  // Mock data for regional coverage
  const regionalData = [
    { region: 'Central Manhattan', coverage: 92, stations: 12, users: 5420 },
    { region: 'Quba Area', coverage: 85, stations: 8, users: 3890 },
    { region: 'Northern District', coverage: 78, stations: 6, users: 2840 },
    { region: 'Eastern Zone', coverage: 71, stations: 5, users: 2180 },
    { region: 'Western Area', coverage: 65, stations: 4, users: 1750 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-emerald-600 bg-emerald-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const timeRangeOptions = [
    { value: '7d' as TimeRange, label: 'Last 7 Days' },
    { value: '30d' as TimeRange, label: 'Last 30 Days' },
    { value: '90d' as TimeRange, label: 'Last 90 Days' },
    { value: '1y' as TimeRange, label: 'Last Year' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-[#276FB0]/30 to-[#134474]/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-[#134474]/30 to-[#0D263F]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#276FB0] to-[#134474] bg-clip-text text-transparent flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#276FB0]" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-700 text-lg">
              Real-time insights & performance metrics for EV charging infrastructure
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2 bg-white/70 backdrop-blur-xl rounded-xl p-1 border border-white/40 shadow-lg">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeRange === option.value
                    ? 'bg-gradient-to-r from-[#276FB0] to-[#134474] text-white shadow-md'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                  kpi.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="text-sm font-semibold">{kpi.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{kpi.title}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-800">{kpi.value}</span>
                <span className="text-gray-500 text-sm">{kpi.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hourly Usage Chart */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#276FB0]" />
                  Hourly Usage Pattern
                </h3>
                <p className="text-sm text-gray-600 mt-1">Average charging sessions per hour</p>
              </div>
            </div>
            
            {/* Bar Chart */}
            <div className="space-y-3">
              {hourlyUsageData.map((data, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-600 w-12">{data.hour}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        data.peak 
                          ? 'bg-gradient-to-r from-[#276FB0] to-[#134474]' 
                          : 'bg-gradient-to-r from-blue-300 to-blue-400'
                      }`}
                      style={{ width: `${data.usage}%` }}
                    >
                      {data.peak && (
                        <div className="absolute inset-0 flex items-center justify-end pr-2">
                          <Star className="w-4 h-4 text-white fill-white" />
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 w-12 text-right">
                    {data.usage}%
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-600">
              <Star className="w-4 h-4 text-[#276FB0] fill-[#276FB0]" />
              <span>Peak hours: 08:00, 12:00, 16:00-18:00</span>
            </div>
          </div>

          {/* Charging Types Distribution */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#276FB0]" />
                Charging Types Distribution
              </h3>
              <p className="text-sm text-gray-600 mt-1">Usage by charger type</p>
            </div>

            {/* Donut Chart Representation */}
            <div className="space-y-4">
              {chargingTypes.map((type, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: type.color }}
                      />
                      <span className="text-sm font-medium text-gray-700">{type.type}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">{type.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${type.percentage}%`,
                        backgroundColor: type.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">1,989</p>
                <p className="text-xs text-gray-600 mt-1">Total Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">2.4h</p>
                <p className="text-xs text-gray-600 mt-1">Avg. Duration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Station Performance Table */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#276FB0]" />
              Station Performance Overview
            </h3>
            <p className="text-sm text-gray-600 mt-1">Top performing charging stations</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Station Name</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Efficiency</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Sessions</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Revenue (SAR)</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {stationPerformance.map((station, index) => (
                  <tr 
                    key={index}
                    className="border-b border-gray-100 hover:bg-white/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#276FB0]" />
                        <span className="font-medium text-gray-800">{station.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#276FB0] to-[#134474] h-full rounded-full"
                            style={{ width: `${station.efficiency}%` }}
                          />
                        </div>
                        <span className="font-semibold text-gray-800">{station.efficiency}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-800">{station.sessions}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-800">
                        {station.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(station.status)}`}>
                        {station.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regional Coverage */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#276FB0]" />
              Regional Coverage Analysis
            </h3>
            <p className="text-sm text-gray-600 mt-1">Infrastructure distribution across Manhattan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {regionalData.map((region, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:shadow-lg transition-all"
              >
                <h4 className="font-semibold text-gray-800 mb-3">{region.region}</h4>
                
                {/* Coverage Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Coverage</span>
                    <span className="text-xs font-bold text-gray-800">{region.coverage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#276FB0] to-[#134474] h-full rounded-full"
                      style={{ width: `${region.coverage}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Stations</span>
                    <span className="font-semibold text-gray-800">{region.stations}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Users</span>
                    <span className="font-semibold text-gray-800">{region.users.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
