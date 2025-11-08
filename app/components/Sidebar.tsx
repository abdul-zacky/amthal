'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BarChart3, Building2, Brain, Map, MessageSquare, LineChart, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    description: 'Dashboard',
    available: true,
  },
  {
    name: 'Scenario Comparison',
    href: '/scenario-comparison',
    icon: BarChart3,
    description: 'Compare strategies',
    available: true,
  },
  {
    name: '3D City Modelling',
    href: '/3d-city',
    icon: Building2,
    description: 'AR visualization',
    available: false,
  },
  {
    name: 'AI Demand Prediction',
    href: '/ai-prediction',
    icon: Brain,
    description: 'ML forecasting',
    available: false,
  },
  {
    name: 'Geospatial Optimizer',
    href: '/geospatial',
    icon: Map,
    description: 'Multi-objective',
    available: false,
  },
  {
    name: 'AI Chatbot',
    href: '/chatbot',
    icon: MessageSquare,
    description: 'NL assistant',
    available: true,
  },
  {
    name: 'Analytics Dashboard',
    href: '/analytics',
    icon: LineChart,
    description: 'Real-time KPI',
    available: false,
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white/70 backdrop-blur-xl border-r border-white/20 shadow-2xl transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(39,111,176,0.1) 100%)',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo & Brand */}
        <div className="p-6 border-b border-white/30 bg-gradient-to-r from-white/50 to-transparent backdrop-blur-sm">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/assets/main.png"
              alt="AMTHAL Logo"
              width={40}
              height={40}
              className="transition-transform group-hover:scale-105 flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-[#276FB0] to-[#134474] bg-clip-text text-transparent whitespace-nowrap">
                  AMTHAL
                </h1>
                <p className="text-xs text-gray-500 whitespace-nowrap">EV Infrastructure</p>
              </div>
            )}
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              if (!item.available) {
                return (
                  <div
                    key={item.name}
                    className="relative group"
                    title={isCollapsed ? item.name : ''}
                  >
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 cursor-not-allowed bg-white/20 backdrop-blur-sm">
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="overflow-hidden">
                          <div className="text-sm font-medium truncate">{item.name}</div>
                          <div className="text-xs truncate">Coming Soon</div>
                        </div>
                      )}
                    </div>
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#0D263F] to-[#134474] text-white px-3 py-2 rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl backdrop-blur-lg">
                        {item.name}
                        <div className="text-xs text-white/70">Coming Soon</div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#276FB0] to-[#134474] text-white shadow-lg shadow-[#276FB0]/30 backdrop-blur-sm'
                        : 'text-gray-700 hover:bg-white/60 hover:backdrop-blur-md hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium truncate">{item.name}</div>
                        <div className={`text-xs truncate ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                    )}
                  </Link>
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#276FB0] to-[#134474] text-white px-3 py-2 rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl backdrop-blur-lg">
                      {item.name}
                      <div className="text-xs text-white/70">{item.description}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Toggle Button */}
        <div className="p-3 border-t border-white/30 bg-gradient-to-t from-white/50 to-transparent backdrop-blur-sm">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/40 hover:bg-white/60 backdrop-blur-md text-gray-700 transition-all hover:shadow-lg"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
