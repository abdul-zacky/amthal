'use client';

import { useState } from 'react';
import { Globe, Scale, DollarSign, Lightbulb, Star } from 'lucide-react';

// Dummy data untuk tiga skenario
const scenarios = {
  maxCoverage: {
    name: 'Maximum Coverage',
    description: 'Prioritas jangkauan luas untuk melayani lebih banyak area',
    color: 'bg-[#276FB0]',
    borderColor: 'border-[#276FB0]',
    metrics: {
      coverage: 89,
      cost: 4200000,
      stations: 42,
      equityScore: 72,
      l2Chargers: 28,
      dcFastChargers: 10,
      ultraFastChargers: 4,
      solarCanopies: 8,
      avgDistanceToCharger: 2.1,
      populationServed: 850000,
    },
    locations: [
      'Manhattan City Center',
      'Prince Mohammed Bin Abdulaziz Road',
      'King Fahd Road Corridor',
      'Al-Aziziyah District',
      'Quba District',
    ],
  },
  equityFocus: {
    name: 'Equity Focus',
    description: 'Prioritas pemerataan layanan untuk semua distrik',
    color: 'bg-[#134474]',
    borderColor: 'border-[#134474]',
    metrics: {
      coverage: 78,
      cost: 3800000,
      stations: 38,
      equityScore: 94,
      l2Chargers: 26,
      dcFastChargers: 9,
      ultraFastChargers: 3,
      solarCanopies: 10,
      avgDistanceToCharger: 2.8,
      populationServed: 780000,
    },
    locations: [
      'Al-Uyun District (Low-income)',
      'Bani Muawiyah (Underserved)',
      'Al-Jumuah District',
      'Al-Iskan District',
      'Sultana District',
    ],
  },
  costOptimization: {
    name: 'Cost Optimization',
    description: 'Efisiensi biaya dengan ROI maksimal',
    color: 'bg-[#0D263F]',
    borderColor: 'border-[#0D263F]',
    metrics: {
      coverage: 82,
      cost: 2900000,
      stations: 32,
      equityScore: 68,
      l2Chargers: 24,
      dcFastChargers: 6,
      ultraFastChargers: 2,
      solarCanopies: 6,
      avgDistanceToCharger: 3.2,
      populationServed: 720000,
    },
    locations: [
      'Al-Haram Road (High Traffic)',
      'Taibah University Zone',
      'Industrial Area Manhattan',
      'Quba Mosque Area',
      'Al-Masjid an-Nabawi Perimeter',
    ],
  },
};

