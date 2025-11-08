'use client';

import Image from 'next/image';
import { MapPin, Search } from 'lucide-react';

export default function CityModelling3D() {
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

      <div className="p-8 min-h-screen flex items-center justify-center max-w-[1800px] mx-auto">
        {/* Full Screen Map Container */}
        <div className="w-full bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-lg">
            {/* 3D Map Image */}
            <Image
              src="/images/3d-view-map.png"
              alt="3D City Model - Manhattan EV Charging Demand"
              fill
              className="object-cover"
              priority
            />
            
            {/* Search Bar Overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-md">
              <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-white/40">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for location..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Location Indicator Overlay */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg border border-white/40 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#276FB0]" />
              <span className="text-sm font-bold text-[#0D263F]">Manhattan</span>
            </div>

            {/* Color Legend Overlay */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-lg px-4 py-3 shadow-lg border border-white/40">
              <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Demand Level</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500 shadow-md"></div>
                  <span className="text-sm text-gray-700 font-medium">High Demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-md"></div>
                  <span className="text-sm text-gray-700 font-medium">Medium Demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 shadow-md"></div>
                  <span className="text-sm text-gray-700 font-medium">Low Demand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
