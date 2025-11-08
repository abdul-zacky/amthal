'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Map, 
  MapPin, 
  Target, 
  Layers,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  Scale,
  Navigation,
  Maximize2,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  Clock,
  Battery,
  Globe,
  Sparkles
} from 'lucide-react';

type OptimizationMode = 'coverage' | 'equity' | 'cost' | 'hybrid';

interface LocationScore {
  name: string;
  coordinates: { lat: number; lng: number };
  scores: {
    coverage: number;
    equity: number;
    cost: number;
    accessibility: number;
    demand: number;
    environmental: number;
  };
  overall: number;
  recommendation: 'high' | 'medium' | 'low';
}

export default function GeospatialPage() {
  const [optimizationMode, setOptimizationMode] = useState<OptimizationMode>('hybrid');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  // Control States
  const [budget, setBudget] = useState(3800000); // in SAR
  const [priority, setPriority] = useState(50); // 0-100 scale
  const [numChargers, setNumChargers] = useState(5);

  const optimizationModes = [
    { value: 'coverage' as OptimizationMode, label: 'Max Coverage', icon: Maximize2, color: 'from-blue-500 to-blue-700' },
    { value: 'equity' as OptimizationMode, label: 'Equity Focus', icon: Scale, color: 'from-emerald-500 to-emerald-700' },
    { value: 'cost' as OptimizationMode, label: 'Cost Optimal', icon: DollarSign, color: 'from-amber-500 to-amber-700' },
    { value: 'hybrid' as OptimizationMode, label: 'Hybrid', icon: Target, color: 'from-[#276FB0] to-[#134474]' },
  ];

  const locationScores: LocationScore[] = [
    {
      name: 'Prince Mohammed Bin Abdulaziz Road',
      coordinates: { lat: 24.4672, lng: 39.6021 },
      scores: {
        coverage: 94,
        equity: 82,
        cost: 71,
        accessibility: 89,
        demand: 91,
        environmental: 78,
      },
      overall: 87.5,
      recommendation: 'high',
    },
    {
      name: 'Quba District Center',
      coordinates: { lat: 24.4425, lng: 39.6190 },
      scores: {
        coverage: 88,
        equity: 91,
        cost: 85,
        accessibility: 84,
        demand: 86,
        environmental: 82,
      },
      overall: 86.0,
      recommendation: 'high',
    },
    {
      name: 'King Fahd Road Corridor',
      coordinates: { lat: 24.4828, lng: 39.5847 },
      scores: {
        coverage: 91,
        equity: 75,
        cost: 68,
        accessibility: 93,
        demand: 89,
        environmental: 71,
      },
      overall: 81.2,
      recommendation: 'high',
    },
    {
      name: 'Al-Hijra District',
      coordinates: { lat: 24.4551, lng: 39.6143 },
      scores: {
        coverage: 79,
        equity: 88,
        cost: 79,
        accessibility: 76,
        demand: 74,
        environmental: 85,
      },
      overall: 80.2,
      recommendation: 'medium',
    },
    {
      name: 'Eastern Industrial Zone',
      coordinates: { lat: 24.4912, lng: 39.6334 },
      scores: {
        coverage: 72,
        equity: 68,
        cost: 82,
        accessibility: 71,
        demand: 78,
        environmental: 73,
      },
      overall: 74.0,
      recommendation: 'medium',
    },
  ];

  const multiObjectiveMetrics = [
    {
      label: 'Population Coverage',
      value: '342,580',
      unit: 'people',
      percentage: 89,
      icon: Users,
      color: '#276FB0',
    },
    {
      label: 'Geographic Area',
      value: '127.4',
      unit: 'km²',
      percentage: 76,
      icon: Globe,
      color: '#134474',
    },
    {
      label: 'Total Investment',
      value: '3.8M',
      unit: 'SAR',
      percentage: 65,
      icon: DollarSign,
      color: '#0D263F',
    },
    {
      label: 'Energy Capacity',
      value: '42.5',
      unit: 'MW',
      percentage: 92,
      icon: Zap,
      color: '#276FB0',
    },
    {
      label: 'Equity Score',
      value: '8.4',
      unit: '/10',
      percentage: 84,
      icon: Scale,
      color: '#134474',
    },
    {
      label: 'ROI Period',
      value: '2.3',
      unit: 'years',
      percentage: 78,
      icon: TrendingUp,
      color: '#0D263F',
    },
  ];

  const constraintAnalysis = [
    { factor: 'Grid Capacity', status: 'optimal', value: '94%', icon: Zap },
    { factor: 'Land Availability', status: 'good', value: '87%', icon: Layers },
    { factor: 'Traffic Flow', status: 'optimal', value: '91%', icon: Navigation },
    { factor: 'Accessibility', status: 'good', value: '88%', icon: MapPin },
    { factor: 'Environmental', status: 'caution', value: '73%', icon: Globe },
    { factor: 'Regulations', status: 'optimal', value: '96%', icon: CheckCircle2 },
  ];

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'high': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-emerald-600 bg-emerald-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'caution': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleOptimize = () => {
    setIsCalculating(true);
    setShowRecommendations(false);
    setTimeout(() => {
      setIsCalculating(false);
      setShowRecommendations(true);
    }, 2000);
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  const getPriorityLabel = (value: number) => {
    if (value >= 75) return 'Coverage Priority';
    if (value >= 50) return 'Balanced';
    if (value >= 25) return 'Equity Focus';
    return 'Cost Optimization';
  };

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
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#276FB0] to-[#134474] bg-clip-text text-transparent flex items-center gap-3">
            <Target className="w-8 h-8 text-[#276FB0]" />
            Geospatial Optimizer
          </h1>
          <p className="text-gray-700 text-lg">
            Multi-objective optimization for optimal charging station placement
          </p>
        </div>

        {/* Optimization Controls */}
        <div className="mb-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#276FB0]" />
            Optimization Controls
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Budget Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#276FB0]" />
                  Budget
                </label>
                <span className="text-sm font-bold text-[#276FB0]">
                  {formatCurrency(budget)} SAR
                </span>
              </div>
              <input
                type="range"
                min="1000000"
                max="10000000"
                step="100000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#276FB0]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1M</span>
                <span>10M</span>
              </div>
            </div>

            {/* Priority Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#276FB0]" />
                  Priority
                </label>
                <span className="text-sm font-bold text-[#276FB0]">
                  {getPriorityLabel(priority)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#276FB0]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Cost</span>
                <span>Equity</span>
                <span>Coverage</span>
              </div>
            </div>

            {/* Number of Chargers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#276FB0]" />
                  Chargers
                </label>
                <span className="text-sm font-bold text-[#276FB0]">
                  {numChargers} stations
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="15"
                step="1"
                value={numChargers}
                onChange={(e) => setNumChargers(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#276FB0]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>3</span>
                <span>15</span>
              </div>
            </div>
          </div>

          {/* Optimization Mode Selector + Button */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-2 flex-wrap">
              {optimizationModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setOptimizationMode(mode.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    optimizationMode === mode.value
                      ? `bg-gradient-to-r ${mode.color} text-white shadow-lg`
                      : 'bg-white/50 text-gray-700 hover:bg-white/80'
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                  {mode.label}
                </button>
              ))}
            </div>
            <button
              onClick={handleOptimize}
              disabled={isCalculating}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#276FB0] to-[#134474] text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Run Optimization
                </>
              )}
            </button>
          </div>

          {/* Info Summary */}
          {!showRecommendations && !isCalculating && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-700">
                💡 <span className="font-semibold">Tip:</span> Adjust the sliders to set your constraints, then click "Run Optimization" to see recommended charging station locations on the map.
              </p>
            </div>
          )}
        </div>

        {/* Main Content - Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Side - Map */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl overflow-hidden h-[calc(100vh-300px)] min-h-[600px]">
            {/* Map Header */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
              <Map className="w-5 h-5 text-[#276FB0]" />
              <span className="font-semibold text-gray-700">Al-Madinah Region</span>
            </div>

            {/* Status Badge */}
            {isCalculating && (
              <div className="absolute top-4 right-4 z-10 bg-blue-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-semibold text-sm">Calculating optimal locations...</span>
              </div>
            )}

            {showRecommendations && !isCalculating && (
              <div className="absolute top-4 right-4 z-10 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-semibold text-sm">{numChargers} locations optimized</span>
              </div>
            )}
            
            <div className="relative w-full h-full">
              <Image
                src="/assets/maps2.jpeg"
                alt="Al-Madinah Map"
                fill
                className="object-cover"
                priority
              />
              
              {/* Show markers only after optimization */}
              {showRecommendations && (
                <>
                  {/* Location Markers with Scores - Show based on numChargers */}
                  {numChargers >= 1 && (
                    <div className="absolute top-1/3 left-1/2 -ml-3 -mt-3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping w-6 h-6"></div>
                        <div className="absolute inset-0 bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          <p className="text-xs font-bold text-gray-800">Prince Mohammed Road</p>
                          <p className="text-xs text-emerald-600 font-semibold">Score: 87.5/100</p>
                          <p className="text-xs text-gray-600">Coverage: 94% • Cost: 750K SAR</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {numChargers >= 2 && (
                    <div className="absolute top-2/3 right-1/3 -ml-3 -mt-3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping w-6 h-6" style={{ animationDelay: '0.2s' }}></div>
                        <div className="absolute inset-0 bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          <p className="text-xs font-bold text-gray-800">Quba District</p>
                          <p className="text-xs text-emerald-600 font-semibold">Score: 86.0/100</p>
                          <p className="text-xs text-gray-600">Coverage: 88% • Cost: 680K SAR</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {numChargers >= 3 && (
                    <div className="absolute bottom-1/4 left-1/3 -ml-3 -mt-3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping w-6 h-6" style={{ animationDelay: '0.4s' }}></div>
                        <div className="absolute inset-0 bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          <p className="text-xs font-bold text-gray-800">King Fahd Road</p>
                          <p className="text-xs text-emerald-600 font-semibold">Score: 81.2/100</p>
                          <p className="text-xs text-gray-600">Coverage: 91% • Cost: 820K SAR</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {numChargers >= 4 && (
                    <div className="absolute top-1/2 right-1/4 -ml-3 -mt-3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping w-6 h-6" style={{ animationDelay: '0.6s' }}></div>
                        <div className="absolute inset-0 bg-amber-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">4</span>
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          <p className="text-xs font-bold text-gray-800">Al-Hijra District</p>
                          <p className="text-xs text-amber-600 font-semibold">Score: 80.2/100</p>
                          <p className="text-xs text-gray-600">Coverage: 79% • Cost: 620K SAR</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {numChargers >= 5 && (
                    <div className="absolute bottom-1/3 right-1/5 -ml-3 -mt-3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping w-6 h-6" style={{ animationDelay: '0.8s' }}></div>
                        <div className="absolute inset-0 bg-amber-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">5</span>
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          <p className="text-xs font-bold text-gray-800">Eastern Industrial</p>
                          <p className="text-xs text-amber-600 font-semibold">Score: 74.0/100</p>
                          <p className="text-xs text-gray-600">Coverage: 72% • Cost: 580K SAR</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {numChargers >= 6 && (
                    <div className="absolute top-1/4 left-1/4 -ml-3 -mt-3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping w-6 h-6" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute inset-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">6</span>
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          <p className="text-xs font-bold text-gray-800">Northern District</p>
                          <p className="text-xs text-blue-600 font-semibold">Score: 78.5/100</p>
                          <p className="text-xs text-gray-600">Coverage: 85% • Cost: 710K SAR</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {numChargers >= 7 && (
                    <div className="absolute bottom-1/5 left-2/5 -ml-3 -mt-3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping w-6 h-6" style={{ animationDelay: '1.2s' }}></div>
                        <div className="absolute inset-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">7</span>
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          <p className="text-xs font-bold text-gray-800">Western Area</p>
                          <p className="text-xs text-blue-600 font-semibold">Score: 76.8/100</p>
                          <p className="text-xs text-gray-600">Coverage: 81% • Cost: 640K SAR</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {numChargers >= 8 && (
                    <div className="absolute top-2/5 right-2/5 -ml-3 -mt-3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping w-6 h-6" style={{ animationDelay: '1.4s' }}></div>
                        <div className="absolute inset-0 bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">8</span>
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          <p className="text-xs font-bold text-gray-800">Central Hub</p>
                          <p className="text-xs text-purple-600 font-semibold">Score: 75.3/100</p>
                          <p className="text-xs text-gray-600">Coverage: 77% • Cost: 690K SAR</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {numChargers >= 9 && (
                    <div className="absolute bottom-2/5 right-1/3 -ml-3 -mt-3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping w-6 h-6" style={{ animationDelay: '1.6s' }}></div>
                        <div className="absolute inset-0 bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">9</span>
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          <p className="text-xs font-bold text-gray-800">South Gateway</p>
                          <p className="text-xs text-purple-600 font-semibold">Score: 73.9/100</p>
                          <p className="text-xs text-gray-600">Coverage: 74% • Cost: 610K SAR</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {numChargers >= 10 && (
                    <div className="absolute top-1/5 right-1/3 -ml-3 -mt-3">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping w-6 h-6" style={{ animationDelay: '1.8s' }}></div>
                        <div className="absolute inset-0 bg-indigo-500 rounded-full w-6 h-6 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">10</span>
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          <p className="text-xs font-bold text-gray-800">University Zone</p>
                          <p className="text-xs text-indigo-600 font-semibold">Score: 72.5/100</p>
                          <p className="text-xs text-gray-600">Coverage: 70% • Cost: 590K SAR</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* No Results State */}
              {!showRecommendations && !isCalculating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl text-center max-w-md">
                    <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Ready to Optimize</h3>
                    <p className="text-gray-600 text-sm">
                      Configure your parameters and click "Run Optimization" to see recommended charging station locations
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
              <p className="text-xs font-semibold text-gray-700 mb-2">Recommendation Level</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">High Priority (85+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Medium (70-84)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Low (&lt;70)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Calculations & Analysis */}
          <div className="flex flex-col gap-6 h-[calc(100vh-300px)] min-h-[600px] overflow-y-auto">
            {/* Multi-Objective Metrics */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#276FB0]" />
                Multi-Objective Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {multiObjectiveMetrics.map((metric, index) => (
                  <div key={index} className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-start justify-between mb-2">
                      <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                      <span className="text-xs font-bold text-gray-600">{metric.percentage}%</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                      <span className="text-xs text-gray-500">{metric.unit}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${metric.percentage}%`,
                          backgroundColor: metric.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Scores */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#276FB0]" />
                Location Score Analysis
              </h3>
              <div className="space-y-3">
                {locationScores.map((location, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">{location.name}</h4>
                        <p className="text-xs text-gray-500">
                          {location.coordinates.lat.toFixed(4)}°N, {location.coordinates.lng.toFixed(4)}°E
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRecommendationColor(location.recommendation)}`}>
                          {location.recommendation.toUpperCase()}
                        </div>
                        <span className="text-lg font-bold text-[#276FB0]">{location.overall}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(location.scores).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-xs text-gray-600 capitalize mb-1">{key}</p>
                          <div className="relative">
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-[#276FB0] to-[#134474] h-full rounded-full"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-gray-700">{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraint Analysis */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#276FB0]" />
                Constraint Analysis
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {constraintAnalysis.map((constraint, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-xl p-3 border border-white/30"
                  >
                    <div className="flex items-center gap-2">
                      <constraint.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">{constraint.factor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-800">{constraint.value}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(constraint.status)}`}>
                        {constraint.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimization Summary */}
            <div className="bg-gradient-to-br from-[#276FB0]/10 to-[#134474]/10 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Optimization Summary
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#276FB0] rounded-full mt-2"></div>
                  <p><span className="font-semibold">Top 3 Locations:</span> Prince Mohammed Road, Quba District, King Fahd Road with total coverage 273km²</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#276FB0] rounded-full mt-2"></div>
                  <p><span className="font-semibold">Expected Impact:</span> Serving 89% of Al-Madinah population with 42.5 MW total capacity</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#276FB0] rounded-full mt-2"></div>
                  <p><span className="font-semibold">Investment Required:</span> 3.8M SAR with projected ROI in 2.3 years</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#276FB0] rounded-full mt-2"></div>
                  <p><span className="font-semibold">Equity Score:</span> 8.4/10 showing fair distribution across all districts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