export default function ScenarioComparison() {
  const [selectedMetric, setSelectedMetric] = useState<string>('coverage');

  const getMetricValue = (scenario: keyof typeof scenarios, metric: string) => {
    return scenarios[scenario].metrics[metric as keyof typeof scenarios.maxCoverage.metrics];
  };

  const getBestScenario = (metric: string) => {
    const values = {
      maxCoverage: getMetricValue('maxCoverage', metric),
      equityFocus: getMetricValue('equityFocus', metric),
      costOptimization: getMetricValue('costOptimization', metric),
    };

    // For cost, lower is better
    if (metric === 'cost' || metric === 'avgDistanceToCharger') {
      return Object.keys(values).reduce((a, b) => 
        values[a as keyof typeof values] < values[b as keyof typeof values] ? a : b
      );
    }

    // For others, higher is better
    return Object.keys(values).reduce((a, b) => 
      values[a as keyof typeof values] > values[b as keyof typeof values] ? a : b
    );
  };

  return (
    <div className="min-h-screen relative py-8 px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-[#276FB0]/30 to-[#134474]/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-[#134474]/30 to-[#0D263F]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#276FB0] to-[#134474] bg-clip-text text-transparent">
          Scenario Comparison Tool
        </h1>
        <p className="text-gray-700 text-lg">
          Bandingkan tiga strategi pengembangan jaringan stasiun charging EV di Manhattan
        </p>
      </div>

      {/* Metric Selector */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/40 shadow-xl">
          <label className="text-sm text-gray-700 font-semibold mb-2 block">Fokus Perbandingan:</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'coverage', label: 'Coverage %' },
              { value: 'cost', label: 'Total Cost (SAR)' },
              { value: 'stations', label: 'Stations' },
              { value: 'equityScore', label: 'Equity Score' },
              { value: 'populationServed', label: 'Population Served' },
            ].map((metric) => (
              <button
                key={metric.value}
                onClick={() => setSelectedMetric(metric.value)}
                className={`px-4 py-2 rounded-xl transition-all font-medium ${
                  selectedMetric === metric.value
                    ? 'bg-gradient-to-r from-[#276FB0] to-[#134474] text-white shadow-lg'
                    : 'bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/80 hover:shadow-md'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scenario Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(scenarios).map(([key, scenario]) => {
          const isBest = getBestScenario(selectedMetric) === key;
          return (
            <div
              key={key}
              className={`relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl p-6 border transition-all shadow-xl ${
                isBest
                  ? `${scenario.borderColor} shadow-2xl ring-2 ring-offset-2 ring-offset-transparent ${scenario.borderColor.replace('border', 'ring')}`
                  : 'border-white/40 hover:border-[#276FB0]/50 hover:shadow-2xl'
              }`}
            >
              {isBest && (
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#276FB0] to-[#134474] text-white shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    Best for {selectedMetric}
                  </span>
                </div>
              )}
              
              <div className={`w-12 h-12 ${scenario.color} rounded-lg mb-4 flex items-center justify-center`}>
                {key === 'maxCoverage' ? (
                  <Globe className="w-6 h-6 text-white" />
                ) : key === 'equityFocus' ? (
                  <Scale className="w-6 h-6 text-white" />
                ) : (
                  <DollarSign className="w-6 h-6 text-white" />
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-[#0D263F]">{scenario.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{scenario.description}</p>

              {/* Key Metrics */}
              <div className="space-y-3 mb-6">
                <MetricBar
                  label="Coverage"
                  value={scenario.metrics.coverage}
                  max={100}
                  unit="%"
                  color={scenario.color}
                />
                <MetricBar
                  label="Equity Score"
                  value={scenario.metrics.equityScore}
                  max={100}
                  unit=""
                  color={scenario.color}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Cost</span>
                  <span className="font-semibold text-[#0D263F]">
                    {(scenario.metrics.cost / 1000).toFixed(1)}M SAR
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Stations</span>
                  <span className="font-semibold text-[#0D263F]">{scenario.metrics.stations}</span>
                </div>
              </div>

              {/* Charger Types */}
              <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/30">
                <h4 className="text-xs font-semibold text-gray-700 mb-3">CHARGER DISTRIBUTION</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-600">L2</div>
                    <div className="font-semibold text-[#0D263F]">{scenario.metrics.l2Chargers}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">DC Fast</div>
                    <div className="font-semibold text-[#0D263F]">{scenario.metrics.dcFastChargers}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Ultra-Fast</div>
                    <div className="font-semibold text-[#0D263F]">{scenario.metrics.ultraFastChargers}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Solar</div>
                    <div className="font-semibold text-[#0D263F]">{scenario.metrics.solarCanopies}</div>
                  </div>
                </div>
              </div>

              {/* Top Locations */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-2">TOP 5 LOCATIONS</h4>
                <ul className="space-y-1 text-sm">
                  {scenario.locations.map((location, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start">
                      <span className="text-gray-400 mr-2">{idx + 1}.</span>
                      <span>{location}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/30 bg-gradient-to-r from-[#276FB0]/10 to-[#134474]/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#0D263F]">Detailed Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/40 backdrop-blur-sm">
                  <th className="text-left p-4 text-gray-700 font-semibold">Metric</th>
                  {Object.values(scenarios).map((scenario) => (
                    <th key={scenario.name} className="text-center p-4 text-gray-700 font-semibold">
                      {scenario.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { key: 'coverage', label: 'Coverage', unit: '%' },
                  { key: 'cost', label: 'Total Cost', unit: ' SAR', format: (v: number) => `${(v / 1000000).toFixed(2)}M` },
                  { key: 'stations', label: 'Total Stations', unit: '' },
                  { key: 'equityScore', label: 'Equity Score', unit: '/100' },
                  { key: 'avgDistanceToCharger', label: 'Avg. Distance to Charger', unit: ' km' },
                  { key: 'populationServed', label: 'Population Served', unit: '', format: (v: number) => `${(v / 1000).toFixed(0)}K` },
                  { key: 'l2Chargers', label: 'L2 Chargers', unit: '' },
                  { key: 'dcFastChargers', label: 'DC Fast Chargers', unit: '' },
                  { key: 'ultraFastChargers', label: 'Ultra-Fast Chargers', unit: '' },
                  { key: 'solarCanopies', label: 'Solar Canopies', unit: '' },
                ].map((metric) => (
                  <tr key={metric.key} className="border-t border-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors">
                    <td className="p-4 text-gray-700 font-medium">{metric.label}</td>
                    {Object.entries(scenarios).map(([scenarioKey, scenario]) => {
                      const value = scenario.metrics[metric.key as keyof typeof scenario.metrics];
                      const isBest = getBestScenario(metric.key) === scenarioKey;
                      const displayValue = metric.format ? metric.format(value as number) : value;
                      
                      return (
                        <td
                          key={scenarioKey}
                          className={`text-center p-4 font-semibold ${
                            isBest ? 'text-[#276FB0]' : 'text-gray-700'
                          }`}
                        >
                          <span className="inline-flex items-center gap-1">
                            {isBest && <Star className="w-4 h-4 fill-current" />}
                            {displayValue}
                            {metric.unit}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary Insights */}
      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl border border-[#276FB0]/30 rounded-2xl p-4 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#276FB0]/10 to-transparent"></div>
          <div className="relative">
            <div className="text-[#276FB0] font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Maximum Coverage
            </div>
            <p className="text-sm text-gray-700">
              Ideal untuk fase awal adopsi EV. Menjangkau 89% area dengan 42 stasiun, memaksimalkan visibilitas infrastruktur charging.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl border border-[#134474]/30 rounded-2xl p-4 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#134474]/10 to-transparent"></div>
          <div className="relative">
            <div className="text-[#134474] font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Equity Focus
            </div>
            <p className="text-sm text-gray-700">
              Prioritas pemerataan sosial. Equity score tertinggi (94), melayani area low-income dan underserved dengan solar canopy maksimal.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl border border-[#0D263F]/30 rounded-2xl p-4 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D263F]/10 to-transparent"></div>
          <div className="relative">
            <div className="text-[#0D263F] font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Cost Optimization
            </div>
            <p className="text-sm text-gray-700">
              Hemat 31% biaya vs Max Coverage. Cocok untuk budget terbatas dengan fokus ROI tinggi di area high-traffic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for metric bars
function MetricBar({
  label,
  value,
  max,
  unit,
  color,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}) {
  const percentage = (value / max) * 100;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="font-semibold text-[#0D263F]">
          {value}
          {unit}
        </span>
      </div>
      <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-white/20">
        <div
          className={`h-full ${color} transition-all duration-500 rounded-full shadow-sm`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
