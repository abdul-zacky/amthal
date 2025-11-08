'use client';

import Image from 'next/image';
import { MapPin, TrendingUp, Users, DollarSign, Zap, Car, BarChart3, AlertCircle, Sun } from 'lucide-react';

export default function DemandPrediction() {
  const insights = [
    {
      icon: Sun,
      title: 'Solar Applicable',
      value: '89%',
      description: 'Rooftop solar potential for sustainable charging infrastructure',
      trend: 'High',
      color: 'from-yellow-400 to-amber-600',
    },
    {
      icon: DollarSign,
      title: 'Cost-Effective Implementation',
      value: '$2.4M',
      description: 'Average savings per charging station compared to suburban areas',
      trend: '+15%',
      color: 'from-green-400 to-emerald-600',
    },
    {
      icon: Users,
      title: 'High Population Density',
      value: '72,000',
      description: 'Residents per square mile in Manhattan',
      trend: 'High',
      color: 'from-blue-400 to-cyan-600',
    },
    {
      icon: Car,
      title: 'Current EV Adoption',
      value: '18.5%',
      description: 'Of vehicles registered in Manhattan are EVs',
      trend: '+8.2%',
      color: 'from-purple-400 to-indigo-600',
    },
    {
      icon: Zap,
      title: 'EV Charging Demand',
      value: '2,840',
      description: 'Daily charging sessions needed across the district',
      trend: '+12%',
      color: 'from-amber-400 to-orange-600',
    },
    {
      icon: BarChart3,
      title: 'Infrastructure Gap',
      value: '67%',
      description: 'Current demand not met by existing charging stations',
      trend: 'Critical',
      color: 'from-red-400 to-rose-600',
    },
    {
      icon: TrendingUp,
      title: 'Projected Growth',
      value: '34%',
      description: 'Expected increase in EV adoption over next 3 years',
      trend: '+2024',
      color: 'from-teal-400 to-cyan-600',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-[#276FB0]/30 to-[#134474]/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#134474]/30 to-[#0D263F]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="p-8 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#276FB0] via-[#134474] to-[#0D263F] bg-clip-text text-transparent">
            AI Demand Prediction
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time analysis and insights for EV charging infrastructure deployment
          </p>
        </div>

        {/* Main Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Map Section (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Map Container */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                <Image
                  src="/images/3d-view-map.png"
                  alt="Manhattan EV Charging Demand Map"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Current Location Card Overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/40 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#276FB0]" />
                  <span className="text-sm font-bold text-[#0D263F]">Manhattan</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>High Demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Medium Demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Low Demand</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Insights Sidebar (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl h-full">
              {/* Urgency Level */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 backdrop-blur-xl rounded-2xl p-4 border border-red-100 shadow-lg mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-red-600 font-medium">Implementation Priority</p>
                    <h2 className="text-xl font-bold text-red-700">Urgency: High</h2>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#0D263F] mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#276FB0] to-[#134474] rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                Key Insights
              </h3>

              <div className="space-y-4">
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${insight.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-gray-500 font-medium truncate">
                              {insight.title}
                            </p>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                              {insight.trend}
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-[#0D263F] mb-1">
                            {insight.value}
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-br from-[#276FB0]/10 to-[#134474]/10 rounded-xl p-4 border border-[#276FB0]/20">
                  <h4 className="font-bold text-[#0D263F] mb-2 text-sm">
                    Recommendation Summary
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Based on the analysis, Manhattan requires immediate deployment of EV charging infrastructure. 
                    The combination of high population density, strong EV adoption trends, and significant infrastructure 
                    gaps makes this location a priority for investment. Expected ROI within 18-24 months.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-[#276FB0] to-[#134474] text-white text-xs font-semibold py-2 px-3 rounded-lg hover:shadow-lg transition-all hover:scale-105">
                      View Details
                    </button>
                    <button className="flex-1 bg-white/60 backdrop-blur-sm text-[#134474] text-xs font-semibold py-2 px-3 rounded-lg border border-[#276FB0]/30 hover:bg-white/80 transition-all">
                      Export Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
